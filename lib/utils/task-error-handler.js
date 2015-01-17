'use strict';

var notify = require('gulp-notify');

module.exports = function() {
  notify.onError({
    title: 'Build Error',
    message: "<%= error.message %>"
  }).apply(this, arguments);

  this.emit('end');
};
