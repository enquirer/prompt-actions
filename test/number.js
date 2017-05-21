'use strict';

require('mocha');
var assert = require('assert');
var isWindows = require('is-windows');
var Choices = require('prompt-choices');
var Actions = require('..');

describe('.number', function() {
  it('should move the cursor to the given position -1', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions(choices);

    // start
    assert.equal(choices.position, 0);

    // 1
    actions.number(1);
    assert.equal(choices.position, 0);

    // 2
    actions.number(2);
    assert.equal(choices.position, 1);

    // 3
    actions.number(3);
    assert.equal(choices.position, 2);
  });

  it('should remove the pointer when greater than choices.length', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions(choices);

    assert.equal(choices.position, 0);

    actions.number(42);
    assert.equal(choices.position, 0);
  });

  it('should not move the pointer when less than 0', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions(choices);

    assert.equal(choices.position, 0);

    actions.number(-42);
    assert.equal(choices.position, 0);
  });

  it('should check the choice at the selected position', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions(choices);

    // start
    assert.equal(choices.position, 0);

    // 1
    actions.number(1);
    assert.equal(choices.position, 0);
    assert.deepEqual(choices.checked, ['foo']);

    // 2
    actions.number(2);
    assert.equal(choices.position, 1);
    assert.deepEqual(choices.checked, ['foo', 'bar']);

    // 3
    actions.number(3);
    assert.equal(choices.position, 2);
    assert.deepEqual(choices.checked, ['foo', 'bar', 'baz']);
  });

  it('should uncheck the choice when pressed twice', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions(choices);

    // start
    assert.equal(choices.position, 0);

    // 1
    actions.number(1);
    assert.equal(choices.position, 0);
    assert.deepEqual(choices.checked, ['foo']);

    actions.number(1);
    assert.deepEqual(choices.checked, []);

    // 2
    actions.number(2);
    assert.equal(choices.position, 1);
    assert.deepEqual(choices.checked, ['bar']);

    actions.number(2);
    assert.deepEqual(choices.checked, []);

    // 3
    actions.number(3);
    assert.equal(choices.position, 2);
    assert.deepEqual(choices.checked, ['baz']);

    actions.number(3);
    assert.deepEqual(choices.checked, []);
  });
});
