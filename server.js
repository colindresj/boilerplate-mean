'use strict';

var mongoose = require('mongoose'),
    config = require('./config/config');

// Connect to Mongo
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Build the app
var app = require('./config/express')(db);

// Start the app
app.listen(config.port, config.hostname);
console.log('App running on port ' + config.port);
console.log('Currently running a ' + process.env.NODE_ENV + ' environment');

// Expose the app
exports = module.exports = app;
