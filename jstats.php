<?php

require_once "config.php";
session_start();

if (!isset($_SESSION['login']) || !($_SESSION['login'] === true)) {
    header("Location: login.php");
}

// Get system stats
$output = "";
exec("sar -b -n DEV -q -r -u -S 1 $samples | grep Average", $output);

$moutput = array();

// Count number of lines
$lines = count($output);

// Convert output to a matrix
foreach ($output as $line) {
    // Clean multiple spaces
    $line = preg_replace("!\s+!", " ", $line);

    // Explode line
    $aline = explode(" ", $line);

    // Append to matrix
    $moutput[] = $aline;
}

// Init variables
$i = 0;
$metrics = array();

while ($i < $lines) {
  // Get interesting metrics
    switch ($moutput[$i][1]) {
        case "CPU":
            $metrics["CPU"] = 100-$moutput[$i+1][7];
            $i++;
            break;

        case "tps":
            $metrics["tps"] = (float)$moutput[$i+1][1];
            $i++;
            break;

        case "kbmemfree":
            $metrics["memused"] = (float)$moutput[$i+1][3];
            $i++;
            break;

        case "kbswpfree":
            $metrics["swpused"] = (float)$moutput[$i+1][3];
            $i++;
            break;

        case "runq-sz":
            $metrics["ldavg1"] = (float)$moutput[$i+1][3];
            $i++;
            break;

        case $iface:
          // rxkB/s txkB/s
            $metrics["ifacerxkB"] = (float)$moutput[$i][4];
            $metrics["ifacetxkB"] = (float)$moutput[$i][5];
            break;
    }

    $i++;
}

// Get top processes
$output = "";
exec("top -b -n 1 | grep -A 10 PID", $output);
$index = 0;

foreach ($output as $line) {
    // Clean multiple spaces
    $line = preg_replace("!\s+!", " ", $line);

    // Explode line
    $aline = explode(" ", $line);

    // Recover only columns 5, 6, 7, 8, 9, 10 and 12
    $metrics["top$index"][0] = $aline[5];
    $metrics["top$index"][1] = $aline[6];
    $metrics["top$index"][2] = $aline[7];
    $metrics["top$index"][3] = $aline[8];
    $metrics["top$index"][4] = $aline[9];
    $metrics["top$index"][5] = $aline[10];
    $metrics["top$index"][6] = $aline[12];
    $index++;
}

header('Content-Type: application/json;charset=UTF-8');
echo json_encode($metrics);
