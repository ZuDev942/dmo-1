import{c as l,A as Y,a7 as T,P as z,a3 as q,d as W,k as p,H,h as w,da as A,r as B,a9 as U,a2 as V,l as J,f as O,e as m,n as Q,bA as Z,b0 as K,db as ee,dc as te,aq as re}from"./index.d1d64f66.js";import{u as ne}from"./useRefs.8e84d16e.js";var ae={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1A172.22 172.22 0 00174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7 44.4 0 88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c.1-64.6-25.1-125.3-70.7-170.9z"}}]},name:"paper-clip",theme:"outlined"},oe=ae;function F(r){for(var e=1;e<arguments.length;e++){var a=arguments[e]!=null?Object(arguments[e]):{},t=Object.keys(a);typeof Object.getOwnPropertySymbols=="function"&&(t=t.concat(Object.getOwnPropertySymbols(a).filter(function(n){return Object.getOwnPropertyDescriptor(a,n).enumerable}))),t.forEach(function(n){se(r,n,a[n])})}return r}function se(r,e,a){return e in r?Object.defineProperty(r,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):r[e]=a,r}var $=function(e,a){var t=F({},e,a.attrs);return l(Y,F({},t,{icon:oe}),null)};$.displayName="PaperClipOutlined";$.inheritAttrs=!1;var je=$,X=T("normal","exception","active","success"),ie=T("line","circle","dashboard"),ce=T("default","small"),I=function(){return{prefixCls:String,type:z.oneOf(ie),percent:Number,format:{type:Function},status:z.oneOf(X),showInfo:{type:Boolean,default:void 0},strokeWidth:Number,strokeLinecap:String,strokeColor:{type:[String,Object],default:void 0},trailColor:String,width:Number,success:{type:Object,default:function(){return{}}},gapDegree:Number,gapPosition:String,size:z.oneOf(ce),steps:Number,successPercent:Number,title:String}};function x(r){return!r||r<0?0:r>100?100:r}function L(r){var e=r.success,a=r.successPercent,t=a;return e&&"progress"in e&&(q(!1,"Progress","`success.progress` is deprecated. Please use `success.percent` instead."),t=e.progress),e&&"percent"in e&&(t=e.percent),t}var le=globalThis&&globalThis.__rest||function(r,e){var a={};for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&e.indexOf(t)<0&&(a[t]=r[t]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(r);n<t.length;n++)e.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(r,t[n])&&(a[t[n]]=r[t[n]]);return a},ue=function(){return w(w({},I()),{prefixCls:String,direction:{type:String}})},fe=function(e){var a=[];return Object.keys(e).forEach(function(t){var n=parseFloat(t.replace(/%/g,""));isNaN(n)||a.push({key:n,value:e[t]})}),a=a.sort(function(t,n){return t.key-n.key}),a.map(function(t){var n=t.key,u=t.value;return"".concat(u," ").concat(n,"%")}).join(", ")},ve=function(e,a){var t=e.from,n=t===void 0?A.blue:t,u=e.to,c=u===void 0?A.blue:u,f=e.direction,d=f===void 0?a==="rtl"?"to left":"to right":f,i=le(e,["from","to","direction"]);if(Object.keys(i).length!==0){var v=fe(i);return{backgroundImage:"linear-gradient(".concat(d,", ").concat(v,")")}}return{backgroundImage:"linear-gradient(".concat(d,", ").concat(n,", ").concat(c,")")}},de=W({name:"Line",props:ue(),setup:function(e,a){var t=a.slots,n=p(function(){var i=e.strokeColor,v=e.direction;return i&&typeof i!="string"?ve(i,v):{background:i}}),u=p(function(){return e.trailColor?{backgroundColor:e.trailColor}:void 0}),c=p(function(){var i=e.percent,v=e.strokeWidth,s=e.strokeLinecap,o=e.size;return w({width:"".concat(x(i),"%"),height:"".concat(v||(o==="small"?6:8),"px"),borderRadius:s==="square"?0:""},n.value)}),f=p(function(){return L(e)}),d=p(function(){var i=e.strokeWidth,v=e.size,s=e.strokeLinecap,o=e.success;return{width:"".concat(x(f.value),"%"),height:"".concat(i||(v==="small"?6:8),"px"),borderRadius:s==="square"?0:"",backgroundColor:o==null?void 0:o.strokeColor}});return function(){var i;return l(H,null,[l("div",{class:"".concat(e.prefixCls,"-outer")},[l("div",{class:"".concat(e.prefixCls,"-inner"),style:u.value},[l("div",{class:"".concat(e.prefixCls,"-bg"),style:c.value},null),f.value!==void 0?l("div",{class:"".concat(e.prefixCls,"-success-bg"),style:d.value},null):null])]),(i=t.default)===null||i===void 0?void 0:i.call(t)])}}}),ge={percent:0,prefixCls:"vc-progress",strokeColor:"#2db7f5",strokeLinecap:"round",strokeWidth:1,trailColor:"#D9D9D9",trailWidth:1},pe=function(e){var a=B(null);return U(function(){var t=Date.now(),n=!1;e.value.forEach(function(u){var c,f=((c=u)===null||c===void 0?void 0:c.$el)||u;if(!!f){n=!0;var d=f.style;d.transitionDuration=".3s, .3s, .3s, .06s",a.value&&t-a.value<100&&(d.transitionDuration="0s, 0s")}}),n&&(a.value=Date.now())}),e},he={gapDegree:Number,gapPosition:{type:String},percent:{type:[Array,Number]},prefixCls:String,strokeColor:{type:[Object,String,Array]},strokeLinecap:{type:String},strokeWidth:Number,trailColor:String,trailWidth:Number,transition:String},ye=globalThis&&globalThis.__rest||function(r,e){var a={};for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&e.indexOf(t)<0&&(a[t]=r[t]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(r);n<t.length;n++)e.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(r,t[n])&&(a[t[n]]=r[t[n]]);return a},G=0;function R(r){return+r.replace("%","")}function E(r){return Array.isArray(r)?r:[r]}function M(r,e,a,t){var n=arguments.length>4&&arguments[4]!==void 0?arguments[4]:0,u=arguments.length>5?arguments[5]:void 0,c=50-t/2,f=0,d=-c,i=0,v=-2*c;switch(u){case"left":f=-c,d=0,i=2*c,v=0;break;case"right":f=c,d=0,i=-2*c,v=0;break;case"bottom":d=c,v=2*c;break}var s="M 50,50 m ".concat(f,",").concat(d,`
   a `).concat(c,",").concat(c," 0 1 1 ").concat(i,",").concat(-v,`
   a `).concat(c,",").concat(c," 0 1 1 ").concat(-i,",").concat(v),o=Math.PI*2*c,h={stroke:a,strokeDasharray:"".concat(e/100*(o-n),"px ").concat(o,"px"),strokeDashoffset:"-".concat(n/2+r/100*(o-n),"px"),transition:"stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s"};return{pathString:s,pathStyle:h}}var ke=W({name:"VCCircle",props:V(he,ge),setup:function(e){G+=1;var a=B(G),t=p(function(){return E(e.percent)}),n=p(function(){return E(e.strokeColor)}),u=ne(),c=J(u,2),f=c[0],d=c[1];pe(d);var i=function(){var s=e.prefixCls,o=e.strokeWidth,h=e.strokeLinecap,y=e.gapDegree,g=e.gapPosition,C=0;return t.value.map(function(b,k){var j=n.value[k]||n.value[n.value.length-1],_=Object.prototype.toString.call(j)==="[object Object]"?"url(#".concat(s,"-gradient-").concat(a.value,")"):"",P=M(C,b,j,o,y,g),N=P.pathString,S=P.pathStyle;C+=b;var D={key:k,d:N,stroke:_,"stroke-linecap":h,"stroke-width":o,opacity:b===0?0:1,"fill-opacity":"0",class:"".concat(s,"-circle-path"),style:S};return l("path",O({ref:f(k)},D),null)})};return function(){var v=e.prefixCls,s=e.strokeWidth,o=e.trailWidth,h=e.gapDegree,y=e.gapPosition,g=e.trailColor,C=e.strokeLinecap;e.strokeColor;var b=ye(e,["prefixCls","strokeWidth","trailWidth","gapDegree","gapPosition","trailColor","strokeLinecap","strokeColor"]),k=M(0,100,g,s,h,y),j=k.pathString,_=k.pathStyle;delete b.percent;var P=n.value.find(function(S){return Object.prototype.toString.call(S)==="[object Object]"}),N={d:j,stroke:g,"stroke-linecap":C,"stroke-width":o||s,"fill-opacity":"0",class:"".concat(v,"-circle-trail"),style:_};return l("svg",O({class:"".concat(v,"-circle"),viewBox:"0 0 100 100"},b),[P&&l("defs",null,[l("linearGradient",{id:"".concat(v,"-gradient-").concat(a.value),x1:"100%",y1:"0%",x2:"0%",y2:"0%"},[Object.keys(P).sort(function(S,D){return R(S)-R(D)}).map(function(S,D){return l("stop",{key:D,offset:S,"stop-color":P[S]},null)})])]),l("path",N,null),i().reverse()])}}});function Ce(r){var e=r.percent,a=r.success,t=r.successPercent,n=x(L({success:a,successPercent:t}));return[n,x(x(e)-n)]}function be(r){var e=r.success,a=e===void 0?{}:e,t=r.strokeColor,n=a.strokeColor;return[n||A.green,t||null]}var me=W({name:"Circle",inheritAttrs:!1,props:I(),setup:function(e,a){var t=a.slots,n=p(function(){if(e.gapDegree||e.gapDegree===0)return e.gapDegree;if(e.type==="dashboard")return 75}),u=p(function(){var o=e.width||120;return{width:typeof o=="number"?"".concat(o,"px"):o,height:typeof o=="number"?"".concat(o,"px"):o,fontSize:"".concat(o*.15+6,"px")}}),c=p(function(){return e.strokeWidth||6}),f=p(function(){return e.gapPosition||e.type==="dashboard"&&"bottom"||"top"}),d=p(function(){return Ce(e)}),i=p(function(){return Object.prototype.toString.call(e.strokeColor)==="[object Object]"}),v=p(function(){return be({success:e.success,strokeColor:e.strokeColor})}),s=p(function(){var o;return o={},m(o,"".concat(e.prefixCls,"-inner"),!0),m(o,"".concat(e.prefixCls,"-circle-gradient"),i.value),o});return function(){var o;return l("div",{class:s.value,style:u.value},[l(ke,{percent:d.value,strokeWidth:c.value,trailWidth:c.value,strokeColor:v.value,strokeLinecap:e.strokeLinecap,trailColor:e.trailColor,prefixCls:e.prefixCls,gapDegree:n.value,gapPosition:f.value},null),(o=t.default)===null||o===void 0?void 0:o.call(t)])}}}),Pe=function(){return w(w({},I()),{steps:Number,size:{type:String},strokeColor:String,trailColor:String})},Se=W({name:"Steps",props:Pe(),setup:function(e,a){var t=a.slots,n=p(function(){return Math.round(e.steps*((e.percent||0)/100))}),u=p(function(){return e.size==="small"?2:14}),c=p(function(){for(var f=e.steps,d=e.strokeWidth,i=d===void 0?8:d,v=e.strokeColor,s=e.trailColor,o=e.prefixCls,h=[],y=0;y<f;y+=1){var g,C=(g={},m(g,"".concat(o,"-steps-item"),!0),m(g,"".concat(o,"-steps-item-active"),y<=n.value-1),g);h.push(l("div",{key:y,class:C,style:{backgroundColor:y<=n.value-1?v:s,width:"".concat(u.value,"px"),height:"".concat(i,"px")}},null))}return h});return function(){var f;return l("div",{class:"".concat(e.prefixCls,"-steps-outer")},[c.value,(f=t.default)===null||f===void 0?void 0:f.call(t)])}}}),Oe=W({name:"AProgress",props:V(I(),{type:"line",percent:0,showInfo:!0,trailColor:null,size:"default",strokeLinecap:"round"}),slots:["format"],setup:function(e,a){var t=a.slots,n=Q("progress",e),u=n.prefixCls,c=n.direction;q(e.successPercent==null,"Progress","`successPercent` is deprecated. Please use `success.percent` instead.");var f=p(function(){var s,o=e.type,h=e.showInfo,y=e.size,g=u.value;return s={},m(s,g,!0),m(s,"".concat(g,"-").concat(o==="dashboard"&&"circle"||o),!0),m(s,"".concat(g,"-show-info"),h),m(s,"".concat(g,"-").concat(y),y),m(s,"".concat(g,"-rtl"),c.value==="rtl"),s}),d=p(function(){var s=e.percent,o=s===void 0?0:s,h=L(e);return parseInt(h!==void 0?h.toString():o.toString(),10)}),i=p(function(){var s=e.status;return X.indexOf(s)<0&&d.value>=100?"success":s||"normal"}),v=function(){var o=e.showInfo,h=e.format,y=e.type,g=e.percent,C=e.title,b=L(e);if(!o)return null;var k,j=h||(t==null?void 0:t.format)||function(P){return"".concat(P,"%")},_=y==="line";return h||(t==null?void 0:t.format)||i.value!=="exception"&&i.value!=="success"?k=j(x(g),x(b)):i.value==="exception"?k=_?l(Z,null,null):l(K,null,null):i.value==="success"&&(k=_?l(ee,null,null):l(te,null,null)),l("span",{class:"".concat(u.value,"-text"),title:C===void 0&&typeof k=="string"?k:void 0},[k])};return function(){var s=e.type,o=e.steps,h=e.strokeColor,y=e.title,g=v(),C;s==="line"?C=o?l(Se,O(O({},e),{},{strokeColor:typeof h=="string"?h:void 0,prefixCls:u.value,steps:o}),{default:function(){return[g]}}):l(de,O(O({},e),{},{prefixCls:u.value}),{default:function(){return[g]}}):(s==="circle"||s==="dashboard")&&(C=l(me,O(O({},e),{},{prefixCls:u.value}),{default:function(){return[g]}}));var b=w(w({},f.value),m({},"".concat(u.value,"-status-").concat(i.value),!0));return l("div",{class:b,title:y},[C])}}}),_e=re(Oe);export{_e as P,je as a};
