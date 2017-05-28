'use strict';

require('mocha');
var assert = require('assert');
var isWindows = require('is-windows');
var Choices = require('prompt-choices');
var Actions = require('..');

describe('.tab', function() {
  it('should do nothing (noop)', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions({choices: choices});
    assert.equal(choices.position, 0);
    choices.position = actions.tab(choices.position);
    choices.position = actions.tab(choices.position);
    choices.position = actions.tab(choices.position);
    choices.position = actions.tab(choices.position);
    choices.position = actions.tab(choices.position);
    assert.equal(choices.position, 0);
  });
});
