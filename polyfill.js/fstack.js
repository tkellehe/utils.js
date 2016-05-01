(function(global, pfill, detect){

var regex, offset;

// Support: chrome, fire_fox, edge

if(detect.chrome.check)
{
    regex = /(\w*)\s*\(([\w\W]*)\:(\d+)\:(\d+)[^\d]*$/;
    offset = 1;
}
else if(detect.fire_fox.check)
{
    regex = /(\w*)\@([\w\W]+)\:(\d+)\:(\d+)[^\d]*$/
    offset = 0;
}
else if(detect.edge.check)
{
    regex = /at\s*([\w\W]+)\s+\(([\w\W]*)\:(\d+)\:(\d+)[^\d]*$/;
    offset = 1;
}

function Entry(cap) {
    var entry = this;
    entry.string = cap.string;
    entry.method = cap[1] && cap[1].length ? cap[1] : "anonymous";
    entry.file   = cap[2] && cap[2].length ? cap[2] : "unknown";
    entry.ln     = cap[3] && cap[3].length ? cap[3] : -1;
    entry.col    = cap[4] && cap[4].length ? cap[4] : -1;
}

function fstack(){
    var err = new Error(), entry = {};
    // Creates the stack.
    try{throw err} catch (e){}

    console.log(err.stack);
    
    var string_stack = err.stack.split("\n"),
        ret = {};

    for(var i = string_stack.length; --i >= offset;)
    {
        console.log(string_stack[i]);

        var cap = regex.exec(string_stack[i]);
        if(cap)
        {
            cap.string = string_stack[i];
            ret[i - offset] = (new Entry(cap));
        }
    }

    return ret;
}

fstack.Entry = Entry;

pfill.defprop(pfill, "fstack", fstack);

})(this, this.polyfill, this.polyfill.browser.detect)