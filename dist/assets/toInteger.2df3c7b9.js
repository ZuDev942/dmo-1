import{t as u}from"./Checkbox.3943372a.js";function N(n,r,i){var o=-1,f=n.length;r<0&&(r=-r>f?0:f+r),i=i>f?f:i,i<0&&(i+=f),f=r>i?0:i-r>>>0,r>>>=0;for(var t=Array(f);++o<f;)t[o]=n[o+r];return t}function b(n){return function(r){return r==null?void 0:r[n]}}var e=1/0,c=17976931348623157e292;function I(n){if(!n)return n===0?n:0;if(n=u(n),n===e||n===-e){var r=n<0?-1:1;return r*c}return n===n?n:0}function g(n){var r=I(n),i=r%1;return r===r?i?r-i:r:0}export{b as a,N as b,g as t};
