(function(global, g_defhidden, g_defprop, g_simplearray) {

function is_func(obj) { return obj instanceof Function }
function is_obj(obj) { return !is_func(obj) && obj instanceof Object }
function can_attach(obj) { return obj instanceof Object }
function to_string(obj) { return ((obj instanceof Object) ? obj.toString() : obj) + "" }

function _add_onevent(onevent, eventHandler, eventType) {
    if(onevent in eventHandler)
    {
        if(!is_func(eventHandler[onevent]))
        {
            try{ delete eventHandler[onevent] }
            catch(e) { throw new Error("Cannot attach event: " + onevent) }
        }
        else
        {
            return;
        }
    }

    g_defprop(eventHandler, onevent, function(event_instance) {
        if(!(event_instance instanceof eventType)) event_instance = new eventType();
        for(var i = 0, l = eventHandler[onevent].__events__.length(); i < l; ++i)
        {
            eventHandler[onevent].__events__[i].apply(eventHandler, [event_instance]);
        }
    });
    g_defhidden(eventHandler[onevent], "__events__", new g_simplearray());
}

function _add_addEventListener(eventHandler) {
    if("addEventListener" in eventHandler)
    {
        if(!is_func(eventHandler.addEventListener))
        {
            try{ delete eventHandler.addEventListener }
            catch(e) { throw new Error("Cannot attach event addEventListener.") }
        }
        else
        {
            return;
        }
    }
    g_defprop(eventHandler, "addEventListener", function(event, f) {
        var onevent = "on" + to_string(event);
        if(is_func(f) && (onevent in eventHandler)
            && is_func(eventHandler[onevent]) && ("__events__" in eventHandler[onevent]))
        {
            for(var i = 0, l = eventHandler[onevent].__events__.length(); i < l; ++i)
            {
                if(eventHandler[onevent].__events__[i] === f)
                    return f;
            }
            eventHandler[onevent].__events__.push(f);            
        }
        return f;
    });
}
function _add_removeEventListener(eventHandler) {
    if("removeEventListener" in eventHandler)
    {
        if(!is_func(eventHandler.removeEventListener))
        {
            try{ delete eventHandler.removeEventListener }
            catch(e) { throw new Error("Cannot attach removeEventListener.") }
        }
        else
        {
            return;
        }
    }
    g_defprop(eventHandler, "removeEventListener", function(onevent, f) {
        var onevent = "on" + to_string(event);
        if(is_func(f) && (onevent in eventHandler)
            && is_func(eventHandler[onevent]) && ("__events__" in eventHandler[onevent]))
        {
            for(var i = 0, l = eventHandler[onevent].__events__.length(); i < l; ++i)
            {
                if(eventHandler[onevent].__events__[i] === f) {
                    eventHandler[onevent].__events__.remove(i);
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
 * @param eventHandler     : The Object to attach the listeners to.
 * @param event   : The name of the event to attach. Note: Will be attached as on + event.
 * @param eventType : The object created for a particular event. If not provided, one will be created
 *                  with basic plugin capabilites.
 *
 * @return Returns an object containing onevent function, object, add/remove event listener, and the eventType.
 */
function onlistener(eventHandler, event, eventType) {
    if(can_attach(eventHandler))
    {
        if(event !== undefined)
            var onevent = "on" + (event = to_string(event));

        // Makes own eventType object.
        if(onevent && !is_func(eventType)) {
            eventType = eval("(function(){return function " 
                            + event + "Event(){var m = {__self__: this};" 
                            + event + "Event.plugin.__plugin__(m);}})()");
            g_defprop(eventType, "plugin", function(f){
                if(is_func(f))
                {
                    eventType.plugin.__plugin__.plugins.push(f);
                }
                return eventType.plugin;
            });
            g_defhidden(eventType.plugin, "__plugin__", function(instance){
                for(var i = 0, l = eventType.plugin.__plugin__.plugins.length(); i < l; ++i)
                    eventType.plugin.__plugin__.plugins[i](instance);
            });
            g_defprop(eventType.plugin.__plugin__, "plugins", new g_simplearray());
        }

        if(onevent) _add_onevent(onevent, eventHandler, eventType);
        _add_addEventListener(eventHandler);
        _add_removeEventListener(eventHandler);

        var result = {};
        if(onevent)
        {
            result.onevent = onevent;
            result[onevent] = eventHandler[onevent];
            result.eventType = eventType;
            result.plugin = eventType.plugin;
        }
        
        result.addEventListener = eventHandler.addEventListener;
        result.removeEventListener = eventHandler.removeEventListener;
        result.eventHandler = eventHandler;
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