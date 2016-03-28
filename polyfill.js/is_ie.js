(function(global, pfill){

var ua = pfill.user_agent,
    temp;
function version() {
    temp = ua.indexOf('MSIE ')
    if (temp > 0) {
    // IE 10 or older => return version number
        return +(ua.substring(temp + 5, ua.indexOf('.', temp)));
    }

    temp = ua.indexOf('Trident/');
    if (temp > 0) {
    // IE 11 => return version number
    temp = ua.indexOf('rv:');
        return +(ua.substring(temp + 3, ua.indexOf('.', temp)));
    }

    temp = ua.indexOf('Edge/');
    if (temp > 0) {
    // Edge (IE 12+) => return version number
        return +(ua.substring(temp + 5, ua.indexOf('.', temp)));
    }

    return -1;
}

var is_ie = {};

defprop(is_ie, "version", version());
defprop(is_ie, "check", version != -1);

defprop(pfill, "is_ie", is_ie);


})(this, polyfill)