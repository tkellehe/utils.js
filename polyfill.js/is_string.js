(function(global, pfill){

pfill.defprop(pfill, "is_string", function is_string(obj) { return pfill.is_string_object(obj) || pfill.is_string_literal(obj); })

})(this, this.polyfill)