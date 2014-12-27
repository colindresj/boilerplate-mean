'use strict';

var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    loadFiles = require('../utils/').loadFiles;

loadFiles(__dirname, function(path) {
  require(path);
});

gulp.task('default', ['some:task']);
