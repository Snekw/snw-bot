/**
 * Created by Ilkka on 24.5.2016.
 */
"use strict";
var snwBot = require('./snw-bot').snwBot;
var mongoose = require('mongoose');
var server = require('./express/server');
var lib = require('./lib');

//Handle shutdown
process.on('SIGINT', function(){
  handleExit();
});

var handleExit = function(){
  console.log('Shutting down');
  lib.sendToBotChannels('Bot shutting down!').then(function(){
    snwBot.logout(function(){
      snwBot.removeAllListeners();
      server.close();
      mongoose.disconnect();
      process.exit(0);
    });
  });
};

module.exports = {
  handleExit: handleExit
};