(function(_, _defineProperty, _timer, _clearTimer, _arg_splice) {

function Async(method, scope) {

    // Makes sure that Async is used like "new Async(...)"
    if(!(this instanceof Async)) throw new Error("Must instantiate Async an instance.")

    var me       = this,
        _method  = method,
        _scope   = scope,
        _timeout = undefined;

    /**
     * A smart getter/setter that interfaces with the _method property of the instance.
     * The getter can act like a setter if information provided to the function is not undefined
     * and is a function. If the value provided is undefined, the function will return _method.
     * If the value provided is not undefined then it will be set as _method if the value is 
     * a function then it will return the instance to all method chaining. The setter works
     * the same as a normal setter except will ignore anything that makes _method not a function.
     * Also, can go "async.method.clear()" to clear _method and the clear() function returns the
     * instance to allow method chaining.
     * 
     * @param v : Must be a function in order to set. If v is undefined then _method will be returned. 
     * 
     * @return Returns _method or the instance based off of the parameter provided.
     */
    _defineProperty(me, "method", {
        get: function() { function method(v) {
                if(v === undefined) return _method;
                if(typeof v === "function") _method = v;
                return me;
            }
            _defineProperty(method, "clear", { value: function clear() { _method = undefined; return me } });
            return method;
        },
        set: function(v) { me.method(v) }
    });

    /**
     * A smart getter/setter that interfaces with the _scope property of the instance.
     * The getter can act like a setter if information provided to the function is not undefined.
     * If the value provided is undefined, the function will return _scope.
     * If the value provided is not undefined then it will be set as _scope 
     * then it will return the instance to all method chaining. The setter works
     * the same as a normal setter except will ignore anything that makes _scope not a function.
     * Also, can go "async.scope.clear()" to clear _scope and the clear() function returns the
     * instance to allow method chaining.
     * 
     * @param v : Can be anything that can be used to scope a function.
     *            If v is undefined then _scope will be returned. 
     * 
     * @return Returns _scope or the instance based off of the parameter provided.
     */
    _defineProperty(me, "scope", {
        get: function() { function scope(v) {
                if(v === undefined) return _scope;
                _scope = v;
                return me;
            }
            _defineProperty(scope, "clear", { value: function clear() { _scope = undefined; return me } });
            return scope;
        },
        set: function(v) { me.scope(v) }
    });

    /**
     * Clears the _timeout property if there is one in order to stop an asynchronous call.
     * 
     * @return Returns the instance to allow method chaining.
     */
    _defineProperty(me, "stop", { value: function stop() {
        if(_timeout !== undefined) _clearTimer(_timeout);
        return me;
    }});

    _defineProperty(me, "call", { value: function call(scope, method, delay, args) {
        me.stop();
        _timeout = _timer(function(){method.apply(scope, args)}, delay);
        return me;
    }});

    _defineProperty(me, "apply", { value: function apply(scope, args) {
        return me.call(scope, args[0], args[1], args[2]);
    }});

    _defineProperty(me, "runin", { value: function runin(scope, method) {
        if(typeof method !== "function") method = _method;
        return me.call(scope || this, method, 0, _arg_splice(arguments, 2));
    }});

    _defineProperty(me, "run", { value: function run(method) {
        if(typeof method !== "function") method = _method;
        return me.runin.call(this, [_scope || this, method].concat(_arg_splice(arguments, 1)));
    }});
}

function Async_Break() {
    this.name    = "Async_Break";
    this.message = "Attempting to break asynchronous process.";
}

Async_Break.prototype = new Error();

_defineProperty(Async, "break", { get: function() {
    throw new Async_Break();
}});

_defineProperty(Async, "VERSION", { value: "1.0.0" });

_defineProperty(_, "Async", { value: Async });

})(this, Object.defineProperty, setTimeout, clearTimeout, 
function(args, ignore_count){
    return Array.prototype.splice.call(args, ignore_count);
})