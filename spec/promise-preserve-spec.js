'use strict';

var preserve = require('../preserve.js');
var Promise = require('bluebird'); // so we can test in 0.10
var promise;

describe('prpomise-preserve', function() {
  beforeEach(function() {
    promise = new Promise(function(resolve, reject) {
      resolve('Hello world!');
    });
  });

  describe('wrap a function', function() {
    it('shuold preserve the value in a promise chain', function() {
      promise
        .then(preserve(function(value) {
          expect(value).toEqual('Hello world!');
          return 'foobar';
        }))
        .then(function(value) {
          expect(value).toEqual('Hello world!');
          return 'foobar';
        })
        .then(function(value) {
          expect(value).toEqual('foobar');
          done();
        });
    });
  });

  describe('wrap a method', function() {
    var obj = {
      foobar: 'hello',
      fn: function() {
        expect(this.foobar).toEqual('hello');
        return this.foobar;
      }
    };

    beforeEach(function() {
      spyOn(obj, 'fn').and.callThrough();
    });

    it('should preserve an object methods context', function(done) {
      promise
        .then(preserve(obj, 'fn'))
        .then(preserve(function() {
          expect(obj.fn).toHaveBeenCalledWith('Hello world!');
        }))
        .then(obj.fn.bind(obj))
        .then(function(value) {
          expect(value).toEqual('hello');
          done();
        });
    });
  });
});
