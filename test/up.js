'use strict';

require('mocha');
var assert = require('assert');
var isWindows = require('is-windows');
var Choices = require('prompt-choices');
var Actions = require('..');

describe('.up', function() {
  it('should move the pointer up one row', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions(choices);
    assert.equal(choices.position, 0);

    var res = choices.render(1);
    assert.equal(choices.position, 1);

    if (isWindows()) {
      assert.equal(res, '\n ( ) foo\n\u001b[36m>\u001b[39m( ) bar\n ( ) baz');
    } else {
      assert.equal(res, '\n ◯ foo\n\u001b[36m❯\u001b[39m◯ bar\n ◯ baz');
    }

    choices.position = actions.up(choices.position);
    res = choices.render(choices.position);
    assert.equal(choices.position, 0);

    if (isWindows()) {
      assert.equal(res, '\n\u001b[36m>\u001b[39m( ) foo\n ( ) bar\n ( ) baz');
    } else {
      assert.equal(res, '\n\u001b[36m❯\u001b[39m◯ foo\n ◯ bar\n ◯ baz');
    }
  });

  it('should move to bottom when pointer is already at top', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions(choices);

    assert.equal(choices.position, 0);
    var res = choices.render(choices.position);

    if (isWindows()) {
      assert.equal(res, '\n\u001b[36m>\u001b[39m( ) foo\n ( ) bar\n ( ) baz');
    } else {
      assert.equal(res, '\n\u001b[36m❯\u001b[39m◯ foo\n ◯ bar\n ◯ baz');
    }

    choices.position = actions.up(choices.position);
    res = choices.render(choices.position);
    assert.equal(choices.position, 2);

    if (isWindows()) {
      assert.equal(res, '\n ( ) foo\n ( ) bar\n\u001b[36m>\u001b[39m( ) baz');
    } else {
      assert.equal(res, '\n ◯ foo\n ◯ bar\n\u001b[36m❯\u001b[39m◯ baz');
    }
  });
});
