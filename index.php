<?php

include "config.php";

?>
<html>
<head>
<title><?php echo $hostname; ?></title>
<script src="sere.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="template.css">
</head>
<body>

<center>

<div class="metrics">
<h4>Metrics</h4>
<table border="0" width="300px">
<tr><td>CPU</td><td><span id="cpu_value">No data.</span></td></tr>
<tr><td>TPS</td><td><span id="tps_value">No data.</span></td></tr>
<tr><td>Memory</td><td><span id="mem_value">No data.</span></td></tr>
<tr><td>Swap</td><td><span id="swp_value">No data.</span></td></tr>
<tr><td>Load</td><td><span id="lda_value">No data.</span></td></tr>
<tr><td>kB received (<?php echo $iface; ?>)</td><td><span id="ifr_value">No data.</span></td></tr>
<tr><td>kB sent (<?php echo $iface; ?>)</td><td><span id="ift_value">No data.</span></td></tr>
</table>
</div>

<div class="metrics">
<h4>CPU</h4>
<canvas id="cpu" width="300" height="160">Your browser doesn't support canvas.</canvas>
</div>

<div class="metrics">
<h4>Memory</h4>
<canvas id="mem" width="300" height="160">Your browser doesn't support canvas.</canvas>
</div>

<div class="metrics">
<h4>Swap</h4>
<canvas id="swp" width="300" height="160">Your browser doesn't support canvas.</canvas>
</div>





</center>

<script>
updateGraphics();
updateMetrics();
</script>
</body>
