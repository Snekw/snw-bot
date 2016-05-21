/**
 * Created by Ilkka on 18.5.2016.
 */
"use strict";
var mongoose = require('mongoose');
var config = require('../configSelector')('main');

mongoose.connect(config.db.connectionString);