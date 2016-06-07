/**
 * Created by Ilkka on 19.5.2016.
 */
"use strict";
module.exports = function (conf) {
  if (process.env.SNW_BOT_DEV) {
    return require('./' + conf + 'ConfigDev');
  } else {
    return require('./' + conf + 'Config');
  }
};