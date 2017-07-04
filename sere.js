// Metrics
var cpu = ''; // CPU
var tps = ''; // tps
var mem = ''; // memused
var swp = ''; // swpused
var lda = ''; // ldavg1
var ifr = ''; // ifacerxkB
var ift = ''; // ifacetxkB
var upt = ''; // uptime
var con = ''; // connections

// Debug
var stop = 0;

// Movement
var speed = 10;    // Boxes will move 10 pixels per step
var direction = 1; // 1 moves in the positive direction; -1 vice versa

function updateMetrics() {

  // Get fresh stats
  var getJSON = function(url, successHandler, errorHandler) {
    var xhr = typeof XMLHttpRequest != 'undefined'
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('get', url, true);
    xhr.onreadystatechange = function() {
      var status;
      var data;
      // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
      if (xhr.readyState == 4) {
        status = xhr.status;
        if (status == 200) {
          data = JSON.parse(xhr.responseText);
          successHandler && successHandler(data);
        }
        else {
          errorHandler && errorHandler(status);
        }
      }
    };
    xhr.send();
  };

  // Parse JSON response
  getJSON('jstats.php', function(data) {
    // Get new metrics
    cpu = data.CPU;         // CPU
    tps = data.tps;         // tps
    mem = data.memused;     // memused
    swp = data.swpused;     // swpused
    lda = data.ldavg1;      // ldavg1
    ifr = data.ifacerxkB;   // ifacerxkB
    ift = data.ifacetxkB;   // ifacetxkB    
    upt = data.uptime;      // uptime    
    con = data.connections; // connections

    // Update graphics
    updateGraphics(data);

  }, function(status) {
    //alert('Something went wrong.');
  });

}

function getCanvasContext(x) {
  var canvas = document.getElementById(x);
  return canvas.getContext('2d');   
}

function drawClock(canvas,value,width) {
  // Limits (pixels)
  var minx = 50;
  var maxx = 250;
  var miny = 10; 
  var maxy = 160;

  if (width != null) {
    minx = 0;
    maxx = width;
    var height = width * 0.6; 
    miny = 0.05 * height; 
    maxy = height;
  }

  // Center coordinates
  cx = minx+(maxx-minx)/2;
  cy = maxy;

  // Radius
  var radius = cx * 0.6;

  // Clear canvas
  canvas.clearRect(0,0,maxx,maxy);

  // Draw clock background
  var startAngle = 1*Math.PI;
  var endAngle = 2*Math.PI;
  var startAnglei = null;
  var endAnglei = null;

  var colors = [];
/*
  colors.push('#18ff00');
  colors.push('#42ff00');
  colors.push('#6cff00');
  colors.push('#96ff00');
  colors.push('#c1ff00');
  colors.push('#ebff00');
  colors.push('#ffd700');
  colors.push('#ffc100');
  colors.push('#ffaa00');
  colors.push('#ff9400');
  colors.push('#ff7e00');
  colors.push('#ff6700');
  colors.push('#ff4000');
  colors.push('#ff2500');
  colors.push('#ff1800');
*/

  colors.push('#3bbe7c');
  colors.push('#f7e930');
  colors.push('#f1a62f');
  colors.push('#e13545');
/*
  colors.push('#');
  colors.push('#');
  colors.push('#');
  colors.push('#');
  colors.push('#');
  colors.push('#');
  colors.push('#');
  colors.push('#');
  colors.push('#');
  colors.push('#');
  colors.push('#');
  colors.push('#');
  colors.push('#');
  colors.push('#');
  colors.push('#');
  colors.push('#');
  colors.push('#');
  colors.push('#');
*/

  var startColor = null;
  var endColor = null;

  var startX = null;
  var startY = null;
  var endX = null;
  var endY = null;

  var gradient = null;

  var arcs = colors.length - 1;

//var debug = minx+","+maxx+","+miny+","+maxy+","+radius;
//document.getElementById('debug').innerHTML = debug;
//stop = 1;

  // For each color-1 draw a piece of arc
  for (var i=0; i<arcs; i++) {

    // Begin new arc
    canvas.beginPath();
    canvas.lineWidth = maxy*0.6;

    // Select color
    startColor = colors[i];
    endColor = colors[i+1];

    // Compute start and end angles for current arc
    startAnglei = startAngle + i*(endAngle - startAngle)/arcs;
    endAnglei = startAngle + (i+1)*(endAngle - startAngle)/arcs + 0.01;

    // + 0.01 smooths arc boundaries

    // Correct the last step
    if (endAnglei > endAngle) endAnglei = endAngle;

    // Define current arc
    canvas.arc(cx,cy,radius,startAnglei,endAnglei,false);

    // Compute start and end points for current gradient
    startX = cx+(radius)*Math.cos(startAnglei);
    startY = cy+(radius)*Math.sin(startAnglei);
    endX = cx+(radius)*Math.cos(endAnglei);
    endY = cy+(radius)*Math.sin(endAnglei);

    // Define current gradient
    gradient = canvas.createLinearGradient(startX,startY,endX,endY);
    gradient.addColorStop(0,startColor);
    gradient.addColorStop(1,endColor);
    canvas.strokeStyle = gradient;
    canvas.stroke();

  }

  // Draw clock hand
  canvas.beginPath();
  canvas.arc(cx,cy-maxy*0.05,maxy*0.025,2*Math.PI,false);
  canvas.fillStyle='#231f20';
  canvas.strokeStyle='#231f20';
  canvas.lineWidth = maxy*0.05;
  canvas.fill();
  canvas.stroke();
  canvas.beginPath();
  canvas.lineWidth = maxy*0.025;
  canvas.moveTo(cx,cy-maxy*0.05); // move to the center
  angle = Math.PI/2 + (Math.PI * (value/100));
  // Calculate displacements based on radius and angle
  dx = -(radius*1.3) * Math.sin(angle);
  dy = (radius*1.3) * Math.cos(angle);
  canvas.lineTo(cx+dx,cy+dy-maxy*0.03);
  canvas.strokeStyle = '#231f20';
  canvas.stroke();

}

function drawTopTable(data) {
  var table = '';
  for (var i=0; i<11; i++) {
    var line = '';
    if (data['top'+i.toString()] !== null) {
      line = data['top'+i.toString()];
    }
    var trclass = 'psleeping';
    if (line[3] == 'D') trclass = 'pwaiting';
    if (line[3] == 'R') trclass = 'prunning';
    if (i>0) table += '<tr class="'+trclass+'">';
    else table += '<tr>';
    for (var j=0; j<7; j++) {
      if (line[j] !== null && j>2) {
        table += '<td>'+line[j]+'</td>';
      }
      else {
        table += '<td></td>';
      }
    }
    table += '</tr>';
  }
  document.getElementById('top').innerHTML = table;
}

function drawUptime()  {
  var uptime = upt.split(',');

  var uptime0 = '';
  var ctime = '';
  var up = '';
  var users = '';
  var aload1 = '';
  var load1 = '';
  var load5 = '';
  var load15 = '';

  if (uptime.length > 1) {

    // is the uptime bigger than 1 day?
    if (upt.indexOf('day') > 0) {
/*
 1:29PM  up 52 days,  1:47, 1 user, load averages: 0.07, 0.09, 0.08
*/
      uptime0 = uptime[0].trim().split(' ');
      ctime = uptime0[0];
      up = uptime0[2] + ' ' + uptime0[3] + ',' + uptime[1];
      users = uptime[2].trim();
      aload1 = uptime[3].split(':');
      load1 = aload1[1].trim();
      load5 = uptime[4].trim();
      load15 = uptime[5].trim();
    }
    else {
/*
 12:29:33 up 23:51,  1 user,  load average: 0.11, 0.12, 0.09
*/
      uptime0 = uptime[0].trim().split(' ');
      ctime = uptime0[0];
      up = uptime0[2];
      users = uptime[1].trim();
      aload1 = uptime[2].split(':');
      load1 = aload1[1].trim();
      load5 = uptime[3].trim();
      load15 = uptime[4].trim();
    }
    var output = '';
    output += '<tr><td>Time</td><td>' + ctime + '</td></tr>';
    output += '<tr><td>Up</td><td>' + up + '</td></tr>';
    output += '<tr><td>Users</td><td>' + users + '</td></tr>';
    document.getElementById('uptime').innerHTML = output;
    output = '';
    output += '<tr><td>Last minute</td><td>' + load1 + '</td></tr>';
    output += '<tr><td>Last 5 minutes</td><td>' + load5 + '</td></tr>';
    output += '<tr><td>Last 15 minutes</td><td>' + load15 + '</td></tr>';
    document.getElementById('loadaverages').innerHTML = output;
  }
}

function updateGraphics(data) {

  // Debug
  if (stop) {
    return;
  }

  // Update Metrics chart
  if ((cpu !== '') && (document.getElementById('metricstable') != null)) {
    // Update values
    document.getElementById('cpu_value').innerHTML = '<code>'+cpu.toFixed(2)+' %&nbsp;&nbsp;&nbsp;</code>';
    document.getElementById('tps_value').innerHTML = '<code>'+tps+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>';
    document.getElementById('mem_value').innerHTML = '<code>'+mem.toFixed(2)+' %&nbsp;&nbsp;&nbsp;</code>';
    document.getElementById('swp_value').innerHTML = '<code>'+swp.toFixed(2)+' %&nbsp;&nbsp;&nbsp;</code>';
    if (lda == '0') document.getElementById('lda_value').innerHTML = '<code>'+lda+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>'
    else document.getElementById('lda_value').innerHTML = '<code>'+lda+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>';
    document.getElementById('ifr_value').innerHTML = '<code>'+ifr.toFixed(2)+' kB/s</code>';
    document.getElementById('ift_value').innerHTML = '<code>'+ift.toFixed(2)+' kB/s</code>';
    document.getElementById('connections').innerHTML = '<code>'+con+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>';

  }

  // Update CPU chart
  if (document.getElementById('cpu') != null)
      drawClock(getCanvasContext('cpu'),cpu,140);

  // Update memfree chart
  if (document.getElementById('mem') != null)
      drawClock(getCanvasContext('mem'),mem,140);

  // Update swp chart
  if (document.getElementById('swp') != null)
      drawClock(getCanvasContext('swp'),swp,140);

  // Update tps chart
  if (tps !== '' && document.getElementById('tps_value_big') != null)
      document.getElementById('tps_value_big').innerHTML = tps;

  // Update lda chart
  if (lda !== '' && document.getElementById('lda_value_big') != null)
      document.getElementById('lda_value_big').innerHTML = lda;

  // Update iface chart
  if (ifr !== '' && document.getElementById('ifr_value_big') != null) {
      document.getElementById('ifr_value_big').innerHTML = ifr+' <span class="netunit">kB/s</span>';
      document.getElementById('ift_value_big').innerHTML = ift+' <span class="netunit">kB/s</span>';
  }

  // Update top chart
  if ((document.getElementById('top') != null) && (data !== null)) {
      drawTopTable(data);
  }

  // Update uptime
  if (document.getElementById('uptime') != null)
      drawUptime();
}
