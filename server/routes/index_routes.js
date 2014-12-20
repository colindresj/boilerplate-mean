'use strict';

var express = require('express'),
var express = require('express');
module.exports = function(app) {
  var index = require(__dirname + '/../controllers/index_controller');
  var indexRouter = express.Router(),
      indexController = require(__dirname + '/../controllers/index_controller');

  app.route('/')
     .get(index.show);
  indexRouter.route('/')
    .get(indexController.show);
  app.use('/', indexRouter);
};
