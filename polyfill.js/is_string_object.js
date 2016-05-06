(function(global, pfill){

pfill.defprop(pfill, "is_string_object", function is_string_object(obj) { return obj instanceof String; })

})(this, this.polyfill)