function getCanvasContext(x) {
  var canvas = document.getElementById(x);
  return canvas.getContext("2d");   
}

function updateMetrics(iface) {
  // Metrics
  cpu = ''; // CPU
  tps = ''; // tps
  mem = ''; // %memused
  swp = ''; // %swpused
  lda = ''; // ldavg-1
  ifr = ''; // iface-rxkB
  ift = ''; // iface-txkB

  // Limits (pixels)
  var minx = 50;
  var maxx = 250;
  var miny = 50; 
  var maxy = 250;

  // Center coordinates
  cx = minx+(maxx-minx)/2;
  cy = miny+(maxy-miny)/2;

  // Update stats
  cpu = '63.91';
  document.getElementById('cpu_value').innerHTML = cpu+" %";

  // Get CPU chart
  var cpuChart = getCanvasContext('cpu');

  // Clear canvas
  cpuChart.clearRect(0,0,300,300);

  // Create gradient
  var gradient = cpuChart.createLinearGradient(minx,miny,maxx,miny);
  gradient.addColorStop(0,'green');
  gradient.addColorStop(0.4,'yellow');
  gradient.addColorStop(0.6,'yellow');
  gradient.addColorStop(1,'red');

  // Draw clock background
  cpuChart.beginPath();
  cpuChart.arc(cx,cy,cx-minx,1*Math.PI,2*Math.PI,false);
  cpuChart.lineWidth = 30;
  cpuChart.strokeStyle=gradient;
  cpuChart.stroke();

  // Draw clock hand
  cpuChart.beginPath();
  cpuChart.lineWidth = 2;
  cpuChart.moveTo(cx,cy); // move to the center
  angle = 1.5 * Math.PI - (Math.PI * (cpu/100)); // 100% CPU equals pi
  // Calculate displacements based on radius and angle
  dx = -(cx-minx) * Math.sin(angle);
  dy = -(cx-minx) * Math.cos(angle);
  cpuChart.lineTo(cx+dx,cy+dy);
  cpuChart.strokeStyle = 'black';
  cpuChart.stroke();

}
