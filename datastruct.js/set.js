(function(global, g_defProp) {

// This will only work with a set of strings..
function StringSet() {
    var self    = this,
        _length = 0,
        _map    = {};

    g_defProp(self, "push", {value:function(elem){
        if(!_map.hasOwnProperty(elem))
        {
            _map[elem] = _length++;
            g_defProp(self, _map[elem], {value: elem, enumerable: true});
        }
        return _map[elem];
    }});
}

})(this, Object.defineProperty)