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

    var res = choices.render(0);
    assert.equal(choices.position, 0);

    if (isWindows()) {
      assert.equal(res, '\n\u001b[36m>\u001b[39m( ) foo\n ( ) bar\n ( ) baz');
    } else {
      assert.equal(res, '\n\u001b[36m❯\u001b[39m◯ foo\n ◯ bar\n ◯ baz');
    }

    choices.position = actions.tab(choices.position);
    choices.position = actions.tab(choices.position);
    choices.position = actions.tab(choices.position);
    choices.position = actions.tab(choices.position);
    choices.position = actions.tab(choices.position);

    res = choices.render(choices.position);
    assert.equal(choices.position, 0);

    if (isWindows()) {
      assert.equal(res, '\n\u001b[36m>\u001b[39m( ) foo\n ( ) bar\n ( ) baz');
    } else {
      assert.equal(res, '\n\u001b[36m❯\u001b[39m◯ foo\n ◯ bar\n ◯ baz');
    }
  });
});
