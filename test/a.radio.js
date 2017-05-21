'use strict';

require('mocha');
var assert = require('assert');
var isWindows = require('is-windows');
var Choices = require('prompt-choices');
var Actions = require('..');

describe('.a (options.radio)', function() {
  it('should check "all" when .a() is called', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture, {radio: true});
    var actions = new Actions(choices);

    actions.a();
    assert.equal(choices.checked.length, 3);
  });

  it('should uncheck "none" when "all" is checked', function() {
    var fixture = ['foo', 'bar', 'baz'];
    var choices = new Choices(fixture, {radio: true});
    var actions = new Actions(choices);

    choices.check('none');
    assert(choices.isChecked('none'));
    assert.equal(choices.checked.length, 0);

    actions.a();
    assert(!choices.isChecked('none'));
    assert.equal(choices.checked.length, 3);
  });
});
