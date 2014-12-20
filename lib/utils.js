'use strict';

var fs = require('fs'),
    path = require('path');

exports.loadFiles = function(wPath, cb) {
  fs.readdirSync(wPath).forEach(function(file) {
    if (/(.+).(js|coffee)$/.test(file)) {
      cb(path.join(wPath, file));
    }
  });
};
