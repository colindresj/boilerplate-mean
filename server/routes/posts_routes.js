'use strict';

var express = require('express');

module.exports = function (app) {
  var postsRouter = express.Router(),
      postsController = require(__dirname + '/../controllers/posts_controller');

  postsRouter.route('/')
    .get(postsController.index)
    .post(postsController.create);

  postsRouter.route('/:id')
    .get(postsController.show)
    .put(postsController.update)
    .delete(postsController.destroy);

  app.use('/posts', postsRouter);
};
