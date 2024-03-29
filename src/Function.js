﻿/**
 * @file Polyfill to extend functions of Function for WSH (Windows Script Host {@link https://docs.microsoft.com/en-us/previous-versions//9bbdkx3k(v=vs.85)|Microsoft Docs}). I recommend that JScript File Encoding is UTF-8[BOM, dos]
 * @description JScript 5.8 is similar to ECMA-262 3rd edition and doesn't have many useful features that ES5 (ECMA-262 5.1 edition) and above have. This module adds those to JScript.
 * @requires wscript.exe/cscript.exe
 * @author Tuckn <tuckn333@gmail.com>
 * @license MIT
 * @see {@link https://github.com/tuckn/WshPolyfill|GitHub}
 */

/** @namespace Function */

/**
 * @namespace Function.prototype
 * @memberof Function
 */

// Function.prototype.bind {{{
if (!Function.prototype.bind) {
  (function () {
    var slice = Array.prototype.slice;

    /**
     * Creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called. Does not work with `new funcA.bind(thisArg, args)`. {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind|MDN}
     *
     * @example
     * // Bind Scope
     * var module = {
     *   x: 42,
     *   getX: function () { return this.x; }
     * };
     *
     * console.log(module.getX()); // Outputs: 42
     *
     * var unboundGetX = module.getX;
     * console.log(unboundGetX()); // Outputs: undefined
     * // Because the function gets invoked at the global scope.
     *
     * var boundGetX = unboundGetX.bind(module);
     * console.log(boundGetX()); // Outputs: 42
     *
     * // Bind Argument
     * var addArguments = function (arg1, arg2) { return arg1 + arg2; };
     *
     * addArguments(1, 2); // Returns: 3
     *
     * var addThirtySeven = addArguments.bind(null, 37);
     * addThirtySeven(); // Returns: NaN. Because 37 + undefined
     * addThirtySeven(5); // Returns: 42. Because 37 + 5 = 42
     * addThirtySeven(5, 10); // Returns: 42. Because 10 is ingnored.
     * @function bind
     * @memberof Function.prototype
     * @param {*} thisArg - The value to be passed as the this parameter to the target function
     * @param {...*} [arguments] - Arguments to prepend to arguments provided to the bound function
     * @returns {function} - A copy of the given function with the specified this value and initial arguments
     */
    Function.prototype.bind = function () {
      var thatFunc = this, thatArg = arguments[0];
      var args = slice.call(arguments, 1);

      if (typeof thatFunc !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new Error('Function.prototype.bind - '
          + 'what is trying to be bound is not callable');
      }

      return function () {
        var funcArgs = args.concat(slice.call(arguments));
        return thatFunc.apply(thatArg, funcArgs);
      };
    };
  })();
} // }}}

// vim:set foldmethod=marker commentstring=//%s :
