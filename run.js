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

snwBot.on('ready', function () {
  //Starts the handler for custom commands
  cmd.registerCommandHandler();

  //Registers the commands from ./command directory
  cmd.registerCommandDir();

  var status = 'Beep Boop';
  if (process.env.SNW_BOT_DEV) {
    status = 'InDev - Beep ERR';
  }
  snwBot.setStatus('here', status).catch(function (err) {
    console.log(err);
  });

  lib.sendToBotChannels('Bot is live');
});

snwBot.on('presence', function (oldUser, newUser) {
  if (oldUser.bot) {
    return;
  }

  if (newUser.status === 'offline') {
    return lib.sendToBotChannels(newUser.username + ' disconnected.', newUser);
  }

  if (oldUser.status === 'offline' && newUser.status === 'online') {
    // setWSGPrefix(newUser);
    return lib.sendToBotChannels(newUser.username + ' connected.', newUser);
  }
});