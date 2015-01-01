'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    config = require('./env/all'),
    envConfig;

// Check if the current node env exists and is set to one of our configs
// and if not set it to development by default
process.env.NODE_ENV = fs.readdirSync('./config/env').map(function(file) {
    return file.slice(0, -3);
}).indexOf(process.env.NODE_ENV) > 0 ? process.env.NODE_ENV : 'development';

// Extend the base configuration and environment specific config
envConfig = require('./env/' + process.env.NODE_ENV) || {};
module.exports = _.merge(config, envConfig);
