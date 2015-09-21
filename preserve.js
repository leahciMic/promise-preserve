'use strict';

var preserve = function(fn, name) {
  if (typeof name !== 'undefined') {
    return function() {
      fn[name].apply(fn, arguments);
      if (arguments.length === 1) {
        return arguments[0];
      }
      return arguments;
    };
  }

  return function(value) {
    if (arguments.length === 1) {
      fn(value);
      return value;
    }
    fn.apply(undefined, arguments);
    return arguments;
  };
};

module.exports = preserve;
