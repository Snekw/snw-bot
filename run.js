/**
 * Created by Ilkka on 24.5.2016.
 */
"use strict";
require('./extensions');

var processLife = require('./processLife');
var lib = require('./lib');
var cmd = require('./commands');
var enjin = require('./enjin/bot');
var server = require('./express/server');
var snwBot = require('./snw-bot').snwBot;

var addCmd = require('./command/add');

snwBot.on('ready', function(){
  cmd.registerCommandHandler();
  //require('./moderation')(snwBot);

  var cmdExit = new cmd.Command({
    cmd: 'exit',
    name: 'Exit',
    aliases: ['shutdown'],
    description: 'Shutdown the bot',
    usage: 'No params',
    handler: function(message, msg){
      processLife.handleExit();
    }
  });
  addCmd.registerCommands();
  cmd.registerCommand(cmdExit);
  //Register enjin commands
  // enjin.register();

  var status = 'Beep Boop';
  if(process.env.SNW_BOT_DEV){
    status = 'InDev';
  }
  snwBot.setStatus('here', status).catch(function(err){
    console.log(err);
  });

  lib.sendToBotChannels('Bot is live');
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