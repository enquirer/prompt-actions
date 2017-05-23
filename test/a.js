'use strict';

require('mocha');
var assert = require('assert');
var isWindows = require('is-windows');
var Choices = require('prompt-choices');
var Actions = require('..');

describe('.a', function() {
  it('should check all choices when .a() is called', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions({choices: choices});
    actions.a();
    assert.equal(choices.checked.length, 3);
  });

  it('should uncheck all choices when .a() is called twice', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions({choices: choices});
    actions.a();
    assert.equal(choices.checked.length, 3);

    actions.a();
    assert.equal(choices.checked.length, 0);
  });

  it('should check all choices when a choice is already checked', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions({choices: choices});
    choices.check('bar');

    actions.a();
    assert.equal(choices.checked.length, 3);

    actions.a();
    assert.equal(choices.checked.length, 0);
  });

  it('should check all choices when some choices are already checked', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions({choices: choices});
    choices.check('bar');
    choices.check('baz');

    actions.a();
    assert.equal(choices.checked.length, 3);

    actions.a();
    assert.equal(choices.checked.length, 0);
  });
});
