'use strict';

require('mocha');
var assert = require('assert');
var isWindows = require('is-windows');
var Choices = require('prompt-choices');
var Actions = require('..');

describe('.down', function() {
  it('should move the pointer down', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions(choices);

    var res = choices.render(0);
    assert.equal(choices.position, 0);

    if (isWindows()) {
      assert.equal(res, '\n\u001b[36m>\u001b[39m( ) foo\n ( ) bar\n ( ) baz');
    } else {
      assert.equal(res, '\n\u001b[36m❯\u001b[39m◯ foo\n ◯ bar\n ◯ baz');
    }


    choices.position = actions.down(choices.position);
    choices.position = actions.down(choices.position);
    assert.equal(choices.position, choices.position);

    res = choices.render(choices.position);
    assert.equal(choices.position, 2);

    if (isWindows()) {
      assert.equal(res, '\n ( ) foo\n ( ) bar\n\u001b[36m>\u001b[39m( ) baz');
    } else {
      assert.equal(res, '\n ◯ foo\n ◯ bar\n\u001b[36m❯\u001b[39m◯ baz');
    }
  });

  it('should start move to top when on the last choice', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture);
    var actions = new Actions(choices);
    assert.equal(choices.position, 0);

    var res = choices.render(2);
    assert.equal(choices.position, 2);

    if (isWindows()) {
      assert.equal(res, '\n ( ) foo\n ( ) bar\n\u001b[36m>\u001b[39m( ) baz');
    } else {
      assert.equal(res, '\n ◯ foo\n ◯ bar\n\u001b[36m❯\u001b[39m◯ baz');
    }

    choices.position = actions.down(choices.position);
    assert.equal(choices.position, choices.position);

    res = choices.render(choices.position);

    if (isWindows()) {
      assert.equal(res, '\n\u001b[36m>\u001b[39m( ) foo\n ( ) bar\n ( ) baz');
    } else {
      assert.equal(res, '\n\u001b[36m❯\u001b[39m◯ foo\n ◯ bar\n ◯ baz');
    }
  });
});
