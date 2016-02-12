(function(global, g_defprop, g_doc, g_stopwatch){

var keys = {
    __raw_data__: {},
    __count_keydown__: {},
    __key_code_to_key__: {},
    __key_to_key_code__: {}
};

function KeyEvent(key_members, event) {
    this.__event__ = event;
    this.code = +(event.which || event.keyCode);
    this.key  = keys.tokey(this.code);

    this.timeStamp = key_members._stopwatch.timeStamp.start;
}

function Key(key, code, elem) {
    // add stopwatch...
    var _members = {
            self: this,
            key: key,
            code: code,
            elem: elem,
            isdown: false,
            kevent_down: undefined,
            kevent_up: undefined
        };

    _members.elem.addEventListener("keydown", function(event) {
        var keyevent = new KeyEvent(event);
        if(keyevent.code == code) {
            _members._kevent_down = keyevent;
            _members._isdown = true;
        }
    });

    _elem.addEventListener("keyup", function(event) {
        var keyevent = new KeyEvent(_members, event);
        if(keyevent.code == code) {
            _members._isdown = false;
            _members._kevent_up = keyevent;
        }
    });
}

// Letters
keys.__key_code_to_key__[65] = "a";
keys.__key_code_to_key__[66] = "b";
keys.__key_code_to_key__[67] = "c";
keys.__key_code_to_key__[68] = "d";
keys.__key_code_to_key__[69] = "e";
keys.__key_code_to_key__[70] = "f";
keys.__key_code_to_key__[71] = "g";
keys.__key_code_to_key__[72] = "h";
keys.__key_code_to_key__[73] = "i";
keys.__key_code_to_key__[74] = "j";
keys.__key_code_to_key__[75] = "k";
keys.__key_code_to_key__[76] = "l";
keys.__key_code_to_key__[77] = "m";
keys.__key_code_to_key__[78] = "n";
keys.__key_code_to_key__[79] = "o";
keys.__key_code_to_key__[80] = "p";
keys.__key_code_to_key__[81] = "q";
keys.__key_code_to_key__[82] = "r";
keys.__key_code_to_key__[83] = "s";
keys.__key_code_to_key__[84] = "t";
keys.__key_code_to_key__[85] = "u";
keys.__key_code_to_key__[86] = "v";
keys.__key_code_to_key__[87] = "w";
keys.__key_code_to_key__[88] = "x";
keys.__key_code_to_key__[89] = "y";
keys.__key_code_to_key__[90] = "z";

// Numbers
/*for(var i = 10; i--;) {
    keys.__key_code_to_key__[48 + i] = i + "";
    keys.__key_code_to_key__[96 + i] = "numpad_" + i;
}*/

keys.__key_code_to_key__[48] = "zero";
keys.__key_code_to_key__[49] = "one";
keys.__key_code_to_key__[50] = "two";
keys.__key_code_to_key__[51] = "three";
keys.__key_code_to_key__[52] = "four";
keys.__key_code_to_key__[53] = "five";
keys.__key_code_to_key__[54] = "six";
keys.__key_code_to_key__[55] = "seven";
keys.__key_code_to_key__[56] = "eight";
keys.__key_code_to_key__[57] = "nine";

keys.__key_code_to_key__[48] = "numpad_zero";
keys.__key_code_to_key__[49] = "numpad_one";
keys.__key_code_to_key__[50] = "numpad_two";
keys.__key_code_to_key__[51] = "numpad_three";
keys.__key_code_to_key__[52] = "numpad_four";
keys.__key_code_to_key__[53] = "numpad_five";
keys.__key_code_to_key__[54] = "numpad_six";
keys.__key_code_to_key__[55] = "numpad_seven";
keys.__key_code_to_key__[56] = "numpad_eight";
keys.__key_code_to_key__[57] = "numpad_nine";

// Other
keys.__key_code_to_key__[8] = "backspace";
keys.__key_code_to_key__[9] = "tab";
keys.__key_code_to_key__[13] = "enter";
keys.__key_code_to_key__[16] = "shift";
keys.__key_code_to_key__[17] = "ctrl";
keys.__key_code_to_key__[18] = "alt";
keys.__key_code_to_key__[19] = "pause_break";
keys.__key_code_to_key__[20] = "caps_lock";
keys.__key_code_to_key__[27] = "escape";
keys.__key_code_to_key__[33] = "page_up";
keys.__key_code_to_key__[34] = "page_down";
keys.__key_code_to_key__[35] = "end"; 
keys.__key_code_to_key__[36] = "home";
keys.__key_code_to_key__[45] = "insert";
keys.__key_code_to_key__[46] = "delete";
keys.__key_code_to_key__[91] = "left_window_key";
keys.__key_code_to_key__[92] = "right_window_key";
keys.__key_code_to_key__[93] = "select_key";

// Directions
keys.__key_code_to_key__[37] = "left_arrow";
keys.__key_code_to_key__[38] = "up_arrow";
keys.__key_code_to_key__[39] = "right_arrow";
keys.__key_code_to_key__[40] = "down_arrow";

keys.__key_code_to_key__[106] = "multiply";
keys.__key_code_to_key__[107] = "add";
keys.__key_code_to_key__[109] = "subtract";
keys.__key_code_to_key__[110] = "decimal_point";
keys.__key_code_to_key__[111] = "divide";
keys.__key_code_to_key__[112] = "f1";
keys.__key_code_to_key__[113] = "f2";
keys.__key_code_to_key__[114] = "f3";
keys.__key_code_to_key__[115] = "f4";
keys.__key_code_to_key__[116] = "f5";
keys.__key_code_to_key__[117] = "f6";
keys.__key_code_to_key__[118] = "f7";
keys.__key_code_to_key__[119] = "f8";
keys.__key_code_to_key__[120] = "f9";
keys.__key_code_to_key__[121] = "f10";
keys.__key_code_to_key__[122] = "f11";
keys.__key_code_to_key__[123] = "f12";
keys.__key_code_to_key__[144] = "num_lock";
keys.__key_code_to_key__[145] = "scroll_lock";
keys.__key_code_to_key__[186] = "semi_colon";
keys.__key_code_to_key__[187] = "equal_sign";
keys.__key_code_to_key__[188] = "comma";
keys.__key_code_to_key__[189] = "dash";
keys.__key_code_to_key__[190] = "period";
keys.__key_code_to_key__[191] = "forward_slash";
keys.__key_code_to_key__[192] = "grave_accent"
keys.__key_code_to_key__[219] = "open_bracket"
keys.__key_code_to_key__[220] = "back_slash"
keys.__key_code_to_key__[221] = "close_braket"
keys.__key_code_to_key__[222] = "single_quote"

// Flip the mapping...
for(var keyCode in keys.__key_code_to_key__)
    keys.__key_to_key_code__[keys.__key_code_to_key__[keyCode]] = +keyCode;

//------------------------------------------------------------------------------------------------------------
if(g_stopwatch) {

    keys.__duration_data__ = {};
    keys.__stopwatch_data__ = {};

    g_doc.addEventListener("keydown", function(event){
        var code = event.which || event.keyCode;
        if(keys.__stopwatch_data__[code])
        {
            if(keys.__stopwatch_data__[code].isup)
            {
                keys.__stopwatch_data__[code].stopwatch.start();
                keys.__duration_data__[code] = 0;
                keys.__stopwatch_data__[code].isup = false;
            }
        }
        else
        {
            keys.__stopwatch_data__[code] = {};
            keys.__stopwatch_data__[code].stopwatch = new g_stopwatch();
            keys.__stopwatch_data__[code].stopwatch.start();
            keys.__duration_data__[code] = 0;
            keys.__stopwatch_data__[code].isup = false;
        }
    });
    g_doc.addEventListener("keyup", function(event){
        var code = event.which || event.keyCode;
        if(!keys.__stopwatch_data__[code])
        {
            keys.__stopwatch_data__[code] = {};
            keys.__stopwatch_data__[code].stopwatch = new g_stopwatch();
        }
        keys.__stopwatch_data__[code].stopwatch.stop();
        keys.__duration_data__[code] = keys.__stopwatch_data__[code].stopwatch.span();
        keys.__stopwatch_data__[code].isup = true;
    });

    g_defprop(keys, "keyduration", {
        value: function(key){
            var code = keys.tocode(key)
            if(!keys.__stopwatch_data__[code]) return 0;
            // Calling stop does not affect anything.
            keys.__stopwatch_data__[code].stopwatch.stop();
            var span = keys.__duration_data__[code];
            // If span is zero, we need to calcuate how long it has been pressed so far.
            if(span) return span;
            return keys.__stopwatch_data__[code].stopwatch.span();
        },
        enumerable: true
    });
}
//------------------------------------------------------------------------------------------------------------
g_doc.addEventListener("keydown", function(event){
    var code = event.which || event.keyCode;
    keys.__raw_data__[code] = true;
    if(!keys.__count_keydown__[code]) keys.__count_keydown__[code] = 0;
    ++keys.__count_keydown__[code];
});
g_doc.addEventListener("keyup", function(event){
    var code = event.which || event.keyCode;
    delete keys.__raw_data__[code];
    delete keys.__count_keydown__[code];
});

//------------------------------------------------------------------------------------------------------------
// Helper Functions

//------------------------------------------------------------------------------------------------------------
// Utility functions

g_defprop(keys, "isdown", {
    value: function(key){ return !!keys.__raw_data__[keys.__key_to_key_code__[key]]; },
    enumerable: true
});
g_defprop(keys, "isup", { 
    value: function(key){ return !keys.__raw_data__[keys.__key_to_key_code__[key]]; },
    enumerable: true
});
g_defprop(keys, "tocode", { 
    value: function(key){ return keys.__key_to_key_code__[key]; },
    enumerable: true
});
g_defprop(keys, "tokey", { 
    value: function(code){ return keys.__key_code_to_key__[code]; },
    enumerable: true
});

g_defprop(keys, "onkeydown", {
    value: function(f){ 
        return g_doc.addEventListener("keydown", 
            function(event){ return f(new KeyEvent(event)); }
        );
    },
    enumerable: true
});
g_defprop(keys, "onkeyup", {
    value: function(f){ 
        return g_doc.addEventListener("keyup", 
            function(event){ return f(new KeyEvent(event)); }
        );
    },
    enumerable: true
});

//------------------------------------------------------------------------------------------------------------

g_defprop(keys, "VERSION" , { value: "1.0.0" })

g_defprop(global, "keys", { value: keys });

})(this, Object.defineProperty, document, this.StopWatch)