'use strict';

var mongoose = require('mongoose'),
    path = require('path'),
    config = require('./config/config'),
    utils = require('./lib/utils');

// Connect to Mongo
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Load the models
utils.loadFiles(path.join(__dirname, 'server/models'), function (path) {
  require(path);
});

// Build the app
var app = require('./config/express')(db);

// Seed the database with dummy data
require('./config/seeds');

// Start the app
app.listen(config.port, config.hostname);
console.log('App running on port ' + config.port);
console.log('Currently running a ' + process.env.NODE_ENV + ' environment');

// Expose the app
exports = module.exports = app;
