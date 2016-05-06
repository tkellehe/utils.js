(function(global, pfill){

pfill.defprop(pfill, "to_string", function to_string(obj) { return (pfill.is_object(obj) ? obj.toString() : obj) + ""; })

})(this, this.polyfill)