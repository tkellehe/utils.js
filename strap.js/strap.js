;
// Must first get all script tags if possible.
if(document && document.getElementsByTagName)
	var scripts = document.getElementsByTagName("script");
(function(_, _defineProperty, _doc, _body, _script, _eval) {
// Used to store the options for calculating what to do with strap.
var options = {
		use: false,
		srcs: ""
	},
// Gets the parent of the _script tag to append more scripts to if need be.
	_parent = _script.parentNode || _script.parentElement;
/**
 * 
 * 
 */
function strap(srcs) {
	var collections = strap.breakdown(srcs);
	for(var i = 0; i < collections.length; ++i)
		if(collections[i] instanceof SRC)
			collections[i].load();
};

function SRC(string, context) {
	var me = this,
	    _s = string,
		_b = _,
		_c = context,
		_g = [],
		_o = [],
		_j = false,
		_l = false;
	_defineProperty(me, "src", {
		get: function(){return _s},
		enumerable:true
	});
	_defineProperty(me, "context", {
		get: function(){
			if(_l) return _c;
			var temp = _eval.call(_b, "(function(){"
			+ " return this" + _c + ";"
			+ "})()");
			if(temp === undefined) return;
			_l = true;
			_c = temp;
			console.log("Test: ", typeof _c);
			return _c;
		},
		enumerable:true
	});
	_defineProperty(me, "group", {
		get: function(){return function(v) {
			if(v === undefined) return _g;
			_g.push(v);
		}},
		enumerable:true
	});
	_defineProperty(me, "objects", {
		get: function(){return function(v) {
			if(v === undefined) return _o;
			_o.push(v);
		}},
		enumerable:true
	});
	_defineProperty(me, "load", { value:function() {
		if(_j)
			_eval.call(me.context, _s);
		else
		{
			var isMSIE = /*@cc_on!@*/false,
				loader;
			if (isMSIE)
			{
				(loader = new Image()).src = _s;
				loader.onload = function(){
					console.warn("Current version does not support IE image tag loader.");
				};
			} 
			else 
			{
				if(_s === "//")
				{
					for(var i in _g)
						_g[i].load();
					return me;
				}
				(loader = document.createElement('object')).data = _s;
				loader.onload = function(){
					_eval.call(me.context, this.contentDocument.getElementsByTagName("pre")[0].innerText);
					for(var i in _g)
						_g[i].load();
				};
				loader.width = loader.height = 0;
				_body.appendChild(loader);
			}
		}
		return me;
	}});
	_defineProperty(me, "code", {
		get: function() { return function(v) {
			if(v === undefined) return _j;
			_j = v;
			return me;
		}},
		set: function(v) { _j = v }
	});
};

var _breakdownRegex = 
	/\s*(?:([\w\$\.\\\/]*)\s*\(([\w\$\,\s]*)\)\s*\{([\w\W]*)\}|(\<\$\<)([\w\W]*?)(\>\$\>)|([^\,\s]+))\s*\,?/g,
	_groupCount = 7;
function g(regex, string, groupCount, isThereMoreThanOneCapture) {
	// Forces isThereMoreThanOneCapture to be a boolean.
	isThereMoreThanOneCapture = !!isThereMoreThanOneCapture;
	// Executes the regex on the string to get first match.
	var getMatch = regex.exec(string),
		matches = [], i = 0;
	// While there is a match, keep grabbing.
	while(getMatch) {
		if(isThereMoreThanOneCapture)
		{
			// Stores the matches properly then adds them back.
			var captures = [], j = 0, offset = 1;
			// While there is a capture keep grabbing.
			while(++j <= groupCount)
				if(getMatch[j])
					captures[j - offset] = getMatch[j];
				else
					++offset;
			// Stores the captures.
			matches[i++] = captures;
		}
		else
			// Stores the capture.
			matches[i++] = getMatch[1];
		// Executes once again.
		getMatch = regex.exec(string);
	};
	// Returns the matches.
	return matches;
};

_defineProperty(strap, "breakdown", {value:function breakdown(srcsString, contexts) {
	// Regexp does not work with spaces in file names.
	var groups = g(_breakdownRegex, srcsString, _groupCount, true),
		all    = [];
		
	// Makes sure there is a context.
	contexts = (contexts && contexts.length > 0) ? contexts : [""];
	
	// Makes sure groups were actually found.
	if(groups)
		// Creates all of src objects.
		for(var i = 0; i < groups.length; ++i)
		{
			(function(group) {
				var srcs = [];
				if(group.length === 3 && group[0] + group[2] === "<$<>$>")
				{
					for(var i in contexts)
							srcs.push(new SRC(group[1], (contexts[i] === "" || contexts[i][0] === "." ? "" : ".") + contexts[i]).code(true));
				}
				else
				{
					// Go through each context and create an src for it.
					for(var i in contexts)
					{
						var src = new SRC(group[0], (contexts[i] === "" || contexts[i][0] === "." ? "" : ".") + contexts[i]);
						if(group.length === 3)
						{
							var temp     = group[1].split(/\s/).join("").split(","),
								objects  = [];
							// Get all of the objects used for loading the children.
							for(var j in temp)
								objects.push(contexts[i] + (temp[j] === "" || temp[j][0] === "." ? "" : ".") + temp[j]);
							var children = breakdown(group[2], objects);
							// Add all of the children for the src.
							for(var j in children)
								src.group(children[j]);
						}
						// Prevents any referencing error.
						(function(src){srcs.push(src)})(src);
					}
				}
				for(var i in srcs)
					all.push(srcs[i]);
			})(groups[i]);
		}
	return all;
}});

// Determine whether or not to run strap on the current tag.
if(_script)  
{
	// Grabs based off of .../strap<...>.js
	var strapJScheck = /\/{0,1}(strap)[\.]?[^\/]*(\.js)$/.exec(_script.src);
	// If a script tag using strap.js to load then check for options.
	if(strapJScheck != null && strapJScheck[1] + strapJScheck[2] === "strap.js")
	{
		// If data-use is provided then strap will not be loaded into the space.
		options.use = !(options.use = _script.getAttribute("data-use"))
					    && options.use !== "";
		options.srcs = _script.getAttribute("data-srcs") || options.srcs;
		// Run strap on the other srcs.
		strap(options.srcs);
	}
}

// Adds strap to the loaded context if told to.
if(options.use)
	_defineProperty(_, "strap", {value:strap});
}).call(this, this, Object.defineProperty, document, document && document.getElementsByTagName("body")[0],
		scripts !== undefined ? scripts[scripts.length - 1] : undefined,
		// Allows eval to be ran in a context.
		function _eval(code) { return eval(code)},
		navigator.appName.indexOf('Microsoft') === 0);