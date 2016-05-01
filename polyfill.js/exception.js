(function(global, pfill){

function exception(message) {
    this.name = 'exception';
    this.message = message;
}
exception.prototype = new Error;

pfill.defprop(pfill, "exception", exception);

})(this, this.polyfill)
