import{_ as w,j as _,cQ as te,W as re,P as ie,d as X,u as D,x as ue,E as le,B as oe,U as ce,cP as se,a as T,l as de,e as q,b as A,i as z,aF as fe,w as Q,c as U,t as ve,Y as me}from"./index.118c7d70.js";import{t as $,V as he}from"./Checkbox.38aeeafc.js";import{u as Y}from"./isSymbol.b2ca7c44.js";var Ve=["xxxl","xxl","xl","lg","md","sm","xs"],j={xs:"(max-width: 575px)",sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 992px)",xl:"(min-width: 1200px)",xxl:"(min-width: 1600px)",xxxl:"(min-width: 2000px)"},M=new Map,N=-1,B={},be={matchHandlers:{},dispatch:function(e){return B=e,M.forEach(function(a){return a(B)}),M.size>=1},subscribe:function(e){return M.size||this.register(),N+=1,M.set(N,e),e(B),N},unsubscribe:function(e){M.delete(e),M.size||this.unregister()},unregister:function(){var e=this;Object.keys(j).forEach(function(a){var r=j[a],t=e.matchHandlers[r];t==null||t.mql.removeListener(t==null?void 0:t.listener)}),M.clear()},register:function(){var e=this;Object.keys(j).forEach(function(a){var r=j[a],t=function(o){var c=o.matches;e.dispatch(w(w({},B),_({},a,c)))},v=window.matchMedia(r);v.addListener(t),e.matchHandlers[r]={mql:v,listener:t},t(v)})}},Pe=be,pe=function(){return te.Date.now()},L=pe,ge="Expected a function",xe=Math.max,ye=Math.min;function Te(n,e,a){var r,t,v,h,o,c,f=0,x=!1,s=!1,y=!0;if(typeof n!="function")throw new TypeError(ge);e=$(e)||0,re(a)&&(x=!!a.leading,s="maxWait"in a,v=s?xe($(a.maxWait)||0,e):v,y="trailing"in a?!!a.trailing:y);function C(u){var l=r,g=t;return r=t=void 0,f=u,h=n.apply(g,l),h}function I(u){return f=u,o=setTimeout(m,e),x?C(u):h}function V(u){var l=u-c,g=u-f,S=e-l;return s?ye(S,v-g):S}function O(u){var l=u-c,g=u-f;return c===void 0||l>=e||l<0||s&&g>=v}function m(){var u=L();if(O(u))return i(u);o=setTimeout(m,V(u))}function i(u){return o=void 0,y&&r?C(u):(r=t=void 0,h)}function d(){o!==void 0&&clearTimeout(o),f=0,r=c=t=o=void 0}function p(){return o===void 0?h:i(L())}function b(){var u=L(),l=O(u);if(r=arguments,t=this,c=u,l){if(o===void 0)return I(c);if(s)return clearTimeout(o),o=setTimeout(m,e),C(c)}return o===void 0&&(o=setTimeout(m,e)),h}return b.cancel=d,b.flush=p,b}var Ce=function(){return{name:String,prefixCls:String,options:{type:Array,default:function(){return[]}},disabled:Boolean,id:String}},ke=function(){return w(w({},Ce()),{defaultValue:{type:Array},value:{type:Array},onChange:{type:Function},"onUpdate:value":{type:Function}})},we=function(){return{prefixCls:String,defaultChecked:{type:Boolean,default:void 0},checked:{type:Boolean,default:void 0},disabled:{type:Boolean,default:void 0},isGroup:{type:Boolean,default:void 0},value:ie.any,name:String,id:String,indeterminate:{type:Boolean,default:void 0},type:{type:String,default:"checkbox"},autofocus:{type:Boolean,default:void 0},onChange:Function,"onUpdate:checked":Function,onClick:Function,skipGroup:{type:Boolean,default:!1}}},Ie=function(){return w(w({},we()),{indeterminate:{type:Boolean,default:!1}})},J=Symbol("CheckboxGroupContext"),K=globalThis&&globalThis.__rest||function(n,e){var a={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(a[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,r=Object.getOwnPropertySymbols(n);t<r.length;t++)e.indexOf(r[t])<0&&Object.prototype.propertyIsEnumerable.call(n,r[t])&&(a[r[t]]=n[r[t]]);return a},E=X({name:"ACheckbox",inheritAttrs:!1,__ANT_CHECKBOX:!0,props:Ie(),setup:function(e,a){var r=a.emit,t=a.attrs,v=a.slots,h=a.expose,o=Y(),c=D("checkbox",e),f=c.prefixCls,x=c.direction,s=ue(J,void 0),y=Symbol("checkboxUniId");le(function(){!e.skipGroup&&s&&s.registerValue(y,e.value)}),oe(function(){s&&s.cancelValue(y)}),ce(function(){se(e.checked!==void 0||s||e.value===void 0,"Checkbox","`value` is not validate prop, do you mean `checked`?")});var C=function(i){var d=i.target.checked;r("update:checked",d),r("change",i)},I=T(),V=function(){var i;(i=I.value)===null||i===void 0||i.focus()},O=function(){var i;(i=I.value)===null||i===void 0||i.blur()};return h({focus:V,blur:O}),function(){var m,i,d=de((i=v.default)===null||i===void 0?void 0:i.call(v)),p=e.indeterminate,b=e.skipGroup,u=e.id,l=u===void 0?o.id.value:u,g=K(e,["indeterminate","skipGroup","id"]),S=t.onMouseenter,F=t.onMouseleave;t.onInput;var P=t.class,Z=t.style,ee=K(t,["onMouseenter","onMouseleave","onInput","class","style"]),k=w(w(w({},g),{id:l,prefixCls:f.value}),ee);s&&!b?(k.onChange=function(){for(var W=arguments.length,H=new Array(W),G=0;G<W;G++)H[G]=arguments[G];r.apply(void 0,["change"].concat(H)),s.toggleOption({label:d,value:e.value})},k.name=s.name.value,k.checked=s.mergedValue.value.indexOf(e.value)!==-1,k.disabled=e.disabled||s.disabled.value,k.indeterminate=p):k.onChange=C;var ne=q((m={},_(m,"".concat(f.value,"-wrapper"),!0),_(m,"".concat(f.value,"-rtl"),x.value==="rtl"),_(m,"".concat(f.value,"-wrapper-checked"),k.checked),_(m,"".concat(f.value,"-wrapper-disabled"),k.disabled),m),P),ae=q(_({},"".concat(f.value,"-indeterminate"),p));return A("label",{class:ne,style:Z,onMouseenter:S,onMouseleave:F},[A(he,z(z({},k),{},{class:ae,ref:I}),null),d.length?A("span",null,[d]):null])}}});function Oe(n,e){var a=typeof Symbol!="undefined"&&n[Symbol.iterator]||n["@@iterator"];if(!a){if(Array.isArray(n)||(a=fe(n))||e&&n&&typeof n.length=="number"){a&&(n=a);var r=0,t=function(){};return{s:t,n:function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}},e:function(f){throw f},f:t}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var v=!0,h=!1,o;return{s:function(){a=a.call(n)},n:function(){var f=a.next();return v=f.done,f},e:function(f){h=!0,o=f},f:function(){try{!v&&a.return!=null&&a.return()}finally{if(h)throw o}}}}var R=X({name:"ACheckboxGroup",props:ke(),setup:function(e,a){var r=a.slots,t=a.emit,v=a.expose,h=Y(),o=D("checkbox",e),c=o.prefixCls,f=o.direction,x=T((e.value===void 0?e.defaultValue:e.value)||[]);Q(function(){return e.value},function(){x.value=e.value||[]});var s=U(function(){return e.options.map(function(i){return typeof i=="string"||typeof i=="number"?{label:i,value:i}:i})}),y=T(Symbol()),C=T(new Map),I=function(d){C.value.delete(d),y.value=Symbol()},V=function(d,p){C.value.set(d,p),y.value=Symbol()},O=T(new Map);Q(y,function(){var i=new Map,d=Oe(C.value.values()),p;try{for(d.s();!(p=d.n()).done;){var b=p.value;i.set(b,!0)}}catch(u){d.e(u)}finally{d.f()}O.value=i});var m=function(d){var p=x.value.indexOf(d.value),b=me(x.value);p===-1?b.push(d.value):b.splice(p,1),e.value===void 0&&(x.value=b);var u=b.filter(function(l){return O.value.has(l)}).sort(function(l,g){var S=s.value.findIndex(function(P){return P.value===l}),F=s.value.findIndex(function(P){return P.value===g});return S-F});t("update:value",u),t("change",u),h.onFieldChange()};return ve(J,{cancelValue:I,registerValue:V,toggleOption:m,mergedValue:x,name:U(function(){return e.name}),disabled:U(function(){return e.disabled})}),v({mergedValue:x}),function(){var i,d=e.id,p=d===void 0?h.id.value:d,b=null,u="".concat(c.value,"-group");return s.value&&s.value.length>0&&(b=s.value.map(function(l){var g;return A(E,{prefixCls:c.value,key:l.value.toString(),disabled:"disabled"in l?l.disabled:e.disabled,indeterminate:l.indeterminate,value:l.value,checked:x.value.indexOf(l.value)!==-1,onChange:l.onChange,class:"".concat(u,"-item")},{default:function(){return[l.label===void 0?(g=r.label)===null||g===void 0?void 0:g.call(r,l):l.label]}})})),A("div",{class:[u,_({},"".concat(u,"-rtl"),f.value==="rtl")],id:p},[b||((i=r.default)===null||i===void 0?void 0:i.call(r))])}}});E.Group=R;E.install=function(n){return n.component(E.name,E),n.component(R.name,R),n};export{E as C,Pe as R,Te as d,Ve as r};