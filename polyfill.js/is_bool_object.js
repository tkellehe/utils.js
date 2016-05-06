(function(global, pfill){

pfill.defprop(pfill, "is_bool_object", function is_bool_object(obj) { return obj instanceof Boolean; })

})(this, this.polyfill)