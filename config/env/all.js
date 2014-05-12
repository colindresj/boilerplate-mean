'use strict';

var rootPath = require('path')().normalize(__dirname + '/../../..');

module.exports = {
  root: rootPath,
  port: process.env.PORT || 8080,
  mongo: {
    options: {}
  }
};
