/* @license GPL-2.0-or-later https://git.drupalcode.org/project/once/-/raw/v1.0.1/LICENSE.md */
/*! @drupal/once - v1.0.1 - 2021-06-12 */
var once=function(){"use strict";var n=/[\11\12\14\15\40]+/,e="data-once",t=document;function r(n,t,r){return n[t+"Attribute"](e,r)}function o(e){if("string"!=typeof e)throw new TypeError("once ID must be a string");if(""===e||n.test(e))throw new RangeError("once ID must not be empty or contain spaces");return'[data-once~="'+e+'"]'}function u(n){if(!(n instanceof Element))throw new TypeError("The element must be an instance of Element");return!0}function i(n,e){void 0===e&&(e=t);var r=n;if(null===n)r=[];else{if(!n)throw new TypeError("Selector must not be empty");"string"!=typeof n||e!==t&&!u(e)?n instanceof Element&&(r=[n]):r=e.querySelectorAll(n)}return Array.prototype.slice.call(r)}function c(n,e,t){return e.filter((function(e){var r=u(e)&&e.matches(n);return r&&t&&t(e),r}))}function f(e,t){var o=t.add,u=t.remove,i=[];r(e,"has")&&r(e,"get").trim().split(n).forEach((function(n){i.indexOf(n)<0&&n!==u&&i.push(n)})),o&&i.push(o);var c=i.join(" ");r(e,""===c?"remove":"set",c)}function a(n,e,t){return c(":not("+o(n)+")",i(e,t),(function(e){return f(e,{add:n})}))}return a.remove=function(n,e,t){return c(o(n),i(e,t),(function(e){return f(e,{remove:n})}))},a.filter=function(n,e,t){return c(o(n),i(e,t))},a.find=function(n,e){return i(n?o(n):"[data-once]",e)},a}();

;
/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
window.Drupal={behaviors:{},locale:{}};(function(Drupal,drupalSettings,drupalTranslations,console,Proxy,Reflect){Drupal.throwError=function(error){setTimeout(()=>{throw error;},0);};Drupal.attachBehaviors=function(context,settings){context=context||document;settings=settings||drupalSettings;const behaviors=Drupal.behaviors;Object.keys(behaviors||{}).forEach((i)=>{if(typeof behaviors[i].attach==='function')try{behaviors[i].attach(context,settings);}catch(e){Drupal.throwError(e);}});};Drupal.detachBehaviors=function(context,settings,trigger){context=context||document;settings=settings||drupalSettings;trigger=trigger||'unload';const behaviors=Drupal.behaviors;Object.keys(behaviors||{}).forEach((i)=>{if(typeof behaviors[i].detach==='function')try{behaviors[i].detach(context,settings,trigger);}catch(e){Drupal.throwError(e);}});};Drupal.checkPlain=function(str){str=str.toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');return str;};Drupal.formatString=function(str,args){const processedArgs={};Object.keys(args||{}).forEach((key)=>{switch(key.charAt(0)){case '@':processedArgs[key]=Drupal.checkPlain(args[key]);break;case '!':processedArgs[key]=args[key];break;default:processedArgs[key]=Drupal.theme('placeholder',args[key]);break;}});return Drupal.stringReplace(str,processedArgs,null);};Drupal.stringReplace=function(str,args,keys){if(str.length===0)return str;if(!Array.isArray(keys)){keys=Object.keys(args||{});keys.sort((a,b)=>a.length-b.length);}if(keys.length===0)return str;const key=keys.pop();const fragments=str.split(key);if(keys.length){for(let i=0;i<fragments.length;i++)fragments[i]=Drupal.stringReplace(fragments[i],args,keys.slice(0));}return fragments.join(args[key]);};Drupal.t=function(str,args,options){options=options||{};options.context=options.context||'';if(drupalTranslations?.strings?.[options.context]?.[str])str=drupalTranslations.strings[options.context][str];if(args)str=Drupal.formatString(str,args);return str;};Drupal.url=function(path){return drupalSettings.path.baseUrl+drupalSettings.path.pathPrefix+path;};Drupal.url.toAbsolute=function(url){const urlParsingNode=document.createElement('a');try{url=decodeURIComponent(url);}catch(e){}urlParsingNode.setAttribute('href',url);return urlParsingNode.cloneNode(false).href;};Drupal.url.isLocal=function(url){let absoluteUrl=Drupal.url.toAbsolute(url);let {protocol}=window.location;if(protocol==='http:'&&absoluteUrl.startsWith('https:'))protocol='https:';let baseUrl=`${protocol}//${window.location.host}${drupalSettings.path.baseUrl.slice(0,-1)}`;try{absoluteUrl=decodeURIComponent(absoluteUrl);}catch(e){}try{baseUrl=decodeURIComponent(baseUrl);}catch(e){}return absoluteUrl===baseUrl||absoluteUrl.startsWith(`${baseUrl}/`);};Drupal.formatPlural=function(count,singular,plural,args,options){args=args||{};args['@count']=count;const pluralDelimiter=drupalSettings.pluralDelimiter;const translations=Drupal.t(singular+pluralDelimiter+plural,args,options).split(pluralDelimiter);let index=0;if(drupalTranslations?.pluralFormula)index=count in drupalTranslations.pluralFormula?drupalTranslations.pluralFormula[count]:drupalTranslations.pluralFormula.default;else{if(args['@count']!==1)index=1;}return translations[index];};Drupal.encodePath=function(item){return window.encodeURIComponent(item).replace(/%2F/g,'/');};Drupal.deprecationError=({message})=>{if(drupalSettings.suppressDeprecationErrors===false&&console?.warn)console.warn(`[Deprecation] ${message}`);};Drupal.deprecatedProperty=({target,deprecatedProperty,message})=>{if(!Proxy||!Reflect)return target;return new Proxy(target,{get:(target,key,...rest)=>{if(key===deprecatedProperty)Drupal.deprecationError({message});return Reflect.get(target,key,...rest);}});};Drupal.theme=function(func,...args){if(typeof Drupal.theme?.[func]==='function')return Drupal.theme[func](...args);Drupal.throwError(new TypeError(`Drupal.theme.${func} must be function type.`));};Drupal.theme.placeholder=function(str){return `<em class="placeholder">${Drupal.checkPlain(str)}</em>`;};Drupal.elementIsVisible=function(elem){return !!(elem.offsetWidth||elem.offsetHeight||elem.getClientRects().length);};Drupal.elementIsHidden=function(elem){return !Drupal.elementIsVisible(elem);};})(Drupal,window.drupalSettings,window.drupalTranslations,window.console,window.Proxy,window.Reflect);;
if(window.jQuery)jQuery.noConflict();document.documentElement.className+=' js';(function(Drupal,drupalSettings){const domReady=(callback)=>{const listener=()=>{callback();document.removeEventListener('DOMContentLoaded',listener);};if(document.readyState!=='loading')setTimeout(callback,0);else document.addEventListener('DOMContentLoaded',listener);};domReady(()=>{Drupal.attachBehaviors(document,drupalSettings);});})(Drupal,window.drupalSettings);;
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}((function(e){"use strict";return e.ui=e.ui||{},e.ui.version="1.14.1"}));

/*!
 * jQuery UI :data 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.extend(e.expr.pseudos,{data:e.expr.createPseudo((function(n){return function(t){return!!e.data(t,n)}}))})}));

/*!
 * jQuery UI Disable Selection 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.fn.extend({disableSelection:(n="onselectstart"in document.createElement("div")?"selectstart":"mousedown",function(){return this.on(n+".ui-disableSelection",(function(e){e.preventDefault()}))}),enableSelection:function(){return this.off(".ui-disableSelection")}});var n}));

/*!
 * jQuery UI Legacy jQuery Core patches 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 *
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";e.escapeSelector||(e.escapeSelector=function(e){return CSS.escape(e+"")}),e.fn.even&&e.fn.odd||e.fn.extend({even:function(){return this.filter((function(e){return e%2==0}))},odd:function(){return this.filter((function(e){return e%2==1}))}})}));

/*!
 * jQuery UI Scroll Parent 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],t):t(jQuery)}((function(t){"use strict";return t.fn.scrollParent=function(e){var s=this.css("position"),n="absolute"===s,o=e?/(auto|scroll|hidden)/:/(auto|scroll)/,i=this.parents().filter((function(){var e=t(this);return(!n||"static"!==e.css("position"))&&o.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))})).eq(0);return"fixed"!==s&&i.length?i:t(this[0].ownerDocument||document)}}));

/*!
 * jQuery UI Unique ID 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],i):i(jQuery)}((function(i){"use strict";return i.fn.extend({uniqueId:(e=0,function(){return this.each((function(){this.id||(this.id="ui-id-"+ ++e)}))}),removeUniqueId:function(){return this.each((function(){/^ui-id-\d+$/.test(this.id)&&i(this).removeAttr("id")}))}});var e}));

/*!
 * jQuery UI Focusable 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.ui.focusable=function(t,i){var s,n,u,a,o,r=t.nodeName.toLowerCase();return"area"===r?(n=(s=t.parentNode).name,!(!t.href||!n||"map"!==s.nodeName.toLowerCase())&&((u=e("img[usemap='#"+n+"']")).length>0&&u.is(":visible"))):(/^(input|select|textarea|button|object)$/.test(r)?(a=!t.disabled)&&(o=e(t).closest("fieldset")[0])&&(a=!o.disabled):a="a"===r&&t.href||i,a&&e(t).is(":visible")&&"visible"===e(t).css("visibility"))},e.extend(e.expr.pseudos,{focusable:function(t){return e.ui.focusable(t,null!=e.attr(t,"tabindex"))}}),e.ui.focusable}));

/*!
 * jQuery UI Keycode 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}));

!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.ui.plugin={add:function(n,i,t){var u,o=e.ui[n].prototype;for(u in t)o.plugins[u]=o.plugins[u]||[],o.plugins[u].push([i,t[u]])},call:function(e,n,i,t){var u,o=e.plugins[n];if(o&&(t||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(u=0;u<o.length;u++)e.options[o[u][0]]&&o[u][1].apply(e.element,i)}}}));

/*!
 * jQuery UI Widget 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],t):t(jQuery)}((function(t){"use strict";var e,i=0,s=Array.prototype.hasOwnProperty,n=Array.prototype.slice;return t.cleanData=(e=t.cleanData,function(i){var s,n,o;for(o=0;null!=(n=i[o]);o++)(s=t._data(n,"events"))&&s.remove&&t(n).triggerHandler("remove");e(i)}),t.widget=function(e,i,s){var n,o,a,r={},l=e.split(".")[0];if("__proto__"===(e=e.split(".")[1])||"constructor"===e)return t.error("Invalid widget name: "+e);var u=l+"-"+e;return s||(s=i,i=t.Widget),Array.isArray(s)&&(s=t.extend.apply(null,[{}].concat(s))),t.expr.pseudos[u.toLowerCase()]=function(e){return!!t.data(e,u)},t[l]=t[l]||{},n=t[l][e],o=t[l][e]=function(t,e){if(!this||!this._createWidget)return new o(t,e);arguments.length&&this._createWidget(t,e)},t.extend(o,n,{version:s.version,_proto:t.extend({},s),_childConstructors:[]}),(a=new i).options=t.widget.extend({},a.options),t.each(s,(function(t,e){r[t]="function"==typeof e?function(){function s(){return i.prototype[t].apply(this,arguments)}function n(e){return i.prototype[t].apply(this,e)}return function(){var t,i=this._super,o=this._superApply;return this._super=s,this._superApply=n,t=e.apply(this,arguments),this._super=i,this._superApply=o,t}}():e})),o.prototype=t.widget.extend(a,{widgetEventPrefix:n&&a.widgetEventPrefix||e},r,{constructor:o,namespace:l,widgetName:e,widgetFullName:u}),n?(t.each(n._childConstructors,(function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,o,i._proto)})),delete n._childConstructors):i._childConstructors.push(o),t.widget.bridge(e,o),o},t.widget.extend=function(e){for(var i,o,a=n.call(arguments,1),r=0,l=a.length;r<l;r++)for(i in a[r])o=a[r][i],s.call(a[r],i)&&void 0!==o&&(t.isPlainObject(o)?e[i]=t.isPlainObject(e[i])?t.widget.extend({},e[i],o):t.widget.extend({},o):e[i]=o);return e},t.widget.bridge=function(e,i){var s=i.prototype.widgetFullName||e;t.fn[e]=function(o){var a="string"==typeof o,r=n.call(arguments,1),l=this;return a?this.length||"instance"!==o?this.each((function(){var i,n=t.data(this,s);return"instance"===o?(l=n,!1):n?"function"!=typeof n[o]||"_"===o.charAt(0)?t.error("no such method '"+o+"' for "+e+" widget instance"):(i=n[o].apply(n,r))!==n&&void 0!==i?(l=i&&i.jquery?l.pushStack(i.get()):i,!1):void 0:t.error("cannot call methods on "+e+" prior to initialization; attempted to call method '"+o+"'")})):l=void 0:(r.length&&(o=t.widget.extend.apply(null,[o].concat(r))),this.each((function(){var e=t.data(this,s);e?(e.option(o||{}),e._init&&e._init()):t.data(this,s,new i(o,this))}))),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(e,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),this.classesElementLookup={},s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){var e=this;this._destroy(),t.each(this.classesElementLookup,(function(t,i){e._removeClass(i,t)})),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var s,n,o,a=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(a={},s=e.split("."),e=s.shift(),s.length){for(n=a[e]=t.widget.extend({},this.options[e]),o=0;o<s.length-1;o++)n[s[o]]=n[s[o]]||{},n=n[s[o]];if(e=s.pop(),1===arguments.length)return void 0===n[e]?null:n[e];n[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];a[e]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(e){var i,s,n;for(i in e)n=this.classesElementLookup[i],e[i]!==this.options.classes[i]&&n&&n.length&&(s=t(n.get()),this._removeClass(n,i),s.addClass(this._classes({element:s,keys:i,classes:e,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(e){var i=[],s=this;function n(){var i=[];e.element.each((function(e,n){t.map(s.classesElementLookup,(function(t){return t})).some((function(t){return t.is(n)}))||i.push(n)})),s._on(t(i),{remove:"_untrackClassesElement"})}function o(o,a){var r,l;for(l=0;l<o.length;l++)r=s.classesElementLookup[o[l]]||t(),e.add?(n(),r=t(t.uniqueSort(r.get().concat(e.element.get())))):r=t(r.not(e.element).get()),s.classesElementLookup[o[l]]=r,i.push(o[l]),a&&e.classes[o[l]]&&i.push(e.classes[o[l]])}return(e=t.extend({element:this.element,classes:this.options.classes||{}},e)).keys&&o(e.keys.match(/\S+/g)||[],!0),e.extra&&o(e.extra.match(/\S+/g)||[]),i.join(" ")},_untrackClassesElement:function(e){var i=this;t.each(i.classesElementLookup,(function(s,n){-1!==t.inArray(e.target,n)&&(i.classesElementLookup[s]=t(n.not(e.target).get()))})),this._off(t(e.target))},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,s){s="boolean"==typeof s?s:i;var n="string"==typeof t||null===t,o={extra:n?e:i,keys:n?t:e,element:n?this.element:t,add:s};return o.element.toggleClass(this._classes(o),s),this},_on:function(e,i,s){var n,o=this;"boolean"!=typeof e&&(s=i,i=e,e=!1),s?(i=n=t(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),t.each(s,(function(s,a){function r(){if(e||!0!==o.options.disabled&&!t(this).hasClass("ui-state-disabled"))return("string"==typeof a?o[a]:a).apply(o,arguments)}"string"!=typeof a&&(r.guid=a.guid=a.guid||r.guid||t.guid++);var l=s.match(/^([\w:-]*)\s*(.*)$/),u=l[1]+o.eventNamespace,h=l[2];h?n.on(u,h,r):i.on(u,r)}))},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.off(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){var i=this;return setTimeout((function(){return("string"==typeof t?i[t]:t).apply(i,arguments)}),e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){this._addClass(t(e.currentTarget),null,"ui-state-hover")},mouseleave:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){this._addClass(t(e.currentTarget),null,"ui-state-focus")},focusout:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},(i=t.Event(i)).type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!("function"==typeof a&&!1===a.apply(this.element[0],[i].concat(s))||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},(function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){var a;"string"==typeof n&&(n={effect:n});var r=n?!0===n||"number"==typeof n?i:n.effect||i:e;"number"==typeof(n=n||{})?n={duration:n}:!0===n&&(n={}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue((function(i){t(this)[e](),o&&o.call(s[0]),i()}))}})),t.widget}));

/*!
 * jQuery UI Labels 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],t):t(jQuery)}((function(t){"use strict";return t.fn.labels=function(){var t,s,e,i,n;return this.length?this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(i=this.eq(0).parents("label"),(e=this.attr("id"))&&(n=(t=this.eq(0).parents().last()).add(t.length?t.siblings():this.siblings()),s="label[for='"+CSS.escape(e)+"']",i=i.add(n.find(s).addBack(s))),this.pushStack(i)):this.pushStack([])}}));

/*!
 * jQuery UI Autocomplete 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./menu","../keycode","../position","../version","../widget"],e):e(jQuery)}((function(e){"use strict";return e.widget("ui.autocomplete",{version:"1.14.1",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,liveRegionTimer:null,_create:function(){var t,i,s,n=this.element[0].nodeName.toLowerCase(),o="textarea"===n,u="input"===n;this.isMultiLine=o||!u&&"true"===this.element.prop("contentEditable"),this.valueMethod=this.element[o||u?"val":"text"],this.isNewMenu=!0,this._addClass("ui-autocomplete-input"),this.element.attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return t=!0,s=!0,void(i=!0);t=!1,s=!1,i=!1;var o=e.ui.keyCode;switch(n.keyCode){case o.PAGE_UP:t=!0,this._move("previousPage",n);break;case o.PAGE_DOWN:t=!0,this._move("nextPage",n);break;case o.UP:t=!0,this._keyEvent("previous",n);break;case o.DOWN:t=!0,this._keyEvent("next",n);break;case o.ENTER:this.menu.active&&(t=!0,n.preventDefault(),this.menu.select(n));break;case o.TAB:this.menu.active&&this.menu.select(n);break;case o.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(t)return t=!1,void(this.isMultiLine&&!this.menu.element.is(":visible")||s.preventDefault());if(!i){var n=e.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(e){if(s)return s=!1,void e.preventDefault();this._searchTimeout(e)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){clearTimeout(this.searching),this.close(e),this._change(e)}}),this._initSource(),this.menu=e("<ul>").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._addClass(this.menu.element,"ui-autocomplete","ui-front"),this._on(this.menu.element,{mousedown:function(e){e.preventDefault()},menufocus:function(t,i){var s,n;if(this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type)))return this.menu.blur(),void this.document.one("mousemove",(function(){e(t.target).trigger(t.originalEvent)}));n=i.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",t,{item:n})&&t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(n.value),(s=i.item.attr("aria-label")||n.value)&&String.prototype.trim.call(s).length&&(clearTimeout(this.liveRegionTimer),this.liveRegionTimer=this._delay((function(){this.liveRegion.html(e("<div>").text(s))}),100))},menuselect:function(e,t){var i=t.item.data("ui-autocomplete-item"),s=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.trigger("focus"),this.previous=s),!1!==this._trigger("select",e,{item:i})&&this._value(i.value),this.term=this._value(),this.close(e),this.selectedItem=i}}),this.liveRegion=e("<div>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_isEventTargetInWidget:function(t){var i=this.menu.element[0];return t.target===this.element[0]||t.target===i||e.contains(i,t.target)},_closeOnClickOutside:function(e){this._isEventTargetInWidget(e)||this.close()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front, dialog")),t.length||(t=this.document[0].body),t},_initSource:function(){var t,i,s=this;Array.isArray(this.options.source)?(t=this.options.source,this.source=function(i,s){s(e.ui.autocomplete.filter(t,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(t,n){s.xhr&&s.xhr.abort(),s.xhr=e.ajax({url:i,data:t,dataType:"json",success:function(e){n(e)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay((function(){var t=this.term===this._value(),i=this.menu.element.is(":visible"),s=e.altKey||e.ctrlKey||e.metaKey||e.shiftKey;t&&(!t||i||s)||(this.selectedItem=null,this.search(null,e))}),this.options.delay)},search:function(e,t){return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):!1!==this._trigger("search",t)?this._search(e):void 0},_search:function(e){this.pending++,this._addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var e=++this.requestIndex;return function(t){e===this.requestIndex&&this.__response(t),this.pending--,this.pending||this._removeClass("ui-autocomplete-loading")}.bind(this)},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this._off(this.document,"mousedown"),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,(function(t){return"string"==typeof t?{label:t,value:t}:e.extend({},t,{label:t.label||t.value,value:t.value||t.label})}))},_suggest:function(t){var i=this.menu.element.empty();this._renderMenu(i,t),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(),this._on(this.document,{mousedown:"_closeOnClickOutside"})},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,i){var s=this;e.each(i,(function(e,i){s._renderItemData(t,i)}))},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,i){return e("<li>").append(e("<div>").text(i.label)).appendTo(t)},_move:function(e,t){if(this.menu.element.is(":visible"))return this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this.isMultiLine||this._value(this.term),void this.menu.blur()):void this.menu[e](t);this.search(null,t)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){this.isMultiLine&&!this.menu.element.is(":visible")||(this._move(e,t),t.preventDefault())}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,i){var s=new RegExp(e.ui.autocomplete.escapeRegex(i),"i");return e.grep(t,(function(e){return s.test(e.label||e.value||e)}))}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(t){var i;this._superApply(arguments),this.options.disabled||this.cancelSearch||(i=t&&t.length?this.options.messages.results(t.length):this.options.messages.noResults,clearTimeout(this.liveRegionTimer),this.liveRegionTimer=this._delay((function(){this.liveRegion.html(e("<div>").text(i))}),100))}}),e.ui.autocomplete}));

/*!
 * jQuery UI Menu 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","../keycode","../position","../unique-id","../version","../widget"],e):e(jQuery)}((function(e){"use strict";return e.widget("ui.menu",{version:"1.14.1",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-caret-1-e"},items:"> *",menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.lastMousePosition={x:null,y:null},this.element.uniqueId().attr({role:this.options.role,tabIndex:0}),this._addClass("ui-menu","ui-widget ui-widget-content"),this._on({"mousedown .ui-menu-item":function(e){e.preventDefault(),this._activateItem(e)},"click .ui-menu-item":function(t){var i=e(t.target),s=e(this.document[0].activeElement);!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(t),t.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(t):!this.element.is(":focus")&&s.closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":"_activateItem","mousemove .ui-menu-item":"_activateItem",mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var i=this.active||this._menuItems().first();t||this.focus(e,i)},blur:function(t){this._delay((function(){!e.contains(this.element[0],this.document[0].activeElement)&&this.collapseAll(t)}))},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(e){this._closeOnDocumentClick(e)&&this.collapseAll(e,!0),this.mouseHandled=!1}})},_activateItem:function(t){if(!this.previousFilter&&(t.clientX!==this.lastMousePosition.x||t.clientY!==this.lastMousePosition.y)){this.lastMousePosition={x:t.clientX,y:t.clientY};var i=e(t.target).closest(".ui-menu-item"),s=e(t.currentTarget);i[0]===s[0]&&(s.is(".ui-state-active")||(this._removeClass(s.siblings().children(".ui-state-active"),null,"ui-state-active"),this.focus(t,s)))}},_destroy:function(){var t=this.element.find(".ui-menu-item").removeAttr("role aria-disabled").children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),t.children().each((function(){var t=e(this);t.data("ui-menu-submenu-caret")&&t.remove()}))},_keydown:function(t){var i,s,n,a,u=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:u=!1,s=this.previousFilter||"",a=!1,n=t.keyCode>=96&&t.keyCode<=105?(t.keyCode-96).toString():String.fromCharCode(t.keyCode),clearTimeout(this.filterTimer),n===s?a=!0:n=s+n,i=this._filterMenuItems(n),(i=a&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i).length||(n=String.fromCharCode(t.keyCode),i=this._filterMenuItems(n)),i.length?(this.focus(t,i),this.previousFilter=n,this.filterTimer=this._delay((function(){delete this.previousFilter}),1e3)):delete this.previousFilter}u&&t.preventDefault()},_activate:function(e){this.active&&!this.active.is(".ui-state-disabled")&&(this.active.children("[aria-haspopup='true']").length?this.expand(e):this.select(e))},refresh:function(){var t,i,s,n,a=this,u=this.options.icons.submenu,o=this.element.find(this.options.menus);this._toggleClass("ui-menu-icons",null,!!this.element.find(".ui-icon").length),i=o.filter(":not(.ui-menu)").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each((function(){var t=e(this),i=t.prev(),s=e("<span>").data("ui-menu-submenu-caret",!0);a._addClass(s,"ui-menu-icon","ui-icon "+u),i.attr("aria-haspopup","true").prepend(s),t.attr("aria-labelledby",i.attr("id"))})),this._addClass(i,"ui-menu","ui-widget ui-widget-content ui-front"),(t=o.add(this.element).find(this.options.items)).not(".ui-menu-item").each((function(){var t=e(this);a._isDivider(t)&&a._addClass(t,"ui-menu-divider","ui-widget-content")})),n=(s=t.not(".ui-menu-item, .ui-menu-divider")).children().not(".ui-menu").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),this._addClass(s,"ui-menu-item")._addClass(n,"ui-menu-item-wrapper"),t.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(e,t){if("icons"===e){var i=this.element.find(".ui-menu-icon");this._removeClass(i,null,this.options.icons.submenu)._addClass(i,null,t.submenu)}this._super(e,t)},_setOptionDisabled:function(e){this._super(e),this.element.attr("aria-disabled",String(e)),this._toggleClass(null,"ui-state-disabled",!!e)},focus:function(e,t){var i,s,n;this.blur(e,e&&"focus"===e.type),this._scrollIntoView(t),this.active=t.first(),s=this.active.children(".ui-menu-item-wrapper"),this._addClass(s,null,"ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),n=this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"),this._addClass(n,null,"ui-state-active"),e&&"keydown"===e.type?this._close():this.timer=this._delay((function(){this._close()}),this.delay),(i=t.children(".ui-menu")).length&&e&&/^mouse/.test(e.type)&&this._startOpening(i),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var i,s,n,a,u,o;this._hasScroll()&&(i=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,n=t.offset().top-this.activeMenu.offset().top-i-s,a=this.activeMenu.scrollTop(),u=this.activeMenu.height(),o=t.outerHeight(),n<0?this.activeMenu.scrollTop(a+n):n+o>u&&this.activeMenu.scrollTop(a+n-u+o))},blur:function(e,t){t||clearTimeout(this.timer),this.active&&(this._removeClass(this.active.children(".ui-menu-item-wrapper"),null,"ui-state-active"),this._trigger("blur",e,{item:this.active}),this.active=null)},_startOpening:function(e){clearTimeout(this.timer),"true"===e.attr("aria-hidden")&&(this.timer=this._delay((function(){this._close(),this._open(e)}),this.delay))},_open:function(t){var i=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(t,i){clearTimeout(this.timer),this.timer=this._delay((function(){var s=i?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(t),this._removeClass(s.find(".ui-state-active"),null,"ui-state-active"),this.activeMenu=s}),i?0:this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false")},_closeOnDocumentClick:function(t){return!e(t.target).closest(".ui-menu").length},_isDivider:function(e){return!/[^\-\u2014\u2013\s]/.test(e.text())},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this._menuItems(this.active.children(".ui-menu")).first();t&&t.length&&(this._open(t.parent()),this._delay((function(){this.focus(e,t)})))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_menuItems:function(e){return(e||this.element).find(this.options.items).filter(".ui-menu-item")},_move:function(e,t,i){var s;this.active&&(s="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").last():this.active[e+"All"](".ui-menu-item").first()),s&&s.length&&this.active||(s=this._menuItems(this.activeMenu)[t]()),this.focus(i,s)},nextPage:function(t){var i,s,n;this.active?this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.innerHeight(),0===e.fn.jquery.indexOf("3.2.")&&(n+=this.element[0].offsetHeight-this.element.outerHeight()),this.active.nextAll(".ui-menu-item").each((function(){return(i=e(this)).offset().top-s-n<0})),this.focus(t,i)):this.focus(t,this._menuItems(this.activeMenu)[this.active?"last":"first"]())):this.next(t)},previousPage:function(t){var i,s,n;this.active?this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.innerHeight(),0===e.fn.jquery.indexOf("3.2.")&&(n+=this.element[0].offsetHeight-this.element.outerHeight()),this.active.prevAll(".ui-menu-item").each((function(){return(i=e(this)).offset().top-s+n>0})),this.focus(t,i)):this.focus(t,this._menuItems(this.activeMenu).first())):this.next(t)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,i)},_filterMenuItems:function(t){var i=t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),s=new RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter((function(){return s.test(String.prototype.trim.call(e(this).children(".ui-menu-item-wrapper").text()))}))}})}));

/*!
 * jQuery UI Controlgroup 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","../widget"],t):t(jQuery)}((function(t){"use strict";var e=/ui-corner-([a-z]){2,6}/g;return t.widget("ui.controlgroup",{version:"1.14.1",defaultElement:"<div>",options:{direction:"horizontal",disabled:null,onlyVisible:!0,items:{button:"input[type=button], input[type=submit], input[type=reset], button, a",controlgroupLabel:".ui-controlgroup-label",checkboxradio:"input[type='checkbox'], input[type='radio']",selectmenu:"select",spinner:".ui-spinner-input"}},_create:function(){this._enhance()},_enhance:function(){this.element.attr("role","toolbar"),this.refresh()},_destroy:function(){this._callChildMethod("destroy"),this.childWidgets.removeData("ui-controlgroup-data"),this.element.removeAttr("role"),this.options.items.controlgroupLabel&&this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()},_initWidgets:function(){var e=this,i=[];t.each(this.options.items,(function(n,o){var s,l={};if(o)return"controlgroupLabel"===n?((s=e.element.find(o)).each((function(){var e=t(this);e.children(".ui-controlgroup-label-contents").length||e.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")})),e._addClass(s,null,"ui-widget ui-widget-content ui-state-default"),void(i=i.concat(s.get()))):void(t.fn[n]&&(l=e["_"+n+"Options"]?e["_"+n+"Options"]("middle"):{classes:{}},e.element.find(o).each((function(){var o=t(this),s=o[n]("instance"),r=t.widget.extend({},l);if("button"!==n||!o.parent(".ui-spinner").length){s||(s=o[n]()[n]("instance")),s&&(r.classes=e._resolveClassesValues(r.classes,s)),o[n](r);var u=o[n]("widget");t.data(u[0],"ui-controlgroup-data",s||o[n]("instance")),i.push(u[0])}}))))})),this.childWidgets=t(t.uniqueSort(i)),this._addClass(this.childWidgets,"ui-controlgroup-item")},_callChildMethod:function(e){this.childWidgets.each((function(){var i=t(this).data("ui-controlgroup-data");i&&i[e]&&i[e]()}))},_updateCornerClass:function(t,e){var i=this._buildSimpleOptions(e,"label").classes.label;this._removeClass(t,null,"ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all"),this._addClass(t,null,i)},_buildSimpleOptions:function(t,e){var i="vertical"===this.options.direction,n={classes:{}};return n.classes[e]={middle:"",first:"ui-corner-"+(i?"top":"left"),last:"ui-corner-"+(i?"bottom":"right"),only:"ui-corner-all"}[t],n},_spinnerOptions:function(t){var e=this._buildSimpleOptions(t,"ui-spinner");return e.classes["ui-spinner-up"]="",e.classes["ui-spinner-down"]="",e},_buttonOptions:function(t){return this._buildSimpleOptions(t,"ui-button")},_checkboxradioOptions:function(t){return this._buildSimpleOptions(t,"ui-checkboxradio-label")},_selectmenuOptions:function(t){var e="vertical"===this.options.direction;return{width:!!e&&"auto",classes:{middle:{"ui-selectmenu-button-open":"","ui-selectmenu-button-closed":""},first:{"ui-selectmenu-button-open":"ui-corner-"+(e?"top":"tl"),"ui-selectmenu-button-closed":"ui-corner-"+(e?"top":"left")},last:{"ui-selectmenu-button-open":e?"":"ui-corner-tr","ui-selectmenu-button-closed":"ui-corner-"+(e?"bottom":"right")},only:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"}}[t]}},_resolveClassesValues:function(i,n){var o={};return t.each(i,(function(t){var s=n.options.classes[t]||"";s=String.prototype.trim.call(s.replace(e,"")),o[t]=(s+" "+i[t]).replace(/\s+/g," ")})),o},_setOption:function(t,e){"direction"===t&&this._removeClass("ui-controlgroup-"+this.options.direction),this._super(t,e),"disabled"!==t?this.refresh():this._callChildMethod(e?"disable":"enable")},refresh:function(){var e,i=this;this._addClass("ui-controlgroup ui-controlgroup-"+this.options.direction),"horizontal"===this.options.direction&&this._addClass(null,"ui-helper-clearfix"),this._initWidgets(),e=this.childWidgets,this.options.onlyVisible&&(e=e.filter(":visible")),e.length&&(t.each(["first","last"],(function(t,n){var o=e[n]().data("ui-controlgroup-data");if(o&&i["_"+o.widgetName+"Options"]){var s=i["_"+o.widgetName+"Options"](1===e.length?"only":n);s.classes=i._resolveClassesValues(s.classes,o),o.element[o.widgetName](s)}else i._updateCornerClass(e[n](),n)})),this._callChildMethod("refresh"))}})}));

/*!
 * jQuery UI Form Reset Mixin 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./version"],e):e(jQuery)}((function(e){"use strict";return e.ui.formResetMixin={_formResetHandler:function(){var t=e(this);setTimeout((function(){var r=t.data("ui-form-reset-instances");e.each(r,(function(){this.refresh()}))}))},_bindFormResetHandler:function(){if(this.form=e(this.element.prop("form")),this.form.length){var t=this.form.data("ui-form-reset-instances")||[];t.length||this.form.on("reset.ui-form-reset",this._formResetHandler),t.push(this),this.form.data("ui-form-reset-instances",t)}},_unbindFormResetHandler:function(){if(this.form.length){var t=this.form.data("ui-form-reset-instances");t.splice(e.inArray(this,t),1),t.length?this.form.data("ui-form-reset-instances",t):this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")}}}}));

/*!
 * jQuery UI Mouse 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","../version","../widget"],e):e(jQuery)}((function(e){"use strict";var t=!1;return e(document).on("mouseup",(function(){t=!1})),e.widget("ui.mouse",{version:"1.14.1",options:{cancel:"input, textarea, button, select, option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.on("mousedown."+this.widgetName,(function(e){return t._mouseDown(e)})).on("click."+this.widgetName,(function(s){if(!0===e.data(s.target,t.widgetName+".preventClickEvent"))return e.removeData(s.target,t.widgetName+".preventClickEvent"),s.stopImmediatePropagation(),!1})),this.started=!1},_mouseDestroy:function(){this.element.off("."+this.widgetName),this._mouseMoveDelegate&&this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(s){if(!t){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(s),this._mouseDownEvent=s;var i=this,o=1===s.which,n="string"==typeof this.options.cancel&&e(s.target).closest(this.options.cancel).length;return!(o&&!n&&this._mouseCapture(s))||(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout((function(){i.mouseDelayMet=!0}),this.options.delay)),this._mouseDistanceMet(s)&&this._mouseDelayMet(s)&&(this._mouseStarted=!1!==this._mouseStart(s),!this._mouseStarted)?(s.preventDefault(),!0):(!0===e.data(s.target,this.widgetName+".preventClickEvent")&&e.removeData(s.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return i._mouseMove(e)},this._mouseUpDelegate=function(e){return i._mouseUp(e)},this.document.on("mousemove."+this.widgetName,this._mouseMoveDelegate).on("mouseup."+this.widgetName,this._mouseUpDelegate),s.preventDefault(),t=!0,!0))}},_mouseMove:function(e){if(this._mouseMoved&&!e.which)if(e.originalEvent.altKey||e.originalEvent.ctrlKey||e.originalEvent.metaKey||e.originalEvent.shiftKey)this.ignoreMissingWhich=!0;else if(!this.ignoreMissingWhich)return this._mouseUp(e);return(e.which||e.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=!1!==this._mouseStart(this._mouseDownEvent,e),this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(s){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,s.target===this._mouseDownEvent.target&&e.data(s.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(s)),this._mouseDelayTimer&&(clearTimeout(this._mouseDelayTimer),delete this._mouseDelayTimer),this.ignoreMissingWhich=!1,t=!1,s.preventDefault()},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})}));

/*!
 * jQuery UI Checkboxradio 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","../form-reset-mixin","../labels","../widget"],e):e(jQuery)}((function(e){"use strict";return e.widget("ui.checkboxradio",[e.ui.formResetMixin,{version:"1.14.1",options:{disabled:null,label:null,icon:!0,classes:{"ui-checkboxradio-label":"ui-corner-all","ui-checkboxradio-icon":"ui-corner-all"}},_getCreateOptions:function(){var i,t,s,n=this._super()||{};return this._readType(),t=this.element.labels(),this.label=e(t[t.length-1]),this.label.length||e.error("No label found for checkboxradio widget"),this.originalLabel="",(s=this.label.contents().not(this.element[0])).length&&(this.originalLabel+=s.clone().wrapAll("<div></div>").parent().html()),this.originalLabel&&(n.label=this.originalLabel),null!=(i=this.element[0].disabled)&&(n.disabled=i),n},_create:function(){var e=this.element[0].checked;this._bindFormResetHandler(),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled),this._setOption("disabled",this.options.disabled),this._addClass("ui-checkboxradio","ui-helper-hidden-accessible"),this._addClass(this.label,"ui-checkboxradio-label","ui-button ui-widget"),"radio"===this.type&&this._addClass(this.label,"ui-checkboxradio-radio-label"),this.options.label&&this.options.label!==this.originalLabel?this._updateLabel():this.originalLabel&&(this.options.label=this.originalLabel),this._enhance(),e&&this._addClass(this.label,"ui-checkboxradio-checked","ui-state-active"),this._on({change:"_toggleClasses",focus:function(){this._addClass(this.label,null,"ui-state-focus ui-visual-focus")},blur:function(){this._removeClass(this.label,null,"ui-state-focus ui-visual-focus")}})},_readType:function(){var i=this.element[0].nodeName.toLowerCase();this.type=this.element[0].type,"input"===i&&/radio|checkbox/.test(this.type)||e.error("Can't create checkboxradio on element.nodeName="+i+" and element.type="+this.type)},_enhance:function(){this._updateIcon(this.element[0].checked)},widget:function(){return this.label},_getRadioGroup:function(){var i=this.element[0].name,t="input[name='"+CSS.escape(i)+"']";return i?(this.form.length?e(this.form[0].elements).filter(t):e(t).filter((function(){return 0===e(e(this).prop("form")).length}))).not(this.element):e([])},_toggleClasses:function(){var i=this.element[0].checked;this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",i),this.options.icon&&"checkbox"===this.type&&this._toggleClass(this.icon,null,"ui-icon-check ui-state-checked",i)._toggleClass(this.icon,null,"ui-icon-blank",!i),"radio"===this.type&&this._getRadioGroup().each((function(){var i=e(this).checkboxradio("instance");i&&i._removeClass(i.label,"ui-checkboxradio-checked","ui-state-active")}))},_destroy:function(){this._unbindFormResetHandler(),this.icon&&(this.icon.remove(),this.iconSpace.remove())},_setOption:function(e,i){if("label"!==e||i){if(this._super(e,i),"disabled"===e)return this._toggleClass(this.label,null,"ui-state-disabled",i),void(this.element[0].disabled=i);this.refresh()}},_updateIcon:function(i){var t="ui-icon ui-icon-background ";this.options.icon?(this.icon||(this.icon=e("<span>"),this.iconSpace=e("<span> </span>"),this._addClass(this.iconSpace,"ui-checkboxradio-icon-space")),"checkbox"===this.type?(t+=i?"ui-icon-check ui-state-checked":"ui-icon-blank",this._removeClass(this.icon,null,i?"ui-icon-blank":"ui-icon-check")):t+="ui-icon-blank",this._addClass(this.icon,"ui-checkboxradio-icon",t),i||this._removeClass(this.icon,null,"ui-icon-check ui-state-checked"),this.icon.prependTo(this.label).after(this.iconSpace)):void 0!==this.icon&&(this.icon.remove(),this.iconSpace.remove(),delete this.icon)},_updateLabel:function(){var e=this.label.contents().not(this.element[0]);this.icon&&(e=e.not(this.icon[0])),this.iconSpace&&(e=e.not(this.iconSpace[0])),e.remove(),this.label.append(this.options.label)},refresh:function(){var e=this.element[0].checked,i=this.element[0].disabled;this._updateIcon(e),this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",e),null!==this.options.label&&this._updateLabel(),i!==this.options.disabled&&this._setOptions({disabled:i})}}]),e.ui.checkboxradio}));

/*!
 * jQuery UI Draggable 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","./mouse","../data","../plugin","../scroll-parent","../version","../widget"],t):t(jQuery)}((function(t){"use strict";return t.widget("ui.draggable",t.ui.mouse,{version:"1.14.1",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this._addClass("ui-draggable"),this._setHandleClassName(),this._mouseInit()},_setOption:function(t,e){this._super(t,e),"handle"===t&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){(this.helper||this.element).is(".ui-draggable-dragging")?this.destroyOnClear=!0:(this._removeHandleClassName(),this._mouseDestroy())},_mouseCapture:function(e){var s=this.options;return!(this.helper||s.disabled||t(e.target).closest(".ui-resizable-handle").length>0)&&(this.handle=this._getHandle(e),!!this.handle&&(this._blurActiveElement(e),this._blockFrames(!0===s.iframeFix?"iframe":s.iframeFix),!0))},_blockFrames:function(e){this.iframeBlocks=this.document.find(e).map((function(){var e=t(this);return t("<div>").css("position","absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]}))},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(e){var s=this.document[0].activeElement;t(e.target).closest(s).length||t(s).trigger("blur")},_mouseStart:function(e){var s=this.options;return this.helper=this._createHelper(e),this._addClass(this.helper,"ui-draggable-dragging"),this._cacheHelperProportions(),t.ui.ddmanager&&(t.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter((function(){return"fixed"===t(this).css("position")})).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(e),this.originalPosition=this.position=this._generatePosition(e,!1),this.originalPageX=e.pageX,this.originalPageY=e.pageY,s.cursorAt&&this._adjustOffsetFromHelper(s.cursorAt),this._setContainment(),!1===this._trigger("start",e)?(this._clear(),!1):(this._cacheHelperProportions(),t.ui.ddmanager&&!s.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this._mouseDrag(e,!0),t.ui.ddmanager&&t.ui.ddmanager.dragStart(this,e),!0)},_refreshOffsets:function(t){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:t.pageX-this.offset.left,top:t.pageY-this.offset.top}},_mouseDrag:function(e,s){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(e,!0),this.positionAbs=this._convertPositionTo("absolute"),!s){var i=this._uiHash();if(!1===this._trigger("drag",e,i))return this._mouseUp(new t.Event("mouseup",e)),!1;this.position=i.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),!1},_mouseStop:function(e){var s=this,i=!1;return t.ui.ddmanager&&!this.options.dropBehaviour&&(i=t.ui.ddmanager.drop(this,e)),this.dropped&&(i=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!i||"valid"===this.options.revert&&i||!0===this.options.revert||"function"==typeof this.options.revert&&this.options.revert.call(this.element,i)?t(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),(function(){!1!==s._trigger("stop",e)&&s._clear()})):!1!==this._trigger("stop",e)&&this._clear(),!1},_mouseUp:function(e){return this._unblockFrames(),t.ui.ddmanager&&t.ui.ddmanager.dragStop(this,e),this.handleElement.is(e.target)&&this.element.trigger("focus"),t.ui.mouse.prototype._mouseUp.call(this,e)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp(new t.Event("mouseup",{target:this.element[0]})):this._clear(),this},_getHandle:function(e){return!this.options.handle||!!t(e.target).closest(this.element.find(this.options.handle)).length},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this._addClass(this.handleElement,"ui-draggable-handle")},_removeHandleClassName:function(){this._removeClass(this.handleElement,"ui-draggable-handle")},_createHelper:function(e){var s=this.options,i="function"==typeof s.helper,o=i?t(s.helper.apply(this.element[0],[e])):"clone"===s.helper?this.element.clone().removeAttr("id"):this.element;return o.parents("body").length||o.appendTo("parent"===s.appendTo?this.element[0].parentNode:s.appendTo),i&&o[0]===this.element[0]&&this._setPositionRelative(),o[0]===this.element[0]||/(fixed|absolute)/.test(o.css("position"))||o.css("position","absolute"),o},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),Array.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_isRootNode:function(t){return/(html|body)/i.test(t.tagName)||t===this.document[0]},_getParentOffset:function(){var e=this.offsetParent.offset(),s=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==s&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var t=this.element.position(),e=this._isRootNode(this.scrollParent[0]);return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+(e?0:this.scrollParent.scrollTop()),left:t.left-(parseInt(this.helper.css("left"),10)||0)+(e?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,s,i,o=this.options,n=this.document[0];this.relativeContainer=null,o.containment?"window"!==o.containment?"document"!==o.containment?o.containment.constructor!==Array?("parent"===o.containment&&(o.containment=this.helper[0].parentNode),(i=(s=t(o.containment))[0])&&(e=/(scroll|auto)/.test(s.css("overflow")),this.containment=[(parseInt(s.css("borderLeftWidth"),10)||0)+(parseInt(s.css("paddingLeft"),10)||0),(parseInt(s.css("borderTopWidth"),10)||0)+(parseInt(s.css("paddingTop"),10)||0),(e?Math.max(i.scrollWidth,i.offsetWidth):i.offsetWidth)-(parseInt(s.css("borderRightWidth"),10)||0)-(parseInt(s.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(i.scrollHeight,i.offsetHeight):i.offsetHeight)-(parseInt(s.css("borderBottomWidth"),10)||0)-(parseInt(s.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=s)):this.containment=o.containment:this.containment=[0,0,t(n).width()-this.helperProportions.width-this.margins.left,(t(n).height()||n.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]:this.containment=[t(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,t(window).scrollLeft()+t(window).width()-this.helperProportions.width-this.margins.left,t(window).scrollTop()+(t(window).height()||n.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]:this.containment=null},_convertPositionTo:function(t,e){e||(e=this.position);var s="absolute"===t?1:-1,i=this._isRootNode(this.scrollParent[0]);return{top:e.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.offset.scroll.top:i?0:this.offset.scroll.top)*s,left:e.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.offset.scroll.left:i?0:this.offset.scroll.left)*s}},_generatePosition:function(t,e){var s,i,o,n,r=this.options,l=this._isRootNode(this.scrollParent[0]),a=t.pageX,h=t.pageY;return l&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),e&&(this.containment&&(this.relativeContainer?(i=this.relativeContainer.offset(),s=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top]):s=this.containment,t.pageX-this.offset.click.left<s[0]&&(a=s[0]+this.offset.click.left),t.pageY-this.offset.click.top<s[1]&&(h=s[1]+this.offset.click.top),t.pageX-this.offset.click.left>s[2]&&(a=s[2]+this.offset.click.left),t.pageY-this.offset.click.top>s[3]&&(h=s[3]+this.offset.click.top)),r.grid&&(o=r.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/r.grid[1])*r.grid[1]:this.originalPageY,h=s?o-this.offset.click.top>=s[1]||o-this.offset.click.top>s[3]?o:o-this.offset.click.top>=s[1]?o-r.grid[1]:o+r.grid[1]:o,n=r.grid[0]?this.originalPageX+Math.round((a-this.originalPageX)/r.grid[0])*r.grid[0]:this.originalPageX,a=s?n-this.offset.click.left>=s[0]||n-this.offset.click.left>s[2]?n:n-this.offset.click.left>=s[0]?n-r.grid[0]:n+r.grid[0]:n),"y"===r.axis&&(a=this.originalPageX),"x"===r.axis&&(h=this.originalPageY)),{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:l?0:this.offset.scroll.top),left:a-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:l?0:this.offset.scroll.left)}},_clear:function(){this._removeClass(this.helper,"ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_trigger:function(e,s,i){return i=i||this._uiHash(),t.ui.plugin.call(this,e,[s,i,this],!0),/^(drag|start|stop)/.test(e)&&(this.positionAbs=this._convertPositionTo("absolute"),i.offset=this.positionAbs),t.Widget.prototype._trigger.call(this,e,s,i)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),t.ui.plugin.add("draggable","connectToSortable",{start:function(e,s,i){var o=t.extend({},s,{item:i.element});i.sortables=[],t(i.options.connectToSortable).each((function(){var s=t(this).sortable("instance");s&&!s.options.disabled&&(i.sortables.push(s),s.refreshPositions(),s._trigger("activate",e,o))}))},stop:function(e,s,i){var o=t.extend({},s,{item:i.element});i.cancelHelperRemoval=!1,t.each(i.sortables,(function(){var t=this;t.isOver?(t.isOver=0,i.cancelHelperRemoval=!0,t.cancelHelperRemoval=!1,t._storedCSS={position:t.placeholder.css("position"),top:t.placeholder.css("top"),left:t.placeholder.css("left")},t._mouseStop(e),t.options.helper=t.options._helper):(t.cancelHelperRemoval=!0,t._trigger("deactivate",e,o))}))},drag:function(e,s,i){t.each(i.sortables,(function(){var o=!1,n=this;n.positionAbs=i.positionAbs,n.helperProportions=i.helperProportions,n.offset.click=i.offset.click,n._intersectsWith(n.containerCache)&&(o=!0,t.each(i.sortables,(function(){return this.positionAbs=i.positionAbs,this.helperProportions=i.helperProportions,this.offset.click=i.offset.click,this!==n&&this._intersectsWith(this.containerCache)&&t.contains(n.element[0],this.element[0])&&(o=!1),o}))),o?(n.isOver||(n.isOver=1,i._parent=s.helper.parent(),n.currentItem=s.helper.appendTo(n.element).data("ui-sortable-item",!0),n.options._helper=n.options.helper,n.options.helper=function(){return s.helper[0]},e.target=n.currentItem[0],n._mouseCapture(e,!0),n._mouseStart(e,!0,!0),n.offset.click.top=i.offset.click.top,n.offset.click.left=i.offset.click.left,n.offset.parent.left-=i.offset.parent.left-n.offset.parent.left,n.offset.parent.top-=i.offset.parent.top-n.offset.parent.top,i._trigger("toSortable",e),i.dropped=n.element,t.each(i.sortables,(function(){this.refreshPositions()})),i.currentItem=i.element,n.fromOutside=i),n.currentItem&&(n._mouseDrag(e),s.position=n.position)):n.isOver&&(n.isOver=0,n.cancelHelperRemoval=!0,n.options._revert=n.options.revert,n.options.revert=!1,n._trigger("out",e,n._uiHash(n)),n._mouseStop(e,!0),n.options.revert=n.options._revert,n.options.helper=n.options._helper,n.placeholder&&n.placeholder.remove(),s.helper.appendTo(i._parent),i._refreshOffsets(e),s.position=i._generatePosition(e,!0),i._trigger("fromSortable",e),i.dropped=!1,t.each(i.sortables,(function(){this.refreshPositions()})))}))}}),t.ui.plugin.add("draggable","cursor",{start:function(e,s,i){var o=t("body"),n=i.options;o.css("cursor")&&(n._cursor=o.css("cursor")),o.css("cursor",n.cursor)},stop:function(e,s,i){var o=i.options;o._cursor&&t("body").css("cursor",o._cursor)}}),t.ui.plugin.add("draggable","opacity",{start:function(e,s,i){var o=t(s.helper),n=i.options;o.css("opacity")&&(n._opacity=o.css("opacity")),o.css("opacity",n.opacity)},stop:function(e,s,i){var o=i.options;o._opacity&&t(s.helper).css("opacity",o._opacity)}}),t.ui.plugin.add("draggable","scroll",{start:function(t,e,s){s.scrollParentNotHidden||(s.scrollParentNotHidden=s.helper.scrollParent(!1)),s.scrollParentNotHidden[0]!==s.document[0]&&"HTML"!==s.scrollParentNotHidden[0].tagName&&(s.overflowOffset=s.scrollParentNotHidden.offset())},drag:function(e,s,i){var o=i.options,n=!1,r=i.scrollParentNotHidden[0],l=i.document[0];r!==l&&"HTML"!==r.tagName?(o.axis&&"x"===o.axis||(i.overflowOffset.top+r.offsetHeight-e.pageY<o.scrollSensitivity?r.scrollTop=n=r.scrollTop+o.scrollSpeed:e.pageY-i.overflowOffset.top<o.scrollSensitivity&&(r.scrollTop=n=r.scrollTop-o.scrollSpeed)),o.axis&&"y"===o.axis||(i.overflowOffset.left+r.offsetWidth-e.pageX<o.scrollSensitivity?r.scrollLeft=n=r.scrollLeft+o.scrollSpeed:e.pageX-i.overflowOffset.left<o.scrollSensitivity&&(r.scrollLeft=n=r.scrollLeft-o.scrollSpeed))):(o.axis&&"x"===o.axis||(e.pageY-t(l).scrollTop()<o.scrollSensitivity?n=t(l).scrollTop(t(l).scrollTop()-o.scrollSpeed):t(window).height()-(e.pageY-t(l).scrollTop())<o.scrollSensitivity&&(n=t(l).scrollTop(t(l).scrollTop()+o.scrollSpeed))),o.axis&&"y"===o.axis||(e.pageX-t(l).scrollLeft()<o.scrollSensitivity?n=t(l).scrollLeft(t(l).scrollLeft()-o.scrollSpeed):t(window).width()-(e.pageX-t(l).scrollLeft())<o.scrollSensitivity&&(n=t(l).scrollLeft(t(l).scrollLeft()+o.scrollSpeed)))),!1!==n&&t.ui.ddmanager&&!o.dropBehaviour&&t.ui.ddmanager.prepareOffsets(i,e)}}),t.ui.plugin.add("draggable","snap",{start:function(e,s,i){var o=i.options;i.snapElements=[],t(o.snap.constructor!==String?o.snap.items||":data(ui-draggable)":o.snap).each((function(){var e=t(this),s=e.offset();this!==i.element[0]&&i.snapElements.push({item:this,width:e.outerWidth(),height:e.outerHeight(),top:s.top,left:s.left})}))},drag:function(e,s,i){var o,n,r,l,a,h,p,c,f,d,g=i.options,u=g.snapTolerance,m=s.offset.left,v=m+i.helperProportions.width,_=s.offset.top,P=_+i.helperProportions.height;for(f=i.snapElements.length-1;f>=0;f--)h=(a=i.snapElements[f].left-i.margins.left)+i.snapElements[f].width,c=(p=i.snapElements[f].top-i.margins.top)+i.snapElements[f].height,v<a-u||m>h+u||P<p-u||_>c+u||!t.contains(i.snapElements[f].item.ownerDocument,i.snapElements[f].item)?(i.snapElements[f].snapping&&i.options.snap.release&&i.options.snap.release.call(i.element,e,t.extend(i._uiHash(),{snapItem:i.snapElements[f].item})),i.snapElements[f].snapping=!1):("inner"!==g.snapMode&&(o=Math.abs(p-P)<=u,n=Math.abs(c-_)<=u,r=Math.abs(a-v)<=u,l=Math.abs(h-m)<=u,o&&(s.position.top=i._convertPositionTo("relative",{top:p-i.helperProportions.height,left:0}).top),n&&(s.position.top=i._convertPositionTo("relative",{top:c,left:0}).top),r&&(s.position.left=i._convertPositionTo("relative",{top:0,left:a-i.helperProportions.width}).left),l&&(s.position.left=i._convertPositionTo("relative",{top:0,left:h}).left)),d=o||n||r||l,"outer"!==g.snapMode&&(o=Math.abs(p-_)<=u,n=Math.abs(c-P)<=u,r=Math.abs(a-m)<=u,l=Math.abs(h-v)<=u,o&&(s.position.top=i._convertPositionTo("relative",{top:p,left:0}).top),n&&(s.position.top=i._convertPositionTo("relative",{top:c-i.helperProportions.height,left:0}).top),r&&(s.position.left=i._convertPositionTo("relative",{top:0,left:a}).left),l&&(s.position.left=i._convertPositionTo("relative",{top:0,left:h-i.helperProportions.width}).left)),!i.snapElements[f].snapping&&(o||n||r||l||d)&&i.options.snap.snap&&i.options.snap.snap.call(i.element,e,t.extend(i._uiHash(),{snapItem:i.snapElements[f].item})),i.snapElements[f].snapping=o||n||r||l||d)}}),t.ui.plugin.add("draggable","stack",{start:function(e,s,i){var o,n=i.options,r=t.makeArray(t(n.stack)).sort((function(e,s){return(parseInt(t(e).css("zIndex"),10)||0)-(parseInt(t(s).css("zIndex"),10)||0)}));r.length&&(o=parseInt(t(r[0]).css("zIndex"),10)||0,t(r).each((function(e){t(this).css("zIndex",o+e)})),this.css("zIndex",o+r.length))}}),t.ui.plugin.add("draggable","zIndex",{start:function(e,s,i){var o=t(s.helper),n=i.options;o.css("zIndex")&&(n._zIndex=o.css("zIndex")),o.css("zIndex",n.zIndex)},stop:function(e,s,i){var o=i.options;o._zIndex&&t(s.helper).css("zIndex",o._zIndex)}}),t.ui.draggable}));

/*!
 * jQuery UI Resizable 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","./mouse","../disable-selection","../plugin","../version","../widget"],t):t(jQuery)}((function(t){"use strict";return t.widget("ui.resizable",t.ui.mouse,{version:"1.14.1",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,classes:{"ui-resizable-se":"ui-icon ui-icon-gripsmall-diagonal-se"},containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(t){return parseFloat(t)||0},_isNumber:function(t){return!isNaN(parseFloat(t))},_hasScroll:function(e,i){var s,h=!1,n=t(e).css("overflow");if("hidden"===n)return!1;if("scroll"===n)return!0;if(e[s=i&&"left"===i?"scrollLeft":"scrollTop"]>0)return!0;try{e[s]=1,h=e[s]>0,e[s]=0}catch(t){}return h},_create:function(){var e,i=this.options,s=this;this._addClass("ui-resizable"),t.extend(this,{_aspectRatio:!!i.aspectRatio,aspectRatio:i.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:i.helper||i.ghost||i.animate?i.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)&&(this.element.wrap(t("<div class='ui-wrapper'></div>").css({overflow:"hidden",position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,e={marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom"),marginLeft:this.originalElement.css("marginLeft")},this.element.css(e),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this._proportionallyResize()),this._setupHandles(),i.autoHide&&t(this.element).on("mouseenter",(function(){i.disabled||(s._removeClass("ui-resizable-autohide"),s._handles.show())})).on("mouseleave",(function(){i.disabled||s.resizing||(s._addClass("ui-resizable-autohide"),s._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy(),this._addedHandles.remove();var e,i=function(e){t(e).removeData("resizable").removeData("ui-resizable").off(".resizable")};return this.elementIsWrapper&&(i(this.element),e=this.element,this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")}).insertAfter(e),e.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_setOption:function(t,e){switch(this._super(t,e),t){case"handles":this._removeHandles(),this._setupHandles();break;case"aspectRatio":this._aspectRatio=!!e}},_setupHandles:function(){var e,i,s,h,n,o=this.options,a=this;if(this.handles=o.handles||(t(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this._handles=t(),this._addedHandles=t(),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),s=this.handles.split(","),this.handles={},i=0;i<s.length;i++)h="ui-resizable-"+(e=String.prototype.trim.call(s[i])),n=t("<div>"),this._addClass(n,"ui-resizable-handle "+h),n.css({zIndex:o.zIndex}),this.handles[e]=".ui-resizable-"+e,this.element.children(this.handles[e]).length||(this.element.append(n),this._addedHandles=this._addedHandles.add(n));this._renderAxis=function(e){var i,s,h,n;for(i in e=e||this.element,this.handles)this.handles[i].constructor===String?this.handles[i]=this.element.children(this.handles[i]).first().show():(this.handles[i].jquery||this.handles[i].nodeType)&&(this.handles[i]=t(this.handles[i]),this._on(this.handles[i],{mousedown:a._mouseDown})),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)&&(s=t(this.handles[i],this.element),n=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),h=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),e.css(h,n),this._proportionallyResize()),this._handles=this._handles.add(this.handles[i])},this._renderAxis(this.element),this._handles=this._handles.add(this.element.find(".ui-resizable-handle")),this._handles.disableSelection(),this._handles.on("mouseover",(function(){a.resizing||(this.className&&(n=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),a.axis=n&&n[1]?n[1]:"se")})),o.autoHide&&(this._handles.hide(),this._addClass("ui-resizable-autohide"))},_removeHandles:function(){this._addedHandles.remove()},_mouseCapture:function(e){var i,s,h=!1;for(i in this.handles)((s=t(this.handles[i])[0])===e.target||t.contains(s,e.target))&&(h=!0);return!this.options.disabled&&h},_mouseStart:function(e){var i,s,h,n,o=this.options,a=this.element;return this.resizing=!0,this._renderProxy(),i=this._num(this.helper.css("left")),s=this._num(this.helper.css("top")),o.containment&&(i+=t(o.containment).scrollLeft()||0,s+=t(o.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:s},this._helper||(n=this._calculateAdjustedElementDimensions(a)),this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:n.width,height:n.height},this.originalSize=this._helper?{width:a.outerWidth(),height:a.outerHeight()}:{width:n.width,height:n.height},this.sizeDiff={width:a.outerWidth()-a.width(),height:a.outerHeight()-a.height()},this.originalPosition={left:i,top:s},this.originalMousePosition={left:e.pageX,top:e.pageY},this.aspectRatio="number"==typeof o.aspectRatio?o.aspectRatio:this.originalSize.width/this.originalSize.height||1,h=t(".ui-resizable-"+this.axis).css("cursor"),t("body").css("cursor","auto"===h?this.axis+"-resize":h),this._addClass("ui-resizable-resizing"),this._propagate("start",e),!0},_mouseDrag:function(e){var i,s,h=this.originalMousePosition,n=this.axis,o=e.pageX-h.left||0,a=e.pageY-h.top||0,l=this._change[n];return this._updatePrevProperties(),!!l&&(i=l.apply(this,[e,o,a]),this._updateVirtualBoundaries(e.shiftKey),(this._aspectRatio||e.shiftKey)&&(i=this._updateRatio(i,e)),i=this._respectSize(i,e),this._updateCache(i),this._propagate("resize",e),s=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),t.isEmptyObject(s)||(this._updatePrevProperties(),this._trigger("resize",e,this.ui()),this._applyChanges()),!1)},_mouseStop:function(e){this.resizing=!1;var i,s,h,n,o,a,l,r=this.options,p=this;return this._helper&&(h=(s=(i=this._proportionallyResizeElements).length&&/textarea/i.test(i[0].nodeName))&&this._hasScroll(i[0],"left")?0:p.sizeDiff.height,n=s?0:p.sizeDiff.width,o={width:p.helper.width()-n,height:p.helper.height()-h},a=parseFloat(p.element.css("left"))+(p.position.left-p.originalPosition.left)||null,l=parseFloat(p.element.css("top"))+(p.position.top-p.originalPosition.top)||null,r.animate||this.element.css(t.extend(o,{top:l,left:a})),p.helper.height(p.size.height),p.helper.width(p.size.width),this._helper&&!r.animate&&this._proportionallyResize()),t("body").css("cursor","auto"),this._removeClass("ui-resizable-resizing"),this._propagate("stop",e),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var t={};return this.position.top!==this.prevPosition.top&&(t.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(t.left=this.position.left+"px"),this.helper.css(t),this.size.width!==this.prevSize.width&&(t.width=this.size.width+"px",this.helper.width(t.width)),this.size.height!==this.prevSize.height&&(t.height=this.size.height+"px",this.helper.height(t.height)),t},_updateVirtualBoundaries:function(t){var e,i,s,h,n,o=this.options;n={minWidth:this._isNumber(o.minWidth)?o.minWidth:0,maxWidth:this._isNumber(o.maxWidth)?o.maxWidth:1/0,minHeight:this._isNumber(o.minHeight)?o.minHeight:0,maxHeight:this._isNumber(o.maxHeight)?o.maxHeight:1/0},(this._aspectRatio||t)&&(e=n.minHeight*this.aspectRatio,s=n.minWidth/this.aspectRatio,i=n.maxHeight*this.aspectRatio,h=n.maxWidth/this.aspectRatio,e>n.minWidth&&(n.minWidth=e),s>n.minHeight&&(n.minHeight=s),i<n.maxWidth&&(n.maxWidth=i),h<n.maxHeight&&(n.maxHeight=h)),this._vBoundaries=n},_updateCache:function(t){this.offset=this.helper.offset(),this._isNumber(t.left)&&(this.position.left=t.left),this._isNumber(t.top)&&(this.position.top=t.top),this._isNumber(t.height)&&(this.size.height=t.height),this._isNumber(t.width)&&(this.size.width=t.width)},_updateRatio:function(t){var e=this.position,i=this.size,s=this.axis;return this._isNumber(t.height)?t.width=t.height*this.aspectRatio:this._isNumber(t.width)&&(t.height=t.width/this.aspectRatio),"sw"===s&&(t.left=e.left+(i.width-t.width),t.top=null),"nw"===s&&(t.top=e.top+(i.height-t.height),t.left=e.left+(i.width-t.width)),t},_respectSize:function(t){var e=this._vBoundaries,i=this.axis,s=this._isNumber(t.width)&&e.maxWidth&&e.maxWidth<t.width,h=this._isNumber(t.height)&&e.maxHeight&&e.maxHeight<t.height,n=this._isNumber(t.width)&&e.minWidth&&e.minWidth>t.width,o=this._isNumber(t.height)&&e.minHeight&&e.minHeight>t.height,a=this.originalPosition.left+this.originalSize.width,l=this.originalPosition.top+this.originalSize.height,r=/sw|nw|w/.test(i),p=/nw|ne|n/.test(i);return n&&(t.width=e.minWidth),o&&(t.height=e.minHeight),s&&(t.width=e.maxWidth),h&&(t.height=e.maxHeight),n&&r&&(t.left=a-e.minWidth),s&&r&&(t.left=a-e.maxWidth),o&&p&&(t.top=l-e.minHeight),h&&p&&(t.top=l-e.maxHeight),t.width||t.height||t.left||!t.top?t.width||t.height||t.top||!t.left||(t.left=null):t.top=null,t},_getPaddingPlusBorderDimensions:function(t){for(var e=0,i=[],s=[t.css("borderTopWidth"),t.css("borderRightWidth"),t.css("borderBottomWidth"),t.css("borderLeftWidth")],h=[t.css("paddingTop"),t.css("paddingRight"),t.css("paddingBottom"),t.css("paddingLeft")];e<4;e++)i[e]=parseFloat(s[e])||0,i[e]+=parseFloat(h[e])||0;return{height:i[0]+i[2],width:i[1]+i[3]}},_calculateAdjustedElementDimensions:function(t){var e,i,s,h=t.get(0);return"content-box"!==t.css("box-sizing")||!this._hasScroll(h)&&!this._hasScroll(h,"left")?{height:parseFloat(t.css("height")),width:parseFloat(t.css("width"))}:(e=parseFloat(h.style.width),i=parseFloat(h.style.height),s=this._getPaddingPlusBorderDimensions(t),e=isNaN(e)?this._getElementTheoreticalSize(t,s,"width"):e,{height:i=isNaN(i)?this._getElementTheoreticalSize(t,s,"height"):i,width:e})},_getElementTheoreticalSize:function(t,e,i){return Math.max(0,Math.ceil(t.get(0)["offset"+i[0].toUpperCase()+i.slice(1)]-e[i]-.5))||0},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var t,e=0,i=this.helper||this.element;e<this._proportionallyResizeElements.length;e++)t=this._proportionallyResizeElements[e],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(t)),t.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0})},_renderProxy:function(){var e=this.element,i=this.options;this.elementOffset=e.offset(),this._helper?(this.helper=this.helper||t("<div></div>").css({overflow:"hidden"}),this._addClass(this.helper,this._helper),this.helper.css({width:this.element.outerWidth(),height:this.element.outerHeight(),position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(t,e){return{width:this.originalSize.width+e}},w:function(t,e){var i=this.originalSize;return{left:this.originalPosition.left+e,width:i.width-e}},n:function(t,e,i){var s=this.originalSize;return{top:this.originalPosition.top+i,height:s.height-i}},s:function(t,e,i){return{height:this.originalSize.height+i}},se:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},sw:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[e,i,s]))},ne:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},nw:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[e,i,s]))}},_propagate:function(e,i){t.ui.plugin.call(this,e,[i,this.ui()]),"resize"!==e&&this._trigger(e,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),t.ui.plugin.add("resizable","animate",{stop:function(e){var i=t(this).resizable("instance"),s=i.options,h=i._proportionallyResizeElements,n=h.length&&/textarea/i.test(h[0].nodeName),o=n&&i._hasScroll(h[0],"left")?0:i.sizeDiff.height,a=n?0:i.sizeDiff.width,l={width:i.size.width-a,height:i.size.height-o},r=parseFloat(i.element.css("left"))+(i.position.left-i.originalPosition.left)||null,p=parseFloat(i.element.css("top"))+(i.position.top-i.originalPosition.top)||null;i.element.animate(t.extend(l,p&&r?{top:p,left:r}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseFloat(i.element.css("width")),height:parseFloat(i.element.css("height")),top:parseFloat(i.element.css("top")),left:parseFloat(i.element.css("left"))};h&&h.length&&t(h[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",e)}})}}),t.ui.plugin.add("resizable","containment",{start:function(){var e,i,s,h,n,o,a,l=t(this).resizable("instance"),r=l.options,p=l.element,d=r.containment,g=d instanceof t?d.get(0):/parent/.test(d)?p.parent().get(0):d;g&&(l.containerElement=t(g),/document/.test(d)||d===document?(l.containerOffset={left:0,top:0},l.containerPosition={left:0,top:0},l.parentData={element:t(document),left:0,top:0,width:t(document).width(),height:t(document).height()||document.body.parentNode.scrollHeight}):(e=t(g),i=[],t(["Top","Right","Left","Bottom"]).each((function(t,s){i[t]=l._num(e.css("padding"+s))})),l.containerOffset=e.offset(),l.containerPosition=e.position(),l.containerSize={height:e.innerHeight()-i[3],width:e.innerWidth()-i[1]},s=l.containerOffset,h=l.containerSize.height,n=l.containerSize.width,o=l._hasScroll(g,"left")?g.scrollWidth:n,a=l._hasScroll(g)?g.scrollHeight:h,l.parentData={element:g,left:s.left,top:s.top,width:o,height:a}))},resize:function(e){var i,s,h,n,o=t(this).resizable("instance"),a=o.options,l=o.containerOffset,r=o.position,p=o._aspectRatio||e.shiftKey,d={top:0,left:0},g=o.containerElement,u=!0;g[0]!==document&&/static/.test(g.css("position"))&&(d=l),r.left<(o._helper?l.left:0)&&(o.size.width=o.size.width+(o._helper?o.position.left-l.left:o.position.left-d.left),p&&(o.size.height=o.size.width/o.aspectRatio,u=!1),o.position.left=a.helper?l.left:0),r.top<(o._helper?l.top:0)&&(o.size.height=o.size.height+(o._helper?o.position.top-l.top:o.position.top),p&&(o.size.width=o.size.height*o.aspectRatio,u=!1),o.position.top=o._helper?l.top:0),h=o.containerElement.get(0)===o.element.parent().get(0),n=/relative|absolute/.test(o.containerElement.css("position")),h&&n?(o.offset.left=o.parentData.left+o.position.left,o.offset.top=o.parentData.top+o.position.top):(o.offset.left=o.element.offset().left,o.offset.top=o.element.offset().top),i=Math.abs(o.sizeDiff.width+(o._helper?o.offset.left-d.left:o.offset.left-l.left)),s=Math.abs(o.sizeDiff.height+(o._helper?o.offset.top-d.top:o.offset.top-l.top)),i+o.size.width>=o.parentData.width&&(o.size.width=o.parentData.width-i,p&&(o.size.height=o.size.width/o.aspectRatio,u=!1)),s+o.size.height>=o.parentData.height&&(o.size.height=o.parentData.height-s,p&&(o.size.width=o.size.height*o.aspectRatio,u=!1)),u||(o.position.left=o.prevPosition.left,o.position.top=o.prevPosition.top,o.size.width=o.prevSize.width,o.size.height=o.prevSize.height)},stop:function(){var e=t(this).resizable("instance"),i=e.options,s=e.containerOffset,h=e.containerPosition,n=e.containerElement,o=t(e.helper),a=o.offset(),l=o.outerWidth()-e.sizeDiff.width,r=o.outerHeight()-e.sizeDiff.height;e._helper&&!i.animate&&/relative/.test(n.css("position"))&&t(this).css({left:a.left-h.left-s.left,width:l,height:r}),e._helper&&!i.animate&&/static/.test(n.css("position"))&&t(this).css({left:a.left-h.left-s.left,width:l,height:r})}}),t.ui.plugin.add("resizable","alsoResize",{start:function(){var e=t(this).resizable("instance"),i=e.options;t(i.alsoResize).each((function(){var i=t(this),s=e._calculateAdjustedElementDimensions(i);i.data("ui-resizable-alsoresize",{width:s.width,height:s.height,left:parseFloat(i.css("left")),top:parseFloat(i.css("top"))})}))},resize:function(e,i){var s=t(this).resizable("instance"),h=s.options,n=s.originalSize,o=s.originalPosition,a={height:s.size.height-n.height||0,width:s.size.width-n.width||0,top:s.position.top-o.top||0,left:s.position.left-o.left||0};t(h.alsoResize).each((function(){var e=t(this),s=t(this).data("ui-resizable-alsoresize"),h={},n=e.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];t.each(n,(function(t,e){var i=(s[e]||0)+(a[e]||0);i&&i>=0&&(h[e]=i||null)})),e.css(h)}))},stop:function(){t(this).removeData("ui-resizable-alsoresize")}}),t.ui.plugin.add("resizable","ghost",{start:function(){var e=t(this).resizable("instance"),i=e.size;e.ghost=e.originalElement.clone(),e.ghost.css({opacity:.25,display:"block",position:"relative",height:i.height,width:i.width,margin:0,left:0,top:0}),e._addClass(e.ghost,"ui-resizable-ghost"),!0===t.uiBackCompat&&"string"==typeof e.options.ghost&&e.ghost.addClass(this.options.ghost),e.ghost.appendTo(e.helper)},resize:function(){var e=t(this).resizable("instance");e.ghost&&e.ghost.css({position:"relative",height:e.size.height,width:e.size.width})},stop:function(){var e=t(this).resizable("instance");e.ghost&&e.helper&&e.helper.get(0).removeChild(e.ghost.get(0))}}),t.ui.plugin.add("resizable","grid",{resize:function(){var e,i=t(this).resizable("instance"),s=i.options,h=i.size,n=i.originalSize,o=i.originalPosition,a=i.axis,l="number"==typeof s.grid?[s.grid,s.grid]:s.grid,r=l[0]||1,p=l[1]||1,d=Math.round((h.width-n.width)/r)*r,g=Math.round((h.height-n.height)/p)*p,u=n.width+d,c=n.height+g,f=s.maxWidth&&s.maxWidth<u,m=s.maxHeight&&s.maxHeight<c,z=s.minWidth&&s.minWidth>u,_=s.minHeight&&s.minHeight>c;s.grid=l,z&&(u+=r),_&&(c+=p),f&&(u-=r),m&&(c-=p),/^(se|s|e)$/.test(a)?(i.size.width=u,i.size.height=c):/^(ne)$/.test(a)?(i.size.width=u,i.size.height=c,i.position.top=o.top-g):/^(sw)$/.test(a)?(i.size.width=u,i.size.height=c,i.position.left=o.left-d):((c-p<=0||u-r<=0)&&(e=i._getPaddingPlusBorderDimensions(this)),c-p>0?(i.size.height=c,i.position.top=o.top-g):(c=p-e.height,i.size.height=c,i.position.top=o.top+n.height-c),u-r>0?(i.size.width=u,i.position.left=o.left-d):(u=r-e.width,i.size.width=u,i.position.left=o.left+n.width-u))}}),t.ui.resizable}));

/*!
 * jQuery UI Button 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","./controlgroup","./checkboxradio","../keycode","../widget"],t):t(jQuery)}((function(t){"use strict";var i;return t.widget("ui.button",{version:"1.14.1",defaultElement:"<button>",options:{classes:{"ui-button":"ui-corner-all"},disabled:null,icon:null,iconPosition:"beginning",label:null,showLabel:!0},_getCreateOptions:function(){var t,i=this._super()||{};return this.isInput=this.element.is("input"),null!=(t=this.element[0].disabled)&&(i.disabled=t),this.originalLabel=this.isInput?this.element.val():this.element.html(),this.originalLabel&&(i.label=this.originalLabel),i},_create:function(){!this.option.showLabel&!this.options.icon&&(this.options.showLabel=!0),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled||!1),this.hasTitle=!!this.element.attr("title"),this.options.label&&this.options.label!==this.originalLabel&&(this.isInput?this.element.val(this.options.label):this.element.html(this.options.label)),this._addClass("ui-button","ui-widget"),this._setOption("disabled",this.options.disabled),this._enhance(),this.element.is("a")&&this._on({keyup:function(i){i.keyCode===t.ui.keyCode.SPACE&&(i.preventDefault(),this.element[0].click?this.element[0].click():this.element.trigger("click"))}})},_enhance:function(){this.element.is("button")||this.element.attr("role","button"),this.options.icon&&(this._updateIcon("icon",this.options.icon),this._updateTooltip())},_updateTooltip:function(){this.title=this.element.attr("title"),this.options.showLabel||this.title||this.element.attr("title",this.options.label)},_updateIcon:function(i,o){var s="iconPosition"!==i,n=s?this.options.iconPosition:o,e="top"===n||"bottom"===n;this.icon?s&&this._removeClass(this.icon,null,this.options.icon):(this.icon=t("<span>"),this._addClass(this.icon,"ui-button-icon","ui-icon"),this.options.showLabel||this._addClass("ui-button-icon-only")),s&&this._addClass(this.icon,null,o),this._attachIcon(n),e?(this._addClass(this.icon,null,"ui-widget-icon-block"),this.iconSpace&&this.iconSpace.remove()):(this.iconSpace||(this.iconSpace=t("<span> </span>"),this._addClass(this.iconSpace,"ui-button-icon-space")),this._removeClass(this.icon,null,"ui-wiget-icon-block"),this._attachIconSpace(n))},_destroy:function(){this.element.removeAttr("role"),this.icon&&this.icon.remove(),this.iconSpace&&this.iconSpace.remove(),this.hasTitle||this.element.removeAttr("title")},_attachIconSpace:function(t){this.icon[/^(?:end|bottom)/.test(t)?"before":"after"](this.iconSpace)},_attachIcon:function(t){this.element[/^(?:end|bottom)/.test(t)?"append":"prepend"](this.icon)},_setOptions:function(t){var i=void 0===t.showLabel?this.options.showLabel:t.showLabel,o=void 0===t.icon?this.options.icon:t.icon;i||o||(t.showLabel=!0),this._super(t)},_setOption:function(t,i){"icon"===t&&(i?this._updateIcon(t,i):this.icon&&(this.icon.remove(),this.iconSpace&&this.iconSpace.remove())),"iconPosition"===t&&this._updateIcon(t,i),"showLabel"===t&&(this._toggleClass("ui-button-icon-only",null,!i),this._updateTooltip()),"label"===t&&(this.isInput?this.element.val(i):(this.element.html(i),this.icon&&(this._attachIcon(this.options.iconPosition),this._attachIconSpace(this.options.iconPosition)))),this._super(t,i),"disabled"===t&&(this._toggleClass(null,"ui-state-disabled",i),this.element[0].disabled=i,i&&this.element.trigger("blur"))},refresh:function(){var t=this.element.is("input, button")?this.element[0].disabled:this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOptions({disabled:t}),this._updateTooltip()}}),!0===t.uiBackCompat&&(t.widget("ui.button",t.ui.button,{options:{text:!0,icons:{primary:null,secondary:null}},_create:function(){this.options.showLabel&&!this.options.text&&(this.options.showLabel=this.options.text),!this.options.showLabel&&this.options.text&&(this.options.text=this.options.showLabel),this.options.icon||!this.options.icons.primary&&!this.options.icons.secondary?this.options.icon&&(this.options.icons.primary=this.options.icon):this.options.icons.primary?this.options.icon=this.options.icons.primary:(this.options.icon=this.options.icons.secondary,this.options.iconPosition="end"),this._super()},_setOption:function(t,i){"text"!==t?("showLabel"===t&&(this.options.text=i),"icon"===t&&(this.options.icons.primary=i),"icons"===t&&(i.primary?(this._super("icon",i.primary),this._super("iconPosition","beginning")):i.secondary&&(this._super("icon",i.secondary),this._super("iconPosition","end"))),this._superApply(arguments)):this._super("showLabel",i)}}),t.fn.button=(i=t.fn.button,function(o){var s="string"==typeof o,n=Array.prototype.slice.call(arguments,1),e=this;return s?this.length||"instance"!==o?this.each((function(){var i,s=t(this).attr("type"),h="checkbox"!==s&&"radio"!==s?"button":"checkboxradio",a=t.data(this,"ui-"+h);return"instance"===o?(e=a,!1):a?"function"!=typeof a[o]||"_"===o.charAt(0)?t.error("no such method '"+o+"' for button widget instance"):(i=a[o].apply(a,n))!==a&&void 0!==i?(e=i&&i.jquery?e.pushStack(i.get()):i,!1):void 0:t.error("cannot call methods on button prior to initialization; attempted to call method '"+o+"'")})):e=void 0:(n.length&&(o=t.widget.extend.apply(null,[o].concat(n))),this.each((function(){var s=t(this).attr("type"),n="checkbox"!==s&&"radio"!==s?"button":"checkboxradio",e=t.data(this,"ui-"+n);if(e)e.option(o||{}),e._init&&e._init();else{if("button"===n)return void i.call(t(this),o);t(this).checkboxradio(t.extend({icon:!1},o))}}))),e}),t.fn.buttonset=function(){return t.ui.controlgroup||t.error("Controlgroup widget missing"),"option"===arguments[0]&&"items"===arguments[1]&&arguments[2]?this.controlgroup.apply(this,[arguments[0],"items.button",arguments[2]]):"option"===arguments[0]&&"items"===arguments[1]?this.controlgroup.apply(this,[arguments[0],"items.button"]):("object"==typeof arguments[0]&&arguments[0].items&&(arguments[0].items={button:arguments[0].items}),this.controlgroup.apply(this,arguments))}),t.ui.button}));

/*!
 * jQuery UI Dialog 1.14.1
 * https://jqueryui.com
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license
 */
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery","./button","./draggable","./mouse","./resizable","../focusable","../keycode","../position","../tabbable","../unique-id","../version","../widget"],i):i(jQuery)}((function(i){"use strict";return i.widget("ui.dialog",{version:"1.14.1",options:{appendTo:"body",autoOpen:!0,buttons:[],classes:{"ui-dialog":"ui-corner-all","ui-dialog-titlebar":"ui-corner-all"},closeOnEscape:!0,closeText:"Close",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(t){var e=i(this).css(t).offset().top;e<0&&i(this).css("top",t.top-e)}},resizable:!0,show:null,title:null,uiDialogTitleHeadingLevel:0,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),null==this.options.title&&null!=this.originalTitle&&(this.options.title=this.originalTitle),this.options.disabled&&(this.options.disabled=!1),this._createWrapper(),this.element.show().removeAttr("title").appendTo(this.uiDialog),this._addClass("ui-dialog-content","ui-widget-content"),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&i.fn.draggable&&this._makeDraggable(),this.options.resizable&&i.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var t=this.options.appendTo;return t&&(t.jquery||t.nodeType)?i(t):this.document.find(t||"body").eq(0)},_destroy:function(){var i,t=this.originalPosition;this._untrackInstance(),this._destroyOverlay(),this.element.removeUniqueId().css(this.originalCss).detach(),this.uiDialog.remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),(i=t.parent.children().eq(t.index)).length&&i[0]!==this.element[0]?i.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},disable:i.noop,enable:i.noop,close:function(t){var e=this;this._isOpen&&!1!==this._trigger("beforeClose",t)&&(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),this.opener.filter(":focusable").trigger("focus").length||i(this.document[0].activeElement).trigger("blur"),this._hide(this.uiDialog,this.options.hide,(function(){e._trigger("close",t)})))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(t,e){var o=!1,s=this.uiDialog.siblings(".ui-front:visible").map((function(){return+i(this).css("z-index")})).get(),n=Math.max.apply(null,s);return n>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",n+1),o=!0),o&&!e&&this._trigger("focus",t),o},open:function(){var t=this;this._isOpen?this._moveToTop()&&this._focusTabbable():(this._isOpen=!0,this.opener=i(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,(function(){t._focusTabbable(),t._trigger("focus")})),this._makeFocusTarget(),this._trigger("open"))},_focusTabbable:function(){var i=this._focusedElement;i||(i=this.element.find("[autofocus]")),i.length||(i=this.element.find(":tabbable")),i.length||(i=this.uiDialogButtonPane.find(":tabbable")),i.length||(i=this.uiDialogTitlebarClose.filter(":tabbable")),i.length||(i=this.uiDialog),i.eq(0).trigger("focus")},_restoreTabbableFocus:function(){var t=this.document[0].activeElement;this.uiDialog[0]===t||i.contains(this.uiDialog[0],t)||this._focusTabbable()},_keepFocus:function(i){i.preventDefault(),this._restoreTabbableFocus()},_createWrapper:function(){this.uiDialog=i("<div>").hide().attr({tabIndex:-1,role:"dialog","aria-modal":this.options.modal?"true":null}).appendTo(this._appendTo()),this._addClass(this.uiDialog,"ui-dialog","ui-widget ui-widget-content ui-front"),this._on(this.uiDialog,{keydown:function(t){if(this.options.closeOnEscape&&!t.isDefaultPrevented()&&t.keyCode&&t.keyCode===i.ui.keyCode.ESCAPE)return t.preventDefault(),void this.close(t);if(t.keyCode===i.ui.keyCode.TAB&&!t.isDefaultPrevented()){var e=this.uiDialog.find(":tabbable"),o=e.first(),s=e.last();t.target!==s[0]&&t.target!==this.uiDialog[0]||t.shiftKey?t.target!==o[0]&&t.target!==this.uiDialog[0]||!t.shiftKey||(this._delay((function(){s.trigger("focus")})),t.preventDefault()):(this._delay((function(){o.trigger("focus")})),t.preventDefault())}},mousedown:function(i){this._moveToTop(i)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var t;this.uiDialogTitlebar=i("<div>"),this._addClass(this.uiDialogTitlebar,"ui-dialog-titlebar","ui-widget-header ui-helper-clearfix"),this._on(this.uiDialogTitlebar,{mousedown:function(t){i(t.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.trigger("focus")}}),this.uiDialogTitlebarClose=i("<button type='button'></button>").button({label:i("<a>").text(this.options.closeText).html(),icon:"ui-icon-closethick",showLabel:!1}).appendTo(this.uiDialogTitlebar),this._addClass(this.uiDialogTitlebarClose,"ui-dialog-titlebar-close"),this._on(this.uiDialogTitlebarClose,{click:function(i){i.preventDefault(),this.close(i)}});var e=Number.isInteger(this.options.uiDialogTitleHeadingLevel)&&this.options.uiDialogTitleHeadingLevel>0&&this.options.uiDialogTitleHeadingLevel<=6?"h"+this.options.uiDialogTitleHeadingLevel:"span";t=i("<"+e+">").uniqueId().prependTo(this.uiDialogTitlebar),this._addClass(t,"ui-dialog-title"),this._title(t),this.uiDialogTitlebar.prependTo(this.uiDialog),this.uiDialog.attr({"aria-labelledby":t.attr("id")})},_title:function(i){this.options.title?i.text(this.options.title):i.html("&#160;")},_createButtonPane:function(){this.uiDialogButtonPane=i("<div>"),this._addClass(this.uiDialogButtonPane,"ui-dialog-buttonpane","ui-widget-content ui-helper-clearfix"),this.uiButtonSet=i("<div>").appendTo(this.uiDialogButtonPane),this._addClass(this.uiButtonSet,"ui-dialog-buttonset"),this._createButtons()},_createButtons:function(){var t=this,e=this.options.buttons;this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),i.isEmptyObject(e)||Array.isArray(e)&&!e.length?this._removeClass(this.uiDialog,"ui-dialog-buttons"):(i.each(e,(function(e,o){var s,n;o="function"==typeof o?{click:o,text:e}:o,o=i.extend({type:"button"},o),s=o.click,n={icon:o.icon,iconPosition:o.iconPosition,showLabel:o.showLabel,icons:o.icons,text:o.text},delete o.click,delete o.icon,delete o.iconPosition,delete o.showLabel,delete o.icons,"boolean"==typeof o.text&&delete o.text,i("<button></button>",o).button(n).appendTo(t.uiButtonSet).on("click",(function(){s.apply(t.element[0],arguments)}))})),this._addClass(this.uiDialog,"ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog))},_makeDraggable:function(){var t=this,e=this.options;function o(i){return{position:i.position,offset:i.offset}}this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(e,s){t._addClass(i(this),"ui-dialog-dragging"),t._blockFrames(),t._trigger("dragStart",e,o(s))},drag:function(i,e){t._trigger("drag",i,o(e))},stop:function(s,n){var a=n.offset.left-t.document.scrollLeft(),l=n.offset.top-t.document.scrollTop();e.position={my:"left top",at:"left"+(a>=0?"+":"")+a+" top"+(l>=0?"+":"")+l,of:t.window},t._removeClass(i(this),"ui-dialog-dragging"),t._unblockFrames(),t._trigger("dragStop",s,o(n))}})},_makeResizable:function(){var t=this,e=this.options,o=e.resizable,s=this.uiDialog.css("position"),n="string"==typeof o?o:"n,e,s,w,se,sw,ne,nw";function a(i){return{originalPosition:i.originalPosition,originalSize:i.originalSize,position:i.position,size:i.size}}this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:this._minHeight(),handles:n,start:function(e,o){t._addClass(i(this),"ui-dialog-resizing"),t._blockFrames(),t._trigger("resizeStart",e,a(o))},resize:function(i,e){t._trigger("resize",i,a(e))},stop:function(o,s){var n=t.uiDialog.offset(),l=n.left-t.document.scrollLeft(),h=n.top-t.document.scrollTop();e.height=t.uiDialog.height(),e.width=t.uiDialog.width(),e.position={my:"left top",at:"left"+(l>=0?"+":"")+l+" top"+(h>=0?"+":"")+h,of:t.window},t._removeClass(i(this),"ui-dialog-resizing"),t._unblockFrames(),t._trigger("resizeStop",o,a(s))}}).css("position",s)},_trackFocus:function(){this._on(this.widget(),{focusin:function(t){this._makeFocusTarget(),this._focusedElement=i(t.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var t=this._trackingInstances(),e=i.inArray(this,t);-1!==e&&t.splice(e,1)},_trackingInstances:function(){var i=this.document.data("ui-dialog-instances");return i||(i=[],this.document.data("ui-dialog-instances",i)),i},_minHeight:function(){var i=this.options;return"auto"===i.height?i.minHeight:Math.min(i.minHeight,i.height)},_position:function(){var i=this.uiDialog.is(":visible");i||this.uiDialog.show(),this.uiDialog.position(this.options.position),i||this.uiDialog.hide()},_setOptions:function(t){var e=this,o=!1,s={};i.each(t,(function(i,t){e._setOption(i,t),i in e.sizeRelatedOptions&&(o=!0),i in e.resizableRelatedOptions&&(s[i]=t)})),o&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",s)},_setOption:function(t,e){var o,s,n=this.uiDialog;"disabled"!==t&&(this._super(t,e),"appendTo"===t&&this.uiDialog.appendTo(this._appendTo()),"buttons"===t&&this._createButtons(),"closeText"===t&&this.uiDialogTitlebarClose.button({label:i("<a>").text(""+this.options.closeText).html()}),"draggable"===t&&((o=n.is(":data(ui-draggable)"))&&!e&&n.draggable("destroy"),!o&&e&&this._makeDraggable()),"position"===t&&this._position(),"resizable"===t&&((s=n.is(":data(ui-resizable)"))&&!e&&n.resizable("destroy"),s&&"string"==typeof e&&n.resizable("option","handles",e),s||!1===e||this._makeResizable()),"title"===t&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")),"modal"===t&&n.attr("aria-modal",e?"true":null))},_size:function(){var i,t,e,o=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),o.minWidth>o.width&&(o.width=o.minWidth),i=this.uiDialog.css({height:"auto",width:o.width}).outerHeight(),t=Math.max(0,o.minHeight-i),e="number"==typeof o.maxHeight?Math.max(0,o.maxHeight-i):"none","auto"===o.height?this.element.css({minHeight:t,maxHeight:e,height:"auto"}):this.element.height(Math.max(0,o.height-i)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map((function(){var t=i(this);return i("<div>").css({position:"absolute",width:t.outerWidth(),height:t.outerHeight()}).appendTo(t.parent()).offset(t.offset())[0]}))},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(t){return!!i(t.target).closest(".ui-dialog").length||!!i(t.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var t=!0;this._delay((function(){t=!1})),this.document.data("ui-dialog-overlays")||this.document.on("focusin.ui-dialog",function(i){if(!t){var e=this._trackingInstances()[0];e._allowInteraction(i)||(i.preventDefault(),e._focusTabbable())}}.bind(this)),this.overlay=i("<div>").appendTo(this._appendTo()),this._addClass(this.overlay,null,"ui-widget-overlay ui-front"),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)}},_destroyOverlay:function(){if(this.options.modal&&this.overlay){var i=this.document.data("ui-dialog-overlays")-1;i?this.document.data("ui-dialog-overlays",i):(this.document.off("focusin.ui-dialog"),this.document.removeData("ui-dialog-overlays")),this.overlay.remove(),this.overlay=null}}}),!0===i.uiBackCompat&&i.widget("ui.dialog",i.ui.dialog,{options:{dialogClass:""},_createWrapper:function(){this._super(),this.uiDialog.addClass(this.options.dialogClass)},_setOption:function(i,t){"dialogClass"===i&&this.uiDialog.removeClass(this.options.dialogClass).addClass(t),this._superApply(arguments)}}),i.ui.dialog}));

(function($,Drupal,drupalSettings,JSON,storage){const options=$.extend(drupalSettings.contextual,{strings:{open:Drupal.t('Open'),close:Drupal.t('Close')}});const cachedPermissionsHash=storage.getItem('Drupal.contextual.permissionsHash');const {permissionsHash}=drupalSettings.user;if(cachedPermissionsHash!==permissionsHash){if(typeof permissionsHash==='string')Object.keys(storage).forEach((key)=>{if(key.startsWith('Drupal.contextual.'))storage.removeItem(key);});storage.setItem('Drupal.contextual.permissionsHash',permissionsHash);}function adjustIfNestedAndOverlapping($contextual){const $contextuals=$contextual.parents('.contextual-region').eq(-1).find('.contextual');if($contextuals.length<=1)return;const firstTop=$contextuals.eq(0).offset().top;const secondTop=$contextuals.eq(1).offset().top;if(firstTop===secondTop){const $nestedContextual=$contextuals.eq(1);let height=0;const $trigger=$nestedContextual.find('.trigger');$trigger.removeClass('visually-hidden');height=$nestedContextual.height();$trigger.addClass('visually-hidden');$nestedContextual[0].style.top=$nestedContextual.position().top+height;}}function initContextual($contextual,html){const $region=$contextual.closest('.contextual-region');const {contextual}=Drupal;$contextual.html(html).addClass('contextual').prepend(Drupal.theme('contextualTrigger'));const destination=`destination=${Drupal.encodePath(Drupal.url(drupalSettings.path.currentPath+window.location.search))}`;$contextual.find('.contextual-links a').each(function(){const url=this.getAttribute('href');const glue=url.includes('?')?'&':'?';this.setAttribute('href',url+glue+destination);});let title='';const $regionHeading=$region.find('h2');if($regionHeading.length)title=$regionHeading[0].textContent.trim();options.title=title;const contextualModelView=new Drupal.contextual.ContextualModelView($contextual,$region,options);contextual.instances.push(contextualModelView);adjustIfNestedAndOverlapping($contextual);}Drupal.behaviors.contextual={attach(context){const $context=$(context);let $placeholders=$(once('contextual-render','[data-contextual-id]',context));if($placeholders.length===0)return;const ids=[];$placeholders.each(function(){ids.push({id:$(this).attr('data-contextual-id'),token:$(this).attr('data-contextual-token')});});const uncachedIDs=[];const uncachedTokens=[];ids.forEach((contextualID)=>{const html=storage.getItem(`Drupal.contextual.${contextualID.id}`);if(html?.length){window.setTimeout(()=>{initContextual($context.find(`[data-contextual-id="${contextualID.id}"]:empty`).eq(0),html);});return;}uncachedIDs.push(contextualID.id);uncachedTokens.push(contextualID.token);});if(uncachedIDs.length>0)$.ajax({url:Drupal.url('contextual/render'),type:'POST',data:{'ids[]':uncachedIDs,'tokens[]':uncachedTokens},dataType:'json',success(results){Object.entries(results).forEach(([contextualID,html])=>{storage.setItem(`Drupal.contextual.${contextualID}`,html);if(html.length>0){$placeholders=$context.find(`[data-contextual-id="${contextualID}"]`);for(let i=0;i<$placeholders.length;i++)initContextual($placeholders.eq(i),html);}});}});}};Drupal.contextual={views:[],regionViews:[],instances:new Proxy([],{set:function set(obj,prop,value){obj[prop]=value;window.dispatchEvent(new Event('contextual-instances-added'));return true;},deleteProperty(target,prop){if(prop in target){delete target[prop];window.dispatchEvent(new Event('contextual-instances-removed'));}}}),ContextualModelView:class{constructor($contextual,$region,options){this.title=options.title||'';this.regionIsHovered=false;this._hasFocus=false;this._isOpen=false;this._isLocked=false;this.strings=options.strings;this.timer=NaN;this.modelId=btoa(Math.random()).substring(0,12);this.$region=$region;this.$contextual=$contextual;if(!document.body.classList.contains('touchevents')){this.$region.on({mouseenter:()=>{this.regionIsHovered=true;},mouseleave:()=>{this.close().blur();this.regionIsHovered=false;},'mouseleave mouseenter':()=>this.render()});this.$contextual.on('mouseenter',()=>{this.focus();this.render();});}this.$contextual.on({click:()=>{this.toggleOpen();},touchend:()=>{Drupal.contextual.ContextualModelView.touchEndToClick();},focus:()=>{this.focus();},blur:()=>{this.blur();},'click blur touchend focus':()=>this.render()},'.trigger');this.$contextual.on({click:()=>{this.close().blur();},touchend:(event)=>{Drupal.contextual.ContextualModelView.touchEndToClick(event);},focus:()=>{this.focus();},blur:()=>{this.waitCloseThenBlur();},'click blur touchend focus':()=>this.render()},'.contextual-links a');this.render();$(document).trigger('drupalContextualLinkAdded',{$el:$contextual,$region,model:this});}render(){const {isOpen}=this;const isVisible=this.isLocked||this.regionIsHovered||isOpen;this.$region.toggleClass('focus',this.hasFocus);this.$contextual.toggleClass('open',isOpen).find('.trigger').toggleClass('visually-hidden',!isVisible);this.$contextual.find('.contextual-links').prop('hidden',!isOpen);const trigger=this.$contextual.find('.trigger').get(0);trigger.textContent=Drupal.t('@action @title configuration options',{'@action':!isOpen?this.strings.open:this.strings.close,'@title':this.title});trigger.setAttribute('aria-pressed',isOpen);}static touchEndToClick(event){event.preventDefault();event.target.click();}waitCloseThenBlur(){this.timer=window.setTimeout(()=>{this.isOpen=false;this.hasFocus=false;this.render();},150);}toggleOpen(){const newIsOpen=!this.isOpen;this.isOpen=newIsOpen;if(newIsOpen)this.focus();return this;}focus(){const {modelId}=this;Drupal.contextual.instances.forEach((model)=>{if(model.modelId!==modelId)model.close().blur();});window.clearTimeout(this.timer);this.hasFocus=true;return this;}blur(){if(!this.isOpen)this.hasFocus=false;return this;}close(){this.isOpen=false;return this;}get hasFocus(){return this._hasFocus;}set hasFocus(value){this._hasFocus=value;this.$region.toggleClass('focus',this._hasFocus);}get isOpen(){return this._isOpen;}set isOpen(value){this._isOpen=value;this.$region.closest('.contextual-region').find('.contextual .trigger:not(:first)').toggle(!this.isOpen);}get isLocked(){return this._isLocked;}set isLocked(value){if(value!==this._isLocked){this._isLocked=value;this.render();}}}};Drupal.theme.contextualTrigger=function(){return '<button class="trigger visually-hidden focusable" type="button"></button>';};$(document).on('drupalContextualLinkAdded',(event,data)=>{Drupal.ajax.bindAjaxLinks(data.$el[0]);});})(jQuery,Drupal,drupalSettings,window.JSON,window.sessionStorage);;
/* @license MIT https://raw.githubusercontent.com/focus-trap/tabbable/v6.2.0/LICENSE */
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):(t="undefined"!=typeof globalThis?globalThis:t||self,function(){var n=t.tabbable,o=t.tabbable={};e(o),o.noConflict=function(){return t.tabbable=n,o}}())}(this,(function(t){"use strict";var e=["input:not([inert])","select:not([inert])","textarea:not([inert])","a[href]:not([inert])","button:not([inert])","[tabindex]:not(slot):not([inert])","audio[controls]:not([inert])","video[controls]:not([inert])",'[contenteditable]:not([contenteditable="false"]):not([inert])',"details>summary:first-of-type:not([inert])","details:not([inert])"],n=e.join(","),o="undefined"==typeof Element,r=o?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector,i=!o&&Element.prototype.getRootNode?function(t){var e;return null==t||null===(e=t.getRootNode)||void 0===e?void 0:e.call(t)}:function(t){return null==t?void 0:t.ownerDocument},a=function t(e,n){var o;void 0===n&&(n=!0);var r=null==e||null===(o=e.getAttribute)||void 0===o?void 0:o.call(e,"inert");return""===r||"true"===r||n&&e&&t(e.parentNode)},l=function(t,e,o){if(a(t))return[];var i=Array.prototype.slice.apply(t.querySelectorAll(n));return e&&r.call(t,n)&&i.unshift(t),i=i.filter(o)},u=function t(e,o,i){for(var l=[],u=Array.from(e);u.length;){var d=u.shift();if(!a(d,!1))if("SLOT"===d.tagName){var c=d.assignedElements(),f=t(c.length?c:d.children,!0,i);i.flatten?l.push.apply(l,f):l.push({scopeParent:d,candidates:f})}else{r.call(d,n)&&i.filter(d)&&(o||!e.includes(d))&&l.push(d);var s=d.shadowRoot||"function"==typeof i.getShadowRoot&&i.getShadowRoot(d),p=!a(s,!1)&&(!i.shadowRootFilter||i.shadowRootFilter(d));if(s&&p){var h=t(!0===s?d.children:s.children,!0,i);i.flatten?l.push.apply(l,h):l.push({scopeParent:d,candidates:h})}else u.unshift.apply(u,d.children)}}return l},d=function(t){return!isNaN(parseInt(t.getAttribute("tabindex"),10))},c=function(t){if(!t)throw new Error("No node provided");return t.tabIndex<0&&(/^(AUDIO|VIDEO|DETAILS)$/.test(t.tagName)||function(t){var e,n=null==t||null===(e=t.getAttribute)||void 0===e?void 0:e.call(t,"contenteditable");return""===n||"true"===n}(t))&&!d(t)?0:t.tabIndex},f=function(t,e){return t.tabIndex===e.tabIndex?t.documentOrder-e.documentOrder:t.tabIndex-e.tabIndex},s=function(t){return"INPUT"===t.tagName},p=function(t){return function(t){return s(t)&&"radio"===t.type}(t)&&!function(t){if(!t.name)return!0;var e,n=t.form||i(t),o=function(t){return n.querySelectorAll('input[type="radio"][name="'+t+'"]')};if("undefined"!=typeof window&&void 0!==window.CSS&&"function"==typeof window.CSS.escape)e=o(window.CSS.escape(t.name));else try{e=o(t.name)}catch(t){return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",t.message),!1}var r=function(t,e){for(var n=0;n<t.length;n++)if(t[n].checked&&t[n].form===e)return t[n]}(e,t.form);return!r||r===t}(t)},h=function(t){var e=t.getBoundingClientRect(),n=e.width,o=e.height;return 0===n&&0===o},v=function(t,e){var n=e.displayCheck,o=e.getShadowRoot;if("hidden"===getComputedStyle(t).visibility)return!0;var a=r.call(t,"details>summary:first-of-type")?t.parentElement:t;if(r.call(a,"details:not([open]) *"))return!0;if(n&&"full"!==n&&"legacy-full"!==n){if("non-zero-area"===n)return h(t)}else{if("function"==typeof o){for(var l=t;t;){var u=t.parentElement,d=i(t);if(u&&!u.shadowRoot&&!0===o(u))return h(t);t=t.assignedSlot?t.assignedSlot:u||d===t.ownerDocument?u:d.host}t=l}if(function(t){var e,n,o,r,a=t&&i(t),l=null===(e=a)||void 0===e?void 0:e.host,u=!1;if(a&&a!==t)for(u=!!(null!==(n=l)&&void 0!==n&&null!==(o=n.ownerDocument)&&void 0!==o&&o.contains(l)||null!=t&&null!==(r=t.ownerDocument)&&void 0!==r&&r.contains(t));!u&&l;){var d,c,f;u=!(null===(c=l=null===(d=a=i(l))||void 0===d?void 0:d.host)||void 0===c||null===(f=c.ownerDocument)||void 0===f||!f.contains(l))}return u}(t))return!t.getClientRects().length;if("legacy-full"!==n)return!0}return!1},b=function(t,e){return!(e.disabled||a(e)||function(t){return s(t)&&"hidden"===t.type}(e)||v(e,t)||function(t){return"DETAILS"===t.tagName&&Array.prototype.slice.apply(t.children).some((function(t){return"SUMMARY"===t.tagName}))}(e)||function(t){if(/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(t.tagName))for(var e=t.parentElement;e;){if("FIELDSET"===e.tagName&&e.disabled){for(var n=0;n<e.children.length;n++){var o=e.children.item(n);if("LEGEND"===o.tagName)return!!r.call(e,"fieldset[disabled] *")||!o.contains(t)}return!0}e=e.parentElement}return!1}(e))},m=function(t,e){return!(p(e)||c(e)<0||!b(t,e))},g=function(t){var e=parseInt(t.getAttribute("tabindex"),10);return!!(isNaN(e)||e>=0)},y=function t(e){var n=[],o=[];return e.forEach((function(e,r){var i=!!e.scopeParent,a=i?e.scopeParent:e,l=function(t,e){var n=c(t);return n<0&&e&&!d(t)?0:n}(a,i),u=i?t(e.candidates):a;0===l?i?n.push.apply(n,u):n.push(a):o.push({documentOrder:r,tabIndex:l,item:e,isScope:i,content:u})})),o.sort(f).reduce((function(t,e){return e.isScope?t.push.apply(t,e.content):t.push(e.content),t}),[]).concat(n)},w=e.concat("iframe").join(",");t.focusable=function(t,e){return(e=e||{}).getShadowRoot?u([t],e.includeContainer,{filter:b.bind(null,e),flatten:!0,getShadowRoot:e.getShadowRoot}):l(t,e.includeContainer,b.bind(null,e))},t.getTabIndex=c,t.isFocusable=function(t,e){if(e=e||{},!t)throw new Error("No node provided");return!1!==r.call(t,w)&&b(e,t)},t.isTabbable=function(t,e){if(e=e||{},!t)throw new Error("No node provided");return!1!==r.call(t,n)&&m(e,t)},t.tabbable=function(t,e){var n;return n=(e=e||{}).getShadowRoot?u([t],e.includeContainer,{filter:m.bind(null,e),flatten:!1,getShadowRoot:e.getShadowRoot,shadowRootFilter:g}):l(t,e.includeContainer,m.bind(null,e)),y(n)},Object.defineProperty(t,"__esModule",{value:!0})}));

;
/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function($,Drupal){let autocomplete;function autocompleteSplitValues(value){const result=[];let quote=false;let current='';const valueLength=value.length;let character;for(let i=0;i<valueLength;i++){character=value.charAt(i);if(character==='"'){current+=character;quote=!quote;}else if(character===','&&!quote){result.push(current.trim());current='';}else current+=character;}if(value.length>0)result.push(current.trim());return result;}function extractLastTerm(terms){return autocomplete.splitValues(terms).pop();}function searchHandler(event){const options=autocomplete.options;if(options.isComposing)return false;const term=autocomplete.extractLastTerm(event.target.value);if(term.length>0&&options.firstCharacterDenyList.includes(term[0]))return false;return term.length>=options.minLength;}function sourceData(request,response){const elementId=this.element.attr('id');if(!(elementId in autocomplete.cache))autocomplete.cache[elementId]={};function showSuggestions(suggestions){const tagged=autocomplete.splitValues(request.term);const il=tagged.length;for(let i=0;i<il;i++)if(suggestions.includes(tagged[i]))suggestions.splice(suggestions.indexOf(tagged[i]),1);response(suggestions);}const term=autocomplete.extractLastTerm(request.term);function sourceCallbackHandler(data){autocomplete.cache[elementId][term]=data;showSuggestions(data);}if(autocomplete.cache[elementId].hasOwnProperty(term))showSuggestions(autocomplete.cache[elementId][term]);else{const options=$.extend({success:sourceCallbackHandler,data:{q:term}},autocomplete.ajax);$.ajax(this.element.attr('data-autocomplete-path'),options);}}function focusHandler(){return false;}function selectHandler(event,ui){const terms=autocomplete.splitValues(event.target.value);terms.pop();terms.push(ui.item.value);event.target.value=terms.join(', ');return false;}function renderItem(ul,item){return $('<li>').append($('<a>').html(item.label)).appendTo(ul);}Drupal.behaviors.autocomplete={attach(context){once('autocomplete','input.form-autocomplete',context).forEach((element)=>{const $autocomplete=$(element);const blacklist=$autocomplete.attr('data-autocomplete-first-character-blacklist');if(blacklist!==undefined)Drupal.deprecationError({message:'The data-autocomplete-first-character-blocklist attribute is deprecated in drupal:11.2.0 and is removed from drupal:12.0.0. Use firstCharacterDenyList instead. See https://www.drupal.org/node/3472016.'});const denyList=$autocomplete.attr('data-autocomplete-first-character-denylist');Drupal.deprecatedProperty({target:autocomplete.options,deprecatedProperty:'firstCharacterBlacklist',message:'The firstCharacterBlacklist property is deprecated in drupal:11.2.0 and is removed from drupal:12.0.0. Use firstCharacterDenyList instead. See https://www.drupal.org/node/3472016.'});$.extend(autocomplete.options,{firstCharacterDenyList:denyList||blacklist});$autocomplete.autocomplete(autocomplete.options).each(function(){$(this).data('ui-autocomplete')._renderItem=autocomplete.options.renderItem;});$autocomplete.on('compositionstart.autocomplete',()=>{autocomplete.options.isComposing=true;});$autocomplete.on('compositionend.autocomplete',()=>{autocomplete.options.isComposing=false;});});},detach(context,settings,trigger){if(trigger==='unload')$(once.remove('autocomplete','input.form-autocomplete',context)).autocomplete('destroy');}};autocomplete={cache:{},splitValues:autocompleteSplitValues,extractLastTerm,options:{source:sourceData,focus:focusHandler,search:searchHandler,select:selectHandler,renderItem,minLength:1,firstCharacterDenyList:'',isComposing:false},ajax:{dataType:'json',jsonp:false}};Drupal.autocomplete=autocomplete;})(jQuery,Drupal);;
/**
 * tua-body-scroll-lock v1.5.3
 * (c) 2024 Evinma, BuptStEve
 * @license MIT
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).bodyScrollLock={})}(this,(function(e){"use strict";var t=function(){return"undefined"==typeof window},n=function(e){e=e||navigator.userAgent;var t=/(iPad).*OS\s([\d_]+)/.test(e);return{ios:!t&&/(iPhone\sOS)\s([\d_]+)/.test(e)||t,android:/(Android);?[\s/]+([\d.]+)?/.test(e)}};function o(e){if(t())return!1;if(!e)throw new Error("options must be provided");var n=!1,o={get passive(){n=!0}},i=function(){},l="__TUA_BSL_TEST_PASSIVE__";window.addEventListener(l,i,o),window.removeEventListener(l,i,o);var c=e.capture;return n?e:void 0!==c&&c}function i(){return"__BSL_PREVENT_DEFAULT__"in window||(window.__BSL_PREVENT_DEFAULT__=function(e){e.cancelable&&e.preventDefault()}),window.__BSL_PREVENT_DEFAULT__}function l(e){return e?Array.isArray(e)?e:[e]:[]}var c={lockedNum:0,lockedElements:[],unLockCallback:null,documentListenerAdded:!1,initialClientPos:{clientX:0,clientY:0}};function r(e){if(t())return c;if(!(null==e?void 0:e.useGlobalLockState))return r.lockState;var n="__BSL_LOCK_STATE__"in window?Object.assign(Object.assign({},c),window.__BSL_LOCK_STATE__):c;return window.__BSL_LOCK_STATE__=n,n}function d(e){return!n().ios&&("function"==typeof e.unLockCallback&&(e.unLockCallback(),!0))}function s(e){e.documentListenerAdded&&(document.removeEventListener("touchmove",i(),o({passive:!1})),e.documentListenerAdded=!1)}r.lockState=c,e.clearBodyLocks=function(e){if(!t()){var n=r(e);if(n.lockedNum=0,!d(n)){if(n.lockedElements.length)for(var o=n.lockedElements.pop();o;)o.ontouchmove=null,o.ontouchstart=null,o=n.lockedElements.pop();s(n)}}},e.getLockState=r,e.lock=function(e,c){if(!t()){var d,s,u,a,f=n(),h=r(c);f.ios?(l(e).filter((function(e){return e&&-1===h.lockedElements.indexOf(e)})).forEach((function(e){e.ontouchstart=function(e){var t=e.targetTouches[0],n=t.clientX,o=t.clientY;h.initialClientPos={clientX:n,clientY:o}},e.ontouchmove=function(t){!function(e,t,n){if(t){var o=t.scrollTop,l=t.scrollLeft,c=t.scrollWidth,r=t.scrollHeight,d=t.clientWidth,s=t.clientHeight,u=e.targetTouches[0].clientX-n.clientX,a=e.targetTouches[0].clientY-n.clientY,f=Math.abs(a)>Math.abs(u);if(f&&(a>0&&0===o||a<0&&o+s+1>=r)||!f&&(u>0&&0===l||u<0&&l+d+1>=c))return i()(e)}e.stopPropagation()}(t,e,h.initialClientPos)},h.lockedElements.push(e)})),function(e){if(!n().ios)return;if(e.documentListenerAdded)return;document.addEventListener("touchmove",i(),o({passive:!1})),e.documentListenerAdded=!0}(h)):h.lockedNum<=0&&(h.unLockCallback=f.android?function(e){var t=document.documentElement,n=document.body,o=t.scrollTop||n.scrollTop,i=Object.assign({},t.style),l=Object.assign({},n.style);return t.style.height="100%",t.style.overflow="hidden",n.style.top="-".concat(o,"px"),n.style.width="100%",n.style.height="auto",n.style.position="fixed",n.style.overflow=(null==e?void 0:e.overflowType)||"hidden",function(){t.style.height=i.height||"",t.style.overflow=i.overflow||"",["top","width","height","overflow","position"].forEach((function(e){n.style[e]=l[e]||""})),"scrollBehavior"in document.documentElement.style?window.scrollTo({top:o,behavior:"instant"}):window.scrollTo(0,o)}}(c):(d=document.documentElement,s=Object.assign({},d.style),u=window.innerWidth-d.clientWidth,a=parseInt(window.getComputedStyle(d).paddingRight,10),d.style.overflow="hidden",d.style.boxSizing="border-box",d.style.paddingRight="".concat(u+a,"px"),function(){["overflow","boxSizing","paddingRight"].forEach((function(e){d.style[e]=s[e]||""}))})),h.lockedNum+=1}},e.unlock=function(e,n){if(!t()){var o=r(n);o.lockedNum-=1,o.lockedNum>0||d(o)||(l(e).forEach((function(e){var t=o.lockedElements.indexOf(e);e&&-1!==t&&(e.ontouchmove=null,e.ontouchstart=null,o.lockedElements.splice(t,1))})),s(o))}}}));
;
(function($,Drupal){Drupal.theme.progressBar=function(id){const escapedId=Drupal.checkPlain(id);return (`<div id="${escapedId}" class="progress" aria-live="polite">`+'<div class="progress__label">&nbsp;</div>'+'<div class="progress__track"><div class="progress__bar"></div></div>'+'<div class="progress__percentage"></div>'+'<div class="progress__description">&nbsp;</div>'+'</div>');};Drupal.ProgressBar=function(id,updateCallback,method,errorCallback){this.id=id;this.method=method||'GET';this.updateCallback=updateCallback;this.errorCallback=errorCallback;this.element=$(Drupal.theme('progressBar',id));};$.extend(Drupal.ProgressBar.prototype,{setProgress(percentage,message,label){if(percentage>=0&&percentage<=100){$(this.element).find('div.progress__bar').each(function(){this.style.width=`${percentage}%`;});$(this.element).find('div.progress__percentage').html(`${percentage}%`);}$('div.progress__description',this.element).html(message);$('div.progress__label',this.element).html(label);if(this.updateCallback)this.updateCallback(percentage,message,this);},startMonitoring(uri,delay){this.delay=delay;this.uri=uri;this.sendPing();},stopMonitoring(){clearTimeout(this.timer);this.uri=null;},sendPing(){if(this.timer)clearTimeout(this.timer);if(this.uri){const pb=this;let uri=this.uri;if(!uri.includes('?'))uri+='?';else uri+='&';uri+='_format=json';$.ajax({type:this.method,url:uri,data:'',dataType:'json',success(progress){if(progress.status===0){pb.displayError(progress.data);return;}pb.setProgress(progress.percentage,progress.message,progress.label);pb.timer=setTimeout(()=>{pb.sendPing();},pb.delay);},error(xmlhttp){const e=new Drupal.AjaxError(xmlhttp,pb.uri);pb.displayError(`<pre>${e.message}</pre>`);}});}},displayError(string){const error=$('<div class="messages messages--error"></div>').html(string);$(this.element).before(error).hide();if(this.errorCallback)this.errorCallback(this);}});})(jQuery,Drupal);;
/* @license MIT https://raw.githubusercontent.com/muicss/loadjs/4.3.0/LICENSE.txt */
loadjs=function(){var h=function(){},o={},c={},f={};function u(e,n){if(e){var t=f[e];if(c[e]=n,t)for(;t.length;)t[0](e,n),t.splice(0,1)}}function l(e,n){e.call&&(e={success:e}),n.length?(e.error||h)(n):(e.success||h)(e)}function p(t,r,i,s){var o,e,u,n=document,c=i.async,f=(i.numRetries||0)+1,l=i.before||h,a=t.replace(/[\?|#].*$/,""),d=t.replace(/^(css|img|module|nomodule)!/,"");if(s=s||0,/(^css!|\.css$)/.test(a))(u=n.createElement("link")).rel="stylesheet",u.href=d,(o="hideFocus"in u)&&u.relList&&(o=0,u.rel="preload",u.as="style");else if(/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(a))(u=n.createElement("img")).src=d;else if((u=n.createElement("script")).src=d,u.async=void 0===c||c,e="noModule"in u,/^module!/.test(a)){if(!e)return r(t,"l");u.type="module"}else if(/^nomodule!/.test(a)&&e)return r(t,"l");!(u.onload=u.onerror=u.onbeforeload=function(e){var n=e.type[0];if(o)try{u.sheet.cssText.length||(n="e")}catch(e){18!=e.code&&(n="e")}if("e"==n){if((s+=1)<f)return p(t,r,i,s)}else if("preload"==u.rel&&"style"==u.as)return u.rel="stylesheet";r(t,n,e.defaultPrevented)})!==l(t,u)&&n.head.appendChild(u)}function t(e,n,t){var r,i;if(n&&n.trim&&(r=n),i=(r?t:n)||{},r){if(r in o)throw"LoadJS";o[r]=!0}function s(n,t){!function(e,r,n){var t,i,s=(e=e.push?e:[e]).length,o=s,u=[];for(t=function(e,n,t){if("e"==n&&u.push(e),"b"==n){if(!t)return;u.push(e)}--s||r(u)},i=0;i<o;i++)p(e[i],t,n)}(e,function(e){l(i,e),n&&l({success:n,error:t},e),u(r,e)},i)}if(i.returnPromise)return new Promise(s);s()}return t.ready=function(e,n){return function(e,t){e=e.push?e:[e];var n,r,i,s=[],o=e.length,u=o;for(n=function(e,n){n.length&&s.push(e),--u||t(s)};o--;)r=e[o],(i=c[r])?n(r,i):(f[r]=f[r]||[]).push(n)}(e,function(e){l(n,e)}),t},t.done=function(e){u(e,[])},t.reset=function(){o={},c={},f={}},t.isDefined=function(e){return e in o},t}();;
/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
Drupal.debounce=function(func,wait,immediate){let timeout;let result;return function(...args){const context=this;const later=function(){timeout=null;if(!immediate)result=func.apply(context,args);};const callNow=immediate&&!timeout;clearTimeout(timeout);timeout=setTimeout(later,wait);if(callNow)result=func.apply(context,args);return result;};};;
(function(Drupal,debounce){let liveElement;const announcements=[];Drupal.behaviors.drupalAnnounce={attach(context){if(!liveElement){liveElement=document.createElement('div');liveElement.id='drupal-live-announce';liveElement.className='visually-hidden';liveElement.setAttribute('aria-live','polite');liveElement.setAttribute('aria-busy','false');document.body.appendChild(liveElement);}}};function announce(){const text=[];let priority='polite';let announcement;const il=announcements.length;for(let i=0;i<il;i++){announcement=announcements.pop();text.unshift(announcement.text);if(announcement.priority==='assertive')priority='assertive';}if(text.length){liveElement.innerHTML='';liveElement.setAttribute('aria-busy','true');liveElement.setAttribute('aria-live',priority);liveElement.innerHTML=text.join('\n');liveElement.setAttribute('aria-busy','false');}}Drupal.announce=function(text,priority){announcements.push({text,priority});return debounce(announce,200)();};})(Drupal,Drupal.debounce);;
((Drupal)=>{Drupal.Message=class{constructor(messageWrapper=null){if(!messageWrapper)this.messageWrapper=Drupal.Message.defaultWrapper();else this.messageWrapper=messageWrapper;}static defaultWrapper(){let wrapper=document.querySelector('[data-drupal-messages]')||document.querySelector('[data-drupal-messages-fallback]');if(!wrapper){wrapper=document.createElement('div');document.body.appendChild(wrapper);}if(wrapper.hasAttribute('data-drupal-messages-fallback')){wrapper.removeAttribute('data-drupal-messages-fallback');wrapper.classList.remove('hidden');}wrapper.setAttribute('data-drupal-messages','');return wrapper.innerHTML===''?Drupal.Message.messageInternalWrapper(wrapper):wrapper.firstElementChild;}static getMessageTypeLabels(){return {status:Drupal.t('Status message'),error:Drupal.t('Error message'),warning:Drupal.t('Warning message')};}add(message,options={}){if(!options.hasOwnProperty('type'))options.type='status';if(typeof message!=='string')throw new Error('Message must be a string.');Drupal.Message.announce(message,options);options.id=options.id?String(options.id):`${options.type}-${Math.random().toFixed(15).replace('0.','')}`;if(!Drupal.Message.getMessageTypeLabels().hasOwnProperty(options.type)){const {type}=options;throw new Error(`The message type, ${type}, is not present in Drupal.Message.getMessageTypeLabels().`);}this.messageWrapper.appendChild(Drupal.theme('message',{text:message},options));return options.id;}select(id){return this.messageWrapper.querySelector(`[data-drupal-message-id^="${id}"]`);}remove(id){return this.messageWrapper.removeChild(this.select(id));}clear(){this.messageWrapper.querySelectorAll('[data-drupal-message-id]').forEach((message)=>{this.messageWrapper.removeChild(message);});}static announce(message,options){if(!options.priority&&(options.type==='warning'||options.type==='error'))options.priority='assertive';if(options.announce!=='')Drupal.announce(options.announce||message,options.priority);}static messageInternalWrapper(messageWrapper){const innerWrapper=document.createElement('div');innerWrapper.setAttribute('class','messages__wrapper');messageWrapper.insertAdjacentElement('afterbegin',innerWrapper);return innerWrapper;}};Drupal.theme.message=({text},{type,id})=>{const messagesTypes=Drupal.Message.getMessageTypeLabels();const messageWrapper=document.createElement('div');messageWrapper.setAttribute('class',`messages messages--${type}`);messageWrapper.setAttribute('role',type==='error'||type==='warning'?'alert':'status');messageWrapper.setAttribute('data-drupal-message-id',id);messageWrapper.setAttribute('data-drupal-message-type',type);messageWrapper.setAttribute('aria-label',messagesTypes[type]);messageWrapper.innerHTML=`${text}`;return messageWrapper;};})(Drupal);;
((Drupal)=>{Drupal.theme.message=({text},{type,id})=>{const messagesTypes=Drupal.Message.getMessageTypeLabels();const messageWrapper=document.createElement('div');messageWrapper.setAttribute('class',`messages messages--${type} messages-list__item`);messageWrapper.setAttribute('role',type==='error'||type==='warning'?'alert':'status');messageWrapper.setAttribute('aria-labelledby',`${id}-title`);messageWrapper.setAttribute('data-drupal-message-id',id);messageWrapper.setAttribute('data-drupal-message-type',type);messageWrapper.innerHTML=`
    <div class="messages__header">
      <h2 id="${id}-title" class="messages__title">
        ${messagesTypes[type]}
      </h2>
    </div>
    <div class="messages__content">
      ${text}
    </div>
  `;return messageWrapper;};})(Drupal);;
((Drupal,once)=>{Drupal.theme.message=(_ref,_ref2)=>{let {text}=_ref,{type,id}=_ref2;const messagesTypes=Drupal.Message.getMessageTypeLabels(),messageWrapper=document.createElement("div");return messageWrapper.setAttribute("class",`messages-list__item messages messages--${type}`),messageWrapper.setAttribute("role","error"===type||"warning"===type?"alert":"status"),messageWrapper.setAttribute("data-drupal-message-id",id),messageWrapper.setAttribute("data-drupal-message-type",type),messageWrapper.setAttribute("aria-label",messagesTypes[type]),messageWrapper.innerHTML=`\n    <div class="messages__header">\n      <h2 id="${id}-title" class="messages__title">\n        ${messagesTypes[type]}\n      </h2>\n    </div>\n    <div class="messages__content">\n      ${text}\n    </div>\n    <button type="button" class="button button--dismiss js-message-button-hide" title="${Drupal.t("Hide")}">\n      <span class="icon-close"></span>\n      ${Drupal.t("Hide")}\n    </button>\n  `,Drupal.ginMessages.dismissMessages(messageWrapper),messageWrapper;},Drupal.behaviors.ginMessages={attach:(context)=>{Drupal.ginMessages.dismissMessages(context);}},Drupal.ginMessages={dismissMessages:function(){let context=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;once("gin-messages-dismiss",".js-message-button-hide",context).forEach(((dismissButton)=>{dismissButton.addEventListener("click",((e)=>{e.preventDefault();const message=dismissButton.parentNode;message.classList.contains("messages-list__item")&&(message.style.opacity=0,message.classList.add("visually-hidden"));}));}));}};})(Drupal,once);;
(function($,window,Drupal,drupalSettings,loadjs,{isFocusable,tabbable}){Drupal.behaviors.AJAX={attach(context,settings){function loadAjaxBehavior(base){const elementSettings=settings.ajax[base];if(typeof elementSettings.selector==='undefined')elementSettings.selector=`#${base}`;once('drupal-ajax',$(elementSettings.selector)).forEach((el)=>{elementSettings.element=el;elementSettings.base=base;Drupal.ajax(elementSettings);});}Object.keys(settings.ajax||{}).forEach(loadAjaxBehavior);Drupal.ajax.bindAjaxLinks(document.body);once('ajax','.use-ajax-submit').forEach((el)=>{const elementSettings={};elementSettings.url=$(el.form).attr('action');elementSettings.setClick=true;elementSettings.event='click';elementSettings.progress={type:'throbber'};elementSettings.base=el.id;elementSettings.element=el;Drupal.ajax(elementSettings);});},detach(context,settings,trigger){if(trigger==='unload')Drupal.ajax.expired().forEach((instance)=>{Drupal.ajax.instances[instance.instanceIndex]=null;});}};Drupal.AjaxError=function(xmlhttp,uri,customMessage){let statusCode;let statusText;let responseText;if(xmlhttp.status)statusCode=`\n${Drupal.t('An AJAX HTTP error occurred.')}\n${Drupal.t('HTTP Result Code: !status',{'!status':xmlhttp.status})}`;else statusCode=`\n${Drupal.t('An AJAX HTTP request terminated abnormally.')}`;statusCode+=`\n${Drupal.t('Debugging information follows.')}`;const pathText=`\n${Drupal.t('Path: !uri',{'!uri':uri})}`;statusText='';try{statusText=`\n${Drupal.t('StatusText: !statusText',{'!statusText':xmlhttp.statusText.trim()})}`;}catch(e){}responseText='';try{responseText=`\n${Drupal.t('ResponseText: !responseText',{'!responseText':xmlhttp.responseText.trim()})}`;}catch(e){}responseText=responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi,'');responseText=responseText.replace(/[\n]+\s+/g,'\n');const readyStateText=xmlhttp.status===0?`\n${Drupal.t('ReadyState: !readyState',{'!readyState':xmlhttp.readyState})}`:'';customMessage=customMessage?`\n${Drupal.t('CustomMessage: !customMessage',{'!customMessage':customMessage})}`:'';this.message=statusCode+pathText+statusText+customMessage+responseText+readyStateText;this.name='AjaxError';if(!Drupal.AjaxError.messages)Drupal.AjaxError.messages=new Drupal.Message();Drupal.AjaxError.messages.add(Drupal.t("Oops, something went wrong. Check your browser's developer console for more details."),{type:'error'});};Drupal.AjaxError.prototype=new Error();Drupal.AjaxError.prototype.constructor=Drupal.AjaxError;Drupal.ajax=function(settings){if(arguments.length!==1)throw new Error('Drupal.ajax() function must be called with one configuration object only');const base=settings.base||false;const element=settings.element||false;delete settings.base;delete settings.element;if(!settings.progress&&!element)settings.progress=false;const ajax=new Drupal.Ajax(base,element,settings);ajax.instanceIndex=Drupal.ajax.instances.length;Drupal.ajax.instances.push(ajax);return ajax;};Drupal.ajax.instances=[];Drupal.ajax.expired=function(){return Drupal.ajax.instances.filter((instance)=>instance&&instance.element!==false&&!document.body.contains(instance.element));};Drupal.ajax.bindAjaxLinks=(element)=>{once('ajax','.use-ajax',element).forEach((ajaxLink)=>{const $linkElement=$(ajaxLink);const elementSettings={progress:{type:'throbber'},dialogType:$linkElement.data('dialog-type'),dialog:$linkElement.data('dialog-options'),dialogRenderer:$linkElement.data('dialog-renderer'),base:$linkElement.attr('id'),element:ajaxLink};const href=$linkElement.attr('href');if(href){elementSettings.url=href;elementSettings.event='click';}const httpMethod=$linkElement.data('ajax-http-method');if(httpMethod)elementSettings.httpMethod=httpMethod;Drupal.ajax(elementSettings);});};Drupal.Ajax=function(base,element,elementSettings){const defaults={httpMethod:'POST',event:element?'mousedown':null,keypress:true,selector:base?`#${base}`:null,effect:'none',speed:'none',method:'replaceWith',progress:{type:'throbber',message:Drupal.t('Processing...')},submit:{js:true}};$.extend(this,defaults,elementSettings);this.commands=new Drupal.AjaxCommands();this.instanceIndex=false;if(this.wrapper)this.wrapper=`#${this.wrapper}`;this.element=element;this.preCommandsFocusedElementSelector=null;this.elementSettings=elementSettings;if(this.element?.form)this.$form=$(this.element.form);if(!this.url){const $element=$(this.element);if(this.element.tagName==='A')this.url=$element.attr('href');else{if(this.element&&element.form)this.url=this.$form.attr('action');}}const originalUrl=this.url;this.url=this.url.replace(/\/nojs(\/|$|\?|#)/,'/ajax$1');if(drupalSettings.ajaxTrustedUrl[originalUrl])drupalSettings.ajaxTrustedUrl[this.url]=true;const ajax=this;ajax.options={url:ajax.url,data:ajax.submit,isInProgress(){return ajax.ajaxing;},beforeSerialize(elementSettings,options){return ajax.beforeSerialize(elementSettings,options);},beforeSubmit(formValues,elementSettings,options){ajax.ajaxing=true;ajax.preCommandsFocusedElementSelector=null;return ajax.beforeSubmit(formValues,elementSettings,options);},beforeSend(xmlhttprequest,options){ajax.ajaxing=true;return ajax.beforeSend(xmlhttprequest,options);},success(response,status,xmlhttprequest){ajax.preCommandsFocusedElementSelector=document.activeElement.getAttribute('data-drupal-selector');if(typeof response==='string')response=JSON.parse(response);if(response!==null&&!drupalSettings.ajaxTrustedUrl[ajax.url])if(xmlhttprequest.getResponseHeader('X-Drupal-Ajax-Token')!=='1'){const customMessage=Drupal.t('The response failed verification so will not be processed.');return ajax.error(xmlhttprequest,ajax.url,customMessage);}return (Promise.resolve(ajax.success(response,status)).then(()=>{ajax.ajaxing=false;$(document).trigger('ajaxSuccess',[xmlhttprequest,this]);$(document).trigger('ajaxComplete',[xmlhttprequest,this]);if(--$.active===0)$(document).trigger('ajaxStop');}));},error(xmlhttprequest,status,error){ajax.ajaxing=false;},complete(xmlhttprequest,status){if(status==='error'||status==='parsererror')return ajax.error(xmlhttprequest,ajax.url);},dataType:'json',jsonp:false,method:ajax.httpMethod};if(elementSettings.dialog)ajax.options.data.dialogOptions=elementSettings.dialog;if(!ajax.options.url.includes('?'))ajax.options.url+='?';else ajax.options.url+='&';let wrapper=`drupal_${elementSettings.dialogType||'ajax'}`;if(elementSettings.dialogRenderer)wrapper+=`.${elementSettings.dialogRenderer}`;ajax.options.url+=`${Drupal.ajax.WRAPPER_FORMAT}=${wrapper}`;$(ajax.element).on(elementSettings.event,function(event){if(!drupalSettings.ajaxTrustedUrl[ajax.url]&&!Drupal.url.isLocal(ajax.url))throw new Error(Drupal.t('The callback URL is not local and not trusted: !url',{'!url':ajax.url}));return ajax.eventResponse(this,event);});if(elementSettings.keypress)$(ajax.element).on('keypress',function(event){return ajax.keypressResponse(this,event);});if(elementSettings.prevent)$(ajax.element).on(elementSettings.prevent,false);};Drupal.ajax.WRAPPER_FORMAT='_wrapper_format';Drupal.Ajax.AJAX_REQUEST_PARAMETER='_drupal_ajax';Drupal.Ajax.prototype.execute=function(){if(this.ajaxing)return;try{this.beforeSerialize(this.element,this.options);return $.ajax(this.options);}catch(e){this.ajaxing=false;window.alert(`An error occurred while attempting to process ${this.options.url}: ${e.message}`);return $.Deferred().reject();}};Drupal.Ajax.prototype.keypressResponse=function(element,event){const ajax=this;if(event.which===13||(event.which===32&&element.type!=='text'&&element.type!=='textarea'&&element.type!=='tel'&&element.type!=='number')){event.preventDefault();event.stopPropagation();$(element).trigger(ajax.elementSettings.event);}};Drupal.Ajax.prototype.eventResponse=function(element,event){event.preventDefault();event.stopPropagation();const ajax=this;if(ajax.ajaxing)return;try{if(ajax.$form){if(ajax.setClick)element.form.clk=element;ajax.$form.ajaxSubmit(ajax.options);}else{ajax.beforeSerialize(ajax.element,ajax.options);$.ajax(ajax.options);}}catch(e){ajax.ajaxing=false;window.alert(`An error occurred while attempting to process ${ajax.options.url}: ${e.message}`);}};Drupal.Ajax.prototype.beforeSerialize=function(element,options){if(this.$form&&document.body.contains(this.$form.get(0))){const settings=this.settings||drupalSettings;Drupal.detachBehaviors(this.$form.get(0),settings,'serialize');}options.data[Drupal.Ajax.AJAX_REQUEST_PARAMETER]=1;const pageState=drupalSettings.ajaxPageState;options.data['ajax_page_state[theme]']=pageState.theme;options.data['ajax_page_state[theme_token]']=pageState.theme_token;options.data['ajax_page_state[libraries]']=pageState.libraries;};Drupal.Ajax.prototype.beforeSubmit=function(formValues,element,options){};Drupal.Ajax.prototype.beforeSend=function(xmlhttprequest,options){if(this.$form){options.extraData=options.extraData||{};options.extraData.ajax_iframe_upload='1';const v=$.fieldValue(this.element);if(v!==null)options.extraData[this.element.name]=v;}$(this.element).prop('disabled',true);if(!this.progress||!this.progress.type)return;const progressIndicatorMethod=`setProgressIndicator${this.progress.type.slice(0,1).toUpperCase()}${this.progress.type.slice(1).toLowerCase()}`;if(progressIndicatorMethod in this&&typeof this[progressIndicatorMethod]==='function')this[progressIndicatorMethod].call(this);};Drupal.theme.ajaxProgressThrobber=(message)=>{const messageMarkup=typeof message==='string'?Drupal.theme('ajaxProgressMessage',message):'';const throbber='<div class="throbber">&nbsp;</div>';return `<div class="ajax-progress ajax-progress-throbber">${throbber}${messageMarkup}</div>`;};Drupal.theme.ajaxProgressIndicatorFullscreen=()=>'<div class="ajax-progress ajax-progress-fullscreen">&nbsp;</div>';Drupal.theme.ajaxProgressMessage=(message)=>`<div class="message">${message}</div>`;Drupal.theme.ajaxProgressBar=($element)=>$('<div class="ajax-progress ajax-progress-bar"></div>').append($element);Drupal.Ajax.prototype.setProgressIndicatorBar=function(){const progressBar=new Drupal.ProgressBar(`ajax-progress-${this.element.id}`,$.noop,this.progress.method,$.noop);if(this.progress.message)progressBar.setProgress(-1,this.progress.message);if(this.progress.url)progressBar.startMonitoring(this.progress.url,this.progress.interval||1500);this.progress.element=$(Drupal.theme('ajaxProgressBar',progressBar.element));this.progress.object=progressBar;$(this.element).after(this.progress.element);};Drupal.Ajax.prototype.setProgressIndicatorThrobber=function(){this.progress.element=$(Drupal.theme('ajaxProgressThrobber',this.progress.message));if($(this.element).closest('[data-drupal-ajax-container]').length)$(this.element).closest('[data-drupal-ajax-container]').after(this.progress.element);else $(this.element).after(this.progress.element);};Drupal.Ajax.prototype.setProgressIndicatorFullscreen=function(){this.progress.element=$(Drupal.theme('ajaxProgressIndicatorFullscreen'));$('body').append(this.progress.element);};Drupal.Ajax.prototype.commandExecutionQueue=function(response,status){const ajaxCommands=this.commands;return Object.keys(response||{}).reduce((executionQueue,key)=>executionQueue.then(()=>{const {command}=response[key];if(command&&ajaxCommands[command])return ajaxCommands[command](this,response[key],status);}),Promise.resolve());};Drupal.Ajax.prototype.success=function(response,status){if(this.progress.element)$(this.progress.element).remove();if(this.progress.object)this.progress.object.stopMonitoring();$(this.element).prop('disabled',false);const elementParents=$(this.element).parents('[data-drupal-selector]').addBack().toArray();const focusChanged=Object.keys(response||{}).some((key)=>{const {command,method}=response[key];return (command==='focusFirst'||command==='openDialog'||(command==='invoke'&&method==='focus'));});return (this.commandExecutionQueue(response,status).then(()=>{if(!focusChanged){let target=false;if(this.element){if($(this.element).data('refocus-blur')&&this.preCommandsFocusedElementSelector)target=document.querySelector(`[data-drupal-selector="${this.preCommandsFocusedElementSelector}"]`);if(!target&&!$(this.element).data('disable-refocus')){for(let n=elementParents.length-1;!target&&n>=0;n--)target=document.querySelector(`[data-drupal-selector="${elementParents[n].getAttribute('data-drupal-selector')}"]`);}}if(target)$(target).trigger('focus');}if(this.$form&&document.body.contains(this.$form.get(0))){const settings=this.settings||drupalSettings;Drupal.attachBehaviors(this.$form.get(0),settings);}this.settings=null;}).catch((error)=>console.error(Drupal.t('An error occurred during the execution of the Ajax response: !error',{'!error':error}))));};Drupal.Ajax.prototype.getEffect=function(response){const type=response.effect||this.effect;const speed=response.speed||this.speed;const effect={};if(type==='none'){effect.showEffect='show';effect.hideEffect='hide';effect.showSpeed='';}else if(type==='fade'){effect.showEffect='fadeIn';effect.hideEffect='fadeOut';effect.showSpeed=speed;}else{effect.showEffect=`${type}Toggle`;effect.hideEffect=`${type}Toggle`;effect.showSpeed=speed;}return effect;};Drupal.Ajax.prototype.error=function(xmlhttprequest,uri,customMessage){if(this.progress.element)$(this.progress.element).remove();if(this.progress.object)this.progress.object.stopMonitoring();$(this.wrapper).show();$(this.element).prop('disabled',false);if(this.$form&&document.body.contains(this.$form.get(0))){const settings=this.settings||drupalSettings;Drupal.attachBehaviors(this.$form.get(0),settings);}throw new Drupal.AjaxError(xmlhttprequest,uri,customMessage);};Drupal.theme.ajaxWrapperNewContent=($newContent,ajax,response)=>(response.effect||ajax.effect)!=='none'&&$newContent.filter((i)=>!(($newContent[i].nodeName==='#comment'||($newContent[i].nodeName==='#text'&&/^(\s|\n|\r)*$/.test($newContent[i].textContent))))).length>1?Drupal.theme('ajaxWrapperMultipleRootElements',$newContent):$newContent;Drupal.theme.ajaxWrapperMultipleRootElements=($elements)=>$('<div></div>').append($elements);Drupal.AjaxCommands=function(){};Drupal.AjaxCommands.prototype={insert(ajax,response){const $wrapper=response.selector?$(response.selector):$(ajax.wrapper);const method=response.method||ajax.method;const effect=ajax.getEffect(response);const settings=response.settings||ajax.settings||drupalSettings;const parseHTML=(htmlString)=>{const fragment=document.createDocumentFragment();const template=fragment.appendChild(document.createElement('template'));template.innerHTML=htmlString;return template.content.childNodes;};let $newContent=$(parseHTML(response.data));$newContent=Drupal.theme('ajaxWrapperNewContent',$newContent,ajax,response);switch(method){case 'html':case 'replaceWith':case 'replaceAll':case 'empty':case 'remove':Drupal.detachBehaviors($wrapper.get(0),settings);break;default:break;}$wrapper[method]($newContent);if(effect.showEffect!=='show')$newContent.hide();const $ajaxNewContent=$newContent.find('.ajax-new-content');if($ajaxNewContent.length){$ajaxNewContent.hide();$newContent.show();$ajaxNewContent[effect.showEffect](effect.showSpeed);}else{if(effect.showEffect!=='show')$newContent[effect.showEffect](effect.showSpeed);}$newContent.each((index,element)=>{if(element.nodeType===Node.ELEMENT_NODE&&document.documentElement.contains(element))Drupal.attachBehaviors(element,settings);});},remove(ajax,response,status){const settings=response.settings||ajax.settings||drupalSettings;$(response.selector).each(function(){Drupal.detachBehaviors(this,settings);}).remove();},changed(ajax,response,status){const $element=$(response.selector);if(!$element.hasClass('ajax-changed')){$element.addClass('ajax-changed');if(response.asterisk)$element.find(response.asterisk).append(` <abbr class="ajax-changed" title="${Drupal.t('Changed')}">*</abbr> `);}},alert(ajax,response,status){window.alert(response.text);},announce(ajax,response){if(response.priority)Drupal.announce(response.text,response.priority);else Drupal.announce(response.text);},redirect(ajax,response,status){window.location=response.url;},css(ajax,response,status){$(response.selector).css(response.argument);},settings(ajax,response,status){const ajaxSettings=drupalSettings.ajax;if(ajaxSettings)Drupal.ajax.expired().forEach((instance)=>{if(instance.selector){const selector=instance.selector.replace('#','');if(selector in ajaxSettings)delete ajaxSettings[selector];}});if(response.merge)$.extend(true,drupalSettings,response.settings);else ajax.settings=response.settings;},data(ajax,response,status){$(response.selector).data(response.name,response.value);},focusFirst(ajax,response,status){let focusChanged=false;const container=document.querySelector(response.selector);if(container){const tabbableElements=tabbable(container);if(tabbableElements.length){tabbableElements[0].focus();focusChanged=true;}else{if(isFocusable(container)){container.focus();focusChanged=true;}}}if(ajax.hasOwnProperty('element')&&!focusChanged)ajax.element.focus();},invoke(ajax,response,status){const $element=$(response.selector);$element[response.method](...response.args);},restripe(ajax,response,status){$(response.selector).find('> tbody > tr:visible, > tr:visible').removeClass('odd even').filter(':even').addClass('odd').end().filter(':odd').addClass('even');},update_build_id(ajax,response,status){document.querySelectorAll(`input[name="form_build_id"][value="${response.old}"]`).forEach((item)=>{item.value=response.new;});},add_css(ajax,response,status){const allUniqueBundleIds=response.data.map(function(style){const uniqueBundleId=style.href;if(!loadjs.isDefined(uniqueBundleId))loadjs(`css!${style.href}`,uniqueBundleId,{before(path,styleEl){Object.keys(style).forEach((attributeKey)=>{styleEl.setAttribute(attributeKey,style[attributeKey]);});}});return uniqueBundleId;});return new Promise((resolve,reject)=>{loadjs.ready(allUniqueBundleIds,{success(){resolve();},error(depsNotFound){const message=Drupal.t(`The following files could not be loaded: @dependencies`,{'@dependencies':depsNotFound.join(', ')});reject(message);}});});},message(ajax,response){const messages=new Drupal.Message(document.querySelector(response.messageWrapperQuerySelector));if(response.clearPrevious)messages.clear();messages.add(response.message,response.messageOptions);},add_js(ajax,response,status){const parentEl=document.querySelector(response.selector||'body');const settings=ajax.settings||drupalSettings;const allUniqueBundleIds=response.data.map((script)=>{const uniqueBundleId=script.src;if(!loadjs.isDefined(uniqueBundleId))loadjs(script.src,uniqueBundleId,{async:false,before(path,scriptEl){Object.keys(script).forEach((attributeKey)=>{scriptEl.setAttribute(attributeKey,script[attributeKey]);});parentEl.appendChild(scriptEl);return false;}});return uniqueBundleId;});return new Promise((resolve,reject)=>{loadjs.ready(allUniqueBundleIds,{success(){Drupal.attachBehaviors(parentEl,settings);resolve();},error(depsNotFound){const message=Drupal.t(`The following files could not be loaded: @dependencies`,{'@dependencies':depsNotFound.join(', ')});reject(message);}});});},scrollTop(ajax,response){const offset=$(response.selector).offset();let scrollTarget=response.selector;while($(scrollTarget).scrollTop()===0&&$(scrollTarget).parent())scrollTarget=$(scrollTarget).parent();if(offset.top-10<$(scrollTarget).scrollTop())scrollTarget.get(0).scrollTo({top:offset.top-10,behavior:'smooth'});}};const stopEvent=(xhr,settings)=>{return (xhr.getResponseHeader('X-Drupal-Ajax-Token')==='1'&&typeof settings.isInProgress==='function'&&settings.isInProgress());};$.extend(true,$.event.special,{ajaxSuccess:{trigger(event,xhr,settings){if(stopEvent(xhr,settings))return false;}},ajaxComplete:{trigger(event,xhr,settings){if(stopEvent(xhr,settings)){$.active++;return false;}}}});})(jQuery,window,Drupal,drupalSettings,loadjs,window.tabbable);;
((Drupal)=>{Drupal.theme.ajaxProgressIndicatorFullscreen=()=>'<div class="ajax-progress ajax-progress--fullscreen"><div class="ajax-progress__throbber ajax-progress__throbber--fullscreen">&nbsp;</div></div>';Drupal.theme.ajaxProgressThrobber=(message)=>{const messageMarkup=typeof message==='string'?Drupal.theme('ajaxProgressMessage',message):'';const throbber='<div class="ajax-progress__throbber">&nbsp;</div>';return `<div class="ajax-progress ajax-progress--throbber">${throbber}${messageMarkup}</div>`;};Drupal.theme.ajaxProgressMessage=(message)=>`<div class="ajax-progress__message">${message}</div>`;})(Drupal);;
((Drupal,drupalSettings)=>{const replacementsSelector=`script[data-big-pipe-replacement-for-placeholder-with-id]`;const ajaxObject=Drupal.ajax({url:'',base:false,element:false,progress:false});function mapTextContentToAjaxResponse(content){if(content==='')return false;try{return JSON.parse(content);}catch(e){return false;}}function processReplacement(replacement){const id=replacement.dataset.bigPipeReplacementForPlaceholderWithId;const content=replacement.textContent.trim();if(typeof drupalSettings.bigPipePlaceholderIds[id]==='undefined')return;const response=mapTextContentToAjaxResponse(content);if(response===false)return;delete drupalSettings.bigPipePlaceholderIds[id];ajaxObject.success(response,'success');}function checkMutation(node){return Boolean(node.nodeType===Node.ELEMENT_NODE&&node.nodeName==='SCRIPT'&&node.dataset?.bigPipeReplacementForPlaceholderWithId&&typeof drupalSettings.bigPipePlaceholderIds[node.dataset.bigPipeReplacementForPlaceholderWithId]!=='undefined');}function checkMutationAndProcess(node){if(checkMutation(node))processReplacement(node);else{if(node.parentNode!==null&&checkMutation(node.parentNode))processReplacement(node.parentNode);}}function processMutations(mutations){mutations.forEach(({addedNodes,type,target})=>{addedNodes.forEach(checkMutationAndProcess);if(type==='characterData'&&checkMutation(target.parentNode)&&drupalSettings.bigPipePlaceholderIds[target.parentNode.dataset.bigPipeReplacementForPlaceholderWithId]===true)processReplacement(target.parentNode);});}const observer=new MutationObserver(processMutations);Drupal.attachBehaviors(document);document.querySelectorAll(replacementsSelector).forEach(processReplacement);observer.observe(document.body,{childList:true,subtree:true,characterData:true});window.addEventListener('DOMContentLoaded',()=>{const mutations=observer.takeRecords();observer.disconnect();if(mutations.length)processMutations(mutations);Drupal.ajax.instances[ajaxObject.instanceIndex]=null;});})(Drupal,drupalSettings);;
(($)=>{let cachedScrollbarWidth=null;const {max,abs}=Math;const regexHorizontal=/left|center|right/;const regexVertical=/top|center|bottom/;const regexOffset=/[+-]\d+(\.[\d]+)?%?/;const regexPosition=/^\w+/;const _position=$.fn.position;function getOffsets(offsets,width,height){return [parseFloat(offsets[0])*(typeof offsets[0]==='string'&&offsets[0].endsWith('%')?width/100:1),parseFloat(offsets[1])*(typeof offsets[1]==='string'&&offsets[1].endsWith('%')?height/100:1)];}function parseCss(element,property){return parseInt(window.getComputedStyle(element)[property],10)||0;}function getDimensions(elem){const raw=elem[0];if(raw.nodeType===Node.DOCUMENT_NODE)return {width:elem.width(),height:elem.height(),offset:{top:0,left:0}};if(!!raw&&raw===raw.window)return {width:elem.width(),height:elem.height(),offset:{top:elem.scrollTop(),left:elem.scrollLeft()}};if(raw.preventDefault)return {width:0,height:0,offset:{top:raw.pageY,left:raw.pageX}};return {width:elem.outerWidth(),height:elem.outerHeight(),offset:elem.offset()};}const collisions={fit:{left(position,data){const {within}=data;const withinOffset=within.isWindow?within.scrollLeft:within.offset.left;const outerWidth=within.width;const collisionPosLeft=position.left-data.collisionPosition.marginLeft;const overLeft=withinOffset-collisionPosLeft;const overRight=collisionPosLeft+data.collisionWidth-outerWidth-withinOffset;let newOverRight;if(data.collisionWidth>outerWidth)if(overLeft>0&&overRight<=0){newOverRight=position.left+overLeft+data.collisionWidth-outerWidth-withinOffset;position.left+=overLeft-newOverRight;}else if(overRight>0&&overLeft<=0)position.left=withinOffset;else if(overLeft>overRight)position.left=withinOffset+outerWidth-data.collisionWidth;else position.left=withinOffset;else if(overLeft>0)position.left+=overLeft;else if(overRight>0)position.left-=overRight;else position.left=max(position.left-collisionPosLeft,position.left);},top(position,data){const {within}=data;const withinOffset=within.isWindow?within.scrollTop:within.offset.top;const outerHeight=data.within.height;const collisionPosTop=position.top-data.collisionPosition.marginTop;const overTop=withinOffset-collisionPosTop;const overBottom=collisionPosTop+data.collisionHeight-outerHeight-withinOffset;let newOverBottom;if(data.collisionHeight>outerHeight)if(overTop>0&&overBottom<=0){newOverBottom=position.top+overTop+data.collisionHeight-outerHeight-withinOffset;position.top+=overTop-newOverBottom;}else if(overBottom>0&&overTop<=0)position.top=withinOffset;else if(overTop>overBottom)position.top=withinOffset+outerHeight-data.collisionHeight;else position.top=withinOffset;else if(overTop>0)position.top+=overTop;else if(overBottom>0)position.top-=overBottom;else position.top=max(position.top-collisionPosTop,position.top);}},flip:{left(position,data){const {within}=data;const withinOffset=within.offset.left+within.scrollLeft;const outerWidth=within.width;const offsetLeft=within.isWindow?within.scrollLeft:within.offset.left;const collisionPosLeft=position.left-data.collisionPosition.marginLeft;const overLeft=collisionPosLeft-offsetLeft;const overRight=collisionPosLeft+data.collisionWidth-outerWidth-offsetLeft;const myOffset=data.my[0]==='left'?-data.elemWidth:data.my[0]==='right'?data.elemWidth:0;const atOffset=data.at[0]==='left'?data.targetWidth:data.at[0]==='right'?-data.targetWidth:0;const offset=-2*data.offset[0];let newOverRight;let newOverLeft;if(overLeft<0){newOverRight=position.left+myOffset+atOffset+offset+data.collisionWidth-outerWidth-withinOffset;if(newOverRight<0||newOverRight<abs(overLeft))position.left+=myOffset+atOffset+offset;}else{if(overRight>0){newOverLeft=position.left-data.collisionPosition.marginLeft+myOffset+atOffset+offset-offsetLeft;if(newOverLeft>0||abs(newOverLeft)<overRight)position.left+=myOffset+atOffset+offset;}}},top(position,data){const {within}=data;const withinOffset=within.offset.top+within.scrollTop;const outerHeight=within.height;const offsetTop=within.isWindow?within.scrollTop:within.offset.top;const collisionPosTop=position.top-data.collisionPosition.marginTop;const overTop=collisionPosTop-offsetTop;const overBottom=collisionPosTop+data.collisionHeight-outerHeight-offsetTop;const top=data.my[1]==='top';const myOffset=top?-data.elemHeight:data.my[1]==='bottom'?data.elemHeight:0;const atOffset=data.at[1]==='top'?data.targetHeight:data.at[1]==='bottom'?-data.targetHeight:0;const offset=-2*data.offset[1];let newOverTop;let newOverBottom;if(overTop<0){newOverBottom=position.top+myOffset+atOffset+offset+data.collisionHeight-outerHeight-withinOffset;if(newOverBottom<0||newOverBottom<abs(overTop))position.top+=myOffset+atOffset+offset;}else{if(overBottom>0){newOverTop=position.top-data.collisionPosition.marginTop+myOffset+atOffset+offset-offsetTop;if(newOverTop>0||abs(newOverTop)<overBottom)position.top+=myOffset+atOffset+offset;}}}},flipfit:{left(...args){collisions.flip.left.apply(this,args);collisions.fit.left.apply(this,args);},top(...args){collisions.flip.top.apply(this,args);collisions.fit.top.apply(this,args);}}};$.position={scrollbarWidth(){if(cachedScrollbarWidth!==undefined)return cachedScrollbarWidth;const div=$('<div '+"style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>"+"<div style='height:100px;width:auto;'></div></div>");const innerDiv=div.children()[0];$('body').append(div);const w1=innerDiv.offsetWidth;div[0].style.overflow='scroll';let w2=innerDiv.offsetWidth;if(w1===w2)w2=div[0].clientWidth;div.remove();cachedScrollbarWidth=w1-w2;return cachedScrollbarWidth;},getScrollInfo(within){const overflowX=within.isWindow||within.isDocument?'':window.getComputedStyle(within.element[0])['overflow-x'];const overflowY=within.isWindow||within.isDocument?'':window.getComputedStyle(within.element[0])['overflow-y'];const hasOverflowX=overflowX==='scroll'||(overflowX==='auto'&&within.width<within.element[0].scrollWidth);const hasOverflowY=overflowY==='scroll'||(overflowY==='auto'&&within.height<within.element[0].scrollHeight);return {width:hasOverflowY?$.position.scrollbarWidth():0,height:hasOverflowX?$.position.scrollbarWidth():0};},getWithinInfo(element){const withinElement=$(element||window);const isWindow=!!withinElement[0]&&withinElement[0]===withinElement[0].window;const isDocument=!!withinElement[0]&&withinElement[0].nodeType===Node.DOCUMENT_NODE;const hasOffset=!isWindow&&!isDocument;return {element:withinElement,isWindow,isDocument,offset:hasOffset?$(element).offset():{left:0,top:0},scrollLeft:withinElement.scrollLeft(),scrollTop:withinElement.scrollTop(),width:withinElement.outerWidth(),height:withinElement.outerHeight()};}};$.fn.position=function(options){if(!options||!options.of)return _position.apply(this,arguments);options=$.extend({},options);const within=$.position.getWithinInfo(options.within);const scrollInfo=$.position.getScrollInfo(within);const collision=(options.collision||'flip').split(' ');const offsets={};const target=typeof options.of==='string'?$(document).find(options.of):$(options.of);const dimensions=getDimensions(target);const targetWidth=dimensions.width;const targetHeight=dimensions.height;const targetOffset=dimensions.offset;if(target[0].preventDefault)options.at='left top';const basePosition=$.extend({},targetOffset);$.each(['my','at'],function(){let pos=(options[this]||'').split(' ');if(pos.length===1)pos=regexHorizontal.test(pos[0])?pos.concat(['center']):regexVertical.test(pos[0])?['center'].concat(pos):['center','center'];pos[0]=regexHorizontal.test(pos[0])?pos[0]:'center';pos[1]=regexVertical.test(pos[1])?pos[1]:'center';const horizontalOffset=regexOffset.exec(pos[0]);const verticalOffset=regexOffset.exec(pos[1]);offsets[this]=[horizontalOffset?horizontalOffset[0]:0,verticalOffset?verticalOffset[0]:0];options[this]=[regexPosition.exec(pos[0])[0],regexPosition.exec(pos[1])[0]];});if(collision.length===1)collision[1]=collision[0];if(options.at[0]==='right')basePosition.left+=targetWidth;else{if(options.at[0]==='center')basePosition.left+=targetWidth/2;}if(options.at[1]==='bottom')basePosition.top+=targetHeight;else{if(options.at[1]==='center')basePosition.top+=targetHeight/2;}const atOffset=getOffsets(offsets.at,targetWidth,targetHeight);basePosition.left+=atOffset[0];basePosition.top+=atOffset[1];return this.each(function(){let using;const elem=$(this);const elemWidth=elem.outerWidth();const elemHeight=elem.outerHeight();const marginLeft=parseCss(this,'marginLeft');const marginTop=parseCss(this,'marginTop');const collisionWidth=elemWidth+marginLeft+parseCss(this,'marginRight')+scrollInfo.width;const collisionHeight=elemHeight+marginTop+parseCss(this,'marginBottom')+scrollInfo.height;const position=$.extend({},basePosition);const myOffset=getOffsets(offsets.my,elem.outerWidth(),elem.outerHeight());if(options.my[0]==='right')position.left-=elemWidth;else{if(options.my[0]==='center')position.left-=elemWidth/2;}if(options.my[1]==='bottom')position.top-=elemHeight;else{if(options.my[1]==='center')position.top-=elemHeight/2;}position.left+=myOffset[0];position.top+=myOffset[1];const collisionPosition={marginLeft,marginTop};$.each(['left','top'],function(i,dir){if(collisions[collision[i]])collisions[collision[i]][dir](position,{targetWidth,targetHeight,elemWidth,elemHeight,collisionPosition,collisionWidth,collisionHeight,offset:[atOffset[0]+myOffset[0],atOffset[1]+myOffset[1]],my:options.my,at:options.at,within,elem});});if(options.using)using=function(props){const left=targetOffset.left-position.left;const right=left+targetWidth-elemWidth;const top=targetOffset.top-position.top;const bottom=top+targetHeight-elemHeight;const feedback={target:{element:target,left:targetOffset.left,top:targetOffset.top,width:targetWidth,height:targetHeight},element:{element:elem,left:position.left,top:position.top,width:elemWidth,height:elemHeight},horizontal:right<0?'left':left>0?'right':'center',vertical:bottom<0?'top':top>0?'bottom':'middle'};if(targetWidth<elemWidth&&abs(left+right)<targetWidth)feedback.horizontal='center';if(targetHeight<elemHeight&&abs(top+bottom)<targetHeight)feedback.vertical='middle';if(max(abs(left),abs(right))>max(abs(top),abs(bottom)))feedback.important='horizontal';else feedback.important='vertical';options.using.call(this,props,feedback);};elem.offset($.extend(position,{using}));});};if(!$.hasOwnProperty('ui'))$.ui={};$.ui.position=collisions;})(jQuery);;
(($,Drupal,once)=>{Drupal.behaviors.claroAutoCompete={attach(context){once('claroAutoComplete','input.form-autocomplete',context).forEach((value)=>{const $input=$(value);const classRemove=($autoCompleteElem)=>{$autoCompleteElem.removeClass('is-autocompleting');$autoCompleteElem.siblings('[data-drupal-selector="autocomplete-message"]').addClass('hidden');};$input.autocomplete({search(event){const result=Drupal.autocomplete.options.search(event);if(result){$(event.target).addClass('is-autocompleting');$(event.target).siblings('[data-drupal-selector="autocomplete-message"]').removeClass('hidden');}return result;},response(event){classRemove($(event.target));}});});}};})(jQuery,Drupal,once);;
(function($,Drupal,drupalSettings,DrupalCoffee){'use strict';var proto=$.ui.autocomplete.prototype;var initSource=proto._initSource;function filter(array,term){var matcher=new RegExp($.ui.autocomplete.escapeRegex(term),'i');return $.grep(array,function(value){return matcher.test(value.command)||matcher.test(value.label)||matcher.test(value.value);});}$.extend(proto,{_initSource:function(){if(Array.isArray(this.options.source))this.source=function(request,response){response(filter(this.options.source,request.term));};else initSource.call(this);}});DrupalCoffee=DrupalCoffee||{};Drupal.behaviors.coffee={attach:function(context){const body=once('coffee','body',context);body.forEach((body)=>{var $body=$(body);DrupalCoffee.bg.appendTo($body).hide();DrupalCoffee.wrapper.appendTo('body').addClass('hide-form');DrupalCoffee.form.append(DrupalCoffee.label).append(DrupalCoffee.field).append(DrupalCoffee.results).wrapInner('<div id="coffee-form-inner" />').appendTo(DrupalCoffee.wrapper);DrupalCoffee.dataset=[];DrupalCoffee.isItemSelected=false;$('.toolbar-icon-coffee').click(function(event){event.preventDefault();DrupalCoffee.coffee_show();});$(document).keydown(function(event){if(DrupalCoffee.wrapper.hasClass('hide-form')&&event.altKey===true&&(event.keyCode===68||event.keyCode===206||event.keyCode===75)){DrupalCoffee.coffee_show();event.preventDefault();}else{if(!DrupalCoffee.wrapper.hasClass('hide-form')&&(event.keyCode===27||(event.altKey===true&&(event.keyCode===68||event.keyCode===206)))){DrupalCoffee.coffee_close();event.preventDefault();}}});});}};DrupalCoffee.coffee_initialize_search_box=function(){if(DrupalCoffee.dataset.length!==0)return;var autocomplete_data_element='ui-autocomplete';var url;if(drupalSettings.coffee.dataPath)url=drupalSettings.coffee.dataPath;else url=Drupal.url('admin/coffee/get-data');$.ajax({url,dataType:'json',success:function(data){DrupalCoffee.dataset=data;var $autocomplete=$(DrupalCoffee.field).autocomplete({source:DrupalCoffee.dataset,focus:function(event,ui){DrupalCoffee.isItemSelected=true;event.preventDefault();},change:function(event,ui){DrupalCoffee.isItemSelected=false;},select:function(event,ui){DrupalCoffee.redirect(ui.item.value,event.metaKey||event.ctrlKey);event.preventDefault();return false;},delay:0,appendTo:DrupalCoffee.results});$autocomplete.data(autocomplete_data_element)._renderItem=function(ul,item){var description=item.value;if(item.value.indexOf(drupalSettings.path.basePath)===0)description=item.value.substring(drupalSettings.path.basePath.length);return $('<li></li>').data('item.autocomplete',item).append('<a>'+item.label+'<small class="description">'+description+'</small></a>').appendTo(ul);};$(DrupalCoffee.field).data(autocomplete_data_element)._renderMenu=function(ul,items){var self=this;items=items.slice(0,drupalSettings.coffee.maxResults);$.each(items,function(index,item){self._renderItemData(ul,item);});};DrupalCoffee.form.keydown(function(event){if(event.keyCode===13){var openInNewWindow=false;if(event.metaKey||event.ctrlKey)openInNewWindow=true;if(!DrupalCoffee.isItemSelected){var $firstItem=$(DrupalCoffee.results).find('li:first').data('item.autocomplete');if(typeof $firstItem==='object'){DrupalCoffee.redirect($firstItem.value,openInNewWindow);event.preventDefault();}}}});},error:function(){DrupalCoffee.field.val('Could not load data, please refresh the page');}});};DrupalCoffee.coffee_show=function(){DrupalCoffee.coffee_initialize_search_box();DrupalCoffee.wrapper.removeClass('hide-form');DrupalCoffee.bg.show();DrupalCoffee.field.focus();$(DrupalCoffee.field).autocomplete({enable:true});};DrupalCoffee.coffee_close=function(){DrupalCoffee.field.val('');DrupalCoffee.wrapper.addClass('hide-form');DrupalCoffee.bg.hide();$(DrupalCoffee.field).autocomplete({enable:false});};DrupalCoffee.redirect=function(path,openInNewWindow){DrupalCoffee.coffee_close();if(openInNewWindow)window.open(path);else document.location=path;};DrupalCoffee.label=$('<label for="coffee-q" class="visually-hidden" />').text(Drupal.t('Query','',''));DrupalCoffee.results=$('<div id="coffee-results" />');DrupalCoffee.wrapper=$('<div class="coffee-form-wrapper" />');DrupalCoffee.form=$('<form id="coffee-form" action="#" />');DrupalCoffee.bg=$('<div id="coffee-bg" />').click(function(){DrupalCoffee.coffee_close();});DrupalCoffee.field=$('<input id="coffee-q" type="text" autocomplete="off" />');})(jQuery,Drupal,drupalSettings);;
(function(Drupal,drupalSettings){Drupal.behaviors.activeLinks={attach(context){const path=drupalSettings.path;const queryString=JSON.stringify(path.currentQuery);const querySelector=queryString?`[data-drupal-link-query="${CSS.escape(queryString)}"]`:':not([data-drupal-link-query])';const originalSelectors=[`[data-drupal-link-system-path="${CSS.escape(path.currentPath)}"]`];let selectors;if(path.isFront)originalSelectors.push('[data-drupal-link-system-path="<front>"]');selectors=[].concat(originalSelectors.map((selector)=>`${selector}:not([hreflang])`),originalSelectors.map((selector)=>`${selector}[hreflang="${path.currentLanguage}"]`));selectors=selectors.map((current)=>current+querySelector);const activeLinks=context.querySelectorAll(selectors.join(','));const il=activeLinks.length;for(let i=0;i<il;i++){activeLinks[i].classList.add('is-active');activeLinks[i].setAttribute('aria-current','page');}},detach(context,settings,trigger){if(trigger==='unload'){const activeLinks=context.querySelectorAll('[data-drupal-link-system-path].is-active');const il=activeLinks.length;for(let i=0;i<il;i++){activeLinks[i].classList.remove('is-active');activeLinks[i].removeAttribute('aria-current');}}}};})(Drupal,drupalSettings);;
(function($,Drupal,debounce){const cache={right:0,left:0,bottom:0,top:0};const cssVarPrefix='--drupal-displace-offset';const documentStyle=document.documentElement.style;const offsetKeys=Object.keys(cache);const offsetProps={};offsetKeys.forEach((edge)=>{offsetProps[edge]={enumerable:true,get(){return cache[edge];},set(value){if(value!==cache[edge])documentStyle.setProperty(`${cssVarPrefix}-${edge}`,`${value}px`);cache[edge]=value;}};});const offsets=Object.seal(Object.defineProperties({},offsetProps));function getRawOffset(el,edge){const $el=$(el);const documentElement=document.documentElement;let displacement=0;const horizontal=edge==='left'||edge==='right';let placement=$el.offset()[horizontal?'left':'top'];placement-=window[`scroll${horizontal?'X':'Y'}`]||document.documentElement[`scroll${horizontal?'Left':'Top'}`]||0;switch(edge){case 'top':displacement=placement+$el.outerHeight();break;case 'left':displacement=placement+$el.outerWidth();break;case 'bottom':displacement=documentElement.clientHeight-placement;break;case 'right':displacement=documentElement.clientWidth-placement;break;default:displacement=0;}return displacement;}function calculateOffset(edge){let edgeOffset=0;const displacingElements=document.querySelectorAll(`[data-offset-${edge}]`);const n=displacingElements.length;for(let i=0;i<n;i++){const el=displacingElements[i];if(el.style.display==='none')continue;let displacement=parseInt(el.getAttribute(`data-offset-${edge}`),10);if(isNaN(displacement))displacement=getRawOffset(el,edge);edgeOffset=Math.max(edgeOffset,displacement);}return edgeOffset;}function displace(broadcast=true){const newOffsets={};offsetKeys.forEach((edge)=>{newOffsets[edge]=calculateOffset(edge);});offsetKeys.forEach((edge)=>{offsets[edge]=newOffsets[edge];});if(broadcast)$(document).trigger('drupalViewportOffsetChange',offsets);return offsets;}Drupal.behaviors.drupalDisplace={attach(){if(this.displaceProcessed)return;this.displaceProcessed=true;$(window).on('resize.drupalDisplace',debounce(displace,200));}};Drupal.displace=displace;Object.defineProperty(Drupal.displace,'offsets',{value:offsets,writable:false});Drupal.displace.calculateOffset=calculateOffset;})(jQuery,Drupal,Drupal.debounce);;
(function($,Drupal,once){if(once('drupal-dialog-deprecation-listener','html').length){const eventSpecial={handle($event){const $element=$($event.target);const event=$event.originalEvent;const dialog=event.dialog;const dialogArguments=[$event,dialog,$element,event?.settings];$event.handleObj.handler.apply(this,dialogArguments);}};$.event.special['dialog:beforecreate']=eventSpecial;$.event.special['dialog:aftercreate']=eventSpecial;$.event.special['dialog:beforeclose']=eventSpecial;$.event.special['dialog:afterclose']=eventSpecial;const listenDialogEvent=(event)=>{const windowEvents=$._data(window,'events');const isWindowHasDialogListener=windowEvents[event.type];if(isWindowHasDialogListener)Drupal.deprecationError({message:`jQuery event ${event.type} is deprecated in 10.3.0 and is removed from Drupal:12.0.0. See https://www.drupal.org/node/3422670`});};['dialog:beforecreate','dialog:aftercreate','dialog:beforeclose','dialog:afterclose'].forEach((e)=>window.addEventListener(e,listenDialogEvent));window.addEventListener('dialog:beforecreate',(event)=>{const dialog=event.target;$(dialog).on('dialogButtonsChange.dialogDeprecation',(e)=>{if(!e?.originalEvent){Drupal.deprecationError({message:`jQuery event dialogButtonsChange is deprecated in 11.2.0 and is removed from Drupal:12.0.0. See https://www.drupal.org/node/3464202`});dialog.dispatchEvent(new CustomEvent('dialogButtonsChange'));}});});window.addEventListener('dialog:beforeclose',(event)=>{const dialog=event.target;$(dialog).off(`dialogButtonsChange.dialogDeprecation`);});}})(jQuery,Drupal,once);;
class DrupalDialogEvent extends Event{constructor(type,dialog,settings=null){super(`dialog:${type}`,{bubbles:true});this.dialog=dialog;this.settings=settings;}}(function($,Drupal,drupalSettings,bodyScrollLock){drupalSettings.dialog={autoOpen:true,buttonClass:'button',buttonPrimaryClass:'button--primary',close(event){Drupal.dialog(event.target).close();Drupal.detachBehaviors(event.target,null,'unload');}};Drupal.dialog=function(element,options){let undef;const $element=$(element);const domElement=$element.get(0);const dialog={open:false,returnValue:undef};function openDialog(settings){settings=$.extend({},drupalSettings.dialog,options,settings);if(settings.dialogClass)Drupal.deprecationError({message:'dialogClass is deprecated in drupal:10.4.x and will be removed from drupal:12.0.0.'});const event=new DrupalDialogEvent('beforecreate',dialog,settings);domElement.dispatchEvent(event);$element.dialog(event.settings);dialog.open=true;if(event.settings.modal)bodyScrollLock.lock(domElement);domElement.dispatchEvent(new DrupalDialogEvent('aftercreate',dialog,event.settings));}function closeDialog(value){domElement.dispatchEvent(new DrupalDialogEvent('beforeclose',dialog));bodyScrollLock.clearBodyLocks();$element.dialog('close');dialog.returnValue=value;dialog.open=false;domElement.dispatchEvent(new DrupalDialogEvent('afterclose',dialog));}dialog.show=()=>{openDialog({modal:false,uiDialogTitleHeadingLevel:2});};dialog.showModal=()=>{openDialog({modal:true,uiDialogTitleHeadingLevel:1});};dialog.close=closeDialog;return dialog;};})(jQuery,Drupal,drupalSettings,bodyScrollLock);;
(function($,Drupal,drupalSettings,debounce,displace){drupalSettings.dialog=$.extend({autoResize:true,maxHeight:'95%'},drupalSettings.dialog);function resetPosition(options){const offsets=displace.offsets;const left=offsets.left-offsets.right;const top=offsets.top-offsets.bottom;const leftString=`${(left>0?'+':'-')+Math.abs(Math.round(left/2))}px`;const topString=`${(top>0?'+':'-')+Math.abs(Math.round(top/2))}px`;options.position={my:`center${left!==0?leftString:''} center${top!==0?topString:''}`,of:window};return options;}function resetSize(event){const positionOptions=['width','height','minWidth','minHeight','maxHeight','maxWidth','position'];let adjustedOptions={};let windowHeight=$(window).height();let option;let optionValue;let adjustedValue;for(let n=0;n<positionOptions.length;n++){option=positionOptions[n];optionValue=event.data.settings[option];if(optionValue)if(typeof optionValue==='string'&&optionValue.endsWith('%')&&/height/i.test(option)){windowHeight-=displace.offsets.top+displace.offsets.bottom;adjustedValue=parseInt(0.01*parseInt(optionValue,10)*windowHeight,10);if(option==='height'&&Math.round(event.data.$element.parent().outerHeight())<adjustedValue)adjustedValue='auto';adjustedOptions[option]=adjustedValue;}}if(!event.data.settings.modal)adjustedOptions=resetPosition(adjustedOptions);event.data.$element.dialog('option',adjustedOptions);event.data.$element?.get(0)?.dispatchEvent(new CustomEvent('dialogContentResize',{bubbles:true}));}window.addEventListener('dialog:aftercreate',(e)=>{const autoResize=debounce(resetSize,20);const $element=$(e.target);const {settings}=e;const eventData={settings,$element};if(settings.autoResize===true||settings.autoResize==='true'){const uiDialog=$element.dialog('option',{resizable:false,draggable:false}).dialog('widget');uiDialog[0].style.position='fixed';$(window).on('resize.dialogResize scroll.dialogResize',eventData,autoResize).trigger('resize.dialogResize');$(document).on('drupalViewportOffsetChange.dialogResize',eventData,autoResize);}});window.addEventListener('dialog:beforeclose',()=>{$(window).off('.dialogResize');$(document).off('.dialogResize');});})(jQuery,Drupal,drupalSettings,Drupal.debounce,Drupal.displace);;
(function($,{tabbable,isTabbable}){$.widget('ui.dialog',$.ui.dialog,{options:{buttonClass:'button',buttonPrimaryClass:'button--primary'},_createButtons(){const opts=this.options;let primaryIndex;let index;const il=opts.buttons.length;for(index=0;index<il;index++)if(opts.buttons[index].primary&&opts.buttons[index].primary===true){primaryIndex=index;delete opts.buttons[index].primary;break;}this._super();const $buttons=this.uiButtonSet.children().addClass(opts.buttonClass);if(typeof primaryIndex!=='undefined')$buttons.eq(index).addClass(opts.buttonPrimaryClass);},_createWrapper(){this.uiDialog=$('<div>').hide().attr({tabIndex:-1,role:'dialog','aria-modal':this.options.modal?'true':null}).appendTo(this._appendTo());this._addClass(this.uiDialog,'ui-dialog','ui-widget ui-widget-content ui-front');this._on(this.uiDialog,{keydown(event){if(this.options.closeOnEscape&&!event.isDefaultPrevented()&&event.keyCode&&event.keyCode===$.ui.keyCode.ESCAPE){event.preventDefault();this.close(event);return;}if(event.keyCode!==$.ui.keyCode.TAB||event.isDefaultPrevented())return;const tabbableElements=tabbable(this.uiDialog[0]);if(tabbableElements.length){const first=tabbableElements[0];const last=tabbableElements[tabbableElements.length-1];if((event.target===last||event.target===this.uiDialog[0])&&!event.shiftKey){this._delay(function(){$(first).trigger('focus');});event.preventDefault();}else{if((event.target===first||event.target===this.uiDialog[0])&&event.shiftKey){this._delay(function(){$(last).trigger('focus');});event.preventDefault();}}}},mousedown(event){if(this._moveToTop(event))this._focusTabbable();}});if(!this.element.find('[aria-describedby]').length)this.uiDialog.attr({'aria-describedby':this.element.uniqueId().attr('id')});},_focusTabbable(){let hasFocus=this._focusedElement?this._focusedElement.get(0):null;if(!hasFocus)hasFocus=this.element.find('[autofocus]').get(0);if(!hasFocus){const $elements=[this.element,this.uiDialogButtonPane];for(let i=0;i<$elements.length;i++){const element=$elements[i].get(0);if(element){const elementTabbable=tabbable(element);hasFocus=elementTabbable.length?elementTabbable[0]:null;}if(hasFocus)break;}}if(!hasFocus){const closeBtn=this.uiDialogTitlebarClose.get(0);hasFocus=closeBtn&&isTabbable(closeBtn)?closeBtn:null;}if(!hasFocus)hasFocus=this.uiDialog.get(0);$(hasFocus).eq(0).trigger('focus');}});})(jQuery,window.tabbable);;
(($)=>{$.widget('ui.dialog',$.ui.dialog,{_allowInteraction(event){if(event.target.classList===undefined)return this._super(event);return event.target.classList.contains('ck')||this._super(event);}});})(jQuery);;
(function($,Drupal,{focusable}){Drupal.behaviors.dialog={attach(context,settings){if(!document.querySelector('#drupal-modal'))document.body.insertAdjacentHTML('beforeend','<div id="drupal-modal" class="ui-front" style="display:none"></div>');if(context!==document){const dialog=context.closest('.ui-dialog-content');if(dialog){if($(dialog).dialog('option','drupalAutoButtons'))dialog.dispatchEvent(new CustomEvent('dialogButtonsChange'));setTimeout(function(){if(!dialog.contains(document.activeElement)){$(dialog).dialog('instance')._focusedElement=null;$(dialog).dialog('instance')._focusTabbable();}},0);}}const originalClose=settings.dialog.close;settings.dialog.close=function(event,...args){originalClose.apply(settings.dialog,[event,...args]);const $element=$(event.target);const ajaxContainer=$element.data('uiDialog')?$element.data('uiDialog').opener.closest('[data-drupal-ajax-container]'):[];if(ajaxContainer.length&&(document.activeElement===document.body||$(document.activeElement).not(':visible'))){const focusableChildren=focusable(ajaxContainer[0]);if(focusableChildren.length>0)setTimeout(()=>{focusableChildren[0].focus();},0);}$(event.target).remove();};},prepareDialogButtons($dialog){const buttons=[];const buttonSelectors='.form-actions input[type=submit], .form-actions a.button, .form-actions a.action-link';const buttonElements=$dialog[0].querySelectorAll(buttonSelectors);buttonElements.forEach((button)=>{button.style.display='none';buttons.push({text:button.innerHTML||button.getAttribute('value'),class:button.getAttribute('class'),'data-once':button.dataset.once,click(e){if(button.tagName==='A')button.click();else ['mousedown','mouseup','click'].forEach((event)=>button.dispatchEvent(new MouseEvent(event)));e.preventDefault();}});});return buttons;}};Drupal.AjaxCommands.prototype.openDialog=function(ajax,response,status){if(!response.selector)return false;let dialog=document.querySelector(response.selector);if(!dialog){dialog=document.createElement('div');dialog.id=response.selector.replace(/^#/,'');dialog.classList.add('ui-front');document.body.appendChild(dialog);}if(!ajax.wrapper)ajax.wrapper=dialog.id;response.command='insert';response.method='html';ajax.commands.insert(ajax,response,status);response.dialogOptions=response.dialogOptions||{};if(typeof response.dialogOptions.drupalAutoButtons==='undefined')response.dialogOptions.drupalAutoButtons=true;else if(response.dialogOptions.drupalAutoButtons==='false')response.dialogOptions.drupalAutoButtons=false;else response.dialogOptions.drupalAutoButtons=!!response.dialogOptions.drupalAutoButtons;if(!response.dialogOptions.buttons&&response.dialogOptions.drupalAutoButtons)response.dialogOptions.buttons=Drupal.behaviors.dialog.prepareDialogButtons($(dialog));const dialogButtonsChange=()=>{const buttons=Drupal.behaviors.dialog.prepareDialogButtons($(dialog));$(dialog).dialog('option','buttons',buttons);};dialog.addEventListener('dialogButtonsChange',dialogButtonsChange);dialog.addEventListener('dialog:beforeclose',(event)=>{dialog.removeEventListener('dialogButtonsChange',dialogButtonsChange);});const createdDialog=Drupal.dialog(dialog,response.dialogOptions);if(response.dialogOptions.modal)createdDialog.showModal();else createdDialog.show();dialog.parentElement?.querySelector('.ui-dialog-buttonset')?.classList.add('form-actions');};Drupal.AjaxCommands.prototype.closeDialog=function(ajax,response,status){const dialog=document.querySelector(response.selector);if(dialog){Drupal.dialog(dialog).close();if(!response.persist)dialog.remove();}};Drupal.AjaxCommands.prototype.setDialogOption=function(ajax,response,status){const dialog=document.querySelector(response.selector);if(dialog)$(dialog).dialog('option',response.optionName,response.optionValue);};window.addEventListener('dialog:aftercreate',(event)=>{const dialog=event.dialog;const cancelButton=event.target.querySelector('.dialog-cancel');const cancelClick=(e)=>{dialog.close('cancel');e.preventDefault();e.stopPropagation();};cancelButton?.removeEventListener('click',cancelClick);cancelButton?.addEventListener('click',cancelClick);});Drupal.AjaxCommands.prototype.openModalDialogWithUrl=function(ajax,response){const dialogOptions=response.dialogOptions||{};const elementSettings={progress:{type:'throbber'},dialogType:'modal',dialog:dialogOptions,url:response.url,httpMethod:'GET'};Drupal.ajax(elementSettings).execute();};})(jQuery,Drupal,window.tabbable);;
(function($,Drupal){function DropButton(dropbutton,settings){const options=$.extend({title:Drupal.t('List additional actions')},settings);const $dropbutton=$(dropbutton);this.$dropbutton=$dropbutton;this.$list=$dropbutton.find('.dropbutton');this.$actions=this.$list.find('li').addClass('dropbutton-action');if(this.$actions.length>1){const $primary=this.$actions.slice(0,1);const $secondary=this.$actions.slice(1);$secondary.addClass('secondary-action');$primary.after(Drupal.theme('dropbuttonToggle',options));this.$dropbutton.addClass('dropbutton-multiple').on({'mouseleave.dropbutton':this.hoverOut.bind(this),'mouseenter.dropbutton':this.hoverIn.bind(this),'focusout.dropbutton':this.focusOut.bind(this),'focusin.dropbutton':this.focusIn.bind(this)});}else this.$dropbutton.addClass('dropbutton-single');}function dropbuttonClickHandler(e){e.preventDefault();$(e.target).closest('.dropbutton-wrapper').toggleClass('open');}Drupal.behaviors.dropButton={attach(context,settings){const dropbuttons=once('dropbutton','.dropbutton-wrapper',context);if(dropbuttons.length){const body=once('dropbutton-click','body');if(body.length)$(body).on('click','.dropbutton-toggle',dropbuttonClickHandler);dropbuttons.forEach((dropbutton)=>{DropButton.dropbuttons.push(new DropButton(dropbutton,settings.dropbutton));});}}};$.extend(DropButton,{dropbuttons:[]});$.extend(DropButton.prototype,{toggle(show){const isBool=typeof show==='boolean';show=isBool?show:!this.$dropbutton.hasClass('open');this.$dropbutton.toggleClass('open',show);},hoverIn(){if(this.timerID)window.clearTimeout(this.timerID);},hoverOut(){this.timerID=window.setTimeout(this.close.bind(this),500);},open(){this.toggle(true);},close(){this.toggle(false);},focusOut(e){this.hoverOut.call(this,e);},focusIn(e){this.hoverIn.call(this,e);}});$.extend(Drupal.theme,{dropbuttonToggle(options){return `<li class="dropbutton-toggle"><button type="button"><span class="dropbutton-arrow"><span class="visually-hidden">${options.title}</span></span></button></li>`;}});Drupal.DropButton=DropButton;})(jQuery,Drupal);;
((Drupal)=>{Drupal.theme.dropbuttonToggle=(options)=>`<li class="dropbutton-toggle"><button type="button" class="dropbutton__toggle"><span class="visually-hidden">${options.title}</span></button></li>`;})(Drupal);;
((Drupal,once)=>{Drupal.behaviors.ginDropbutton={attach:function(context){once("ginDropbutton",".dropbutton-multiple:has(.dropbutton--gin)",context).forEach(((el)=>{el.querySelector(".dropbutton__toggle").addEventListener("click",(()=>{this.updatePosition(el),window.addEventListener("scroll",(()=>Drupal.debounce(this.updatePositionIfOpen(el),100))),window.addEventListener("resize",(()=>Drupal.debounce(this.updatePositionIfOpen(el),100)));}));}));},updatePosition:function(el){const preferredDir=document.documentElement.dir??"ltr",secondaryAction=el.querySelector(".secondary-action"),dropMenu=el.querySelector(".dropbutton__items"),toggleHeight=el.offsetHeight,dropMenuWidth=dropMenu.offsetWidth,dropMenuHeight=dropMenu.offsetHeight,boundingRect=secondaryAction.getBoundingClientRect(),spaceBelow=window.innerHeight-boundingRect.bottom,spaceLeft=boundingRect.left,spaceRight=window.innerWidth-boundingRect.right;dropMenu.style.position="fixed";const leftAlignStyles={left:`${boundingRect.left}px`,right:"auto"},rightAlignStyles={left:"auto",right:window.innerWidth-boundingRect.right+"px"};"ltr"===preferredDir?spaceRight>=dropMenuWidth?Object.assign(dropMenu.style,leftAlignStyles):Object.assign(dropMenu.style,rightAlignStyles):spaceLeft>=dropMenuWidth?Object.assign(dropMenu.style,rightAlignStyles):Object.assign(dropMenu.style,leftAlignStyles),dropMenu.style.top=spaceBelow>=dropMenuHeight?`${boundingRect.bottom}px`:boundingRect.top-toggleHeight-dropMenuHeight+"px";},updatePositionIfOpen:function(el){el.classList.contains("open")&&this.updatePosition(el);}};})(Drupal,once);;
(function($,Drupal,window){function TableResponsive(table){this.table=table;this.$table=$(table);this.showText=Drupal.t('Show all columns');this.hideText=Drupal.t('Hide lower priority columns');this.$headers=this.$table.find('th');this.$link=$('<button type="button" class="link tableresponsive-toggle"></button>').attr('title',Drupal.t('Show table cells that were hidden to make the table fit within a small screen.')).on('click',this.eventhandlerToggleColumns.bind(this));this.$table.before($('<div class="tableresponsive-toggle-columns"></div>').append(this.$link));$(window).on('resize.tableresponsive',this.eventhandlerEvaluateColumnVisibility.bind(this));}Drupal.behaviors.tableResponsive={attach(context,settings){once('tableresponsive','table.responsive-enabled',context).forEach((table)=>{TableResponsive.tables.push(new TableResponsive(table));});if(TableResponsive.tables.length)$(window).trigger('resize.tableresponsive');}};$.extend(TableResponsive,{tables:[]});$.extend(TableResponsive.prototype,{eventhandlerEvaluateColumnVisibility(e){const pegged=parseInt(this.$link.data('pegged'),10);const hiddenLength=this.$headers.filter('.priority-medium:hidden, .priority-low:hidden').length;if(hiddenLength>0){this.$link.show();this.$link[0].textContent=this.showText;}if(!pegged&&hiddenLength===0){this.$link.hide();this.$link[0].textContent=this.hideText;}},eventhandlerToggleColumns(e){e.preventDefault();const self=this;const $hiddenHeaders=this.$headers.filter('.priority-medium:hidden, .priority-low:hidden');this.$revealedCells=this.$revealedCells||$();if($hiddenHeaders.length>0){$hiddenHeaders.each(function(index,element){const $header=$(this);const position=$header.prevAll('th').length;self.$table.find('tbody tr').each(function(){const $cells=$(this).find('td').eq(position);$cells.show();self.$revealedCells=$().add(self.$revealedCells).add($cells);});$header.show();self.$revealedCells=$().add(self.$revealedCells).add($header);});this.$link[0].textContent=this.hideText;this.$link.data('pegged',1);}else{this.$revealedCells.hide();this.$revealedCells.each(function(index,element){const $cell=$(this);const properties=$cell.attr('style').split(';');const newProps=[];const match=/^display\s*:\s*none$/;for(let i=0;i<properties.length;i++){const prop=properties[i];prop.trim();const isDisplayNone=match.exec(prop);if(isDisplayNone)continue;newProps.push(prop);}$cell.attr('style',newProps.join(';'));});this.$link[0].textContent=this.showText;this.$link.data('pegged',0);$(window).trigger('resize.tableresponsive');}}});Drupal.TableResponsive=TableResponsive;})(jQuery,Drupal,window);;
((Drupal)=>{Drupal.theme.checkbox=()=>`<input type="checkbox" class="form-checkbox"/>`;})(Drupal);;
((Drupal)=>{Drupal.theme.checkbox=()=>'<input type="checkbox" class="form-checkbox form-boolean form-boolean--type-checkbox"/>';})(Drupal);;
(function($,Drupal){Drupal.behaviors.tableSelect={attach(context,settings){once('table-select',$(context).find('th.select-all').closest('table')).forEach((table)=>Drupal.tableSelect.call(table));}};Drupal.tableSelect=function(){if($(this).find('td input[type="checkbox"]').length===0)return;const table=this;let checkboxes;let lastChecked;const $table=$(table);const strings={selectAll:Drupal.t('Select all rows in this table'),selectNone:Drupal.t('Deselect all rows in this table')};const updateSelectAll=function(state){$table.parents('.gin-table-scroll-wrapper').prev('table.sticky-header').addBack().find('th.select-all input[type="checkbox"]').each(function(){const $checkbox=$(this);const stateChanged=$checkbox.prop('checked')!==state;$checkbox.attr('title',state?strings.selectNone:strings.selectAll);if(stateChanged){$checkbox.prop('checked',state).trigger('change');$table.parents('.gin-table-scroll-wrapper').prev('table.gin--sticky-table-header').find('th.select-all input[type="checkbox"]').prop('checked',state);}});};if($table.find('th.select-all').find('input[type="checkbox"]').length===0)$table.find('th.select-all').prepend($(Drupal.theme('checkbox')).attr('title',strings.selectAll));$table.find('th.select-all input[type="checkbox"]').on('click',(event)=>{if(event.target.matches('input[type="checkbox"]')){checkboxes.each(function(){const $checkbox=$(this);const stateChanged=$checkbox.prop('checked')!==event.target.checked;if(stateChanged)$checkbox.prop('checked',event.target.checked).trigger('change');$checkbox.closest('tr').toggleClass('selected',this.checked);});updateSelectAll(event.target.checked);}});checkboxes=$table.find('td input[type="checkbox"]:enabled').on('click',function(e){$(this).closest('tr').toggleClass('selected',this.checked);if(e.shiftKey&&lastChecked&&lastChecked!==e.target)Drupal.tableSelectRange($(e.target).closest('tr')[0],$(lastChecked).closest('tr')[0],e.target.checked);updateSelectAll(checkboxes.length===checkboxes.filter(':checked').length);lastChecked=e.target;});updateSelectAll(checkboxes.length===checkboxes.filter(':checked').length);};Drupal.tableSelectRange=function(from,to,state){const mode=from.rowIndex>to.rowIndex?'previousSibling':'nextSibling';for(let i=from[mode];i;i=i[mode]){const $i=$(i);if(i.nodeType!==1)continue;$i.toggleClass('selected',state);$i.find('input[type="checkbox"]').prop('checked',state);if(to.nodeType){if(i===to)break;}else{if($.filter(to,[i]).r.length)break;}}};})(jQuery,Drupal);;
(($,Drupal,{tabbable})=>{Drupal.ClaroBulkActions=class{constructor(bulkActions){this.bulkActions=bulkActions;this.form=this.bulkActions.closest('form');this.form.querySelectorAll('tr').forEach((element)=>{element.classList.add('views-form__bulk-operations-row');});this.checkboxes=this.form.querySelectorAll('[class$="bulk-form"]:not(.select-all) input[type="checkbox"]');this.selectAll=this.form.querySelectorAll('.select-all > [type="checkbox"]');this.$tabbable=$(tabbable(this.form));this.bulkActionsSticky=false;this.scrollingTimeout='';this.ignoreScrollEvent=false;$(this.checkboxes).on('change',(event)=>this.rowCheckboxHandler(event));$(this.selectAll).on('change',(event)=>this.selectAllHandler(event));this.$tabbable.on('focus',(event)=>this.focusHandler(event));this.$tabbable.on('blur',(event)=>this.blurHandler(event));this.spacerCss=document.createElement('style');document.body.appendChild(this.spacerCss);const scrollResizeHandler=Drupal.debounce(()=>{this.scrollResizeHandler();},10);$(window).on('scroll',()=>scrollResizeHandler());$(window).on('resize',()=>scrollResizeHandler());$(window).on('load',()=>this.rowCheckboxHandler({}));}blurHandler(event){if(!event.hasOwnProperty('isTrigger')){const row=event.target.closest('tr');const nextSibling=row?row.nextElementSibling:null;if(nextSibling?.getAttribute('data-drupal-table-row-spacer'))nextSibling.parentNode.removeChild(nextSibling);}}focusHandler(event){if(event.currentTarget.closest('[data-drupal-views-bulk-actions]'))return;const stickyRect=this.bulkActions.getBoundingClientRect();const stickyStart=stickyRect.y;const elementRect=event.target.getBoundingClientRect();const elementStart=elementRect.y;const elementEnd=elementStart+elementRect.height;if(elementEnd>stickyStart)window.scrollBy(0,elementEnd-stickyStart);this.underStickyHandler();}scrollResizeHandler(){this.spacerCss.innerHTML='[data-drupal-table-row-spacer] { display: none; }';if(!this.ignoreScrollEvent){clearTimeout(this.scrollingTimeout);this.scrollingTimeout=setTimeout(()=>{this.spacerCss.innerHTML='';this.underStickyHandler();},500);}}underStickyHandler(){document.querySelectorAll('[data-drupal-table-row-spacer]').forEach((element)=>{element.parentNode.removeChild(element);});if(this.bulkActionsSticky){let pastStickyHeader=false;const stickyRect=this.bulkActions.getBoundingClientRect();const stickyStart=stickyRect.y;const stickyEnd=stickyStart+stickyRect.height;this.form.querySelectorAll('tbody tr').forEach((row)=>{if(!pastStickyHeader){const rowRect=row.getBoundingClientRect();const rowStart=rowRect.y;const rowEnd=rowStart+rowRect.height;if(rowStart>stickyEnd)pastStickyHeader=true;else{if(rowEnd>stickyStart){const cellTopPadding=Array.from(row.querySelectorAll('td.views-field')).map((element)=>document.defaultView.getComputedStyle(element,'').getPropertyValue('padding-top').replace('px',''));const minimumTopPadding=Math.min.apply(null,cellTopPadding);if(rowStart+minimumTopPadding>=stickyStart){const oldScrollTop=window.scrollY||document.documentElement.scrollTop;const scrollLeft=window.scrollX||document.documentElement.scrollLeft;const rowContainsActiveElement=row.contains(document.activeElement);if(rowContainsActiveElement)this.ignoreScrollEvent=true;const spacer=document.createElement('div');spacer.style.height=`${stickyRect.height}px`;spacer.setAttribute('data-drupal-table-row-spacer',true);row.parentNode.insertBefore(spacer,row);const newScrollTop=window.scrollY||document.documentElement.scrollTop;const windowBottom=window.innerHeight||document.documentElement.clientHeight;if(rowContainsActiveElement&&oldScrollTop!==newScrollTop&&rowStart<windowBottom)window.scrollTo(scrollLeft,oldScrollTop);this.ignoreScrollEvent=false;}}}}});}}selectAllHandler(event){if(!event.hasOwnProperty('isTrigger')){const itemsCheckedCount=event.target.checked?this.checkboxes.length:0;this.updateStatus(itemsCheckedCount);this.underStickyHandler();}}rowCheckboxHandler(event){if(!event.hasOwnProperty('isTrigger'))this.updateStatus(Array.prototype.slice.call(this.checkboxes).filter((checkbox)=>checkbox.checked).length);}updateStatus(count){let statusMessage='';let operationsAvailableMessage='';if(count>0){if(!this.bulkActionsSticky){operationsAvailableMessage=Drupal.t('Bulk actions are now available. These actions will be applied to all selected items. This can be accessed via the "Skip to bulk actions" link that appears after every enabled checkbox. ');this.bulkActionsSticky=true;setTimeout(()=>this.underStickyHandler(),350);const stickyRect=this.bulkActions.getBoundingClientRect();const bypassAnimation=stickyRect.top+stickyRect.height<window.scrollY+window.innerHeight;const classAction=bypassAnimation?'add':'remove';this.bulkActions.classList[classAction]('views-form__header--bypass-animation');}statusMessage=Drupal.formatPlural(count,'1 item selected','@count items selected');}else{this.bulkActionsSticky=false;statusMessage=Drupal.t('No items selected');setTimeout(()=>this.underStickyHandler(),350);}this.bulkActions.setAttribute('data-drupal-sticky-vbo',this.bulkActionsSticky);this.bulkActions.querySelector('[data-drupal-views-bulk-actions-status]').textContent=statusMessage;Drupal.announce(operationsAvailableMessage+statusMessage);this.underStickyHandler();}};Drupal.behaviors.claroTableSelect={attach(context){const bulkActions=once('ClaroBulkActions','[data-drupal-views-bulk-actions]',context);bulkActions.map((bulkActionForm)=>new Drupal.ClaroBulkActions(bulkActionForm));}};})(jQuery,Drupal,window.tabbable,once);;
((Drupal,drupalSettings,once)=>{Drupal.behaviors.ginEscapeAdmin={attach:(context)=>{once("ginEscapeAdmin","[data-gin-toolbar-escape-admin]",context).forEach(((el)=>{const escapeAdminPath=sessionStorage.getItem("escapeAdminPath");drupalSettings.path.currentPathIsAdmin&&null!==escapeAdminPath&&el.setAttribute("href",escapeAdminPath);}));}};})(Drupal,drupalSettings,once);;
((Drupal,once)=>{Drupal.behaviors.ginCoreNavigation={attach:(context)=>{Drupal.ginCoreNavigation.initKeyboardShortcut(context);}},Drupal.ginCoreNavigation={initKeyboardShortcut:function(context){once("ginToolbarKeyboardShortcut",".admin-toolbar__expand-button",context).forEach((()=>{document.addEventListener("keydown",((e)=>{!0===e.altKey&&"KeyT"===e.code&&this.toggleToolbar();}));})),once("ginToolbarClickHandler",".top-bar__burger, .admin-toolbar__expand-button",context).forEach(((button)=>{button.addEventListener("click",(()=>{window.innerWidth<1280&&button.getAttribute("aria-expanded","false")&&Drupal.ginSidebar?.collapseSidebar();}));}));},toggleToolbar(){let toolbarTrigger=document.querySelector(".admin-toolbar__expand-button");toolbarTrigger&&toolbarTrigger.click();},collapseToolbar:function(){document.querySelectorAll(".top-bar__burger, .admin-toolbar__expand-button").forEach(((button)=>{button.setAttribute("aria-expanded","false");})),document.documentElement.setAttribute("data-admin-toolbar","collapsed"),Drupal.displace(!0);}};})(Drupal,once);;
((Drupal,drupalSettings,once)=>{Drupal.behaviors.ginAccent={attach:function(context){once("ginAccent","body",context).forEach((()=>{Drupal.ginAccent.checkDarkmode(),Drupal.ginAccent.setAccentColor(),Drupal.ginAccent.setFocusColor();}));}},Drupal.ginAccent={setAccentColor:function(){let preset=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,color=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;const accentColorPreset=null!=preset?preset:drupalSettings.gin.preset_accent_color;document.body.setAttribute("data-gin-accent",accentColorPreset),"custom"===accentColorPreset&&this.setCustomAccentColor(color);},setCustomAccentColor:function(){let color=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,element=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;const accentColor=null!=color?color:drupalSettings.gin.accent_color;if(accentColor){this.clearAccentColor(element);const strippedAccentColor=accentColor.replace("#",""),darkAccentColor=this.mixColor("ffffff",strippedAccentColor,65).replace("#",""),style=document.createElement("style");style.className="gin-custom-colors",style.innerHTML=`\n          [data-gin-accent="custom"] {\n            --gin-color-primary-rgb: ${this.hexToRgb(accentColor)};\n            --gin-color-primary-hover: ${this.shadeColor(accentColor,-10)};\n            --gin-color-primary-active: ${this.shadeColor(accentColor,-15)};\n            --gin-bg-app-rgb: ${this.hexToRgb(this.mixColor("ffffff",strippedAccentColor,97))};\n            --gin-bg-header: ${this.mixColor("ffffff",strippedAccentColor,85)};\n            --gin-color-sticky-rgb: ${this.hexToRgb(this.mixColor("ffffff",strippedAccentColor,92))};\n          }\n          .gin--dark-mode[data-gin-accent="custom"],\n          .gin--dark-mode [data-gin-accent="custom"] {\n            --gin-color-primary-rgb: ${this.hexToRgb(darkAccentColor)};\n            --gin-color-primary-hover: ${this.mixColor("ffffff",strippedAccentColor,55)};\n            --gin-color-primary-active: ${this.mixColor("ffffff",strippedAccentColor,50)};\n            --gin-bg-header: ${this.mixColor("2A2A2D",darkAccentColor,88)};\n          }\n        `,element.append(style);}},clearAccentColor:function(){let element=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body;if(element.querySelectorAll(".gin-custom-colors").length>0){const removeElement=element.querySelector(".gin-custom-colors");removeElement.parentNode.removeChild(removeElement);}},setFocusColor:function(){let preset=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,color=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;const focusColorPreset=null!=preset?preset:drupalSettings.gin.preset_focus_color;document.body.setAttribute("data-gin-focus",focusColorPreset),"custom"===focusColorPreset&&this.setCustomFocusColor(color);},setCustomFocusColor:function(){let color=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,element=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;const accentColor=null!=color?color:drupalSettings.gin.focus_color;if(accentColor){this.clearFocusColor(element);const strippedAccentColor=accentColor.replace("#",""),darkAccentColor=this.mixColor("ffffff",strippedAccentColor,65),style=document.createElement("style");style.className="gin-custom-focus",style.innerHTML=`\n          [data-gin-focus="custom"] {\n            --gin-color-focus: ${accentColor};\n          }\n          .gin--dark-mode[data-gin-focus="custom"],\n          .gin--dark-mode [data-gin-focus="custom"] {\n            --gin-color-focus: ${darkAccentColor};\n          }`,element.append(style);}},clearFocusColor:function(){let element=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body;if(element.querySelectorAll(".gin-custom-focus").length>0){const removeElement=element.querySelector(".gin-custom-focus");removeElement.parentNode.removeChild(removeElement);}},checkDarkmode:()=>{const darkmodeClass=drupalSettings.gin.darkmode_class;window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",((e)=>{e.matches&&"auto"===window.ginDarkmode&&document.querySelector("html").classList.add(darkmodeClass);})),window.matchMedia("(prefers-color-scheme: light)").addEventListener("change",((e)=>{e.matches&&"auto"===window.ginDarkmode&&document.querySelector("html").classList.remove(darkmodeClass);}));},hexToRgb:(hex)=>{hex=hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(function(m,r,g,b){return r+r+g+g+b+b;}));var result=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);return result?`${parseInt(result[1],16)}, ${parseInt(result[2],16)}, ${parseInt(result[3],16)}`:null;},mixColor:(color_1,color_2,weight)=>{function h2d(h){return parseInt(h,16);}weight=void 0!==weight?weight:50;for(var color="#",i=0;i<=5;i+=2){for(var v1=h2d(color_1.substr(i,2)),v2=h2d(color_2.substr(i,2)),val=Math.floor(v2+weight/100*(v1-v2)).toString(16);val.length<2;)val="0"+val;color+=val;}return color;},shadeColor:(color,percent)=>{const num=parseInt(color.replace("#",""),16),amt=Math.round(2.55*percent),R=(num>>16)+amt,B=(num>>8&255)+amt,G=(255&num)+amt;return `#${(16777216+65536*(R<255?R<1?0:R:255)+256*(B<255?B<1?0:B:255)+(G<255?G<1?0:G:255)).toString(16).slice(1)}`;}};})(Drupal,drupalSettings,once);;
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
      (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FloatingUICore = {}));
})(this, (function (exports) { 'use strict';

  function getAlignment(placement) {
    return placement.split('-')[1];
  }

  function getLengthFromAxis(axis) {
    return axis === 'y' ? 'height' : 'width';
  }

  function getSide(placement) {
    return placement.split('-')[0];
  }

  function getMainAxisFromPlacement(placement) {
    return ['top', 'bottom'].includes(getSide(placement)) ? 'x' : 'y';
  }

  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const mainAxis = getMainAxisFromPlacement(placement);
    const length = getLengthFromAxis(mainAxis);
    const commonAlign = reference[length] / 2 - floating[length] / 2;
    const side = getSide(placement);
    const isVertical = mainAxis === 'x';
    let coords;
    switch (side) {
      case 'top':
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case 'bottom':
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case 'right':
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case 'left':
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case 'start':
        coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case 'end':
        coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a reference element when it is given a certain positioning strategy.
   *
   * This export does not have any `platform` interface logic. You will need to
   * write one for the platform you are using Floating UI with.
   */
  const computePosition = async (reference, floating, config) => {
    const {
      placement = 'bottom',
      strategy = 'absolute',
      middleware = [],
      platform
    } = config;
    const validMiddleware = middleware.filter(Boolean);
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
    let rects = await platform.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x,
      y
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for (let i = 0; i < validMiddleware.length; i++) {
      const {
        name,
        fn
      } = validMiddleware[i];
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = await fn({
        x,
        y,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform,
        elements: {
          reference,
          floating
        }
      });
      x = nextX != null ? nextX : x;
      y = nextY != null ? nextY : y;
      middlewareData = {
        ...middlewareData,
        [name]: {
          ...middlewareData[name],
          ...data
        }
      };
      if (reset && resetCount <= 50) {
        resetCount++;
        if (typeof reset === 'object') {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x,
            y
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i = -1;
        continue;
      }
    }
    return {
      x,
      y,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };

  function evaluate(value, param) {
    return typeof value === 'function' ? value(param) : value;
  }

  function expandPaddingObject(padding) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...padding
    };
  }

  function getSideObjectFromPadding(padding) {
    return typeof padding !== 'number' ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }

  function rectToClientRect(rect) {
    return {
      ...rect,
      top: rect.y,
      left: rect.x,
      right: rect.x + rect.width,
      bottom: rect.y + rect.height
    };
  }

  /**
   * Resolves with an object of overflow side offsets that determine how much the
   * element is overflowing a given clipping boundary on each side.
   * - positive = overflowing the boundary by that number of pixels
   * - negative = how many pixels left before it will overflow
   * - 0 = lies flush with the boundary
   * @see https://floating-ui.com/docs/detectOverflow
   */
  async function detectOverflow(state, options) {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x,
      y,
      platform,
      rects,
      elements,
      strategy
    } = state;
    const {
      boundary = 'clippingAncestors',
      rootBoundary = 'viewport',
      elementContext = 'floating',
      altBoundary = false,
      padding = 0
    } = evaluate(options, state);
    const paddingObject = getSideObjectFromPadding(padding);
    const altContext = elementContext === 'floating' ? 'reference' : 'floating';
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform.getClippingRect({
      element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === 'floating' ? {
      ...rects.floating,
      x,
      y
    } : rects.reference;
    const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
    const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  }

  const min = Math.min;
  const max = Math.max;

  function within(min$1, value, max$1) {
    return max(min$1, min(value, max$1));
  }

  /**
   * Provides data to position an inner element of the floating element so that it
   * appears centered to the reference element.
   * @see https://floating-ui.com/docs/arrow
   */
  const arrow = options => ({
    name: 'arrow',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        platform,
        elements
      } = state;
      // Since `element` is required, we don't Partial<> the type.
      const {
        element,
        padding = 0
      } = evaluate(options, state) || {};
      if (element == null) {
        return {};
      }
      const paddingObject = getSideObjectFromPadding(padding);
      const coords = {
        x,
        y
      };
      const axis = getMainAxisFromPlacement(placement);
      const length = getLengthFromAxis(axis);
      const arrowDimensions = await platform.getDimensions(element);
      const isYAxis = axis === 'y';
      const minProp = isYAxis ? 'top' : 'left';
      const maxProp = isYAxis ? 'bottom' : 'right';
      const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
      const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
      const startDiff = coords[axis] - rects.reference[axis];
      const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
      let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

      // DOM platform can return `window` as the `offsetParent`.
      if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
        clientSize = elements.floating[clientProp] || rects.floating[length];
      }
      const centerToReference = endDiff / 2 - startDiff / 2;

      // If the padding is large enough that it causes the arrow to no longer be
      // centered, modify the padding so that it is centered.
      const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
      const minPadding = min(paddingObject[minProp], largestPossiblePadding);
      const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

      // Make sure the arrow doesn't overflow the floating element if the center
      // point is outside the floating element's bounds.
      const min$1 = minPadding;
      const max = clientSize - arrowDimensions[length] - maxPadding;
      const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
      const offset = within(min$1, center, max);

      // If the reference is small enough that the arrow's padding causes it to
      // to point to nothing for an aligned placement, adjust the offset of the
      // floating element itself. This stops `shift()` from taking action, but can
      // be worked around by calling it again after the `arrow()` if desired.
      const shouldAddOffset = getAlignment(placement) != null && center != offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
      const alignmentOffset = shouldAddOffset ? center < min$1 ? min$1 - center : max - center : 0;
      return {
        [axis]: coords[axis] - alignmentOffset,
        data: {
          [axis]: offset,
          centerOffset: center - offset + alignmentOffset
        }
      };
    }
  });

  const sides = ['top', 'right', 'bottom', 'left'];
  const allPlacements = /*#__PURE__*/sides.reduce((acc, side) => acc.concat(side, side + "-start", side + "-end"), []);

  const oppositeSideMap = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
  }

  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const mainAxis = getMainAxisFromPlacement(placement);
    const length = getLengthFromAxis(mainAxis);
    let mainAlignmentSide = mainAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return {
      main: mainAlignmentSide,
      cross: getOppositePlacement(mainAlignmentSide)
    };
  }

  const oppositeAlignmentMap = {
    start: 'end',
    end: 'start'
  };
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
  }

  function getPlacementList(alignment, autoAlignment, allowedPlacements) {
    const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter(placement => getAlignment(placement) === alignment), ...allowedPlacements.filter(placement => getAlignment(placement) !== alignment)] : allowedPlacements.filter(placement => getSide(placement) === placement);
    return allowedPlacementsSortedByAlignment.filter(placement => {
      if (alignment) {
        return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
      }
      return true;
    });
  }
  /**
   * Optimizes the visibility of the floating element by choosing the placement
   * that has the most space available automatically, without needing to specify a
   * preferred placement. Alternative to `flip`.
   * @see https://floating-ui.com/docs/autoPlacement
   */
  const autoPlacement = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'autoPlacement',
      options,
      async fn(state) {
        var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
        const {
          rects,
          middlewareData,
          placement,
          platform,
          elements
        } = state;
        const {
          crossAxis = false,
          alignment,
          allowedPlacements = allPlacements,
          autoAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state);
        const placements = alignment !== undefined || allowedPlacements === allPlacements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
        const currentPlacement = placements[currentIndex];
        if (currentPlacement == null) {
          return {};
        }
        const {
          main,
          cross
        } = getAlignmentSides(currentPlacement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));

        // Make `computeCoords` start from the right place.
        if (placement !== currentPlacement) {
          return {
            reset: {
              placement: placements[0]
            }
          };
        }
        const currentOverflows = [overflow[getSide(currentPlacement)], overflow[main], overflow[cross]];
        const allOverflows = [...(((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || []), {
          placement: currentPlacement,
          overflows: currentOverflows
        }];
        const nextPlacement = placements[currentIndex + 1];

        // There are more placements to check.
        if (nextPlacement) {
          return {
            data: {
              index: currentIndex + 1,
              overflows: allOverflows
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        const placementsSortedByMostSpace = allOverflows.map(d => {
          const alignment = getAlignment(d.placement);
          return [d.placement, alignment && crossAxis ?
            // Check along the mainAxis and main crossAxis side.
            d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0) :
            // Check only the mainAxis.
            d.overflows[0], d.overflows];
        }).sort((a, b) => a[1] - b[1]);
        const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter(d => d[2].slice(0,
          // Aligned placements should not check their opposite crossAxis
          // side.
          getAlignment(d[0]) ? 2 : 3).every(v => v <= 0));
        const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
        if (resetPlacement !== placement) {
          return {
            data: {
              index: currentIndex + 1,
              overflows: allOverflows
            },
            reset: {
              placement: resetPlacement
            }
          };
        }
        return {};
      }
    };
  };

  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }

  function getSideList(side, isStart, rtl) {
    const lr = ['left', 'right'];
    const rl = ['right', 'left'];
    const tb = ['top', 'bottom'];
    const bt = ['bottom', 'top'];
    switch (side) {
      case 'top':
      case 'bottom':
        if (rtl) return isStart ? rl : lr;
        return isStart ? lr : rl;
      case 'left':
      case 'right':
        return isStart ? tb : bt;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === 'start', rtl);
    if (alignment) {
      list = list.map(side => side + "-" + alignment);
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }

  /**
   * Optimizes the visibility of the floating element by flipping the `placement`
   * in order to keep it in view when the preferred placement(s) will overflow the
   * clipping boundary. Alternative to `autoPlacement`.
   * @see https://floating-ui.com/docs/flip
   */
  const flip = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'flip',
      options,
      async fn(state) {
        var _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform,
          elements
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = 'bestFit',
          fallbackAxisSideDirection = 'none',
          flipAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state);
        const side = getSide(placement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== 'none') {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements = [initialPlacement, ...fallbackPlacements];
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const {
            main,
            cross
          } = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[main], overflow[cross]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];

        // One or more sides is overflowing.
        if (!overflows.every(side => side <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements[nextIndex];
          if (nextPlacement) {
            // Try next placement and re-run the lifecycle.
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }

          // First, find the candidates that fit on the mainAxis side of overflow,
          // then find the placement that fits the best on the main crossAxis side.
          let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

          // Otherwise fallback.
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case 'bestFit':
              {
                var _overflowsData$map$so;
                const placement = (_overflowsData$map$so = overflowsData.map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
              case 'initialPlacement':
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      }
    };
  };

  function getSideOffsets(overflow, rect) {
    return {
      top: overflow.top - rect.height,
      right: overflow.right - rect.width,
      bottom: overflow.bottom - rect.height,
      left: overflow.left - rect.width
    };
  }
  function isAnySideFullyClipped(overflow) {
    return sides.some(side => overflow[side] >= 0);
  }
  /**
   * Provides data to hide the floating element in applicable situations, such as
   * when it is not in the same clipping context as the reference element.
   * @see https://floating-ui.com/docs/hide
   */
  const hide = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'hide',
      options,
      async fn(state) {
        const {
          rects
        } = state;
        const {
          strategy = 'referenceHidden',
          ...detectOverflowOptions
        } = evaluate(options, state);
        switch (strategy) {
          case 'referenceHidden':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: 'reference'
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
          case 'escaped':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
          default:
          {
            return {};
          }
        }
      }
    };
  };

  function getBoundingRect(rects) {
    const minX = min(...rects.map(rect => rect.left));
    const minY = min(...rects.map(rect => rect.top));
    const maxX = max(...rects.map(rect => rect.right));
    const maxY = max(...rects.map(rect => rect.bottom));
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
  function getRectsByLine(rects) {
    const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
    const groups = [];
    let prevRect = null;
    for (let i = 0; i < sortedRects.length; i++) {
      const rect = sortedRects[i];
      if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
        groups.push([rect]);
      } else {
        groups[groups.length - 1].push(rect);
      }
      prevRect = rect;
    }
    return groups.map(rect => rectToClientRect(getBoundingRect(rect)));
  }
  /**
   * Provides improved positioning for inline reference elements that can span
   * over multiple lines, such as hyperlinks or range selections.
   * @see https://floating-ui.com/docs/inline
   */
  const inline = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'inline',
      options,
      async fn(state) {
        const {
          placement,
          elements,
          rects,
          platform,
          strategy
        } = state;
        // A MouseEvent's client{X,Y} coords can be up to 2 pixels off a
        // ClientRect's bounds, despite the event listener being triggered. A
        // padding of 2 seems to handle this issue.
        const {
          padding = 2,
          x,
          y
        } = evaluate(options, state);
        const nativeClientRects = Array.from((await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference))) || []);
        const clientRects = getRectsByLine(nativeClientRects);
        const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
        const paddingObject = getSideObjectFromPadding(padding);
        function getBoundingClientRect() {
          // There are two rects and they are disjoined.
          if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
            // Find the first rect in which the point is fully inside.
            return clientRects.find(rect => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
          }

          // There are 2 or more connected rects.
          if (clientRects.length >= 2) {
            if (getMainAxisFromPlacement(placement) === 'x') {
              const firstRect = clientRects[0];
              const lastRect = clientRects[clientRects.length - 1];
              const isTop = getSide(placement) === 'top';
              const top = firstRect.top;
              const bottom = lastRect.bottom;
              const left = isTop ? firstRect.left : lastRect.left;
              const right = isTop ? firstRect.right : lastRect.right;
              const width = right - left;
              const height = bottom - top;
              return {
                top,
                bottom,
                left,
                right,
                width,
                height,
                x: left,
                y: top
              };
            }
            const isLeftSide = getSide(placement) === 'left';
            const maxRight = max(...clientRects.map(rect => rect.right));
            const minLeft = min(...clientRects.map(rect => rect.left));
            const measureRects = clientRects.filter(rect => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
            const top = measureRects[0].top;
            const bottom = measureRects[measureRects.length - 1].bottom;
            const left = minLeft;
            const right = maxRight;
            const width = right - left;
            const height = bottom - top;
            return {
              top,
              bottom,
              left,
              right,
              width,
              height,
              x: left,
              y: top
            };
          }
          return fallback;
        }
        const resetRects = await platform.getElementRects({
          reference: {
            getBoundingClientRect
          },
          floating: elements.floating,
          strategy
        });
        if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
          return {
            reset: {
              rects: resetRects
            }
          };
        }
        return {};
      }
    };
  };

  async function convertValueToCoords(state, options) {
    const {
      placement,
      platform,
      elements
    } = state;
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getMainAxisFromPlacement(placement) === 'x';
    const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state);

    // eslint-disable-next-line prefer-const
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === 'number' ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: 0,
      crossAxis: 0,
      alignmentAxis: null,
      ...rawValue
    };
    if (alignment && typeof alignmentAxis === 'number') {
      crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }

  /**
   * Modifies the placement by translating the floating element along the
   * specified axes.
   * A number (shorthand for `mainAxis` or distance), or an axes configuration
   * object may be passed.
   * @see https://floating-ui.com/docs/offset
   */
  const offset = function (options) {
    if (options === void 0) {
      options = 0;
    }
    return {
      name: 'offset',
      options,
      async fn(state) {
        const {
          x,
          y
        } = state;
        const diffCoords = await convertValueToCoords(state, options);
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: diffCoords
        };
      }
    };
  };

  function getCrossAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }

  /**
   * Optimizes the visibility of the floating element by shifting it in order to
   * keep it in view when it will overflow the clipping boundary.
   * @see https://floating-ui.com/docs/shift
   */
  const shift = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'shift',
      options,
      async fn(state) {
        const {
          x,
          y,
          placement
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: _ref => {
              let {
                x,
                y
              } = _ref;
              return {
                x,
                y
              };
            }
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const coords = {
          x,
          y
        };
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const mainAxis = getMainAxisFromPlacement(getSide(placement));
        const crossAxis = getCrossAxis(mainAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        if (checkMainAxis) {
          const minSide = mainAxis === 'y' ? 'top' : 'left';
          const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
          const min = mainAxisCoord + overflow[minSide];
          const max = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = within(min, mainAxisCoord, max);
        }
        if (checkCrossAxis) {
          const minSide = crossAxis === 'y' ? 'top' : 'left';
          const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
          const min = crossAxisCoord + overflow[minSide];
          const max = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = within(min, crossAxisCoord, max);
        }
        const limitedCoords = limiter.fn({
          ...state,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return {
          ...limitedCoords,
          data: {
            x: limitedCoords.x - x,
            y: limitedCoords.y - y
          }
        };
      }
    };
  };
  /**
   * Built-in `limiter` that will stop `shift()` at a certain point.
   */
  const limitShift = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      options,
      fn(state) {
        const {
          x,
          y,
          placement,
          rects,
          middlewareData
        } = state;
        const {
          offset = 0,
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true
        } = evaluate(options, state);
        const coords = {
          x,
          y
        };
        const mainAxis = getMainAxisFromPlacement(placement);
        const crossAxis = getCrossAxis(mainAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        const rawOffset = evaluate(offset, state);
        const computedOffset = typeof rawOffset === 'number' ? {
          mainAxis: rawOffset,
          crossAxis: 0
        } : {
          mainAxis: 0,
          crossAxis: 0,
          ...rawOffset
        };
        if (checkMainAxis) {
          const len = mainAxis === 'y' ? 'height' : 'width';
          const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
          const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
          if (mainAxisCoord < limitMin) {
            mainAxisCoord = limitMin;
          } else if (mainAxisCoord > limitMax) {
            mainAxisCoord = limitMax;
          }
        }
        if (checkCrossAxis) {
          var _middlewareData$offse, _middlewareData$offse2;
          const len = mainAxis === 'y' ? 'width' : 'height';
          const isOriginSide = ['top', 'left'].includes(getSide(placement));
          const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
          const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
          if (crossAxisCoord < limitMin) {
            crossAxisCoord = limitMin;
          } else if (crossAxisCoord > limitMax) {
            crossAxisCoord = limitMax;
          }
        }
        return {
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        };
      }
    };
  };

  /**
   * Provides data that allows you to change the size of the floating element —
   * for instance, prevent it from overflowing the clipping boundary or match the
   * width of the reference element.
   * @see https://floating-ui.com/docs/size
   */
  const size = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'size',
      options,
      async fn(state) {
        const {
          placement,
          rects,
          platform,
          elements
        } = state;
        const {
          apply = () => {},
          ...detectOverflowOptions
        } = evaluate(options, state);
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const side = getSide(placement);
        const alignment = getAlignment(placement);
        const axis = getMainAxisFromPlacement(placement);
        const isXAxis = axis === 'x';
        const {
          width,
          height
        } = rects.floating;
        let heightSide;
        let widthSide;
        if (side === 'top' || side === 'bottom') {
          heightSide = side;
          widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
        } else {
          widthSide = side;
          heightSide = alignment === 'end' ? 'top' : 'bottom';
        }
        const overflowAvailableHeight = height - overflow[heightSide];
        const overflowAvailableWidth = width - overflow[widthSide];
        const noShift = !state.middlewareData.shift;
        let availableHeight = overflowAvailableHeight;
        let availableWidth = overflowAvailableWidth;
        if (isXAxis) {
          const maximumClippingWidth = width - overflow.left - overflow.right;
          availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
        } else {
          const maximumClippingHeight = height - overflow.top - overflow.bottom;
          availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
        }
        if (noShift && !alignment) {
          const xMin = max(overflow.left, 0);
          const xMax = max(overflow.right, 0);
          const yMin = max(overflow.top, 0);
          const yMax = max(overflow.bottom, 0);
          if (isXAxis) {
            availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
          } else {
            availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
          }
        }
        await apply({
          ...state,
          availableWidth,
          availableHeight
        });
        const nextDimensions = await platform.getDimensions(elements.floating);
        if (width !== nextDimensions.width || height !== nextDimensions.height) {
          return {
            reset: {
              rects: true
            }
          };
        }
        return {};
      }
    };
  };

  exports.arrow = arrow;
  exports.autoPlacement = autoPlacement;
  exports.computePosition = computePosition;
  exports.detectOverflow = detectOverflow;
  exports.flip = flip;
  exports.hide = hide;
  exports.inline = inline;
  exports.limitShift = limitShift;
  exports.offset = offset;
  exports.rectToClientRect = rectToClientRect;
  exports.shift = shift;
  exports.size = size;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
;
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@floating-ui/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@floating-ui/core'], factory) :
      (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FloatingUIDOM = {}, global.FloatingUICore));
})(this, (function (exports, core) { 'use strict';

  function getWindow(node) {
    var _node$ownerDocument;
    return ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }

  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }

  function isNode(value) {
    return value instanceof getWindow(value).Node;
  }
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || '').toLowerCase();
    }
    // Mocked nodes in testing environments may not be instances of Node. By
    // returning `#document` an infinite loop won't occur.
    // https://github.com/floating-ui/floating-ui/issues/2317
    return '#document';
  }

  function isHTMLElement(value) {
    return value instanceof getWindow(value).HTMLElement;
  }
  function isElement(value) {
    return value instanceof getWindow(value).Element;
  }
  function isShadowRoot(node) {
    // Browsers without `ShadowRoot` support.
    if (typeof ShadowRoot === 'undefined') {
      return false;
    }
    return node instanceof getWindow(node).ShadowRoot || node instanceof ShadowRoot;
  }
  function isOverflowElement(element) {
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle$1(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
  }
  function isTableElement(element) {
    return ['table', 'td', 'th'].includes(getNodeName(element));
  }
  function isContainingBlock(element) {
    const safari = isSafari();
    const css = getComputedStyle$1(element);

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    return css.transform !== 'none' || css.perspective !== 'none' || !safari && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !safari && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
  }
  function isSafari() {
    if (typeof CSS === 'undefined' || !CSS.supports) return false;
    return CSS.supports('-webkit-backdrop-filter', 'none');
  }
  function isLastTraversableNode(node) {
    return ['html', 'body', '#document'].includes(getNodeName(node));
  }

  const min = Math.min;
  const max = Math.max;
  const round = Math.round;
  const floor = Math.floor;
  const createEmptyCoords = v => ({
    x: v,
    y: v
  });

  function getCssDimensions(element) {
    const css = getComputedStyle$1(element);
    // In testing environments, the `width` and `height` properties are empty
    // strings for SVG elements, returning NaN. Fallback to `0` in this case.
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }

  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }

  function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createEmptyCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
      width,
      height,
      $
    } = getCssDimensions(domElement);
    let x = ($ ? round(rect.width) : rect.width) / width;
    let y = ($ ? round(rect.height) : rect.height) / height;

    // 0, NaN, or Infinity should always fallback to 1.

    if (!x || !Number.isFinite(x)) {
      x = 1;
    }
    if (!y || !Number.isFinite(y)) {
      y = 1;
    }
    return {
      x,
      y
    };
  }

  const noOffsets = /*#__PURE__*/createEmptyCoords(0);
  function getVisualOffsets(element, isFixed, floatingOffsetParent) {
    var _win$visualViewport, _win$visualViewport2;
    if (isFixed === void 0) {
      isFixed = true;
    }
    if (!isSafari()) {
      return noOffsets;
    }
    const win = element ? getWindow(element) : window;
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== win) {
      return noOffsets;
    }
    return {
      x: ((_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) || 0,
      y: ((_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) || 0
    };
  }

  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = createEmptyCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    const visualOffsets = getVisualOffsets(domElement, isFixedStrategy, offsetParent);
    let x = (clientRect.left + visualOffsets.x) / scale.x;
    let y = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement) {
      const win = getWindow(domElement);
      const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentIFrame = win.frameElement;
      while (currentIFrame && offsetParent && offsetWin !== win) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css = getComputedStyle(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x *= iframeScale.x;
        y *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x += left;
        y += top;
        currentIFrame = getWindow(currentIFrame).frameElement;
      }
    }
    return core.rectToClientRect({
      width,
      height,
      x,
      y
    });
  }

  function getDocumentElement(node) {
    return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
  }

  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.pageXOffset,
      scrollTop: element.pageYOffset
    };
  }

  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    if (offsetParent === documentElement) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale = createEmptyCoords(1);
    const offsets = createEmptyCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
    };
  }

  function getWindowScrollBarX(element) {
    // If <html> has a CSS width greater than the viewport, then this will be
    // incorrect for RTL.
    return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
  }

  // Gets the entire size of the scrollable document area, even extending outside
  // of the `<html>` and `<body>` rect bounds if horizontally scrollable.
  function getDocumentRect(element) {
    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = element.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y = -scroll.scrollTop;
    if (getComputedStyle$1(body).direction === 'rtl') {
      x += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  function getParentNode(node) {
    if (getNodeName(node) === 'html') {
      return node;
    }
    const result =
      // Step into the shadow DOM of the parent of a slotted node.
      node.assignedSlot ||
      // DOM Element detected.
      node.parentNode ||
      // ShadowRoot detected.
      isShadowRoot(node) && node.host ||
      // Fallback.
      getDocumentElement(node);
    return isShadowRoot(result) ? result.host : result;
  }

  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }

  function getOverflowAncestors(node, list) {
    var _node$ownerDocument;
    if (list === void 0) {
      list = [];
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
  }

  function getViewportRect(element, strategy) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      const visualViewportBased = isSafari();
      if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  // Returns the inner client rect, subtracting scrollbars if present.
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = isHTMLElement(element) ? getScale(element) : createEmptyCoords(1);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x = left * scale.x;
    const y = top * scale.y;
    return {
      width,
      height,
      x,
      y
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === 'viewport') {
      rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === 'document') {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element);
      rect = {
        ...clippingAncestor,
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y
      };
    }
    return core.rectToClientRect(rect);
  }
  function hasFixedPositionAncestor(element, stopNode) {
    const parentNode = getParentNode(element);
    if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
      return false;
    }
    return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
  }

  // A "clipping ancestor" is an `overflow` element with the characteristic of
  // clipping (or hiding) child elements. This returns all clipping ancestors
  // of the given element up the tree.
  function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element).filter(el => isElement(el) && getNodeName(el) !== 'body');
    let currentContainingBlockComputedStyle = null;
    const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
    let currentNode = elementIsFixed ? getParentNode(element) : element;

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle$1(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
        currentContainingBlockComputedStyle = null;
      }
      const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
      if (shouldDropCurrentNode) {
        // Drop non-containing blocks.
        result = result.filter(ancestor => ancestor !== currentNode);
      } else {
        // Record last containing block for next iteration.
        currentContainingBlockComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }

  // Gets the maximum area that the element is visible in due to any number of
  // clipping ancestors.
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const elementClippingAncestors = boundary === 'clippingAncestors' ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }

  function getDimensions(element) {
    return getCssDimensions(element);
  }

  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    return element.offsetParent;
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else {
        currentNode = getParentNode(currentNode);
      }
    }
    return null;
  }

  // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.
  function getOffsetParent(element, polyfill) {
    const window = getWindow(element);
    if (!isHTMLElement(element)) {
      return window;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
      return window;
    }
    return offsetParent || getContainingBlock(element) || window;
  }

  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === 'fixed';
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createEmptyCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        offsets.x = getWindowScrollBarX(documentElement);
      }
    }
    return {
      x: rect.left + scroll.scrollLeft - offsets.x,
      y: rect.top + scroll.scrollTop - offsets.y,
      width: rect.width,
      height: rect.height
    };
  }

  const platform = {
    getClippingRect,
    convertOffsetParentRelativeRectToViewportRelativeRect,
    isElement,
    getDimensions,
    getOffsetParent,
    getDocumentElement,
    getScale,
    async getElementRects(_ref) {
      let {
        reference,
        floating,
        strategy
      } = _ref;
      const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
      const getDimensionsFn = this.getDimensions;
      return {
        reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
        floating: {
          x: 0,
          y: 0,
          ...(await getDimensionsFn(floating))
        }
      };
    },
    getClientRects: element => Array.from(element.getClientRects()),
    isRTL: element => getComputedStyle$1(element).direction === 'rtl'
  };

  // https://samthor.au/2021/observing-dom/
  function observeMove(element, onMove) {
    let io = null;
    let timeoutId;
    const root = getDocumentElement(element);
    function cleanup() {
      clearTimeout(timeoutId);
      io && io.disconnect();
      io = null;
    }
    function refresh(skip, threshold) {
      if (skip === void 0) {
        skip = false;
      }
      if (threshold === void 0) {
        threshold = 1;
      }
      cleanup();
      const {
        left,
        top,
        width,
        height
      } = element.getBoundingClientRect();
      if (!skip) {
        onMove();
      }
      if (!width || !height) {
        return;
      }
      const insetTop = floor(top);
      const insetRight = floor(root.clientWidth - (left + width));
      const insetBottom = floor(root.clientHeight - (top + height));
      const insetLeft = floor(left);
      const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
      let isFirstUpdate = true;
      io = new IntersectionObserver(entries => {
        const ratio = entries[0].intersectionRatio;
        if (ratio !== threshold) {
          if (!isFirstUpdate) {
            return refresh();
          }
          if (ratio === 0) {
            timeoutId = setTimeout(() => {
              refresh(false, 1e-7);
            }, 100);
          } else {
            refresh(false, ratio);
          }
        }
        isFirstUpdate = false;
      }, {
        rootMargin,
        threshold
      });
      io.observe(element);
    }
    refresh(true);
    return cleanup;
  }

  /**
   * Automatically updates the position of the floating element when necessary.
   * Should only be called when the floating element is mounted on the DOM or
   * visible on the screen.
   * @returns cleanup function that should be invoked when the floating element is
   * removed from the DOM or hidden from the screen.
   * @see https://floating-ui.com/docs/autoUpdate
   */
  function autoUpdate(reference, floating, update, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      ancestorScroll = true,
      ancestorResize = true,
      elementResize = true,
      layoutShift = typeof IntersectionObserver === 'function',
      animationFrame = false
    } = options;
    const referenceEl = unwrapElement(reference);
    const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.addEventListener('scroll', update, {
        passive: true
      });
      ancestorResize && ancestor.addEventListener('resize', update);
    });
    const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
    let resizeObserver = null;
    if (elementResize) {
      resizeObserver = new ResizeObserver(update);
      if (referenceEl && !animationFrame) {
        resizeObserver.observe(referenceEl);
      }
      resizeObserver.observe(floating);
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
      frameLoop();
    }
    function frameLoop() {
      const nextRefRect = getBoundingClientRect(reference);
      if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
        update();
      }
      prevRefRect = nextRefRect;
      frameId = requestAnimationFrame(frameLoop);
    }
    update();
    return () => {
      ancestors.forEach(ancestor => {
        ancestorScroll && ancestor.removeEventListener('scroll', update);
        ancestorResize && ancestor.removeEventListener('resize', update);
      });
      cleanupIo && cleanupIo();
      resizeObserver && resizeObserver.disconnect();
      resizeObserver = null;
      if (animationFrame) {
        cancelAnimationFrame(frameId);
      }
    };
  }

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a reference element when it is given a certain CSS positioning
   * strategy.
   */
  const computePosition = (reference, floating, options) => {
    // This caches the expensive `getClippingElementAncestors` function so that
    // multiple lifecycle resets re-use the same result. It only lives for a
    // single call. If other functions become expensive, we can add them as well.
    const cache = new Map();
    const mergedOptions = {
      platform,
      ...options
    };
    const platformWithCache = {
      ...mergedOptions.platform,
      _c: cache
    };
    return core.computePosition(reference, floating, {
      ...mergedOptions,
      platform: platformWithCache
    });
  };

  Object.defineProperty(exports, 'arrow', {
    enumerable: true,
    get: function () { return core.arrow; }
  });
  Object.defineProperty(exports, 'autoPlacement', {
    enumerable: true,
    get: function () { return core.autoPlacement; }
  });
  Object.defineProperty(exports, 'detectOverflow', {
    enumerable: true,
    get: function () { return core.detectOverflow; }
  });
  Object.defineProperty(exports, 'flip', {
    enumerable: true,
    get: function () { return core.flip; }
  });
  Object.defineProperty(exports, 'hide', {
    enumerable: true,
    get: function () { return core.hide; }
  });
  Object.defineProperty(exports, 'inline', {
    enumerable: true,
    get: function () { return core.inline; }
  });
  Object.defineProperty(exports, 'limitShift', {
    enumerable: true,
    get: function () { return core.limitShift; }
  });
  Object.defineProperty(exports, 'offset', {
    enumerable: true,
    get: function () { return core.offset; }
  });
  Object.defineProperty(exports, 'shift', {
    enumerable: true,
    get: function () { return core.shift; }
  });
  Object.defineProperty(exports, 'size', {
    enumerable: true,
    get: function () { return core.size; }
  });
  exports.autoUpdate = autoUpdate;
  exports.computePosition = computePosition;
  exports.getOverflowAncestors = getOverflowAncestors;
  exports.platform = platform;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
;
((Drupal,once,_ref)=>{let {computePosition,offset,shift,flip}=_ref;Drupal.theme.ginTooltipWrapper=(dataset,title)=>`<div class="gin-tooltip ${dataset.drupalTooltipClass||""}">\n      ${dataset.drupalTooltip||title}\n    </div>`,Drupal.behaviors.ginTooltip={attach:(context)=>{Drupal.ginTooltip.init(context);}},Drupal.ginTooltip={init:function(context){once("ginTooltipInit","[data-gin-tooltip]",context).forEach(((trigger)=>{const title=trigger.title;title&&(trigger.title=""),trigger.insertAdjacentHTML("afterend",Drupal.theme.ginTooltipWrapper(trigger.dataset,title));const tooltip=trigger.nextElementSibling,updatePosition=()=>{this.computePosition(trigger,tooltip);};new ResizeObserver(updatePosition).observe(trigger),new MutationObserver(updatePosition).observe(trigger,{attributes:!0,childList:!0,subtree:!0}),trigger.addEventListener("mouseover",updatePosition),trigger.addEventListener("focus",updatePosition);}));},computePosition:function(trigger,tooltip){let placement=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"bottom-end";computePosition(trigger,tooltip,{strategy:"absolute",placement:trigger.dataset.drupalTooltipPosition||placement,middleware:[flip({padding:16}),offset(6),shift({padding:16})]}).then(((_ref2)=>{let {x,y}=_ref2;Object.assign(tooltip.style,{"inset-inline-start":`${x}px`,"inset-block-start":`${y}px`});}));}};})(Drupal,once,FloatingUIDOM);;
((Drupal)=>{Drupal.behaviors.ginSticky={attach:()=>{once("ginSticky",".region-sticky-watcher").forEach((()=>{const observer=new IntersectionObserver(((_ref)=>{let [e]=_ref;const regionSticky=document.querySelector(".region-sticky");regionSticky.classList.toggle("region-sticky--is-sticky",e.intersectionRatio<1),regionSticky.toggleAttribute("data-offset-top",e.intersectionRatio<1),Drupal.displace(!0);}),{threshold:[1]}),element=document.querySelector(".region-sticky-watcher");element&&observer.observe(element);}));}};})(Drupal);;
/* @license MIT https://github.com/floating-ui/floating-ui/blob/@floating-ui/dom@1.7.0/LICENSE */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).FloatingUICore={})}(this,(function(t){"use strict";const e=["top","right","bottom","left"],n=["start","end"],i=e.reduce(((t,e)=>t.concat(e,e+"-"+n[0],e+"-"+n[1])),[]),o=Math.min,r=Math.max,a={left:"right",right:"left",bottom:"top",top:"bottom"},l={start:"end",end:"start"};function s(t,e,n){return r(t,o(e,n))}function f(t,e){return"function"==typeof t?t(e):t}function c(t){return t.split("-")[0]}function u(t){return t.split("-")[1]}function m(t){return"x"===t?"y":"x"}function d(t){return"y"===t?"height":"width"}function g(t){return["top","bottom"].includes(c(t))?"y":"x"}function p(t){return m(g(t))}function h(t,e,n){void 0===n&&(n=!1);const i=u(t),o=p(t),r=d(o);let a="x"===o?i===(n?"end":"start")?"right":"left":"start"===i?"bottom":"top";return e.reference[r]>e.floating[r]&&(a=w(a)),[a,w(a)]}function y(t){return t.replace(/start|end/g,(t=>l[t]))}function w(t){return t.replace(/left|right|bottom|top/g,(t=>a[t]))}function x(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function v(t){const{x:e,y:n,width:i,height:o}=t;return{width:i,height:o,top:n,left:e,right:e+i,bottom:n+o,x:e,y:n}}function b(t,e,n){let{reference:i,floating:o}=t;const r=g(e),a=p(e),l=d(a),s=c(e),f="y"===r,m=i.x+i.width/2-o.width/2,h=i.y+i.height/2-o.height/2,y=i[l]/2-o[l]/2;let w;switch(s){case"top":w={x:m,y:i.y-o.height};break;case"bottom":w={x:m,y:i.y+i.height};break;case"right":w={x:i.x+i.width,y:h};break;case"left":w={x:i.x-o.width,y:h};break;default:w={x:i.x,y:i.y}}switch(u(e)){case"start":w[a]-=y*(n&&f?-1:1);break;case"end":w[a]+=y*(n&&f?-1:1)}return w}async function A(t,e){var n;void 0===e&&(e={});const{x:i,y:o,platform:r,rects:a,elements:l,strategy:s}=t,{boundary:c="clippingAncestors",rootBoundary:u="viewport",elementContext:m="floating",altBoundary:d=!1,padding:g=0}=f(e,t),p=x(g),h=l[d?"floating"===m?"reference":"floating":m],y=v(await r.getClippingRect({element:null==(n=await(null==r.isElement?void 0:r.isElement(h)))||n?h:h.contextElement||await(null==r.getDocumentElement?void 0:r.getDocumentElement(l.floating)),boundary:c,rootBoundary:u,strategy:s})),w="floating"===m?{x:i,y:o,width:a.floating.width,height:a.floating.height}:a.reference,b=await(null==r.getOffsetParent?void 0:r.getOffsetParent(l.floating)),A=await(null==r.isElement?void 0:r.isElement(b))&&await(null==r.getScale?void 0:r.getScale(b))||{x:1,y:1},R=v(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:w,offsetParent:b,strategy:s}):w);return{top:(y.top-R.top+p.top)/A.y,bottom:(R.bottom-y.bottom+p.bottom)/A.y,left:(y.left-R.left+p.left)/A.x,right:(R.right-y.right+p.right)/A.x}}function R(t,e){return{top:t.top-e.height,right:t.right-e.width,bottom:t.bottom-e.height,left:t.left-e.width}}function P(t){return e.some((e=>t[e]>=0))}function D(t){const e=o(...t.map((t=>t.left))),n=o(...t.map((t=>t.top)));return{x:e,y:n,width:r(...t.map((t=>t.right)))-e,height:r(...t.map((t=>t.bottom)))-n}}t.arrow=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:i,placement:r,rects:a,platform:l,elements:c,middlewareData:m}=e,{element:g,padding:h=0}=f(t,e)||{};if(null==g)return{};const y=x(h),w={x:n,y:i},v=p(r),b=d(v),A=await l.getDimensions(g),R="y"===v,P=R?"top":"left",D=R?"bottom":"right",T=R?"clientHeight":"clientWidth",O=a.reference[b]+a.reference[v]-w[v]-a.floating[b],E=w[v]-a.reference[v],L=await(null==l.getOffsetParent?void 0:l.getOffsetParent(g));let k=L?L[T]:0;k&&await(null==l.isElement?void 0:l.isElement(L))||(k=c.floating[T]||a.floating[b]);const C=O/2-E/2,B=k/2-A[b]/2-1,H=o(y[P],B),S=o(y[D],B),F=H,j=k-A[b]-S,z=k/2-A[b]/2+C,M=s(F,z,j),V=!m.arrow&&null!=u(r)&&z!==M&&a.reference[b]/2-(z<F?H:S)-A[b]/2<0,W=V?z<F?z-F:z-j:0;return{[v]:w[v]+W,data:{[v]:M,centerOffset:z-M-W,...V&&{alignmentOffset:W}},reset:V}}}),t.autoPlacement=function(t){return void 0===t&&(t={}),{name:"autoPlacement",options:t,async fn(e){var n,o,r;const{rects:a,middlewareData:l,placement:s,platform:m,elements:d}=e,{crossAxis:g=!1,alignment:p,allowedPlacements:w=i,autoAlignment:x=!0,...v}=f(t,e),b=void 0!==p||w===i?function(t,e,n){return(t?[...n.filter((e=>u(e)===t)),...n.filter((e=>u(e)!==t))]:n.filter((t=>c(t)===t))).filter((n=>!t||u(n)===t||!!e&&y(n)!==n))}(p||null,x,w):w,R=await A(e,v),P=(null==(n=l.autoPlacement)?void 0:n.index)||0,D=b[P];if(null==D)return{};const T=h(D,a,await(null==m.isRTL?void 0:m.isRTL(d.floating)));if(s!==D)return{reset:{placement:b[0]}};const O=[R[c(D)],R[T[0]],R[T[1]]],E=[...(null==(o=l.autoPlacement)?void 0:o.overflows)||[],{placement:D,overflows:O}],L=b[P+1];if(L)return{data:{index:P+1,overflows:E},reset:{placement:L}};const k=E.map((t=>{const e=u(t.placement);return[t.placement,e&&g?t.overflows.slice(0,2).reduce(((t,e)=>t+e),0):t.overflows[0],t.overflows]})).sort(((t,e)=>t[1]-e[1])),C=(null==(r=k.filter((t=>t[2].slice(0,u(t[0])?2:3).every((t=>t<=0))))[0])?void 0:r[0])||k[0][0];return C!==s?{data:{index:P+1,overflows:E},reset:{placement:C}}:{}}}},t.computePosition=async(t,e,n)=>{const{placement:i="bottom",strategy:o="absolute",middleware:r=[],platform:a}=n,l=r.filter(Boolean),s=await(null==a.isRTL?void 0:a.isRTL(e));let f=await a.getElementRects({reference:t,floating:e,strategy:o}),{x:c,y:u}=b(f,i,s),m=i,d={},g=0;for(let n=0;n<l.length;n++){const{name:r,fn:p}=l[n],{x:h,y:y,data:w,reset:x}=await p({x:c,y:u,initialPlacement:i,placement:m,strategy:o,middlewareData:d,rects:f,platform:a,elements:{reference:t,floating:e}});c=null!=h?h:c,u=null!=y?y:u,d={...d,[r]:{...d[r],...w}},x&&g<=50&&(g++,"object"==typeof x&&(x.placement&&(m=x.placement),x.rects&&(f=!0===x.rects?await a.getElementRects({reference:t,floating:e,strategy:o}):x.rects),({x:c,y:u}=b(f,m,s))),n=-1)}return{x:c,y:u,placement:m,strategy:o,middlewareData:d}},t.detectOverflow=A,t.flip=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var n,i;const{placement:o,middlewareData:r,rects:a,initialPlacement:l,platform:s,elements:m}=e,{mainAxis:d=!0,crossAxis:p=!0,fallbackPlacements:x,fallbackStrategy:v="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:R=!0,...P}=f(t,e);if(null!=(n=r.arrow)&&n.alignmentOffset)return{};const D=c(o),T=g(l),O=c(l)===l,E=await(null==s.isRTL?void 0:s.isRTL(m.floating)),L=x||(O||!R?[w(l)]:function(t){const e=w(t);return[y(t),e,y(e)]}(l)),k="none"!==b;!x&&k&&L.push(...function(t,e,n,i){const o=u(t);let r=function(t,e,n){const i=["left","right"],o=["right","left"],r=["top","bottom"],a=["bottom","top"];switch(t){case"top":case"bottom":return n?e?o:i:e?i:o;case"left":case"right":return e?r:a;default:return[]}}(c(t),"start"===n,i);return o&&(r=r.map((t=>t+"-"+o)),e&&(r=r.concat(r.map(y)))),r}(l,R,b,E));const C=[l,...L],B=await A(e,P),H=[];let S=(null==(i=r.flip)?void 0:i.overflows)||[];if(d&&H.push(B[D]),p){const t=h(o,a,E);H.push(B[t[0]],B[t[1]])}if(S=[...S,{placement:o,overflows:H}],!H.every((t=>t<=0))){var F,j;const t=((null==(F=r.flip)?void 0:F.index)||0)+1,e=C[t];if(e){var z;const n="alignment"===p&&T!==g(e),i=(null==(z=S[0])?void 0:z.overflows[0])>0;if(!n||i)return{data:{index:t,overflows:S},reset:{placement:e}}}let n=null==(j=S.filter((t=>t.overflows[0]<=0)).sort(((t,e)=>t.overflows[1]-e.overflows[1]))[0])?void 0:j.placement;if(!n)switch(v){case"bestFit":{var M;const t=null==(M=S.filter((t=>{if(k){const e=g(t.placement);return e===T||"y"===e}return!0})).map((t=>[t.placement,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:M[0];t&&(n=t);break}case"initialPlacement":n=l}if(o!==n)return{reset:{placement:n}}}return{}}}},t.hide=function(t){return void 0===t&&(t={}),{name:"hide",options:t,async fn(e){const{rects:n}=e,{strategy:i="referenceHidden",...o}=f(t,e);switch(i){case"referenceHidden":{const t=R(await A(e,{...o,elementContext:"reference"}),n.reference);return{data:{referenceHiddenOffsets:t,referenceHidden:P(t)}}}case"escaped":{const t=R(await A(e,{...o,altBoundary:!0}),n.floating);return{data:{escapedOffsets:t,escaped:P(t)}}}default:return{}}}}},t.inline=function(t){return void 0===t&&(t={}),{name:"inline",options:t,async fn(e){const{placement:n,elements:i,rects:a,platform:l,strategy:s}=e,{padding:u=2,x:m,y:d}=f(t,e),p=Array.from(await(null==l.getClientRects?void 0:l.getClientRects(i.reference))||[]),h=function(t){const e=t.slice().sort(((t,e)=>t.y-e.y)),n=[];let i=null;for(let t=0;t<e.length;t++){const o=e[t];!i||o.y-i.y>i.height/2?n.push([o]):n[n.length-1].push(o),i=o}return n.map((t=>v(D(t))))}(p),y=v(D(p)),w=x(u);const b=await l.getElementRects({reference:{getBoundingClientRect:function(){if(2===h.length&&h[0].left>h[1].right&&null!=m&&null!=d)return h.find((t=>m>t.left-w.left&&m<t.right+w.right&&d>t.top-w.top&&d<t.bottom+w.bottom))||y;if(h.length>=2){if("y"===g(n)){const t=h[0],e=h[h.length-1],i="top"===c(n),o=t.top,r=e.bottom,a=i?t.left:e.left,l=i?t.right:e.right;return{top:o,bottom:r,left:a,right:l,width:l-a,height:r-o,x:a,y:o}}const t="left"===c(n),e=r(...h.map((t=>t.right))),i=o(...h.map((t=>t.left))),a=h.filter((n=>t?n.left===i:n.right===e)),l=a[0].top,s=a[a.length-1].bottom;return{top:l,bottom:s,left:i,right:e,width:e-i,height:s-l,x:i,y:l}}return y}},floating:i.floating,strategy:s});return a.reference.x!==b.reference.x||a.reference.y!==b.reference.y||a.reference.width!==b.reference.width||a.reference.height!==b.reference.height?{reset:{rects:b}}:{}}}},t.limitShift=function(t){return void 0===t&&(t={}),{options:t,fn(e){const{x:n,y:i,placement:o,rects:r,middlewareData:a}=e,{offset:l=0,mainAxis:s=!0,crossAxis:u=!0}=f(t,e),d={x:n,y:i},p=g(o),h=m(p);let y=d[h],w=d[p];const x=f(l,e),v="number"==typeof x?{mainAxis:x,crossAxis:0}:{mainAxis:0,crossAxis:0,...x};if(s){const t="y"===h?"height":"width",e=r.reference[h]-r.floating[t]+v.mainAxis,n=r.reference[h]+r.reference[t]-v.mainAxis;y<e?y=e:y>n&&(y=n)}if(u){var b,A;const t="y"===h?"width":"height",e=["top","left"].includes(c(o)),n=r.reference[p]-r.floating[t]+(e&&(null==(b=a.offset)?void 0:b[p])||0)+(e?0:v.crossAxis),i=r.reference[p]+r.reference[t]+(e?0:(null==(A=a.offset)?void 0:A[p])||0)-(e?v.crossAxis:0);w<n?w=n:w>i&&(w=i)}return{[h]:y,[p]:w}}}},t.offset=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(e){var n,i;const{x:o,y:r,placement:a,middlewareData:l}=e,s=await async function(t,e){const{placement:n,platform:i,elements:o}=t,r=await(null==i.isRTL?void 0:i.isRTL(o.floating)),a=c(n),l=u(n),s="y"===g(n),m=["left","top"].includes(a)?-1:1,d=r&&s?-1:1,p=f(e,t);let{mainAxis:h,crossAxis:y,alignmentAxis:w}="number"==typeof p?{mainAxis:p,crossAxis:0,alignmentAxis:null}:{mainAxis:p.mainAxis||0,crossAxis:p.crossAxis||0,alignmentAxis:p.alignmentAxis};return l&&"number"==typeof w&&(y="end"===l?-1*w:w),s?{x:y*d,y:h*m}:{x:h*m,y:y*d}}(e,t);return a===(null==(n=l.offset)?void 0:n.placement)&&null!=(i=l.arrow)&&i.alignmentOffset?{}:{x:o+s.x,y:r+s.y,data:{...s,placement:a}}}}},t.rectToClientRect=v,t.shift=function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:i,placement:o}=e,{mainAxis:r=!0,crossAxis:a=!1,limiter:l={fn:t=>{let{x:e,y:n}=t;return{x:e,y:n}}},...u}=f(t,e),d={x:n,y:i},p=await A(e,u),h=g(c(o)),y=m(h);let w=d[y],x=d[h];if(r){const t="y"===y?"bottom":"right";w=s(w+p["y"===y?"top":"left"],w,w-p[t])}if(a){const t="y"===h?"bottom":"right";x=s(x+p["y"===h?"top":"left"],x,x-p[t])}const v=l.fn({...e,[y]:w,[h]:x});return{...v,data:{x:v.x-n,y:v.y-i,enabled:{[y]:r,[h]:a}}}}}},t.size=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(e){var n,i;const{placement:a,rects:l,platform:s,elements:m}=e,{apply:d=()=>{},...p}=f(t,e),h=await A(e,p),y=c(a),w=u(a),x="y"===g(a),{width:v,height:b}=l.floating;let R,P;"top"===y||"bottom"===y?(R=y,P=w===(await(null==s.isRTL?void 0:s.isRTL(m.floating))?"start":"end")?"left":"right"):(P=y,R="end"===w?"top":"bottom");const D=b-h.top-h.bottom,T=v-h.left-h.right,O=o(b-h[R],D),E=o(v-h[P],T),L=!e.middlewareData.shift;let k=O,C=E;if(null!=(n=e.middlewareData.shift)&&n.enabled.x&&(C=T),null!=(i=e.middlewareData.shift)&&i.enabled.y&&(k=D),L&&!w){const t=r(h.left,0),e=r(h.right,0),n=r(h.top,0),i=r(h.bottom,0);x?C=v-2*(0!==t||0!==e?t+e:r(h.left,h.right)):k=b-2*(0!==n||0!==i?n+i:r(h.top,h.bottom))}await d({...e,availableWidth:C,availableHeight:k});const B=await s.getDimensions(m.floating);return v!==B.width||b!==B.height?{reset:{rects:!0}}:{}}}}}));
;
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("@floating-ui/core")):"function"==typeof define&&define.amd?define(["exports","@floating-ui/core"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).FloatingUIDOM={},t.FloatingUICore)}(this,(function(t,e){"use strict";const n=Math.min,o=Math.max,i=Math.round,r=Math.floor,c=t=>({x:t,y:t});function l(){return"undefined"!=typeof window}function s(t){return a(t)?(t.nodeName||"").toLowerCase():"#document"}function f(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function u(t){var e;return null==(e=(a(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function a(t){return!!l()&&(t instanceof Node||t instanceof f(t).Node)}function d(t){return!!l()&&(t instanceof Element||t instanceof f(t).Element)}function h(t){return!!l()&&(t instanceof HTMLElement||t instanceof f(t).HTMLElement)}function p(t){return!(!l()||"undefined"==typeof ShadowRoot)&&(t instanceof ShadowRoot||t instanceof f(t).ShadowRoot)}function g(t){const{overflow:e,overflowX:n,overflowY:o,display:i}=b(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+n)&&!["inline","contents"].includes(i)}function m(t){return["table","td","th"].includes(s(t))}function y(t){return[":popover-open",":modal"].some((e=>{try{return t.matches(e)}catch(t){return!1}}))}function w(t){const e=x(),n=d(t)?b(t):t;return["transform","translate","scale","rotate","perspective"].some((t=>!!n[t]&&"none"!==n[t]))||!!n.containerType&&"normal"!==n.containerType||!e&&!!n.backdropFilter&&"none"!==n.backdropFilter||!e&&!!n.filter&&"none"!==n.filter||["transform","translate","scale","rotate","perspective","filter"].some((t=>(n.willChange||"").includes(t)))||["paint","layout","strict","content"].some((t=>(n.contain||"").includes(t)))}function x(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function v(t){return["html","body","#document"].includes(s(t))}function b(t){return f(t).getComputedStyle(t)}function T(t){return d(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function L(t){if("html"===s(t))return t;const e=t.assignedSlot||t.parentNode||p(t)&&t.host||u(t);return p(e)?e.host:e}function R(t){const e=L(t);return v(e)?t.ownerDocument?t.ownerDocument.body:t.body:h(e)&&g(e)?e:R(e)}function C(t,e,n){var o;void 0===e&&(e=[]),void 0===n&&(n=!0);const i=R(t),r=i===(null==(o=t.ownerDocument)?void 0:o.body),c=f(i);if(r){const t=E(c);return e.concat(c,c.visualViewport||[],g(i)?i:[],t&&n?C(t):[])}return e.concat(i,C(i,[],n))}function E(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function S(t){const e=b(t);let n=parseFloat(e.width)||0,o=parseFloat(e.height)||0;const r=h(t),c=r?t.offsetWidth:n,l=r?t.offsetHeight:o,s=i(n)!==c||i(o)!==l;return s&&(n=c,o=l),{width:n,height:o,$:s}}function F(t){return d(t)?t:t.contextElement}function O(t){const e=F(t);if(!h(e))return c(1);const n=e.getBoundingClientRect(),{width:o,height:r,$:l}=S(e);let s=(l?i(n.width):n.width)/o,f=(l?i(n.height):n.height)/r;return s&&Number.isFinite(s)||(s=1),f&&Number.isFinite(f)||(f=1),{x:s,y:f}}const D=c(0);function H(t){const e=f(t);return x()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:D}function P(t,n,o,i){void 0===n&&(n=!1),void 0===o&&(o=!1);const r=t.getBoundingClientRect(),l=F(t);let s=c(1);n&&(i?d(i)&&(s=O(i)):s=O(t));const u=function(t,e,n){return void 0===e&&(e=!1),!(!n||e&&n!==f(t))&&e}(l,o,i)?H(l):c(0);let a=(r.left+u.x)/s.x,h=(r.top+u.y)/s.y,p=r.width/s.x,g=r.height/s.y;if(l){const t=f(l),e=i&&d(i)?f(i):i;let n=t,o=E(n);for(;o&&i&&e!==n;){const t=O(o),e=o.getBoundingClientRect(),i=b(o),r=e.left+(o.clientLeft+parseFloat(i.paddingLeft))*t.x,c=e.top+(o.clientTop+parseFloat(i.paddingTop))*t.y;a*=t.x,h*=t.y,p*=t.x,g*=t.y,a+=r,h+=c,n=f(o),o=E(n)}}return e.rectToClientRect({width:p,height:g,x:a,y:h})}function W(t,e){const n=T(t).scrollLeft;return e?e.left+n:P(u(t)).left+n}function M(t,e,n){void 0===n&&(n=!1);const o=t.getBoundingClientRect();return{x:o.left+e.scrollLeft-(n?0:W(t,o)),y:o.top+e.scrollTop}}function z(t,n,i){let r;if("viewport"===n)r=function(t,e){const n=f(t),o=u(t),i=n.visualViewport;let r=o.clientWidth,c=o.clientHeight,l=0,s=0;if(i){r=i.width,c=i.height;const t=x();(!t||t&&"fixed"===e)&&(l=i.offsetLeft,s=i.offsetTop)}return{width:r,height:c,x:l,y:s}}(t,i);else if("document"===n)r=function(t){const e=u(t),n=T(t),i=t.ownerDocument.body,r=o(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),c=o(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let l=-n.scrollLeft+W(t);const s=-n.scrollTop;return"rtl"===b(i).direction&&(l+=o(e.clientWidth,i.clientWidth)-r),{width:r,height:c,x:l,y:s}}(u(t));else if(d(n))r=function(t,e){const n=P(t,!0,"fixed"===e),o=n.top+t.clientTop,i=n.left+t.clientLeft,r=h(t)?O(t):c(1);return{width:t.clientWidth*r.x,height:t.clientHeight*r.y,x:i*r.x,y:o*r.y}}(n,i);else{const e=H(t);r={x:n.x-e.x,y:n.y-e.y,width:n.width,height:n.height}}return e.rectToClientRect(r)}function A(t,e){const n=L(t);return!(n===e||!d(n)||v(n))&&("fixed"===b(n).position||A(n,e))}function B(t,e,n){const o=h(e),i=u(e),r="fixed"===n,l=P(t,!0,r,e);let f={scrollLeft:0,scrollTop:0};const a=c(0);function d(){a.x=W(i)}if(o||!o&&!r)if(("body"!==s(e)||g(i))&&(f=T(e)),o){const t=P(e,!0,r,e);a.x=t.x+e.clientLeft,a.y=t.y+e.clientTop}else i&&d();r&&!o&&i&&d();const p=!i||o||r?c(0):M(i,f);return{x:l.left+f.scrollLeft-a.x-p.x,y:l.top+f.scrollTop-a.y-p.y,width:l.width,height:l.height}}function V(t){return"static"===b(t).position}function N(t,e){if(!h(t)||"fixed"===b(t).position)return null;if(e)return e(t);let n=t.offsetParent;return u(t)===n&&(n=n.ownerDocument.body),n}function I(t,e){const n=f(t);if(y(t))return n;if(!h(t)){let e=L(t);for(;e&&!v(e);){if(d(e)&&!V(e))return e;e=L(e)}return n}let o=N(t,e);for(;o&&m(o)&&V(o);)o=N(o,e);return o&&v(o)&&V(o)&&!w(o)?n:o||function(t){let e=L(t);for(;h(e)&&!v(e);){if(w(e))return e;if(y(e))return null;e=L(e)}return null}(t)||n}const k={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:e,rect:n,offsetParent:o,strategy:i}=t;const r="fixed"===i,l=u(o),f=!!e&&y(e.floating);if(o===l||f&&r)return n;let a={scrollLeft:0,scrollTop:0},d=c(1);const p=c(0),m=h(o);if((m||!m&&!r)&&(("body"!==s(o)||g(l))&&(a=T(o)),h(o))){const t=P(o);d=O(o),p.x=t.x+o.clientLeft,p.y=t.y+o.clientTop}const w=!l||m||r?c(0):M(l,a,!0);return{width:n.width*d.x,height:n.height*d.y,x:n.x*d.x-a.scrollLeft*d.x+p.x+w.x,y:n.y*d.y-a.scrollTop*d.y+p.y+w.y}},getDocumentElement:u,getClippingRect:function(t){let{element:e,boundary:i,rootBoundary:r,strategy:c}=t;const l=[..."clippingAncestors"===i?y(e)?[]:function(t,e){const n=e.get(t);if(n)return n;let o=C(t,[],!1).filter((t=>d(t)&&"body"!==s(t))),i=null;const r="fixed"===b(t).position;let c=r?L(t):t;for(;d(c)&&!v(c);){const e=b(c),n=w(c);n||"fixed"!==e.position||(i=null),(r?!n&&!i:!n&&"static"===e.position&&i&&["absolute","fixed"].includes(i.position)||g(c)&&!n&&A(t,c))?o=o.filter((t=>t!==c)):i=e,c=L(c)}return e.set(t,o),o}(e,this._c):[].concat(i),r],f=l[0],u=l.reduce(((t,i)=>{const r=z(e,i,c);return t.top=o(r.top,t.top),t.right=n(r.right,t.right),t.bottom=n(r.bottom,t.bottom),t.left=o(r.left,t.left),t}),z(e,f,c));return{width:u.right-u.left,height:u.bottom-u.top,x:u.left,y:u.top}},getOffsetParent:I,getElementRects:async function(t){const e=this.getOffsetParent||I,n=this.getDimensions,o=await n(t.floating);return{reference:B(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}},getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){const{width:e,height:n}=S(t);return{width:e,height:n}},getScale:O,isElement:d,isRTL:function(t){return"rtl"===b(t).direction}};function q(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}const U=e.detectOverflow,j=e.offset,X=e.autoPlacement,Y=e.shift,$=e.flip,_=e.size,G=e.hide,J=e.arrow,K=e.inline,Q=e.limitShift;t.arrow=J,t.autoPlacement=X,t.autoUpdate=function(t,e,i,c){void 0===c&&(c={});const{ancestorScroll:l=!0,ancestorResize:s=!0,elementResize:f="function"==typeof ResizeObserver,layoutShift:a="function"==typeof IntersectionObserver,animationFrame:d=!1}=c,h=F(t),p=l||s?[...h?C(h):[],...C(e)]:[];p.forEach((t=>{l&&t.addEventListener("scroll",i,{passive:!0}),s&&t.addEventListener("resize",i)}));const g=h&&a?function(t,e){let i,c=null;const l=u(t);function s(){var t;clearTimeout(i),null==(t=c)||t.disconnect(),c=null}return function f(u,a){void 0===u&&(u=!1),void 0===a&&(a=1),s();const d=t.getBoundingClientRect(),{left:h,top:p,width:g,height:m}=d;if(u||e(),!g||!m)return;const y={rootMargin:-r(p)+"px "+-r(l.clientWidth-(h+g))+"px "+-r(l.clientHeight-(p+m))+"px "+-r(h)+"px",threshold:o(0,n(1,a))||1};let w=!0;function x(e){const n=e[0].intersectionRatio;if(n!==a){if(!w)return f();n?f(!1,n):i=setTimeout((()=>{f(!1,1e-7)}),1e3)}1!==n||q(d,t.getBoundingClientRect())||f(),w=!1}try{c=new IntersectionObserver(x,{...y,root:l.ownerDocument})}catch(t){c=new IntersectionObserver(x,y)}c.observe(t)}(!0),s}(h,i):null;let m,y=-1,w=null;f&&(w=new ResizeObserver((t=>{let[n]=t;n&&n.target===h&&w&&(w.unobserve(e),cancelAnimationFrame(y),y=requestAnimationFrame((()=>{var t;null==(t=w)||t.observe(e)}))),i()})),h&&!d&&w.observe(h),w.observe(e));let x=d?P(t):null;return d&&function e(){const n=P(t);x&&!q(x,n)&&i();x=n,m=requestAnimationFrame(e)}(),i(),()=>{var t;p.forEach((t=>{l&&t.removeEventListener("scroll",i),s&&t.removeEventListener("resize",i)})),null==g||g(),null==(t=w)||t.disconnect(),w=null,d&&cancelAnimationFrame(m)}},t.computePosition=(t,n,o)=>{const i=new Map,r={platform:k,...o},c={...r.platform,_c:i};return e.computePosition(t,n,{...r,platform:c})},t.detectOverflow=U,t.flip=$,t.getOverflowAncestors=C,t.hide=G,t.inline=K,t.limitShift=Q,t.offset=j,t.platform=k,t.shift=Y,t.size=_}));
;
/* @license GPL-2.0-or-later https://www.drupal.org/licensing/faq */
((Drupal,once,{computePosition,offset,shift,flip})=>{Drupal.behaviors.dropdownInit={attach:(context)=>{once('dropdown-trigger','[data-drupal-dropdown]',context).forEach((trigger)=>{const dropdown=trigger.nextElementSibling;const updatePosition=()=>{computePosition(trigger,dropdown,{strategy:'fixed',placement:trigger.dataset.drupalDropdownPosition||'bottom',middleware:[flip({padding:16}),offset(6),shift({padding:16})]}).then(({x,y})=>{Object.assign(dropdown.style,{left:`${x}px`,top:`${y}px`});});};trigger.addEventListener('click',(e)=>{updatePosition();trigger.setAttribute('aria-expanded',e.currentTarget.getAttribute('aria-expanded')==='false');});document.addEventListener('click',(e)=>{const isButtonClicked=trigger.contains(e.target);if(!isButtonClicked)trigger.setAttribute('aria-expanded','false');});});}};})(Drupal,once,FloatingUIDOM);;
const POPOVER_OPEN_DELAY=150;const POPOVER_CLOSE_DELAY=400;const POPOVER_NO_CLICK_DELAY=500;((Drupal,once)=>{Drupal.behaviors.navigationProcessPopovers={attach:(context)=>{once('toolbar-popover',context.querySelectorAll('[data-toolbar-popover]')).forEach((popover)=>{const button=popover.querySelector('[data-toolbar-popover-control]');const tooltip=popover.querySelector('[data-toolbar-popover-wrapper]');if(!button||!tooltip)return;const expandPopover=()=>{popover.classList.add('toolbar-popover--expanded');button.dataset.drupalNoClick='true';tooltip.removeAttribute('inert');setTimeout(()=>{delete button.dataset.drupalNoClick;},POPOVER_NO_CLICK_DELAY);};const collapsePopover=()=>{popover.classList.remove('toolbar-popover--expanded');tooltip.setAttribute('inert',true);delete button.dataset.drupalNoClick;};const toggleState=(state,initialLoad=false)=>{state&&!initialLoad?expandPopover():collapsePopover();button.setAttribute('aria-expanded',state&&!initialLoad);const text=button.querySelector('[data-toolbar-action]');if(text)text.textContent=state?Drupal.t('Collapse'):Drupal.t('Extend');popover.dispatchEvent(new CustomEvent('toolbar-popover-toggled',{bubbles:true,detail:{state}}));};const isPopoverHoverOrFocus=()=>popover.contains(document.activeElement)||popover.matches(':hover');const delayedClose=()=>{setTimeout(()=>{if(isPopoverHoverOrFocus())return;close();},POPOVER_CLOSE_DELAY);};const open=()=>{['mouseleave','focusout'].forEach((e)=>{button.addEventListener(e,delayedClose,false);tooltip.addEventListener(e,delayedClose,false);});};const close=()=>{toggleState(false);['mouseleave','focusout'].forEach((e)=>{button.removeEventListener(e,delayedClose);tooltip.removeEventListener(e,delayedClose);});};button.addEventListener('mouseover',()=>{if(window.matchMedia('(max-width: 1023px)').matches)return;setTimeout(()=>{if(!button.matches(':hover')||!button.getAttribute('aria-expanded')==='false')return;toggleState(true);open();},POPOVER_OPEN_DELAY);});button.addEventListener('click',(e)=>{const state=e.currentTarget.getAttribute('aria-expanded')==='false';if(!e.currentTarget.dataset.drupalNoClick)toggleState(state);});popover.addEventListener('toolbar-popover-close',()=>{close();});popover.addEventListener('toolbar-popover-open',()=>{toggleState(true);});popover.addEventListener('toolbar-active-url',()=>{toggleState(true,true);});});}};})(Drupal,once);;
((Drupal,once)=>{function handleMouseMove({currentTarget:{style},clientX,clientY}){style.setProperty('--safe-triangle-cursor-x',`${clientX}px`);style.setProperty('--safe-triangle-cursor-y',`${clientY}px`);}Drupal.behaviors.safeTriangleInit={attach:(context)=>{once('safe-triangle','[data-has-safe-triangle]',context).forEach((button)=>{button.insertAdjacentHTML('beforeend','<div data-safe-triangle></div>');button.addEventListener('mousemove',handleMouseMove);});},detach:(context,settings,trigger)=>{if(trigger==='unload')once.remove('safe-triangle','[data-has-safe-triangle]',context).forEach((button)=>{button.querySelector('[data-safe-triangle]')?.remove();button.removeEventListener('mousemove',handleMouseMove);});}};})(Drupal,once);;
((Drupal,once)=>{const TOOLBAR_MENU_SET_TOGGLE='toolbar-menu-set-toggle';Drupal.behaviors.navigationProcessToolbarMenuTriggers={attach:(context)=>{once('toolbar-menu-trigger','[data-toolbar-menu-trigger]',context).forEach((button)=>{const menu=button.nextElementSibling;const text=button.querySelector('[data-toolbar-action]');const toggleButtonState=(state)=>{button.setAttribute('aria-expanded',state);if(text)text.textContent=state?Drupal.t('Collapse'):Drupal.t('Extend');if(state)menu.removeAttribute('inert');else menu.setAttribute('inert',true);};button.addEventListener('click',(e)=>{const level=e.currentTarget.dataset.toolbarMenuTrigger;const state=e.currentTarget.getAttribute('aria-expanded')==='false';toggleButtonState(state);button.dispatchEvent(new CustomEvent('toolbar-menu-toggled',{bubbles:true,detail:{state,level}}));});button.addEventListener(TOOLBAR_MENU_SET_TOGGLE,(e)=>{const newState=e.detail.state;toggleButtonState(newState);});});}};Drupal.behaviors.navigationProcessToolbarMenuLinks={attach:(context)=>{once('toolbar-menu-link','a.toolbar-menu__link, a.toolbar-button',context).forEach((link)=>{if(document.URL===link.href){link.classList.add('current','is-active');link.dispatchEvent(new CustomEvent('toolbar-active-url',{bubbles:true}));const menu=link.closest('.toolbar-menu');if(menu)menu.previousElementSibling.dispatchEvent(new CustomEvent(TOOLBAR_MENU_SET_TOGGLE,{detail:{state:true}}));}});}};})(Drupal,once);;
((Drupal,once,{computePosition,offset,shift,flip})=>{Drupal.theme.tooltipWrapper=(dataset)=>`<div class="toolbar-tooltip ${dataset.drupalTooltipClass||''}">
      ${dataset.drupalTooltip}
    </div>`;Drupal.behaviors.tooltipInit={attach:(context)=>{once('tooltip-trigger','[data-drupal-tooltip]',context).forEach((trigger)=>{trigger.insertAdjacentHTML('afterend',Drupal.theme.tooltipWrapper(trigger.dataset));const tooltip=trigger.nextElementSibling;const updatePosition=()=>{computePosition(trigger,tooltip,{strategy:'fixed',placement:trigger.dataset.drupalTooltipPosition||'right',middleware:[flip({padding:16}),offset(6),shift({padding:16})]}).then(({x,y})=>{Object.assign(tooltip.style,{left:`${x}px`,top:`${y}px`});});};const ro=new ResizeObserver(updatePosition);ro.observe(trigger);trigger.addEventListener('mouseover',updatePosition);trigger.addEventListener('focus',updatePosition);});}};})(Drupal,once,FloatingUIDOM);;
((Drupal,once)=>{Drupal.behaviors.navigation={attach(context){once('navigation','.admin-toolbar',context).forEach((sidebar)=>{const backButton=sidebar.querySelector('[data-toolbar-back-control]');if(!backButton)return;const buttons=sidebar.querySelectorAll('[data-toolbar-menu-trigger]');const tooltips=sidebar.querySelectorAll('[data-drupal-tooltip]');const closeButtons=()=>{buttons.forEach((button)=>{button.dispatchEvent(new CustomEvent('toolbar-menu-set-toggle',{detail:{state:false}}));});};const closePopovers=(current=false)=>{sidebar.querySelectorAll('[data-toolbar-popover]').forEach((popover)=>{if(current&&current instanceof Element&&popover.isEqualNode(current))return;popover.dispatchEvent(new CustomEvent('toolbar-popover-close',{}));});};sidebar.addEventListener('click',(e)=>{if(e.target.matches('button, button *'))e.target.closest('button').focus();});sidebar.addEventListener('toggle-admin-toolbar-content',(e)=>{if(!e.detail.state)closePopovers();});sidebar.addEventListener('toolbar-popover-toggled',(e)=>{if(e.detail.state){closeButtons();closePopovers(e.target);}});sidebar.addEventListener('toolbar-menu-toggled',(e)=>{if(e.detail.state){const targetLevel=e.detail.level;buttons.forEach((button)=>{const buttonLevel=button.dataset.toolbarMenuTrigger;if(!button.isEqualNode(e.target)&&+buttonLevel===+targetLevel)button.dispatchEvent(new CustomEvent('toolbar-menu-set-toggle',{detail:{state:false}}));});}});backButton.addEventListener('click',closePopovers);tooltips.forEach((tooltip)=>{['mouseover','focus'].forEach((e)=>{tooltip.addEventListener(e,closePopovers);});});});}};})(Drupal,once);;
((Drupal,once)=>{const HTML_TRIGGER_EVENT='toggle-admin-toolbar';const SIDEBAR_CONTENT_EVENT='toggle-admin-toolbar-content';if(once('admin-toolbar-document-triggers-listener',document.documentElement).length){const doc=document.documentElement;setTimeout(()=>{doc.setAttribute('data-admin-toolbar-transitions',true);},100);doc.addEventListener(HTML_TRIGGER_EVENT,(e)=>{const newState=e.detail.state;const isUserInput=e.detail.manual;document.documentElement.setAttribute('data-admin-toolbar',newState?'expanded':'collapsed');document.documentElement.setAttribute('data-admin-toolbar-body-scroll',newState?'locked':'unlocked');doc.querySelector('.admin-toolbar')?.dispatchEvent(new CustomEvent(SIDEBAR_CONTENT_EVENT,{detail:{state:newState}}));if(isUserInput)document.documentElement.setAttribute('data-admin-toolbar-animating',true);setTimeout(()=>{document.documentElement.removeAttribute('data-admin-toolbar-animating');},200);Drupal.displace(true);});}const initDisplace=(el)=>{const displaceElement=el.querySelector('.admin-toolbar__displace-placeholder');const edge=document.documentElement.dir==='rtl'?'right':'left';displaceElement?.setAttribute(`data-offset-${edge}`,'');Drupal.displace(true);};Drupal.behaviors.navigationProcessToolbarTriggers={attach:(context)=>{once('navigation-displace','.admin-toolbar',context).forEach(initDisplace);const triggers=once('admin-toolbar-trigger','[aria-controls="admin-toolbar"]',context);const toggleTriggers=(toState)=>{triggers.forEach((trigger)=>{trigger.setAttribute('aria-expanded',toState);const text=trigger.querySelector('[data-toolbar-text]')||trigger.querySelector('[data-toolbar-action]');if(text)text.textContent=toState?Drupal.t('Collapse sidebar'):Drupal.t('Expand sidebar');});localStorage.setItem('Drupal.navigation.sidebarExpanded',toState);};if(triggers.length){let firstState=localStorage.getItem('Drupal.navigation.sidebarExpanded')!=='false';if(window.matchMedia('(max-width: 1023px)').matches)firstState=false;toggleTriggers(firstState);document.documentElement.dispatchEvent(new CustomEvent(HTML_TRIGGER_EVENT,{bubbles:true,detail:{state:firstState,manual:false}}));triggers.forEach((trigger)=>{trigger.addEventListener('click',(e)=>{const state=e.currentTarget.getAttribute('aria-expanded')==='false';trigger.dispatchEvent(new CustomEvent(HTML_TRIGGER_EVENT,{bubbles:true,detail:{state,manual:true}}));toggleTriggers(state);});});}}};})(Drupal,once);;
((Drupal,once,{focusable})=>{Drupal.behaviors.keyboardNavigation={attach:(context)=>{once('keyboard-processed','.admin-toolbar',context).forEach((sidebar)=>{const IS_RTL=document.documentElement.dir==='rtl';const isInteractive=(element)=>element.getAttribute('aria-expanded');const getFocusableGroup=(element)=>element.closest('[class*="toolbar-menu--level-"]')||element.closest('[data-toolbar-popover-wrapper]')||element.closest('.admin-toolbar');const findFirstElementByChar=(focusableElements,targetChar)=>{const elementWIthChar=Array.prototype.find.call(focusableElements,(element)=>{const dataText=element.dataset.indexText;return dataText&&dataText[0]===targetChar;});return elementWIthChar;};const checkChar=({key,target})=>{const currentGroup=getFocusableGroup(target);const foundElementWithIndexChar=findFirstElementByChar(focusable(currentGroup),key);if(foundElementWithIndexChar)foundElementWithIndexChar.focus();};const focusFirstInGroup=(focusableElements)=>{focusableElements[0].focus();};const focusLastInGroup=(focusableElements)=>{focusableElements[focusableElements.length-1].focus();};const focusNextInGroup=(focusableElements,element)=>{const currentIndex=Array.prototype.indexOf.call(focusableElements,element);if(currentIndex===focusableElements.length-1)focusableElements[0].focus();else focusableElements[currentIndex+1].focus();};const focusPreviousInGroup=(focusableElements,element)=>{const currentIndex=Array.prototype.indexOf.call(focusableElements,element);if(currentIndex===0)focusableElements[focusableElements.length-1].focus();else focusableElements[currentIndex-1].focus();};const toggleMenu=(element,state)=>element.dispatchEvent(new CustomEvent('toolbar-menu-set-toggle',{bubbles:false,detail:{state}}));const closePopover=(element)=>element.dispatchEvent(new CustomEvent('toolbar-popover-close',{bubbles:true}));const openPopover=(element)=>element.dispatchEvent(new CustomEvent('toolbar-popover-open',{bubbles:true}));const focusClosestPopoverTrigger=(element)=>{element.closest('[data-toolbar-popover]')?.querySelector('[data-toolbar-popover-control]')?.focus();};const focusFirstMenuElement=(element)=>{const elements=focusable(element.closest('.toolbar-menu__item')?.querySelector('.toolbar-menu'));if(elements?.length)elements[0].focus();};const focusFirstPopoverElement=(element)=>{const elements=focusable(element.closest('[data-toolbar-popover]'));if(elements?.length>=1)elements[1].focus();};const focusLastPopoverElement=(element)=>{const elements=focusable(element.closest('[data-toolbar-popover]'));if(elements?.length>0)elements[elements.length-1].focus();};const closeNonInteractiveElement=(element)=>{if(element.closest('[class*="toolbar-menu--level-"]')){const trigger=element.closest('.toolbar-menu')?.previousElementSibling;toggleMenu(trigger,false);trigger.focus();}else{closePopover(element);focusClosestPopoverTrigger(element);}};const openInteractiveElement=(element)=>{if(element.hasAttribute('data-toolbar-menu-trigger')){toggleMenu(element,true);focusFirstMenuElement(element);}if(element.hasAttribute('data-toolbar-popover-control')){openPopover(element);focusFirstPopoverElement(element);}};const closeInteractiveElement=(element)=>{if(element.hasAttribute('data-toolbar-menu-trigger'))if(element.getAttribute('aria-expanded')==='false')closeNonInteractiveElement(element);else{toggleMenu(element,false);focusFirstMenuElement(element);}if(element.hasAttribute('data-toolbar-popover-control')){openPopover(element);focusLastPopoverElement(element);}};const arrowsSideControl=({key,target})=>{if((key==='ArrowRight'&&!IS_RTL)||(key==='ArrowLeft'&&IS_RTL)){if(isInteractive(target)){openInteractiveElement(target);if(target.getAttribute('aria-controls')==='admin-toolbar'&&target.getAttribute('aria-expanded')==='false')target.click();}}else{if((key==='ArrowRight'&&IS_RTL)||(key==='ArrowLeft'&&!IS_RTL))if(isInteractive(target)){closeInteractiveElement(target);if(target.getAttribute('aria-controls')==='admin-toolbar'&&target.getAttribute('aria-expanded')!=='false')target.click();}else closeNonInteractiveElement(target);}};const arrowsDirectionControl=({key,target})=>{const focusableElements=focusable(getFocusableGroup(target));if(key==='ArrowUp')focusPreviousInGroup(focusableElements,target);else{if(key==='ArrowDown')focusNextInGroup(focusableElements,target);}};sidebar.addEventListener('keydown',(e)=>{switch(e.key){case 'Escape':closePopover(e.target);focusClosestPopoverTrigger(e.target);break;case 'ArrowLeft':case 'ArrowRight':e.preventDefault();arrowsSideControl(e);break;case 'ArrowDown':case 'ArrowUp':e.preventDefault();arrowsDirectionControl(e);break;case 'Home':e.preventDefault();focusFirstInGroup(getFocusableGroup(e.target));break;case 'End':e.preventDefault();focusLastInGroup(getFocusableGroup(e.target));break;default:checkChar(e);break;}});});}};})(Drupal,once,window.tabbable);;
