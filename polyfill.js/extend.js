(function(global, pfill){

pfill.defprop(pfill, "extend", function extend(child, parent) {
    child.prototype = Object.create(parent.prototype);
    return child;
})

})(this, this.polyfill)