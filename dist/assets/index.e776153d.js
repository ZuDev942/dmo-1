import{d as X,P as N,r as x,m as U,k as r,c as d,f as V,b as Me,e as _,b7 as en,t as Ie,H as xe,A as Mn,a8 as Pe,a6 as pe,h as T,ao as Ne,b8 as Te,b9 as nn,ba as In,bb as Kn,bc as Pn,bd as Sn,ac as re,j as Oe,a3 as _e,o as Ae,at as tn,be as Ee,bf as Ce,T as wn,ab as an,K as xn,a5 as ln,g as je,bg as On,bh as _n,ag as An,aJ as En,bi as qe,n as un,p as Rn,a0 as De,bj as kn,E as Se,aI as Fn}from"./index.d1d64f66.js";import{s as he}from"./shallowequal.9ed06899.js";var fe={adjustX:1,adjustY:1},de=[0,0],Nn={topLeft:{points:["bl","tl"],overflow:fe,offset:[0,-4],targetOffset:de},topCenter:{points:["bc","tc"],overflow:fe,offset:[0,-4],targetOffset:de},topRight:{points:["br","tr"],overflow:fe,offset:[0,-4],targetOffset:de},bottomLeft:{points:["tl","bl"],overflow:fe,offset:[0,4],targetOffset:de},bottomCenter:{points:["tc","bc"],overflow:fe,offset:[0,4],targetOffset:de},bottomRight:{points:["tr","br"],overflow:fe,offset:[0,4],targetOffset:de}},Tn=Nn,jn=globalThis&&globalThis.__rest||function(l,e){var i={};for(var n in l)Object.prototype.hasOwnProperty.call(l,n)&&e.indexOf(n)<0&&(i[n]=l[n]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var u=0,n=Object.getOwnPropertySymbols(l);u<n.length;u++)e.indexOf(n[u])<0&&Object.prototype.propertyIsEnumerable.call(l,n[u])&&(i[n[u]]=l[n[u]]);return i},dt=X({props:{minOverlayWidthMatchTrigger:{type:Boolean,default:void 0},arrow:{type:Boolean,default:!1},prefixCls:N.string.def("rc-dropdown"),transitionName:String,overlayClassName:N.string.def(""),openClassName:String,animation:N.any,align:N.object,overlayStyle:{type:Object,default:void 0},placement:N.string.def("bottomLeft"),overlay:N.any,trigger:N.oneOfType([N.string,N.arrayOf(N.string)]).def("hover"),alignPoint:{type:Boolean,default:void 0},showAction:N.array,hideAction:N.array,getPopupContainer:Function,visible:{type:Boolean,default:void 0},defaultVisible:{type:Boolean,default:!1},mouseEnterDelay:N.number.def(.15),mouseLeaveDelay:N.number.def(.1)},emits:["visibleChange","overlayClick"],slots:["overlay"],setup:function(e,i){var n=i.slots,u=i.emit,v=i.expose,o=x(!!e.visible);U(function(){return e.visible},function(g){g!==void 0&&(o.value=g)});var c=x();v({triggerRef:c});var p=function(f){e.visible===void 0&&(o.value=!1),u("overlayClick",f)},h=function(f){e.visible===void 0&&(o.value=f),u("visibleChange",f)},m=function(){var f,K=(f=n.overlay)===null||f===void 0?void 0:f.call(n),R={prefixCls:"".concat(e.prefixCls,"-menu"),onClick:p,getPopupContainer:function(){return c.value.getPopupDomNode()}};return d(xe,null,[e.arrow&&d("div",{class:"".concat(e.prefixCls,"-arrow")},null),Ie(K,R,!1)])},y=r(function(){var g=e.minOverlayWidthMatchTrigger,f=g===void 0?!e.alignPoint:g;return f}),I=function(){var f,K=(f=n.default)===null||f===void 0?void 0:f.call(n);return o.value&&K?Ie(K[0],{class:e.openClassName||"".concat(e.prefixCls,"-open")},!1):K},b=r(function(){return!e.hideAction&&e.trigger.indexOf("contextmenu")!==-1?["click"]:e.hideAction});return function(){var g=e.prefixCls,f=e.arrow,K=e.showAction,R=e.overlayStyle,q=e.trigger,O=e.placement,P=e.align,j=e.getPopupContainer,H=e.transitionName,k=e.animation,M=e.overlayClassName,S=jn(e,["prefixCls","arrow","showAction","overlayStyle","trigger","placement","align","getPopupContainer","transitionName","animation","overlayClassName"]);return d(en,V(V({},S),{},{prefixCls:g,ref:c,popupClassName:Me(M,_({},"".concat(g,"-show-arrow"),f)),popupStyle:R,builtinPlacements:Tn,action:q,showAction:K,hideAction:b.value||[],popupPlacement:O,popupAlign:P,popupTransitionName:H,popupAnimation:k,popupVisible:o.value,stretch:y.value?"minWidth":"",onPopupVisibleChange:h,getPopupContainer:j}),{popup:m,default:I})}}}),Dn={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"ellipsis",theme:"outlined"},Ln=Dn;function He(l){for(var e=1;e<arguments.length;e++){var i=arguments[e]!=null?Object(arguments[e]):{},n=Object.keys(i);typeof Object.getOwnPropertySymbols=="function"&&(n=n.concat(Object.getOwnPropertySymbols(i).filter(function(u){return Object.getOwnPropertyDescriptor(i,u).enumerable}))),n.forEach(function(u){Vn(l,u,i[u])})}return l}function Vn(l,e,i){return e in l?Object.defineProperty(l,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):l[e]=i,l}var $e=function(e,i){var n=He({},e,i.attrs);return d(Mn,He({},n,{icon:Ln}),null)};$e.displayName="EllipsisOutlined";$e.inheritAttrs=!1;var Bn=$e,rn=Symbol("menuContextKey"),on=function(e){Pe(rn,e)},ne=function(){return pe(rn)},sn=Symbol("ForceRenderKey"),$n=function(e){Pe(sn,e)},vn=function(){return pe(sn,!1)},cn=Symbol("menuFirstLevelContextKey"),fn=function(e){Pe(cn,e)},zn=function(){return pe(cn,!0)},Re=X({name:"MenuContextProvider",inheritAttrs:!1,props:{mode:{type:String,default:void 0},overflowDisabled:{type:Boolean,default:void 0},isRootMenu:{type:Boolean,default:void 0}},setup:function(e,i){var n=i.slots,u=ne(),v=T({},u);return e.mode!==void 0&&(v.mode=Ne(e,"mode")),e.isRootMenu!==void 0&&(v.isRootMenu=Ne(e,"isRootMenu")),e.overflowDisabled!==void 0&&(v.overflowDisabled=Ne(e,"overflowDisabled")),on(v),function(){var o;return(o=n.default)===null||o===void 0?void 0:o.call(n)}}}),Wn=on;function Gn(){}var Yn=1/0,Un=Te&&1/nn(new Te([,-0]))[1]==Yn?function(l){return new Te(l)}:Gn,qn=Un,Hn=200;function Xn(l,e,i){var n=-1,u=Kn,v=l.length,o=!0,c=[],p=c;if(i)o=!1,u=Pn;else if(v>=Hn){var h=e?null:qn(l);if(h)return nn(h);o=!1,u=Sn,p=new In}else p=e?[]:c;e:for(;++n<v;){var m=l[n],y=e?e(m):m;if(m=i||m!==0?m:0,o&&y===y){for(var I=p.length;I--;)if(p[I]===y)continue e;e&&p.push(y),c.push(m)}else u(p,y,i)||(p!==c&&p.push(y),c.push(m))}return c}function Le(l){return l&&l.length?Xn(l):[]}var Jn=Symbol("siderCollapsed"),we="$$__vc-menu-more__key",dn=Symbol("KeyPathContext"),ze=function(){return pe(dn,{parentEventKeys:r(function(){return[]}),parentKeys:r(function(){return[]}),parentInfo:{}})},Zn=function(e,i,n){var u=ze(),v=u.parentEventKeys,o=u.parentKeys,c=r(function(){return[].concat(re(v.value),[e])}),p=r(function(){return[].concat(re(o.value),[i])});return Pe(dn,{parentEventKeys:c,parentKeys:p,parentInfo:n}),p},pn=Symbol("measure"),Xe=X({setup:function(e,i){var n=i.slots;return Pe(pn,!0),function(){var u;return(u=n.default)===null||u===void 0?void 0:u.call(n)}}}),We=function(){return pe(pn,!1)},Qn=Zn;function mn(l){var e=ne(),i=e.mode,n=e.rtl,u=e.inlineIndent;return r(function(){return i.value!=="inline"?null:n.value?{paddingRight:"".concat(l.value*u.value,"px")}:{paddingLeft:"".concat(l.value*u.value,"px")}})}var et=0,nt=function(){return{id:String,role:String,disabled:Boolean,danger:Boolean,title:{type:[String,Boolean],default:void 0},icon:N.any,onMouseenter:Function,onMouseleave:Function,onClick:Function,onKeydown:Function,onFocus:Function}},ke=X({name:"AMenuItem",inheritAttrs:!1,props:nt(),slots:["icon","title"],setup:function(e,i){var n=i.slots,u=i.emit,v=i.attrs,o=an(),c=We(),p=Oe(o.vnode.key)==="symbol"?String(o.vnode.key):o.vnode.key;_e(Oe(o.vnode.key)!=="symbol","MenuItem",'MenuItem `:key="'.concat(String(p),'"` not support Symbol type'));var h="menu_item_".concat(++et,"_$$_").concat(p),m=ze(),y=m.parentEventKeys,I=m.parentKeys,b=ne(),g=b.prefixCls,f=b.activeKeys,K=b.disabled,R=b.changeActiveKeys,q=b.rtl,O=b.inlineCollapsed,P=b.siderCollapsed,j=b.onItemClick,H=b.selectedKeys,k=b.registerMenuInfo,M=b.unRegisterMenuInfo,S=zn(),B=x(!1),z=r(function(){return[].concat(re(I.value),[p])}),J={eventKey:h,key:p,parentEventKeys:y,parentKeys:I,isLeaf:!0};k(h,J),Ae(function(){M(h)}),U(f,function(){B.value=!!f.value.find(function(a){return a===p})},{immediate:!0});var Y=r(function(){return K.value||e.disabled}),te=r(function(){return H.value.includes(p)}),oe=r(function(){var a,t="".concat(g.value,"-item");return a={},_(a,"".concat(t),!0),_(a,"".concat(t,"-danger"),e.danger),_(a,"".concat(t,"-active"),B.value),_(a,"".concat(t,"-selected"),te.value),_(a,"".concat(t,"-disabled"),Y.value),a}),se=function(t){return{key:p,eventKey:h,keyPath:z.value,eventKeyPath:[].concat(re(y.value),[h]),domEvent:t,item:T(T({},e),v)}},me=function(t){if(!Y.value){var s=se(t);u("click",t),j(s)}},ye=function(t){Y.value||(R(z.value),u("mouseenter",t))},Z=function(t){Y.value||(R([]),u("mouseleave",t))},ve=function(t){if(u("keydown",t),t.which===xn.ENTER){var s=se(t);u("click",t),j(s)}},ce=function(t){R(z.value),u("focus",t)},$=function(t,s){var A=d("span",{class:"".concat(g.value,"-title-content")},[s]);return(!t||ln(s)&&s.type==="span")&&s&&O.value&&S&&typeof s=="string"?d("div",{class:"".concat(g.value,"-inline-collapsed-noicon")},[s.charAt(0)]):A},ge=mn(r(function(){return z.value.length}));return function(){var a,t,s,A;if(c)return null;var C=(t=e.title)!==null&&t!==void 0?t:(s=n.title)===null||s===void 0?void 0:s.call(n),D=tn((A=n.default)===null||A===void 0?void 0:A.call(n)),E=D.length,L=C;typeof C=="undefined"?L=S&&E?D:"":C===!1&&(L="");var W={title:L};!P.value&&!O.value&&(W.title=null,W.visible=!1);var ae={};e.role==="option"&&(ae["aria-selected"]=te.value);var le=Ee(n,e,"icon");return d(wn,V(V({},W),{},{placement:q.value?"left":"right",overlayClassName:"".concat(g.value,"-inline-collapsed-tooltip")}),{default:function(){return[d(Ce.Item,V(V(V({component:"li"},v),{},{id:e.id,style:T(T({},v.style||{}),ge.value),class:[oe.value,(a={},_(a,"".concat(v.class),!!v.class),_(a,"".concat(g.value,"-item-only-child"),(le?E+1:E)===1),a)],role:e.role||"menuitem",tabindex:e.disabled?null:-1,"data-menu-id":p,"aria-disabled":e.disabled},ae),{},{onMouseenter:ye,onMouseleave:Z,onClick:me,onKeydown:ve,onFocus:ce,title:typeof C=="string"?C:void 0}),{default:function(){return[Ie(le,{class:"".concat(g.value,"-item-icon")},!1),$(le,D)]}})]}})}}}),ee={adjustX:1,adjustY:1},tt={topLeft:{points:["bl","tl"],overflow:ee,offset:[0,-7]},bottomLeft:{points:["tl","bl"],overflow:ee,offset:[0,7]},leftTop:{points:["tr","tl"],overflow:ee,offset:[-4,0]},rightTop:{points:["tl","tr"],overflow:ee,offset:[4,0]}},at={topLeft:{points:["bl","tl"],overflow:ee,offset:[0,-7]},bottomLeft:{points:["tl","bl"],overflow:ee,offset:[0,7]},rightTop:{points:["tr","tl"],overflow:ee,offset:[-4,0]},leftTop:{points:["tl","tr"],overflow:ee,offset:[4,0]}},lt={horizontal:"bottomLeft",vertical:"rightTop","vertical-left":"rightTop","vertical-right":"leftTop"},Je=X({name:"PopupTrigger",inheritAttrs:!1,props:{prefixCls:String,mode:String,visible:Boolean,popupClassName:String,popupOffset:Array,disabled:Boolean,onVisibleChange:Function},slots:["popup"],emits:["visibleChange"],setup:function(e,i){var n=i.slots,u=i.emit,v=x(!1),o=ne(),c=o.getPopupContainer,p=o.rtl,h=o.subMenuOpenDelay,m=o.subMenuCloseDelay,y=o.builtinPlacements,I=o.triggerSubMenuAction,b=o.isRootMenu,g=o.forceSubMenuRender,f=o.motion,K=o.defaultMotions,R=vn(),q=r(function(){return p.value?T(T({},at),y.value):T(T({},tt),y.value)}),O=r(function(){return lt[e.mode]}),P=x();U(function(){return e.visible},function(k){je.cancel(P.value),P.value=je(function(){v.value=k})},{immediate:!0}),Ae(function(){je.cancel(P.value)});var j=function(M){u("visibleChange",M)},H=r(function(){var k,M,S=f.value||((k=K.value)===null||k===void 0?void 0:k[e.mode])||((M=K.value)===null||M===void 0?void 0:M.other),B=typeof S=="function"?S():S;return B?On(B.name,{css:!0}):void 0});return function(){var k=e.prefixCls,M=e.popupClassName,S=e.mode,B=e.popupOffset,z=e.disabled;return d(en,{prefixCls:k,popupClassName:Me("".concat(k,"-popup"),_({},"".concat(k,"-rtl"),p.value),M),stretch:S==="horizontal"?"minWidth":null,getPopupContainer:b.value?c.value:function(J){return J.parentNode},builtinPlacements:q.value,popupPlacement:O.value,popupVisible:v.value,popupAlign:B&&{offset:B},action:z?[]:[I.value],mouseEnterDelay:h.value,mouseLeaveDelay:m.value,onPopupVisibleChange:j,forceRender:R||g.value,popupAnimation:H.value},{popup:n.popup,default:n.default})}}}),yn=function(e,i){var n=i.slots,u=i.attrs,v,o=ne(),c=o.prefixCls,p=o.mode;return d("ul",V(V({},u),{},{class:Me(c.value,"".concat(c.value,"-sub"),"".concat(c.value,"-").concat(p.value==="inline"?"inline":"vertical")),"data-menu-list":!0}),[(v=n.default)===null||v===void 0?void 0:v.call(n)])};yn.displayName="SubMenuList";var gn=yn,ut=X({name:"InlineSubMenuList",inheritAttrs:!1,props:{id:String,open:Boolean,keyPath:Array},setup:function(e,i){var n=i.slots,u=r(function(){return"inline"}),v=ne(),o=v.motion,c=v.mode,p=v.defaultMotions,h=r(function(){return c.value===u.value}),m=x(!h.value),y=r(function(){return h.value?e.open:!1});U(c,function(){h.value&&(m.value=!1)},{flush:"post"});var I=r(function(){var b,g,f=o.value||((b=p.value)===null||b===void 0?void 0:b[u.value])||((g=p.value)===null||g===void 0?void 0:g.other),K=typeof f=="function"?f():f;return T(T({},K),{appear:e.keyPath.length<=1})});return function(){var b;return m.value?null:d(Re,{mode:u.value},{default:function(){return[d(_n,I.value,{default:function(){return[An(d(gn,{id:e.id},{default:function(){return[(b=n.default)===null||b===void 0?void 0:b.call(n)]}}),[[En,y.value]])]}})]}})}}}),Ze=0,it=function(){return{icon:N.any,title:N.any,disabled:Boolean,level:Number,popupClassName:String,popupOffset:Array,internalPopupClose:Boolean,eventKey:String,expandIcon:Function,onMouseenter:Function,onMouseleave:Function,onTitleClick:Function}},Ke=X({name:"ASubMenu",inheritAttrs:!1,props:it(),slots:["icon","title","expandIcon"],setup:function(e,i){var n=i.slots,u=i.attrs,v=i.emit,o,c;fn(!1);var p=We(),h=an(),m=Oe(h.vnode.key)==="symbol"?String(h.vnode.key):h.vnode.key;_e(Oe(h.vnode.key)!=="symbol","SubMenu",'SubMenu `:key="'.concat(String(m),'"` not support Symbol type'));var y=qe(m)?m:"sub_menu_".concat(++Ze,"_$$_not_set_key"),I=(o=e.eventKey)!==null&&o!==void 0?o:qe(m)?"sub_menu_".concat(++Ze,"_$$_").concat(m):y,b=ze(),g=b.parentEventKeys,f=b.parentInfo,K=b.parentKeys,R=r(function(){return[].concat(re(K.value),[y])}),q=x([]),O={eventKey:I,key:y,parentEventKeys:g,childrenEventKeys:q,parentKeys:K};(c=f.childrenEventKeys)===null||c===void 0||c.value.push(I),Ae(function(){var F;f.childrenEventKeys&&(f.childrenEventKeys.value=(F=f.childrenEventKeys)===null||F===void 0?void 0:F.value.filter(function(w){return w!=I}))}),Qn(I,y,O);var P=ne(),j=P.prefixCls,H=P.activeKeys,k=P.disabled,M=P.changeActiveKeys,S=P.mode,B=P.inlineCollapsed,z=P.antdMenuTheme,J=P.openKeys,Y=P.overflowDisabled,te=P.onOpenChange,oe=P.registerMenuInfo,se=P.unRegisterMenuInfo,me=P.selectedSubMenuKeys,ye=P.expandIcon,Z=m!=null,ve=!p&&(vn()||!Z);$n(ve),(p&&Z||!p&&!Z||ve)&&(oe(I,O),Ae(function(){se(I)}));var ce=r(function(){return"".concat(j.value,"-submenu")}),$=r(function(){return k.value||e.disabled}),ge=x(),a=x(),t=r(function(){return J.value.includes(y)}),s=r(function(){return!Y.value&&t.value}),A=r(function(){return me.value.includes(y)}),C=x(!1);U(H,function(){C.value=!!H.value.find(function(F){return F===y})},{immediate:!0});var D=function(w){$.value||(v("titleClick",w,y),S.value==="inline"&&te(y,!t.value))},E=function(w){$.value||(M(R.value),v("mouseenter",w))},L=function(w){$.value||(M([]),v("mouseleave",w))},W=mn(r(function(){return R.value.length})),ae=function(w){S.value!=="inline"&&te(y,w)},le=function(){M(R.value)},be=I&&"".concat(I,"-popup"),Ge=r(function(){return Me(j.value,"".concat(j.value,"-").concat(z.value),e.popupClassName)}),bn=function(w,G){if(!G)return B.value&&!K.value.length&&w&&typeof w=="string"?d("div",{class:"".concat(j.value,"-inline-collapsed-noicon")},[w.charAt(0)]):d("span",{class:"".concat(j.value,"-title-content")},[w]);var Q=ln(w)&&w.type==="span";return d(xe,null,[Ie(G,{class:"".concat(j.value,"-item-icon")},!1),Q?w:d("span",{class:"".concat(j.value,"-title-content")},[w])])},Fe=r(function(){return S.value!=="inline"&&R.value.length>1?"vertical":S.value}),hn=r(function(){return S.value==="horizontal"?"vertical":S.value}),Cn=r(function(){return Fe.value==="horizontal"?"vertical":Fe.value}),Ye=function(){var w=ce.value,G=Ee(n,e,"icon"),Q=e.expandIcon||n.expandIcon||ye.value,ue=bn(Ee(n,e,"title"),G);return d("div",{style:W.value,class:"".concat(w,"-title"),tabindex:$.value?null:-1,ref:ge,title:typeof ue=="string"?ue:null,"data-menu-id":y,"aria-expanded":s.value,"aria-haspopup":!0,"aria-controls":be,"aria-disabled":$.value,onClick:D,onFocus:le},[ue,S.value!=="horizontal"&&Q?Q(T(T({},e),{isOpen:s.value})):d("i",{class:"".concat(w,"-arrow")},null)])};return function(){var F,w;if(p)return Z?(w=n.default)===null||w===void 0?void 0:w.call(n):null;var G=ce.value,Q=function(){return null};return!Y.value&&S.value!=="inline"?Q=function(){return d(Je,{mode:Fe.value,prefixCls:G,visible:!e.internalPopupClose&&s.value,popupClassName:Ge.value,popupOffset:e.popupOffset,disabled:$.value,onVisibleChange:ae},{default:function(){return[Ye()]},popup:function(){return d(Re,{mode:Cn.value,isRootMenu:!1},{default:function(){return[d(gn,{id:be,ref:a},{default:n.default})]}})}})}:Q=function(){return d(Je,null,{default:Ye})},d(Re,{mode:hn.value},{default:function(){return[d(Ce.Item,V(V({component:"li"},u),{},{role:"none",class:Me(G,"".concat(G,"-").concat(S.value),u.class,(F={},_(F,"".concat(G,"-open"),s.value),_(F,"".concat(G,"-active"),C.value),_(F,"".concat(G,"-selected"),A.value),_(F,"".concat(G,"-disabled"),$.value),F)),onMouseenter:E,onMouseleave:L,"data-submenu-id":y}),{default:function(){return d(xe,null,[Q(),!Y.value&&d(ut,{id:be,open:s.value,keyPath:R.value},{default:n.default})])}})]}})}}}),rt=function(){return{id:String,prefixCls:String,disabled:Boolean,inlineCollapsed:Boolean,disabledOverflow:Boolean,forceSubMenuRender:Boolean,openKeys:Array,selectedKeys:Array,activeKey:String,selectable:{type:Boolean,default:!0},multiple:{type:Boolean,default:!1},motion:Object,theme:{type:String,default:"light"},mode:{type:String,default:"vertical"},inlineIndent:{type:Number,default:24},subMenuOpenDelay:{type:Number,default:.1},subMenuCloseDelay:{type:Number,default:.1},builtinPlacements:{type:Object},triggerSubMenuAction:{type:String,default:"hover"},getPopupContainer:Function,expandIcon:Function,onOpenChange:Function,onSelect:Function,onDeselect:Function,onClick:[Function,Array],onFocus:Function,onBlur:Function,onMousedown:Function,"onUpdate:openKeys":Function,"onUpdate:selectedKeys":Function,"onUpdate:activeKey":Function}},Qe=[],ie=X({name:"AMenu",inheritAttrs:!1,props:rt(),slots:["expandIcon","overflowedIndicator"],setup:function(e,i){var n=i.slots,u=i.emit,v=i.attrs,o=un("menu",e),c=o.prefixCls,p=o.direction,h=o.getPrefixCls,m=x({}),y=pe(Jn,x(void 0)),I=r(function(){return y.value!==void 0?y.value:e.inlineCollapsed}),b=x(!1);Rn(function(){b.value=!0}),De(function(){_e(!(e.inlineCollapsed===!0&&e.mode!=="inline"),"Menu","`inlineCollapsed` should only be used when `mode` is inline."),_e(!(y.value!==void 0&&e.inlineCollapsed===!0),"Menu","`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.")});var g=x([]),f=x([]),K=x({});U(m,function(){for(var a={},t=0,s=Object.values(m.value);t<s.length;t++){var A=s[t];a[A.key]=A}K.value=a},{flush:"post"}),De(function(){if(e.activeKey!==void 0){var a=[],t=e.activeKey?K.value[e.activeKey]:void 0;t&&e.activeKey!==void 0?a=Le([].concat(Se(t.parentKeys),e.activeKey)):a=[],he(g.value,a)||(g.value=a)}}),U(function(){return e.selectedKeys},function(a){a&&(f.value=a.slice())},{immediate:!0,deep:!0});var R=x([]);U([K,f],function(){var a=[];f.value.forEach(function(t){var s=K.value[t];s&&(a=a.concat(Se(s.parentKeys)))}),a=Le(a),he(R.value,a)||(R.value=a)},{immediate:!0});var q=function(t){if(!!e.selectable){var s=t.key,A=f.value.includes(s),C;e.multiple?A?C=f.value.filter(function(E){return E!==s}):C=[].concat(re(f.value),[s]):C=[s];var D=T(T({},t),{selectedKeys:C});he(C,f.value)||(e.selectedKeys===void 0&&(f.value=C),u("update:selectedKeys",C),A&&e.multiple?u("deselect",D):u("select",D)),M.value!=="inline"&&!e.multiple&&O.value.length&&z(Qe)}},O=x([]);U(function(){return e.openKeys},function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:O.value;he(O.value,a)||(O.value=a.slice())},{immediate:!0,deep:!0});var P,j=function(t){clearTimeout(P),P=setTimeout(function(){e.activeKey===void 0&&(g.value=t),u("update:activeKey",t[t.length-1])})},H=r(function(){return!!e.disabled}),k=r(function(){return p.value==="rtl"}),M=x("vertical"),S=x(!1);De(function(){(e.mode==="inline"||e.mode==="vertical")&&I.value?(M.value="vertical",S.value=I.value):(M.value=e.mode,S.value=!1)});var B=r(function(){return M.value==="inline"}),z=function(t){O.value=t,u("update:openKeys",t),u("openChange",t)},J=x(O.value),Y=x(!1);U(O,function(){B.value&&(J.value=O.value)},{immediate:!0}),U(B,function(){if(!Y.value){Y.value=!0;return}B.value?O.value=J.value:z(Qe)},{immediate:!0});var te=r(function(){var a;return a={},_(a,"".concat(c.value),!0),_(a,"".concat(c.value,"-root"),!0),_(a,"".concat(c.value,"-").concat(M.value),!0),_(a,"".concat(c.value,"-inline-collapsed"),S.value),_(a,"".concat(c.value,"-rtl"),k.value),_(a,"".concat(c.value,"-").concat(e.theme),!0),a}),oe=r(function(){return h()}),se=r(function(){return{horizontal:{name:"".concat(oe.value,"-slide-up")},inline:Fn,other:{name:"".concat(oe.value,"-zoom-big")}}});fn(!0);var me=function a(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],s=[],A=m.value;return t.forEach(function(C){var D=A[C],E=D.key,L=D.childrenEventKeys;s.push.apply(s,[E].concat(re(a(Se(L)))))}),s},ye=function(t){u("click",t),q(t)},Z=function(t,s){var A=K.value[t].childrenEventKeys,C=O.value.filter(function(E){return E!==t});if(s)C.push(t);else if(M.value!=="inline"){var D=me(Se(A));C=Le(C.filter(function(E){return!D.includes(E)}))}he(O,C)||z(C)},ve=function(t,s){m.value=T(T({},m.value),_({},t,s))},ce=function(t){delete m.value[t],m.value=T({},m.value)},$=x(0),ge=r(function(){return e.expandIcon||n.expandIcon?function(a){var t=e.expandIcon||n.expandIcon;return t=typeof t=="function"?t(a):t,Ie(t,{class:"".concat(c.value,"-submenu-expand-icon")},!1)}:null});return Wn({store:m,prefixCls:c,activeKeys:g,openKeys:O,selectedKeys:f,changeActiveKeys:j,disabled:H,rtl:k,mode:M,inlineIndent:r(function(){return e.inlineIndent}),subMenuCloseDelay:r(function(){return e.subMenuCloseDelay}),subMenuOpenDelay:r(function(){return e.subMenuOpenDelay}),builtinPlacements:r(function(){return e.builtinPlacements}),triggerSubMenuAction:r(function(){return e.triggerSubMenuAction}),getPopupContainer:r(function(){return e.getPopupContainer}),inlineCollapsed:S,antdMenuTheme:r(function(){return e.theme}),siderCollapsed:y,defaultMotions:r(function(){return b.value?se.value:null}),motion:r(function(){return b.value?e.motion:null}),overflowDisabled:x(void 0),onOpenChange:Z,onItemClick:ye,registerMenuInfo:ve,unRegisterMenuInfo:ce,selectedSubMenuKeys:R,isRootMenu:x(!0),expandIcon:ge,forceSubMenuRender:r(function(){return e.forceSubMenuRender})}),function(){var a,t,s=tn((a=n.default)===null||a===void 0?void 0:a.call(n)),A=$.value>=s.length-1||M.value!=="horizontal"||e.disabledOverflow,C=M.value!=="horizontal"||e.disabledOverflow?s:s.map(function(E,L){return d(Re,{key:E.key,overflowDisabled:L>$.value},{default:function(){return E}})}),D=((t=n.overflowedIndicator)===null||t===void 0?void 0:t.call(n))||d(Bn,null,null);return d(Ce,V(V({},v),{},{onMousedown:e.onMousedown,prefixCls:"".concat(c.value,"-overflow"),component:"ul",itemComponent:ke,class:[te.value,v.class],role:"menu",id:e.id,data:C,renderRawItem:function(L){return L},renderRawRest:function(L){var W=L.length,ae=W?s.slice(-W):null;return d(xe,null,[d(Ke,{eventKey:we,key:we,title:D,disabled:A,internalPopupClose:W===0},{default:function(){return ae}}),d(Xe,null,{default:function(){return[d(Ke,{eventKey:we,key:we,title:D,disabled:A,internalPopupClose:W===0},{default:function(){return ae}})]}})])},maxCount:M.value!=="horizontal"||e.disabledOverflow?Ce.INVALIDATE:Ce.RESPONSIVE,ssr:"full","data-menu-list":!0,onVisibleChange:function(L){$.value=L}}),{default:function(){return[d(kn,{to:"body"},{default:function(){return[d("div",{style:{display:"none"},"aria-hidden":!0},[d(Xe,null,{default:function(){return[C]}})])]}})]}})}}}),ot=function(){return{title:N.any}},Ve=X({name:"AMenuItemGroup",inheritAttrs:!1,props:ot(),slots:["title"],setup:function(e,i){var n=i.slots,u=i.attrs,v=ne(),o=v.prefixCls,c=r(function(){return"".concat(o.value,"-item-group")}),p=We();return function(){var h,m;return p?(h=n.default)===null||h===void 0?void 0:h.call(n):d("li",V(V({},u),{},{onClick:function(I){return I.stopPropagation()},class:c.value}),[d("div",{title:typeof e.title=="string"?e.title:void 0,class:"".concat(c.value,"-title")},[Ee(n,e,"title")]),d("ul",{class:"".concat(c.value,"-list")},[(m=n.default)===null||m===void 0?void 0:m.call(n)])])}}}),st=function(){return{prefixCls:String,dashed:Boolean}},Be=X({name:"AMenuDivider",props:st(),setup:function(e){var i=un("menu",e),n=i.prefixCls,u=r(function(){var v;return v={},_(v,"".concat(n.value,"-item-divider"),!0),_(v,"".concat(n.value,"-item-divider-dashed"),!!e.dashed),v});return function(){return d("li",{class:u.value},null)}}});ie.install=function(l){return l.component(ie.name,ie),l.component(ke.name,ke),l.component(Ke.name,Ke),l.component(Be.name,Be),l.component(Ve.name,Ve),l};ie.Item=ke;ie.Divider=Be;ie.SubMenu=Ke;ie.ItemGroup=Ve;export{dt as D,Bn as E,ie as M,ke as a};
