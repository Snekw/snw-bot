/**
 * Created by Ilkka on 12.5.2016.
 */
"use strict";
var cmd = require('./commands');
var lib = require('./lib');

module.exports = function(snwBot){
  cmd.registerCommand('ban', function(message, msg){
    if(!msg[1] || !msg[2]){
      snwBot.reply(message, 'You need to @mention the user! And supply a reason.');
      return;
    }

    var user = lib.getUserFromMention(msg[1], message);

    var reason = msg.splice(2, msg.length-2).join(' ');
    snwBot.banMember(user ,message).catch(function(err){
      console.log(err);
    });
    lib.sendToModerationChannel(msg[1] + ' got banned by ' + message.author + ' for ' + reason, message.channel.server);
  });

  cmd.registerCommand('unban', function(message, msg){
    if(!msg[1]){
      snwBot.reply(message, 'You need to give the username!');
      return;
    }

    snwBot.getBans(message).then(function(bans){
      for(var i = 0; i < bans.length; i++){
        if(bans[i].username === msg[1]){
          snwBot.unbanMember(bans[i], message).then(function(b){
            lib.sendToModerationChannel( msg[1] + ' got unbanned by ' + message.author.username, message.channel.server);
          }).catch(function(err){
            console.log(err);
          });
        }
      }
    }).catch(function(err){
      console.log(err);
    });
  });

  cmd.registerCommand('kick', function(message, msg){
    if(!msg[1] || !msg[2]){
      snwBot.reply(message, 'You need to @mention the user! And supply a reason.');
      return;
    }

    var user = lib.getUserFromMention(msg[1], message);
    var reason = msg.splice(2, msg.length-2).join(' ');
    snwBot.kickMember(user, message).then(function(){
      lib.sendToModerationChannel(user.username + ' got kicked by ' + message.author.username + ' for ' + reason, message.channel.server);
    }).catch(function(err){
      console.log(err);
    });
  });

  cmd.registerCommand('prune', function(message, msg){
    var count = msg[1] || 100;
    count++;
    snwBot.getChannelLogs(message.channel, count).then(function(messages){
      snwBot.deleteMessages(messages).then(function(){
        var m = ' pruned channel.';
        if(count != 100){
          var s = count - 1;
          m = message.author.username + ' pruned ' + s.toString() + ' messages.';
        }
        snwBot.sendMessage(message.channel, m).catch(function(err){
          console.log(err);
        });
        lib.sendToModerationChannel(m + ' Channel: ' + message.channel.name, message.channel.server);
      }).catch(function(err){
        console.log(err);
      })
    }).catch(function(err){
      console.log(err);
    })
  });


  // snwBot.on('userBanned', function(user, server){
  //   lib.sendToModerationChannel(user.username + ' got banned.', server);
  // });
  //
  // snwBot.on('userUnbanned', function(user, server){
  //   lib.sendToModerationChannel(user.username + ' got unbanned.', server);
  // });
};