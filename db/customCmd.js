/**
 * Created by Ilkka on 24.5.2016.
 */
"use strict";
var mongoose = require('mongoose');

var customCmd = new mongoose.Schema({
  cmd: String,
  text: String
});

mongoose.model('customCmd', customCmd);