'use strict';

var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    _ = require('lodash'),
    RSVP = require('rsvp'),

getPosts = function () {
  return new RSVP.Promise(function (resolve, reject) {
    Post.find(function(err, posts) {
      if (err) return reject(err);

      resolve(posts);
    });
  });
},

getPost = function (id) {
  return new RSVP.Promise(function (resolve, reject) {
    Post.findById(id, function(err, post) {
      if (err) return reject(err);

      resolve(post);
    });
  });
},

createPost = function (doc) {
  return new RSVP.Promise(function (resolve, reject) {
    Post.create(doc, function (err, post) {
      if (err) return reject(err);

      resolve(post);
    });
  });
},

savePost = function (resource) {
  return new RSVP.Promise(function (resolve, reject) {
    resource.save(function (err, resource, numAffected) {
      if (err) return reject(err);

      resolve(resource);
    });
  });
},

removePost = function (resource) {
  return new RSVP.Promise(function (resolve, reject) {
    resource.remove(function (err) {
      if (err) return reject(err);

      resolve();
    });
  });
};

// posts#index
exports.index = function (req, res) {
  getPosts()
  .then(function (posts) {
    res.json(posts);
  }, function (err) {
    res.send(err);
  });
};

// posts#create
exports.create = function (req, res) {
  createPost(req.body)
  .then(function () {
    return getPosts();
  })
  .then(function (posts) {
    res.json(posts);
  })
  .catch(function (err) {
    res.send(err)
  });
};

// posts#show
exports.show = function (req, res) {
  getPost(req.params.id)
  .then(function (post) {
    res.json(post);
  }, function (err) {
    res.send(err);
  });
};

// posts#update
exports.update = function (req, res) {
  getPost(req.params.id)
  .then(function (post) {
    post = _.extend(post, req.body);

    return savePost(post);
  })
  .then(function (post) {
    res.json(post);
  })
  .catch(function (err) {
    res.send(err);
  });
};

// posts#destroy
exports.destroy = function (req, res) {
  getPost(req.params.id)
  .then(function (post) {
    return removePost(post);
  })
  .then(function () {
    return getPosts();
  })
  .then(function (posts) {
    res.json(posts);
  })
  .catch(function (err) {
    res.send(err);
  });
};
