(function(global, g_defProp, g_doc, g_createElem){

// Checking functions.
function is_function(obj)  { return obj instanceof Function };
function is_object(obj)    { return obj instanceof Object };

// Conversion funtions.
function to_string(obj) { return is_object(obj) ? obj.toString() : obj + "" };
function to_value(obj)  { return +obj }
function to_volume(v)   { return (!(v = to_value(v)) ? 0 : (v < 0 ? 0 : (v > 1.0 ? 1.0 : v))) }

var __regex_extract_type = /\.(\w*)$/,
    __valid_types = {
        "wav": "audio/wav",
        "m4a": "audio/m4a",
        "mp3": "audio/mpeg",
        "ogg": "audio/ogg"
    };
function get_MIMEtype(src) {
    var extract = __regex_extract_type.exec(src);
    if(!extract) throw new Error("Cannot find the file type? Did you forget add .wav, .mp3, etc...?");
    var result = __valid_types[extract[1]];
    if(!result) throw new Error("Type <" + extract[1] + "> did not match any valid types known to noise.js?");
    return result;
}

var __empty_function__ = function() {}; 

function Noise(src) {
    var me = this, _audio = g_createElem("audio"),
        _events = {
            onplay: __empty_function__,
            onended: __empty_function__,
            onpause: __empty_function__,
            onplaying: __empty_function__
        },
        _type = get_MIMEtype(src),
        _is_playing = false,
        _has_played = false
    ;

    // Source is set at the very beginning.
    _audio.setAttribute("src", src);

    _audio.onplay = function() { _is_playing = true; _events.onplay(me) };
    _audio.onplaying = function() { _is_playing = true; _events.onplaying(me); };
    _audio.onended = function() { _has_played = true; _is_playing = false; _events.onended(me); };
    // Pause gets called when ending as well.
    //_audio.onpause = function() { _events.onpause(me) };

    // Event Handlers
    g_defProp(me, "onplay", {
        get: function() { return function(v) {
            if(!is_function(v)) return _events.onplay;
            _events.onplay = v;
            return me;
        }},
        set: function(v) { me.onplay(v) },
        enumerable: true
    });

    g_defProp(me, "onplaying", {
        get: function() { return function(v) {
            if(!is_function(v)) return _events.onplaying;
            _events.onplaying = v;
            return me;
        }},
        set: function(v) { me.onplaying(v) },
        enumerable: true
    });

    g_defProp(me, "onended", {
        get: function() { return function(v) {
            if(!is_function(v)) return _events.onended;
            _events.onended = v;
            return me;
        }},
        set: function(v) { me.onended(v) },
        enumerable: true
    });

    g_defProp(me, "onpause", {
        get: function() { return function(v) {
            if(!is_function(v)) return _events.onpause;
            _events.onpause = v;
            return me;
        }},
        set: function(v) { me.onpause(v) },
        enumerable: true
    });

    // Properties
    g_defProp(me, "src", {
        get: function()  { return _audio.getAttribute("src") },
        enumerable: true
    });

    g_defProp(me, "type", {
        get: function()  { return _type },
        enumerable: true
    });

    g_defProp(me, "volume", {
        get: function()  { return _audio.volume },
        set: function(v)  { return _audio.volume = to_value(v) },
        enumerable: true
    });

    g_defProp(me, "playing", {
        get: function() { 
            return _is_playing 
        },
        enumerable: true
    });

    g_defProp(me, "played", {
        get: function() { 
            return _has_played 
        },
        enumerable: true
    });

    // Actions
    g_defProp(me, "play", { value: function() {
        _audio.play();
    }, enumerable: true});

    g_defProp(me, "pause", { value: function() {
        if(_is_playing) {
            _audio.pause();
            _events.onpause();
            _is_playing = false;
        }
        
    }, enumerable: true});
}

g_defProp(global, "Noise", { value: Noise });

})(this, Object.defineProperty, document, function(arg){ return document.createElement(arg); })