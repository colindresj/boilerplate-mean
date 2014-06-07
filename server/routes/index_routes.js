'use strict';

module.exports = function(app) {
  var index = require(__dirname + '/../controllers/index_controller');

  app.route('/')
     .get(index.show);
};
