'use strict';

var express = require('express');

module.exports = function(db) {
  var app = express(),
      config = require('./config');

  app.locals.title = config.app.title;

  app.set('showStackError', false);

  // Express middleware
  app.use(require('body-parser')());
  app.use(require('method-override')());
  app.use(require('cookie-parser')());
  app.use(require('connect-flash')());
  app.use(require('express-validator')());

  if (process.env.NODE_ENV === 'development') {
    app.use(require('morgan')('dev'));
    app.use(require('connect-livereload')());
    app.use(require('errorhandler')());

    app.set('view cache', false);
    app.set('showStackError', true);
  }

  // Enable jsonp
  app.enable('jsonp callback');

  // Set the views path
  app.set('views', config.root + '/server/views');

  // Pretty HTML
  app.locals.pretty = true;

  // Load up static assets
  app.use(require('serve-favicon')(config.root + '/public/favicon.ico'));
  app.use('/public', express.static(config.root + '/public'));

};
