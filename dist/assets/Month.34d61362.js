import{_ as i,d,r as m,M as o,Q as p,c as u,e as f,f as n,g as c,h as r,ao as x,C as h,ap as v}from"./index.675d893b.js";const M={class:"bg-gray-700 p-3 grid place-items-center month"},g={class:"flex items-center space-x-3 select-none text-gray-50"},y={class:"w-max text-center text-[2.2rem]"},b=d({__name:"Month",emits:["selected"],setup(k,{emit:l}){const t=m(o().month()),_=p(()=>o().month(t.value).format("MMMM"));function s(a){t.value+=a,l("selected",t.value)}return(a,e)=>(u(),f("div",M,[n("span",g,[c(r(x),{class:"text-[2rem]",onClick:e[0]||(e[0]=()=>s(-1))}),n("span",y,h(_.value),1),c(r(v),{class:"text-[2rem]",onClick:e[1]||(e[1]=()=>s(1))})])]))}});var B=i(b,[["__scopeId","data-v-404e30b4"]]);export{B as default};