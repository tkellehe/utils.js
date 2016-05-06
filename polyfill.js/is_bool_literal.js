(function(global, pfill){

pfill.defprop(pfill, "is_bool_literal", function is_bool_literal(obj) { return typeof obj === "boolean"; })

})(this, this.polyfill)