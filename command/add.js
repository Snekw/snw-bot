/**
 * Created by Ilkka on 24.5.2016.
 */
"use strict";
var snwBot = require('../snw-bot').snwBot;
var cmd = require('../commands');
var mongoose = require('mongoose');

require('../db/customCmd');
var customCmd = mongoose.model('customCmd');

var addCmd = function(message, msg){
  if(msg.length < 3 ){
    snwBot.reply(message, add.usage);
    return;
  }

  var _cmd = msg[1].toLowerCase();
  msg.splice(0, 2);
  var _text = msg.join(' ');

  var s = cmd.getRegisteredCommands();

  for(var i = 0; i < s.length; i++){
    if(s[i].cmd === _cmd ){
      snwBot.reply(message, 'Can\'t add command');
      return;
    }
  }

  customCmd.findOne({cmd: msg[1]}, function(err, found){
    if(err || found){
      snwBot.reply(message, 'Can\'t add command');
    }else{
      var newCmd = new customCmd();
      newCmd.cmd = _cmd;
      newCmd.text = _text;
      newCmd.save(function(err){
        if(err){
          snwBot.reply(message, 'Can\'t add command');
        }else{

          var cCommand = new cmd.Command({
            name: _cmd.capitalizeFirstLetter(),
            cmd: _cmd,
            usage: _cmd,
            handler: customCommandHandler
          });
          cmd.registerCommand(cCommand);
          snwBot.reply(message, 'Command \'' + _cmd + '\' added.');
        }
      })
    }
  });
};

var removeCmd = function(message, msg){
  if(msg.length !== 2){
    snwBot.reply(message, remove.usage);
    return;
  }
  var _cmd = msg[1].toLowerCase();
  customCmd.findOne({cmd: _cmd}, function(err, found){
    if(err){
      snwBot.reply(message, 'Couldn\'t remove command.');
      return;
    }

    if(found){
      found.remove();
      cmd.removeCommand(_cmd);
      snwBot.reply(message, 'Removed command: ' + _cmd);
    }else{
      snwBot.reply(message, 'Couldn\'t remove command.');
    }
  });
};

var registerCommandsFromDb = function(){
  customCmd.find({}, function(err, commands){
    if(err) return;
    
    if(!commands) return;
    
    for(var i = 0; i < commands.length; i++){
      var _cmd = new cmd.Command({
        cmd: commands[i].cmd.toLowerCase(),
        name: commands[i].cmd.capitalizeFirstLetter(),
        description: 'Custom command',
        handler: customCommandHandler
      });
      cmd.registerCommand(_cmd);
    }
  })
};

var listCmd = function(message, msg){
  if(msg.length != 1) {
    snwBot.reply(message, list.usage);
    return;
  }

  customCmd.find({}, function(err, commands){
    if(err || !commands){
      snwBot.reply(message, 'Couldn\'t get list.');
      return;
    }

    var temp = [];
    for(var i = 0; i < commands.length; i++){
      temp.push(commands[i].cmd);
    }
    var list = temp.join(', ');
    snwBot.reply(message, list);
  });
};

var customCommandHandler = function(message, msg){
  if(msg.length != 1) return;

  customCmd.findOne({cmd: msg[0]}, function(err, found){
    if(err){
      snwBot.reply(message, 'Error');
      return;
    }

    if(found){
      snwBot.sendMessage(message, found.text);
    }
  })
};

/********** Commands ***************/

var add = new cmd.Command( {
  cmd        : 'add',
  aliases    : [],
  name       : 'Add',
  description: 'Add a command that replies text',
  usage      : `add [cmd] [text to reply]`,
  handler    : addCmd
});

var remove = new cmd.Command( {
  cmd        : 'remove',
  aliases    : [],
  name       : 'Remove',
  description: 'Remove previously added command',
  usage      : `remove [cmd]`,
  handler    : removeCmd
});

var list = new cmd.Command({
  cmd: 'list',
  aliases: [],
  name: 'List',
  description: 'List all custom commands',
  usage: 'list',
  handler: listCmd
});


module.exports = {
  enabled: true,
  registerCommands: function(){
    cmd.registerCommand(add);
    cmd.registerCommand(remove);
    cmd.registerCommand(list);

    registerCommandsFromDb();
  }
};