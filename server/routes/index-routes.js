'use strict';

var express = require('express'),
    routeCheck = require('../utils/route-check'),
    redirectNonApi = routeCheck.register('api', '/');

module.exports = function(app) {
  var indexRouter = express.Router(),
      indexController = require(__dirname + '/../controllers/index-controller');

  indexRouter.route('/')
    .get(indexController.show);

  indexRouter.use(redirectNonApi);
  app.use('/', indexRouter);
};
