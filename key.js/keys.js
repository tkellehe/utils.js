(function(global, g_defprop, g_doc){
//============================================================================================================
// Helpful functions.
//============================================================================================================
function is_function(obj) { return obj instanceof Function }

function __make_element_event_adder__(event, element) {
    return is_function(element.addEventListener) ? 
                function(f) { element.addEventListener(event, f) }
            :
                ((event = "on" + event) && function(f) { element[event] = f })
};
function __make_element_event_remover__(event, element) {
    return is_function(element.removeEventListener) ? 
                function(f) { element.removeEventListener(event, f) }
            :
                ((event = "on" + event) && function(f) { if(element[event] === f) delete element[event] })
};

function SimpleArray() {
    var self = this, _length = 0;
    g_defprop(self, "push", {value: function(element) {
        self.resize();
        self[""+_length++] = element;
        return self;
    }});
    g_defprop(self, "resize", {value: function() {
        var counter = 0;
        for(var i = 0; i < _length; ++i) {
            if(Object.hasOwnProperty.call(self, ""+i)) {
                self[""+counter++] = self[i];
            }
        }
        // Clean up the offset.
        for(i = counter; i < _length; ++i) delete self[i]
        _length = counter;
        return self;
    }});
    g_defprop(self, "clear", {value: function() {
        for(var i = _length; i--;) delete self[i]
        _length = 0;
        return self;
    }});
    g_defprop(self, "length", { get: function(){ return _length }});
}

//============================================================================================================
// Actual library.
//============================================================================================================
/**
 * keys([KEY | CODE] [, ELEMENT])
 * 
 * @param key     : Can be either a key or a code. 
 * @param element : The HTML element or any element with the ability to trigger onkeydown or onkeyup.
 * 
 * @return Returns a Key instance that will attach istelf to the element listening for onkey events.
 */
function keys(key, element) {
    var code = keys.tocode(key);
    if(code == undefined) {
        code = keys.shorttocode(key);
        if(code == undefined) {
            code = key;
        }
        key = keys.tokey(code);
    }

    return new Key(key, code, ((element instanceof Object) ? element : g_doc));
}
// Data mappings
keys.__key_code_to_key__ = {};
keys.__key_to_key_code__ = {};
keys.__key_code_to_short__ = {};
keys.__short_to_key_code__ = {};

// Used for detecting general keyboard events.
keys.__raw_data__ = {};

// Plugin calls.
keys.__plugins__ = {
    __process_plugins_on__: function(plugins, members) { 
        for(var plugin in plugins) plugins[plugin](members)
    },
    __key_event_plugins__: new SimpleArray(),
    __key_plugins__: new SimpleArray()
}

function KeyEvent(key_members, event) {
    var _members = {
        __self__: this,
        __event__: event,
        code: +(event.which || event.keyCode)
    };
    _members.key = keys.tokey(_members.code);
    _members.short = keys.toshort(_members.code);

    g_defprop(this, "__event__", { value: _members.__event__ });
    g_defprop(this, "code", { value: _members.code, enumerable: true });
    g_defprop(this, "key", { value: _members.key, enumerable: true });
    g_defprop(this, "short", { value: _members.short, enumerable: true });

    keys.__plugins__.__process_plugins_on__(keys.__plugins__.__key_event_plugins__, _members);
}

function Key(key, code, elem) {
    var _members = {
        __self__: this,
        key: key,
        code: code,
        short: keys.toshort(code),
        __element__: elem,
        isconnected: false,
        isdown: false,
        ispressed: false,
        kevent_down: undefined,
        kevent_pressed: undefined,
        kevent_up: undefined,
        events_down: new SimpleArray(),
        events_pressed: new SimpleArray(),
        events_up: new SimpleArray()
    };
    
    // Used for connecting and disconnecting to the element.
    var _keydown_element_adder   = __make_element_event_adder__  ("keydown", _members.__element__),
        _keydown_element_remover = __make_element_event_remover__("keydown", _members.__element__),
        _keyup_element_adder   = __make_element_event_adder__  ("keyup", _members.__element__),
        _keyup_element_remover = __make_element_event_remover__("keyup", _members.__element__);
    
    // The event actually connected to the keydown and invokes all of the registered events to the key.
    function _keydown_event(event) {
        var keyevent = new KeyEvent(_members, event);
        if(keyevent.code == code) {
            if(_members.isdown) {
                _members.ispressed = true;
                _members.kevent_pressed = keyevent;
                keyevent.type = "keypress";
                for(var i in _members.events_pressed) _members.events_pressed[i](_members.kevent_pressed);
            } else {
                _members.isdown = true;
                _members.kevent_down = keyevent;
                keyevent.type = "keydown";
                for(var i in _members.events_down) _members.events_down[i](_members.kevent_down);
            }
        }
    };
    // The event actually connected to the keyup and invokes all of the registered events to the key.
    function _keyup_event(event) {
        var keyevent = new KeyEvent(_members, event);
        if(keyevent.code == code) {
            _members.isdown = false;
            _members.ispressed = false;
            _members.kevent_up = keyevent;
            keyevent.type = "keyup";
            for(var i in _members.events_up) _members.events_up[i](_members.kevent_up);
        }
    };
        
    g_defprop(_members.__self__, "connect", { 
        value: function() {
            if(!_members.isconnected) {
                _keydown_element_adder(_keydown_event);
                _keyup_element_adder(_keyup_event);
                _members.isconnected = true;
            }
            return _members.__self__; 
        },
        enumerable: true
    });    
    g_defprop(_members.__self__, "disconnect", { 
        value: function() {
            if(_members.isconnected) {
                _keydown_element_remover(_keydown_event);
                _keyup_element_remover(_keyup_event);
                _members.isconnected = false;
            }
            return _members.__self__;
        },
        enumerable: true
    });

    g_defprop(_members.__self__, "__self__", { value: _members.__self__ });
    g_defprop(_members.__self__, "key", { value: _members.key, enumerable: true });
    g_defprop(_members.__self__, "code", { value: _members.code, enumerable: true });
    g_defprop(_members.__self__, "short", { value: _members.short, enumerable: true });
    
    g_defprop(_members.__self__, "isconnected", {
        get: function() { return _members.isconnected },
        enumerable: true
    });

    g_defprop(_members.__self__, "isdown", {
        get: function() { return _members.isdown },
        enumerable: true
    });
    g_defprop(_members.__self__, "ispressed", {
        get: function() { return _members.ispressed },
        enumerable: true
    });
    g_defprop(_members.__self__, "isup", {
        get: function() { return !_members.isdown },
        enumerable: true
    });
    
    function onkeydown(f) {
        if(is_function(f)) {
            onkeydown.remove();
            _members.events_down.push(f);
        }
        return _members.__self__;
    };
    g_defprop(onkeydown, "add", { value: function(f) {
        if(is_function(f)) {
            for(var i in _members.events_down) 
                if(f === _members.events_down[i])
                    return _members.__self__;
            _members.events_down.push(f);
        }
        return _members.__self__;
    }});
    g_defprop(onkeydown, "remove", { value: function(f) {
        if(f === undefined) {
            _members.events_down.clear()
        }
        else if(is_function(f)) {
            for(var i = _members.events_down.length; i--;) if(_members.events_down[i] === f) {
                delete _members.events_down[i];
                break;
            }
        }
        return _members.__self__;
    }});
    g_defprop(_members.__self__, "onkeydown", { value: onkeydown, enumerable: true });
    
    function onkeypress(f) {
        if(is_function(f)) {
            onkeypress.remove();
            _members.events_pressed.push(f);
        }
        return _members.__self__;
    };
    g_defprop(onkeypress, "add", { value: function(f) {
        if(is_function(f)) {
            for(var i in _members.events_pressed) 
                if(f === _members.events_pressed[i])
                    return _members.__self__;
            _members.events_pressed.push(f);
        }
        return _members.__self__;
    }});
    g_defprop(onkeypress, "remove", { value: function(f) {
        if(f === undefined) {
            _members.events_pressed.clear()
        }
        else if(is_function(f)) {
            for(var i = _members.events_pressed.length; i--;) if(_members.events_pressed[i] === f) {
                delete _members.events_pressed[i];
                break;
            }
        }
        return _members.__self__;
    }});
    g_defprop(_members.__self__, "onkeypress", { value: onkeypress, enumerable: true });
    
    function onkeyup(f) {
        if(is_function(f)) {
            onkeyup.remove();
            _members.events_up.push(f);
        }
        return _members.__self__;
    };
    
    g_defprop(onkeyup, "add", { value: function(f) {
        if(is_function(f)) {
            for(var i in _members.events_up) 
                if(f === _members.events_up[i])
                    return _members.__self__;
            _members.events_up.push(f);
        }
        return _members.__self__;
    }});
    g_defprop(onkeyup, "remove", { value: function(f) {
        if(f === undefined) {
            _members.events_up.clear()
        }
        else if(is_function(f)) {
            for(var i = _members.events_up.length; i--;) if(_members.events_up[i] === f) {
                delete _members.events_up[i];
                break;
            }
        }
        return _members.__self__;
    }});
    
    g_defprop(_members.__self__, "onkeyup", { value: onkeyup, enumerable: true });

    keys.__plugins__.__process_plugins_on__(keys.__plugins__.__key_plugins__, _members);
}

//============================================================================================================
// Key Mappings
//============================================================================================================
//------------------------------------------------------------------------------------------------------------
// Keys and Codes

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

keys.__key_code_to_key__[96] = "numpad_zero";
keys.__key_code_to_key__[97] = "numpad_one";
keys.__key_code_to_key__[98] = "numpad_two";
keys.__key_code_to_key__[99] = "numpad_three";
keys.__key_code_to_key__[100] = "numpad_four";
keys.__key_code_to_key__[101] = "numpad_five";
keys.__key_code_to_key__[102] = "numpad_six";
keys.__key_code_to_key__[103] = "numpad_seven";
keys.__key_code_to_key__[104] = "numpad_eight";
keys.__key_code_to_key__[105] = "numpad_nine";

// Other
keys.__key_code_to_key__[08] = "backspace";
keys.__key_code_to_key__[09] = "tab";
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
// Short Hand Mapping
keys.__key_code_to_short__[65] = "a";
keys.__key_code_to_short__[66] = "b";
keys.__key_code_to_short__[67] = "c";
keys.__key_code_to_short__[68] = "d";
keys.__key_code_to_short__[69] = "e";
keys.__key_code_to_short__[70] = "f";
keys.__key_code_to_short__[71] = "g";
keys.__key_code_to_short__[72] = "h";
keys.__key_code_to_short__[73] = "i";
keys.__key_code_to_short__[74] = "j";
keys.__key_code_to_short__[75] = "k";
keys.__key_code_to_short__[76] = "l";
keys.__key_code_to_short__[77] = "m";
keys.__key_code_to_short__[78] = "n";
keys.__key_code_to_short__[79] = "o";
keys.__key_code_to_short__[80] = "p";
keys.__key_code_to_short__[81] = "q";
keys.__key_code_to_short__[82] = "r";
keys.__key_code_to_short__[83] = "s";
keys.__key_code_to_short__[84] = "t";
keys.__key_code_to_short__[85] = "u";
keys.__key_code_to_short__[86] = "v";
keys.__key_code_to_short__[87] = "w";
keys.__key_code_to_short__[88] = "x";
keys.__key_code_to_short__[89] = "y";
keys.__key_code_to_short__[90] = "z";

// Numbers
for(var i = 10; i--;) {
    keys.__key_code_to_short__[48 + i] = i + "";
    keys.__key_code_to_short__[96 + i] = "n" + i;
}

// Other
keys.__key_code_to_short__[08] = "bsp";
keys.__key_code_to_short__[09] = "tab";
keys.__key_code_to_short__[13] = "ent";
keys.__key_code_to_short__[16] = "sft";
keys.__key_code_to_short__[17] = "ctrl";
keys.__key_code_to_short__[18] = "alt";
keys.__key_code_to_short__[19] = "pbk";
keys.__key_code_to_short__[20] = "clok";
keys.__key_code_to_short__[27] = "esc";
keys.__key_code_to_short__[33] = "pup";
keys.__key_code_to_short__[34] = "pwn";
keys.__key_code_to_short__[35] = "end"; 
keys.__key_code_to_short__[36] = "home";
keys.__key_code_to_short__[45] = "ins";
keys.__key_code_to_short__[46] = "del";
keys.__key_code_to_short__[91] = "lwk";
keys.__key_code_to_short__[92] = "rwk";
keys.__key_code_to_short__[93] = "slk";

// Directions
keys.__key_code_to_short__[37] = "<-";
keys.__key_code_to_short__[38] = "^";
keys.__key_code_to_short__[39] = "->";
keys.__key_code_to_short__[40] = "V";

keys.__key_code_to_short__[106] = "n*";
keys.__key_code_to_short__[107] = "n+";
keys.__key_code_to_short__[109] = "n-";
keys.__key_code_to_short__[110] = "n.";
keys.__key_code_to_short__[111] = "n/";
keys.__key_code_to_short__[112] = "f1";
keys.__key_code_to_short__[113] = "f2";
keys.__key_code_to_short__[114] = "f3";
keys.__key_code_to_short__[115] = "f4";
keys.__key_code_to_short__[116] = "f5";
keys.__key_code_to_short__[117] = "f6";
keys.__key_code_to_short__[118] = "f7";
keys.__key_code_to_short__[119] = "f8";
keys.__key_code_to_short__[120] = "f9";
keys.__key_code_to_short__[121] = "f10";
keys.__key_code_to_short__[122] = "f11";
keys.__key_code_to_short__[123] = "f12";
keys.__key_code_to_short__[144] = "nlok";
keys.__key_code_to_short__[145] = "slok";
keys.__key_code_to_short__[186] = ";";
keys.__key_code_to_short__[187] = "=";
keys.__key_code_to_short__[188] = ",";
keys.__key_code_to_short__[189] = "-";
keys.__key_code_to_short__[190] = ".";
keys.__key_code_to_short__[191] = "/";
keys.__key_code_to_short__[192] = "`"
keys.__key_code_to_short__[219] = "["
keys.__key_code_to_short__[220] = "\\"
keys.__key_code_to_short__[221] = "]"
keys.__key_code_to_short__[222] = "'"

// Flip the mapping...
for(var keyCode in keys.__key_code_to_short__)
    keys.__short_to_key_code__[keys.__key_code_to_short__[keyCode]] = +keyCode;

//============================================================================================================
// Utilities for gernal use.
//============================================================================================================
//------------------------------------------------------------------------------------------------------------
// Used for general data collection.

g_doc.addEventListener("keydown", function(event){
    var code = event.which || event.keyCode;
    keys.__raw_data__[code] = true;
});
g_doc.addEventListener("keyup", function(event){
    var code = event.which || event.keyCode;
    delete keys.__raw_data__[code];
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
    value: function(code){ return keys.__key_code_to_key__[+code]; },
    enumerable: true
});
g_defprop(keys, "toshort", { 
    value: function(code){ 
        return keys.__key_code_to_short__[+code] || 
            // Else assume it is a key.
            keys.__key_code_to_short__[keys.tocode(code)];
    },
    enumerable: true
});
g_defprop(keys, "shorttocode", { 
    value: function(short){ 
        return keys.__short_to_key_code__[short];
    },
    enumerable: true
});

g_defprop(keys, "plugin", { value: function(type, f) {
    if(is_function(f)) {
        if((type += "") === "KeyEvent") {
            keys.__plugins__.__key_event_plugins__.push(f);
        } 
        else if(type === "Key") {
            keys.__plugins__.__key_plugins__.push(f);
        }
    }
    return keys;
}, enumerable: true});

//------------------------------------------------------------------------------------------------------------

g_defprop(keys, "__version__" , { value: "1.0.0" })

g_defprop(global, "keys", { value: keys });

})(this, Object.defineProperty, document)