'use strict';

module.exports = function(rootObject, path) {
  path = path.split('.');

  return path.reduce(function(prev, next) {
    if (next === path[path.length - 1]) return prev[next].bind(prev);
    return prev[next];
  }, rootObject);
};
