'use strict';
var Promise = require('bluebird');

var preserve = function(fn, name) {
  if (typeof name !== 'undefined') {
    fn = fn[name].bind(fn);
  }

  return function(value) {
    return Promise.join(fn(value)).return(value);
  };
}

module.exports = preserve;
