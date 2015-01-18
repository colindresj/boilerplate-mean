'use strict';

var gulp = require('gulp'),
    david = require('david'),
    chalk = require('chalk'),
    shell = require('gulp-shell'),
    Table = require('cli-table'),
    manifest = require('../../package.json');

gulp.task('modules:info', function() {
  david.getDependencies(manifest, function(err, deps) {
    console.log('Latest dependencies information for', chalk.blue(manifest.name));
    listDependencies(deps);
  });
});

gulp.task('modules:info:dev', function() {
  david.getDependencies(manifest, { dev: true }, function(er, deps) {
    console.log('latest devDependencies information for', chalk.blue(manifest.name));
    listDependencies(deps);
  });
});

gulp.task('modules:outdated', function() {
  david.getUpdatedDependencies(manifest, { stable: true }, function(er, deps) {
    console.log('dependencies with newer STABLE versions for', chalk.blue(manifest.name));
    listDependencies(deps);
  });
});

gulp.task('modules:outdated:dev', function() {
  david.getUpdatedDependencies(manifest, { dev: true, stable: true }, function(er, deps) {
    console.log(
      'devDependencies with newer ' +
      chalk.yellow('stable') +
      ' versions for', chalk.blue(manifest.name)
    );
    listDependencies(deps);
  });
});

gulp.task('modules:update:all', shell.task([
  __dirname + '/../../node_modules/.bin/david update'
]));

function listDependencies(dependencies) {
  var table = new Table({
    head: ['Module', 'Required', 'Stable', 'Latest'],
    style: { compact: true, head: ['reset'] }
  });

  Object.keys(dependencies).forEach(function(dependency) {
    var required = dependencies[dependency].required || '*',
        stable = dependencies[dependency].stable || 'None',
        latest = dependencies[dependency].latest;

    table.push([dependency, required, stable, latest]);
  });

  console.log(table.toString());
}
