(function(global, pfill){

pfill.defprop(pfill, "is_bool", function is_bool(obj) { return pfill.is_bool_literal(obj) || pfill.is_bool_object(obj); })

})(this, this.polyfill)