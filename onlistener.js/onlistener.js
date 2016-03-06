(function(global, g_defhidden, g_defprop, g_simplearray) {

function is_func(obj) { return obj instanceof Function }
function is_obj(obj) { return !is_func(obj) && obj instanceof Object }
function can_attach(obj) { return obj instanceof Object }
function to_string(obj) { return ((obj instanceof Object) ? obj.toString() : obj) + "" }

function _add_onevent(onevent, obj, eventer) {
    if(obj.hasOwnProperty(onevent))
    {
        if(!is_func(obj[onevent]))
        {
            try{ delete obj[onevent] }
            catch(e) { throw new Error("Cannot not attach event: " + onevent) }
        }
        else
        {
            return obj;
        }
    }

    g_defprop(obj, onevent, function() {
        var event_instance = new eventer();
        for(var i = 0, l = obj[onevent].__events__.length(); i < l; ++i)
        {
            obj[onevent].__events__[i](event_instance);
        }
    });
    g_defhidden(obj[onevent], "__events__", new g_simplearray());
}

function _add_addEventListener(onevent, obj) {
    if(obj.hasOwnProperty("addEventListener"))
    {
        if(!is_func(obj.addEventListener))
        {
            try{ delete obj.addEventListener }
            catch(e) { throw new Error("Cannot not attach event: " + onevent) }
        }
        else
        {
            return obj;
        }
    }
    g_defprop(obj, "addEventListener", function(f) {
        if(is_func(f))
        {
            for(var i = 0, l = obj[onevent].__events__.length(); i < l; ++i)
            {
                if(obj[onevent].__events__[i] === f)
                    return f;
            }
            obj[onevent].__events__.push(f);
        }
        return f;
    });
}
function _add_removeEventListener(onevent, obj) {
    if(obj.hasOwnProperty("removeEventListener"))
    {
        if(!is_func(obj.removeEventListener))
        {
            try{ delete obj.removeEventListener }
            catch(e) { throw new Error("Cannot not attach event: " + onevent) }
        }
        else
        {
            return obj;
        }
    }
    g_defprop(obj, "removeEventListener", function(f) {
        if(is_func(f))
        {
            for(var i = 0, l = obj[onevent].__events__.length(); i < l; ++i)
            {
                if(obj[onevent].__events__[i] === f) {
                    obj[onevent].__events__.remove(i);
                    return f;
                }
            }
        }
        return f;
    });
}

/**
 * var data = onlistener([String], [Object] [, EventMaker])
 * 
 * @param event   : The name of the event to attach. Note: Will be attached as on + event.
 * @param obj     : The Object to attach the listeners to.
 * @param eventer : The object created for a particular event. If not provided, one will be created
 *                  with basic plugin capabilites.
 *
 * @return Returns an object containing onevent function, object, add/remove event listener, and the eventer.
 */
function onlistener(event, obj, eventer) {
    if(can_attach(obj))
    {
        var onevent = "on" + (event = to_string(event));

        // Makes own eventer object.
        if(!is_func(eventer)) {
            eventer = eval("(function(){return function " 
                            + event + "Event(){var self = this;" 
                            + event + "Event.plugin.__plugin__(self);}})()");
            g_defprop(eventer, "plugin", function(f){
                if(is_func(f))
                {
                    eventer.plugin.__plugin__.plugins.push(f);
                }
                return eventer.plugin;
            });
            g_defhidden(eventer.plugin, "__plugin__", function(instance){
                for(var i = 0, l = eventer.plugin.__plugin__.plugins.length(); i < l; ++i)
                    eventer.plugin.__plugin__.plugins[i](instance);
            });
            g_defprop(eventer.plugin.__plugin__, "plugins", new g_simplearray());
        }

        _add_onevent(onevent, obj, eventer);
        _add_addEventListener(onevent, obj);
        _add_removeEventListener(onevent, obj);

        var result = {};
        result[onevent] = obj[onevent];
        result.addEventListener = obj.addEventListener;
        result.removeEventListener = obj.removeEventListener;
        result.eventer = eventer;
        result.eventHandler = obj;
        result.plugin = eventer.plugin;
    }

    return result;
}

g_defhidden(onlistener, "__version__", "1.0.0")

g_defprop(global, "onlistener", onlistener);

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
, SimpleArray
)