<?php

require_once "config.php";
session_start();

if (!isset($_SESSION['login']) || !($_SESSION['login'] === true)) {
    header("Location: login.php");
}

?>
<html>
<head>
<title>stats for <?php echo $hostname; ?> - sere</title>
<script src="sere.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="template.css">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>

<h1>Load stats for <span class="hostname"><?php echo $hostname; ?></span> - sere</h1>

<div class="container">

<div class="metrics">
<h4>Metrics</h4>
<table border="0" width="300px">
<tr><td>CPU</td><td align="right"><span id="cpu_value">No data.</span></td></tr>
<tr><td>TPS</td><td align="right"><span id="tps_value">No data.</span></td></tr>
<tr><td>Memory</td><td align="right"><span id="mem_value">No data.</span></td></tr>
<tr><td>Swap</td><td align="right"><span id="swp_value">No data.</span></td></tr>
<tr><td>Load</td><td align="right"><span id="lda_value">No data.</span></td></tr>
<tr><td>kB received</td><td align="right"><span id="ifr_value">No data.</span></td></tr>
<tr><td>kB sent</td><td align="right"><span id="ift_value">No data.</span></td></tr>
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

<div class="metrics">
<h4>Load</h4>
<center><p class="bigmetric"><span id="lda_value_big">No data.</span></p></center>
<p class="smallnote">System load average for the last minute.
The load average is calculated as the average number
of runnable or running tasks (R state), and the number
of tasks in uninterruptible sleep (D state) over the
specified interval.</p>
</div>

<div class="metrics">
<h4><?php echo $iface; ?></h4>
<center>
<p class="bigmetric">
<table border=0 width="300px">
<tr><td align="right"><p class="bigmetric"><span id="ifr_value_big" style="font-size: 80%;">No data.</span></p></td>
<td><p><b>&darr;</b> received</p></td></tr>
<tr><td align="right"><p class="bigmetric"><span id="ift_value_big" style="font-size: 80%;">No data.</span></p></td>
<td><p><b>&uarr;</b> sent</p></td></tr>
</table>
</p>
</center>
<p class="smallnote">Total number of kilobytes received and transmitted per second.</p>
</div>

<div class="metrics">
<h4>I/O</h4>
<center><p class="bigmetric"><span id="tps_value_big">No data.</span></p></center>
<p class="smallnote">Total number of transfers per second that
were issued to physical devices. A transfer
is an I/O request to a physical device.
Multiple logical requests can be combined
into a single I/O request to the device.</p>
</div>

<div class="metrics">
<h4>Top processes</h4>
<table id="top" class="toptable"><tr><td>No data.</td></tr></table>
</div>

<div class="metrics">
<h4>Uptime</h4>
<table id="uptime" class="toptable"><tr><td>No data.</td></tr></table>
<h4>Load averages</h4>
<table id="loadaverages" class="toptable"><tr><td>No data.</td></tr></table>
</div>

</div>

<script>
updateGraphics(null);
var loop = window.setInterval(updateMetrics,1000*<?php echo $update_interval; ?>);
</script>

</body>
