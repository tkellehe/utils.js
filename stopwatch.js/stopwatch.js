;(function(_, _defineProperty, _clock, _keys, _TimeSpan) {

/**
 * new StopWatch() or StopWatch()
 * Creates a StopWatch instance that can be used to calculate performance.
 */
function StopWatch() {
    // If did not use new to create a StopWatch then return a new StopWatch.
    if(!(this instanceof StopWatch)) return new StopWatch();
    var me     = this,
    // Used to store the start times.
        _start = 0,
    // Used to store the end times.
        _end   = 0;

    // Logs the start times.
    _defineProperty(me, "start", { value: function start() {
        _start = _clock.now();
    }});
    
    // Logs the end times.
    _defineProperty(me, "stop", { value: function stop() {
        _end = _clock.now();
    }});

    // Returns the current end and start time.
    _defineProperty(me, "timeStamp", { 
        get: function() { return { start: _start, end: _end }; },
        enumerable: true
    });

    /**
     * Returns the times the start and end. If the start is larger than the end or
     * either start or end is zero, then the function will return zero.
     * 
     * @param unit : Acts as a multiplier for the time span. Naturally return in milliseconds.
     * 
     * @return Returns the time between the start and end then multiplies by the parameter.
     */
    _defineProperty(me, "span", { value: function span(unit) {
        var ts = (_start === 0 || _end === 0 || _start >= _end) ? 0 : (_end - _start);
        return ts * (unit || StopWatch.Milliseconds);
    }});
}

// Used as quick multipliers.
_defineProperty(StopWatch, "Nanoseconds",  { value: 1000 * 1000 });
_defineProperty(StopWatch, "Microseconds", { value: 1000 });
_defineProperty(StopWatch, "Milliseconds", { value: 1 });
_defineProperty(StopWatch, "Seconds",      { value: 1 / 1000 });
_defineProperty(StopWatch, "Minutes",      { value: 1 / (1000 * 60) });
_defineProperty(StopWatch, "Hours",        { value: 1 / (1000 * 60 * 60) });
_defineProperty(StopWatch, "Days",         { value: 1 / (1000 * 60 * 60 * 24) });
_defineProperty(StopWatch, "Weeks",        { value: 1 / (1000 * 60 * 60 * 24 * 7) });

_defineProperty(StopWatch, "Clock", { value: function(f, unit) {
    var stopwatch = new StopWatch();
    stopwatch.start();
    f();
    stopwatch.stop();
    return stopwatch.span(unit);
}});

_defineProperty(StopWatch, "__version__", { value: "1.0.0" });

_defineProperty(_, "StopWatch", { value: StopWatch });

})(this, Object.defineProperty, this.performance || this.Date, Object.keys)