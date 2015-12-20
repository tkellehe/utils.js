(function(_, _defineProperty) {

function Stack() {
    if(!(this instanceof Stack)) return new Stack();
    var 
        me       = this,
        _array   = {},
        _depth   = 0,
        _largest = 0;

    _defineProperty(me, "push", { value: function push(entry) {
        _array[_depth] = entry;
        if(_depth === _largest && (++_largest))
            (function(pos){_defineProperty(me, pos, { 
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
    
    _defineProperty(me, "pop", { value: function pop() {
        if(_depth < 1) return null;
        var popped = _array[--_depth];
        delete _array[_depth];
        return popped;
    }});    

    _defineProperty(me, "depth", { get: function() { return _depth; }});

    _defineProperty(me, "copy", { value: function() {
        var stack = new Stack();
        for(var i = 0; i < _depth; ++i)
            stack.push(_array[i])
        return stack;
    }});
}

_defineProperty(Stack, "VERSION", { value: "1.0.0" });

_defineProperty(_, "Stack", { value: Stack });

})(this, Object.defineProperty)