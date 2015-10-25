;
// Must first get all script tags if possible.
if(document && document.getElementsByTagName)
	var scripts = document.getElementsByTagName("script");
(function(_, _defineProperty, _doc, _script, _eval) {
// Used to store the options for calculating what to do with strap.
var options = {
		use: false,
		srcs: ""
	},
// Gets the parent of the _script tag to append more scripts to if need be.
	_parent = _script.parentNode || _script.parentElement;
	
function SRC(string, context) {
	var me = this, _s = string, _b = _, _c = context, _g = [], _o = [], _j = false, _l = false;
	// The source of the SRC object.
	_defineProperty(me, "src", {
		get: function(){return _s},
		enumerable:true
	});
	// Calculates the correct context object if available, else returns undefined.
	_defineProperty(me, "context", {
		get: function(){
			// Checks to see if the context has loaded yet.
			if(_l) return _c;
			// If has not loaded, then attempt to check.
			var temp = _eval.call(_b, "(function(){"
			+ " return this" + _c + ";"
			+ "})()");
			// If temp is undefined then the context still has not loaded yet.
			if(temp === undefined) return;
			// Else, indicate the context has loaded and store the context.
			_l = true;
			_c = temp;
			// Then returns the current context.
			return _c;
		},
		enumerable:true
	});
	// A getter that will return the current group of SRCs that
	// this SRC must load within a set of contexts. Can add SRCs to
	// the group by providing it as an argument. No argument returns the group.
	_defineProperty(me, "group", {
		get: function(){return function(v) {
			if(v === undefined) return _g;
			_g.push(v);
			return me;
		}},
		enumerable:true
	});
	/**
	 * Loads its contents in the correct context and loads any SRCs in its group once it has loaded.
	 * 
	 * @return Returns itself.
	 */
	_defineProperty(me, "load", { value:function() {
		if(_j)
			_eval.call(me.context, _s);
		else
		{
			var isMSIE = /*@cc_on!@*/false,
				loader;
			// Currently does not support IE.
			if (isMSIE)
			{
				(loader = new Image()).src = _s;
				loader.onload = function(){
					console.warn("Current version does not support IE image tag loader.");
				};
			} 
			else 
			{
				// If just // load group then return self.
				if(_s === "//")
				{
					for(var i in _g)
						_g[i].load();
					return me;
				}
				// Creates the object to load the SRC.
				(loader = document.createElement('object')).data = _s;
				// Once the loader has loaded the src content,
				// the code will be ran in te correct context then the children.
				loader.onload = function(){
					// Runs the code in the correct context.
					_eval.call(me.context, this.contentDocument.getElementsByTagName("pre")[0].innerText);
					for(var i in _g)
						_g[i].load();
					// Removes the object used for loading.
					_body.removeChild(this);
				};
				// Hides the object.
				loader.width = loader.height = 0;
				// Begins the load.
				_parent.insertBefore(loader, _script);
			}
		}
		return me;
	}});
	// Determines whether or not the SRC is code or a link.
	// If nothing is provided, it will return the whether or not
	// the SRC is code else it will set that to the code.
	_defineProperty(me, "code", {
		get: function() { return function(v) {
			if(v === undefined) return _j;
			// Makes sure that it is a boolean.
			_j = !!v;
			return me;
		}},
		set: function(v) { _j = v }
	});
};
	
/**
 * Currently, only allows one level of context loading into scripts. Also, can 
 * run code in the context using <$< code >$> tags to indicate the load.
 * 
 * @param srcs : A string that contains sources for strap.js to load.
 */
function strap(srcs) {
	var collections = breakdown(srcs);
	for(var i = 0; i < collections.length; ++i)
		if(collections[i] instanceof SRC)
			collections[i].load();
};

// Current implementation for extracting the files to be loaded.
var _breakdownRegex = 
	/\s*(?:([\w\$\.\\\/]*)\s*\(([\w\$\,\s]*)\)\s*\{([\w\W]*)\}|(\<\$\<)([\w\W]*?)(\>\$\>)|([^\,\s]+))\s*\,?/g,
// Indicates how many groups there are that way when g loops through them it doesnt leave any empty slots.
	_groupCount = 7;
/**
 * Used to handle //g regex. Will loop through grabbing each match and storing that into an array.
 * If there is only one group then the array returned will have each match has an entry, else
 * an array of arrays will be returned where the result of the groups found will be stored in the
 * entries of the arrays.
 * 
 * @param regex      : A Regexp object with the g flag set.
 * @param string     : The string the regex should be applied to. 
 * @param groupCount : The number of groups the regex has.
 * 
 * @return Returns an array of the results found from the regex.
 */
function g(regex, string, groupCount) {
	// Makes sure that groupCount is a number.
	groupCount = isNaN(groupCount = +groupCount) ? 1 : groupCount;
	// Forces isManyMatches to be a boolean.
	var isManyMatches = groupCount > 1;
	// Executes the regex on the string to get first match.
	var getMatch = regex.exec(string),
		matches = [], i = 0;
	// While there is a match, keep grabbing.
	while(getMatch) {
		if(isManyMatches)
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

function breakdown(srcsString, contexts) {
	// Regexp does not work with spaces in file names.
	var groups = g(_breakdownRegex, srcsString, _groupCount),
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
};

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
}).call(this, this, Object.defineProperty, document,
		// Gets the most recently added script tag.
		scripts !== undefined ? scripts[scripts.length - 1] : undefined,
		// Allows eval to be ran in a context.
		function _eval(code) { return eval(code)},
		navigator.appName.indexOf('Microsoft') === 0);