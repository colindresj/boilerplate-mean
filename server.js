'use strict';

var mongoose  = require('mongoose'),
    config    = require('./config/config');

// Set the default Node environment
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to Mongo
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Build the app
var app = require('./config/express')(db);

// Start the app
app.listen(config.port, config.hostname);
console.log('App running on port ' + config.port);
console.log('Currently running a ' + env + ' environment');

// Expose the app
exports = module.exports = app;
