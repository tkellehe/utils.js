;(function(_, _defineProperty, _Stack){

// Need some sort of stack structure.
// Similar to datastruct.js/stack.js version 1.0.0.
if(_Stack === undefined) _Stack = function() {
    var 
        _array   = {},
        _depth   = 0,
        _largest = 0;

    _defineProperty(this, "push", { value: function push(entry) {
        _array[_depth] = entry;
        if(_depth === _largest && (++_largest))
            (function(pos){_defineProperty(this, pos, { 
                get: function() {
                    return _array[_depth - pos - 1];
                }, 
                set: function(v) {
                    _array[_depth - pos - 1] = v;
                },
                enumerable: true 
            })})(_depth);
        // Returns what was just pushed on.
        return _array[_depth++]
    }});
    
    _defineProperty(this, "pop", { value: function pop() {
        if(_depth < 1) return null;
        var popped = _array[--_depth];
        delete _array[_depth];
        return popped;
    }});    

    _defineProperty(this, "depth", { get: function() { return _depth; }});

    _defineProperty(this, "copy", { value: function() {
        var stack = new Stack();
        for(var i = 0; i < _depth; ++i)
            stack.push(_array[i])
        return stack;
    }});
}

// The stack that stackme.js will keep track of.
var _the_stack = new _Stack();

function _Entry(obj) {
    var me      = this;

    _defineProperty(me, "ln",     { value: obj.ln     });
    _defineProperty(me, "col",    { value: obj.col    });
    _defineProperty(me, "method", { value: obj.method });
    _defineProperty(me, "file",   { value: obj.file   });
}

// Need to revamp to support functions with no name...

// [1] => method (only works for chrome and edge...)
// [2] => file
// [3] => ln
// [4] => col
var _all_regex = /^\s*at\s*(\w+)\W+(\w[\w\W]*)\:(\d+)\:(\d+)[^\d]*$/;

//    // Makes sure past is a number that can be used.
//    (isNaN(past = +past) || (past < 0)) && (past = 0);

function _update_stack(offset) {
    // Makes an object to get the stack from the browser.
    var err = new Error(), entry = {};
    // Creates the stack.
    try{throw err} catch (e){}
    
    var string_stack = err.stack.split("\n");
    for(var i in string_stack)
    console.log(string_stack[i]);
    // Gets the correct offset plus then add 1 to ignore the "Error"
    offset = (isNaN(offset = +offset) ? 0 : offset) + 1;

    for(var i = string_stack.length; --i >= offset;)
    {
        // Gets the ln and col number.
        var cap = _all_regex.exec(string_stack[i]);
        // Makes sure that cap was actually there.
        entry.method = cap ? cap[1] : "anomonous";
        entry.file   = cap ? cap[2] : "unknown";
        entry.ln     = cap ? cap[3] : -1;
        entry.col    = cap ? cap[4] : -1;
        _the_stack.push(new _Entry(entry));
    }
};

function _get_stack() {
    _update_stack(0);
    return _the_stack;
}

var stackme = { stack: _the_stack };

_defineProperty(stackme, "update", { get: _get_stack });

_defineProperty(stackme, "VERSION", { value: "1.0.0"});

_defineProperty(_, "stackme", { value: stackme });

})(this, Object.defineProperty, Stack)