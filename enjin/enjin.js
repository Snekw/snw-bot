/**
 * Created by Ilkka on 18.5.2016.
 */
"use strict";
var request = require('request');
var o = {};

var settings = {
  apiUrl: 'test',
  apiKey: '123',
  apiReadOnly: true
};

o.apiRequest = function(method, params={}){
  if(!method) return {message:'No method provided!'};

  params.jsonrpc = params.jsonrpc || '2.0';
  params.api_key = settings.apiKey;

  var reg = JSON.stringify({
    jsonrpc: '2.0',
    id: Math.round(Math.random()*10000000),
    params: params,
    method: method
  });

  request.post({
    url: settings.apiUrl,
    body: reg
  }, function(err ,res, body){
  })
};

module.exports = o;