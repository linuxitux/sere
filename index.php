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
<h4>CPU</h4>
<canvas id="cpu" width="300" height="300">No data available.</canvas>
</center>

<script>
updateMetrics('<?php echo $iface; ?>');
</script>
</body>
