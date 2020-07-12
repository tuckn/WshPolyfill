# WshPolyfill

Add useful functions that can be used at ES5 and above have into WSH (Windows Script Host).
These functions are, for example, Array.forEach, JSON.parse and String.trim, etc.

## tuckn/Wsh series dependency

[WshModeJs](https://github.com/tuckn/WshModeJs)  
└─ [WshNet](https://github.com/tuckn/WshNet)  
&emsp;└─ [WshChildProcess](https://github.com/tuckn/WshChildProcess)  
&emsp;&emsp;└─ [WshProcess](https://github.com/tuckn/WshProcess)  
&emsp;&emsp;&emsp;&emsp;└─ [WshFileSystem](https://github.com/tuckn/WshFileSystem)  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;└─ [WshOS](https://github.com/tuckn/WshOS)  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;└─ [WshPath](https://github.com/tuckn/WshPath)  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;└─ [WshUtil](https://github.com/tuckn/WshUtil)  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;└─ WshPolyfill - This repository  

The upper layer module can use all the functions of the lower layer module.

## Operating environment

Works on JScript in Windows.

## Installation

(1) Create a directory of your WSH project.

```console
D:\> mkdir MyWshProject
D:\> cd MyWshProject
```

(2) Download this ZIP and unzipping or Use bellowing `git` command.

```console
> git clone https://github.com/tuckn/WshPolyfill.git ./WshModules/WshPolyfill
or
> git submodule add https://github.com/tuckn/WshPolyfill.git ./WshModules/WshPolyfill
```

(3) Include _.\WshPolyfill\dist\bundle.js_ into your .wsf file.
For Example, if your file structure is

```console
D:\MyWshProject\
├─ Run.wsf
├─ MyScript.js
└─ WshModules\
    └─ WshPolyfill\
        └─ dist\
          └─ bundle.js
```

The content of above _Run.wsf_ is

```xml
<package>
  <job id = "run">
    <script language="JScript" src="./WshModules/WshPolyfill/dist/bundle.js"></script>
    <script language="JScript" src="./MyScript.js"></script>
  </job>
</package>
```

I recommend this .wsf file encoding to be UTF-8 [BOM, CRLF].
This allows the following functions to be used in _.\MyScript.js_.

## Usage

Now _.\MyScript.js_ (JScript) can use the extended functions.
for example,

### console

[console](https://docs.tuckn.net/WshPolyfill/console.html) object is defined at the global scope.


```js
console.log('a'); // Output: a
console.log(true); // Output: -1
console.log({ a: 'A' }); // Output: [object Object]

console.dir(true);
// Output: true

console.dir({ a: 'A' });
// Output: {
//   a: "A"
// }

console.debug('This message is displayed if WSH_ENV=development');
// The behavior changes depending on the environment variable WSH_ENV

console.popup('This window will close automatically after 10 seconds', 10);
// Popup a message window

// and so on...
```

### Array

New functions and prototypes are added to the [Array](https://docs.tuckn.net/WshPolyfill/Array.html).

```js
// from
var array1 = Array.from('abc');
console.dir(array1);
// Output: ['a', 'b', 'c']

// isArray
Array.isArray([1, 2, 3]); // true
Array.isArray({ foo: 123 }); // false
Array.isArray('foobar'); // false

// filter
var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
var result = words.filter(function (word) {
  return word.length > 6;
});
console.dir(result);
// Output: ['exuberant', 'destruction', 'present']

// forEach
array1.forEach(function (element) {
  console.log(element);
});
// Output: 'a'
// Output: 'b'
// Output: 'c'

// and so on...
```

### Function

New functions and prototypes are added to the [Function](https://docs.tuckn.net/WshPolyfill/Function.html).

```js
// Bind Scope
var module = {
  x: 42,
  getX: function () { return this.x; }
};

console.log(module.getX()); // Outputs: 42

var unboundGetX = module.getX;
console.log(unboundGetX()); // Outputs: undefined
// Because the function gets invoked at the global scope.

var boundGetX = unboundGetX.bind(module);
console.log(boundGetX()); // Outputs: 42

// Bind Argument
var addArguments = function (arg1, arg2) { return arg1 + arg2; };

addArguments(1, 2); // Returns: 3

var addThirtySeven = addArguments.bind(null, 37);
addThirtySeven(); // Returns: NaN. Because 37 + undefined
addThirtySeven(5); // Returns: 42. Because 37 + 5 = 42
addThirtySeven(5, 10); // Returns: 42. Because 10 is ingnored.
```

### JSON

[JSON](https://docs.tuckn.net/WshPolyfill/JSON.html) object is defined at the global scope.

```js
// stringfy
var obj1 = {
  undef: undefined, // Will be ignored this
  nan: NaN,
  infinite: Infinity
};
JSON.stringify(obj1);
// Returns: String '{"nan":null,"infinite":null}'

var obj2 = {
  nu: null,
  num: 42,
  float: 3.14,
  str: 'Some string',
  b: false,
  obj: { a: 'A' },
  a: [1, 2, 3]
};
JSON.stringify(obj2, null, 2);
// Returns: String '{
//   "nu": null,
//   "num": 42,
//   "float": 3.14,
//   "str": "Some string",
//   "b": false,
//   "obj": {
//     "a": "A"
//   },
//   "a": [
//     1,
//     2,
//     3
//   ]
// }'

// parse
var str1 = '{"result":true, "count":42}';
JSON.parse(str1);
// Returns: Object { result: true, count: 42 }

var str2 = '[false, "false", 5, "5"]';
JSON.parse(str2);
// Returns: Array [false, 'false', 5, '5']

```

### Object

New functions and prototypes are added to the [Object](https://docs.tuckn.net/WshPolyfill/Object.html).

```js
var object1 = { a: 'somestring', b: 42, c: false };

Object.keys(object1); // Returns: Array ['a', 'b', 'c']
Object.values(object1); // Returns: Array ['somestring', 42, false]

Object.assign(object1, { c: 4, d: 5 });
// Returns: Object { a: 'somestring', b: 42, c: 4, d: 5 }

var foo = { a: 1 };
var bar = { a: 1 };
Object.is(foo, foo); // true
Object.is(foo, bar); // false
```

### String

New functions and prototypes are added to the [String](https://docs.tuckn.net/WshPolyfill/String.html).

```js
// trim
'   Hello world!   '.trim(); // 'Hello world!'
'Hello world!   '.trim(); // 'Hello world!'
'   Hello world!'.trim(); // 'Hello world!'
'\tHello world!\t'.trim(); // 'Hello world!'
'　Hello world!　'.trim(); // '　Hello world!　'

var str = 'To be, or not to be, that is the question.';

str.includes('To be');        // true
str.includes('question');     // true
str.includes('nonexistent');  // false
str.includes('To be', 1);     // false
str.includes('TO BE');        // false
str.includes('');             // true

str.startsWith('To be');          // true
str.startsWith('not to be');      // false
str.startsWith('not to be', 10);  // true

str.endsWith('question.');  // true
str.endsWith('to be');      // false
str.endsWith('to be', 19);  // true
```

## Documentation

See all specifications [here](https://docs.tuckn.net/WshPolyfill).

## TODO

Implement something similar to ArrayBuffer.

## License

MIT

Copyright (c) 2020 [Tuckn](https://github.com/tuckn)
