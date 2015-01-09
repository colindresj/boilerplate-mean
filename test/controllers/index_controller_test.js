'use strict';

var request = require('supertest'),
    expect = require('chai').expect,
    app = require('../../server'),
    agent = request.agent(app);

describe('Index Controller', function() {
  describe('GET /', function() {
    it('responds with a 200 status', function(done) {
      agent.get('/')
        .expect(200, done);
    });

    it('responds with HTML', function(done) {
      agent.get('/')
        .expect('content-type', /text\/html/, done);
    });

    it('renders the index template', function(done) {
      agent.get('/')
        .end(function(err, res) {
          if (err) return done(err);

          expect(res.text).to.contain('Hello world.');
          done();
        });
    });

    it('sets the appropriate security headers', function(done) {
      agent.get('/')
        .expect('x-xss-protection', '1; mode=block')
        .expect('x-download-options', 'noopen')
        .expect('x-frame-options', 'DENY')
        .expect('x-content-type-options', 'nosniff')
        .end(function(err, res) {
          if (err) return done(err);

          expect(Object.keys(res.headers).indexOf('x-powered-by')).to.eql(-1);
          done();
        });
    });

    it('is compresses with gzip', function(done) {
      agent.get('/')
        .expect('content-encoding', 'gzip', done);
    });
  });
});
