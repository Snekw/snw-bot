/**
 * Created by Ilkka on 18.5.2016.
 */
"use strict";
var url = "/api/v1/api.php";
var botApiUrl = '';
var discordWidgetUrl = '';
var user = {};

var request = {
  "jsonrpc": "2.0",
  "id": Math.round(Math.random() * (999999 - 100000) + 100000),
  "method": "User.get",
  "params": {
  }
};

$(document).ready(function(){
  // $.post(url, JSON.stringify(request), function(response) {
  var response = {
    result:{
      username: 'Snekw',
      id: 123,
      logged_in: true
    }
  };
    if (response.result) {
      user = response.result;
      afterRequest(response.result);
    }
    else
      afterRequest({});
  // }, "json");
});

function afterRequest(result){
  var src = discordWidgetUrl;
  if(!result)
  {
    createWidget(src);
    return;
  }

  if(result.logged_in === true){
    src += '&username=' + result.username;
  }

  createWidget(src, result);
}

function createWidget(src, result){
  result = result || {};

  var widget = document.createElement('iframe');
  widget.setAttribute('src', src);
  widget.setAttribute('width', '350');
  widget.setAttribute('height', '500');
  widget.setAttribute('allowtransparency', 'true');
  widget.setAttribute('frameborder', '0');
  document.getElementById('discordWidget').appendChild(widget);

  if(!result) return;

  if(result.logged_in){
    $.post( botApiUrl +'/snw-bot/enjin/isLinked',{
      userId: result.id
    },function(res){
      if(res.isLinked){
        $('#discordLink').addClass('snwHidden');
      }
    });
  }
}

function CreateDiscordLink() {
  $('#link').attr('disabled', true);
  $('.snwHidden').removeClass('snwHidden');

  var tempId = Math.round(Math.random() * 1000000);
 
  $.post( botApiUrl +'/snw-bot/enjin/linkEnjin',{
    registerId: tempId,
    userId: user.id
  }, function(res){
  });

  $('#cmd').attr('value', '.enjin link ' + tempId).focus().select();
}