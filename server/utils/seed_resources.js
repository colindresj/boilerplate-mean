'use strict';

var mongoose = require('mongoose'),
    Faker = require('faker');

module.exports = function(modelName) {
  var Model = mongoose.model(modelName);

  function buildCollection(schema, len) {
    var key, i, data = {}, collection = [];

    for (key in schema) {
      data[key] = Faker[schema[key]];
    }

    for (i = len || 2; i >= 1; i--) {
      collection.push(data);
    }

    return Model.create(collection);
  }

  function seed(schema, cb) {
    if (typeof schema == 'function') {
      cb = schema;
      return cb(new Error('No schema object received'));
    }

    if (!schema) throw new Error('No arguments received');

    Model.remove({}, function(err) {
      if (err) return cb(err);

      buildCollection(schema).then(function() {
        cb(null, Array.prototype.slice.call(arguments));
      }, function(err) {
        cb(err);
      });
    });
  }

  return seed;
};
