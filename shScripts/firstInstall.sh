#!/usr/bin/env bash
mkdir /home/snwbot
mkdir /home/snwbot/scripts
cp -r ./scripts /home/snwbot
chmod +x /home/snwbot/scripts/installDeb.sh
chmod +x /home/snwbot/scripts/run.sh
chmod +x /home/snwbot/scripts/update.sh

sudo /home/snwbot/scripts/installDeb.sh