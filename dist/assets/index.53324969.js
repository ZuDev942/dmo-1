import{_ as u}from"./avatar.b6589987.js";import{d as n,P as B}from"./vuedraggable.umd.4845ad68.js";import{E as I,d as S,a as m,F as N,G as U,b as e,ca as D,H as a,I as o,db as f,aR as Q,J as t,b1 as _,ak as c,b4 as T,b5 as X,as as d}from"./index.6e81f745.js";import{a as P,T as V}from"./TabPane.5178b34e.js";import{P as C}from"./PlusOutlined.255a5cf5.js";import"./CheckOutlined.b526b077.js";import"./useRefs.51cc0c26.js";import"./KeyCode.0ed1902f.js";import"./index.65d8e2ff.js";var v="data:image/png;base64,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",E="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAASuSURBVHic5ZtNbBtFGIaf2T8nJsQQKS6i9IKEuBCl0DQSlRCqEghcEYegSoi/A+qFQo1EOPmWQ3uiogEp7YEDFUiIC1RQCAcOOUURhoI400pNUpH/H++ud4dDUsdu1onX3tk1znuyxruz3/P6887M7jeCQ6i1Qi7ru9p1YEtLOpi4tVbIZT1XmwJOIOkQSQcUp9Zmx3o935sS0Afyb93n9KExIAi+a/DC3KEwoBY8gJFUUPmZz9NFtPNIcUbA44DZaF/S93Edh83VVZytLQCEEBimtfRIp3bF85dHguABEsmAXGEiazrmD8DTUfe9ubLC+vIyAF06vHvE4VFLEgQPEPsosAM/hQJ4gHQmg9XZWQW/4AouLT58/X54iNmACvinVF6nN9NVBX95zuRW0X8z6NjY7gFjs1d7cbyfUQyfxmO0Y4Esu/CrnkDI0kNBx8eSAWOzV3vxvCkQfSqvk8ZjVNwmi1MFDyB9L/B+pzwD4oe3+ReTy3OiDL+flGZAUvDX5LG64EGhAbnCRBbP/0UB/C2JeNWzRbdni+6jwnnjjPjHroRfD5HYSv4CCu/2t1Iux/On3l6E8gzvvIDUkjRL1zhmhIEHBRmgcqiTiPfzp96phC9Pb7/XjpwNCw8RG6B6nPdtbpQ/+953Avok3NRM+fxdt+erRvqMzIC4Jjn3JJDrSGZ00x96sP/iwpax0dC0PpJ7QFzwmskw8C1A98CFocrvhDSGQYbvs9mgYv3lNTmen57sub85Pz3Zg5DjjXTZVAbEn/Y8aZsUPpqZ/KCj1PEjQFG3XygKOS4kTzTSZ8MGxDW3D9BjQvK1rReBnfV8+Mwvq6G/QFwzvDgU2oB2goeQBrQbPIQwoB3hoU4D2hUe6jCgneHhAAPaHR72MeAwwEMNAxQ+zIhFUu6dGQkRvFbaY0Dc01sV8kqlPW26odtBx1YZ0A7wAPbGxp423Uz9GnRs2YB2gd9+R7hW1WaY5qatWaNBxxuQ6MImUnluiZWFBaT0y22aYTia1f3slZfOLQado+X//LQL3//p/3rDuyfPLbE0P4fveeU23TBsvTN9YuLlc7/XOk9ztlIfI+mPJUpFqgWvdaYHPhv58OZ+52oSXlMeoUI1Aw+gITmqNEKFahYetkeB26oCVKko4AE0AV8qiVChooIH0BzLGgd+izpIVYoSHkC72P/6Brr2Isg/Io1UgYLgNcNw9FRmsBF4qCiSavXVXy14I5U5ud84f5CqlkitaoIqeAgok2s1E1TCQ406wVYxQTU87FMombQJccDDAZWiSZkQFzzUUSobtwlxwkOdtcJxmRA3PIQollZtQhLwELJaXJUJScFDA+XyUZuQJDw0uF8gKhOShocmNkw0a0IrwEOTO0YaNaFV4CGCLTNhTWgleIhoz1C9JrQaPES4aeogE1oRHiLeNVbLhJLrsjQ/h/R239gYpmmnOjIDn4y819CTnKgUabH0+DNv3UXXhyofr5Vch+X5+Sr4nddVg0nDg6J9g9uZ4N9wHef4yvwCvr+b9oZlblrp9MlLw7m/VFw7rJRtnMwVvnigeOfON45dPO17nqXphmNa1rTf1f3KxHNnl1RdN6z+A8S/X2wEy4sLAAAAAElFTkSuQmCC",w="data:image/png;base64,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";const l=p=>(T("data-v-57a1b0a0"),p=p(),X(),p),y={class:"tasks"},z={class:"task__scroll"},L={class:"task__contain"},x={class:"task"},F=l(()=>t("h1",null,"NOT STARTED",-1)),O={class:"task__item"},Y={class:"task__wrap"},Z={class:"task__name"},G={class:"task__des"},H=l(()=>t("div",{class:"task__detail"},[t("img",{src:v,alt:""}),t("p",null,"Popup task detail")],-1)),R={class:"task__staff"},M=d("Nguyen Thanh A"),q=l(()=>t("img",{src:u,alt:""},null,-1)),J={class:"task"},K=l(()=>t("h1",null,"PENDING",-1)),j={class:"task__item"},W={class:"task__wrap"},$={class:"task__name"},tt={class:"task__des"},st=l(()=>t("div",{class:"task__detail"},[t("img",{src:v,alt:""}),t("p",null,"Popup task detail")],-1)),at={class:"task__staff"},et=d("Nguyen Thanh A"),ot=l(()=>t("img",{src:u,alt:""},null,-1)),lt={class:"task"},it=l(()=>t("h1",null,"PROCESSING",-1)),dt={class:"task__item"},nt={class:"task__wrap"},_t={class:"task__name"},ct={class:"task__des"},At=l(()=>t("div",{class:"task__detail"},[t("img",{src:v,alt:""}),t("p",null,"Popup task detail")],-1)),mt={class:"task__staff"},ut=d("Nguyen Thanh A"),vt=l(()=>t("img",{src:u,alt:""},null,-1)),pt={class:"task"},rt=l(()=>t("h1",null,"COMPLETED",-1)),ht={class:"task__item"},gt={class:"task__wrap"},kt={class:"task__name"},Bt={class:"task__des"},Et=l(()=>t("div",{class:"task__detail"},[t("img",{src:v,alt:""}),t("p",null,"Popup task detail")],-1)),wt={class:"task__staff"},bt=d("Nguyen Thanh A"),ft=l(()=>t("img",{src:u,alt:""},null,-1)),Qt={class:"task"},Vt=l(()=>t("h1",null,"CLOSED",-1)),Ct={class:"task__item"},It={class:"task__wrap"},St={class:"task__name"},Nt={class:"task__des"},Ut=l(()=>t("div",{class:"task__detail"},[t("img",{src:v,alt:""}),t("p",null,"Popup task detail")],-1)),Dt={class:"task__staff"},Tt=d("Nguyen Thanh A"),Xt=l(()=>t("img",{src:u,alt:""},null,-1)),Pt={class:"task__scroll"},yt={class:"task__contain"},zt={class:"task"},Lt=l(()=>t("h1",null,"NOT STARTED",-1)),xt={class:"task__item"},Ft={class:"task__wrap"},Ot={class:"task__name"},Yt={class:"task__des2"},Zt=l(()=>t("div",{class:"task__category"},[t("img",{src:E,alt:""}),t("p",null,"New development")],-1)),Gt=d("Actual time/ Estimate time"),Ht=l(()=>t("div",{class:"task__actual"},[t("img",{src:w,alt:""}),t("p",null,"0/1")],-1)),Rt={class:"task"},Mt=l(()=>t("h1",null,"PENDING",-1)),qt={class:"task__item"},Jt={class:"task__wrap"},Kt={class:"task__name"},jt={class:"task__des2"},Wt=l(()=>t("div",{class:"task__category"},[t("img",{src:E,alt:""}),t("p",null,"New development")],-1)),$t=d("Actual time/ Estimate time"),ts=l(()=>t("div",{class:"task__actual"},[t("img",{src:w,alt:""}),t("p",null,"0/1")],-1)),ss={class:"task"},as=l(()=>t("h1",null,"PROCESSING",-1)),es={class:"task__item"},os={class:"task__wrap"},ls={class:"task__name"},is={class:"task__des2"},ds=l(()=>t("div",{class:"task__category"},[t("img",{src:E,alt:""}),t("p",null,"New development")],-1)),ns=d("Actual time/ Estimate time"),_s=l(()=>t("div",{class:"task__actual"},[t("img",{src:w,alt:""}),t("p",null,"0/1")],-1)),cs={class:"task"},As=l(()=>t("h1",null,"COMPLETED",-1)),ms={class:"task__item"},us={class:"task__wrap"},vs={class:"task__name"},ps={class:"task__des2"},rs=l(()=>t("div",{class:"task__category"},[t("img",{src:E,alt:""}),t("p",null,"New development")],-1)),hs=d("Actual time/ Estimate time"),gs=l(()=>t("div",{class:"task__actual"},[t("img",{src:w,alt:""}),t("p",null,"0/1")],-1)),ks=d(" Create Issue"),Bs=d(" Create Task"),Es=S({name:"index",setup(p){const A=m(["Cap nhat du an moi, tien do lam viec","Cap nhat du an moi, tien do lam viec","Cap nhat du an moi, tien do lam viec","Cap nhat du an moi, tien do lam viec","Cap nhat du an moi, tien do lam viec Chicken"]),r=m(["Bat Cap nhat du an moi, tien do lam viec soup","Spicy Cap nhat du an moi, tien do lam viec","Cap nhat du an moi, tien do lam viec from Taco Bell"]),h=m(["Bat Cap nhat du an moi, tien do lam viec soup","Spicy Cap nhat du an moi, tien do lam viec","Cap nhat du an moi, tien do lam viec from Taco Bell"]),b=m(["Bat Cap nhat du an moi, tien do lam viec soup","Spicy Cap nhat du an moi, tien do lam viec","Cap nhat du an moi, tien do lam viec from Taco Bell"]),g=m("1"),k=m("");return(ws,i)=>(N(),U("div",y,[e(o(P),{activeKey:g.value,"onUpdate:activeKey":i[11]||(i[11]=s=>g.value=s),type:"card"},D({default:a(()=>[e(o(V),{key:"1",tab:"ISSUE"},{default:a(()=>[t("div",z,[t("div",L,[t("div",x,[F,e(o(n),{modelValue:A.value,"onUpdate:modelValue":i[0]||(i[0]=s=>A.value=s),tag:"ul",group:"meals",animation:300},{item:a(({element:s})=>[t("div",O,[t("div",Y,[t("div",Z,_(s),1)]),t("div",G,[H,t("div",R,[e(o(c),null,{title:a(()=>[M]),default:a(()=>[q]),_:1})])])])]),_:1},8,["modelValue"])]),t("div",J,[K,e(o(n),{modelValue:r.value,"onUpdate:modelValue":i[1]||(i[1]=s=>r.value=s),tag:"ul",group:"meals",animation:300},{item:a(({element:s})=>[t("div",j,[t("div",W,[t("div",$,_(s),1)]),t("div",tt,[st,t("div",at,[e(o(c),null,{title:a(()=>[et]),default:a(()=>[ot]),_:1})])])])]),_:1},8,["modelValue"])]),t("div",lt,[it,e(o(n),{modelValue:h.value,"onUpdate:modelValue":i[2]||(i[2]=s=>h.value=s),tag:"ul",group:"meals",animation:300},{item:a(({element:s})=>[t("div",dt,[t("div",nt,[t("div",_t,_(s),1)]),t("div",ct,[At,t("div",mt,[e(o(c),null,{title:a(()=>[ut]),default:a(()=>[vt]),_:1})])])])]),_:1},8,["modelValue"])]),t("div",pt,[rt,e(o(n),{modelValue:A.value,"onUpdate:modelValue":i[3]||(i[3]=s=>A.value=s),tag:"ul",group:"meals",animation:300},{item:a(({element:s})=>[t("div",ht,[t("div",gt,[t("div",kt,_(s),1)]),t("div",Bt,[Et,t("div",wt,[e(o(c),null,{title:a(()=>[bt]),default:a(()=>[ft]),_:1})])])])]),_:1},8,["modelValue"])]),t("div",Qt,[Vt,e(o(n),{modelValue:A.value,"onUpdate:modelValue":i[4]||(i[4]=s=>A.value=s),tag:"ul",group:"meals",animation:300},{item:a(({element:s})=>[t("div",Ct,[t("div",It,[t("div",St,_(s),1)]),t("div",Nt,[Ut,t("div",Dt,[e(o(c),null,{title:a(()=>[Tt]),default:a(()=>[Xt]),_:1})])])])]),_:1},8,["modelValue"])])])])]),_:1}),e(o(V),{key:"2",tab:"TASK"},{default:a(()=>[t("div",Pt,[t("div",yt,[t("div",zt,[Lt,e(o(n),{modelValue:A.value,"onUpdate:modelValue":i[5]||(i[5]=s=>A.value=s),tag:"ul",group:"meals",animation:300},{item:a(({element:s})=>[t("div",xt,[t("div",Ft,[t("div",Ot,_(s),1)]),t("div",null,[e(o(B),{"stroke-color":{from:"#2bc48a",to:"#2bc48a"},percent:69,status:"active"})]),t("div",Yt,[Zt,e(o(c),null,{title:a(()=>[Gt]),default:a(()=>[Ht]),_:1})])])]),_:1},8,["modelValue"])]),t("div",Rt,[Mt,e(o(n),{modelValue:r.value,"onUpdate:modelValue":i[6]||(i[6]=s=>r.value=s),tag:"ul",group:"meals",animation:300},{item:a(({element:s})=>[t("div",qt,[t("div",Jt,[t("div",Kt,_(s),1)]),t("div",null,[e(o(B),{"stroke-color":{from:"#2bc48a",to:"#2bc48a"},percent:69,status:"active"})]),t("div",jt,[Wt,e(o(c),null,{title:a(()=>[$t]),default:a(()=>[ts]),_:1})])])]),_:1},8,["modelValue"])]),t("div",ss,[as,e(o(n),{modelValue:h.value,"onUpdate:modelValue":i[7]||(i[7]=s=>h.value=s),tag:"ul",group:"meals",animation:300},{item:a(({element:s})=>[t("div",es,[t("div",os,[t("div",ls,_(s),1)]),t("div",null,[e(o(B),{"stroke-color":{from:"#2bc48a",to:"#2bc48a"},percent:69,status:"active"})]),t("div",is,[ds,e(o(c),null,{title:a(()=>[ns]),default:a(()=>[_s]),_:1})])])]),_:1},8,["modelValue"])]),t("div",cs,[As,e(o(n),{modelValue:b.value,"onUpdate:modelValue":i[8]||(i[8]=s=>b.value=s),tag:"ul",group:"meals",animation:300},{item:a(({element:s})=>[t("div",ms,[t("div",us,[t("div",vs,_(s),1)]),t("div",null,[e(o(B),{"stroke-color":{from:"#2bc48a",to:"#2bc48a"},percent:69,status:"active"})]),t("div",ps,[rs,e(o(c),null,{title:a(()=>[hs]),default:a(()=>[gs]),_:1})])])]),_:1},8,["modelValue"])])])])]),_:1})]),_:2},[g.value==="1"?{name:"rightExtra",fn:a(()=>[e(o(f),{value:k.value,"onUpdate:value":i[9]||(i[9]=s=>k.value=s),placeholder:"Search this board...",style:{width:"200px"},class:"input_search mr-4"},null,8,["value"]),e(o(Q),null,{default:a(()=>[e(o(C)),ks]),_:1})])}:void 0,g.value==="2"?{name:"rightExtra",fn:a(()=>[e(o(f),{value:k.value,"onUpdate:value":i[10]||(i[10]=s=>k.value=s),placeholder:"Search this board...",style:{width:"200px"},class:"input_search mr-4"},null,8,["value"]),e(o(Q),null,{default:a(()=>[e(o(C)),Bs]),_:1})])}:void 0]),1032,["activeKey"])]))}});var Ds=I(Es,[["__scopeId","data-v-57a1b0a0"]]);export{Ds as default};
