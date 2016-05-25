/**
 * Created by Ilkka on 12.5.2016.
 */
"use strict";
var o = {};
var fs = require('fs');
var snwBot = require('./snw-bot').snwBot;
var config = require('./config/configSelector')('main');

var _cmds = [];

o.registerCommandDir = function(){
  fs.readdirSync('./command').forEach(function(file){
    var temp = require('./command/' + file);
    if(temp.enabled){
      temp.registerCommands();
    }
  });
};

o.registerCommandHandler = function(){
  snwBot.on('message', function(message){
    if(!message.content.startsWith(config.bot.prefix)) return;
    var msg = message.content.replace(config.bot.prefix, '').split(' ');
    msg[0] = msg[0].toLowerCase();

    for(var i = 0; i < _cmds.length; i++){
      //main command
      if(_cmds[i].cmd == msg[0]){
        if(o.rolesCheck(message, _cmds[i].roles)){
          _cmds[i].handler(message, msg);
        }
        break;
      }else{

        //Check for aliases
        var found = false;
        for(var d = 0; d < _cmds[i].aliases.length; d++){
          if(_cmds[i].aliases[d] == msg[0]){
            if(o.rolesCheck(message, _cmds[i].roles)){
              _cmds[i].handler(message, msg);
            }
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

o.rolesCheck = function(message, roles){
    if(!message || !roles){
      return false;
    }
    for(var i = 0; i < roles.length; i++){
      if(o.roleCheck(message, roles[i])){
        return true;
      }
    }
    return false;
};

o.roleCheck = function(message, role){
  if(!message || !role){
    return false;
  }
  var found = false;
  for(var i = 0; i < config.bot.roles.length; i++){
    if(config.bot.roles[i].name === role){
      role = config.bot.roles[i].id;
      found = true;
      break;
    }
  }
  if(!found){
    return false;
  }

 if(snwBot.userHasRole(message.author, role)){
   return true;
 }
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
  constructor(cmd, aliases, name, description, usage, roles, handler){

    if(name){
      this._cmd = cmd;
      this._aliases = aliases || [];
      this._name = name || 'No name';
      this._description = description || 'No description';
      this._usage = 'Usage: ' + usage || 'No usage info';
      this._roles = roles || ['administrator'];
      this._handler = handler || function(message, msg){
          snwBot.reply(message, 'No command handler set for: ' + msg.toString());
        };
    }else{
      this._cmd = cmd.cmd;
      this._aliases = cmd.aliases || [];
      this._name = cmd.name || 'No name';
      this._description = cmd.description || 'No description';
      this._usage = 'Usage: ' + cmd.usage || 'No usage info';
      this._roles = cmd.roles || ['administrator'];
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

  get roles(){
    return this._roles;
  }

  handler(message, msg){
    this._handler(message, msg);
  }
}

o.Command = Command;

module.exports = o;