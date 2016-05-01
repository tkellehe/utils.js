(function(global, pfill){

if(!("browser" in pfill)) pfill.defprop(pfill, "browser", {})

pfill.defprop(pfill.browser, "user_agent", window.navigator.userAgent);

})(this, this.polyfill)