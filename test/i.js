'use strict';

require('mocha');
var assert = require('assert');
var isWindows = require('is-windows');
var Choices = require('prompt-choices');
var Actions = require('..');

describe('.i', function() {
  it('should invert all choices when "i" is pressed', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions({choices: choices});

    assert.equal(choices.checked.length, 0);

    choices.check('bar');
    assert.equal(choices.checked.length, 1);
    assert(!choices.isChecked('foo'));
    assert(choices.isChecked('bar'));
    assert(!choices.isChecked('baz'));

    actions.i();
    assert.equal(choices.checked.length, 2);
    assert(choices.isChecked('foo'));
    assert(!choices.isChecked('bar'));
    assert(choices.isChecked('baz'));
  });

  it('should uncheck already enabled choices when "i" is pressed', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions({choices: choices});
    assert.equal(choices.checked.length, 0);

    actions.i();
    assert.equal(choices.checked.length, 3);

    var res = choices.render(choices.position);

    if (isWindows()) {
      assert.equal(res, '\n\u001b[36m>\u001b[39m\u001b[32m(*)\u001b[39m foo\n \u001b[32m(*)\u001b[39m bar\n \u001b[32m(*)\u001b[39m baz');
    } else {
      assert.equal(res, '\n\u001b[36m❯\u001b[39m\u001b[32m◉\u001b[39m foo\n \u001b[32m◉\u001b[39m bar\n \u001b[32m◉\u001b[39m baz');
    }

    actions.i();
    res = choices.render(choices.position);
    assert.equal(choices.checked.length, 0);

    if (isWindows()) {
      assert.equal(res, '\n\u001b[36m>\u001b[39m( ) foo\n ( ) bar\n ( ) baz');
    } else {
      assert.equal(res, '\n\u001b[36m❯\u001b[39m◯ foo\n ◯ bar\n ◯ baz');
    }
  });

  it('should uncheck "all" and "none" when any other choices are checked', function() {
    var fixture = ['all', 'none', new Choices.Separator(), 'foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions({choices: choices});
    assert.equal(choices.checked.length, 0);

    choices.check('all');
    assert.equal(choices.checked.length, 1);

  });

  it('should uncheck "all" when "none" is checked', function() {
    var fixture = ['all', 'none', new Choices.Separator(), 'foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions({choices: choices});
    assert.equal(choices.checked.length, 0);

  });

  it('should check "none" when all other choices are unchecked', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture, {radio: true});
    var actions = new Actions({choices: choices});

    assert.equal(choices.checked.length, 0);
    assert(!choices.isChecked('none'));
    assert(!choices.isChecked('all'));

    actions.i();

    assert.equal(choices.checked.length, 3);
    assert(!choices.isChecked('none'));
    assert(choices.isChecked('all'));
  });

  it('should check "none" when all other choices are unchecked', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture, {radio: true});
    var actions = new Actions({choices: choices});

    actions.i();
    choices.render(choices.position);
    assert.equal(choices.checked.length, 3);
    assert(choices.isChecked('all'));

    actions.i();
    choices.render(choices.position);
    assert.equal(choices.checked.length, 0);
    assert(choices.isChecked('none'));
  });
});
