# utils.js
A bundle of different js tools that attach themselves to other libraries.

Each tool is created with three different files.

```\<tool\>.js``` => Contains comments describing the design that went into creating the tool's code implementation.

````\<tool\>.min.js``` => A minified version of the tool, but still keeps all object names such that when debugging can view exactly what is breaking.

```\<tool\>.compressed.js``` => Using [JScompress](http://jscompress.com/) to compress the tool down even more by removing all variable names down to a single character.

*Note*: No variable names does not mean that the tool's name is removed, just the underlying object and functions used to create those objects' names were changed.

***
***
## Current Tools
The current tools being worked on are:

***
### nullptr.js
**nullptr.js** is used to allow **nullptr** to be used in more tools.

[nullptr.js](http://tkellehe.github.io/utils.js/nullptr.js/nullptr.js)

[nullptr.min.js](http://tkellehe.github.io/utils.js/nullptr.js/nullptr.min.js)

[nullptr.compressed.js](http://tkellehe.github.io/utils.js/nullptr.js/nullptr.compressed.js)

***
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
[learn more...](https://github.com/tkellehe/utils.js/wiki/iter.js)

***
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

***
### strap.js
**strap.js** is a tool that loads js into particular contexts with ease. This allows for other tools within **utils.js**
to be used.

[strap.js](http://tkellehe.github.io/utils.js/strap.js/strap.js)

When **strap.js** loads, it will grab the script tag it was loaded in (will do nothing if the src is not a strap.js file).
If no other attributes are added to script tag, **strap.js** will not load anything and add the function **strap** to the
context it was loaded into.
```html
<script src="path/to/strap.js"></script>
<script> console.log(strap !== undefined) // => true </script>
```

Now, if trying to load a file, just provide the file name into the **strap** function or in the **data-srcs** attribute
of the script tag.
``` javascript
strap("path/to/file.js");
```
``` html
<script src="path/to/script" data-srcs="path/to/file.js"></script>
```

If you need to load a javascript file but do not want the **strap** function loaded, then use the **data-use** tag
to indicate to just *use* **strap.js** to load the files and that is it.
```html
<script src="path/to/strap.js" data-use></script>
<script> console.log(this.strap !== undefined) // => false </script>
```

To load files into a particular context, **strap.js** provides a simple scripting language to do so.

Commas between file names to load multiple files where each file will be loaded into the same conext as **strap.js** is loaded into.
```
file1.js, ..., filen.js
```
Run code snippets using ```<$< code snippet >$>``` in the same places as files.
```
<$< code >$>, file1.js, <$< code >$>, ...
```
If a file is provided then, can use the following technique to load into contexts.
```
file.js (o1, ..., on) { more strap.js script }, ...
```
If there is a need to load in a context but not load a file, then ```//``` will indicate to ignore the file.

There are some warnings though.
- File paths with spaces currently are not supported.
- Cannot embed multiple file context loading. ie ```file () { file () {} }``` due to using strictly just regex.

#### Example
``` html
<script src="strap.js" 
	data-srcs="<$<this.tools = {}>$>, // (tools) { nullptr.js, iter.js, point.js }"
	data-use>
</script>
```
