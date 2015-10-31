;(function(_, _defineProperty, _eval, _RegExp) {
// Makes sure can instantiate regular expressions.
_RegExp = _RegExp || function(string) {return _eval.call(_,"/"+string+"/")};
// Wrapper for Regexp.
function REX(string) {
	var me = this, _string = string, _chain = [];
	
	// Used to get the content that the REX will be acting on.
	_defineProperty(me, "content", {
		get: function() { return function(v) {
			if(v === undefined) return _string;
			if(typeof (v = v.toString()) === "string") _content = v;
			return me;
		}},
		set: function(v) {
			if(typeof (v = v.toString()) === "string") _content = v;
		},
		enumerable:true
	});
	
	_defineProperty(me, "exec", {value: function(string) {
		// Creates the regular expression object to be used on the _string.
		var re = new _RegExp(_regex); // TODO: Go through the _chain stored linking everything.
		// Makes sure that string is a string and that _string refelects what is being executed.
		me.content(string);
		return re.exec(_string);
	}, enumerable:true});
	
	//========================================================================================================
	function STRING(string) {
		if(typeof (string = string.toString()) === "string")
			_chain.push(new _link({STRING: {data: string}}));
		return me;
	};
	//========================================================================================================
	_defineProperty(me, "string", {value: STRING});
};

function rexer(string) {
	return new REX(string);
};

function _carrier(link) {
	this.store = link
};

function _link(settings){
	// Turns settings into meaningful data?
	this.settings = settings;
};

// The current version of rex.js.
_defineProperty(rexer, "VERSION", {value:"1.0.0"});

// Adds it to the global space.
_defineProperty(_, "rexer", {value:rexer});
}).call(this, this, Object.defineProperty,
		function _eval(code) { return eval(code)},
		RegExp);