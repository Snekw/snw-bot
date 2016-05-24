/**
 * Created by Ilkka on 12.5.2016.
 */
"use strict";
var o = {};
var snwBot = require('./snw-bot').snwBot;
var config = require('./configSelector')('main');

var _cmds = [];

o.registerCommandHandler = function(){
  snwBot.on('message', function(message){
    if(!message.content.startsWith(config.bot.prefix)) return;
    var msg = message.content.replace(config.bot.prefix, '').split(' ');
    msg[0] = msg[0].toLowerCase();

    for(var i = 0; i < _cmds.length; i++){
      if(_cmds[i].cmd == msg[0]){
        _cmds[i].handler(message, msg);
        break;
      }else{
        var found = false;
        for(var d = 0; d < _cmds[i].aliases.length; d++){
          if(_cmds[i].aliases[d] == msg[0]){
            _cmds[i].handler(message,msg);
            found = true;
            break;
          }
        }
        if(found) break;
      }
    }
  });
  console.log('Command handler registered');
};

o.getRegisteredCommands = function(){
  return _cmds;
};

o.registerCommand = function(cmd){
  _cmds.push(cmd);
  console.log('Registered command: ' + cmd.cmd);
};

o.removeCommand = function(cmd){
  for(var i = 0; i < _cmds.length; i++){
    if(_cmds[i].cmd == cmd){
      _cmds.splice(i,1);
      console.log('Removed command: ' + cmd);
      return;
    }
  }
};

class Command {
  constructor(cmd, aliases, name, description, usage, handler){

    if(name){
      this._cmd = cmd;
      this._aliases = aliases || [];
      this._name = name || 'No name';
      this._description = description || 'No description';
      this._usage = 'Usage: ' + usage || 'No usage info';
      this._handler = handler || function(message, msg){
          snwBot.reply(message, 'No command handler set for: ' + msg.toString());
        };
    }else{
      this._cmd = cmd.cmd;
      this._aliases = cmd.aliases || [];
      this._name = cmd.name || 'No name';
      this._description = cmd.description || 'No description';
      this._usage = 'Usage: ' + cmd.usage || 'No usage info';
      this._handler = cmd.handler || function(message, msg){
          snwBot.reply(message, 'No command handler set for: ' + msg.toString());
        };
    }
  }

  get cmd(){
    return this._cmd;
  }

  get name(){
    return this._name;
  }

  get description(){
    return this._description;
  }

  get usage(){
    return this._usage;
  }

  get aliases(){
    return this._aliases;
  }

  handler(message, msg){
    this._handler(message, msg);
  }
}

o.Command = Command;

module.exports = o;