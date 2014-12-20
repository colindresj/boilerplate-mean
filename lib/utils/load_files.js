'use strict';

var fs = require('fs'),
    path = require('path');

module.exports = function loadFiles(wPath, cb) {
  fs.readdirSync(wPath).forEach(function(file) {
    if (/(.+).(js|coffee)$/.test(file)) {
      cb(path.join(wPath, file));
    }
  });
};
