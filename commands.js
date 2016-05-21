/**
 * Created by Ilkka on 12.5.2016.
 */
"use strict";
var o = {};
var snwBot = {};
var config = require('./configSelector')('main');

var _cmds = [];

o.setBot = function(bot){
  snwBot = bot;
};

o.registerCommandHandler = function(){
  snwBot.on('message', function(message){
    if(!message.content.startsWith(config.bot.prefix)) return;
    var msg = message.content.replace(config.bot.prefix, '').split(' ');

    for(var i = 0; i < _cmds.length; i++){
      if(_cmds[i].name == msg[0]){
        _cmds[i].cmd(message, msg);
      }
    }
  });
  console.log('Command handler registered');
};

o.registerCommand = function(name, cmd){
  _cmds.push({name: name, cmd:cmd});
  console.log('Registered command: ' + name);
};


module.exports = o;