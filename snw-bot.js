/**
 * Created by Ilkka on 12.5.2016.
 * https://discordapp.com/oauth2/authorize?client_id=180233414694273034&scope=bot
 */
"use strict";
var Discord = require('discord.js');
var snwBot = new Discord.Client();
var config = require('./config/configSelector')('main');

if (config.bot.token.length > 0)
  snwBot.loginWithToken(config.bot.token).then(loginSuccess).catch(loginErr);
else
  console.log('NO TOKEN!');

function loginSuccess(success) {
  console.log('Logged in');

  for (var i = 0; i < config.bot.roles.length; i++) {
    if (config.bot.roles[i].name === 'admin' && config.bot.roles[i].id === '') {
      console.log('No admin role set! Only users with Administrator privileges can currently use the bot!');
    }
  }
}

function loginErr(err) {
  console.log('Login error');
  console.log(err);
}

module.exports = {
  snwBot: snwBot
};