'use strict';

var _ = require('lodash');

// Extend the base configuration
// and environment specific config
module.exports = _.extend(
  require('./env/all'),
  require('./env/' + process.env.NODE_ENV) || {}
);
