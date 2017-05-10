<?php

include "config.php";

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
  $aline = explode(" ",$line);

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

header('Content-Type: application/json;charset=UTF-8');
echo json_encode($metrics);
