(function(global, pfill){

pfill.defprop(pfill, "time", {
    "Nanoseconds":  1000 * 1000,
    "Microseconds": 1000,
    "Milliseconds": 1,
    "Seconds":      1 / 1000,
    "Minutes":      1 / (1000 * 60),
    "Hours":        1 / (1000 * 60 * 60),
    "Days":         1 / (1000 * 60 * 60 * 24),
    "Weeks":        1 / (1000 * 60 * 60 * 24 * 7),
    now: (global.performance && global.performance.now ? function() { return global.performance.now() } :
           global.Date && global.Date.now ? function() { return global.Date.now() } :
           function() { return Date.now() })
});

})(this, this.polyfill)