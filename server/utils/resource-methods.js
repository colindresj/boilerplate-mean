'use strict';

var RSVP = require('rsvp'),
    mongoose = require('mongoose');

module.exports = function (modelName) {
  var Model = mongoose.model(modelName);

  return {
    getResources: function () {
      return new RSVP.Promise(function (resolve, reject) {
        Model.find(function(err, resources) {
          if (err) return reject(err);

          resolve(resources);
        });
      });
    },

    getResource: function (id) {
      return new RSVP.Promise(function (resolve, reject) {
        Model.findById(id, function (err, resource) {
          if (err) return reject(err);
          resolve(resource);
        });
      });
    },

    createResource: function (doc) {
      return new RSVP.Promise(function (resolve, reject) {
        Model.create(doc, function (err, resource) {
          if (err) return reject(err);

          resolve(resource);
        });
      });
    },

    saveResource: function (resource) {
      return new RSVP.Promise(function (resolve, reject) {
        resource.save(function (err, resource, numAffected) {
          if (err) return reject(err);

          resolve(resource);
        });
      });
    },

    removeResource: function (resource) {
      return new RSVP.Promise(function (resolve, reject) {
        resource.remove(function (err) {
          if (err) return reject(err);

          resolve();
        });
      });
    }
  };
};
