'use strict';

var express = require('express');

module.exports = function(db) {
  var app = express(),
      session = require('express-session'),
      helmet = require('helmet'),
      fs = require('fs'),
      path = require('path'),
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
      glob = require('glob'),
      config = require('./config'),
      MongoStore;

  app.locals.title = config.app.title;
  app.locals.description = config.app.description;

  app.set('showStackError', false);

  // Express middleware
  app.use(bodyParser.json());
  app.use(validator());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(flash());

  // Enable compression
  app.use(compression({
    threshold: 512,
    level: 7 // zlib compression level 0-9
  }));

  // Security headers
  app.use(helmet.xssFilter());
  app.use(helmet.ienoopen());
  app.use(helmet.frameguard('deny'));
  app.use(helmet.noSniff());
  app.disable('x-powered-by');

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet.csp(config.csp));
  }

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(liveReload());

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
  glob.sync('server/routes/*-routes.js', { cwd: config.root }).forEach(function(file) {
    require(path.join(config.root, file))(app);
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

  // Error handling
  if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler());
  }

  return app;
};
