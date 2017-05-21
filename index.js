'use strict';

/**
 * Create an instance of `Actions`, optionally with an instance
 * of [prompt-choices][]. Any of the methods may be overridden in custom
 * prompts.
 *
 * ```js
 * var Actions = require('prompt-actions');
 * var Choices = require('prompt-choices');
 * var choices = new Choices(['foo', 'bar']);
 * var actions = new Actions(choices);
 * ```
 * @param {Object} `choices` Instance of [prompt-choices][]. This can alternatively be set by doing `actions.choices = new Choices(['foo', 'bar'])` after instantiation.
 * @api public
 */

function Actions(choices) {
  this.choices = choices;
}

/**
 * Handle `number` keypress events. Toggles the choice at
 * corresponding row, starting at `1` (1-based index).
 *
 * @return {Number} Returns `choices.position`
 * @api public
 */

Actions.prototype.number = function(pos) {
  if (pos <= this.choices.length && pos >= 0) {
    this.choices.position = pos - 1;
    this.choices.radio();
  }
  return pos - 1;
};

/**
 * Handle `space` keypress events. Toggles the choice at the
 * current position (e.g. on the same row as the pointer).
 *
 * @return {Number} Returns `choices.position`
 * @api public
 */

Actions.prototype.space = function(pos) {
  this.choices.radio();
  return pos;
};

/**
 * Identity function that simply returns the cursor position
 * on `tab` keypress events. This may be overridden in custom
 * prompts.
 *
 * ```js
 * var Prompt = require('prompt-base');
 * function MyPrompt() {
 *   Prompt.apply(this, arguments);
 *   this.action('tab', function() {
 *     // do custom tab stuff
 *   });
 * }
 * // inherit prompt-base
 * Prompt.extend(MyPrompt);
 * ```
 *
 * @return {Number} Returns `choices.position`
 * @api public
 */

Actions.prototype.tab = function(pos) {
  return pos;
};

/**
 * Handle `a` keypress events. If all choices are already checked,
 * this will disable all choices. If zero to any other number of
 * choices is checked, this will enable all choices.
 *
 * @return {Number} Returns `choices.position`
 * @api public
 */

Actions.prototype.a = function() {
  this.choices[this.choices.all ? 'uncheck' : 'check']();
  this.choices.update();
  return this.choices.position;
};

/**
 * Handle `i` keypress events. The `i` keypress toggles all choices.
 * @return {Number} Returns `choices.position`
 * @api public
 */

Actions.prototype.i = function() {
  this.choices.toggle();
  return this.choices.position;
};

/**
 * Handle `down` keypress events. Moves the cursor down one row.
 *
 * @return {Number} Returns the updated `choices.position`.
 * @api public
 */

Actions.prototype.down = function(pos) {
  return (pos < this.choices.length - 1) ? pos + 1 : 0;
};

/**
 * Handle `up` keypress events. Moves the cursor up one row.
 *
 * @return {Number} Returns the updated `choices.position`.
 * @api public
 */

Actions.prototype.up = function(pos) {
  return (pos > 0) ? pos - 1 : this.choices.length - 1;
};

/**
 * Identity function for handling `enter` keypress events. This
 * is effectively a noop, since `enter` keypress events are typically
 * ignored to allow the `line` event to be handled when an answer is
 * submitted.
 *
 * @return {Number} Returns `choices.position`
 * @api public
 */

Actions.prototype.enter = function(pos) {
  return pos;
};

/**
 * Expose `Actions`
 */

module.exports = Actions;
