'use strict';

var rootPath = require('path')().normalize(__dirname + '/../../..');

module.exports = {
  root: rootPath,
  port: process.env.PORT || 8080,
  app: {
    title: 'Set Application'
  },
  mongo: {
    options: {}
  }
};
