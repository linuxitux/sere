# sere
Small tool to monitor your server/VPS load from a Web browser. Mobile friendly.

sere it's a small tool to live monitor you server from any Web browser.
You only need to install it on your server in any browsable folder, and start monitoring
CPU utilisation, memory and swap usage, I/O transfers, load, network activity and more.

## Requierements

* PHP >= 5.4
* sysstat >= 10.0.5 (http://pagesperso-orange.fr/sebastien.godard/)

    apt-get install sysstat

## Installation

    wget https://github.com/linuxitux/sere/archive/v0.1.0.tar.gz
    tar xzf v0.1.0.tar.gz -C /var/www

## Configuration

    cd /var/www/sere
    vi config.php

Edit the following varaibles accordingly:

* $user - username for login.
* $pass - password for login.
* $iface - network device you want to monitor.
* $samples - number of samples for each request, 1 per second.
* $update_interval - number of seconds between updates. It must be greater than the number of samples.

