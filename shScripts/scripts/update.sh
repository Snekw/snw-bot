#!/usr/bin/env bash
cd /home/snwbot

botVersion=$(curl -s https://api.github.com/repos/Snekw/snw-bot/releases/latest | jq -r ".tag_name")
echo ${botVersion}
wget "https://github.com/Snekw/snw-bot/archive/${botVersion}.tar.gz" -O - | tar -zx

runScript='/home/snwbot/scripts/run.sh'
botVersion=${botVersion#v}

rm ${runScript}
touch ${runScript}
rm /home/snwbot/snwbot-${botVersion}/shScripts/firstInstall.sh
printf "#!/usr/bin/env bash \nnode /home/snwbot/snwbot-${botVersion}/snw-bot.js\n" | tee --append ${runScript}

cd /home/snwbot/snwbot-${botVersion}
npm i --production