import{_ as j}from"./default-wg-member.0c90e88f.js";import{_ as V,d as Y,a2 as q,r,b as W,o as $,P as H,s as N,u as J,c as n,e as d,f as e,g as _,w as c,h as l,B as X,D as Q,z as E,A as Z,H as tt,p as et,j as st,x as k,C as i,K as u,q as p,a3 as f,X as h,W as at,R as ot,t as nt}from"./index.675d893b.js";import{y as rt}from"./yourworkService.b5aaeb7e.js";import{p as ct}from"./projectService.fc7345ac.js";import{t as lt}from"./taskService.4b678c86.js";const x=y=>(et("data-v-746cb4f4"),y=y(),st(),y),it={class:"yourwork"},dt={class:"project"},ut={class:"flex justify-between items-center mb-4"},pt=x(()=>e("h1",{class:"project__title"},"Projects",-1)),_t={class:"show-all-show-less"},ft=["onClick"],kt=x(()=>e("div",{class:"project__blur"},[e("img",{src:"https://hoondea.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10425&avatarType=project",alt:""})],-1)),xt={class:"project__des"},vt={class:"project__des--name uppercase mb-2"},ht=x(()=>e("div",{class:"project__link"},null,-1)),yt={class:"taskwork"},gt=x(()=>e("div",null,[e("h1",{class:"project__title"},"Tasks")],-1)),St={key:0,class:"text-[#209653] font-[500]"},Et=["onClick"],Ct={class:"text-[500]"},mt={class:"cursor-pointer text-[#42526E] font-[500] text-[1.3rem]"},Dt={key:3,class:"flex items-center"},It=x(()=>e("img",{class:"w-8 h-8 rounded-full mr-3",src:j,alt:""},null,-1)),Tt={key:4,class:"flex items-center"},wt=x(()=>e("img",{class:"w-8 h-8 rounded-full mr-3",src:j,alt:""},null,-1)),Nt={class:"cursor-pointer text-[#42526E] font-[500] text-[1.3rem]"},jt={class:"cursor-pointer text-[#BF2600] font-[500] text-[1.3rem]"},At={class:"cursor-pointer text-[#44546f] font-[700] text-[1.1rem]"},Ot={class:"cursor-pointer text-[#8eb4ea] font-[700] text-[1.1rem]"},Pt={class:"cursor-pointer text-[#FFB7A0] font-[700] text-[1.1rem]"},Ft={class:"cursor-pointer text-[#897ec1] font-[700] text-[1.1rem]"},bt=Y({__name:"index",setup(y){const{emitEvent:A}=q(),C=r({id:0,projectId:0,priority:"LOW",content:"",taskCode:"",workCd:"",status:"NOT_STARTED",assigneeId:0,assginorId:0,effort:0,startDate:"",deadLine:"",process:0,actualStartDate:"",actualEndDate:"",sprint:0,parentId:0,workType:"CODING",category:"MOCKUP",description:"",taskAttachmentList:[{fileAttachUrl:""}],taskActivityList:[{content:""}]}),O=r(!1),m=r({}),P=r([]),v=W({loading:!1,noDataText:"No data",pagination:{totalPage:0,page:1},data:[],columns:[{title:"Key",dataIndex:"key",width:50,fixed:"left"},{title:"Task",key:"task",dataIndex:"task",width:"250px"},{title:"Category",key:"category",dataIndex:"category",width:"60px"},{title:"Assignee",key:"assignee",dataIndex:"assignee",width:"120px"},{title:"Due date",key:"due",dataIndex:"due",width:"100px"},{title:"Assignor",key:"assignor",dataIndex:"assignor",width:"120px"},{title:"Status",key:"status",dataIndex:"status",width:"70px"}]});r(2),$(()=>{L(),R(),b();const t=localStorage.getItem("userInfo");t&&(m.value=JSON.parse(t),console.log(m.value))});function F(t){return t.length<=35?t:t.substring(0,35-3)+" ..."}async function b(){const t={pageIndex:1,pageSize:100},o=await H.getLisrUser(t),s=N.exports.map(o.data.data,a=>({value:a.id,label:a.fullName}));P.value=s}const D=r([]);async function L(){const t=await ct.projectYourWork();t.status==="SUCCESS"&&(D.value=t.data)}r([]);async function R(){const t={pageIndex:1,pageSize:100},o=await rt.getListTask(t);o.status==="SUCCESS"&&(v.data=o.data.data,v.pagination.totalPage=o.data.totalPages,v.pagination.page=o.data.pageIndex)}async function B(t){O.value=!0;const o=await lt.taskDetail(t);if(o.status==="SUCCESS"){const s=o.data;C.value=N.exports.cloneDeep(s),C.value.projectId=s.projectDto.projectId}}r(null),r(""),r(!1),r(!0),r("Action");const g=r(!1);function M(){g.value=!g.value}function S(t){return t==="NOT_STARTED"?"NOT STARTED":t==="PENDING"?"PENDING":t==="PROCESSING"?"PROCESSING":t==="COMPLETED"?"COMPLETED":t==="CANCELED"?"CANCELED":""}const I=r();r(!1);const G=J();function U(t,o,s){A("NAME_PROJECT",{name:t,id:o}),G.push({name:ot.TASKS,params:{id:o,key:s}})}function z(t){const o=new Date,s=new Date(t);return o<s}function T(t){return t?nt(t).format("DD-MM-YYYY"):""}const K=t=>{if(t==="MOCKUP")return"Mockup";if(t==="DESIGN")return"CR"};return(t,o)=>(n(),d("div",it,[e("div",dt,[e("div",ut,[pt,_(l(X),{onClick:o[0]||(o[0]=s=>M()),class:""},{default:c(()=>[k(i(g.value?"Hide All":"View All"),1)]),_:1})]),e("div",_t,[e("div",{class:Q(["project__contain",{"show-all":g.value}])},[(n(!0),d(E,null,Z(D.value,s=>(n(),d("div",{class:"project__me",key:"project"+s.id,onClick:a=>U(s.key,s.id,s.name)},[kt,e("div",xt,[e("h3",vt,i(s.key),1),e("p",null,i(s.type),1),ht])],8,ft))),128))],2)])]),e("div",yt,[gt,_(l(tt),{columns:v.columns,"data-source":v.data,class:"custom-table",scroll:{x:1500,y:480}},{bodyCell:c(({column:s,record:a})=>[s.dataIndex==="key"?(n(),d("div",St,i(a.taskCode),1)):u("",!0),s.dataIndex==="task"?(n(),d("div",{key:1,class:"cursor-pointer",onClick:w=>B(a.id)},[e("span",Ct,i(F(a.content)),1)],8,Et)):u("",!0),s.dataIndex==="category"?(n(),p(l(f),{key:2,color:"#F4F5F7",class:"cursor-pointe"},{default:c(()=>[e("span",mt,i(K(a.category)),1)]),_:2},1024)):u("",!0),s.dataIndex==="assignee"?(n(),d("div",Dt,[It,e("span",null,i(a.assignee),1)])):u("",!0),s.dataIndex==="assignor"?(n(),d("div",Tt,[wt,e("span",null,i(a.assignor),1)])):u("",!0),s.dataIndex==="due"?(n(),d(E,{key:5},[z(a.dueDate)?(n(),p(l(f),{key:0,color:"#F4F5F7",class:"cursor-pointer"},{default:c(()=>[e("span",Nt,i(T(a.dueDate)),1)]),_:2},1024)):(n(),p(l(f),{key:1,color:"#FFEBE6",class:"cursor-pointer"},{default:c(()=>[e("span",jt,i(T(a.dueDate)),1)]),_:2},1024))],64)):u("",!0),s.dataIndex==="status"?(n(),d(E,{key:6},[a.projectStatus==="NOT_STARTED"?(n(),p(l(f),{key:0,color:"#DFE1E6",class:"cursor-pointer text-black"},{default:c(()=>[e("span",At,i(S(a.projectStatus)),1)]),_:2},1024)):a.projectStatus==="PENDING"?(n(),p(l(f),{key:1,color:"#EBF4FF",class:"cursor-pointer text-black"},{default:c(()=>[e("span",Ot,i(S(a.projectStatus)),1)]),_:2},1024)):a.projectStatus==="COMPLETED"?(n(),p(l(f),{key:2,color:"#FFF1EE",class:"cursor-pointer"},{default:c(()=>[e("span",Pt,i(S(a.projectStatus)),1)]),_:2},1024)):a.projectStatus==="PROCESSING"?(n(),p(l(f),{key:3,color:"#F0EEFB",class:"cursor-pointer"},{default:c(()=>[e("span",Ft,i(S(a.projectStatus)),1)]),_:2},1024)):u("",!0)],64)):u("",!0),s.dataIndex==="action"?(n(),p(l(at),{key:7,value:I.value,"onUpdate:value":o[1]||(o[1]=w=>I.value=w),class:"w-full"},{default:c(()=>[_(l(h),{value:"NOT_STARTED"},{default:c(()=>[k("Not Started")]),_:1}),_(l(h),{value:"PENDING"},{default:c(()=>[k("Pending")]),_:1}),_(l(h),{value:"PROCESSING"},{default:c(()=>[k("Processing")]),_:1}),_(l(h),{value:"COMPLETED"},{default:c(()=>[k("Completed")]),_:1}),_(l(h),{value:"CANCELED"},{default:c(()=>[k("Canceled")]),_:1})]),_:1},8,["value"])):u("",!0)]),_:1},8,["columns","data-source"])])]))}});var Ut=V(bt,[["__scopeId","data-v-746cb4f4"]]);export{Ut as default};