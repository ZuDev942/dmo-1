import{d as R,ad as pt,u as K,U as vt,C as mt,B as gt,ai as tt,z as nt,P as ht,b as p,aA as et,ae as Tt,$ as Ct,a as M,c as U,w as St,E as xt,ah as kt,l as bt,_ as at,j as v,i as O,bl as wt,m as At,a3 as Nt}from"./index.118c7d70.js";var H={transitionstart:{transition:"transitionstart",WebkitTransition:"webkitTransitionStart",MozTransition:"mozTransitionStart",OTransition:"oTransitionStart",msTransition:"MSTransitionStart"},animationstart:{animation:"animationstart",WebkitAnimation:"webkitAnimationStart",MozAnimation:"mozAnimationStart",OAnimation:"oAnimationStart",msAnimation:"MSAnimationStart"}},J={transitionend:{transition:"transitionend",WebkitTransition:"webkitTransitionEnd",MozTransition:"mozTransitionEnd",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd"},animationend:{animation:"animationend",WebkitAnimation:"webkitAnimationEnd",MozAnimation:"mozAnimationEnd",OAnimation:"oAnimationEnd",msAnimation:"MSAnimationEnd"}},L=[],_=[];function Lt(){var e=document.createElement("div"),t=e.style;"AnimationEvent"in window||(delete H.animationstart.animation,delete J.animationend.animation),"TransitionEvent"in window||(delete H.transitionstart.transition,delete J.transitionend.transition);function a(i,y){for(var m in i)if(i.hasOwnProperty(m)){var s=i[m];for(var c in s)if(c in t){y.push(s[c]);break}}}a(H,L),a(J,_)}typeof window!="undefined"&&typeof document!="undefined"&&Lt();function it(e,t,a){e.addEventListener(t,a,!1)}function rt(e,t,a){e.removeEventListener(t,a,!1)}var _t={startEvents:L,addStartEventListener:function(t,a){if(L.length===0){setTimeout(a,0);return}L.forEach(function(i){it(t,i,a)})},removeStartEventListener:function(t,a){L.length!==0&&L.forEach(function(i){rt(t,i,a)})},endEvents:_,addEndEventListener:function(t,a){if(_.length===0){setTimeout(a,0);return}_.forEach(function(i){it(t,i,a)})},removeEndEventListener:function(t,a){_.length!==0&&_.forEach(function(i){rt(t,i,a)})}},W=_t,x;function ot(e){return!e||e.offsetParent===null}function Bt(e){var t=(e||"").match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);return t&&t[1]&&t[2]&&t[3]?!(t[1]===t[2]&&t[2]===t[3]):!0}var It=R({name:"Wave",props:{insertExtraNode:Boolean,disabled:Boolean},setup:function(t,a){var i=a.slots,y=a.expose,m=pt(),s=K("",t),c=s.csp,o=s.prefixCls;y({csp:c});var T=null,h=null,k=null,C=!1,b=null,E=!1,S=function(n){if(!E){var r=tt(m);!n||n.target!==r||C||A(r)}},B=function(n){!n||n.animationName!=="fadeEffect"||A(n.target)},w=function(){var n=t.insertExtraNode;return n?"".concat(o.value,"-click-animating"):"".concat(o.value,"-click-animating-without-extra-node")},D=function(n,r){var l,u=t.insertExtraNode,d=t.disabled;if(!(d||!n||ot(n)||n.className.indexOf("-leave")>=0)){b=document.createElement("div"),b.className="".concat(o.value,"-click-animating-node");var N=w();n.removeAttribute(N),n.setAttribute(N,"true"),x=x||document.createElement("style"),r&&r!=="#ffffff"&&r!=="rgb(255, 255, 255)"&&Bt(r)&&!/rgba\(\d*, \d*, \d*, 0\)/.test(r)&&r!=="transparent"&&(!((l=c.value)===null||l===void 0)&&l.nonce&&(x.nonce=c.value.nonce),b.style.borderColor=r,x.innerHTML=`
        [`.concat(o.value,"-click-animating-without-extra-node='true']::after, .").concat(o.value,`-click-animating-node {
          --antd-wave-shadow-color: `).concat(r,`;
        }`),document.body.contains(x)||document.body.appendChild(x)),u&&n.appendChild(b),W.addStartEventListener(n,S),W.addEndEventListener(n,B)}},A=function(n){if(!(!n||n===b||!(n instanceof Element))){var r=t.insertExtraNode,l=w();n.setAttribute(l,"false"),x&&(x.innerHTML=""),r&&b&&n.contains(b)&&n.removeChild(b),W.removeStartEventListener(n,S),W.removeEndEventListener(n,B)}},$=function(n){if(!(!n||!n.getAttribute||n.getAttribute("disabled")||n.className.indexOf("disabled")>=0)){var r=function(u){if(!(u.target.tagName==="INPUT"||ot(u.target))){A(n);var d=getComputedStyle(n).getPropertyValue("border-top-color")||getComputedStyle(n).getPropertyValue("border-color")||getComputedStyle(n).getPropertyValue("background-color");h=setTimeout(function(){return D(n,d)},0),nt.cancel(k),C=!0,k=nt(function(){C=!1},10)}};return n.addEventListener("click",r,!0),{cancel:function(){n.removeEventListener("click",r,!0)}}}};return vt(function(){mt(function(){var f=tt(m);f.nodeType===1&&(T=$(f))})}),gt(function(){T&&T.cancel(),clearTimeout(h),E=!0}),function(){var f;return(f=i.default)===null||f===void 0?void 0:f.call(i)[0]}}});function Rt(e){return e==="danger"?{danger:!0}:{type:e}}var zt=function(){return{prefixCls:String,type:String,htmlType:{type:String,default:"button"},shape:{type:String},size:{type:String},loading:{type:[Boolean,Object],default:function(){return!1}},disabled:{type:Boolean,default:void 0},ghost:{type:Boolean,default:void 0},block:{type:Boolean,default:void 0},danger:{type:Boolean,default:void 0},icon:ht.any,href:String,target:String,title:String,onClick:{type:Function},onMousedown:{type:Function}}},Pt=zt,lt=function(t){t&&(t.style.width="0px",t.style.opacity="0",t.style.transform="scale(0)")},ut=function(t){mt(function(){t&&(t.style.width="".concat(t.scrollWidth,"px"),t.style.opacity="1",t.style.transform="scale(1)")})},st=function(t){t&&t.style&&(t.style.width=null,t.style.opacity=null,t.style.transform=null)},Mt=R({name:"LoadingIcon",props:{prefixCls:String,loading:[Boolean,Object],existIcon:Boolean},setup:function(t){return function(){var a=t.existIcon,i=t.prefixCls,y=t.loading;if(a)return p("span",{class:"".concat(i,"-loading-icon")},[p(et,null,null)]);var m=!!y;return p(Tt,{name:"".concat(i,"-loading-icon-motion"),onBeforeEnter:lt,onEnter:ut,onAfterEnter:st,onBeforeLeave:ut,onLeave:function(c){setTimeout(function(){lt(c)})},onAfterLeave:st},{default:function(){return[m?p("span",{class:"".concat(i,"-loading-icon")},[p(et,null,null)]):null]}})}}}),ct=/^[\u4e00-\u9fa5]{2}$/,ft=ct.test.bind(ct);function j(e){return e==="text"||e==="link"}var G=R({name:"AButton",inheritAttrs:!1,__ANT_BUTTON:!0,props:Ct(Pt(),{type:"default"}),slots:["icon"],setup:function(t,a){var i=a.slots,y=a.attrs,m=a.emit,s=K("btn",t),c=s.prefixCls,o=s.autoInsertSpaceInButton,T=s.direction,h=s.size,k=M(null),C=M(void 0),b=!1,E=M(!1),S=M(!1),B=U(function(){return o.value!==!1}),w=U(function(){return At(t.loading)==="object"&&t.loading.delay?t.loading.delay||!0:!!t.loading});St(w,function(n){clearTimeout(C.value),typeof w.value=="number"?C.value=setTimeout(function(){E.value=n},w.value):E.value=n},{immediate:!0});var D=U(function(){var n,r=t.type,l=t.shape,u=l===void 0?"default":l,d=t.ghost,N=t.block,F=t.danger,g=c.value,I={large:"lg",small:"sm",middle:void 0},z=h.value,P=z&&I[z]||"";return n={},v(n,"".concat(g),!0),v(n,"".concat(g,"-").concat(r),r),v(n,"".concat(g,"-").concat(u),u!=="default"&&u),v(n,"".concat(g,"-").concat(P),P),v(n,"".concat(g,"-loading"),E.value),v(n,"".concat(g,"-background-ghost"),d&&!j(r)),v(n,"".concat(g,"-two-chinese-chars"),S.value&&B.value),v(n,"".concat(g,"-block"),N),v(n,"".concat(g,"-dangerous"),!!F),v(n,"".concat(g,"-rtl"),T.value==="rtl"),n}),A=function(){var r=k.value;if(!(!r||o.value===!1)){var l=r.textContent;b&&ft(l)?S.value||(S.value=!0):S.value&&(S.value=!1)}},$=function(r){if(E.value||t.disabled){r.preventDefault();return}m("click",r)},f=function(r,l){var u=l?" ":"";if(r.type===wt){var d=r.children.trim();return ft(d)&&(d=d.split("").join(u)),p("span",null,[d])}return r};return xt(function(){Nt(!(t.ghost&&j(t.type)),"Button","`link` or `text` button can't be a `ghost` button.")}),vt(A),kt(A),gt(function(){C.value&&clearTimeout(C.value)}),function(){var n,r,l=t.icon,u=l===void 0?(n=i.icon)===null||n===void 0?void 0:n.call(i):l,d=bt((r=i.default)===null||r===void 0?void 0:r.call(i));b=d.length===1&&!u&&!j(t.type);var N=t.type,F=t.htmlType,g=t.disabled,I=t.href,z=t.title,P=t.target,yt=t.onMousedown,Et=E.value?"loading":u,V=at(at({},y),{title:z,disabled:g,class:[D.value,y.class,v({},"".concat(c.value,"-icon-only"),d.length===0&&!!Et)],onClick:$,onMousedown:yt});g||delete V.disabled;var Q=u&&!E.value?u:p(Mt,{existIcon:!!u,prefixCls:c.value,loading:!!E.value},null),X=d.map(function(Z){return f(Z,b&&B.value)});if(I!==void 0)return p("a",O(O({},V),{},{href:I,target:P,ref:k}),[Q,X]);var Y=p("button",O(O({},V),{},{ref:k,type:F}),[Q,X]);return j(N)?Y:p(It,{ref:"wave",disabled:!!E.value},{default:function(){return[Y]}})}}});function dt(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function Ot(e,t,a){return t&&dt(e.prototype,t),a&&dt(e,a),Object.defineProperty(e,"prototype",{writable:!1}),e}function Wt(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var jt=Ot(function e(t){Wt(this,e),this.error=new Error("unreachable case: ".concat(JSON.stringify(t)))}),Ut=function(){return{prefixCls:String,size:{type:String}}},q=R({name:"AButtonGroup",props:Ut(),setup:function(t,a){var i=a.slots,y=K("btn-group",t),m=y.prefixCls,s=y.direction,c=U(function(){var o,T=t.size,h="";switch(T){case"large":h="lg";break;case"small":h="sm";break;case"middle":case void 0:break;default:console.warn(new jt(T).error)}return o={},v(o,"".concat(m.value),!0),v(o,"".concat(m.value,"-").concat(h),h),v(o,"".concat(m.value,"-rtl"),s.value==="rtl"),o});return function(){var o;return p("div",{class:c.value},[bt((o=i.default)===null||o===void 0?void 0:o.call(i))])}}});G.Group=q;G.install=function(e){return e.component(G.name,G),e.component(q.name,q),e};export{G as B,Ot as _,Wt as a,Pt as b,Rt as c};
