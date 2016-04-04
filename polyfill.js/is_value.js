(function(global, pfill){

pfill.defprop(pfill, "is_value", function is_value(obj) { return is_num(obj) && !is_nan(obj) })

})(this, polyfill)