(function(global, pfill){

var __div__ = pfill.create_element("div"),
    __reg__ = /([\w\W]+\>)(\<\/[\w\W]+)/,
    __txt__;

// Using global variables seem to be faster only if they are somple data types.

pfill.defprop(pfill, "html_to_string", function html_to_string(obj) { 
    var temp = obj.cloneNode(false);
    __div__.appendChild(temp);
    __txt__ = __div__.innerHTML;
    __div__.removeChild(temp);
    return __txt__;
})
pfill.defprop(pfill, "html_to_string_attach", function html_to_string_attach(obj) { 
    __div__.appendChild(obj);
    __txt__ = __div__.innerHTML;
    __div__.removeChild(obj);
    return __txt__;
})
pfill.defprop(pfill, "html_to_string_deep", function html_to_string_deep(obj) { 
    var temp = obj.cloneNode(false);
    __div__.appendChild(temp);
    var txt = __reg__.exec(__div__.innerHTML);
    __div__.removeChild(temp);
    return txt[1] + obj.innerHTML + txt[2];
})
pfill.defprop(pfill, "html_to_string_deep_attach", function html_to_string_deep_attach(obj) { 
    __div__.appendChild(obj);
    __txt__ = __div__.innerHTML;
    __div__.removeChild(obj);
    return __txt__;
})


})(this, this.polyfill)