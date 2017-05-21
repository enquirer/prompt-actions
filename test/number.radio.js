'use strict';

require('mocha');
var assert = require('assert');
var isWindows = require('is-windows');
var Choices = require('prompt-choices');
var Actions = require('..');

describe('.number (options.radio)', function() {
  it('should toggle choice.checked at the given number', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture, {radio: true});
    var actions = new Actions(choices);

    assert.equal(choices.checked.length, 0);
    assert(choices.hasChoice('all'));
    assert(choices.hasChoice('none'));

    choices.uncheck();
    choices.position = actions.number(4);

    assert.equal(choices.checked.length, 1);
    assert(!choices.isChecked('all'));
    assert(!choices.isChecked('none'));
    assert(!choices.isChecked('foo'));
    assert(choices.isChecked('bar'));
    assert(!choices.isChecked('baz'));

    choices.position = actions.number(4);
    assert.equal(choices.checked.length, 0);
    assert(!choices.isChecked('all'));
    assert(choices.isChecked('none'));
    assert(!choices.isChecked('foo'));
    assert(!choices.isChecked('bar'));
    assert(!choices.isChecked('baz'));
  });

  it('should do nothing when numbers are less than zero', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture, {radio: true});
    var actions = new Actions(choices);

    assert.equal(choices.checked.length, 0);
    assert(choices.hasChoice('all'));
    assert(choices.hasChoice('none'));

    choices.uncheck();
    choices.position = actions.number(-1);
    choices.position = actions.number(-2);
    choices.position = actions.number(-3);

    assert.equal(choices.checked.length, 0);
    assert(!choices.isChecked('all'));
    assert(!choices.isChecked('none'));
    assert(!choices.isChecked('foo'));
    assert(!choices.isChecked('bar'));
    assert(!choices.isChecked('baz'));
    choices.check(['foo', 'baz']);
    assert.equal(choices.checked.length, 2);

    choices.position = actions.number(-1);
    choices.position = actions.number(-2);
    choices.position = actions.number(-3);

    assert.equal(choices.checked.length, 2);
    assert(!choices.isChecked('all'));
    assert(!choices.isChecked('none'));
    assert(choices.isChecked('foo'));
    assert(!choices.isChecked('bar'));
    assert(choices.isChecked('baz'));
  });

  it('should do nothing when numbers are greater than choices length', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture, {radio: true});
    var actions = new Actions(choices);

    assert.equal(choices.checked.length, 0);
    assert(choices.hasChoice('all'));
    assert(choices.hasChoice('none'));

    choices.uncheck();
    choices.position = actions.number(11);
    choices.position = actions.number(12);
    choices.position = actions.number(13);

    assert.equal(choices.checked.length, 0);
    assert(!choices.isChecked('all'));
    assert(!choices.isChecked('none'));
    assert(!choices.isChecked('foo'));
    assert(!choices.isChecked('bar'));
    assert(!choices.isChecked('baz'));
    choices.check(['foo', 'baz']);
    assert.equal(choices.checked.length, 2);

    choices.position = actions.number(11);
    choices.position = actions.number(12);
    choices.position = actions.number(13);

    assert.equal(choices.checked.length, 2);
    assert(!choices.isChecked('all'));
    assert(!choices.isChecked('none'));
    assert(choices.isChecked('foo'));
    assert(!choices.isChecked('bar'));
    assert(choices.isChecked('baz'));
  });
});
