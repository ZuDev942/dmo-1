import{h as P,P as y,d as ce,x as Ee,r as M,p as we,q as te,m as K,a0 as ge,k as Y,aB as De,b as se,e as A,c as k,f as z,s as Ce,K as Me,ax as je,a4 as ke,dq as _e,as as Le,a9 as Se,a8 as Be,n as Ve,a5 as le,aa as Ae,bd as re,b2 as Ie}from"./index.c4cb38d7.js";var pe=function(){return{prefixCls:String,width:y.oneOfType([y.string,y.number]),height:y.oneOfType([y.string,y.number]),style:{type:Object,default:void 0},class:String,placement:{type:String},wrapperClassName:String,level:{type:[String,Array]},levelMove:{type:[Number,Function,Array]},duration:String,ease:String,showMask:{type:Boolean,default:void 0},maskClosable:{type:Boolean,default:void 0},maskStyle:{type:Object,default:void 0},afterVisibleChange:Function,keyboard:{type:Boolean,default:void 0},contentWrapperStyle:{type:Object,default:void 0},autofocus:{type:Boolean,default:void 0},open:{type:Boolean,default:void 0}}},Fe=function(){return P(P({},pe()),{forceRender:{type:Boolean,default:void 0},getContainer:y.oneOfType([y.string,y.func,y.object,y.looseBool])})},He=function(){return P(P({},pe()),{getContainer:Function,getOpenCount:Function,scrollLocker:y.any,switchScrollingEffect:Function})};function ze(n){return Array.isArray(n)?n:[n]}var Oe={transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend"},We=Object.keys(Oe).filter(function(n){if(typeof document=="undefined")return!1;var e=document.getElementsByTagName("html")[0];return n in(e?e.style:{})})[0],de=Oe[We];function fe(n,e,r,a){n.addEventListener?n.addEventListener(e,r,a):n.attachEvent&&n.attachEvent("on".concat(e),r)}function ve(n,e,r,a){n.removeEventListener?n.removeEventListener(e,r,a):n.attachEvent&&n.detachEvent("on".concat(e),r)}function Re(n,e){var r=typeof n=="function"?n(e):n;return Array.isArray(r)?r.length===2?r:[r[0],r[1]]:[r]}var he=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},ie=!(typeof window!="undefined"&&window.document&&window.document.createElement),$e=function n(e,r,a,i){if(!r||r===document||r instanceof Document)return!1;if(r===e.parentNode)return!0;var x=Math.max(Math.abs(a),Math.abs(i))===Math.abs(i),N=Math.max(Math.abs(a),Math.abs(i))===Math.abs(a),T=r.scrollHeight-r.clientHeight,u=r.scrollWidth-r.clientWidth,v=document.defaultView.getComputedStyle(r),j=v.overflowY==="auto"||v.overflowY==="scroll",p=v.overflowX==="auto"||v.overflowX==="scroll",E=T&&j,D=u&&p;return x&&(!E||E&&(r.scrollTop>=T&&i<0||r.scrollTop<=0&&i>0))||N&&(!D||D&&(r.scrollLeft>=u&&a<0||r.scrollLeft<=0&&a>0))?n(e,r.parentNode,a,i):!1},Xe=globalThis&&globalThis.__rest||function(n,e){var r={};for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&e.indexOf(a)<0&&(r[a]=n[a]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,a=Object.getOwnPropertySymbols(n);i<a.length;i++)e.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(n,a[i])&&(r[a[i]]=n[a[i]]);return r},X={},Ke=ce({inheritAttrs:!1,props:He(),emits:["close","handleClick","change"],setup:function(e,r){var a=r.emit,i=r.slots,x=Ee({startPos:{x:null,y:null}}),N,T=M(),u=M(),v=M(),j=M(),p=M(),E=[],D="drawer_id_".concat(Number((Date.now()+Math.random()).toString().replace(".",Math.round(Math.random()*9).toString())).toString(16)),W=!ie&&je?{passive:!1}:!1;we(function(){te(function(){var o,t=e.open,l=e.getContainer,d=e.showMask,f=e.autofocus,m=l==null?void 0:l();C(e),t&&(m&&m.parentNode===document.body&&(X[D]=t),G(),te(function(){f&&_()}),d&&((o=e.scrollLocker)===null||o===void 0||o.lock()))})}),K(function(){return e.level},function(){C(e)},{flush:"post"}),K(function(){return e.open},function(){var o=e.open,t=e.getContainer,l=e.scrollLocker,d=e.showMask,f=e.autofocus,m=t==null?void 0:t();m&&m.parentNode===document.body&&(X[D]=!!o),G(),o?(f&&_(),d&&(l==null||l.lock())):l==null||l.unLock()},{flush:"post"}),ge(function(){var o,t=e.open;delete X[D],t&&(J(!1),document.body.style.touchAction=""),(o=e.scrollLocker)===null||o===void 0||o.unLock()}),K(function(){return e.placement},function(o){o&&(p.value=null)});var _=function(){var t,l;(l=(t=u.value)===null||t===void 0?void 0:t.focus)===null||l===void 0||l.call(t)},I=function(t){t.touches.length>1||(x.startPos={x:t.touches[0].clientX,y:t.touches[0].clientY})},V=function(t){if(!(t.changedTouches.length>1)){var l=t.currentTarget,d=t.changedTouches[0].clientX-x.startPos.x,f=t.changedTouches[0].clientY-x.startPos.y;(l===v.value||l===j.value||l===p.value&&$e(l,t.target,d,f))&&t.cancelable&&t.preventDefault()}},$=function o(t){var l=t.target;ve(l,de,o),l.style.transition=""},U=function(t){a("close",t)},q=function(t){t.keyCode===Me.ESC&&(t.stopPropagation(),U(t))},ne=function(t){var l=e.open,d=e.afterVisibleChange;t.target===T.value&&t.propertyName.match(/transform$/)&&(u.value.style.transition="",!l&&g()&&(document.body.style.overflowX="",v.value&&(v.value.style.left="",v.value.style.width="")),d&&d(!!l))},Z=Y(function(){var o=e.placement,t=o==="left"||o==="right",l="translate".concat(t?"X":"Y");return{isHorizontal:t,placementName:l}}),G=function(){var t=e.open,l=e.width,d=e.height,f=Z.value,m=f.isHorizontal,b=f.placementName,w=p.value?p.value.getBoundingClientRect()[m?"width":"height"]:0,O=(m?l:d)||w;ae(t,b,O)},J=function(t,l,d,f){var m=e.placement,b=e.levelMove,w=e.duration,O=e.ease,B=e.showMask;E.forEach(function(R){R.style.transition="transform ".concat(w," ").concat(O),fe(R,de,$);var F=t?d:0;if(b){var Q=Re(b,{target:R,open:t});F=t?Q[0]:Q[1]||0}var ee=typeof F=="number"?"".concat(F,"px"):F,H=m==="left"||m==="top"?ee:"-".concat(ee);H=B&&m==="right"&&f?"calc(".concat(H," + ").concat(f,"px)"):H,R.style.transform=F?"".concat(l,"(").concat(H,")"):""})},ae=function(t,l,d){if(!ie){var f=document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)&&window.innerWidth>document.body.offsetWidth?De(!0):0;J(t,l,d,f),h(f)}a("change",t)},h=function(t){var l=e.getContainer,d=e.showMask,f=e.open,m=l==null?void 0:l();if(m&&m.parentNode===document.body&&d){var b=["touchstart"],w=[document.body,v.value,j.value,p.value];f&&document.body.style.overflow!=="hidden"?(t&&s(t),document.body.style.touchAction="none",w.forEach(function(O,B){!O||fe(O,b[B]||"touchmove",B?V:I,W)})):g()&&(document.body.style.touchAction="",t&&c(t),w.forEach(function(O,B){!O||ve(O,b[B]||"touchmove",B?V:I,W)}))}},s=function(t){var l=e.placement,d=e.duration,f=e.ease,m="width ".concat(d," ").concat(f),b="transform ".concat(d," ").concat(f);switch(u.value.style.transition="none",l){case"right":u.value.style.transform="translateX(-".concat(t,"px)");break;case"top":case"bottom":u.value.style.width="calc(100% - ".concat(t,"px)"),u.value.style.transform="translateZ(0)";break}clearTimeout(N),N=setTimeout(function(){u.value&&(u.value.style.transition="".concat(b,",").concat(m),u.value.style.width="",u.value.style.transform="")})},c=function(t){var l=e.placement,d=e.duration,f=e.ease;u.value.style.transition="none";var m,b="width ".concat(d," ").concat(f),w="transform ".concat(d," ").concat(f);switch(l){case"left":{u.value.style.width="100%",b="width 0s ".concat(f," ").concat(d);break}case"right":{u.value.style.transform="translateX(".concat(t,"px)"),u.value.style.width="100%",b="width 0s ".concat(f," ").concat(d),v.value&&(v.value.style.left="-".concat(t,"px"),v.value.style.width="calc(100% + ".concat(t,"px)"));break}case"top":case"bottom":{u.value.style.width="calc(100% + ".concat(t,"px)"),u.value.style.height="100%",u.value.style.transform="translateZ(0)",m="height 0s ".concat(f," ").concat(d);break}}clearTimeout(N),N=setTimeout(function(){u.value&&(u.value.style.transition="".concat(w,",").concat(m?"".concat(m,","):"").concat(b),u.value.style.transform="",u.value.style.width="",u.value.style.height="")})},g=function(){return!Object.keys(X).some(function(t){return X[t]})},C=function(t){var l=t.level,d=t.getContainer;if(!ie){var f=d==null?void 0:d(),m=f?f.parentNode:null;if(E=[],l==="all"){var b=m?Array.prototype.slice.call(m.children):[];b.forEach(function(w){w.nodeName!=="SCRIPT"&&w.nodeName!=="STYLE"&&w.nodeName!=="LINK"&&w!==f&&E.push(w)})}else l&&ze(l).forEach(function(w){document.querySelectorAll(w).forEach(function(O){E.push(O)})})}},S=function(t){a("handleClick",t)},L=M(!1);return K(u,function(){te(function(){L.value=!0})}),function(){var o,t,l,d=e.width,f=e.height,m=e.open,b=e.prefixCls,w=e.placement;e.level,e.levelMove,e.ease,e.duration,e.getContainer,e.onChange,e.afterVisibleChange;var O=e.showMask,B=e.maskClosable,R=e.maskStyle,F=e.keyboard;e.getOpenCount,e.scrollLocker;var Q=e.contentWrapperStyle,ee=e.style,H=e.class,Pe=Xe(e,["width","height","open","prefixCls","placement","level","levelMove","ease","duration","getContainer","onChange","afterVisibleChange","showMask","maskClosable","maskStyle","keyboard","getOpenCount","scrollLocker","contentWrapperStyle","style","class"]),oe=m&&L.value,Ne=se(b,(o={},A(o,"".concat(b,"-").concat(w),!0),A(o,"".concat(b,"-open"),oe),A(o,H,!!H),A(o,"no-mask",!O),o)),xe=Z.value.placementName,Te=w==="left"||w==="top"?"-100%":"100%",ue=oe?"":"".concat(xe,"(").concat(Te,")");return k("div",z(z({},Ce(Pe,["switchScrollingEffect","autofocus"])),{},{tabindex:-1,class:Ne,style:ee,ref:u,onKeydown:oe&&F?q:void 0,onTransitionend:ne}),[O&&k("div",{class:"".concat(b,"-mask"),onClick:B?U:void 0,style:R,ref:v},null),k("div",{class:"".concat(b,"-content-wrapper"),style:P({transform:ue,msTransform:ue,width:he(d)?"".concat(d,"px"):d,height:he(f)?"".concat(f,"px"):f},Q),ref:T},[k("div",{class:"".concat(b,"-content"),ref:p},[(t=i.default)===null||t===void 0?void 0:t.call(i)]),i.handler?k("div",{onClick:S,ref:j},[(l=i.handler)===null||l===void 0?void 0:l.call(i)]):null])])}}}),ye=Ke,me=globalThis&&globalThis.__rest||function(n,e){var r={};for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&e.indexOf(a)<0&&(r[a]=n[a]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,a=Object.getOwnPropertySymbols(n);i<a.length;i++)e.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(n,a[i])&&(r[a[i]]=n[a[i]]);return r},Ye=ce({inheritAttrs:!1,props:ke(Fe(),{prefixCls:"drawer",placement:"left",getContainer:"body",level:"all",duration:".3s",ease:"cubic-bezier(0.78, 0.14, 0.15, 0.86)",afterVisibleChange:function(){},showMask:!0,maskClosable:!0,maskStyle:{},wrapperClassName:"",keyboard:!0,forceRender:!1,autofocus:!0}),emits:["handleClick","close"],slots:["handler"],setup:function(e,r){var a=r.emit,i=r.slots,x=M(null),N=function(v){a("handleClick",v)},T=function(v){a("close",v)};return function(){e.afterVisibleChange;var u=e.getContainer,v=e.wrapperClassName,j=e.forceRender,p=me(e,["afterVisibleChange","getContainer","wrapperClassName","forceRender"]),E=null;if(!u)return k("div",{class:v,ref:x},[k(ye,z(z({},p),{},{open:e.open,getContainer:function(){return x.value},onClose:T,onHandleClick:N}),i)]);var D=!!i.handler||j;return(D||e.open||x.value)&&(E=k(_e,{visible:e.open,forceRender:D,getContainer:u,wrapperClassName:v},{default:function(_){var I=_.visible,V=_.afterClose,$=me(_,["visible","afterClose"]);return k(ye,z(z(z({ref:x},p),$),{},{open:I!==void 0?I:e.open,afterVisibleChange:V!==void 0?V:e.afterVisibleChange,onClose:T,onHandleClick:N}),i)}})),E}}}),Ue=Ye,qe=globalThis&&globalThis.__rest||function(n,e){var r={};for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&e.indexOf(a)<0&&(r[a]=n[a]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,a=Object.getOwnPropertySymbols(n);i<a.length;i++)e.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(n,a[i])&&(r[a[i]]=n[a[i]]);return r},Ze=Se("top","right","bottom","left");Se("default","large");var be={distance:180},Ge=function(){return{autofocus:{type:Boolean,default:void 0},closable:{type:Boolean,default:void 0},closeIcon:y.any,destroyOnClose:{type:Boolean,default:void 0},forceRender:{type:Boolean,default:void 0},getContainer:y.any,maskClosable:{type:Boolean,default:void 0},mask:{type:Boolean,default:void 0},maskStyle:{type:Object,default:void 0},wrapStyle:{type:Object,default:void 0},style:{type:Object,default:void 0},class:y.any,wrapClassName:String,size:{type:String},drawerStyle:{type:Object,default:void 0},headerStyle:{type:Object,default:void 0},bodyStyle:{type:Object,default:void 0},contentWrapperStyle:{type:Object,default:void 0},title:y.any,visible:{type:Boolean,default:void 0},width:y.oneOfType([y.string,y.number]),height:y.oneOfType([y.string,y.number]),zIndex:Number,prefixCls:String,push:y.oneOfType([y.looseBool,{type:Object}]),placement:y.oneOf(Ze),keyboard:{type:Boolean,default:void 0},extra:y.any,footer:y.any,footerStyle:{type:Object,default:void 0},level:y.any,levelMove:{type:[Number,Array,Function]},handle:y.any,afterVisibleChange:Function,onAfterVisibleChange:Function,"onUpdate:visible":Function,onClose:Function}},Je=ce({name:"ADrawer",inheritAttrs:!1,props:ke(Ge(),{closable:!0,placement:"right",maskClosable:!0,mask:!0,level:null,keyboard:!0,push:be}),slots:["closeIcon","title","extra","footer","handle"],setup:function(e,r){var a=r.emit,i=r.slots,x=r.attrs,N=M(!1),T=M(!1),u=M(null),v=Be("parentDrawerOpts",null),j=Ve("drawer",e),p=j.prefixCls;le(!e.afterVisibleChange,"Drawer","`afterVisibleChange` prop is deprecated, please use `@afterVisibleChange` event instead"),le(e.wrapStyle===void 0,"Drawer","`wrapStyle` prop is deprecated, please use `style` instead"),le(e.wrapClassName===void 0,"Drawer","`wrapClassName` prop is deprecated, please use `class` instead");var E=function(){N.value=!0},D=function(){N.value=!1,te(function(){W()})};Ae("parentDrawerOpts",{setPush:E,setPull:D}),we(function(){var h=e.visible;h&&v&&v.setPush()}),ge(function(){v&&v.setPull()}),K(function(){return e.visible},function(h){v&&(h?v.setPush():v.setPull())},{flush:"post"});var W=function(){var s,c;(c=(s=u.value)===null||s===void 0?void 0:s.domFocus)===null||c===void 0||c.call(s)},_=function(s){a("update:visible",!1),a("close",s)},I=function(s){var c;(c=e.afterVisibleChange)===null||c===void 0||c.call(e,s),a("afterVisibleChange",s)},V=Y(function(){return e.destroyOnClose&&!e.visible}),$=function(){var s=V.value;!s||e.visible||(T.value=!0)},U=Y(function(){var h=e.push,s=e.placement,c;return typeof h=="boolean"?c=h?be.distance:0:c=h.distance,c=parseFloat(String(c||0)),s==="left"||s==="right"?"translateX(".concat(s==="left"?c:-c,"px)"):s==="top"||s==="bottom"?"translateY(".concat(s==="top"?c:-c,"px)"):null}),q=Y(function(){var h=e.visible,s=e.mask,c=e.placement,g=e.size,C=g===void 0?"default":g,S=e.width,L=e.height;if(!h&&!s)return{};var o={};if(c==="left"||c==="right"){var t=C==="large"?736:378;o.width=typeof S=="undefined"?t:S,o.width=typeof o.width=="string"?o.width:"".concat(o.width,"px")}else{var l=C==="large"?736:378;o.height=typeof L=="undefined"?l:L,o.height=typeof o.height=="string"?o.height:"".concat(o.height,"px")}return o}),ne=Y(function(){var h=e.zIndex,s=e.wrapStyle,c=e.mask,g=e.style,C=c?{}:q.value;return P(P(P({zIndex:h,transform:N.value?U.value:void 0},C),s),g)}),Z=function(s){var c=e.closable,g=e.headerStyle,C=re(i,e,"extra"),S=re(i,e,"title");return!S&&!c?null:k("div",{class:se("".concat(s,"-header"),A({},"".concat(s,"-header-close-only"),c&&!S&&!C)),style:g},[k("div",{class:"".concat(s,"-header-title")},[G(s),S&&k("div",{class:"".concat(s,"-title")},[S])]),C&&k("div",{class:"".concat(s,"-extra")},[C])])},G=function(s){var c,g=e.closable,C=i.closeIcon?(c=i.closeIcon)===null||c===void 0?void 0:c.call(i):e.closeIcon;return g&&k("button",{key:"closer",onClick:_,"aria-label":"Close",class:"".concat(s,"-close")},[C===void 0?k(Ie,null,null):C])},J=function(s){var c;if(T.value&&!e.visible)return null;T.value=!1;var g=e.bodyStyle,C=e.drawerStyle,S={},L=V.value;return L&&(S.opacity=0,S.transition="opacity .3s"),k("div",{class:"".concat(s,"-wrapper-body"),style:P(P({},S),C),onTransitionend:$},[Z(s),k("div",{key:"body",class:"".concat(s,"-body"),style:g},[(c=i.default)===null||c===void 0?void 0:c.call(i)]),ae(s)])},ae=function(s){var c=re(i,e,"footer");if(!c)return null;var g="".concat(s,"-footer");return k("div",{class:g,style:e.footerStyle},[c])};return function(){var h;e.width,e.height;var s=e.visible,c=e.placement,g=e.mask,C=e.wrapClassName,S=e.class,L=qe(e,["width","height","visible","placement","mask","wrapClassName","class"]),o=g?q.value:{},t=g?"":"no-mask",l=P(P(P(P({},x),Ce(L,["size","closeIcon","closable","destroyOnClose","drawerStyle","headerStyle","bodyStyle","title","push","wrapStyle","onAfterVisibleChange","onClose","onUpdate:visible"])),o),{onClose:_,afterVisibleChange:I,handler:!1,prefixCls:p.value,open:s,showMask:g,placement:c,class:se((h={},A(h,S,S),A(h,C,!!C),A(h,t,!!t),h)),style:ne.value,ref:u});return k(Ue,l,{handler:e.handle?function(){return e.handle}:i.handle,default:function(){return J(p.value)}})}}}),et=Le(Je);export{et as D};
