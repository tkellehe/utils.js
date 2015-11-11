;(function(_, _defineProperty) {
// Used to store all of the function's data.
var _function_store = {},
// The current function in use.
    _current_use    = undefined,
// Used as the default start.
	_dstart         = {ln:2, col:0};

/**
 * Registers a function to a name in the _function_store object
 * and also removes the prviously stored function.
 * 
 * @param name : The name of the function to be stored.
 * @param f    : The function to be stored.
 */
function _register(name, f) {
	delete _function_store[name];
	_function_store[name] = {f:f};
};

/**
 * Gets the ln and col # from the frame that called to this one. Use past
 * to go back further.
 * 
 * @param past : Defaults to zero if not provided correctly.
 * 
 * @return Returns an object with the properties ln and col. These will
 *         negative one if the frame does not exist.
 */
function _lncol(past) {
	// Makes sure past is a number that can be used.
    (isNaN(past = +past) || (past < 0)) && (past = 0);
	// Stores the stack...
	var err = new Error();
	// Gets the stack.
	try{throw err} catch (e){}
	
	// Gets the ln and col number.
	var cap = /\:(\d+)\:(\d+)[^\d]*$/.exec(err.stack.split("\n")[2+past]);
	// Makes sure that cap was actually there.
	if(!cap) return {ln:-1, col:-1};
	return {ln:cap[1], col:cap[2]};
};

/**
 * Takes a function and comments out everything up to the location after the hault spot.
 * 
 * @param haultSpot : An object that contains the properties ln and col to indicate
 *                    where to have the last commented area.
 * @param f         : The function to break apart.
 * @param startSpot : An object that contains the properties ln and col to indicate
 *                    where to start the comments.
 * 
 * @return A function with everything commented out based off of the params.
 */
function _BreakOff(haultSpot, f, startSpot) {
    var parts    = f.toString().split("\n")
		haultln  = haultSpot.ln - startSpot.ln + 1;
	// The header for the function.
	    parts[0] = /^([\w\W]*?\{)/.exec(parts[0])[1];
	// Remove everything after the hault location.
	for(var i = 1, lnCount = parts.length; i < lnCount; ++i)
		if(i <= haultln)
			parts[i] = "//" + parts[i];
	// Create the new function. NOTE: Need to come back and have own eval...
	return eval("(function(){ return " + parts.join("\n") + "})()");
}

// Used to store a hault location.
function _hault_error(lncol) {this.lncol = lncol};

function safe(name, f, set_own_start) {
	var _ish   = false,
		_f     = f,
		_br    = false,
		_brf   = _f,
		_n     = name,
		_args  = [],
		_scope = this,
		_hault = undefined,
		_use   = {};
	// If need to make its own start, make sure the function is stored correctly.
	if(set_own_start = !!set_own_start)
	{
		_f = eval("(function(){return "+f.toString()+";})()");
		_brf = _f;
		_function_store[_n].start = {ln:2, col:0};
	}
		
	function safe_function() {
		_scope = this;
		_args  = arguments;
		// Sets itself as the current user.
		safe_function.set_use;
		// Used to store the result.
		var result;
		try {
			result = (_br ? _brf : _f).apply(_scope, _args);
			// Clean up because we got a result.
			safe_function.reset;
		} catch(error) {
			// If recieved a _hault_error then store where.
			if(error instanceof _hault_error)
			{
				_hault = error.lncol;
				_ish = true;
			}
			// Else, throw the error back.
			else				
				throw error;
		}
		// Make sure that this variable is set back that way can reuse the function.
		_br = false;
		// Send out the result.
		return result;
	};
	
	_defineProperty(safe_function, "ishaulted", {get:function(){
		return _ish
	},enumerable:true});
	
	_defineProperty(safe_function, "continue", {get:function(){
		_br  = true;
		_ish = false;
		if(_hault === undefined)
		{
			// If not haulted make sure that the _brf is _f.
			_brf = _f;
		    return safe_function.apply(_scope, _args);
		}
	    else
		{
			_brf = _BreakOff(_hault, _f, 
			                 (_brf === _f ? _function_store[_n].start : {ln:2,col:0}));
			return safe_function.apply(_scope, _args);
		}
	},enumerable:true});
	
	_defineProperty(safe_function, "set_use", {get:function(){
		_current_use = _use; 
		return safe_function;
	}});	
	_defineProperty(safe_function, "reset", {get:function(){
		for(var i in _use)
			delete _use[i];
		_brf   = _f;
		_hault = undefined;
		_br    = 
		_ish   = false;
		return safe_function;
	}});
	
	_defineProperty(safe_function, "me", {get:function(){return _f}});
	
    _register(name, safe_function);
	
	return safe_function;
};

// Stores the safe function to the scope.
_defineProperty(_, "safe", {value:safe});

// Throws a _hault_error with the ln and col that called this function.
_defineProperty(_, "hault", {value:function hault() {
	throw new _hault_error(_lncol(1));
}});

/**
 * Indicates where the start of the function is for the safe_functions.
 * 
 * @param name : The name of the safe_function to use.
 */
_defineProperty(_, "start", {value:function start(name) {
	if(_function_store[name] !== undefined)
		_function_store[name].start = _lncol(1);
}});

//Gets the currently in use properties.
_defineProperty(_, "use", {get:function()  {return _current_use}});

/**
 * Calls to the function stored by the name to set its use to the current use.
 * 
 * @param name : The name of a function that has been stored.
 * 
 * @return Returns the function stored or undefined if there was no function...
 */
_defineProperty(_, "set_use", {value:function set_use(name) {
	if(_function_store[name])
	    return _function_store[name].set_use;
}});

/**
 * Calls to the function stored by the name to reset itself.
 * 
 * @param name : The name of a function that has been stored.
 * 
 * @return Returns the function stored or undefined if there was no function...
 */
_defineProperty(_, "reset", {value:function reset(name) {
	if(_function_store[name])
	    return _function_store[name].reset;
}});

}).call(this, this, Object.defineProperty);