# utils.js
A bundle of different js tools that attach themselves to other libraries.

Each tool is created with three different files.

\<tool\>.js     => Contains comments describing the design that went into creating the tool's code implementation.

\<tool\>.min.js => A minified version of the tool, but still keeps all object names such that when debugging can view exactly what is breaking.

\<tool\>.compressed.js => Using [JScompress](http://jscompress.com/) to compress the tool down even more by removing all variable names down to a single character.

Note: No variable names does not mean that the tool's name is removed, just the underlying object and functions used to create those objects' names were changed.

## Current Tools
There current tools being worked on are:

### nullptr.js
**nullptr.js** is used to allow **nullptr** to be used in more tools.

[nullptr.js](http://tkellehe.github.io/utils.js/nullptr.js/nullptr.js)

[nullptr.min.js](http://tkellehe.github.io/utils.js/nullptr.js/nullptr.min.js)

[nullptr.compressed.js](http://tkellehe.github.io/utils.js/nullptr.js/nullptr.compressed.js)

### iter.js
**iter.js** brings in iterative capabilities over objects by providing an **iterator** object that can iterate through the enumerable properties of objects.
```javascript
for(var i = iter({a:0,b:1,c:2}); i.me != iter.nullptr; ++i.me)
	console.log(i.prop, ":", i.$);
/* === output ===
a : 0
b : 1
c : 2
*/
```
[learn more...](http://tkellehe.github.io/utils.js/iter.js/)

### point.js
**point.js** is a tool that can create **pointer** like objects.

``` javascript
var o = {o:{o:{a:"same",b:"value"},'o.b':"ignoreTree"}},
    p = iter.point.call(o, "o.o.a");
(function f(pointer) {
    pointer.$ = "changed";
})(p);
console.log(o.o.o.a); // => "changed"
console.log(p.scope(o.o).prop("o.b").$); // => "value"
console.log(p.ignoreTree().$); // => "ignoreTree"
```
``` javascript
var p = iter.point.call(Object,"propertyTree | property");
console.log(iter.point.isPointer(p)); // => true
// Redirects p.
iter.point.call(AnotherObject, "propertyTree | property", p); // => p
```
[point.js](http://tkellehe.github.io/utils.js/point.js/point.js)

[point.min.js](http://tkellehe.github.io/utils.js/point.js/point.min.js)

[point.compressed.js](http://tkellehe.github.io/utils.js/point.js/point.compressed.js)
