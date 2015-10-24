;(function(_, _defineProperty, _freeze) {
/**
 * Used to handle an empty object that always returns NaN for valueOf
 * as well as make easy checking for whether or not something isFinite
 * a nullptr.
 */
function nullptr() {
	var me = this;
	// Makes sure that the valueOf always returns NaN.
	_defineProperty(me, 'valueOf', {value:function(){return NaN}});
	// The current version of nullptr.js.
	_defineProperty(me, 'VERSION', {value:'1.0.0'});
};

// Freezes an instance of nullptr.
_defineProperty(_, 'nullptr', {value:_freeze(new nullptr())});
}).call(this, this, Object.defineProperty, Object.freeze)