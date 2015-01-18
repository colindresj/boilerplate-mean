'use strict';

var gulp = require('gulp'),
    jscs = require('gulp-jscs');

gulp.task('jscs:server', function() {
  return gulp.src('{server.js,{config,server}/**/*.js}')
    .pipe(jscs());
});

gulp.task('jscs:public', function() {
  return gulp.src('public/**/*.js')
    .pipe(jscs());
});

gulp.task('jscs:lib', function() {
  return gulp.src('lib/**/*.js')
    .pipe(jscs());
});

gulp.task('jscs', ['jscs:server', 'jscs:public', 'jscs:lib']);
