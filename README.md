# promise-preserve

[![Build Status](https://travis-ci.org/leahciMic/promise-preserve.svg?branch=master)](https://travis-ci.org/leahciMic/promise-preserve) [![Code Climate](https://codeclimate.com/github/leahciMic/promise-preserve/badges/gpa.svg)](https://codeclimate.com/github/leahciMic/promise-preserve) [![Dependency Status](https://www.versioneye.com/user/projects/55ff5145601dd900150001e0/badge.svg?style=flat)](https://www.versioneye.com/user/projects/55ff5145601dd900150001e0)

Preserve the result in a promise chain.

## Install

```sh
npm install --save `promise-preserve`
```

## Usage

```js
var preserve = require('promise-preserve');

var promise = new Promise(function(resolve, reject) {
  resolve('Hello world!');
});

promise.then(preserve(function(result) {
  console.log(result); // prints 'Hello world!';
  return 'foobar';
}).then(function(result) {
  // prints 'Hello world!'; as promise-preserve preserved the value of the
  // promise chain
  console.log(result);
  return 'foobar';
}).then(function(result) {
  // prints 'foobar' as the previous function did not preserve the result
  console.log(result);
});
```

## API

### `preserve(fn)` preserve a function

Wraps the function so that when it is called, it does not modify the result in
a promise chain.

### `preserve(obj, name)` preserve a method

Wraps the method so that when it is called, it will be called with the right
context and it will not change the result in a promise chain.
