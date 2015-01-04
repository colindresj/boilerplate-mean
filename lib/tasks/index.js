'use strict';

var gulp = require('gulp'),
    glob = require('glob');

glob.sync('./*_task.js', { cwd: __dirname }).forEach(function (task) {
  require(task);
});

gulp.task('default', ['some:task']);
