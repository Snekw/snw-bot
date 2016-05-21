/**
 * Created by Ilkka on 18.5.2016.
 */
"use strict";
var mongoose = require('mongoose');

var discordSchema = new mongoose.Schema({
  enjinId: String,
  discordId: String,
  createdAt: {type:Date, default:Date.now}
});

mongoose.model('discord', discordSchema);

var discordLink = new mongoose.Schema({
  tempId: String,
  enjinId: String,
  createdAt: {type: Date, expires: 10*60, default: Date.now}
});

mongoose.model('discordLink', discordLink);