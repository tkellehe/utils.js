(function(global, pfill){

pfill.defprop(pfill, "is_function", function is_function(obj) { return obj instanceof Function })

})(this, this.polyfill)