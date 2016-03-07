(function(_, _defineProperty) {

function SimpleStack() {
    if(!(this instanceof SimpleStack)) return new SimpleStack();
    var 
        me       = this,
        _array   = {},
        _depth   = 0;

    _defineProperty(me, "push", { value: function push(entry) {
        // Returns what was just pushed on.
        return _array[_depth++] = entry
    }});
    
    _defineProperty(me, "pop", { value: function pop() {
        if(_depth < 1) return null;
        var popped = _array[--_depth];
        delete _array[_depth];
        return popped;
    }});    

    _defineProperty(me, "depth", { get: function() { return _depth; }});

    _defineProperty(me, "copy", { value: function() {
        var stack = new SimpleStack();
        // Push on backwards such that stack copied looks correct.
        for(var i = _depth; i--;) stack.push(_array[i])
        return stack;
    }});
}

_defineProperty(SimpleStack, "__version__", { value: "1.0.0" });

_defineProperty(_, "SimpleStack", { value: SimpleStack });

})(this, Object.defineProperty)