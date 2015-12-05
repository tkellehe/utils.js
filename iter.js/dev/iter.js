;(function(_, _defineProperty, _keys, _freeze, _nullptr, _instanceOf, _inherit) {
/**
 * new basic_iterator(o, _keys(o));
 * Allows the iteration across enumerable properties of objects.
 * 
 * @param scope : The object for the iterator to move through.
 * @param props : An array of enumerable property names for the scope.
 */
function basic_iterator(scope, props) {
    var // Scope for the iterator to run through.
        _scope = scope,
        // The properties that are enumerable of the scope.
        _props = props,
        // The instance being created.
        me     = this,
        // The current property the iterator is on.
        _i     = 0,
        // The amount of properties there are.
        _l     = props.length;
    // Used to convert the iterator into its indexed value.
    _defineProperty(me, 'valueOf', {value:function(){return _i}});
    // Used to allow access to the current scope of the iterator.
    _defineProperty(me, 'scope', {get: function(){return _scope}});
    // Returns the current property the iterator is pointing or returns nullptr.
    _defineProperty(me, 'prop', {get:function(){return 0 <= _i && _i < _l ? _props[_i] : iter.nullptr}});
    // Property that returns itself. Will return nullptr if out of bounds.
    // Also can be used to set the current index if the new value is a number.
    _defineProperty(me, 'me', {
        get: function(){ return 0 <= _i && _i < _l ? me : iter.nullptr },
        set: function(v){if(!isNaN(v = +v)) _i = v }
    });
    // Dereferences the iterator to get what it is pointing to.
    _defineProperty(me, '$', {
        get: function(){return _scope[_props[_i]]},
        set: function(v){_scope[_props[_i]] = v}
    });
};

/**
 * new lite_iterator(o, _keys(o));
 * Allows the iteration across enumerable properties of objects.
 * Adds some functionality that makes it faster than other iterators,
 * but still has some extra properties for simple use.
 * 
 * @param scope : The object for the iterator to move through.
 * @param props : An array of enumerable property names for the scope.
 */
function lite_iterator(scope, props) {
    var // Scope for the iterator to run through.
        _scope = scope,
        // The properties that are enumerable of the scope.
        _props = props,
        // The instance being created.
        me     = this,
        // The current property the iterator is on.
        _i     = 0,
        // The amount of properties there are.
        _l     = props.length;
    // Used to convert the iterator into its indexed value.
    _defineProperty(me, 'valueOf', {value:function(){return _i}});
    // Used to allow access to the current scope of the iterator.
    _defineProperty(me, 'scope', {get: function(){return _scope}});
    // Returns the current property the iterator is pointing or returns nullptr.
    _defineProperty(me, 'prop', {get:function(){return 0 <= _i && _i < _l ? _props[_i] : iter.nullptr}});
    // Property that returns itself. Will return nullptr if out of bounds.
    // Also can be used to set the current index if the new value is a number.
    _defineProperty(me, 'me', {
        get: function(){ return 0 <= _i && _i < _l ? me : iter.nullptr },
        set: function(v){if(!isNaN(v = +v)) _i = v }
    });
    // Dereferences the iterator to get what it is pointing to.
    _defineProperty(me, '$', {
        get: function(){return _scope[_props[_i]]},
        set: function(v){_scope[_props[_i]] = v}
    });
    // Moves the iterator to the first property and returns itself.
    _defineProperty(me, 'first', {
        get: function() {
            _i = 0;
            return me;
        }
    });
    // Moves the iterator to the last property and returns itself.
    _defineProperty(me, 'last', {
        get: function() {
            _i = _l - 1;
            return me;
        }
    });
    // Moves the iterator up one then returns itself.
    _defineProperty(me, 'next', {
        get: function() {
            ++_i;
            return me;
        }
    });
    // Moves the iterator down one then returns itself.
    _defineProperty(me, 'prev', {
        get: function() {
            --_i;
            return me;
        }
    });
    // Checks to see if can loop.
    _defineProperty(me, 'canloop', {
        get: function() { return _i*_i <= _i*(_l - 1) }
    });
    // Goes to the next property and returns whether or not is still in range.
    _defineProperty(me, 'loopnext', {
        get: function() {
            return ++_i < _l;
        }
    });
    // Goes to the next property and returns whether or not is still in range.
    _defineProperty(me, 'loopprev', {
        get: function() {
            return --_i >= 0;
        }
    });
};

// Makes the inheritance from basic_iterator to lite_iterator.
_inherit(lite_iterator, basic_iterator);

/**
 * new lite_iterator(o, _keys(o));
 * Allows the iteration across enumerable properties of objects.
 * Much bigger than lite_iterator and has loads of extra goodies.
 * 
 * @param scope : The object for the iterator to move through.
 * @param props : An array of enumerable property names for the scope.
 */
function smart_iterator(scope, props) {
    var // Scope for the iterator to run through.
        _scope = scope,
        // The properties that are enumerable of the scope.
        _props = props,
        // The instance being created.
        me     = this,
        // The current property the iterator is on.
        _i     = 0,
        // The amount of properties there are.
        _l     = props.length,
        // A multiplier to make the iterator go in reverse.
        _r     = 1,
        // Variable used to determine how much a shift should be.
        _delta = 1;
    // Used to convert the iterator into its indexed value.
    _defineProperty(me, 'valueOf', {value:function(){return _i}});
    // Used to allow access to the current scope of the iterator.
    _defineProperty(me, 'scope', {get: function(){return _scope}});
    // Returns the current property the iterator is pointing or returns nullptr.
    _defineProperty(me, 'prop', {get:function(){return 0 <= _i && _i < _l ? _props[_i] : iter.nullptr}});
    // Property that returns itself. Will return nullptr if out of bounds.
    // Also can be used to set the current index if the new value is a number.
    _defineProperty(me, 'me', {
        get: function(){ return 0 <= _i && _i < _l ? me : iter.nullptr },
        set: function(v){if(!isNaN(v = +v)) _i = v }
    });
    // Dereferences the iterator to get what it is pointing to.
    _defineProperty(me, '$', {
        get: function(){return _scope[_props[_i]]},
        set: function(v){_scope[_props[_i]] = v}
    });
    // Moves the iterator to the first property and returns itself.
    _defineProperty(me, 'first', {
        get: function() {
            _i = 0;
            return me;
        }
    });
    // Moves the iterator to the last property and returns itself.
    _defineProperty(me, 'last', {
        get: function() {
            _i = _l - 1;
            return me;
        }
    });
    // Moves the iterator up one then returns itself.
    _defineProperty(me, 'next', {
        get: function() {
            _i += _r * _delta;
            return me;
        }
    });
    // Moves the iterator down one then returns itself.
    _defineProperty(me, 'prev', {
        get: function() {
            _i -= _r * _delta;
            return me;
        }
    });
    // Checks to see if can loop.
    _defineProperty(me, 'canloop', {
        get: function() { return _i*_i <= _i*(_l - 1) }
    });
    // Goes to the next property and returns whether or not is still in range.
    _defineProperty(me, 'loopnext', {
        get: function() {
            return (_i += _r * _delta) < _l;
        }
    });
    // Goes to the next property and returns whether or not is still in range.
    _defineProperty(me, 'loopprev', {
        get: function() {
            return (_i -= _r * _delta) >= 0;
        }
    });
    // Reverses the iterator.
    _defineProperty(me, 'rev', {
        get: function() {
            // Flips the multiplier.
            _r *= -1;
            // Returns self for method chaining.
            return me;
        }
    });
    // Reverses the iterator by setting the value or checking to see if in reverse.
    _defineProperty(me, 'reverse', {
        get: function() { return function reverse(v) {
            // If no value is provided check to see if going in reverse.
            if(v === undefined) return _r == -1;
            // Else take the sign of the value.
            _r = (!!v * -2) + 1;
            // Then return self for method chaining.
            return me;
        }},
        set: function(v) { me.reverse(v) }
    });
    // Sets the _delta then returns itself or returns the _delta value.
    _defineProperty(me, 'delta', {
        get: function() { return function delta(v) {
            // If no value is provided return the _delta.
            if(isNaN(v = +v)) return _delta;
            // Make the multiplier the correct value.
            me.reverse = v;
            // Else make the delta the value.
            // Then make _delta positive.
            // Can multiply by _r because _r is the sign of v.
            _delta = _r * v;
            // Then return self for method chaining.
            return me;
        }},
        set: function(v) { me.delta(v) }
    });
    // Sets the iterators current position to the value given then returns itself.
    _defineProperty(me, 'shiftTo', {
        get: function() { return function shiftTo(v) {
            // If a number shift to that number.
            if(!isNaN(v = +v)) _i = v;
            // Returns self for method chaining.
            return me;
        }},
        set: function (v) { me.shiftTo(v) }
    })
    // Updates the _props.
    _defineProperty(me, 'update', {
        get: function() {
            // Updates the _props and _l.
            _l = (_props = _keys(_scope)).length;
            // Returns self for method chaining.
            return me;
        }
    });
    // Removes the current property from the scope.
    _defineProperty(me, 'remove', {
        get: function() {
            // Attempts to remove the memory.
            delete _scope[_props[_i]];
            // Removes the property from the _props.
            _props.splice(_i, 1);
            // Returns self for method chaining.
            return me;
        }
    });
    // Removes the last property from the scope.
    _defineProperty(me, 'pop', {
        get: function() {
            // Attempts to remove the memory.
            delete _scope[_props[_l - 1]];
            // Removes the property from the _props.
            _props.splice(_l - 1, 1);
            // Returns self for method chaining.
            return me;
        }
    });
    // Since inserting into the scope as a property would involve
    // rebuilding the object, the only way to add attributes is to
    // push onto the end.
    _defineProperty(me, 'push', {
        get: function() { return function push(prop, v) {
            // Make sure it is not an update.
            if(prop !== undefined) 
                // Make prop a string then create the property.
                _scope[(prop += '')] = v;
            // Always have to do an update to prevent from adding on the same prop.
            me.update;
            // Returns self for method chaining.
            return me;
        }}
    });
};

// Makes the inheritance from lite_iterator to smart_iterator.
_inherit(smart_iterator, lite_iterator);

var 
// The function that iter uses to create iterators.
    create_iterator,
// Object that has a list of functions used to change what iterator iter will create.
    iter_setTo = {
    basic: function(){ create_iterator = iter["basic"]; return iter; },
    lite : function(){ create_iterator = iter["lite"];  return iter; },
    smart: function(){ create_iterator = iter["smart"]; return iter; }
};

/**
 * iter([Object])
 * The function that creates iterators based off of input.
 * 
 * @param o : The object to create an iterator for. If not provided correctly will
 *            return nullptr.
 * 
 * @return Returns a new basic_iterator wrapped around the object.
 */
function iter(o) {
    // Makes sure that create_iterator is called in the same scope as iter.
    return create_iterator.call(this, o);
};

/**
 * iter.basic([Object])
 * The function that creates iterators based off of input.
 * 
 * @param o : The object to create an iterator for. If not provided correctly will
 *            return nullptr.
 * 
 * @return Returns a new lite_iterator wrapped around the object.
 */
_defineProperty(iter, 'basic', { value: function basic(o) {
    // Makes sure that o is an actual object.
    if(o === undefined || o === null) return iter.nullptr;
    // Creates the iterator.
    return new basic_iterator(o, _keys(o));
}});

// Makes the iter function return a basic_iterator.
iter_setTo.basic();

// Used to edit what iter creates.
_defineProperty(iter, 'setTo', { value: iter_setTo });

/**
 * iter.lite([Object])
 * The function that creates iterators based off of input.
 * 
 * @param o : The object to create an iterator for. If not provided correctly will
 *            return nullptr.
 * 
 * @return Returns a new lite_iterator wrapped around the object.
 */
_defineProperty(iter, 'lite', { value: function lite(o) {
    // Makes sure that o is an actual object.
    if(o === undefined || o === null) return iter.nullptr;
    // Creates the iterator.
    return new lite_iterator(o, _keys(o));
}});

/**
 * iter.smart([Object])
 * The function that creates iterators based off of input.
 * 
 * @param o : The object to create an iterator for. If not provided correctly will
 *            return nullptr.
 * 
 * @return Returns a new smart_iterator wrapped around the object.
 */
_defineProperty(iter, 'smart', { value: function smart(o) {
    // Makes sure that o is an actual object.
    if(o === undefined || o === null) return iter.nullptr;
    // Creates the iterator.
    return new smart_iterator(o, _keys(o));
}});

/**
 * iter.is([Object])
 * Takes in an object and returns whether or not it is an iterator.
 * 
 * @param i : The object to check whether or not it is an iterator.
 * 
 * @return Returns a boolean of whether or not the param is related to basic_iterator.
 *         True implies that it is an iterator object, and false otherwise.
 */
_defineProperty(iter, 'is', { value: function isiter(i) { 
    // Check to see if is a basic_iterator or if inherited from basic_iterator.
    return _instanceOf(i, basic_iterator);
}});

/**
 * iter.length([Object])
 * Takes in an object and calculates the number of enumerable properties
 * it has. If the object is an iterator object then it will calculate
 * the length of the iterator.
 * 
 * @param i : The object whose length is to be calculated.
 * 
 * @return Returns either the number of enumerable properties an
 *         object has or the length of an iterator.
 */
_defineProperty(iter, 'length', {value: function length(i) {
    // If undefined, null, or nullptr then return zero.
    if(i === undefined || i === null || i === iter.nullptr)
        return 0;
    
    // Checks to see if it is somehow related to a lite_iterator.
    if(_instanceOf(i, lite_iterator))
    {
        // Stores the current location of the iterator.
        var temp = +i, 
        // Calculates the length of the iterator by going to the 
        // last element then adding one to the index.
            size = +i.last + 1;
        // Resets the iterator.
        i.me = temp;
        // Defines the property length to the iterator.
        _defineProperty(i, 'length', {value:size, configurable:true, writable:true});
        // Returns the size calculated.
        return size;
    }
    // Checks to see if it is a basic_iterator.
    if(_instanceOf(i, basic_iterator))
    {
        // Calculates the length of the iterator by taking
        // number of keys its scope has.
        var size = _keys(i.scope).length;
        // Defines the property length to the iterator.
        _defineProperty(i, 'length', {value:size, configurable:true, writable:true});
        // Returns the size calculated.
        return size;
    }
    // If not an iterator then return the number of 
    // enumerable properties the object passed in has.
    return _keys(i).length;
}});

// Object used as the nullptr for iterators.
_defineProperty(iter, 'nullptr', {value:
    // Makes sure there is a nullptr object.
    _nullptr || 
    _freeze(new (function nullptr(){
        // Makes sure that the valueOf returns NaN.
        _defineProperty(this, 'valueOf', {value:function(){return NaN}});
    }))
});

// The current version of iter.js.
_defineProperty(iter, 'VERSION', {value:'2.0.0'});

// Attaches to the space loaded into.
_defineProperty(_, 'iter', {value:iter,enumerable:true});
}).call(this, this, Object.defineProperty, Object.keys, Object.freeze, this.nullptr,
        function(c, p){ return c instanceof p},
        function(c, p){ c.prototype = Object.create(p.prototype) })