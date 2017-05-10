<?php

/**** Configuration ****/

// Hostname
$hostname = exec("hostname -A");
// Network device
$iface = "venet0";
// Samples for each run, 1 per second
$samples = 1;
// Update interval, must be > $samples
$update_interval = 3;

/***********************/

?>
