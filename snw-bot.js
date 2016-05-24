/**
 * Created by Ilkka on 12.5.2016.
 * https://discordapp.com/oauth2/authorize?client_id=180233414694273034&scope=bot
 */
"use strict";
var Discord = require('discord.js');
var snwBot = new Discord.Client();
var cfg = require('./configSelector')('main');

if(cfg.bot.token.length > 0)
  snwBot.loginWithToken(cfg.bot.token).then(loginSuccess).catch(loginErr);
else
  console.log('NO TOKEN!');

function loginSuccess(success){
  console.log('Logged in');
}

function loginErr(err){
  console.log('Login error');
  console.log(err);
}

module.exports = {
  snwBot: snwBot
};