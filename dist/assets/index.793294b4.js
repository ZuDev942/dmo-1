import{a1 as E,_ as F,d as b,b as B,r as w,o as P,c as t,e as c,f as e,g as _,h as a,I as A,s as O,q as u,a4 as L,a5 as j,w as o,ac as R,B as C,H as G,ad as V,x as v,a6 as q,K as n,a3 as p,z as k,aj as M,C as h,p as U,j as Y,t as H}from"./index.675d893b.js";import{_ as D}from"./default-wg-member.0c90e88f.js";import{F as z}from"./FilterOutlined.b1733682.js";class ${async getIssue(i){return(await E.get("api/v1/issue",{params:i})).data}async createTask(i){return(await E.post("api/v1/task",i)).data}async updateTask(i){return(await E.put("api/v1/task",i)).data}async updateStatusTask(i){return(await E.put("api/v1/task/update-status",i)).data}async taskDetail(i){return(await E.get(`api/v1/task/${i}`)).data}}const K=new $;const l=f=>(U("data-v-2ccfb175"),f=f(),Y(),f),J={class:"issue"},Q={class:"py-[1rem] flex justify-between"},W={class:"flex items-center"},X={class:"project__search mr-5"},Z={class:"project__icon"},tt=l(()=>e("div",{class:"filter"}," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium, quo porro in sit laborum ullam veritatis quos esse maxime. Nesciunt incidunt distinctio cumque eum quo dolores? Cum saepe atque adipisci. ",-1)),et={class:"h-[524px]"},st={key:0,class:"font-[500] cursor-pointer"},at=l(()=>e("span",{class:"text-[#424040e0] font-[600]"},"HR-01-04",-1)),ot={key:2},it={key:4,class:"issue__reason"},rt=l(()=>e("span",null,"Bug",-1)),nt=[rt],dt=l(()=>e("div",{class:"issue__overflow"}," L\u1ED7i Upload \u1EA3nh khi dung l\u01B0\u1EE3ng > 25mb ",-1)),ct={key:6},ut={key:8,class:"flex items-center"},lt=l(()=>e("img",{class:"w-8 h-8 rounded-full mr-3",src:D,alt:""},null,-1)),_t=l(()=>e("div",null,"V\u0169 V\u0103n \u0110\u1EA1t",-1)),pt=[lt,_t],xt={key:9,class:"flex items-center"},ht=l(()=>e("img",{class:"w-8 h-8 rounded-full mr-3",src:D,alt:""},null,-1)),ft=l(()=>e("div",null,"Nguy\u1EC5n Vi\u1EC7t Ho\xE0ng",-1)),Et=[ht,ft],vt={key:10},gt={class:"cursor-pointer text-[#44546f] font-[700] text-[1.1rem]"},mt={class:"cursor-pointer text-[#216E4E] font-[700] text-[1.1rem]"},yt={class:"cursor-pointer text-[#0055CC] font-[700] text-[1.1rem]"},It={class:"cursor-pointer text-[#42526E] font-[500] text-[1.3rem]"},kt={class:"cursor-pointer text-[#BF2600] font-[500] text-[1.3rem]"},wt={class:"cursor-pointer text-[#42526E] font-[500] text-[1.3rem]"},Ct=b({__name:"index",setup(f){const i=B({loading:!1,noDataText:"No data",pagination:{totalPage:0,page:1},data:[1,2,3,4,5,6],columns:[{title:"Project Task",dataIndex:"project",width:100,fixed:"left"},{title:"Bug Code",dataIndex:"bugcode",width:50},{title:"Title Bug",dataIndex:"titlebug",width:80},{title:"Reason bug",dataIndex:"reason",width:40},{title:"Priority",dataIndex:"priority",width:50},{title:"Classify",dataIndex:"classify",width:50},{title:"Content Bug",dataIndex:"contentbug",width:100},{title:"Bug Repeat",dataIndex:"bugrepeat",width:50},{title:"Reviewer",dataIndex:"reviewer",width:50},{title:"Status",dataIndex:"status",width:50},{title:"Assignee",dataIndex:"assignee",width:70},{title:"Log Date",dataIndex:"logdate",width:50},{title:"Fix Date",dataIndex:"fixdate",width:50}]}),x=w(""),g=w("");P(()=>{N()});function S(){g.value=""}async function N(){const r={pageIndex:1,pageSize:10},d=await K.getIssue(r);d.status==="SUCCESS"&&(i.data=d.data)}function T(r){const d=new Date,s=new Date(r);return d<s}const m=r=>r?H(r).format("DD-MM-YYYY"):"",y=r=>{if(r==="NOT_STARTED")return"NOT STARTED";if(r==="PENDING")return"PENDING";if(r==="PROCESSING")return"PROCESSING";if(r==="COMPLETED")return"COMPLETED";if(r==="CANCELED")return"CANCELED"};return(r,d)=>(t(),c("div",J,[e("div",Q,[e("div",W,[e("div",X,[_(a(A),{value:g.value,"onUpdate:value":d[0]||(d[0]=s=>g.value=s),style:{width:"300px"},placeholder:"Search ..."},null,8,["value"]),e("div",Z,[a(O.exports.isEmpty)(x.value)?(t(),u(a(L),{key:0,class:"text-[1.4rem]"})):(t(),u(a(j),{key:1,onClick:d[1]||(d[1]=s=>S()),class:"text-[1.4rem]"}))])]),_(a(R),{trigger:["click"]},{overlay:o(()=>[tt]),default:o(()=>[_(a(C),{class:"btn__filter",onClick:d[2]||(d[2]=V(()=>{},["prevent"]))},{default:o(()=>[_(a(z)),v(" Filter ")]),_:1})]),_:1})]),e("div",null,[_(a(C),{type:"primary"},{default:o(()=>[_(a(q)),v(" Create Issue")]),_:1})])]),e("div",et,[_(a(G),{columns:i.columns,"data-source":i.data,class:"custom-table",scroll:{x:2500,y:480}},{bodyCell:o(({column:s,record:I})=>[s.dataIndex==="project"?(t(),c("div",st,"Tim ki\u1EBFm task \u0111\xE3 ho\xE0n th\xE0nh")):n("",!0),s.dataIndex==="bugcode"?(t(),u(a(p),{key:1,color:"#FFE2DD"},{default:o(()=>[at]),_:1})):n("",!0),s.dataIndex==="priority"?(t(),c("div",ot,"Low")):n("",!0),s.dataIndex==="classify"?(t(),c(k,{key:3},[v(" GUI ")],64)):n("",!0),s.dataIndex==="reason"?(t(),c("div",it,nt)):n("",!0),s.dataIndex==="titlebug"?(t(),u(a(M),{key:5},{title:o(()=>[v("L\u1ED7i Upload \u1EA3nh khi dung l\u01B0\u1EE3ng > 25mb")]),default:o(()=>[dt]),_:1})):n("",!0),s.dataIndex==="contentbug"?(t(),c("div",ct,"L\u1ED7i Upload \u1EA3nh khi dung l\u01B0\u1EE3ng > 25mb")):n("",!0),s.dataIndex==="bugrepeat"?(t(),c(k,{key:7},[v(" 0 ")],64)):n("",!0),s.dataIndex==="reviewer"?(t(),c("div",ut,pt)):n("",!0),s.dataIndex==="assignee"?(t(),c("div",xt,Et)):n("",!0),s.dataIndex==="status"?(t(),c("div",vt,[I.projectStatus==="NOT_STARTED"?(t(),u(a(p),{key:0,color:"#DFE1E6",class:"cursor-pointer"},{default:o(()=>[e("span",gt,h(y("NOT_STARTED")),1)]),_:1})):I.projectStatus==="CANCELED"?(t(),u(a(p),{key:1,color:"#DFFCF0",class:"cursor-pointer"},{default:o(()=>[e("span",mt,h(y("CANCELED")),1)]),_:1})):(I.projectStatus,t(),u(a(p),{key:2,color:"#DEEBFF",class:"cursor-pointer"},{default:o(()=>[e("span",yt,h(y("PENDING")),1)]),_:1}))])):n("",!0),s.dataIndex==="logdate"?(t(),c(k,{key:11},[T("09-08-2023")?(t(),u(a(p),{key:0,color:"#F4F5F7",class:"cursor-pointer"},{default:o(()=>[e("span",It,h(m("09-08-2023")),1)]),_:1})):(t(),u(a(p),{key:1,color:"#FFEBE6",class:"cursor-pointer"},{default:o(()=>[e("span",kt,h(m("09-08-2023")),1)]),_:1}))],64)):n("",!0),s.dataIndex==="fixdate"?(t(),u(a(p),{key:12,color:"#F4F5F7",class:"cursor-pointer"},{default:o(()=>[e("span",wt,h(m("09-08-2023")),1)]),_:1})):n("",!0)]),_:1},8,["columns","data-source"])])]))}});var Tt=F(Ct,[["__scopeId","data-v-2ccfb175"]]);export{Tt as default};