/**
 * Created by Ilkka on 12.5.2016.
 * https://discordapp.com/oauth2/authorize?client_id=180233414694273034&scope=bot
 */
"use strict";
var Discord = require('discord.js');
var snwBot = new Discord.Client();
var cfg = require('./configSelector')('main');
var lib = require('./lib');
var cmd = require('./commands');
var enjin = require('./enjin/bot');

//Start the express server
var server = require('./express/server');

lib.setBot(snwBot);
cmd.setBot(snwBot);
enjin.setBot(snwBot);

snwBot.on('ready', function(){
  cmd.registerCommandHandler();
  //require('./moderation')(snwBot);

  cmd.registerCommand('test', function(message, msg){
    snwBot.reply(message, 'no');
  });
  
  cmd.registerCommand('website', function(message, msg){
    snwBot.reply(message, 'http://www.wisegamer.net');
  });

  //Register enjin commands
  enjin.register();

  snwBot.setStatus('here', 'Beep ploob').catch(function(err){
    console.log(err);
  });
});

snwBot.on('presence', function(oldUser, newUser){
  if(oldUser.bot){
    return;
  }

  if(newUser.status === 'offline'){
     return lib.sendToBotChannels(newUser.username + ' disconnected.', newUser);
  }

  if(oldUser.status === 'offline' && newUser.status === 'online'){
    // setWSGPrefix(newUser);
    return lib.sendToBotChannels(newUser.username + ' connected.', newUser);
  }
});


snwBot.loginWithToken(cfg.bot.token).then(loginSuccess).catch(loginErr);

function loginSuccess(success){
  console.log('Logged in');
}

function loginErr(err){
  console.log('Login error');
  console.log(err);
}

function setWSGPrefix(user){
  var servers = lib.getUserServers(user);
  for(var i = 0; i < servers.length; i++){
    var roles = servers[i].rolesOfUser(user);
    for(var d = 0; d < roles.length; d++){
      if(roles[d].name == 'Community Member'){
        lib.setNick(servers[i], user, '-WSG- ' + user.username);
      }
    }
  }
};