import{ai as f,aj as s,ak as y,al as b,am as I,an as O,Q as x,ao as w,ap as C}from"./index.cf68340f.js";import{i as c}from"./isSymbol.aebf7791.js";function N(n,r){for(var e=-1,a=n==null?0:n.length,t=Array(a);++e<a;)t[e]=r(n[e],e,n);return t}var _=1/0,p=f?f.prototype:void 0,g=p?p.toString:void 0;function P(n){if(typeof n=="string")return n;if(s(n))return N(n,P)+"";if(c(n))return g?g.call(n):"";var r=n+"";return r=="0"&&1/n==-_?"-0":r}function $(n){return n==null?"":P(n)}var E=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,M=/^\w*$/;function A(n,r){if(s(n))return!1;var e=typeof n;return e=="number"||e=="symbol"||e=="boolean"||n==null||c(n)?!0:M.test(n)||!E.test(n)||r!=null&&n in Object(r)}var F="Expected a function";function h(n,r){if(typeof n!="function"||r!=null&&typeof r!="function")throw new TypeError(F);var e=function(){var a=arguments,t=r?r.apply(this,a):a[0],i=e.cache;if(i.has(t))return i.get(t);var u=n.apply(this,a);return e.cache=i.set(t,u)||i,u};return e.cache=new(h.Cache||y),e}h.Cache=y;var R=500;function z(n){var r=h(n,function(a){return e.size===R&&e.clear(),a}),e=r.cache;return r}var H=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,V=/\\(\\)?/g,D=z(function(n){var r=[];return n.charCodeAt(0)===46&&r.push(""),n.replace(H,function(e,a,t,i){r.push(t?i.replace(V,"$1"):a||e)}),r}),K=D;function v(n,r){return s(n)?n:A(n,r)?[n]:K($(n))}var U=1/0;function S(n){if(typeof n=="string"||c(n))return n;var r=n+"";return r=="0"&&1/n==-U?"-0":r}function cn(n,r){r=v(r,n);for(var e=0,a=r.length;n!=null&&e<a;)n=n[S(r[e++])];return e&&e==a?n:void 0}var X=function(){try{var n=b(Object,"defineProperty");return n({},"",{}),n}catch{}}(),l=X;function Y(n,r,e){r=="__proto__"&&l?l(n,r,{configurable:!0,enumerable:!0,value:e,writable:!0}):n[r]=e}var Z=Object.prototype,q=Z.hasOwnProperty;function hn(n,r,e){var a=n[r];(!(q.call(n,r)&&I(a,e))||e===void 0&&!(r in n))&&Y(n,r,e)}function G(n,r){return n!=null&&r in Object(n)}function L(n,r,e){r=v(r,n);for(var a=-1,t=r.length,i=!1;++a<t;){var u=S(r[a]);if(!(i=n!=null&&e(n,u)))break;n=n[u]}return i||++a!=t?i:(t=n==null?0:n.length,!!t&&O(t)&&x(u,t)&&(s(n)||w(n)))}function pn(n,r){return n!=null&&L(n,r,G)}var d=f?f.isConcatSpreadable:void 0;function Q(n){return s(n)||w(n)||!!(d&&n&&n[d])}function T(n,r,e,a,t){var i=-1,u=n.length;for(e||(e=Q),t||(t=[]);++i<u;){var o=n[i];r>0&&e(o)?r>1?T(o,r-1,e,a,t):C(t,o):a||(t[t.length]=o)}return t}function B(n){var r=n==null?0:n.length;return r?T(n,1):[]}function J(n,r,e){switch(e.length){case 0:return n.call(r);case 1:return n.call(r,e[0]);case 2:return n.call(r,e[0],e[1]);case 3:return n.call(r,e[0],e[1],e[2])}return n.apply(r,e)}var m=Math.max;function W(n,r,e){return r=m(r===void 0?n.length-1:r,0),function(){for(var a=arguments,t=-1,i=m(a.length-r,0),u=Array(i);++t<i;)u[t]=a[r+t];t=-1;for(var o=Array(r+1);++t<r;)o[t]=a[t];return o[r]=e(u),J(n,this,o)}}function k(n){return function(){return n}}function j(n){return n}var nn=l?function(n,r){return l(n,"toString",{configurable:!0,enumerable:!1,value:k(r),writable:!0})}:j,rn=nn,en=800,tn=16,an=Date.now;function un(n){var r=0,e=0;return function(){var a=an(),t=tn-(a-e);if(e=a,t>0){if(++r>=en)return arguments[0]}else r=0;return n.apply(void 0,arguments)}}var on=un(rn),sn=on;function gn(n){return sn(W(n,void 0,B),n+"")}export{S as a,P as b,v as c,hn as d,cn as e,gn as f,Y as g,pn as h,A as i,j,N as k,W as o,sn as s,$ as t};
