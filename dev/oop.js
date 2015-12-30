
function load_into(filename, scope, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', encodeURI(filename));
    xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 0)
            callback.call(scope, xhr.responseText)
        else
            console.error("Problem occurred with loading: " + filename + "\n" +
                          "Status: " + xhr.status)
    };
    xhr.send();
}

(function(global, defProp){

function __init__(self, Class, oop) { return oop.self(Class(self)) }

function OOP(self) {
    var me = this;
    defProp(me, "self", { value: self });

    defProp(self, "override", { value: function(method, body) {
        var overriden         = self[method];
        self[method]          = body;
        self[method].superior = overriden;
    }});
}

defProp(OOP.prototype, "__init__", { value: function(Class) {
    return __init__(this.self, Class, this)
}});

function def(self) { return new OOP(self || {}) }

defProp(global, "def", { value: def });

})(this, Object.defineProperty)


