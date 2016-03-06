(function(global, g_defhidden, g_defprop) {

/**
 * var s = new SimpleSet();
 * 
 * Every item added will be given and index to the SimpleSet.
 * This allows users to loop through all of the entries.
 * 
 * Adding a string/number that has already been added will be ignored.
 * 
 * Also, currently only provides adding to the set.
 * 
 * When adding, the index where the element was added will be returned.
 */
function SimpleSet() {
    var _members = {
        self       : this,
        __length__ : 0,
        __map__    : {}
    };

    g_defhidden(self, "add", {value:function(elem){
        if(!_members.__map__.hasOwnProperty(elem))
        {
            _members.__map__[elem] = _members.__length__++;
            g_defprop(_members.self, _members.__map__[elem], elem);
        }
        return _members.__map__[elem];
    }});
}

g_defhidden(SimpleSet, "__version__", "1.0.0")

g_defprop(global, "SimpleSet", SimpleSet);

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

)