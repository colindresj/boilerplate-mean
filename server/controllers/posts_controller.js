'use strict';

var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    _ = require('lodash');

// posts#index
exports.index = function(req, res) {
  Post.find(function(err, posts) {
    if (err) res.send(err);

    res.json(posts);
  });
};

// posts#create
exports.create = function(req, res){
  Post.create(req.body, function(err, post) {
    if (err) res.send(err);

    Post.find(function(err, posts) {
      if (err) res.send(err);

      res.json(posts);
    });
  });
};

// posts#show
exports.show = function(req, res){
  Post.findById(req.params.id, function(err, post) {
    if (err) res.send(err);

    res.json(post);
  });
};

// posts#update
exports.update = function(req, res){
  Post.findById(req.params.id, function(err, post) {
    if (err) res.send(err);

    post = _.extend(post, req.body);

    post.save(function(err, post, numberAffected) {
      if (err) res.send(err);

      res.json(post);
    });
  });
};

// posts#destroy
exports.destroy = function(req, res){
  Post.findById(req.params.id, function(err, post) {
    if (err) res.send(err);

    post.remove(function(err) {
      if (err) res.send(err);

      Post.find(function(err, posts) {
        if (err) res.send(err);

        res.json(posts);
      });
    });
  });
};
