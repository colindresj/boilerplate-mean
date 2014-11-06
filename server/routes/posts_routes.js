'use strict';

var express = require('express');

module.exports = function (app) {
  var postsRouter = express.Router(),
      postsController = require(__dirname + '/../controllers/posts_controller');

  postsRouter.route('/posts')
    .get(postsController.index)
    .post(postsController.create);

  postsRouter.route('/posts/:id')
    .get(postsController.show)
    .put(postsController.update)
    .delete(postsController.destroy);

  app.use(function (req, res, next) {
    if (req.originalUrl.indexOf('api') === -1) {
      return res.redirect('/');
    }

    next();
  });

  app.use('/api/v1', postsRouter);
};
