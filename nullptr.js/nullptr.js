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
    // Makes sure the toString returns "nullptr"
    _defineProperty(me, 'toString', {value:function(){return "nullptr"}});
    // The current version of nullptr.js.
    _defineProperty(me, '__version__', {value:'1.0.0'});
};

// Freezes an instance of nullptr.
_defineProperty(_, 'nullptr', {value:_freeze(new nullptr())});
}).call(this, 
    Object.defineProperty ||
    function(object, prop, value) { object[prop] = value.value }
,
    Object.freeze || function(obj) { return obj }
)