(function(global, pfill){

pfill.defprop(pfill, "is_instance", function is_instance(obj) { return !pfill.is_function(obj) && pfill.is_object(obj); })

})(this, this.polyfill)