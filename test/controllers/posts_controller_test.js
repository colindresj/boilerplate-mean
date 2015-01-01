'use strict';

var request = require('supertest'),
    mongoose = require('mongoose'),
    expect = require('chai').expect,
    Lorem = require('faker').Lorem,
    app = require(__dirname + '/../../server'),
    agent = request.agent(app),
    Post = mongoose.model('Post');

describe('Posts Controller', function() {
  var posts;

  beforeEach(function(done) {
    buildMockPosts(function(err, collection) {
      if (err) return done(err);
      posts = collection;
      done();
    });
  });

  describe('GET /posts', function() {
    it('responds with a 200 status', function(done) {
      agent.get('/api/v1/posts')
        .expect(200, done);
    });

    it('responds with JSON', function(done) {
      agent.get('/api/v1/posts')
        .expect('content-type', /application\/json/, done);
    });

    it('responds with a collection of posts', function(done) {
      agent.get('/api/v1/posts')
        .end(function(err, res) {
          if (err) return done(err);

          expect(res.body).to.be.an('array').with.length(2);
          done();
        });
    });
  });

  describe('POST /posts', function() {
    var postAgent, data = buildPost();

    it('responds with a 201 status', function(done) {
      agent.post('/api/v1/posts')
        .send(data)
        .expect(201, done);
    });

    it('responds with JSON', function(done) {
      agent.get('/api/v1/posts/' + posts[0]._id)
        .expect('content-type', /application\/json/, done);
    });

    it('responds with a collection of posts, including the new post', function(done) {
      agent.post('/api/v1/posts')
        .send(data)
        .end(function(err, res) {
          if (err) return done(err);

          expect(res.body).to.be.an('array').with.length(3);
          expect(res.body[res.body.length - 1]).to.have.property('title').and.eql(data.title);
          done();
        });
    });
  });

  describe('GET /posts/:id', function() {
    it('responds with a 200 status', function(done) {
      agent.get('/api/v1/posts/' + posts[0]._id)
        .expect(200, done);
    });

    it('responds with JSON', function(done) {
      agent.get('/api/v1/posts/' + posts[0]._id)
        .expect('content-type', /application\/json/, done);
    });

    it('responds with the post', function(done) {
      var post = posts[0],
          postId = post._id.toString();

      agent.get('/api/v1/posts/' + postId)
        .end(function(err, res) {
          if (err) return done(err);

          expect(res.body._id).to.eql(postId);
          done();
        });
    });
  });

  describe('PUT /posts/:id', function() {
    var data = { title: 'Another Title' };

    it('responds with a 200 status', function(done) {
      agent.put('/api/v1/posts/' + posts[0]._id)
        .send(data)
        .expect(200, done);
    });

    it('responds with JSON', function(done) {
      agent.put('/api/v1/posts/' + posts[0]._id)
        .send(data)
        .expect('content-type', /application\/json/, done);
    });

    it('responds with the updated post', function(done) {
      var post = posts[0],
          postId = post._id.toString();

      agent.put('/api/v1/posts/' + postId)
        .send(data)
        .end(function(err, res) {
          if (err) return done(err);

          expect(res.body._id).to.eql(postId);
          expect(res.body.title).to.eql(data.title);
          done();
        });
    });
  });

  describe('DELETE /posts/:id', function() {
    it('responds with a 200 status', function(done) {
      agent.delete('/api/v1/posts/' + posts[0]._id)
        .expect(200, done);
    });

    it('responds with JSON', function(done) {
      agent.delete('/api/v1/posts/' + posts[0]._id)
        .expect('content-type', /application\/json/, done);
    });

    it('responds with a collection of posts, excluding the deleted post', function(done) {
      agent.delete('/api/v1/posts/' + posts[0]._id)
        .end(function(err, res) {
          if (err) return done(err);

          expect(res.body).to.be.an('array').with.length(1);
          done();
        });
    });
  });
});

function buildMockPosts(cb) {
  Post.remove({}, function(err) {
    if (err) return cb(err);

    postCollection().then(function() {
      cb(null, Array.prototype.slice.call(arguments));
    }, function(err) {
      cb(err);
    });
  });
}

function postCollection(len) {
  var i, collection = [];

  for (i = len || 2; i >= 1; i--) {
    collection.push(buildPost());
  }

  return Post.create(collection);
}

function buildPost() {
  return {
    title: Lorem.sentence(),
    content: Lorem.paragraph()
  };
}
