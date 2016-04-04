(function(global, pfill){

pfill.defprop(pfill, "set_timeout", function set_timeout(f, params, delay, scope){
    if(!(pfill.is_function(f))) return -1;
    if(!(pfill.is_object(scope))) scope = this;
    if(!(pfill.is_value(delay))) delay = 0;
    if(!(pfill.is_array(params))) params = [];
    return setTimeout(+delay, function() {
        try { f.apply(scope, params) } catch(e) { if(!(e instanceof pfill.exception)) throw e; }
    });
})

})(this, polyfill)