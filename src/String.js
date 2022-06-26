/**
 * @file Polyfill to extend functions of String for WSH (Windows Script Host {@link https://docs.microsoft.com/en-us/previous-versions//9bbdkx3k(v=vs.85)|Microsoft Docs}). I recommend that JScript File Encoding is UTF-8[BOM, dos]
 * @description JScript 5.8 is similar to ECMA-262 3rd edition and doesn't have many useful features that ES5 (ECMA-262 5.1 edition) and above have. This module adds those to JScript.
 * @requires wscript.exe/cscript.exe
 * @author Tuckn <tuckn333@gmail.com>
 * @license MIT
 * @see {@link https://github.com/tuckn/WshPolyfill|GitHub}
 */

/** @namespace String */

// String.prototype.trim {{{
if (!String.prototype.trim) {
  /**
   * Removes whitespace from both ends of a string. From ECMA-262 5.1 edition. {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim|MDN}
   *
   * @example
   * '   Hello world!   '.trim(); // 'Hello world!'
   * 'Hello world!   '.trim(); // 'Hello world!'
   * '   Hello world!'.trim(); // 'Hello world!'
   * '\tHello world!\t'.trim(); // 'Hello world!'
   * '　Hello world!　'.trim(); // '　Hello world!　'
   * @function trim
   * @memberof String.prototype
   * @returns {string} - A new string representing the calling string stripped of whitespace from both ends.
   */
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
} // }}}

// String.prototype.includes {{{
if (!String.prototype.includes) {
  /**
   * Determines whether one string may be found within another string, returning true or false as appropriate. From ECMA-262 6 edition. {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes|MDN}
   *
   * @example
   * var str = 'To be, or not to be, that is the question.';
   *
   * str.includes('To be');        // true
   * str.includes('question');     // true
   * str.includes('nonexistent');  // false
   * str.includes('To be', 1);     // false
   * str.includes('TO BE');        // false
   * str.includes('');             // true
   * @function includes
   * @memberof String.prototype
   * @param {string} searchString - The string to be searched.
   * @param {number} [position] - The position within the string at which to begin searching for searchString. (Defaults to 0.)
   * @returns {boolean} - true if the search string is found anywhere within the given string; otherwise, false if not.
   */
  String.prototype.includes = function (searchString, position) {
    if (searchString instanceof RegExp) {
      throw new Error('first argument must not be a RegExp');
    }

    if (position === undefined) position = 0;

    return this.indexOf(searchString, position) !== -1;
  };
} // }}}

// String.prototype.startsWith {{{
if (!String.prototype.startsWith) {
  /**
   * Determines whether a string begins with the characters of a specified string. From ECMA-262 6 edition. {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith|MDN}
   *
   * @example
   * var str = 'To be, or not to be, that is the question.';
   *
   * str.startsWith('To be');          // true
   * str.startsWith('not to be');      // false
   * str.startsWith('not to be', 10);  // true
   * @function startsWith
   * @memberof String.prototype
   * @param {string} searchString - The characters to be searched for at the start of this string.
   * @param {number} [position] - The position in this string at which to begin searching for searchString. Defaults to 0.
   * @returns {boolean} - true if the given characters are found at the beginning of the string; otherwise, false.
   */
  String.prototype.startsWith = function (searchString, position) {
    var pos = (position > 0) ? (position | 0) : 0;
    return this.substring(pos, pos + searchString.length) === searchString;
  };
} // }}}

// String.prototype.endsWith {{{
if (!String.prototype.endsWith) {
  /**
   * Determines whether a string ends with the characters of a specified string. From ECMA-262 6 edition. {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith|MDN}
   *
   * @example
   * var str = 'To be, or not to be, that is the question.';
   *
   * str.endsWith('question.');  // true
   * str.endsWith('to be');      // false
   * str.endsWith('to be', 19);  // true
   * @function endsWith
   * @memberof String.prototype
   * @param {string} searchString - The characters to be searched for at the end of str.
   * @param {number} [length] - If provided, it is used as the length of str. Defaults to str.length
   * @returns {boolean} - true if the given characters are found at the end of the string; otherwise, false.
   */
  String.prototype.endsWith = function (searchString, length) {
    if (length === undefined || length > this.length) {
      length = this.length;
    }

    return this.substring(length - searchString.length, length) === searchString;
  };
} // }}}

// vim:set foldmethod=marker commentstring=//%s :
