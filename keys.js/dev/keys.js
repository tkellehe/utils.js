(function(global, g_defhidden, g_defprop, g_doc, g_simplearray, g_onlistener) {
/**
 * keys([KEY | SHORT | CODE] [, ELEMENT])
 * 
 * @param key     : Can be either a key, code, or a shortcut key. 
 * @param element : The HTML element or any element with the ability to trigger onkeydown or onkeyup.
 * 
 * @return Returns a Key instance that will attach itself to the element listening for onkey events.
 */
function keys(key, element) {
    if(key === undefined) key = "any";

    var code = keys.tocode(key);
    if(code == undefined) {
        key = keys.tokey(key);
        code = keys.tocode(key);
    }

    // Makes sure that element has add/remove event listeners.
    element = g_onlistener(element);

    // Makes sure there is an onkeydown and onkeyup.
    if(element) 
    {
        element = element.eventHandler;
        element = g_onlistener(element, "keydown", GetAKeyboardEvent);
        if(element && element.onkeydown)
        {
            element = element.eventHandler;
            element = g_onlistener(element, "keyup", GetAKeyboardEvent);
            if(!(element && element.onkeyup))
                element = g_doc;
        }
        else
            element = g_doc;
    }
    else
        element = g_doc;

    return new Key(keys.tokey(code), code, element);
}
// Stores all of the classes used in keys.js.
g_defhidden(keys, "__classes__", {});
keys.__classes__.SimpleArray = g_simplearray;

function GetAKeyboardEvent() {
    for(var i in keys.__event_data__) break;
    return i ? keys.__event_data__[i] : {which: -1};
}

function is_function(obj) { return obj instanceof Function }

//============================================================================================================
// Actual library.
//============================================================================================================
// Mappings for keys, codes, and shortcuts.
g_defhidden(keys, "__key_code_to_key__", {});
g_defhidden(keys, "__key_to_key_code__", {});
g_defhidden(keys, "__key_code_to_short__", {});
g_defhidden(keys, "__short_to_key_code__", {});

// Used for detecting general keyboard events.
g_defhidden(keys, "__raw_data__", {});
g_defhidden(keys, "__event_data__", {});

// Handles plugin calls.
g_defhidden(keys, "__plugins__", {
    // Passing in using members allows for shared "private" members.
    __process_plugins_on__: function(plugins, members) { 
        plugins.forloop(function(i, plugin) { plugin(members); });
    },
    __key_event_plugins__: new g_simplearray(),
    __key_plugins__: new g_simplearray()
});

/**
 * A class used to wrap KeyBoardEvents in order to provide the same interface
 * for all browsers.
 * 
 * @param key_members : The members for the Key that created the event.
 * @param event       : The KeyBoardEvent to wrap.
 */
function KeyEvent(key_members, event) {
    var _members = {
        __self__: this,
        __event__: event,
        __key_members__: key_members,
        code: +(event.which || event.keyCode)
    };
    _members.key = keys.tokey(_members.code);
    _members.short = keys.toshort(_members.code);

    g_defhidden(this, "__event__", _members.__event__);
    g_defprop(this, "code", _members.code);
    g_defprop(this, "key", _members.key);
    g_defprop(this, "short", _members.short);

    keys.__plugins__.__process_plugins_on__(keys.__plugins__.__key_event_plugins__, _members);
};
keys.__classes__.KeyEvent = KeyEvent;

/**
 * The class that connects to elements and listens for keyup and keydown events.
 * 
 * @param key  : The key for the keyboard to listen to.
 * @param code : The code for the keyboard to listen to.
 * @param elem : The element for the Key instance to attach to.
 */
function Key(key, code, elem) {
    var _members = {
        __self__: this,
        key: key,
        code: code,
        short: keys.toshort(code),
        __element__: elem,
        isattached: false,
        isdown: false,
        ispressed: false,
        kevent_down: undefined,
        kevent_press: undefined,
        kevent_up: undefined,
        events_down: new g_simplearray(),
        events_pressed: new g_simplearray(),
        events_up: new g_simplearray()
    };

    // Added the add/remove event listeners.
    g_onlistener(_members.__self__);
    g_onlistener(_members.__self__, "keydown", KeyEvent);
    g_onlistener(_members.__self__, "keypress", KeyEvent);
    g_onlistener(_members.__self__, "keyup", KeyEvent);
    
    // The event actually connected to the keydown and invokes all of the registered events to the key.
    var _keydown_event = _members.code === -1 ?

    function(event) {
        var keyevent = new KeyEvent(_members, event);
        if(_members.isdown) {
            _members.ispressed = true;
            _members.kevent_press = keyevent;
            keyevent.type = "keypress";
            _members.__self__.onkeypress(_members.kevent_press);
        } else {
            _members.isdown = true;
            _members.kevent_down = keyevent;
            keyevent.type = "keydown";
            _members.__self__.onkeydown(_members.kevent_down);
        }
    }

    :

    function(event) {
        var keyevent = new KeyEvent(_members, event);
        if(keyevent.code == code) {
            if(_members.isdown) {
                _members.ispressed = true;
                _members.kevent_press = keyevent;
                keyevent.type = "keypress";
                _members.__self__.onkeypress(_members.kevent_press);
            } else {
                _members.isdown = true;
                _members.kevent_down = keyevent;
                keyevent.type = "keydown";
                _members.__self__.onkeydown(_members.kevent_down);
            }
        }
    };

    // The event actually connected to the keyup and invokes all of the registered events to the key.
    var _keyup_event = _members.code === -1 ?

    function(event) {
        var keyevent = new KeyEvent(_members, event);
        _members.isdown = false;
        _members.ispressed = false;
        _members.kevent_up = keyevent;
        keyevent.type = "keyup";
        _members.__self__.onkeyup(_members.kevent_up);
    }

    :

    function(event) {
        var keyevent = new KeyEvent(_members, event);
        if(keyevent.code == code) {
            _members.isdown = false;
            _members.ispressed = false;
            _members.kevent_up = keyevent;
            keyevent.type = "keyup";
            _members.__self__.onkeyup(_members.kevent_up);
        }
    };
        
    g_defprop(_members.__self__, "attach",
        function() {
            if(!_members.isattached) {
                _members.__element__.addEventListener("keydown", _keydown_event);
                _members.__element__.addEventListener("keyup", _keyup_event);
                _members.isattached = true;
            }
            return _members.__self__; 
        });    
    g_defprop(_members.__self__, "detach",
        function() {
            if(_members.isattached) {
                _members.__element__.removeEventListener("keydown", _keydown_event);
                _members.__element__.removeEventListener("keyup", _keyup_event);
                _members.isattached = false;
            }
            return _members.__self__;
        });

    g_defprop(_members.__self__, "key", _members.key);
    g_defprop(_members.__self__, "code", _members.code);
    g_defprop(_members.__self__, "short", _members.short);
    
    g_defprop(_members.__self__, "isattached", function() { return _members.isattached });
    g_defprop(_members.__self__, "isdown", function() { return _members.isdown });
    g_defprop(_members.__self__, "ispressed", function() { return _members.ispressed });
    g_defprop(_members.__self__, "isup", function() { return !_members.isdown });
    
    g_defprop(_members.__self__, "on", function on(event, f){
        _members.__self__.addEventListener(event, f);
        return _members.__self__;
    });

    keys.__plugins__.__process_plugins_on__(keys.__plugins__.__key_plugins__, _members);
};
keys.__classes__.Key = Key;

//============================================================================================================
// Start: Key Mappings
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

keys.__key_code_to_key__[096] = "numpad_zero";
keys.__key_code_to_key__[097] = "numpad_one";
keys.__key_code_to_key__[098] = "numpad_two";
keys.__key_code_to_key__[099] = "numpad_three";
keys.__key_code_to_key__[100] = "numpad_four";
keys.__key_code_to_key__[101] = "numpad_five";
keys.__key_code_to_key__[102] = "numpad_six";
keys.__key_code_to_key__[103] = "numpad_seven";
keys.__key_code_to_key__[104] = "numpad_eight";
keys.__key_code_to_key__[105] = "numpad_nine";

// Other
keys.__key_code_to_key__[-1] = "any";

keys.__key_code_to_key__[08] = "backspace";
keys.__key_code_to_key__[09] = "tab";
keys.__key_code_to_key__[13] = "enter";
keys.__key_code_to_key__[16] = "shift";
keys.__key_code_to_key__[17] = "ctrl";
keys.__key_code_to_key__[18] = "alt";
keys.__key_code_to_key__[19] = "pause_break";
keys.__key_code_to_key__[20] = "caps_lock";
keys.__key_code_to_key__[27] = "escape";
keys.__key_code_to_key__[32] = "space";
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
keys.__key_code_to_short__[-1] = "";

keys.__key_code_to_short__[08] = "bsp";
keys.__key_code_to_short__[09] = "tab";
keys.__key_code_to_short__[13] = "ent";
keys.__key_code_to_short__[16] = "sft";
keys.__key_code_to_short__[17] = "ctrl";
keys.__key_code_to_short__[18] = "alt";
keys.__key_code_to_short__[19] = "pbk";
keys.__key_code_to_short__[20] = "clok";
keys.__key_code_to_short__[27] = "esc";
keys.__key_code_to_short__[32] = " ";
keys.__key_code_to_short__[33] = "pup";
keys.__key_code_to_short__[34] = "pdn";
keys.__key_code_to_short__[35] = "end"; 
keys.__key_code_to_short__[36] = "home";
keys.__key_code_to_short__[45] = "ins";
keys.__key_code_to_short__[46] = "del";
keys.__key_code_to_short__[91] = "lwk";
keys.__key_code_to_short__[92] = "rwk";
keys.__key_code_to_short__[93] = "slk";

// Directions
keys.__key_code_to_short__[37] = "<";
keys.__key_code_to_short__[38] = "^";
keys.__key_code_to_short__[39] = ">";
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
// End: Key Mappings
//============================================================================================================

//============================================================================================================
// Start: Utilities for general use.
//============================================================================================================
//------------------------------------------------------------------------------------------------------------
// Used for general data collection.
if(g_doc && is_function(g_doc.addEventListener))
{
    g_doc.addEventListener("keydown", function(event){
        var code = event.which || event.keyCode;
        keys.__event_data__[code] = event;
        if(!keys.__raw_data__[code])
            keys.__raw_data__[code] = 1;
        else
            keys.__raw_data__[code] = 2;
    });
    g_doc.addEventListener("keyup", function(event){
        var code = event.which || event.keyCode;
        delete keys.__event_data__[code];
        delete keys.__raw_data__[code];
    });
}


//------------------------------------------------------------------------------------------------------------
// Utility functions

g_defprop(keys, "isdown", function(key){ return keys.__raw_data__[keys.__key_to_key_code__[key]] === 1; });
g_defprop(keys, "ispressed", function(key){ return keys.__raw_data__[keys.__key_to_key_code__[key]] === 2; });
g_defprop(keys, "isup", function(key){ return !keys.__raw_data__[keys.__key_to_key_code__[key]]; });
// These need to be fixed using the is...
g_defprop(keys, "tocode", function(key){
    if(keys.iskey(key))
        return +keys.__key_to_key_code__[key];
    else if(keys.isshort(key))
        return +keys.__short_to_key_code__[key];
});
g_defprop(keys, "tokey", function(code){ 
    if(keys.iscode(code))
        return keys.__key_code_to_key__[code];
    else if(keys.isshort(code))
        return keys.__key_code_to_key__[keys.tocode(code)];
});
g_defprop(keys, "toshort", function(code){ 
    if(keys.iscode(code))
        return keys.__key_code_to_short__[code];
    else if(keys.iskey(code))
        return keys.__key_code_to_short__[keys.tocode(code)];
});
g_defprop(keys, "cancode", function(key){ return keys.tocode(key) !== undefined; });
g_defprop(keys, "cankey", function(code){ return keys.tokey(code) !== undefined; });
g_defprop(keys, "canshort", function(code){ return keys.toshort(code) !== undefined; });
g_defprop(keys, "iscode", function(code){ return keys.__key_code_to_key__[code] !== undefined; });
g_defprop(keys, "iskey", function(key){ return keys.__key_to_key_code__[key] !== undefined; });
g_defprop(keys, "isshort", function(short){ return keys.__short_to_key_code__[short] !== undefined; });

/**
 * Used to add plug-ins to keys.js. These functions added in will receive
 * a private variable that contains all of the members and private variables
 * used for that instance.
 * 
 * @param type : The type of component to plug-in the function to. ("Key", "KeyEvent")
 * @param f    : The function to be called when the instance is created.
 */
g_defprop(keys, "plugin", function(type, f) {
    if(is_function(f)) {
        if((type += "") === "KeyEvent") {
            keys.__plugins__.__key_event_plugins__.push(f);
        }
        else if(type === "Key") {
            keys.__plugins__.__key_plugins__.push(f);
        }
    }
    return keys;
});

//------------------------------------------------------------------------------------------------------------
// Needed to help determine what version of keys.js is being used.
g_defhidden(keys, "__version__" , "1.0.0" )

// Attaches the keys function to the global space in order to be used.
g_defprop(global, "keys", keys);
//============================================================================================================
// Start Utilities for general use.
//============================================================================================================

})(this, 
    Object.defineProperty ?
    function(object, prop, value) { Object.defineProperty(object, prop, {value:value}) }
    :
    function(object, prop, value) { object[prop] = value }
,
   Object.defineProperty ?
    function(object, prop, value) { Object.defineProperty(object, prop, {value:value, enumerable:true}) }
    :
    function(object, prop, value) { object[prop] = value }

, document
, SimpleArray
, onlistener)