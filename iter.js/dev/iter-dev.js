;(function(_, _defineProperty, _keys, _freeze, _nullptr) {
/**
 * new static_iterator(o, _keys(o));
 * Allows the iteration across enumerable properties of objects.
 * Though the byte size does grow as the number of enumerable properties increases
 * can move quickly through the properties. Also, if any new properties are added or
 * removed from the scope, the iterator will not know.
 * 
 * @param scope : The object for the iterator to move through.
 * @param props : An array of enumerable property names for the scope.
 */
function static_iterator(scope, props) {
	var // Scope for the iterator to run through.
		_scope = scope,
		// The properties that are enumerable of the scope.
		_props = props,
		// The instance being created.
		me 	   = this,
		// The current property the iterator is on.
		_i	   = 0,
		// The amount of properties there are.
		_l	   = props.length,
		// A multiplier to make the iterator go in reverse.
		_r     = 1;
	// Used to convert the iterator into its indexed value.
	_defineProperty(me, 'valueOf', {value:function(){return _i}});
	// Used to alow access to the current scope of the iterator.
	_defineProperty(me, 'scope', {get: function(){return _scope}});
	// Returns the current property the iterator is pointing or returns nullptr.
	_defineProperty(me, 'prop', {get:function(){return 0 <= _i && _i < _l ? _props[_i] : iter.nullptr}});
	// Property that returns itself. Will return nullptr if out of bounds.
	// Also can be used to set the current index if the new value is a number.
	_defineProperty(me, 'me', {
		get: function(){return 0 <= _i && _i < _l ? me : iter.nullptr},
		set: function(v){if(!isNaN(v = +v)) 
			// Calculates the change and will either subtract or add onto _i.
			_i += _r * (v - _i)
		}
	});
	// Dereferences the iterator to get what it is pointing to.
	_defineProperty(me, '$', {
		get: function(){return _scope[_props[_i]]},
		set: function(v){_scope[_props[_i]] = v}
	});
	// Moves the iterator to the last property and returns itself.
	_defineProperty(me, 'last', {
		get: function() {
			_i = _l - 1;
			return me;
		}
	});
	// Moves the iterator to the first property and returns itself.
	_defineProperty(me, 'first', {
		get: function() {
			_i = 0;
			return me;
		}
	});
	// Moves the iterator up one then returns itself.
	_defineProperty(me, 'next', {
		get: function() {
			_i += _r;
			return me;
		}
	});
	// Moves the iterator down one then returns itself.
	_defineProperty(me, 'prev', {
		get: function() {
			_i -= _r;
			return me;
		}
	});
	// Reverses the iterator.
	_defineProperty(me, 'rev', {
		get: function() {
			_r *= -1;
			return me;
		}
	});
	// Reverses the iterator.
	_defineProperty(me, 'reverse', {
		get: function() { return function reverse(v) {
			if(v === undefined) return _r == -1;
			_r = (!!v * -2) + 1;
			return me;
		}},
		set: function(v) { me.reverse(v) }
	});
	// Checks to see if at the end.
	_defineProperty(me, 'isend', {
		get: function() { return 0 > _i || _i >= _l }
	});
	// Checks to see if can loop.
	_defineProperty(me, 'canloop', {
		get: function() { return _i*_i <= _i*(_l - 1) }
	});
	// Moves to next and returns whether or not can loop.
	_defineProperty(me, 'loopnext', {
		get: function() { return _i++ < _l }
	});
	// Moves to next and returns whether or not can loop.
	_defineProperty(me, 'loopprev', {
		get: function() { return _i-- < _l }
	});
};

/**
 * new static_list([Object]);
 * Allows the iteration across enumerable properties of objects.
 * This object utilizes the static_iterator such that every enumerable
 * property of the object passed returns the itertator at for that property.
 * 
 * @param o : The object for the list to gather the enumerable properties from.
 */
function static_list(o) {
	var // The instance being created.
		me = this,
		// Used to iterator through the properties.
		_i = iter(o);
	
	// Iterates through the object's enumerable properties
	// and attaches a getter and setter for the property
	// such that it interfaces with the static_iterator.
	for(;!isNaN(+_i.me);++_i.me)
		(function(p) {_defineProperty(me, _i.prop, {
			// First must set the iterator to the correct iteration value then return it.
			get: function(){ _i.me = p; return _i;},
			// First must set the iterator to the correct iteration value then set the vale to the reference.
			set: function(v){ _i.me = p; _i.$ = v;},
			// Makes sure that the property is enumerable.
			enumerable:true
		// Uses p to locate the exact value stored to recieve the correct property.
		})})(+_i);
};

/**
 * iter([Object])
 * The function that creates iterators based off of input.
 * 
 * @param o : The object to create an iterator for. If not provided correctly will
 * 			  return nullptr.
 * 
 * @return Returns a new static_iterator wrapped around the object.
 */
function iter(o) {
	// Makes sure that o is an actual object.
	if(o === undefined || o === null) return iter.nullptr;
	// Creates the iterator.
	return new static_iterator(o,_keys(o));
};

/**
 * Takes in an object and calcualtes the number of enumerable properties
 * it has. If the object is an iterator objet then it will calculate
 * the length of the iterator.
 * 
 * @param i : The object whose length is to be calculated.
 * 
 * @return Returns either the number of enumerable properties an
 *         object has or the length of an iterator.
 */
_defineProperty(iter, "length", {value: function length(i) {
	// If undefined, null, or nullptr then return zero.
	if(i === undefined || i === null || i === iter.nullptr)
		return 0;
	// Checks to see of it is a static_iterator.
	if(i instanceof static_iterator)
	{
		// Stores the current location of the iterator.
		var temp = +i, 
		// Calculates the length of the iterator by going to the 
		// last element then adding one to the index.
			size = +i.last + 1;
		// Resets the iterator.
		i.me = temp;
		// Defines the property length to the iterator.
		_defineProperty(i, "length", {value:size, configurable:true, writable:true});
		// Returns the size calculated.
		return size;
	}
	// Checks to see of it is a static_list.
	if(i instanceof static_list)
	{
		// Stores all of the properties of the list.
		var props = _keys(i), 
		// Calculates the length of the list.
			size = props.length;
		if(props[0] !== undefined)
			// Defines the property length to the iterator.
			_defineProperty(i[props[0]], "length", {value:size, configurable:true, writable:true});
		// Returns the size calculated.
		return size;
	}
	// If not an iterator then return the number of 
	// enumerable properties the object passed in has.
	return _keys(i).length;
}});

/**
 * iter.list([Object])
 * The function that creates list objects.
 * 
 * @param o : The object to create wrap the list object around.
 * 
 * @return Returns a new static_list wrapped around the object.
 */
_defineProperty(iter, 'list', {value: function(o) {
	return new static_list(o);
}});

// Object used as the nullptr for iterators.
_defineProperty(iter, 'nullptr', {value:
	// Makes sure there is a nullptr object.
	_nullptr || 
	_freeze(new (function nullptr(){
		_defineProperty(this, 'valueOf', {value:function(){return NaN}});
	}))
});

// The current version of iter.js.
_defineProperty(iter, 'VERSION', {value:'1.1.0'});

// Attaches to the space loaded into.
_defineProperty(_, 'iter', {value:iter,enumerable:true});
}).call(this, this, Object.defineProperty, Object.keys, Object.freeze, this.nullptr)