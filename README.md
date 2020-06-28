# WshPolyfill

Add any functions that can be used at ES5 and above have into WSH (Windows Script Host).
These functions are, for example, Array.forEach, JSON.parse and String.trim, etc.

## tuckn/Wsh series dependency

[WshModeJs](https://github.com/tuckn/WshModeJs)  
└─ [WshProcess](https://github.com/tuckn/WshProcess)  
&emsp;&emsp;└─ [WshFileSystem](https://github.com/tuckn/WshFileSystem)  
&emsp;&emsp;&emsp;&emsp;└─ [WshOS](https://github.com/tuckn/WshOS)  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;└─ [WshPath](https://github.com/tuckn/WshPath)  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;└─ [WshUtil](https://github.com/tuckn/WshUtil)  
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;└─ WshPolyfill - This repository  

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

Now _.\MyScript.js_ (JScript ) can use the extended functions.
for example,

### console

```js
console.log('a');
// Output: a

console.log({ a: 'A' });
// Output: [object Object]

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

### JSON

### Object

### String

Many other methods are added to JScript, such as `Array.map`, `JSON.parse`, `Object.keys`, `String.trim`. See the documentation for more details.

## Documentation

See all specifications [here](https://docs.tuckn.net/WshPolyfill).

## TODO

Implement something similar to ArrayBuffer.

## License

MIT

Copyright (c) 2020 [Tuckn](https://github.com/tuckn)
