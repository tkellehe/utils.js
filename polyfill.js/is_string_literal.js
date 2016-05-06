(function(global, pfill){

pfill.defprop(pfill, "is_string_literal", function is_string_literal(obj) { return typeof obj === "string"; })

})(this, this.polyfill)