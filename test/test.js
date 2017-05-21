'use strict';

require('mocha');
var assert = require('assert');
var isWindows = require('is-windows');
var Choices = require('prompt-choices');
var Actions = require('..');

describe('Actions', function() {
  it('should export a function', function() {
    assert.equal(typeof Actions, 'function');
  });

  it('should instantiate', function() {
    var choices = new Choices(['foo', 'bar']);
    var actions = new Actions(choices);
    assert(actions instanceof Actions);
  });
});
