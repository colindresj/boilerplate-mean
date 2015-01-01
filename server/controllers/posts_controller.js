'use strict';

var _ = require('lodash'),
    postCRUD = require('../utils/resource_methods')('Post');

// posts#index
exports.index = function(req, res) {
  postCRUD.getResources()
  .then(function(posts) {
    res.json(posts);
  }, function(err) {
    next(err);
  });
};

// posts#create
exports.create = function(req, res) {
  postCRUD.createResource(req.body)
  .then(function() {
    return postCRUD.getResources();
  })
  .then(function(posts) {
    res.status(201).json(posts);
  })
  .catch(function(err) {
    next(err);
  });
};

// posts#show
exports.show = function(req, res, next) {
  postCRUD.getResource(req.params.id)
  .then(function(post) {
    res.json(post);
  }, function(err) {
    next(err);
  });
};

// posts#update
exports.update = function(req, res) {
  postCRUD.getResource(req.params.id)
  .then(function(post) {
    post = _.extend(post, req.body);

    return postCRUD.saveResource(post);
  })
  .then(function(post) {
    res.json(post);
  })
  .catch(function(err) {
    next(err);
  });
};

// posts#destroy
exports.destroy = function(req, res) {
  postCRUD.getResource(req.params.id)
  .then(function(post) {
    return postCRUD.removeResource(post);
  })
  .then(function() {
    return postCRUD.getResources();
  })
  .then(function(posts) {
    res.json(posts);
  })
  .catch(function(err) {
    next(err);
  });
};
