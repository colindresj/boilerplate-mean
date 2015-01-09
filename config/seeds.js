'use strict';

var mongoose = require('mongoose'),
    seed = require('../server/utils/seed_resources');

seed('Post')({
  title: 'lorem.sentence',
  content: 'lorem.paragraph'
}, function(err, collection) {
  if (err) return next(err);

  console.log('Database seeded with dummy Posts.')
}, 10);
