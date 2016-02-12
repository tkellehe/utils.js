(function(global, g_defProp, g_elemById, g_createElem, g_onload, g_htmlToText){

//------------------------------------------------------------------------------------------------------------
// Helper functions
//------------------------------------------------------------------------------------------------------------
function _add_tool(name, descriptor) {
    return g_defProp(global, name, descriptor);
}

function _regex_pair(regex_result) {
    return { parsed: regex_result[0], 
             captured: regex_result.slice(1,regex_result.length) };
}

function _remove_parsed(paired, string) { return string.split(paired.parsed).join(""); }
function _remove_parsed_g(pairs, string) {
    for(var i in pairs)
        string = _remove_parsed(pairs[i], string);
    return string;
}

function _g_tag(regex, string) {
    var result = [],
        grab   = regex.exec(string);

    while(grab) {
        result.push(_regex_pair(grab));
        grab = regex.exec(string);
    }

    return result;
}

function _make_regex_basic_param(name) { 
    return new RegExp("\\@" + name + "\\s*([\\w\\W]*?)\\s*\\n","g"); 
}

function _make_regex_para_param(name) { 
    return new RegExp("\\@" + name + "\\s*([\\w\\W]*?)\\s*\\:\\s*([\\w\\W]*?)(?=\\s*\\*\\s*\\@|\\*\\/)","g");
}


//------------------------------------------------------------------------------------------------------------
// Regex Objects
//------------------------------------------------------------------------------------------------------------
var _regex_get_doc_block = /(\/\*\*[\w\W]*?\*\/)/g,

    _regex_get_author = _make_regex_basic_param("author"),

    _regex_get_briefcode = _make_regex_basic_param("briefcode"),

    _regex_get_param = _make_regex_para_param("param"),

    _regex_get_desc = _make_regex_para_param("desc")
    ;


//------------------------------------------------------------------------------------------------------------
// Regex Functions
//------------------------------------------------------------------------------------------------------------
function _get_all_doc_blocks(string) { return _g_tag(_regex_get_doc_block, string); }
function _get_all_authors(string) { return _g_tag(_regex_get_author, string); }
function _get_all_briefcodes(string) { return _g_tag(_regex_get_briefcode, string); }
function _get_all_params(string) { return _g_tag(_regex_get_param, string); }
function _get_all_descs(string) { return _g_tag(_regex_get_desc, string); }

//------------------------------------------------------------------------------------------------------------
// Actual processing
//------------------------------------------------------------------------------------------------------------
function add_authors(doc_block_string, doc_block, authors_container) {
    var all_authors = _get_all_authors(doc_block_string),
         authors    = g_createElem("div");

    authors.className = "authors";

    for(var i in all_authors) {
        var author = g_createElem("p"),
            name   = all_authors[i].captured[0];
        author.className = "author";
        author.innerHTML = "by <a class='author-name' href='#" + name + "'>" + name + "</a>";
        authors.appendChild(author);
        authors_container[name] = true;
    }

    doc_block.appendChild(authors);

    return _remove_parsed_g(all_authors, doc_block_string);
}

function create_author_links(authors_container) {
    var ul = g_createElem("ul");

    ul.className = "authors-links documentation";

    var li = g_createElem("li");
    li.className = "description";
    li.innerHTML = "All of the authors that contributed:";
    ul.appendChild(li);

    for(var name in authors_container) {
        li = g_createElem("li");
        li.className = "author-link";
        li.innerHTML = "about <a id='" + name + "'>" + name + "</a>";
        ul.appendChild(li);
    }

    return ul;
}

function parse_doc_block(doc_block_string, authors_container) {
    var doc_block = g_createElem("div");

    doc_block.className = "doc_block";

    doc_block_string = add_authors(doc_block_string, doc_block, authors_container);

    return doc_block;
}

function process(){

var input  = g_elemById("input"),
    output = g_elemById("output"),
    demo   = g_elemById("demo"),

    input_string = input.innerHTML,

    all_doc_blocks = _get_all_doc_blocks(input_string),

    authors_container = {};

output.innerHTML = "";

for(var i in all_doc_blocks) {
    var doc_block = parse_doc_block(all_doc_blocks[i].captured[0], authors_container);
    output.innerHTML += g_htmlToText(doc_block);
    demo.appendChild(doc_block);
}

// Finishing touches!
var authors_links = create_author_links(authors_container);
output.innerHTML += g_htmlToText(authors_links);
demo.appendChild(authors_links);

};

g_onload(function(){
process();
g_elemById("process").onclick = process;
});

})(this, Object.defineProperty, 
   function(arg){return document.getElementById(arg);},
   function(arg){return document.createElement(arg);},
   function(arg){window.onload = arg},
   function(arg){
    var temp = document.createElement("div");
    temp.appendChild(arg);
    return temp.innerHTML;
   })

