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
		_l	   = props.length;
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
		set: function(v){if(!isNaN(v = +v)) _i = v}
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
	// If not an iterator then return the number of 
	// enumerable properties the object passed in has.
	return _keys(i).length;
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
_defineProperty(iter, 'VERSION', {value:'1.0.0'});

// Attaches to the space loaded into.
_defineProperty(_, 'iter', {value:iter,enumerable:true});
}).call(this, this, Object.defineProperty, Object.keys, Object.freeze, this.nullptr)