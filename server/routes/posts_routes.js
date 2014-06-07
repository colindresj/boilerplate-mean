'use strict';

var express = require('express');

module.exports = function(app) {
  var postsRouter = express.Router(),
      postsController = require(__dirname + '/../controllers/posts_controller');

  postsRouter.route('/posts')
    .get(postsController.index)
    .post(postsController.create);

  postsRouter.route('/posts/:id')
    .get(postsController.show)
    .put(postsController.update)
    .delete(postsController.destroy);

  app.use('/posts', postsRouter);
};
