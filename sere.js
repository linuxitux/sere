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
  cpu = '1.35';

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

  // Draw arc
  cpuChart.beginPath();
  cpuChart.arc(cx,cy,cx-minx,1*Math.PI,2*Math.PI,false);
  cpuChart.lineWidth = 30;
  cpuChart.strokeStyle=gradient;
  cpuChart.stroke();

   // Draw line
  cpuChart.beginPath();
  cpuChart.lineWidth = 2;
  lienzo.moveTo(cx,cy); // posiciono el lápiz en el centro del recuadro
  angulo = 2*Math.PI * (minuto/60); // calculo el ángulo del minutero
  // Calculo los desplazamientos para el minutero
  dx = minutero * Math.sin(angulo);
  dy = -minutero * Math.cos(angulo);
  lienzo.lineTo(cx+dx,cy+dy);
  lienzo.stroke();

}
