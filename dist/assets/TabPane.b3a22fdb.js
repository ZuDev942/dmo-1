import{r as I,g as Ae,o as Je,d as ve,k as Z,c as f,K as ne,b as ge,e as D,a0 as We,h as q,aB as V,l as B,p as De,m as he,P as Fe,a8 as Kt,a6 as Ot,W as Wt,aU as ct,aV as Tt,aW as Dt,aX as Ft,aY as Ht,aZ as zt,a_ as jt,a$ as Gt,ax as st,f as ue,ac as dt,aD as Be,t as Vt,a2 as pt,at as Ut,a5 as $t,ad as Yt,s as Xt,a3 as qe,n as Zt,i as qt,aF as ft,b0 as Jt,j as Qt}from"./index.d1d64f66.js";import{E as ea,M as ta,a as aa,D as na}from"./index.e776153d.js";import{u as ia}from"./useRefs.8e84d16e.js";import{P as ra}from"./PlusOutlined.135d583c.js";function la(v){var e=I(),t=I(!1);function r(){for(var a=arguments.length,n=new Array(a),i=0;i<a;i++)n[i]=arguments[i];t.value||(Ae.cancel(e.value),e.value=Ae(function(){v.apply(void 0,n)}))}return Je(function(){t.value=!0,Ae.cancel(e.value)}),r}function oa(v){var e=I([]),t=I(typeof v=="function"?v():v),r=la(function(){var n=t.value;e.value.forEach(function(i){n=i(n)}),e.value=[],t.value=n});function a(n){e.value.push(n),r()}return[t,a]}var ua=ve({name:"TabNode",props:{id:{type:String},prefixCls:{type:String},tab:{type:Object},active:{type:Boolean},closable:{type:Boolean},editable:{type:Object},onClick:{type:Function},onResize:{type:Function},renderWrapper:{type:Function},removeAriaLabel:{type:String},onFocus:{type:Function}},emits:["click","resize","remove","focus"],setup:function(e,t){var r=t.expose,a=t.attrs,n=I();function i(c){var s;!((s=e.tab)===null||s===void 0)&&s.disabled||e.onClick(c)}r({domRef:n});function l(c){var s;c.preventDefault(),c.stopPropagation(),e.editable.onEdit("remove",{key:(s=e.tab)===null||s===void 0?void 0:s.key,event:c})}var o=Z(function(){var c;return e.editable&&e.closable!==!1&&!(!((c=e.tab)===null||c===void 0)&&c.disabled)});return function(){var c,s,b=e.prefixCls,g=e.id,L=e.active,P=e.tab,F=P.key,k=P.tab,z=P.disabled,T=P.closeIcon,d=e.renderWrapper,A=e.removeAriaLabel,j=e.editable,M=e.onFocus,_="".concat(b,"-tab"),K=f("div",{key:F,ref:n,class:ge(_,(c={},D(c,"".concat(_,"-with-remove"),o.value),D(c,"".concat(_,"-active"),L),D(c,"".concat(_,"-disabled"),z),c)),style:a.style,onClick:i},[f("div",{role:"tab","aria-selected":L,id:g&&"".concat(g,"-tab-").concat(F),class:"".concat(_,"-btn"),"aria-controls":g&&"".concat(g,"-panel-").concat(F),"aria-disabled":z,tabindex:z?null:0,onClick:function(O){O.stopPropagation(),i(O)},onKeydown:function(O){[ne.SPACE,ne.ENTER].includes(O.which)&&(O.preventDefault(),i(O))},onFocus:M},[typeof k=="function"?k():k]),o.value&&f("button",{type:"button","aria-label":A||"remove",tabindex:0,class:"".concat(_,"-remove"),onClick:function(O){O.stopPropagation(),l(O)}},[(T==null?void 0:T())||((s=j.removeIcon)===null||s===void 0?void 0:s.call(j))||"\xD7"])]);return d?d(K):K}}}),bt={width:0,height:0,left:0,top:0};function va(v,e){var t=I(new Map);return We(function(){for(var r,a,n=new Map,i=v.value,l=e.value.get((r=i[0])===null||r===void 0?void 0:r.key)||bt,o=l.left+l.width,c=0;c<i.length;c+=1){var s=i[c].key,b=e.value.get(s);b||(b=e.value.get((a=i[c-1])===null||a===void 0?void 0:a.key)||bt);var g=n.get(s)||q({},b);g.right=o-g.left-g.width,n.set(s,g)}t.value=new Map(n)}),t}var Ct=ve({name:"AddButton",inheritAttrs:!1,props:{prefixCls:String,editable:{type:Object},locale:{type:Object,default:void 0}},setup:function(e,t){var r=t.expose,a=t.attrs,n=I();return r({domRef:n}),function(){var i=e.prefixCls,l=e.editable,o=e.locale;return!l||l.showAdd===!1?null:f("button",{ref:n,type:"button",class:"".concat(i,"-nav-add"),style:a.style,"aria-label":(o==null?void 0:o.addAriaLabel)||"Add tab",onClick:function(s){l.onEdit("add",{event:s})}},[l.addIcon?l.addIcon():"+"])}}}),ca={prefixCls:{type:String},id:{type:String},tabs:{type:Object},rtl:{type:Boolean},tabBarGutter:{type:Number},activeKey:{type:[String,Number]},mobile:{type:Boolean},moreIcon:Fe.any,moreTransitionName:{type:String},editable:{type:Object},locale:{type:Object,default:void 0},removeAriaLabel:String,onTabClick:{type:Function}},sa=ve({name:"OperationNode",inheritAttrs:!1,props:ca,emits:["tabClick"],slots:["moreIcon"],setup:function(e,t){var r=t.attrs,a=t.slots,n=V(!1),i=B(n,2),l=i[0],o=i[1],c=V(null),s=B(c,2),b=s[0],g=s[1],L=function(d){for(var A=e.tabs.filter(function(U){return!U.disabled}),j=A.findIndex(function(U){return U.key===b.value})||0,M=A.length,_=0;_<M;_+=1){j=(j+d+M)%M;var K=A[j];if(!K.disabled){g(K.key);return}}},P=function(d){var A=d.which;if(!l.value){[ne.DOWN,ne.SPACE,ne.ENTER].includes(A)&&(o(!0),d.preventDefault());return}switch(A){case ne.UP:L(-1),d.preventDefault();break;case ne.DOWN:L(1),d.preventDefault();break;case ne.ESC:o(!1);break;case ne.SPACE:case ne.ENTER:b.value!==null&&e.onTabClick(b.value,d);break}},F=Z(function(){return"".concat(e.id,"-more-popup")}),k=Z(function(){return b.value!==null?"".concat(F.value,"-").concat(b.value):null}),z=function(d,A){d.preventDefault(),d.stopPropagation(),e.editable.onEdit("remove",{key:A,event:d})};return De(function(){he(b,function(){var T=document.getElementById(k.value);T&&T.scrollIntoView&&T.scrollIntoView(!1)},{flush:"post",immediate:!0})}),he(l,function(){l.value||g(null)}),function(){var T,d=e.prefixCls,A=e.id,j=e.tabs,M=e.locale,_=e.mobile,K=e.moreIcon,U=K===void 0?((T=a.moreIcon)===null||T===void 0?void 0:T.call(a))||f(ea,null,null):K,O=e.moreTransitionName,H=e.editable,ce=e.tabBarGutter,S=e.rtl,u=e.onTabClick,y="".concat(d,"-dropdown"),p=M==null?void 0:M.dropdownAriaLabel,W=D({},S?"marginRight":"marginLeft",ce);j.length||(W.visibility="hidden",W.order=1);var R=ge(D({},"".concat(y,"-rtl"),S)),E=_?null:f(na,{prefixCls:y,trigger:["hover"],visible:l.value,transitionName:O,onVisibleChange:o,overlayClassName:R,mouseEnterDelay:.1,mouseLeaveDelay:.1},{overlay:function(){return f(ta,{onClick:function(w){var $=w.key,ie=w.domEvent;u($,ie),o(!1)},id:F.value,tabindex:-1,role:"listbox","aria-activedescendant":k.value,selectedKeys:[b.value],"aria-label":p!==void 0?p:"expanded dropdown"},{default:function(){return[j.map(function(w){var $,ie,pe=H&&w.closable!==!1&&!w.disabled;return f(aa,{key:w.key,id:"".concat(F.value,"-").concat(w.key),role:"option","aria-controls":A&&"".concat(A,"-panel-").concat(w.key),disabled:w.disabled},{default:function(){return[f("span",null,[typeof w.tab=="function"?w.tab():w.tab]),pe&&f("button",{type:"button","aria-label":e.removeAriaLabel||"remove",tabindex:0,class:"".concat(y,"-menu-item-remove"),onClick:function(se){se.stopPropagation(),z(se,w.key)}},[(($=w.closeIcon)===null||$===void 0?void 0:$.call(w))||((ie=H.removeIcon)===null||ie===void 0?void 0:ie.call(H))||"\xD7"])]}})})]}})},default:function(){return f("button",{type:"button",class:"".concat(d,"-nav-more"),style:W,tabindex:-1,"aria-hidden":"true","aria-haspopup":"listbox","aria-controls":F.value,id:"".concat(A,"-more"),"aria-expanded":l.value,onKeydown:P},[U])}});return f("div",{class:ge("".concat(d,"-nav-operations"),r.class),style:r.style},[E,f(Ct,{prefixCls:d,locale:M,editable:H},null)])}}}),Pt=Symbol("tabsContextKey"),It=function(e){Kt(Pt,e)},kt=function(){return Ot(Pt,{tabs:I([]),prefixCls:I()})};ve({name:"TabsContextProvider",inheritAttrs:!1,props:{tabs:{type:Object,default:void 0},prefixCls:{type:String,default:void 0}},setup:function(e,t){var r=t.slots;return It(Wt(e)),function(){var a;return(a=r.default)===null||a===void 0?void 0:a.call(r)}}});var da=.1,yt=.01,Oe=20,mt=Math.pow(.995,Oe);function fa(v,e){var t=V(),r=B(t,2),a=r[0],n=r[1],i=V(0),l=B(i,2),o=l[0],c=l[1],s=V(0),b=B(s,2),g=b[0],L=b[1],P=V(),F=B(P,2),k=F[0],z=F[1],T=I();function d(S){var u=S.touches[0],y=u.screenX,p=u.screenY;n({x:y,y:p}),clearInterval(T.value)}function A(S){if(!!a.value){S.preventDefault();var u=S.touches[0],y=u.screenX,p=u.screenY,W=y-a.value.x,R=p-a.value.y;e(W,R),n({x:y,y:p});var E=Date.now();L(E-o.value),c(E),z({x:W,y:R})}}function j(){if(!!a.value){var S=k.value;if(n(null),z(null),S){var u=S.x/g.value,y=S.y/g.value,p=Math.abs(u),W=Math.abs(y);if(Math.max(p,W)<da)return;var R=u,E=y;T.value=setInterval(function(){if(Math.abs(R)<yt&&Math.abs(E)<yt){clearInterval(T.value);return}R*=mt,E*=mt,e(R*Oe,E*Oe)},Oe)}}}var M=I();function _(S){var u=S.deltaX,y=S.deltaY,p=0,W=Math.abs(u),R=Math.abs(y);W===R?p=M.value==="x"?u:y:W>R?(p=u,M.value="x"):(p=y,M.value="y"),e(-p,-p)&&S.preventDefault()}var K=I({onTouchStart:d,onTouchMove:A,onTouchEnd:j,onWheel:_});function U(S){K.value.onTouchStart(S)}function O(S){K.value.onTouchMove(S)}function H(S){K.value.onTouchEnd(S)}function ce(S){K.value.onWheel(S)}De(function(){var S,u;document.addEventListener("touchmove",O,{passive:!1}),document.addEventListener("touchend",H,{passive:!1}),(S=v.value)===null||S===void 0||S.addEventListener("touchstart",U,{passive:!1}),(u=v.value)===null||u===void 0||u.addEventListener("wheel",ce,{passive:!1})}),Je(function(){document.removeEventListener("touchmove",O),document.removeEventListener("touchend",H)})}function ht(v,e){var t=I(v);function r(a){var n=typeof a=="function"?a(t.value):a;n!==t.value&&e(n,t.value),t.value=n}return[t,r]}function ba(v,e,t,r){if(!ct(v))return v;e=Tt(e,v);for(var a=-1,n=e.length,i=n-1,l=v;l!=null&&++a<n;){var o=Dt(e[a]),c=t;if(o==="__proto__"||o==="constructor"||o==="prototype")return v;if(a!=i){var s=l[o];c=r?r(s,o,l):void 0,c===void 0&&(c=ct(s)?s:Ft(e[a+1])?[]:{})}Ht(l,o,c),l=l[o]}return v}function ya(v,e,t){for(var r=-1,a=e.length,n={};++r<a;){var i=e[r],l=zt(v,i);t(l,i)&&ba(n,Tt(i,v),l)}return n}function ma(v,e){return ya(v,e,function(t,r){return jt(v,r)})}var ha=Gt(function(v,e){return v==null?{}:ma(v,e)}),_t=ha,gt={width:0,height:0,left:0,top:0,right:0},ga=function(){return{id:{type:String},tabPosition:{type:String},activeKey:{type:[String,Number]},rtl:{type:Boolean},animated:{type:Object,default:void 0},editable:{type:Object},moreIcon:Fe.any,moreTransitionName:{type:String},mobile:{type:Boolean},tabBarGutter:{type:Number},renderTabBar:{type:Function},locale:{type:Object,default:void 0},onTabClick:{type:Function},onTabScroll:{type:Function}}},St=ve({name:"TabNavList",inheritAttrs:!1,props:ga(),slots:["moreIcon","leftExtra","rightExtra","tabBarExtraContent"],emits:["tabClick","tabScroll"],setup:function(e,t){var r=t.attrs,a=t.slots,n=kt(),i=n.tabs,l=n.prefixCls,o=I(),c=I(),s=I(),b=I(),g=ia(),L=B(g,2),P=L[0],F=L[1],k=Z(function(){return e.tabPosition==="top"||e.tabPosition==="bottom"}),z=ht(0,function(h,x){k.value&&e.onTabScroll&&e.onTabScroll({direction:h>x?"left":"right"})}),T=B(z,2),d=T[0],A=T[1],j=ht(0,function(h,x){!k.value&&e.onTabScroll&&e.onTabScroll({direction:h>x?"top":"bottom"})}),M=B(j,2),_=M[0],K=M[1],U=V(0),O=B(U,2),H=O[0],ce=O[1],S=V(0),u=B(S,2),y=u[0],p=u[1],W=V(null),R=B(W,2),E=R[0],Te=R[1],Se=V(null),w=B(Se,2),$=w[0],ie=w[1],pe=V(0),xe=B(pe,2),Ce=xe[0],se=xe[1],we=V(0),J=B(we,2),He=J[0],Re=J[1],Ne=oa(new Map),Le=B(Ne,2),ze=Le[0],Pe=Le[1],Me=va(i,ze),Bt=Z(function(){return"".concat(l.value,"-nav-operations-hidden")}),Ie=I(0),ke=I(0);We(function(){k.value?e.rtl?(Ie.value=0,ke.value=Math.max(0,H.value-E.value)):(Ie.value=Math.min(0,E.value-H.value),ke.value=0):(Ie.value=Math.min(0,$.value-y.value),ke.value=0)});var je=function(x){return x<Ie.value?Ie.value:x>ke.value?ke.value:x},Qe=I(),At=V(),et=B(At,2),Ge=et[0],tt=et[1],Ve=function(){tt(Date.now())},Ue=function(){clearTimeout(Qe.value)},at=function(x,m){x(function(N){var C=je(N+m);return C})};fa(o,function(h,x){if(k.value){if(E.value>=H.value)return!1;at(A,h)}else{if($.value>=y.value)return!1;at(K,x)}return Ue(),Ve(),!0}),he(Ge,function(){Ue(),Ge.value&&(Qe.value=setTimeout(function(){tt(0)},100))});var nt=function(){var x=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e.activeKey,m=Me.value.get(x)||{width:0,height:0,left:0,right:0,top:0};if(k.value){var N=d.value;e.rtl?m.right<d.value?N=m.right:m.right+m.width>d.value+E.value&&(N=m.right+m.width-E.value):m.left<-d.value?N=-m.left:m.left+m.width>-d.value+E.value&&(N=-(m.left+m.width-E.value)),K(0),A(je(N))}else{var C=_.value;m.top<-_.value?C=-m.top:m.top+m.height>-_.value+$.value&&(C=-(m.top+m.height-$.value)),A(0),K(je(C))}},$e=I(0),Ye=I(0);We(function(){var h,x,m,N,C,Y,X,be=Me.value;["top","bottom"].includes(e.tabPosition)?(x="width",C=E.value,Y=H.value,X=Ce.value,m=e.rtl?"right":"left",N=Math.abs(d.value)):(x="height",C=$.value,Y=H.value,X=He.value,m="top",N=-_.value);var Q=C;Y+X>C&&Y<C&&(Q=C-X);var re=i.value;if(!re.length){var le;return le=[0,0],$e.value=le[0],Ye.value=le[1],le}for(var ye=re.length,G=ye,te=0;te<ye;te+=1){var ae=be.get(re[te].key)||gt;if(ae[m]+ae[x]>N+Q){G=te-1;break}}for(var oe=0,ee=ye-1;ee>=0;ee-=1){var me=be.get(re[ee].key)||gt;if(me[m]<N){oe=ee+1;break}}return h=[oe,G],$e.value=h[0],Ye.value=h[1],h});var Xe=function(){var x,m,N,C,Y,X=((x=o.value)===null||x===void 0?void 0:x.offsetWidth)||0,be=((m=o.value)===null||m===void 0?void 0:m.offsetHeight)||0,Q=((N=b.value)===null||N===void 0?void 0:N.$el)||{},re=Q.offsetWidth||0,le=Q.offsetHeight||0;Te(X),ie(be),se(re),Re(le);var ye=(((C=c.value)===null||C===void 0?void 0:C.offsetWidth)||0)-re,G=(((Y=c.value)===null||Y===void 0?void 0:Y.offsetHeight)||0)-le;ce(ye),p(G),Pe(function(){var te=new Map;return i.value.forEach(function(ae){var oe=ae.key,ee,me=F.value.get(oe),fe=((ee=me)===null||ee===void 0?void 0:ee.$el)||me;fe&&te.set(oe,{width:fe.offsetWidth,height:fe.offsetHeight,left:fe.offsetLeft,top:fe.offsetTop})}),te})},it=Z(function(){return[].concat(dt(i.value.slice(0,$e.value)),dt(i.value.slice(Ye.value+1)))}),wt=V(),rt=B(wt,2),Rt=rt[0],Nt=rt[1],de=Z(function(){return Me.value.get(e.activeKey)}),lt=I(),ot=function(){Ae.cancel(lt.value)};he([de,k,function(){return e.rtl}],function(){var h={};de.value&&(k.value?(e.rtl?h.right=Be(de.value.right):h.left=Be(de.value.left),h.width=Be(de.value.width)):(h.top=Be(de.value.top),h.height=Be(de.value.height))),ot(),lt.value=Ae(function(){Nt(h)})}),he([function(){return e.activeKey},de,Me,k],function(){nt()},{flush:"post"}),he([function(){return e.rtl},function(){return e.tabBarGutter},function(){return e.activeKey},function(){return i.value}],function(){Xe()},{flush:"post"});var Ze=function(x){var m=x.position,N=x.prefixCls,C=x.extra;if(!C)return null;var Y=C==null?void 0:C({position:m});return Y?f("div",{class:"".concat(N,"-extra-content")},[Y]):null};return Je(function(){Ue(),ot()}),function(){var h,x=e.id,m=e.animated,N=e.activeKey,C=e.rtl,Y=e.editable,X=e.locale,be=e.tabPosition,Q=e.tabBarGutter,re=e.onTabClick,le=r.class,ye=r.style,G=l.value,te=!!it.value.length,ae="".concat(G,"-nav-wrap"),oe,ee,me,fe;k.value?C?(ee=d.value>0,oe=d.value+E.value<H.value):(oe=d.value<0,ee=-d.value+E.value<H.value):(me=_.value<0,fe=-_.value+$.value<y.value);var Ke={};be==="top"||be==="bottom"?Ke[C?"marginRight":"marginLeft"]=typeof Q=="number"?"".concat(Q,"px"):Q:Ke.marginTop=typeof Q=="number"?"".concat(Q,"px"):Q;var ut=i.value.map(function(_e,vt){var Ee=_e.key;return f(ua,{id:x,prefixCls:G,key:Ee,tab:_e,style:vt===0?void 0:Ke,closable:_e.closable,editable:Y,active:Ee===N,removeAriaLabel:X==null?void 0:X.removeAriaLabel,ref:P(Ee),onClick:function(Mt){re(Ee,Mt)},onFocus:function(){nt(Ee),Ve(),o.value&&(C||(o.value.scrollLeft=0),o.value.scrollTop=0)}},a)});return f("div",{role:"tablist",class:ge("".concat(G,"-nav"),le),style:ye,onKeydown:function(){Ve()}},[f(Ze,{position:"left",prefixCls:G,extra:a.leftExtra},null),f(st,{onResize:Xe},{default:function(){return[f("div",{class:ge(ae,(h={},D(h,"".concat(ae,"-ping-left"),oe),D(h,"".concat(ae,"-ping-right"),ee),D(h,"".concat(ae,"-ping-top"),me),D(h,"".concat(ae,"-ping-bottom"),fe),h)),ref:o},[f(st,{onResize:Xe},{default:function(){return[f("div",{ref:c,class:"".concat(G,"-nav-list"),style:{transform:"translate(".concat(d.value,"px, ").concat(_.value,"px)"),transition:Ge.value?"none":void 0}},[ut,f(Ct,{ref:b,prefixCls:G,locale:X,editable:Y,style:q(q({},ut.length===0?void 0:Ke),{visibility:te?"hidden":null})},null),f("div",{class:ge("".concat(G,"-ink-bar"),D({},"".concat(G,"-ink-bar-animated"),m.inkBar)),style:Rt.value},null)])]}})])]}}),f(sa,ue(ue({},e),{},{removeAriaLabel:X==null?void 0:X.removeAriaLabel,ref:s,prefixCls:G,tabs:it.value,class:!te&&Bt.value}),_t(a,["moreIcon"])),f(Ze,{position:"right",prefixCls:G,extra:a.rightExtra},null),f(Ze,{position:"right",prefixCls:G,extra:a.tabBarExtraContent},null)])}}}),Sa=ve({name:"TabPanelList",inheritAttrs:!1,props:{activeKey:{type:[String,Number]},id:{type:String},rtl:{type:Boolean},animated:{type:Object,default:void 0},tabPosition:{type:String},destroyInactiveTabPane:{type:Boolean}},setup:function(e){var t=kt(),r=t.tabs,a=t.prefixCls;return function(){var n=e.id,i=e.activeKey,l=e.animated,o=e.tabPosition,c=e.rtl,s=e.destroyInactiveTabPane,b=l.tabPane,g=a.value,L=r.value.findIndex(function(P){return P.key===i});return f("div",{class:"".concat(g,"-content-holder")},[f("div",{class:["".concat(g,"-content"),"".concat(g,"-content-").concat(o),D({},"".concat(g,"-content-animated"),b)],style:L&&b?D({},c?"marginRight":"marginLeft","-".concat(L,"00%")):null},[r.value.map(function(P){return Vt(P.node,{key:P.key,prefixCls:g,tabKey:P.key,id:n,animated:b,active:P.key===i,destroyInactiveTabPane:s})})])])}}}),xt=0,Et=function(){return{prefixCls:{type:String},id:{type:String},activeKey:{type:[String,Number]},defaultActiveKey:{type:[String,Number]},direction:{type:String},animated:{type:[Boolean,Object]},renderTabBar:{type:Function},tabBarGutter:{type:Number},tabBarStyle:{type:Object},tabPosition:{type:String},destroyInactiveTabPane:{type:Boolean},hideAdd:Boolean,type:{type:String},size:{type:String},centered:Boolean,onEdit:{type:Function},onChange:{type:Function},onTabClick:{type:Function},onTabScroll:{type:Function},"onUpdate:activeKey":{type:Function},locale:{type:Object,default:void 0},onPrevClick:Function,onNextClick:Function,tabBarExtraContent:Fe.any}};function xa(v){return v.map(function(e){if($t(e)){for(var t=q({},e.props||{}),r=0,a=Object.entries(t);r<a.length;r++){var n=B(a[r],2),i=n[0],l=n[1];delete t[i],t[Yt(i)]=l}var o=e.children||{},c=e.key!==void 0?e.key:void 0,s=t.tab,b=s===void 0?o.tab:s,g=t.disabled,L=t.forceRender,P=t.closable,F=t.animated,k=t.active,z=t.destroyInactiveTabPane;return q(q({key:c},t),{node:e,closeIcon:o.closeIcon,tab:b,disabled:g===""||g,forceRender:L===""||L,closable:P===""||P,animated:F===""||F,active:k===""||k,destroyInactiveTabPane:z===""||z})}return null}).filter(function(e){return e})}var Ta=ve({name:"InternalTabs",inheritAttrs:!1,props:q(q({},pt(Et(),{tabPosition:"top",animated:{inkBar:!0,tabPane:!1}})),{tabs:{type:Array}}),slots:["tabBarExtraContent","leftExtra","rightExtra","moreIcon","addIcon","removeIcon","renderTabBar"],setup:function(e,t){var r=t.attrs,a=t.slots;qe(e.onPrevClick===void 0&&e.onNextClick===void 0,"Tabs","`onPrevClick / @prevClick` and `onNextClick / @nextClick` has been removed. Please use `onTabScroll / @tabScroll` instead."),qe(e.tabBarExtraContent===void 0,"Tabs","`tabBarExtraContent` prop has been removed. Please use `rightExtra` slot instead."),qe(a.tabBarExtraContent===void 0,"Tabs","`tabBarExtraContent` slot is deprecated. Please use `rightExtra` slot instead.");var n=Zt("tabs",e),i=n.prefixCls,l=n.direction,o=n.size,c=n.rootPrefixCls,s=Z(function(){return l.value==="rtl"}),b=Z(function(){var u=e.animated,y=e.tabPosition;return u===!1||["left","right"].includes(y)?{inkBar:!1,tabPane:!1}:u===!0?{inkBar:!0,tabPane:!0}:q({inkBar:!0,tabPane:!1},Qt(u)==="object"?u:{})}),g=V(!1),L=B(g,2),P=L[0],F=L[1];De(function(){F(qt())});var k=ft(function(){var u;return(u=e.tabs[0])===null||u===void 0?void 0:u.key},{value:Z(function(){return e.activeKey}),defaultValue:e.defaultActiveKey}),z=B(k,2),T=z[0],d=z[1],A=V(function(){return e.tabs.findIndex(function(u){return u.key===T.value})}),j=B(A,2),M=j[0],_=j[1];We(function(){var u,y=e.tabs.findIndex(function(p){return p.key===T.value});y===-1&&(y=Math.max(0,Math.min(M.value,e.tabs.length-1)),d((u=e.tabs[y])===null||u===void 0?void 0:u.key)),_(y)});var K=ft(null,{value:Z(function(){return e.id})}),U=B(K,2),O=U[0],H=U[1],ce=Z(function(){return P.value&&!["left","right"].includes(e.tabPosition)?"top":e.tabPosition});De(function(){e.id||(H("rc-tabs-".concat(xt)),xt+=1)});var S=function(y,p){var W,R;(W=e.onTabClick)===null||W===void 0||W.call(e,y,p);var E=y!==T.value;d(y),E&&((R=e.onChange)===null||R===void 0||R.call(e,y))};return It({tabs:Z(function(){return e.tabs}),prefixCls:i}),function(){var u,y=e.id,p=e.type,W=e.tabBarGutter,R=e.tabBarStyle,E=e.locale,Te=e.destroyInactiveTabPane,Se=e.renderTabBar,w=Se===void 0?a.renderTabBar:Se,$=e.onTabScroll,ie=e.hideAdd,pe=e.centered,xe={id:O.value,activeKey:T.value,animated:b.value,tabPosition:ce.value,rtl:s.value,mobile:P.value},Ce;p==="editable-card"&&(Ce={onEdit:function(Re,Ne){var Le=Ne.key,ze=Ne.event,Pe;(Pe=e.onEdit)===null||Pe===void 0||Pe.call(e,Re==="add"?ze:Le,Re)},removeIcon:function(){return f(Jt,null,null)},addIcon:a.addIcon?a.addIcon:function(){return f(ra,null,null)},showAdd:ie!==!0});var se,we=q(q({},xe),{moreTransitionName:"".concat(c.value,"-slide-up"),editable:Ce,locale:E,tabBarGutter:W,onTabClick:S,onTabScroll:$,style:R});w?se=w(q(q({},we),{DefaultTabBar:St})):se=f(St,we,_t(a,["moreIcon","leftExtra","rightExtra","tabBarExtraContent"]));var J=i.value;return f("div",ue(ue({},r),{},{id:y,class:ge(J,"".concat(J,"-").concat(ce.value),(u={},D(u,"".concat(J,"-").concat(o.value),o.value),D(u,"".concat(J,"-card"),["card","editable-card"].includes(p)),D(u,"".concat(J,"-editable-card"),p==="editable-card"),D(u,"".concat(J,"-centered"),pe),D(u,"".concat(J,"-mobile"),P.value),D(u,"".concat(J,"-editable"),p==="editable-card"),D(u,"".concat(J,"-rtl"),s.value),u),r.class)}),[se,f(Sa,ue(ue({destroyInactiveTabPane:Te},xe),{},{animated:b.value}),null)])}}}),_a=ve({name:"ATabs",inheritAttrs:!1,props:pt(Et(),{tabPosition:"top",animated:{inkBar:!0,tabPane:!1}}),slots:["tabBarExtraContent","leftExtra","rightExtra","moreIcon","addIcon","removeIcon","renderTabBar"],setup:function(e,t){var r=t.attrs,a=t.slots,n=t.emit,i=function(o){n("update:activeKey",o),n("change",o)};return function(){var l,o=xa(Ut((l=a.default)===null||l===void 0?void 0:l.call(a)));return f(Ta,ue(ue(ue({},Xt(e,["onUpdate:activeKey"])),r),{},{onChange:i,tabs:o}),a)}}}),pa=function(){return{tab:Fe.any,disabled:{type:Boolean},forceRender:{type:Boolean},closable:{type:Boolean},animated:{type:Boolean},active:{type:Boolean},destroyInactiveTabPane:{type:Boolean},prefixCls:{type:String},tabKey:{type:[String,Number]},id:{type:String}}},Ea=ve({name:"ATabPane",inheritAttrs:!1,__ANT_TAB_PANE:!0,props:pa(),slots:["closeIcon","tab"],setup:function(e,t){var r=t.attrs,a=t.slots,n=I(e.forceRender);he([function(){return e.active},function(){return e.destroyInactiveTabPane}],function(){e.active?n.value=!0:e.destroyInactiveTabPane&&(n.value=!1)},{immediate:!0});var i=Z(function(){return e.active?{}:e.animated?{visibility:"hidden",height:0,overflowY:"hidden"}:{display:"none"}});return function(){var l,o=e.prefixCls,c=e.forceRender,s=e.id,b=e.active,g=e.tabKey;return f("div",{id:s&&"".concat(s,"-panel-").concat(g),role:"tabpanel",tabindex:b?0:-1,"aria-labelledby":s&&"".concat(s,"-tab-").concat(g),"aria-hidden":!b,style:[i.value,r.style],class:["".concat(o,"-tabpane"),b&&"".concat(o,"-tabpane-active"),r.class]},[(b||n.value||c)&&((l=a.default)===null||l===void 0?void 0:l.call(a))])}}});export{Ea as T,_a as a};
