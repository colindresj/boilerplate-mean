'use strict';

require('dotenv').load();
var rootPath = require('path').normalize(__dirname + '/../..');

module.exports = {
  root: rootPath,
  port: process.env.PORT || 8000,
  templateEngine: 'swig',
  app: {
    title: 'Boilerplate MEAN'
  },
  mongo: {
    options: {},
    sessionSecret: 'boilerplate-mean',
    sessionCollection: 'boilerplate-mean-collection'
  },
  dotenv: process.env
};
