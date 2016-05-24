/**
 * Created by Ilkka on 18.5.2016.
 */
"use strict";
var snwBot = require('../snw-bot').snwBot;
var lib = require('../lib');
var cmd = require('../commands');
var enjin = require('./enjin');
var dbEnjin = require('./dbModels/models');
var o = {};

o.register = function(){
  cmd.registerCommand('enjin', function(message, msg){
    if(msg.length > 1){
      switch(msg[1]){
        case 'link':
          link(message, msg[2]);
          break;
        case 'unlink':
          unlink(message);
          break;
      }
    }else{
      isLinked(message.author.id).then(function(linked){
        if(linked){
          snwBot.reply(message, 'Linked to user: ' + linked.enjinId);
        }else{
          snwBot.reply(message, 'Not linked to any user!');
        }
      });
    }
  });
};

var isLinked = function(id, isEnjin=false){
  return new Promise(function(resolve){
    var search = {
      discordId: id
    };
    if(isEnjin){
      search = {
        enjinId: id
      }
    }
    dbEnjin.discord.findOne(search, function(err, user){
      if( err ){
        //I am lazy
        resolve();
        return;
      }

      if( user ){
        resolve(user);
      }else{
        resolve();
      }
    });
  });
};

var link = function(message, id){
  isLinked(message.author.id).then(function(linked){
    if(linked){
      snwBot.reply(message, 'Linked to user: ' + linked.enjinId);
      return;
    }

    if(id){
      dbEnjin.discordLink.findOne({tempId: id}, function(err, link){
        if(err){
          snwBot.reply(message, 'Error while linking!');
          return;
        }

        if(link){
          var register = new dbEnjin.discord();
          register.discordId = message.author.id;
          register.enjinId = link.enjinId;

          register.save(function(err){
            if(err){
              snwBot.reply(message, 'Error while linking!');
            }else{
              snwBot.reply(message, 'Linked!');
            }
          });
          link.remove();
        }else{
          snwBot.reply(message, 'No linking request on that id!');
        }
      });
    }else{
      snwBot.reply(message, 'Not implemented!');
    }
  });
};

var unlink = function(message){
  dbEnjin.discord.findOne({discordId: message.author.id}, function(err, user){
    if(err){
      snwBot.reply(message, 'Error unlinking!');
      return;
    }

    if(user){
      user.remove();
      snwBot.reply(message, 'Unlinked!');
    }else{
      snwBot.reply(message, 'No link found!');
    }
  });
};

module.exports = o;