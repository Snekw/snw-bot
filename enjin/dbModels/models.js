/**
 * Created by Ilkka on 18.5.2016.
 */
"use strict";
var mongoose = require('mongoose');

require('./discord');

module.exports = {
  discord: mongoose.model('discord'),
  discordLink: mongoose.model('discordLink')
};