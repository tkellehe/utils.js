(function(global, pfill){

if(pfill.is_function(Object.create))
    pfill.defprop(pfill, "create", function create(obj, props) { return Object.create(obj, props) })
else
    pfill.defprop(pfill, "create",  function create(o, props) {
            function F() {}
            F.prototype = o;

            if (pfill.is_object(props))
                for (prop in props)
                    if (props.hasOwnProperty(prop))
                        F[prop] = props[prop];
        return new F();
    })
})(this, polyfill)