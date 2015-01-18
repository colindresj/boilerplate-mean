'use strict';

var gulp = require('gulp'),
    mocha = require('gulp-mocha');

gulp.task('test:server', function() {
  process.env.NODE_ENV = 'test';

  return gulp.src('test/{,*/}*.test.js', { read: false })
    .pipe(mocha({ reporter: 'dot' }))
    .once('end', function() {
      process.exit();
    });
});

gulp.task('test', ['test:server']);
