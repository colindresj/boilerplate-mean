'use strict';

var mongoose = require('mongoose'),
    Faker = require('faker'),
    pathFromString = require('../../lib/utils/').pathFromString;

module.exports = function(modelName) {
  var Model = mongoose.model(modelName);

  function buildCollection(schema, len) {
    var i, data, key, method, collection = [];

    for (i = len || 2; i >= 1; i--) {
      data = {};

      for (key in schema) {
        method = pathFromString(Faker, schema[key]);
        data[key] = method();
      }

      collection.push(data);
    }

    return Model.create(collection);
  }

  function seed(schema, cb, len) {
    if (typeof schema == 'function') {
      cb = schema;
      return cb(new Error('No schema object received'));
    }

    if (!schema) throw new Error('No arguments received');

    Model.remove({}, function(err) {
      if (err) return cb(err);

      buildCollection(schema, len).then(function() {
        cb(null, Array.prototype.slice.call(arguments));
      }, function(err) {
        cb(err);
      });
    });
  }

  return seed;
};
