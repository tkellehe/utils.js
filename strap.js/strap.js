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

function src(string) {
	var me = this,
	    _s = string,
		_c = [];
		
	_defineProperty(me, "src", {
		get: function(){return _s},
		enumerable:true
	});
	_defineProperty(me, "children", {
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

_defineProperty(strap, "breakdown", {value:function breakdown(srcs) {
	// reg for break down...
	// \s*(\<[\w|\W]*\>)\s*\,?|\s*(?:([\w|\W]*?)\s*(?:\,|(?:\(([\w|\_|,|\s]*?)\)\s*\{\s*([\w|\W]*?)\s*\}\s*\,?)))|(?:\s*([^\s]+)\s*\,?)
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
	// Logging for debugging.
	console.log(options);
}

// Adds strap to the loaded context if told to.
if(options.use)
	_defineProperty(_, "strap", {value:strap});
}).call(this, this, Object.defineProperty, document,
		scripts !== undefined ? scripts[scripts.length - 1] : undefined,
		this.eval || (window && window.eval));