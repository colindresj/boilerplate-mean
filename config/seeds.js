'use strict';

var mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    Faker = require('faker'),
    seeds = [],
    i;

for (i = 10; i >= 0; i--) {
  seeds.push({
    title: Faker.Lorem.sentence(),
    content: Faker.Lorem.paragraph()
  });
}

Post.find({}).remove(function() {
  Post.create(seeds, function(err, post) {
    console.log('Database seeded with dummy data.')
  });
});
