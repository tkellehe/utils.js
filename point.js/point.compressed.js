(function(t,n,e,r){function o(t,e){function o(){if(!p)return{canSet:!0,i:0,prop:s,scope:u};for(var t=s.split("."),n=u,e=!0,r=0;r<t.length-1&&e;++r)void 0!==n[t[r]]?n=n[t[r]]:e=!1;return{canSet:e,i:r,prop:t[r],scope:n}}var i=this,u=e,p=!0,s=t;n(i,"prop",{get:function(){return function(t){return void 0===t?s:("string"==typeof t&&(s=t),i)}},set:function(t){"string"==typeof t&&(s=t)}}),n(i,"scope",{get:function(){return function(t){return void 0===t?u:(("object"==typeof t||"function"==typeof t)&&(u=t),i)}},set:function(t){("object"==typeof t||"function"==typeof t)&&(u=t)}}),n(i,"propTree",{get:function(){function t(t){return void 0===t?p:(p=!!t,i)}return t},set:function(t){p=!!t}}),n(i,"ignoreTree",{value:function(){return i.propTree(!1)}}),n(i,"useTree",{value:function(){return i.propTree(!0)}}),n(i,"$",{get:function(){var t=o();return t.canSet?t.scope[t.prop]:r},set:function(t){var n=o();n.canSet&&(n.scope[n.prop]=t)}})}function i(t,n){if(this instanceof i)throw new o.InstantiateError("Cannot instantiate a Pointer.");if(null===t||t===r||void 0===t)return r;if("string"!=typeof t)throw new o.InstantiateError("The prop must be a string.");return n instanceof o?n.scope(this).prop(t):n=new o(t,this),n}r=r||e(new function(){n(this,"valueOf",{value:function(){return 0/0}})}),n(i,"isPointer",{value:function(t){return t instanceof o}}),n(i,"nullptr",{value:r}),n(i,"VERSION",{value:"1.0.0"}),n(t,"point",{value:i}),o.InstantiateError=function(){var t=Error.apply(this,arguments);t.name=this.name="InstantiateError",this.stack=t.stack,this.message=t.message},o.InstantiateError.prototype=function(){function t(){}return t.prototype=Error.prototype,new t}()}).call(this,this,Object.defineProperty,Object.freeze,this.nullptr);