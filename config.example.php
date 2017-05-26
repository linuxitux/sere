<?php

/**** Configuration ****/

// User
$user = "admin";
// Passsword for user
$pass = "ironmaiden";
// Hostname
$hostname = exec("hostname -A");
// Network device
$iface = "venet0";
// Samples for each run, 1 per second
$samples = 1;
// Update interval, must be > $samples
$update_interval = 3;
// Graph list - Ordering in this list sets the graphics positioning
/*
    Available graphics:

    cpu - CPU utilization
    mem - Memory utilization
    swp - Swap utilization
    top - Top 10 processes
    lda - Load average
    ifx - $iface received/sent kBytes
    tps - I/O transfers/second
    met - Metrics
    upt - Uptime

*/
$graphs = array('cpu','mem','swp','top','lda','ifx','tps','met','upt');

/***********************/

// Sysstat Graph config
define('SYSSTATDATAPATH','/var/log/sysstat');
define('JSONSTRUCTUREFILENAME','data.json');
define('NETWORKINTERFACELIST',serialize(array($iface)));
//define('NETWORKINTERFACELIST',serialize(array('lo',$iface)));

