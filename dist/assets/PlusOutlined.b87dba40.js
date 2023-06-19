import{d as ee,t as Pe,c as s,x as Ce,P as j,a as C,o as An,b as d,i as P,e as pe,w as te,_ as L,Q as Ke,E as Ae,a5 as He,j as z,a6 as fn,g as Re,F as je,a7 as dn,m as Oe,G as qe,a8 as We,a9 as mn,aa as Fn,ab as jn,Y as he,a3 as Te,B as De,l as pn,k as ze,ac as Tn,ad as yn,a0 as gn,z as Ge,n as Dn,ae as zn,p as Ln,v as Vn,af as rn,u as bn,U as $n,ag as Bn}from"./index.118c7d70.js";import{R as hn,a as qn,b as Wn,c as Gn}from"./isSymbol.b2ca7c44.js";import{K as Un}from"./KeyCode.0ed1902f.js";var Cn=Symbol("OverflowContextProviderKey"),Xe=ee({name:"OverflowContextProvider",inheritAttrs:!1,props:{value:{type:Object}},setup:function(e,r){var n=r.slots;return Pe(Cn,s(function(){return e.value})),function(){var a;return(a=n.default)===null||a===void 0?void 0:a.call(n)}}}),Yn=function(){return Ce(Cn,s(function(){return null}))},Hn=globalThis&&globalThis.__rest||function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r},Me=void 0,Fe=ee({name:"Item",props:{prefixCls:String,item:j.any,renderItem:Function,responsive:Boolean,itemKey:{type:[String,Number]},registerSize:Function,display:Boolean,order:Number,component:j.any,invalidate:Boolean},setup:function(e,r){var n=r.slots,a=r.expose,u=s(function(){return e.responsive&&!e.display}),v=C();a({itemNodeRef:v});function f(o){e.registerSize(e.itemKey,o)}return An(function(){f(null)}),function(){var o,g=e.prefixCls,c=e.invalidate,p=e.item,w=e.renderItem,b=e.responsive;e.registerSize,e.itemKey,e.display;var h=e.order,m=e.component,O=m===void 0?"div":m,E=Hn(e,["prefixCls","invalidate","item","renderItem","responsive","registerSize","itemKey","display","order","component"]),X=(o=n.default)===null||o===void 0?void 0:o.call(n),I=w&&p!==Me?w(p):X,S;c||(S={opacity:u.value?0:1,height:u.value?0:Me,overflowY:u.value?"hidden":Me,order:b?h:Me,pointerEvents:u.value?"none":Me,position:u.value?"absolute":Me});var V={};return u.value&&(V["aria-hidden"]=!0),d(hn,{disabled:!b,onResize:function(N){var M=N.offsetWidth;f(M)}},{default:function(){return d(O,P(P(P({class:pe(!c&&g),style:S},V),E),{},{ref:v}),{default:function(){return[I]}})}})}}}),Ue=globalThis&&globalThis.__rest||function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r},Xn=ee({name:"RawItem",inheritAttrs:!1,props:{component:j.any,title:j.any,id:String,onMouseenter:{type:Function},onMouseleave:{type:Function},onClick:{type:Function},onKeydown:{type:Function},onFocus:{type:Function}},setup:function(e,r){var n=r.slots,a=r.attrs,u=Yn();return function(){var v;if(!u.value){var f=e.component,o=f===void 0?"div":f,g=Ue(e,["component"]);return d(o,P(P({},g),a),{default:function(){return[(v=n.default)===null||v===void 0?void 0:v.call(n)]}})}var c=u.value,p=c.className,w=Ue(c,["className"]),b=a.class,h=Ue(a,["class"]);return d(Xe,{value:null},{default:function(){return[d(Fe,P(P(P({class:pe(p,b)},w),h),e),n)]}})}}}),Qn=globalThis&&globalThis.__rest||function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r},wn="responsive",Mn="invalidate";function Zn(t){return"+ ".concat(t.length," ...")}var Jn=function(){return{id:String,prefixCls:String,data:Array,itemKey:[String,Number,Function],itemWidth:{type:Number,default:10},renderItem:Function,renderRawItem:Function,maxCount:[Number,String],renderRest:Function,renderRawRest:Function,suffix:j.any,component:String,itemComponent:j.any,onVisibleChange:Function,ssr:String,onMousedown:Function}},$e=ee({name:"Overflow",inheritAttrs:!1,props:Jn(),emits:["visibleChange"],setup:function(e,r){var n=r.attrs,a=r.emit,u=r.slots,v=s(function(){return e.ssr==="full"}),f=C(null),o=s(function(){return f.value||0}),g=C(new Map),c=C(0),p=C(0),w=C(0),b=C(null),h=C(null),m=s(function(){return h.value===null&&v.value?Number.MAX_SAFE_INTEGER:h.value||0}),O=C(!1),E=s(function(){return"".concat(e.prefixCls,"-item")}),X=s(function(){return Math.max(c.value,p.value)}),I=s(function(){return!!(e.data.length&&e.maxCount===wn)}),S=s(function(){return e.maxCount===Mn}),V=s(function(){return I.value||typeof e.maxCount=="number"&&e.data.length>e.maxCount}),$=s(function(){var x=e.data;return I.value?f.value===null&&v.value?x=e.data:x=e.data.slice(0,Math.min(e.data.length,o.value/e.itemWidth)):typeof e.maxCount=="number"&&(x=e.data.slice(0,e.maxCount)),x}),N=s(function(){return I.value?e.data.slice(m.value+1):e.data.slice($.value.length)}),M=function(R,A){var k,Y;return typeof e.itemKey=="function"?e.itemKey(R):(Y=e.itemKey&&((k=R)===null||k===void 0?void 0:k[e.itemKey]))!==null&&Y!==void 0?Y:A},_=s(function(){return e.renderItem||function(x){return x}}),B=function(R,A){h.value=R,A||(O.value=R<e.data.length-1,a("visibleChange",R))},Z=function(R,A){f.value=A.clientWidth},re=function(R,A){var k=new Map(g.value);A===null?k.delete(R):k.set(R,A),g.value=k},ne=function(R,A){c.value=p.value,p.value=A},ue=function(R,A){w.value=A},ie=function(R){return g.value.get(M($.value[R],R))};return te([o,g,p,w,function(){return e.itemKey},$],function(){if(o.value&&X.value&&$.value){var x=w.value,R=$.value.length,A=R-1;if(!R){B(0),b.value=null;return}for(var k=0;k<R;k+=1){var Y=ie(k);if(Y===void 0){B(k-1,!0);break}if(x+=Y,A===0&&x<=o.value||k===A-1&&x+ie(A)<=o.value){B(A),b.value=null;break}else if(x+X.value>o.value){B(k-1),b.value=x-Y-w.value+p.value;break}}e.suffix&&ie(0)+w.value>o.value&&(b.value=null)}}),function(){var x=O.value&&!!N.value.length,R=e.itemComponent,A=e.renderRawItem,k=e.renderRawRest,Y=e.renderRest,oe=e.prefixCls,Q=oe===void 0?"rc-overflow":oe,ve=e.suffix,i=e.component,l=i===void 0?"div":i,y=e.id,T=e.onMousedown,K=n.class,G=n.style,D=Qn(n,["class","style"]),q={};b.value!==null&&I.value&&(q={position:"absolute",left:"".concat(b.value,"px"),top:0});var U={prefixCls:E.value,responsive:I.value,component:R,invalidate:S.value},se=A?function(J,H){var fe=M(J,H);return d(Xe,{key:fe,value:L(L({},U),{order:H,item:J,itemKey:fe,registerSize:re,display:H<=m.value})},{default:function(){return[A(J,H)]}})}:function(J,H){var fe=M(J,H);return d(Fe,P(P({},U),{},{order:H,key:fe,item:J,renderItem:_.value,itemKey:fe,registerSize:re,display:H<=m.value}),null)},le=function(){return null},ce={order:x?m.value:Number.MAX_SAFE_INTEGER,className:"".concat(E.value," ").concat(E.value,"-rest"),registerSize:ne,display:x};if(k)k&&(le=function(){return d(Xe,{value:L(L({},U),ce)},{default:function(){return[k(N.value)]}})});else{var we=Y||Zn;le=function(){return d(Fe,P(P({},U),ce),{default:function(){return typeof we=="function"?we(N.value):we}})}}var Be=function(){var H;return d(l,P({id:y,class:pe(!S.value&&Q,K),style:G,onMousedown:T},D),{default:function(){return[$.value.map(se),V.value?le():null,ve&&d(Fe,P(P({},U),{},{order:m.value,class:"".concat(E.value,"-suffix"),registerSize:ue,display:!0,style:q}),{default:function(){return ve}}),(H=u.default)===null||H===void 0?void 0:H.call(u)]}})};return d(hn,{disabled:!I.value,onResize:Z},{default:Be})}}});$e.Item=Xn;$e.RESPONSIVE=wn;$e.INVALIDATE=Mn;var _e=$e,Tt=function(){if(typeof navigator=="undefined"||typeof window=="undefined")return!1;var t=navigator.userAgent||navigator.vendor||window.opera;return!!(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(t==null?void 0:t.substr(0,4)))};function Dt(t,e){var r=e||{},n=r.defaultValue,a=r.value,u=a===void 0?C():a,v=typeof t=="function"?t():t;u.value!==void 0&&(v=Ke(u)),n!==void 0&&(v=typeof n=="function"?n():n);var f=C(v),o=C(v);Ae(function(){var c=u.value!==void 0?u.value:f.value;e.postState&&(c=e.postState(c)),o.value=c});function g(c){var p=o.value;f.value=c,He(o.value)!==c&&e.onChange&&e.onChange(c,p)}return te(u,function(){f.value=u.value}),[o,g]}function zt(t){var e=typeof t=="function"?t():t,r=C(e);function n(a){r.value=a}return[r,n]}var Ie={adjustX:1,adjustY:1},Se=[0,0],et={topLeft:{points:["bl","tl"],overflow:Ie,offset:[0,-4],targetOffset:Se},topCenter:{points:["bc","tc"],overflow:Ie,offset:[0,-4],targetOffset:Se},topRight:{points:["br","tr"],overflow:Ie,offset:[0,-4],targetOffset:Se},bottomLeft:{points:["tl","bl"],overflow:Ie,offset:[0,4],targetOffset:Se},bottomCenter:{points:["tc","bc"],overflow:Ie,offset:[0,4],targetOffset:Se},bottomRight:{points:["tr","br"],overflow:Ie,offset:[0,4],targetOffset:Se}},nt=et,tt=globalThis&&globalThis.__rest||function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r},Lt=ee({props:{minOverlayWidthMatchTrigger:{type:Boolean,default:void 0},arrow:{type:Boolean,default:!1},prefixCls:j.string.def("rc-dropdown"),transitionName:String,overlayClassName:j.string.def(""),openClassName:String,animation:j.any,align:j.object,overlayStyle:{type:Object,default:void 0},placement:j.string.def("bottomLeft"),overlay:j.any,trigger:j.oneOfType([j.string,j.arrayOf(j.string)]).def("hover"),alignPoint:{type:Boolean,default:void 0},showAction:j.array,hideAction:j.array,getPopupContainer:Function,visible:{type:Boolean,default:void 0},defaultVisible:{type:Boolean,default:!1},mouseEnterDelay:j.number.def(.15),mouseLeaveDelay:j.number.def(.1)},emits:["visibleChange","overlayClick"],slots:["overlay"],setup:function(e,r){var n=r.slots,a=r.emit,u=r.expose,v=C(!!e.visible);te(function(){return e.visible},function(h){h!==void 0&&(v.value=h)});var f=C();u({triggerRef:f});var o=function(m){e.visible===void 0&&(v.value=!1),a("overlayClick",m)},g=function(m){e.visible===void 0&&(v.value=m),a("visibleChange",m)},c=function(){var m,O=(m=n.overlay)===null||m===void 0?void 0:m.call(n),E={prefixCls:"".concat(e.prefixCls,"-menu"),onClick:o,getPopupContainer:function(){return f.value.getPopupDomNode()}};return d(je,null,[e.arrow&&d("div",{class:"".concat(e.prefixCls,"-arrow")},null),Re(O,E,!1)])},p=s(function(){var h=e.minOverlayWidthMatchTrigger,m=h===void 0?!e.alignPoint:h;return m}),w=function(){var m,O=(m=n.default)===null||m===void 0?void 0:m.call(n);return v.value&&O?Re(O[0],{class:e.openClassName||"".concat(e.prefixCls,"-open")},!1):O},b=s(function(){return!e.hideAction&&e.trigger.indexOf("contextmenu")!==-1?["click"]:e.hideAction});return function(){var h=e.prefixCls,m=e.arrow,O=e.showAction,E=e.overlayStyle,X=e.trigger,I=e.placement,S=e.align,V=e.getPopupContainer,$=e.transitionName,N=e.animation,M=e.overlayClassName,_=tt(e,["prefixCls","arrow","showAction","overlayStyle","trigger","placement","align","getPopupContainer","transitionName","animation","overlayClassName"]);return d(fn,P(P({},_),{},{prefixCls:h,ref:f,popupClassName:pe(M,z({},"".concat(h,"-show-arrow"),m)),popupStyle:E,builtinPlacements:nt,action:X,showAction:O,hideAction:b.value||[],popupPlacement:I,popupAlign:S,popupTransitionName:$,popupAnimation:N,popupVisible:v.value,stretch:p.value?"minWidth":"",onPopupVisibleChange:g,getPopupContainer:V}),{popup:c,default:w})}}}),at={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"ellipsis",theme:"outlined"},rt=at;function ln(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?Object(arguments[e]):{},n=Object.keys(r);typeof Object.getOwnPropertySymbols=="function"&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(a){return Object.getOwnPropertyDescriptor(r,a).enumerable}))),n.forEach(function(a){lt(t,a,r[a])})}return t}function lt(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var Je=function(e,r){var n=ln({},e,r.attrs);return d(dn,ln({},n,{icon:rt}),null)};Je.displayName="EllipsisOutlined";Je.inheritAttrs=!1;var it=Je;function ut(t,e,r,n){var a=r?r.call(n,t,e):void 0;if(a!==void 0)return!!a;if(t===e)return!0;if(Oe(t)!=="object"||!t||Oe(e)!=="object"||!e)return!1;var u=Object.keys(t),v=Object.keys(e);if(u.length!==v.length)return!1;for(var f=Object.prototype.hasOwnProperty.bind(e),o=0;o<u.length;o++){var g=u[o];if(!f(g))return!1;var c=t[g],p=e[g];if(a=r?r.call(n,c,p,g):void 0,a===!1||a===void 0&&c!==p)return!1}return!0}function xe(t,e,r,n){return ut(He(t),He(e),r,n)}var In=Symbol("menuContextKey"),Sn=function(e){Pe(In,e)},ye=function(){return Ce(In)},On=Symbol("ForceRenderKey"),ot=function(e){Pe(On,e)},Pn=function(){return Ce(On,!1)},xn=Symbol("menuFirstLevelContextKey"),Kn=function(e){Pe(xn,e)},st=function(){return Ce(xn,!0)},Le=ee({name:"MenuContextProvider",inheritAttrs:!1,props:{mode:{type:String,default:void 0},overflowDisabled:{type:Boolean,default:void 0},isRootMenu:{type:Boolean,default:void 0}},setup:function(e,r){var n=r.slots,a=ye(),u=L({},a);return e.mode!==void 0&&(u.mode=qe(e,"mode")),e.isRootMenu!==void 0&&(u.isRootMenu=qe(e,"isRootMenu")),e.overflowDisabled!==void 0&&(u.overflowDisabled=qe(e,"overflowDisabled")),Sn(u),function(){var v;return(v=n.default)===null||v===void 0?void 0:v.call(n)}}}),vt=Sn;function ct(){}var ft=1/0,dt=We&&1/mn(new We([,-0]))[1]==ft?function(t){return new We(t)}:ct,mt=dt,pt=200;function yt(t,e,r){var n=-1,a=qn,u=t.length,v=!0,f=[],o=f;if(r)v=!1,a=Wn;else if(u>=pt){var g=e?null:mt(t);if(g)return mn(g);v=!1,a=jn,o=new Fn}else o=e?[]:f;e:for(;++n<u;){var c=t[n],p=e?e(c):c;if(c=r||c!==0?c:0,v&&p===p){for(var w=o.length;w--;)if(o[w]===p)continue e;e&&o.push(p),f.push(c)}else a(o,p,r)||(o!==f&&o.push(p),f.push(c))}return f}function Ye(t){return t&&t.length?yt(t):[]}var gt=Symbol("siderCollapsed"),Ne="$$__vc-menu-more__key",_n=Symbol("KeyPathContext"),en=function(){return Ce(_n,{parentEventKeys:s(function(){return[]}),parentKeys:s(function(){return[]}),parentInfo:{}})},bt=function(e,r,n){var a=en(),u=a.parentEventKeys,v=a.parentKeys,f=s(function(){return[].concat(he(u.value),[e])}),o=s(function(){return[].concat(he(v.value),[r])});return Pe(_n,{parentEventKeys:f,parentKeys:o,parentInfo:n}),o},Rn=Symbol("measure"),un=ee({setup:function(e,r){var n=r.slots;return Pe(Rn,!0),function(){var a;return(a=n.default)===null||a===void 0?void 0:a.call(n)}}}),nn=function(){return Ce(Rn,!1)},ht=bt;function kn(t){var e=ye(),r=e.mode,n=e.rtl,a=e.inlineIndent;return s(function(){return r.value!=="inline"?null:n.value?{paddingRight:"".concat(t.value*a.value,"px")}:{paddingLeft:"".concat(t.value*a.value,"px")}})}var Ct=0,wt=function(){return{id:String,role:String,disabled:Boolean,danger:Boolean,title:{type:[String,Boolean],default:void 0},icon:j.any,onMouseenter:Function,onMouseleave:Function,onClick:Function,onKeydown:Function,onFocus:Function}},Ve=ee({name:"AMenuItem",inheritAttrs:!1,props:wt(),slots:["icon","title"],setup:function(e,r){var n=r.slots,a=r.emit,u=r.attrs,v=yn(),f=nn(),o=Oe(v.vnode.key)==="symbol"?String(v.vnode.key):v.vnode.key;Te(Oe(v.vnode.key)!=="symbol","MenuItem",'MenuItem `:key="'.concat(String(o),'"` not support Symbol type'));var g="menu_item_".concat(++Ct,"_$$_").concat(o),c=en(),p=c.parentEventKeys,w=c.parentKeys,b=ye(),h=b.prefixCls,m=b.activeKeys,O=b.disabled,E=b.changeActiveKeys,X=b.rtl,I=b.inlineCollapsed,S=b.siderCollapsed,V=b.onItemClick,$=b.selectedKeys,N=b.registerMenuInfo,M=b.unRegisterMenuInfo,_=st(),B=C(!1),Z=s(function(){return[].concat(he(w.value),[o])}),re={eventKey:g,key:o,parentEventKeys:p,parentKeys:w,isLeaf:!0};N(g,re),De(function(){M(g)}),te(m,function(){B.value=!!m.value.find(function(i){return i===o})},{immediate:!0});var ne=s(function(){return O.value||e.disabled}),ue=s(function(){return $.value.includes(o)}),ie=s(function(){var i,l="".concat(h.value,"-item");return i={},z(i,"".concat(l),!0),z(i,"".concat(l,"-danger"),e.danger),z(i,"".concat(l,"-active"),B.value),z(i,"".concat(l,"-selected"),ue.value),z(i,"".concat(l,"-disabled"),ne.value),i}),x=function(l){return{key:o,eventKey:g,keyPath:Z.value,eventKeyPath:[].concat(he(p.value),[g]),domEvent:l,item:L(L({},e),u)}},R=function(l){if(!ne.value){var y=x(l);a("click",l),V(y)}},A=function(l){ne.value||(E(Z.value),a("mouseenter",l))},k=function(l){ne.value||(E([]),a("mouseleave",l))},Y=function(l){if(a("keydown",l),l.which===Un.ENTER){var y=x(l);a("click",l),V(y)}},oe=function(l){E(Z.value),a("focus",l)},Q=function(l,y){var T=d("span",{class:"".concat(h.value,"-title-content")},[y]);return(!l||gn(y)&&y.type==="span")&&y&&I.value&&_&&typeof y=="string"?d("div",{class:"".concat(h.value,"-inline-collapsed-noicon")},[y.charAt(0)]):T},ve=kn(s(function(){return Z.value.length}));return function(){var i,l,y,T;if(f)return null;var K=(l=e.title)!==null&&l!==void 0?l:(y=n.title)===null||y===void 0?void 0:y.call(n),G=pn((T=n.default)===null||T===void 0?void 0:T.call(n)),D=G.length,q=K;typeof K=="undefined"?q=_&&D?G:"":K===!1&&(q="");var U={title:q};!S.value&&!I.value&&(U.title=null,U.visible=!1);var se={};e.role==="option"&&(se["aria-selected"]=ue.value);var le=ze(n,e,"icon");return d(Tn,P(P({},U),{},{placement:X.value?"left":"right",overlayClassName:"".concat(h.value,"-inline-collapsed-tooltip")}),{default:function(){return[d(_e.Item,P(P(P({component:"li"},u),{},{id:e.id,style:L(L({},u.style||{}),ve.value),class:[ie.value,(i={},z(i,"".concat(u.class),!!u.class),z(i,"".concat(h.value,"-item-only-child"),(le?D+1:D)===1),i)],role:e.role||"menuitem",tabindex:e.disabled?null:-1,"data-menu-id":o,"aria-disabled":e.disabled},se),{},{onMouseenter:A,onMouseleave:k,onClick:R,onKeydown:Y,onFocus:oe,title:typeof K=="string"?K:void 0}),{default:function(){return[Re(le,{class:"".concat(h.value,"-item-icon")},!1),Q(le,G)]}})]}})}}}),me={adjustX:1,adjustY:1},Mt={topLeft:{points:["bl","tl"],overflow:me,offset:[0,-7]},bottomLeft:{points:["tl","bl"],overflow:me,offset:[0,7]},leftTop:{points:["tr","tl"],overflow:me,offset:[-4,0]},rightTop:{points:["tl","tr"],overflow:me,offset:[4,0]}},It={topLeft:{points:["bl","tl"],overflow:me,offset:[0,-7]},bottomLeft:{points:["tl","bl"],overflow:me,offset:[0,7]},rightTop:{points:["tr","tl"],overflow:me,offset:[-4,0]},leftTop:{points:["tl","tr"],overflow:me,offset:[4,0]}},St={horizontal:"bottomLeft",vertical:"rightTop","vertical-left":"rightTop","vertical-right":"leftTop"},on=ee({name:"PopupTrigger",inheritAttrs:!1,props:{prefixCls:String,mode:String,visible:Boolean,popupClassName:String,popupOffset:Array,disabled:Boolean,onVisibleChange:Function},slots:["popup"],emits:["visibleChange"],setup:function(e,r){var n=r.slots,a=r.emit,u=C(!1),v=ye(),f=v.getPopupContainer,o=v.rtl,g=v.subMenuOpenDelay,c=v.subMenuCloseDelay,p=v.builtinPlacements,w=v.triggerSubMenuAction,b=v.isRootMenu,h=v.forceSubMenuRender,m=v.motion,O=v.defaultMotions,E=Pn(),X=s(function(){return o.value?L(L({},It),p.value):L(L({},Mt),p.value)}),I=s(function(){return St[e.mode]}),S=C();te(function(){return e.visible},function(N){Ge.cancel(S.value),S.value=Ge(function(){u.value=N})},{immediate:!0}),De(function(){Ge.cancel(S.value)});var V=function(M){a("visibleChange",M)},$=s(function(){var N,M,_=m.value||((N=O.value)===null||N===void 0?void 0:N[e.mode])||((M=O.value)===null||M===void 0?void 0:M.other),B=typeof _=="function"?_():_;return B?Dn(B.name,{css:!0}):void 0});return function(){var N=e.prefixCls,M=e.popupClassName,_=e.mode,B=e.popupOffset,Z=e.disabled;return d(fn,{prefixCls:N,popupClassName:pe("".concat(N,"-popup"),z({},"".concat(N,"-rtl"),o.value),M),stretch:_==="horizontal"?"minWidth":null,getPopupContainer:b.value?f.value:function(re){return re.parentNode},builtinPlacements:X.value,popupPlacement:I.value,popupVisible:u.value,popupAlign:B&&{offset:B},action:Z?[]:[w.value],mouseEnterDelay:g.value,mouseLeaveDelay:c.value,onPopupVisibleChange:V,forceRender:E||h.value,popupAnimation:$.value},{popup:n.popup,default:n.default})}}}),En=function(e,r){var n=r.slots,a=r.attrs,u,v=ye(),f=v.prefixCls,o=v.mode;return d("ul",P(P({},a),{},{class:pe(f.value,"".concat(f.value,"-sub"),"".concat(f.value,"-").concat(o.value==="inline"?"inline":"vertical")),"data-menu-list":!0}),[(u=n.default)===null||u===void 0?void 0:u.call(n)])};En.displayName="SubMenuList";var Nn=En,Ot=ee({name:"InlineSubMenuList",inheritAttrs:!1,props:{id:String,open:Boolean,keyPath:Array},setup:function(e,r){var n=r.slots,a=s(function(){return"inline"}),u=ye(),v=u.motion,f=u.mode,o=u.defaultMotions,g=s(function(){return f.value===a.value}),c=C(!g.value),p=s(function(){return g.value?e.open:!1});te(f,function(){g.value&&(c.value=!1)},{flush:"post"});var w=s(function(){var b,h,m=v.value||((b=o.value)===null||b===void 0?void 0:b[a.value])||((h=o.value)===null||h===void 0?void 0:h.other),O=typeof m=="function"?m():m;return L(L({},O),{appear:e.keyPath.length<=1})});return function(){var b;return c.value?null:d(Le,{mode:a.value},{default:function(){return[d(zn,w.value,{default:function(){return[Ln(d(Nn,{id:e.id},{default:function(){return[(b=n.default)===null||b===void 0?void 0:b.call(n)]}}),[[Vn,p.value]])]}})]}})}}}),sn=0,Pt=function(){return{icon:j.any,title:j.any,disabled:Boolean,level:Number,popupClassName:String,popupOffset:Array,internalPopupClose:Boolean,eventKey:String,expandIcon:Function,onMouseenter:Function,onMouseleave:Function,onTitleClick:Function}},ke=ee({name:"ASubMenu",inheritAttrs:!1,props:Pt(),slots:["icon","title","expandIcon"],setup:function(e,r){var n=r.slots,a=r.attrs,u=r.emit,v,f;Kn(!1);var o=nn(),g=yn(),c=Oe(g.vnode.key)==="symbol"?String(g.vnode.key):g.vnode.key;Te(Oe(g.vnode.key)!=="symbol","SubMenu",'SubMenu `:key="'.concat(String(c),'"` not support Symbol type'));var p=rn(c)?c:"sub_menu_".concat(++sn,"_$$_not_set_key"),w=(v=e.eventKey)!==null&&v!==void 0?v:rn(c)?"sub_menu_".concat(++sn,"_$$_").concat(c):p,b=en(),h=b.parentEventKeys,m=b.parentInfo,O=b.parentKeys,E=s(function(){return[].concat(he(O.value),[p])}),X=C([]),I={eventKey:w,key:p,parentEventKeys:h,childrenEventKeys:X,parentKeys:O};(f=m.childrenEventKeys)===null||f===void 0||f.value.push(w),De(function(){var W;m.childrenEventKeys&&(m.childrenEventKeys.value=(W=m.childrenEventKeys)===null||W===void 0?void 0:W.value.filter(function(F){return F!=w}))}),ht(w,p,I);var S=ye(),V=S.prefixCls,$=S.activeKeys,N=S.disabled,M=S.changeActiveKeys,_=S.mode,B=S.inlineCollapsed,Z=S.antdMenuTheme,re=S.openKeys,ne=S.overflowDisabled,ue=S.onOpenChange,ie=S.registerMenuInfo,x=S.unRegisterMenuInfo,R=S.selectedSubMenuKeys,A=S.expandIcon,k=c!=null,Y=!o&&(Pn()||!k);ot(Y),(o&&k||!o&&!k||Y)&&(ie(w,I),De(function(){x(w)}));var oe=s(function(){return"".concat(V.value,"-submenu")}),Q=s(function(){return N.value||e.disabled}),ve=C(),i=C(),l=s(function(){return re.value.includes(p)}),y=s(function(){return!ne.value&&l.value}),T=s(function(){return R.value.includes(p)}),K=C(!1);te($,function(){K.value=!!$.value.find(function(W){return W===p})},{immediate:!0});var G=function(F){Q.value||(u("titleClick",F,p),_.value==="inline"&&ue(p,!l.value))},D=function(F){Q.value||(M(E.value),u("mouseenter",F))},q=function(F){Q.value||(M([]),u("mouseleave",F))},U=kn(s(function(){return E.value.length})),se=function(F){_.value!=="inline"&&ue(p,F)},le=function(){M(E.value)},ce=w&&"".concat(w,"-popup"),we=s(function(){return pe(V.value,"".concat(V.value,"-").concat(Z.value),e.popupClassName)}),Be=function(F,ae){if(!ae)return B.value&&!O.value.length&&F&&typeof F=="string"?d("div",{class:"".concat(V.value,"-inline-collapsed-noicon")},[F.charAt(0)]):d("span",{class:"".concat(V.value,"-title-content")},[F]);var de=gn(F)&&F.type==="span";return d(je,null,[Re(ae,{class:"".concat(V.value,"-item-icon")},!1),de?F:d("span",{class:"".concat(V.value,"-title-content")},[F])])},J=s(function(){return _.value!=="inline"&&E.value.length>1?"vertical":_.value}),H=s(function(){return _.value==="horizontal"?"vertical":_.value}),fe=s(function(){return J.value==="horizontal"?"vertical":J.value}),Ee=function(){var F=oe.value,ae=ze(n,e,"icon"),de=e.expandIcon||n.expandIcon||A.value,ge=Be(ze(n,e,"title"),ae);return d("div",{style:U.value,class:"".concat(F,"-title"),tabindex:Q.value?null:-1,ref:ve,title:typeof ge=="string"?ge:null,"data-menu-id":p,"aria-expanded":y.value,"aria-haspopup":!0,"aria-controls":ce,"aria-disabled":Q.value,onClick:G,onFocus:le},[ge,_.value!=="horizontal"&&de?de(L(L({},e),{isOpen:y.value})):d("i",{class:"".concat(F,"-arrow")},null)])};return function(){var W,F;if(o)return k?(F=n.default)===null||F===void 0?void 0:F.call(n):null;var ae=oe.value,de=function(){return null};return!ne.value&&_.value!=="inline"?de=function(){return d(on,{mode:J.value,prefixCls:ae,visible:!e.internalPopupClose&&y.value,popupClassName:we.value,popupOffset:e.popupOffset,disabled:Q.value,onVisibleChange:se},{default:function(){return[Ee()]},popup:function(){return d(Le,{mode:fe.value,isRootMenu:!1},{default:function(){return[d(Nn,{id:ce,ref:i},{default:n.default})]}})}})}:de=function(){return d(on,null,{default:Ee})},d(Le,{mode:H.value},{default:function(){return[d(_e.Item,P(P({component:"li"},a),{},{role:"none",class:pe(ae,"".concat(ae,"-").concat(_.value),a.class,(W={},z(W,"".concat(ae,"-open"),y.value),z(W,"".concat(ae,"-active"),K.value),z(W,"".concat(ae,"-selected"),T.value),z(W,"".concat(ae,"-disabled"),Q.value),W)),onMouseenter:D,onMouseleave:q,"data-submenu-id":p}),{default:function(){return d(je,null,[de(),!ne.value&&d(Ot,{id:ce,open:y.value,keyPath:E.value},{default:n.default})])}})]}})}}}),xt=function(){return{id:String,prefixCls:String,disabled:Boolean,inlineCollapsed:Boolean,disabledOverflow:Boolean,forceSubMenuRender:Boolean,openKeys:Array,selectedKeys:Array,activeKey:String,selectable:{type:Boolean,default:!0},multiple:{type:Boolean,default:!1},motion:Object,theme:{type:String,default:"light"},mode:{type:String,default:"vertical"},inlineIndent:{type:Number,default:24},subMenuOpenDelay:{type:Number,default:.1},subMenuCloseDelay:{type:Number,default:.1},builtinPlacements:{type:Object},triggerSubMenuAction:{type:String,default:"hover"},getPopupContainer:Function,expandIcon:Function,onOpenChange:Function,onSelect:Function,onDeselect:Function,onClick:[Function,Array],onFocus:Function,onBlur:Function,onMousedown:Function,"onUpdate:openKeys":Function,"onUpdate:selectedKeys":Function,"onUpdate:activeKey":Function}},vn=[],be=ee({name:"AMenu",inheritAttrs:!1,props:xt(),slots:["expandIcon","overflowedIndicator"],setup:function(e,r){var n=r.slots,a=r.emit,u=r.attrs,v=bn("menu",e),f=v.prefixCls,o=v.direction,g=v.getPrefixCls,c=C({}),p=Ce(gt,C(void 0)),w=s(function(){return p.value!==void 0?p.value:e.inlineCollapsed}),b=C(!1);$n(function(){b.value=!0}),Ae(function(){Te(!(e.inlineCollapsed===!0&&e.mode!=="inline"),"Menu","`inlineCollapsed` should only be used when `mode` is inline."),Te(!(p.value!==void 0&&e.inlineCollapsed===!0),"Menu","`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.")});var h=C([]),m=C([]),O=C({});te(c,function(){for(var i={},l=0,y=Object.values(c.value);l<y.length;l++){var T=y[l];i[T.key]=T}O.value=i},{flush:"post"}),Ae(function(){if(e.activeKey!==void 0){var i=[],l=e.activeKey?O.value[e.activeKey]:void 0;l&&e.activeKey!==void 0?i=Ye([].concat(Ke(l.parentKeys),e.activeKey)):i=[],xe(h.value,i)||(h.value=i)}}),te(function(){return e.selectedKeys},function(i){i&&(m.value=i.slice())},{immediate:!0,deep:!0});var E=C([]);te([O,m],function(){var i=[];m.value.forEach(function(l){var y=O.value[l];y&&(i=i.concat(Ke(y.parentKeys)))}),i=Ye(i),xe(E.value,i)||(E.value=i)},{immediate:!0});var X=function(l){if(!!e.selectable){var y=l.key,T=m.value.includes(y),K;e.multiple?T?K=m.value.filter(function(D){return D!==y}):K=[].concat(he(m.value),[y]):K=[y];var G=L(L({},l),{selectedKeys:K});xe(K,m.value)||(e.selectedKeys===void 0&&(m.value=K),a("update:selectedKeys",K),T&&e.multiple?a("deselect",G):a("select",G)),M.value!=="inline"&&!e.multiple&&I.value.length&&Z(vn)}},I=C([]);te(function(){return e.openKeys},function(){var i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:I.value;xe(I.value,i)||(I.value=i.slice())},{immediate:!0,deep:!0});var S,V=function(l){clearTimeout(S),S=setTimeout(function(){e.activeKey===void 0&&(h.value=l),a("update:activeKey",l[l.length-1])})},$=s(function(){return!!e.disabled}),N=s(function(){return o.value==="rtl"}),M=C("vertical"),_=C(!1);Ae(function(){(e.mode==="inline"||e.mode==="vertical")&&w.value?(M.value="vertical",_.value=w.value):(M.value=e.mode,_.value=!1)});var B=s(function(){return M.value==="inline"}),Z=function(l){I.value=l,a("update:openKeys",l),a("openChange",l)},re=C(I.value),ne=C(!1);te(I,function(){B.value&&(re.value=I.value)},{immediate:!0}),te(B,function(){if(!ne.value){ne.value=!0;return}B.value?I.value=re.value:Z(vn)},{immediate:!0});var ue=s(function(){var i;return i={},z(i,"".concat(f.value),!0),z(i,"".concat(f.value,"-root"),!0),z(i,"".concat(f.value,"-").concat(M.value),!0),z(i,"".concat(f.value,"-inline-collapsed"),_.value),z(i,"".concat(f.value,"-rtl"),N.value),z(i,"".concat(f.value,"-").concat(e.theme),!0),i}),ie=s(function(){return g()}),x=s(function(){return{horizontal:{name:"".concat(ie.value,"-slide-up")},inline:Gn,other:{name:"".concat(ie.value,"-zoom-big")}}});Kn(!0);var R=function i(){var l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],y=[],T=c.value;return l.forEach(function(K){var G=T[K],D=G.key,q=G.childrenEventKeys;y.push.apply(y,[D].concat(he(i(Ke(q)))))}),y},A=function(l){a("click",l),X(l)},k=function(l,y){var T=O.value[l].childrenEventKeys,K=I.value.filter(function(D){return D!==l});if(y)K.push(l);else if(M.value!=="inline"){var G=R(Ke(T));K=Ye(K.filter(function(D){return!G.includes(D)}))}xe(I,K)||Z(K)},Y=function(l,y){c.value=L(L({},c.value),z({},l,y))},oe=function(l){delete c.value[l],c.value=L({},c.value)},Q=C(0),ve=s(function(){return e.expandIcon||n.expandIcon?function(i){var l=e.expandIcon||n.expandIcon;return l=typeof l=="function"?l(i):l,Re(l,{class:"".concat(f.value,"-submenu-expand-icon")},!1)}:null});return vt({store:c,prefixCls:f,activeKeys:h,openKeys:I,selectedKeys:m,changeActiveKeys:V,disabled:$,rtl:N,mode:M,inlineIndent:s(function(){return e.inlineIndent}),subMenuCloseDelay:s(function(){return e.subMenuCloseDelay}),subMenuOpenDelay:s(function(){return e.subMenuOpenDelay}),builtinPlacements:s(function(){return e.builtinPlacements}),triggerSubMenuAction:s(function(){return e.triggerSubMenuAction}),getPopupContainer:s(function(){return e.getPopupContainer}),inlineCollapsed:_,antdMenuTheme:s(function(){return e.theme}),siderCollapsed:p,defaultMotions:s(function(){return b.value?x.value:null}),motion:s(function(){return b.value?e.motion:null}),overflowDisabled:C(void 0),onOpenChange:k,onItemClick:A,registerMenuInfo:Y,unRegisterMenuInfo:oe,selectedSubMenuKeys:E,isRootMenu:C(!0),expandIcon:ve,forceSubMenuRender:s(function(){return e.forceSubMenuRender})}),function(){var i,l,y=pn((i=n.default)===null||i===void 0?void 0:i.call(n)),T=Q.value>=y.length-1||M.value!=="horizontal"||e.disabledOverflow,K=M.value!=="horizontal"||e.disabledOverflow?y:y.map(function(D,q){return d(Le,{key:D.key,overflowDisabled:q>Q.value},{default:function(){return D}})}),G=((l=n.overflowedIndicator)===null||l===void 0?void 0:l.call(n))||d(it,null,null);return d(_e,P(P({},u),{},{onMousedown:e.onMousedown,prefixCls:"".concat(f.value,"-overflow"),component:"ul",itemComponent:Ve,class:[ue.value,u.class],role:"menu",id:e.id,data:K,renderRawItem:function(q){return q},renderRawRest:function(q){var U=q.length,se=U?y.slice(-U):null;return d(je,null,[d(ke,{eventKey:Ne,key:Ne,title:G,disabled:T,internalPopupClose:U===0},{default:function(){return se}}),d(un,null,{default:function(){return[d(ke,{eventKey:Ne,key:Ne,title:G,disabled:T,internalPopupClose:U===0},{default:function(){return se}})]}})])},maxCount:M.value!=="horizontal"||e.disabledOverflow?_e.INVALIDATE:_e.RESPONSIVE,ssr:"full","data-menu-list":!0,onVisibleChange:function(q){Q.value=q}}),{default:function(){return[d(Bn,{to:"body"},{default:function(){return[d("div",{style:{display:"none"},"aria-hidden":!0},[d(un,null,{default:function(){return[K]}})])]}})]}})}}}),Kt=function(){return{title:j.any}},Qe=ee({name:"AMenuItemGroup",inheritAttrs:!1,props:Kt(),slots:["title"],setup:function(e,r){var n=r.slots,a=r.attrs,u=ye(),v=u.prefixCls,f=s(function(){return"".concat(v.value,"-item-group")}),o=nn();return function(){var g,c;return o?(g=n.default)===null||g===void 0?void 0:g.call(n):d("li",P(P({},a),{},{onClick:function(w){return w.stopPropagation()},class:f.value}),[d("div",{title:typeof e.title=="string"?e.title:void 0,class:"".concat(f.value,"-title")},[ze(n,e,"title")]),d("ul",{class:"".concat(f.value,"-list")},[(c=n.default)===null||c===void 0?void 0:c.call(n)])])}}}),_t=function(){return{prefixCls:String,dashed:Boolean}},Ze=ee({name:"AMenuDivider",props:_t(),setup:function(e){var r=bn("menu",e),n=r.prefixCls,a=s(function(){var u;return u={},z(u,"".concat(n.value,"-item-divider"),!0),z(u,"".concat(n.value,"-item-divider-dashed"),!!e.dashed),u});return function(){return d("li",{class:a.value},null)}}});be.install=function(t){return t.component(be.name,be),t.component(Ve.name,Ve),t.component(ke.name,ke),t.component(Ze.name,Ze),t.component(Qe.name,Qe),t};be.Item=Ve;be.Divider=Ze;be.SubMenu=ke;be.ItemGroup=Qe;var Rt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"},kt=Rt;function cn(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?Object(arguments[e]):{},n=Object.keys(r);typeof Object.getOwnPropertySymbols=="function"&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(a){return Object.getOwnPropertyDescriptor(r,a).enumerable}))),n.forEach(function(a){Et(t,a,r[a])})}return t}function Et(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var tn=function(e,r){var n=cn({},e,r.attrs);return d(dn,cn({},n,{icon:kt}),null)};tn.displayName="PlusOutlined";tn.inheritAttrs=!1;var Vt=tn;export{Lt as D,it as E,be as M,_e as O,Vt as P,zt as a,Ve as b,Tt as i,Dt as u};