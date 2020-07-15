# sere
Small tool to monitor your server/VPS load from a Web browser. Mobile friendly.

sere is a small tool to live monitor you server from any Web browser.
You only need to install it on your server in any browsable folder, and start monitoring
CPU utilization, memory and swap usage, I/O transfers, load, network activity and more.

## Demo

* [Monitoreá la carga de tu servidor Web desde un celular con sere](https://www.linuxito.com/programacion/879-monitorea-la-carga-de-tu-servidor-web-desde-un-celular-con-sere)
* [sere 0.2.3 - YouTube](https://youtu.be/SLLiKNZMyqo)

## Requierements

* PHP >= 5.4
* sysstat == 10.0.5 (http://pagesperso-orange.fr/sebastien.godard/)


### SysStat installation

On Debian and derivatives:

    apt-get install sysstat

On Red Hat and derivatives:

    yum install sysstat

## Installation

    wget https://github.com/linuxitux/sere/archive/v0.1.0.tar.gz
    tar xzf v0.1.0.tar.gz -C /var/www

## Configuration

    cd /var/www/sere
    > data.json
    chown www-data:www-data data.json
    chmod 750 data.json
    cp config.example.php config.php
    vi config.php

Edit the following variables accordingly:

* $user - username for login.
* $pass - password for login.
* $iface - network device you want to monitor.
* $samples - number of sar samples for each request, 1 per second.
* $update_interval - number of seconds between updates. It must be greater than the number of samples.
* SYSSTATDATAPATH - location of sarXX files (default is /var/log/sysstat)
