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

[keys.js](http://tkellehe.github.io/utils.js/keys.js/dev/keys.js)

***
###keys.js

__keys.js__ provides a simple low-level interface for keyboard events. The concept is to create objects that manage
an individual connection to a particular key.

``` javascript
// Get the object to listen to.
var element = document.getElementById("element");
// Creates the object that listens to the "any" key.
var any = keys("any", element);
// Attaches the Key instance to the object then adds an onkeydown event.
any.attach().onkeydown(function(){ console.log("down") });
```

The `onkeydown` event is different than the usual style where it is called repeatedly. This event is only called when the state of the key transitions from `up` to `down` (which makes more sense to me). Once that state is called, the normal `onkeydown` kicks in with the `onkeypressed` event.
