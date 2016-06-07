/**
 * Created by Ilkka on 25.5.2016.
 */
"use strict";
var processLife = require('../processLife');
var snwBot = require('../snw-bot').snwBot;
var cmd = require('../commands');

var cmdExit = new cmd.Command({
  cmd: 'exit',
  enabled: true,
  name: 'Exit',
  aliases: ['shutdown'],
  description: 'Shutdown the bot',
  usage: 'No params',
  handler: function (message, msg) {
    processLife.handleExit();
  }
});

var cmdRoleId = new cmd.Command({
  cmd: 'roleid',
  enabled: true,
  name: 'RoleId',
  description: 'List role id\'s and their names',
  usage: 'roleid',
  handler: function (message, msg) {
    var roles = message.channel.server.roles;
    var list = [];
    for (var i = 0; i < roles.length; i++) {
      list.push(roles[i].name + ': ' + roles[i].id);
    }

    var rep = '```\n' + list.join(',\n').replace('@', '') + '```';
    snwBot.reply(message, rep);
  }
});

module.exports = {
  enabled: true,
  registerCommands: function () {
    cmd.registerCommand(cmdExit);
    cmd.registerCommand(cmdRoleId);
  }
};