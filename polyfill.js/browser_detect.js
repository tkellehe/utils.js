(function(global, pfill){

if(!("browser" in pfill)) pfill.defprop(pfill, "browser", {})
if(!("detect" in pfill.browser)) pfill.defprop(pfill.browser, "detect", {});

pfill.defprop(polyfill.browser.detect, "opera", {});
pfill.defprop(polyfill.browser.detect, "fire_fox", {});
pfill.defprop(polyfill.browser.detect, "safari", {});
pfill.defprop(polyfill.browser.detect, "ie", {});
pfill.defprop(polyfill.browser.detect, "edge", {});
pfill.defprop(polyfill.browser.detect, "chrome", {});
pfill.defprop(polyfill.browser.detect, "blink", {});

// Pulled from http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

    // Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
    // At least Safari 3+: "[object HTMLElementConstructor]"
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;
    // Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

pfill.defprop(polyfill.browser.detect.opera, "check", isOpera);
pfill.defprop(polyfill.browser.detect.fire_fox, "check", isFirefox);
pfill.defprop(polyfill.browser.detect.safari, "check", isSafari);
pfill.defprop(polyfill.browser.detect.ie, "check", isIE);
pfill.defprop(polyfill.browser.detect.edge, "check", isEdge);
pfill.defprop(polyfill.browser.detect.chrome, "check", isChrome);
pfill.defprop(polyfill.browser.detect.blink, "check", isBlink);

})(this, polyfill)