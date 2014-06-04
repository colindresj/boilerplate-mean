'use strict';

var rootPath = require('path').normalize(__dirname + '/../../..');

module.exports = {
  root: rootPath,
  port: process.env.PORT || 8080,
  templateEngine: 'swig',
  app: {
    title: 'Set Application'
  },
  mongo: {
    options: {},
    sessionSecret: 'gobi',
    sessionCollection: 'gobi-collection'
  }
};
