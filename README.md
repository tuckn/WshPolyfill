# WSH: Polyfill

Add any functions that can be used at ES5 and above have into WSH (Windows Script Host).
These functions are, for example, Array.forEach, JSON.parse and String.trim, etc.

## Installation

(1) Create a directory of your WSH project.

```console
> mkdir YourWshProject
> cd YourWshProject
```

(2) Download this ZIP or Use `git` command.

```console
> git clone https://github.com/tuckn/WshPolyfill.git
or
> git submodule add https://github.com/tuckn/WshPolyfill.git ./WshModules/WshPolyfill
```

(3) Include *.\WshPolyfill\dist\index.js* into your .wsf file.
For Example, if your file structure is

```console
D:\MyWshFolder\
├─ Run.wsf
├─ YourScript.js
└─ WshPolyfill\
    └─ dist\
      └─ index.js
```

The content of above *Run.wsf* is

```xml
<package>
  <job id = "run">
    <script language="JScript" src="./WshPolyfill/dist/index.js"></script>
    <script language="JScript" src="./YourScript.js"></script>
  </job>
</package>
```

I recommend this .wsf file encoding to be UTF-8 [BOM, CRLF].
This allows the following functions to be used in *.\YourScript.js*.

## Usage

Now *YousrScript.js* (JScript ) can use the extended functions.
for example,

```js
var array1 = Array.from('abc');
console.dir(array1);
// Output: '["a", "b", "c"]'

array1.forEach(function (element) { console.log(element); });
// Output: 'a'
// Output: 'b'
// Output: 'c'
```

Many other methods are added to JScript, such as `Array.map`, `JSON.parse`, `Object.keys`, `String.trim`. See the documentation for more details.

## Documentation

See all specifications [here](https://docs.tuckn.net/WshPolyfill).

## TODO

Implement something similar to ArrayBuffer.

## License

MIT

Copyright (c) 2020 [Tuckn](https://github.com/tuckn)
