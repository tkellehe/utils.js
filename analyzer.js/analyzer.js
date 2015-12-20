;(function(_, _defineProperty, _defaultDisplay, _Clock){

function Analyzer(name, f) {
    if(!(this instanceof Analyzer)) return new Analyzer(name, f);

    var me    = this,
        _data = [],
        _min  = -1,
        _max  = -1,
        _avg  = -1,
        _amt  =  0,
        _disp = _defaultDisplay,
        _name = name,
        _f    = f,
        _unit = 1;

    _defineProperty(me, "run", { value: function run(count) {
        if(!isNaN(count = +count)) _amt = count;
        // Makes sure that _amt is larger than 0.
        if(_amt <= 0) _amt = 1;
        var i = amount = _amt, data, sum;
        // Sets up the min, max, and sum.
        sum = _min = _max = data = _Clock(_f, _unit);
        _data = [];
        _data.push(data);
        // Loops _amt - 1 times to check the rest of the data.
        while(--i) {
            data = _Clock(_f, _unit);
            if(data)
            {
                sum += data;
                if(data > _max) _max = data
                else if(data < _min) _min = data
                _data.push(data)
            }
            else
            {
                // data was zero therefore the data was bad.
                --amount;
            }
        }
        
        return { name: _name,
                 total: _amt,
                 amount: amount,
                 "bad data": _amt - amount,
                 min: _min, max: _max, 
                 average: (_avg = (sum / amount))}
    }});

    _defineProperty(me, "display", { value: function display(count, disp) {
        if(disp) _disp = disp;
        var data = me.run(count);
        _disp(data);
        return data;
    }});
}

_defineProperty(Analyzer, "VERSION", { value: "1.0.0" });

_defineProperty(_, "Analyzer", { value: Analyzer });

})(this, Object.defineProperty,
   function(disp) { for(var i in disp) console.log(i, ":", disp[i]) },
   (StopWatch && StopWatch.Clock) || function(f, m) {
        var clock = (performance || Date), start, end;
        start = clock.now();
        f();
        end = clock.now();
        return (end - start) * (m || 1);
   });