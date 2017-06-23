<?php


class graphics {

    var $graphList = null;
    var $iface = null;

    function draw() {

        if ($this->graphList == null) {
            return 1;
        }

        // small graphics
        foreach ($this->graphList as $g) {

            switch($g) {

                case 'cpu':
                ?>
                <div class="metrics-container">
                  <div class="multi-metrics">
                    <h4>CPU</h4>
                    <canvas id="cpu" width="140" height="85">Your browser doesn't support canvas.</canvas>
                  </div>
                  <div class="multi-metrics">
                    <h4>Load</h4>
                    <center><p class="bigmetric"><span id="lda_value_big">No data.</span></p></center>
                  </div>
<br /><br />
                  <div class="multi-metrics">
                    <h4>Memory</h4>
                    <canvas id="mem" width="140" height="85">Your browser doesn't support canvas.</canvas>
                  </div>
                  <div class="multi-metrics">
                    <h4>Swap</h4>
                    <canvas id="swp" width="140" height="85">Your browser doesn't support canvas.</canvas>
                  </div>
                </div>
                <?php
                break;
/*
                case 'mem':
                ?>
                <div class="small-metrics">
                <h4>Memory</h4>
                <canvas id="mem" width="140" height="85">Your browser doesn't support canvas.</canvas>
                </div>
                <?php
                break;

                case 'swp':
                ?>
                <div class="small-metrics">
                <h4>Swap</h4>
                <canvas id="swp" width="140" height="85">Your browser doesn't support canvas.</canvas>
                </div>
                <?php

                break;

                case 'lda':
                ?>
                <div class="small-metrics">
                <h4>Load</h4>
                <center><p class="bigmetric"><span id="lda_value_big">No data.</span></p></center>
<!--
                <p class="smallnote">System load average for the last minute.
                The load average is calculated as the average number
                of runnable or running tasks (R state), and the number
                of tasks in uninterruptible sleep (D state) over the
                specified interval.</p>
-->
                </div>
                <?php
                break;

                case 'tps':
                ?>
                <div class="small-metrics">
                <h4>I/O</h4>
                <center><p class="bigmetric"><span id="tps_value_big">No data.</span></p></center>
<!--
                <p class="smallnote">Total number of transfers per second that
                were issued to physical devices. A transfer
                is an I/O request to a physical device.
                Multiple logical requests can be combined
                into a single I/O request to the device.</p>
-->
                </div>
                <?php
                break;
*/
            }

        }

        //echo "<br />";

        // big graphics
        foreach ($this->graphList as $g) {

            switch($g) {

                case 'top':
                ?>
                <div class="metrics">
                <h3>Top processes</h3>
                <table id="top" class="toptable"><tr><td>No data.</td></tr></table>
                </div>
                <?php
                break;

                case 'ifx':
                ?>
                <div class="metrics">
                <h3><?php echo $this->iface; ?></h3>
                <center>
                <table class="ifacetable" border=0 width="300px">
                <tr><td align="right"><p class="bigmetric"><span id="ifr_value_big">No data.</span></p></td>
                <td width="35%"><p><b>&darr;</b> received</p></td></tr>
                <tr><td align="right"><p class="bigmetric"><span id="ift_value_big">No data.</span></p></td>
                <td><p><b>&uarr;</b> sent</p></td></tr>
                </table>
                </center>
<!--
                <p class="smallnote">Total number of kilobytes received and transmitted per second.</p>
-->
                </div>
                <?php
                break;

               case 'met':
                ?>
                <div class="metrics">
                <h3>Metrics</h3>
                <table id="metricstable" class="metricstable">
                <tr><td>CPU</td><td style="text-align: right;"><span id="cpu_value">No data.</span></td></tr>
                <tr><td>Load</td><td style="text-align: right;"><span id="lda_value">No data.</span></td></tr>
                <tr><td>Memory</td><td style="text-align: right;"><span id="mem_value">No data.</span></td></tr>
                <tr><td>Swap</td><td style="text-align: right;"><span id="swp_value">No data.</span></td></tr>
                <tr><td>I/O (TPS)</td><td style="text-align: right;"><span id="tps_value">No data.</span></td></tr>
                <tr><td>kB received</td><td style="text-align: right;"><span id="ifr_value">No data.</span></td></tr>
                <tr><td>kB sent</td><td style="text-align: right;"><span id="ift_value">No data.</span></td></tr>
                <tr><td>ESTABLISHED</td><td style="text-align: right;"><span id="connections">No data.</span></td></tr>
                </table>
                </div>
                <?php
                break;

                case 'upt':
                ?>
                <div class="metrics">
                <h3>Uptime</h3>
                <table id="uptime" class="toptable"><tr><td>No data.</td></tr></table>
                <h3>Load averages</h3>
                <table id="loadaverages" class="toptable"><tr><td>No data.</td></tr></table>
                </div>
                <?php
                break;
            }

        }

        return 0;

    }

    function __construct($g, $i) {

        $this->graphList = $g;
        $this->iface = $i;

    }

}

