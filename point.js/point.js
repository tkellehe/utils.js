;(function(_, _defineProperty, _freeze, _nullptr) {
// Makes sure that nullptr is an object that can be used.
_nullptr = _nullptr || _freeze(new (function nullptr(){
	_defineProperty(this, 'valueOf', {value:function(){return NaN}});
}));

/**
 * new Pointer([prop, scope])
 * Only can be used to create pointers.
 * Each pointer object has the ability to point to a property
 * within a scope.
 * 
 * @param prop  : The prop of the property to attach to. Can be a property tree.
 * @param scope : The context to that the prop is referenced in.
 * 
 * @author T. Mitchell Kelleher
 */
function Pointer(prop, scope) {
	var	// The instance being created.
		me       = this,
		// The scope the pointer is poiting into.
		_scope   = scope,
		// Whether or not for the pointer to treat the prop as a property tree.
		_useTree = true,
		// The prop of the property to point to.
		_prop    = prop;
	
	_defineProperty(me, "prop", {
		get:function() { return function f(value) {
			if(value === undefined)
				return _prop;
			if(typeof value === "string")
				_prop = value;
			return me;
		}; },
		set:function(value) { if(typeof value === "string") _prop = value; }
	});
	
	_defineProperty(me, "scope", {
		get:function() { return function f(value) {
			if(value === undefined)
				return _scope;
			if(typeof value === "object" ||
			   typeof value === "function")
				_scope = value;
			return me;
		}; },
		set:function(value) { 
			if(typeof value === "object" ||
			   typeof value === "function")
				_scope = value;
		}
	});
	
	_defineProperty(me, "propTree", {
		get:function() { function f(value) {
			if(value === undefined)
				return _useTree;
			_useTree = !!value;
			return me;
		}; return f;},
		set:function(value) {_useTree = !!value;}
	});
	_defineProperty(me, "ignoreTree", { value: function ignoreTree() {
		return me.propTree(false);
	}});
	_defineProperty(me, "useTree", { value: function useTree() {
		return me.propTree(true);
	}});
	
	// Function used to grab the correct information based for the prop and scope.
	function _getPropertyTree() {
		// If not using the property tree then just return generic data.
		if(!_useTree)
			return {
				canSet: true,
				i: 		0,
				prop: 	_prop,
				scope: 	_scope
			};
		
		// Split the different props of the property tree.
		var props  = _prop.split("."),
		// Store the _scope into the result to use for looping.
			result = _scope,
		// Used to determine if can set the variable.
			canSet = true;
		
		// Loops through attempting to find the correct scope that
		// the property lies in.
		for(var i = 0; i < props.length - 1 && canSet; ++i)
			if(result[props[i]] !== undefined)
				result = result[props[i]];
			else
				canSet = false;
		
		return {
			canSet: canSet,
			i: 		i,
			prop: 	props[i],
			scope: 	result
		};
	};
	
	_defineProperty(me, "$", {
		get:function() {
			var object = _getPropertyTree();
			if(object.canSet)
				return object.scope[object.prop];
			// If cannot set then cannot find the correct scope
			// so return nullptr.
			return _nullptr;
		},
		set:function(value) {
			var object = _getPropertyTree();
			if(object.canSet)
				object.scope[object.prop] = value;
		}
	});
};

/**
 * point("<property tree | property name>", [Pointer])
 * Creates a Pointer instance or redirects a pointer to a property within the scope
 * this function is ran in. By default it will run in the global space.
 * 
 * @param prop    : The prop of the property to point to.
 * @param pointer : A pointer object to redirect. If not provided, will create a new one.
 * 
 * @return Returns a new pointer or the pointer passed in.
 * 
 * @author T. Mitchell Kelleher
 */
function point(prop, pointer) {
	if(this instanceof point)
		throw new Pointer.InstantiateError("Cannot instantiate a Pointer.");
	// Checks to see if null or undefined was provided for the prop.
	if(prop === null || prop === _nullptr || prop === undefined)
		return _nullptr;
	if(typeof prop !== "string")
		throw new Pointer.InstantiateError("The prop must be a string.");
	
	// If is a pointer then can change out the scope and prop.
	if(pointer instanceof Pointer)
		pointer.scope(this).prop(prop);
	// Else just create a new pointer.
	else
		pointer = new Pointer(prop, this);
	
	return pointer;
};

// Determines if the object provided is an instance of PointerClass.
_defineProperty(point, "isPointer", { value: function isPointer(object) {
	return object instanceof Pointer;
}});

// Adds the nullptr to the point function.
_defineProperty(point, "nullptr", {value: _nullptr});

// The current version of point.js
_defineProperty(point, "VERSION", {value:"1.0.0"});

// Adds to the global space.
_defineProperty(_, "point", {value:point});

// Pointer Error Handling.
Pointer.InstantiateError = function InstantiateError() {
    var error = Error.apply(this, arguments);
    error.name = this.name = 'InstantiateError';
    this.stack = error.stack;
    this.message = error.message;
};

Pointer.InstantiateError.prototype = (function(){
	function F(){};
	F.prototype = Error.prototype;
	return new F();
})();
}).call(this, this, Object.defineProperty, Object.freeze, this.nullptr);