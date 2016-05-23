#!/usr/bin/env bash
cd /home/snwbot

botVersion=''

until [ -n "$botVersion" ] && [ "$botVersion" != "null" ]
do
 botVersion=$(curl -s https://api.github.com/repos/Snekw/snw-bot/releases/latest | jq -r ".tag_name")

 if [ -n "$botVersion" ] && [ "$botVersion" != "null" ]
  then
    break
  else
    echo ${botVersion}
    echo 'Failed to get botVersion... Trying again in 5 second.'
    sleep 5
 fi
done

echo ${botVersion}

wget "https://github.com/Snekw/snw-bot/archive/${botVersion}.tar.gz" -O - | tar -zx

sleep 1

runScript='/home/snwbot/scripts/run.sh'
botVersion=${botVersion#v}

rm ${runScript}
touch ${runScript}
rm /home/snwbot/snw-bot-${botVersion}/shScripts/firstInstall.sh
printf "#!/usr/bin/env bash \nnode /home/snwbot/snw-bot-${botVersion}/snw-bot.js\n" | tee --append ${runScript}

cd /home/snwbot/snw-bot-${botVersion}
npm i --production