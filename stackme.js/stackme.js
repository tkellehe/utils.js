;(function(global, g_defhidden, g_defprop, g_stack){

// The stack that stackme.js will keep track of.
var _the_stack = new g_stack();

function _Entry(obj) {
    var me = this;

    g_defprop(me, "string", obj.string);
    g_defprop(me, "ln",     obj.ln);
    g_defprop(me, "col",    obj.col);
    g_defprop(me, "method", obj.method);
    g_defprop(me, "file",   obj.file);
};

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
        entry.string = string_stack[i];
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

g_defprop(stackme, "update", _get_stack );

g_defhidden(stackme, "__version__", "1.0.0");

g_defprop(_, "stackme", stackme);

})(this, 
    Object.defineProperty ?
    function(object, prop, value) { Object.defineProperty(object, prop, {value:value}) }
    :
    function(object, prop, value) { object[prop] = value }
,
   Object.defineProperty ?
    function(object, prop, value) { Object.defineProperty(object, prop, {value:value, enumerable:true}) }
    :
    function(object, prop, value) { object[prop] = value }
, Stack)