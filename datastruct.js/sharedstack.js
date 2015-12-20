(function(_, _defineProperty) {

function SharedStack(array) {
    if(!(this instanceof SharedStack)) return new SharedStack(array);
    if(array === undefined) array = { length: 0 };

    var me          = this,
        _depth_name = "length";
    // Makes sure that the array has some form of length.
    if(array.length === undefined) {
        if(array.size !== undefined) _depth_name = "size"
        else if(array.depth !== undefined) _depth_name = "depth"
        else array.length = 0;
    }

    _defineProperty(me, "push", { value: function push(entry) {
        // Returns what was just pushed on.
        return array[array[_depth_name]++] = entry
    }});
    
    _defineProperty(me, "pop", { value: function pop() {
        if(array[_depth_name] < 1) return null;
        var popped = array[--array[_depth_name]];
        delete array[array[_depth_name]];
        return popped;
    }});    

    _defineProperty(me, "depth", { get: function() { return array[_depth_name]; }});

    _defineProperty(me, "copy", { value: function() {
        return new SharedStack(array);
    }});
}

_defineProperty(SharedStack, "VERSION", { value: "1.0.0" });

_defineProperty(_, "SharedStack", { value: SharedStack });

})(this, Object.defineProperty)