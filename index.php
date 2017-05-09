<?php

include "config.php";

?>
<html>
<head>
<title><?php echo $hostname; ?></title>
<script src="sere.js" type="text/javascript"></script>
</head>
<body>
<center>
<h3>CPU Utilisation</h3>
<canvas id="cpu" width="300" height="300">Your browser doesn't support canvas.</canvas>
<p><span id="cpu_value">No data available.</span></p>
</center>

<script>
updateMetrics('<?php echo $iface; ?>');
</script>
</body>
