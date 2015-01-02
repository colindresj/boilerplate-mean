'use strict';

var mongoose = require('mongoose'),
    seed = require(__dirname + '/../server/utils/seed_resources');

seed('Post')({
  title: 'Lorem.sentence',
  content: 'Lorem.paragraph'
}, function(err, collection) {
  if (err) return next(err);

  console.log('Database seeded with dummy Posts.')
}, 10);
