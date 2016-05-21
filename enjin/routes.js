/**
 * Created by Ilkka on 18.5.2016.
 */
"use strict";
var express = require('express');
var router = express.Router();
var dbEnjin = require('./dbModels/models');

router.post('/isLinked', function(req, res, next){
  if(/^[0-9]*$/g.test(req.body.userId)){
    dbEnjin.discord.findOne({enjinId: req.body.userId}, function(err, discord){
      if(err)return next(err);

      if(discord){
        res.status(200).json({isLinked: true});
      }else{
        res.status(200).json({isLinked: false});
      }
    });
  }else{
    res.status(400).json({});
  }
});

router.post('/linkEnjin', function(req, res, next){
  if(!/^[0-9]*$/g.test(req.body.registerId) || !/^[0-9]*$/g.test(req.body.userId) ){
    res.status(400).json({});
    return;
  }

  var link = new dbEnjin.discordLink();
  link.tempId = req.body.registerId;
  link.enjinId = req.body.userId;
  link.save(function(err){
    if(err) return next(err);

    res.status(200).json({});
  });
});


module.exports = router;