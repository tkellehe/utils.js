(function(global, pfill){

pfill.defprop(pfill, "is_nan", function is_nan(obj) { return obj !== obj })

})(this, polyfill)