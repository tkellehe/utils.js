(function(global, pfill){

var ua = pfill.browser.user_agent,
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

    // Failed to find anything.
    return -1;
}

if(!("detect" in pfill.browser)) pfill.defprop(pfill.browser, "detect", {});
if(!("ie" in pfill.browser.detect)) pfill.defprop(pfill.browser.detect, "ie", {});

pfill.defprop(pfill.browser.detect.ie, "version", version());

})(this, polyfill)