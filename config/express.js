'use strict';

var express = require('express');

module.exports = function(db) {
  var app = express(),
      config = require('./config'),
      session = require('express-session'),
      helmet = require('helmet');

  app.locals.title = config.app.title;

  app.set('showStackError', false);

  // Express middleware
  app.use(require('body-parser')());
  app.use(require('method-override')());
  app.use(require('cookie-parser')());
  app.use(require('connect-flash')());
  app.use(require('express-validator')());

  // Enable compression
  app.use(require('compression')({
    threshold: 512,
    level: 7 // zlib compression level 0-9
  }));

  // Security headers
  app.use(helmet.iexss());
  app.use(helmet.ienoopen());
  app.use(helmet.xframe('deny'));
  app.use(helmet.contentTypeOptions());
  app.disable('x-powered-by');

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet.csp());
  }

  if (process.env.NODE_ENV === 'development') {
    app.use(require('morgan')('dev'));
    app.use(require('connect-livereload')());
    app.use(require('errorhandler')());

    app.set('view cache', false);
    app.set('showStackError', true);
  }

  // Enable jsonp
  app.enable('jsonp callback');

  // Set templating
  app.engine('html', require('consolidate')[config.templateEngine]);

  // Use HTML files
  app.set('view engine', 'html');

  // Set the views path
  app.set('views', config.root + '/server/views');

  // Pretty HTML
  app.locals.pretty = true;

  // Load routes
  require(config.root + '/server/routes/index_routes')(app);
  require(config.root + '/server/routes/posts_routes')(app);

  // Load up static assets
  app.use(require('serve-favicon')(config.root + '/public/favicon.ico'));
  app.use('/public', express.static(config.root + '/public'));

  // Mongo session persistence
  var MongoStore = require('connect-mongo')(session);
  app.use(session({
    secret: config.mongo.sessionSecret,
    store: new MongoStore({
      db: db.connection.db,
      collection: config.mongo.sessionCollection
    })
  }));

  return app;
};
