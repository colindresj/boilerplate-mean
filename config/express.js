'use strict';

var express = require('express');

module.exports = function(db) {
  var app = express();

  app.locals.title = config.app.title;

  app.set('showStackError', false);

  // Express middleware
  app.use(require('body-parser')());
  app.use(require('method-override')());
  app.use(require('cookie-parser')());

  if (process.env.NODE_ENV === 'development') {
    app.use(require('morgan')('dev'));
    app.set('view cache', false);
    app.set('showStackError', true);
  }

   // Simulate DELETE and POST
  app.use(require('method-override')());

  // Enable jsonp
  app.enable('jsonp callback');
};
