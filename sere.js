// Metrics
var cpu = ''; // CPU
var tps = ''; // tps
var mem = ''; // memused
var swp = ''; // swpused
var lda = ''; // ldavg1
var ifr = ''; // ifacerxkB
var ift = ''; // ifacetxkB

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
    cpu = data.CPU;       // CPU
    tps = data.tps;       // tps
    mem = data.memused;   // memused
    swp = data.swpused;   // swpused
    lda = data.ldavg1;    // ldavg1
    ifr = data.ifacerxkB; // ifacerxkB
    ift = data.ifacetxkB; // ifacetxkB    

    // Update values
    document.getElementById('cpu_value').innerHTML = '<code>'+cpu.toFixed(2)+' %&nbsp;&nbsp;&nbsp;</code>';
    document.getElementById('tps_value').innerHTML = '<code>'+tps+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>';
    document.getElementById('mem_value').innerHTML = '<code>'+mem.toFixed(2)+' %&nbsp;&nbsp;&nbsp;</code>';
    document.getElementById('swp_value').innerHTML = '<code>'+swp.toFixed(2)+' %&nbsp;&nbsp;&nbsp;</code>';
    document.getElementById('lda_value').innerHTML = '<code>'+lda+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code>';
    document.getElementById('ifr_value').innerHTML = '<code>'+ifr.toFixed(2)+' kB/s</code>';
    document.getElementById('ift_value').innerHTML = '<code>'+ift.toFixed(2)+' kB/s</code>';

    // Update graphics
    updateGraphics(data);

  }, function(status) {
    alert('Something went wrong.');
  });

}

function getCanvasContext(x) {
  var canvas = document.getElementById(x);
  return canvas.getContext("2d");   
}

function drawClock(canvas,value) {
  // Limits (pixels)
  var minx = 50;
  var maxx = 250;
  var miny = 10; 
  var maxy = 150;

  // Center coordinates
  cx = minx+(maxx-minx)/2;
  //cy = miny+(maxy-miny)/2;
  cy = 150;

  // Clear canvas
  canvas.clearRect(0,0,300,160);

  // Draw clock background
  canvas.beginPath();
  canvas.arc(cx,cy,cx-minx-20,1*Math.PI,1.21*Math.PI,false);
  var startX = cx+(cx-minx-20)*Math.cos(1*Math.PI);
  var startY = cy+(cx-minx-20)*Math.sin(1*Math.PI);
  var endX = cx+(cx-minx-20)*Math.cos(1.21*Math.PI);
  var endY = cy+(cx-minx-20)*Math.sin(1.21*Math.PI);
  var gradient = canvas.createLinearGradient(startX,startY,endX,endY);
  gradient.addColorStop(0,'#42b64a');
  gradient.addColorStop(1,'#cedf29');
  canvas.lineWidth = 90;
  //canvas.strokeStyle='#42b64a';
  canvas.strokeStyle = gradient;
  canvas.stroke();
  canvas.beginPath();
  canvas.arc(cx,cy,cx-minx-20,1.2*Math.PI,1.41*Math.PI,false);
  startX = cx+(cx-minx-20)*Math.cos(1.2*Math.PI);
  startY = cy+(cx-minx-20)*Math.sin(1.2*Math.PI);
  endX = cx+(cx-minx-20)*Math.cos(1.41*Math.PI);
  endY = cy+(cx-minx-20)*Math.sin(1.41*Math.PI);
  gradient = canvas.createLinearGradient(startX,startY,endX,endY);
  gradient.addColorStop(0,'#cedf29');
  gradient.addColorStop(1,'#fabc0f');
  canvas.strokeStyle = gradient;
  //canvas.strokeStyle='#cedf29';
  canvas.stroke();
  canvas.beginPath();
  canvas.arc(cx,cy,cx-minx-20,1.4*Math.PI,1.61*Math.PI,false);
  startX = cx+(cx-minx-20)*Math.cos(1.4*Math.PI);
  startY = cy+(cx-minx-20)*Math.sin(1.4*Math.PI);
  endX = cx+(cx-minx-20)*Math.cos(1.61*Math.PI);
  endY = cy+(cx-minx-20)*Math.sin(1.61*Math.PI);
  gradient = canvas.createLinearGradient(startX,startY,endX,endY);
  gradient.addColorStop(0,'#fabc0f');
  gradient.addColorStop(1,'#f3661f');
  canvas.strokeStyle = gradient;
  //canvas.strokeStyle='#fabc0f';
  canvas.stroke();
  canvas.beginPath();
  canvas.arc(cx,cy,cx-minx-20,1.6*Math.PI,1.81*Math.PI,false);
  startX = cx+(cx-minx-20)*Math.cos(1.6*Math.PI);
  startY = cy+(cx-minx-20)*Math.sin(1.6*Math.PI);
  endX = cx+(cx-minx-20)*Math.cos(1.81*Math.PI);
  endY = cy+(cx-minx-20)*Math.sin(1.81*Math.PI);
  gradient = canvas.createLinearGradient(startX,startY,endX,endY);
  gradient.addColorStop(0,'#f3661f');
  gradient.addColorStop(1,'#cb201f');
  canvas.strokeStyle = gradient;
  //canvas.strokeStyle='#f3661f';
  canvas.stroke();
  canvas.beginPath();
  canvas.arc(cx,cy,cx-minx-20,1.8*Math.PI,2*Math.PI,false);
  startX = cx+(cx-minx-20)*Math.cos(1.8*Math.PI);
  startY = cy+(cx-minx-20)*Math.sin(1.8*Math.PI);
  endX = cx+(cx-minx-20)*Math.cos(2*Math.PI);
  endY = cy+(cx-minx-20)*Math.sin(2*Math.PI);
  gradient = canvas.createLinearGradient(startX,startY,endX,endY);
  gradient.addColorStop(0,'#cb201f');
  gradient.addColorStop(1,'#c42175');
  canvas.strokeStyle = gradient;
  //canvas.strokeStyle='#cb201f';
  canvas.stroke();

  // Draw clock hand
  canvas.beginPath();
  canvas.arc(cx,cy-10,6,2*Math.PI,false);
  canvas.fillStyle='black';
  canvas.strokeStyle='black';
  canvas.lineWidth = 7;
  canvas.fill();
  canvas.stroke();
  canvas.beginPath();
  canvas.lineWidth = 4;
  canvas.moveTo(cx,cy-10); // move to the center
  angle = Math.PI/2 + (Math.PI * (value/100));
  // Calculate displacements based on radius and angle
  dx = -(cx-minx) * Math.sin(angle);
  dy = (cx-minx) * Math.cos(angle);
  canvas.lineTo(cx+dx,cy+dy-5);
  canvas.strokeStyle = 'black';
  canvas.stroke();
/*
  canvas.beginPath();
  canvas.arc(cx,cy-10,2,2*Math.PI,false);
  canvas.strokeStyle='white';
  canvas.lineWidth = 1;
  canvas.fillStyle = 'white';
  canvas.fill();
*/
}

function drawTopTable(data) {
  var table = "";
  for (var i=0; i<11; i++) {
    var line = "";
    if (data['top'+i.toString()] !== null) {
      line = data['top'+i.toString()];
    }
    table += "<tr>";
    for (var j=0; j<7; j++) {
      if (line[j] !== null) {
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

function updateGraphics(data) {

  // Update CPU chart
  drawClock(getCanvasContext('cpu'),cpu);

  // Update memfree chart
  drawClock(getCanvasContext('mem'),mem);

  // Update swp chart
  drawClock(getCanvasContext('swp'),swp);

  // Update tps chart
  document.getElementById('tps_value_big').innerHTML = tps;

  // Update lda chart
  document.getElementById('lda_value_big').innerHTML = lda;

  // Update iface chart
  document.getElementById('ifr_value_big').innerHTML = ifr+' <span class="netunit">kB/s</span>';
  document.getElementById('ift_value_big').innerHTML = ift+' <span class="netunit">kB/s</span>';

  // Update top chart
  if (data !== null) {
    drawTopTable(data);
  }

}
