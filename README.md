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
###onlistener.js

[onlistener.js](http://tkellehe.github.io/utils.js/onlistener.js/onlistener.js)

__onlistener.js__ provides a simple way to make objects have event listener capabilities. This allows for generating more complex events for components.

``` javascript
// The object to attach to.
var eventHandler = {};
// Adds the functions addEventListener, removeEventListener, and onevent to the object (if provided).
var eventInfo = onlistener(eventHandler);
// To add events, by not providing an eventType it will create its own with the name of the event.
eventInfo = onlistener(eventHandler, "event");
console.log(eventInfo.eventType); // => function eventEvent() { ... }
// Now can add an event and trigger it!
function foo(event) { console.log(event) }
eventHandler.addEventListener("onevent", foo);
eventHandler.onevent(); // => displays and eventEvent object.
// Then can remove the function.
eventHandler.removeEventListener("onevent", foo);
eventHandler.onevent(); // => No events are invoked.
```

__* dependencies *__

__onlistener.js__ relies on __simplearray.js__ which is a basic array class used internally.

[simplearray.js](http://tkellehe.github.io/utils.js/datastruct.js/simplearray.js) [2.54 KB]

[simplearray.compressed.js](http://tkellehe.github.io/utils.js/datastruct.js/simplearray.compressed.js) [1.02 KB]

***
###keys.js

[keys.js](http://tkellehe.github.io/utils.js/keys.js/dev/keys.js)

__keys.js__ provides a simple low-level interface for keyboard events. The concept is to create objects that manage
an individual connection to a particular key.

``` javascript
// Get the object to listen to.
var element = document.getElementById("element");
// Creates the object that listens to the "any" key.
var any = keys("any", element);
// Attaches the Key instance to the object then adds an onkeydown event.
any.attach().onkeydown(function(){ console.log("down") });
// When done, just detach!
any.detach();
```

The `onkeydown` event is different than the usual style where it is called repeatedly. This event is only called when the state of the key transitions from `up` to `down` (which makes more sense to me). Once that state is called, the normal `onkeydown` kicks in with the `onkeypressed` event.

__* dependencies *__

__keys.js__ relies on __simplearray.js__ which is a basic array class used internally.

[simplearray.js](http://tkellehe.github.io/utils.js/datastruct.js/simplearray.js) [2.54 KB]

[simplearray.compressed.js](http://tkellehe.github.io/utils.js/datastruct.js/simplearray.compressed.js) [1.02 KB]
