/**
 * Created by Ilkka on 12.5.2016.
 */
"use strict";
var snwBot = require('./snw-bot').snwBot;
var o = {};

o.getUserServers = function (user) {
  var ret = [];
  var sServers = snwBot.internal.servers;
  for (var i = 0; i < sServers.length; i++) {
    for (var d = 0; d < sServers[i].members.length; d++) {
      if (sServers[i].members[d].username === user.username) {
        ret.push(sServers[i]);
      }
    }
  }
  return ret;
};

o.getBotChannels = function (servers) {
  return o.getChannelsWithName(servers, 'snw-bot');
};

o.getChannelsWithName = function (servers, name) {
  var ret = [];
  for (var i = 0; i < servers.length; i++) {
    for (var c = 0; c < servers[i].channels.length; c++) {
      if (servers[i].channels[c].name === name) {
        ret.push(servers[i].channels[c]);
      }
    }
  }
  return ret;
};

o.getChannelWithName = function (server, name) {
  var ret = {};
  for (var c = 0; c < server.channels.length; c++) {
    if (server.channels[c].name === name) {
      ret = server.channels[c];
    }
  }
  return ret;
};

o.sendToBotChannels = function (message, user = null, noTime = true) {
  return new Promise(function (resolve) {
    var channels;
    if (user != null) {
      channels = o.getBotChannels(o.getUserServers(user));
    } else {
      channels = o.getBotChannels(snwBot.servers);
    }

    for (var i = 0; i < channels.length; i++) {
      var time = new Date();
      if (!noTime) {
        message = '[' + time.toUTCString() + '] ' + message;
      }
      snwBot.sendMessage(channels[i], message).then(function () {
        resolve();
      });
    }
  });
};

o.sendToModerationChannel = function (message, server, noTime = true) {
  return new Promise(function (resolve) {
    var channel = o.getChannelWithName(server, 'snw-moderation');
    var time = new Date();
    if (!noTime) {
      message = '[' + time.toUTCString() + '] ' + message;
    }
    snwBot.sendMessage(channel, message).then(function () {
      resolve();
    });
  });
};

o.setNick = function (server, user, nick = 'null') {
  if (nick === 'null') {
    snwBot.reply(message, 'Can\'t set to null you idiot!');
    return;
  }
  server.setNickname(nick, user).then(function (s) {
    console.log(s);
  }).catch(function (err) {
    console.log(err);
  });
};

o.getUserFromMention = function (mention, message) {
  var user = mention;
  user = user.replace('<@', '');
  user = user.slice(0, -1);
  for (var i = 0; i < message.mentions.length; i++) {
    if (message.mentions[i].id == user) {
      return message.mentions[i];
    }
  }
  return null;
};

module.exports = o;