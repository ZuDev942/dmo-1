var i;function c(_){if(typeof document=="undefined")return 0;if(_||i===void 0){var e=document.createElement("div");e.style.width="100%",e.style.height="200px";var t=document.createElement("div"),s=t.style;s.position="absolute",s.top="0",s.left="0",s.pointerEvents="none",s.visibility="hidden",s.width="200px",s.height="150px",s.overflow="hidden",t.appendChild(e),document.body.appendChild(t);var n=e.offsetWidth;t.style.overflow="scroll";var d=e.offsetWidth;n===d&&(d=t.clientWidth),document.body.removeChild(t),i=n-d}return i}function a(_){var e=_.match(/^(.*)px$/),t=Number(e==null?void 0:e[1]);return Number.isNaN(t)?c():t}function l(_){if(typeof document=="undefined"||!_||!(_ instanceof Element))return{width:0,height:0};var e=getComputedStyle(_,"::-webkit-scrollbar"),t=e.width,s=e.height;return{width:a(t),height:a(s)}}export{l as a,c as g};