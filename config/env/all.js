'use strict';

require('dotenv').load();
var rootPath = require('path').normalize(__dirname + '/../..');

module.exports = {
  root: rootPath,
  port: process.env.PORT || 8000,
  templateEngine: 'swig',
  app: {
    title: 'Boilerplate MEAN',
    description: 'Lorem ipsum dolor'
  },
  mongo: {
    options: {},
    sessionSecret: 'boilerplate-mean',
    sessionCollection: 'boilerplate-mean-collection'
  },
  assets: {
    styles: [],
    scripts: [],
    test: [],
    vendor: {
      styles: [],
      scripts: []
    }
  },
  dotenv: process.env
};
