(function(global, pfill) {

function to_string(o) { return (o instanceof Object) ? o.toString() : o+"" }

var defprop = Object.defineProperty ?
function(object, prop, value) { return Object.defineProperty(object, prop, { value: value, enumerable: true }) }
:
function(object, prop, value) {
    if(!(object instanceof Object))
    {
        throw new TypeError("Object.defineProperty called on non-object");
    }
    
    object[to_string(prop)] = value;
    
    return object;
}

var defhidden = Object.defineProperty ?
function(object, prop, value) { return Object.defineProperty(object, prop, { value: value }) }
:
function(object, prop, value) {
    if(!(object instanceof Object))
    {
        throw new TypeError("Object.defineProperty called on non-object");
    }
    
    object[to_string(prop)] = value;
    
    return object;
}

if(pfill === undefined)
{
    defprop(global, "polyfill", {});
    pfill = global.polyfill;
}

defprop(pfill, "defprop", defprop);
defprop(pfill, "defhidden", defhidden);

})(this, this.polyfill)