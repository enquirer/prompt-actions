'use strict';

require('mocha');
var assert = require('assert');
var isWindows = require('is-windows');
var Choices = require('prompt-choices');
var Actions = require('..');

describe('.space', function() {
  it('should toggle a choice when actions.space is called', function() {
    var choices = new Choices(['foo', 'bar']);
    var actions = new Actions({choices: choices});

    choices.toggle();
    assert.equal(choices.get('foo').checked, true);
    assert.equal(choices.get('bar').checked, true);

    actions.space(0);
    assert.equal(choices.get('foo').checked, false);
  });

  it('should work when choices are defined after instantiation', function() {
    var choices = new Choices();
    var actions = new Actions({choices: choices});
    choices.addChoices(['foo', 'bar']);

    choices.toggle();
    assert.equal(choices.get('foo').checked, true);
    assert.equal(choices.get('bar').checked, true);

    actions.space(0);
    assert.equal(choices.get('foo').checked, false);
  });
});
