'use strict';

require('mocha');
var assert = require('assert');
var isWindows = require('is-windows');
var Choices = require('prompt-choices');
var Actions = require('..');

describe('.i (options.radio)', function() {
  it('should check all choices when .i() is the first keypress', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture, {radio: true});
    var actions = new Actions(choices);

    assert.equal(choices.checked.length, 0);
    actions.i();

    assert.equal(choices.checked.length, 3);
  });

  it('should check "all" when .i() is the first keypress', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture, {radio: true});
    var actions = new Actions(choices);

    assert.equal(choices.checked.length, 0);
    actions.i();
    assert(choices.isChecked('all'));
  });

  it('should uncheck "none" when .i() is the first keypress', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture, {radio: true});
    var actions = new Actions(choices);

    assert.equal(choices.checked.length, 0);
    actions.i();
    assert(!choices.isChecked('none'));
  });

  it('should not check "none" when some choices are checked', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture, {radio: true});
    var actions = new Actions(choices);

    assert.equal(choices.checked.length, 0);

    choices.check('foo');
    assert.equal(choices.checked.length, 1);

    actions.i();
    assert.equal(choices.checked.length, 2);
  });

  it('should not check "all" when all choices are not checked', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture, {radio: true});
    var actions = new Actions(choices);

    assert.equal(choices.checked.length, 0);
    assert(choices.hasChoice('all'));
    assert(choices.hasChoice('none'));

    choices.check('bar');
    assert.equal(choices.checked.length, 1);
    assert(!choices.isChecked('all'));
    assert(!choices.isChecked('none'));
    assert(!choices.isChecked('foo'));
    assert(choices.isChecked('bar'));
    assert(!choices.isChecked('baz'));

    actions.i();
    assert.equal(choices.checked.length, 2);
    assert(!choices.isChecked('all'));
    assert(!choices.isChecked('none'));
    assert(choices.isChecked('foo'));
    assert(!choices.isChecked('bar'));
    assert(choices.isChecked('baz'));
  });

  it('should check "all" when all choices are checked', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture, {radio: true});
    var actions = new Actions(choices);

    assert.equal(choices.checked.length, 0);
    assert(choices.hasChoice('all'));
    assert(choices.hasChoice('none'));
    choices.uncheck();
    actions.i();

    assert.equal(choices.checked.length, 3);
    assert(choices.isChecked('all'));
    assert(!choices.isChecked('none'));
    assert(choices.isChecked('foo'));
    assert(choices.isChecked('bar'));
    assert(choices.isChecked('baz'));
  });

  it('should check "none" when all choices are unchecked', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture, {radio: true});
    var actions = new Actions(choices);

    assert.equal(choices.checked.length, 0);
    assert(choices.hasChoice('all'));
    assert(choices.hasChoice('none'));
    choices.uncheck();
    actions.i();

    assert.equal(choices.checked.length, 3);
    assert(choices.isChecked('all'));
    assert(!choices.isChecked('none'));
    assert(choices.isChecked('foo'));
    assert(choices.isChecked('bar'));
    assert(choices.isChecked('baz'));

    actions.i();
    assert.equal(choices.checked.length, 0);
    assert(!choices.isChecked('all'));
    assert(choices.isChecked('none'));
    assert(!choices.isChecked('foo'));
    assert(!choices.isChecked('bar'));
    assert(!choices.isChecked('baz'));
  });
});
