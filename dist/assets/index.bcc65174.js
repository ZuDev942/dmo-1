import{_ as R}from"./avatar.630cbb23.js";import{v as V,d as U,x as v,r as S,p as j,ds as E,y as h,m as B,z as a,B as n,E as c,c as m,F as r,N as M,bp as f,aJ as Y,b2 as z,C as i,W as F,X as $,O as u,H as o,I as b,G as N,V as l,Q as A,bt as q}from"./index.c4cb38d7.js";import{h as J}from"./moment.9709ab41.js";import{T as P}from"./index.9b67387b.js";import"./index.1c91619c.js";import"./index.a795468b.js";const x=y=>(F("data-v-22c0d39b"),y=y(),$(),y),L={class:"project h-full"},G={class:"project__head"},H={class:"project__filter"},Q={class:"user__search"},W={class:"user__icon"},X={class:"project__wrap"},K=u(" Fullname "),Z=x(()=>c("img",{src:"https://hoondea.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10425&avatarType=project",alt:"",style:{width:"2.4rem",height:"2.4rem","border-radius":"2px","margin-right":"0.5rem"}},null,-1)),ee=u(" Accept "),te=u("Reject"),ae={key:1},se={key:2},oe={key:3},ne={key:4},ie=x(()=>c("br",null,null,-1)),de=u(" Name "),re=x(()=>c("img",{src:"https://hoondea.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10425&avatarType=project",alt:"",style:{width:"2.4rem",height:"2.4rem","border-radius":"2px","margin-right":"0.5rem"}},null,-1)),le=x(()=>c("img",{src:R,style:{width:"2.5rem",height:"2.5rem","border-radius":"50%","margin-right":"4px"}},null,-1)),ce={key:1},ue={key:2},pe={key:3},_e={key:4},me=U({name:"index",setup(y){const p=v({loading:!1,noDataText:"No data",pagination:{totalPage:0,page:1},data:[],columns:[{dataIndex:"name",key:"name",slots:{title:"customTitle",customRender:"name"},width:"250px"},{title:"Username",dataIndex:"id",key:"id"},{title:"Reason",dataIndex:"reason",key:"reason",width:"250px"},{title:"Time",key:"time",dataIndex:"time"},{title:"Type",dataIndex:"type",key:"type",width:"200px"},{title:"Status",dataIndex:"status",key:"status",width:"200px"}]}),k=v({loading:!1,noDataText:"No data",pagination:{totalPage:0,page:1},data:[],columns:[{dataIndex:"name",key:"name",slots:{title:"customTitle",customRender:"name"},width:"250px"},{title:"Username",dataIndex:"id",key:"id"},{title:"Reason",dataIndex:"reason",key:"reason",width:"250px"},{title:"Time",key:"time",dataIndex:"time"},{title:"Type",dataIndex:"type",key:"type",width:"200px"},{title:"Status",dataIndex:"status",key:"status",width:"200px"}]});S("Accept");const _=S(""),T=v({pageIndex:1,pageSize:20,keyword:""});j(()=>{g()});async function g(){p.loading=!0;const s=await E.getDayoff(T).finally(()=>{p.loading=!1});s.status==="SUCCESS"&&(p.data=s.data.data,p.data=h.exports.filter(s.data.data,d=>d.status==="TO_APPROVE"),k.data=h.exports.filter(s.data.data,d=>d.status!=="TO_APPROVE"))}B(_,h.exports.debounce(()=>{T.keyword=_.value,g()},300));function D(){_.value=""}const C=s=>J(s).format("DD-MM-YYYY"),I=s=>s==="MATERNITY_LEAVE"?"Maternity leave":s==="UNPAID_LEAVE"?"Unpaid leave":"";async function w(s,d){const e={id:d,approveStatus:"ACCEPT",accountId:null};s===0&&(e.approveStatus="ACCEPT"),s===1&&(e.approveStatus="REJECT");const t=await E.putDayoff(e);console.log(t),t.status==="SUCCESS"&&(q.success("Update status absents successfull!"),g())}return(s,d)=>(a(),n("div",L,[c("div",G,[c("div",H,[c("div",Q,[m(r(M),{value:_.value,"onUpdate:value":d[0]||(d[0]=e=>_.value=e),style:{width:"300px"},placeholder:"Search by name..."},null,8,["value"]),c("div",W,[r(h.exports.isEmpty)(_.value)?(a(),f(r(Y),{key:0})):(a(),f(r(z),{key:1,onClick:d[1]||(d[1]=e=>D())}))])])])]),c("div",X,[m(r(P),{columns:p.columns,"data-source":p.data,pagination:!1,loading:p.loading},{customTitle:i(()=>[K]),name:i(({record:e})=>[Z,u(" "+o(e.fullName),1)]),bodyCell:i(({column:e,record:t})=>[e.key==="status"?(a(),n(b,{key:0},[m(r(N),{class:"text-[1.3rem] mr-5",onClick:O=>w(0,t.id)},{default:i(()=>[ee]),_:2},1032,["onClick"]),m(r(N),{class:"text-[1.3rem]",onClick:O=>w(1,t.id)},{default:i(()=>[te]),_:2},1032,["onClick"])],64)):l("",!0),e.key==="type"?(a(),n("span",ae,o(I(t.dayOffType)),1)):l("",!0),e.key==="id"?(a(),n("span",se,o(t.userName),1)):l("",!0),e.key==="reason"?(a(),n("span",oe,o(t.reason),1)):l("",!0),e.key==="time"?(a(),n("span",ne,o(C(t.time)),1)):l("",!0)]),_:1},8,["columns","data-source","loading"]),ie,m(r(P),{columns:k.columns,"data-source":k.data,pagination:!1,"show-header":!1},{customTitle:i(()=>[de]),name:i(({record:e})=>[re,u(" "+o(e.fullName),1)]),lead:i(({record:e})=>[c("span",null,[le,u(" "+o(e.lead),1)])]),bodyCell:i(({column:e,record:t})=>[e.key==="status"?(a(),n(b,{key:0},[t.status==="ACCEPT"?(a(),f(r(A),{key:0,color:"cyan"},{default:i(()=>[u(o(t.status),1)]),_:2},1024)):(a(),f(r(A),{key:1,color:"orange"},{default:i(()=>[u(o(t.status),1)]),_:2},1024))],64)):l("",!0),e.key==="type"?(a(),n("span",ce,o(I(t.dayOffType)),1)):l("",!0),e.key==="id"?(a(),n("span",ue,o(t.userName),1)):l("",!0),e.key==="reason"?(a(),n("span",pe,o(t.reason),1)):l("",!0),e.key==="time"?(a(),n("span",_e,o(C(t.time)),1)):l("",!0)]),_:1},8,["columns","data-source"])])]))}});var ve=V(me,[["__scopeId","data-v-22c0d39b"]]);export{ve as default};
