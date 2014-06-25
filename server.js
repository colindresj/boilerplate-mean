'use strict';

var mongoose = require('mongoose'),
    fs = require('fs'),
    path = require('path'),
    config = require('./config/config');

// Connect to Mongo
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Load the models
var modelsPath = path.join(__dirname, 'server/models');
fs.readdirSync(modelsPath).forEach(function(file) {
  require(modelsPath + '/' + file);
});

// Build the app
var app = require('./config/express')(db);

// Start the app
app.listen(config.port, config.hostname);
console.log('App running on port ' + config.port);
console.log('Currently running a ' + process.env.NODE_ENV + ' environment');

// Expose the app
exports = module.exports = app;
