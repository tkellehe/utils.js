(function(global, pfill){

pfill.defprop(pfill, "set_timeout", function set_timeout(f, params, delay, scope){
    /*
    // Removed because just assume the suer knows what they are doing.
    if(!(pfill.is_function(f))) return -1;
    ((pfill.is_object(scope)) || (scope = this));
    ((pfill.is_value(delay)) || (delay = 0));
    ((pfill.is_array(params)) || (params = []));
    */
    return setTimeout(+delay, function() {
        try { f.apply(scope, params) } catch(e) { if(!(e instanceof pfill.exception)) throw e; }
    });
})

})(this, this.polyfill)
