/**
 * Created by Ilkka on 18.5.2016.
 */
"use strict";
var express = require('express');
var debug = require('debug')('Api:app');
var bodyParser = require('body-parser');

var app = express();

require('../db/setup');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', ['authentication', 'content-type']);
  // res.header('Access-Control-Allow-Methods', ['PUT', 'DELETE']);
  next();
});
var enjin = require('../enjin/routes');

app.use('/snw-bot/enjin', enjin);

//Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Error handlers
/* istanbul ignore next */
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.json({success: false, message: err.message, error: {
    status: err.status
  }});
});

module.exports = app;