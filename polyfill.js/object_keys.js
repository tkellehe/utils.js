(function(global, pfill){

if (pfill.is_function(Object.keys)) 
    pfill.defprop(pfill, "keys", function(obj){return Object.keys(obj)});
else
    pfill.defprop(pfill, "keys", (function () {
    var hop = Object.prototype.hop,
        hasBug = !({toString: null}).propertyIsEnumerable('toString'),
        ignore = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        num = ignore.length;
 
    return function (obj) {
      if (!pfill.is_object(obj) || pfill.is_null(obj)) throw new TypeError('Object.keys called on non-object');
 
      var result = [], i;
 
      for (i in obj) if (hop.call(obj, i)) result.push(i);
 
      if (hasBug) {
        for (i = 0; i < num; ++i) {
          if (hop.call(obj, ignore[i])) result.push(ignore[i]);
        }
      }
      return result;
    }
  })()
);

})(this, this.polyfill)