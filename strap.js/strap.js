;
// Must first get all script tags if possible.
if(document && document.getElementsByTagName)
	var scripts = document.getElementsByTagName("script");
(function(_, _defineProperty, _doc, _script, _eval) {
// Allows eval to work within a scope.
_eval = function(code) {return _eval(code)};
	
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
	var collections = srcs.split(",");
	for(var i = 0; i < collections.length; ++i)
		if((collections[i] = collections[i].split(/\s/).join("")) !== "")
		{
			var script = _doc.createElement("script");
			script.src = collections[i];
			script.onload = function() {
				var temp = _doc.createElement("img");
				img.src = 
			};
			_parent.insertBefore(script, _script);
		}
};

function SRC(string, context) {
	var me = this,
	    _s = string,
		_c = context,
		_f = [],
		_o = [];
		
	_defineProperty(me, "src", {
		get: function(){return _s},
		enumerable:true
	});
	_defineProperty(me, "group", {
		get: function(){return _c},
		enumerable:true
	});
	_defineProperty(me, "add", { value: function(child) {
		
	}});
	_defineProperty(me, "load", { value:function() {
		// loads children who continue to load each other...
		// essentially running each other in the correct scope...
		return me;
	}});
};

var breakdownRegex = 
	/\s*(?:([\w\$\.\\]*)\s*(?:\,|\(([\w\$\,\s]*)\)\s*\{([\w\W]*)\}\s*\,?)|(\<\$\<)([\w\W]*?)(\>\$\>)\s*\,?|([^\s]+)\s*\,?)/;
function g(regex, string, isThereMoreThanOneCapture) {
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
			var captures = [], j = 1;
			// While there is a capture keep grabbing.
			while(getMatch[j]){
				captures[j-1] = getMatch[j++];
			};
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
	var groups = g(breakdownRegex, srcsString, true),
		all    = [];
	// Makes sure there is a context.
	context = contexts && contexts.length > 0 ? contexts || [_];
	// Makes sure groups were actually found.
	if(groups)
		// Creates all of src objects.
		for(var i = 0; i < groups.length; ++i)
		{
			(function(group) {
				var srcs = [];
				if(group.length === 3 && group[0] + group[2] === "<$<>$>")
					for(var i in contexts)
						if(contexts[i])
							srcs.push(new SRC(group[1], contexts[i]).code(true));
				else
				{
					// Go through each context and create an src for it.
					for(var i in contexts)
						if(contexts[i])
						{
							var src = new SRC(group[0], contexts[i]);
							if(group.length === 3)
							{
								var temp     = group[1].split(/\s/).join("").split(","),
									objects  = [];
								// Get all of the objects used for loading the children.
								for(var j in temp)
									if(contexts[i][temp[j]])
										objects.push(contexts[i][temp[j]]);
								var children = breakdown(group[2], objects);
								// Add all of the children for the src.
								for(var j in children)
									src.add(children[j]);
							}
							// Prevents any referencing error.
							(function(src){srcs.push(src)})(src);
						}
				}
			})(groups[i]);
		}
	return all;
}});
// breakdown ready for testing...

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
	// Logging for debugging.
	console.log(options);
}

// Adds strap to the loaded context if told to.
if(options.use)
	_defineProperty(_, "strap", {value:strap});
}).call(this, this, Object.defineProperty, document,
		scripts !== undefined ? scripts[scripts.length - 1] : undefined,
		this.eval || (window && window.eval));