/**
 * Created by Ilkka on 12.5.2016.
 */
"use strict";
module.exports = {
  bot:{
    prefix:'.',
    token: '',
    //These are Discord role ID's
    roles:[
      {name: 'administrator', id:''},
      {name: 'moderator', id:''},
      {name: 'member', id:''}
    ]
  },
  db:{
    connectionString: 'mongodb://localhost/snw-bot'
  },
  ssl:{
    enabled: false,
    ca: '',
    key: '',
    cert: ''
  }
};