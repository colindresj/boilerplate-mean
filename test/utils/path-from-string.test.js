'use strict';

var expect = require('chai').expect,
    sinon = require('sinon'),
    pathFromString = require('../../lib/utils/path-from-string'),
    spy = sinon.spy();

describe('#pathFromString', function() {
  var fixture = buildFixture();

  describe('when the final object is a function', function() {
    var finalObj = pathFromString(fixture, 'some.obj.action');

    it('returns the final object', function() {
      expect(finalObj).to.be.ok;
    });

    it('keeps context in the final object', function() {
      finalObj();

      expect(spy).to.be.instanceof(Function)
        .and.to.be.ok
        .and.to.have.been.called;
      expect(spy.thisValues).to.include(fixture.some.obj);
    });
  });

  describe('when the final object is not a function', function() {
    var finalObj = pathFromString(fixture, 'some.obj');

    it('returns the final object', function() {
      expect(finalObj).to.be.instanceof(Object)
        .and.to.be.ok;
    });
  });
});

function buildFixture() {
  return {
    some: {
      obj: {
        action: spy
      }
    }
  }
}
