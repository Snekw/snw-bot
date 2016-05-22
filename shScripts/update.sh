#!/usr/bin/env bash
cd /home

cp -r snwbot/config temp/config
rm -r snwbot

mkdir snwbot
cp -r temp/config snwbot/configOLD
cd snwbot
curl -s https://api.github.com/repos/Snekw/snw-bot/releases/latest | jq -r ".assets[] | select(.name | test(\".tar.gz\")) | .browser_download_url" | tar xz
