(function(global, g_defprop, g_doc){

function has_addEventListener(obj) { return obj && !!obj.addEventListener }

/**
 * keys([KEY | CODE] [, ELEMENT])
 * 
 * @param key  : 
 * @param code : 
 * 
 * @return Returns a Key instance that 
 */
function keys(key, element) {
    var code = keys.tocode(key);
    if(code == undefined) {
        code = key;
        key = keys.tokey(code);
    }

    return new Key(key, code, (has_addEventListener(element) ? element : g_doc));
}
keys.__key_code_to_key__ = {};
keys.__key_to_key_code__ = {};
keys.__raw_data__        = {};
keys.__count_keydown__   = {};

// Need to add functinality to make plugins for everything.

function KeyEvent(key_members, event) {
    var _members = {
        __event__: event,
        code: +(event.which || event.keyCode)
    };
    _members.key = keys.tokey(_members.code);

    g_defprop(this, "__event__", { value: _members.__event__ });
    g_defprop(this, "code", { value: _members.code, enumerable: true });
    g_defprop(this, "key", { value: _members.key, enumerable: true });
}

function Key(key, code, elem) {
    // add stopwatch...
    var _members = {
        __self__: this,
        key: key,
        code: code,
        elem: elem,
        isdown: false,
        kevent_down: undefined,
        kevent_up: undefined,
        up_events: {},
        down_events: {},
        press_events: {}
    };

    _members.elem.addEventListener("keydown", function(event) {
        var keyevent = new KeyEvent(_members, event);
        if(keyevent.code == code) {
            _members.kevent_down = keyevent;
            _members.isdown = true;
        }
    });

    _members.elem.addEventListener("keyup", function(event) {
        var keyevent = new KeyEvent(_members, event);
        if(keyevent.code == code) {
            _members.isdown = false;
            _members.kevent_up = keyevent;
        }
    });

    g_defprop(_members.__self__, "__self__", { value: _members.__self__ });
    g_defprop(_members.__self__, "key", { value: _members.key, enumerable: true });
    g_defprop(_members.__self__, "code", { value: _members.code, enumerable: true });
    g_defprop(_members.__self__, "isdown", {
        get: function() { return _members.isdown },
        enumerable: true
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
// Used for general data collection.

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

//------------------------------------------------------------------------------------------------------------

g_defprop(keys, "__version__" , { value: "1.0.0" })

g_defprop(global, "keys", { value: keys });

})(this, Object.defineProperty, document)