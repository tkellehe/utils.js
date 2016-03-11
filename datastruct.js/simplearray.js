(function(global, g_defhidden, g_defprop) {
/**
 * Basic array with simple functionalities. These include push, resize, and clear.
 * The array is used in order to ensure that with all browsers the arrays will work.
 */
function SimpleArray() {
    var _members = {
        __self__: this,
        length: 0
    };
    g_defhidden(_members.__self__, "push", function(element) {
        _members.__self__.resize();
        _members.__self__[_members.length++] = element;
        return _members.__self__;
    });g_defhidden(_members.__self__, "remove", function(i) {
        if(typeof i === "number" && 0 <= i && i <= _members.length)
        {
            delete _members.__self__[i];
            _members.__self__.resize();
        }
        return _members.__self__;
    });
    g_defhidden(_members.__self__, "resize", function() {
        var counter = 0;
        for(var i = 0; i < _members.length; ++i) {
            if((""+i) in _members.__self__) {
                _members.__self__[counter++] = _members.__self__[i];
            }
        }
        // Clean up the offset.
        for(i = counter; i < _members.length; ++i) delete _members.__self__[i]
        _members.length = counter;
        return _members.__self__;
    });
    g_defhidden(_members.__self__, "clear", function() {
        for(var i = _members.length; i--;) delete _members.__self__[i]
        _members.length = 0;
        return _members.__self__;
    });
    g_defhidden(_members.__self__, "length", function(){ return _members.length });
};
/**
 * simplearray.forloop(function(i, elem, array){ console.log(array[i], elem) });
 * Essentially calls the function "length" times passing in the index, the element, and the array.
 * Also, resizes before running the loop.
 * 
 * @param f : A function to be called "length" times.
 */
g_defprop(SimpleArray.prototype, "forloop", function(f) {
    if(f instanceof Function) {
        this.resize();
        var index = 0;
        while(index < this.length()) f(index, this[index++], this);
    }
    return this;
});

g_defhidden(SimpleArray, "__version__" , "1.0.0" );
g_defprop(global, "SimpleArray", SimpleArray);

})(this, polyfill.defhidden, polyfill.defprop)