'use strict';

var express = require('express');

module.exports = function(db) {
  var app = express(),
      config = require('./config'),
      session = require('express-session'),
      helmet = require('helmet'),
      fs = require('fs'),
      path = require('path'),
      utils = require(config.root + '/lib/utils'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      cookieParser = require('cookie-parser'),
      flash = require('connect-flash'),
      validator = require('express-validator'),
      compression = require('compression'),
      morgan = require('morgan'),
      liveReload = require('connect-livereload'),
      errorhandler = require('errorhandler'),
      templates = require('consolidate'),
      favicon = require('serve-favicon'),
      mongo = require('connect-mongo'),
      MongoStore;

  app.locals.title = config.app.title;

  app.set('showStackError', false);

  // Express middleware
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(flash());
  app.use(validator());

  // Enable compression
  app.use(compression({
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
    app.use(morgan('dev'));
    app.use(liveReload());
    app.use(errorhandler());

    app.set('view cache', false);
    app.set('showStackError', true);
  }

  // Enable jsonp
  app.enable('jsonp callback');

  // Set templating
  app.engine('html', templates[config.templateEngine]);

  // Use HTML files
  app.set('view engine', 'html');

  // Set the views path
  app.set('views', config.root + '/server/views');

  // Pretty HTML
  app.locals.pretty = true;

  // Load routes
  utils.loadFiles(path.join(config.root, 'server/routes'), function(path) {
    require(path)(app);
  });

  // Load up static assets
  app.use(favicon(config.root + '/public/favicon.ico'));
  app.use('/public', express.static(config.root + '/public'));

  // Mongo session persistence
  MongoStore = mongo(session);
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.mongo.sessionSecret,
    store: new MongoStore({
      db: db.connection.db,
      collection: config.mongo.sessionCollection
    })
  }));

  return app;
};
