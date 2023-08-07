import{_ as V}from"./avatar.630cbb23.js";import{_ as N}from"./calender.04ec6997.js";import{bk as z,v as W,d as M,x as P,r as _,k as $,p as q,z as H,B as F,E as t,c as s,F as o,dr as G,C as a,S as i,G as K,O as n,H as y,bo as X,N as h,R as c,by as Q,bz as C,W as Y,X as Z}from"./index.c4cb38d7.js";import{T as j,C as b,P as D}from"./index.9b67387b.js";import{D as ee}from"./index.680dd0b6.js";import{E as te}from"./index.a795468b.js";import{D as T}from"./DeleteOutlined.c4fda73e.js";import"./index.1c91619c.js";class ae{async getListProject(f){return(await z.get("api/v1/project",{params:f})).data}}const se=new ae;const d=m=>(Y("data-v-2ee95856"),m=m(),Z(),m),oe={class:"project h-full"},le={class:"project__head"},ne={class:"project__filter"},de=n(" Create project "),re={class:"project__wrap"},ue={class:"project__list"},ie=n(" Name "),ce=d(()=>t("img",{src:"https://hoondea.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10425&avatarType=project",alt:"",style:{width:"2.4rem",height:"2.4rem","border-radius":"2px","margin-right":"0.5rem"}},null,-1)),_e=d(()=>t("span",null," a ",-1)),ve=d(()=>t("span",null," Company ",-1)),pe=d(()=>t("img",{src:V,style:{width:"2.5rem",height:"2.5rem","border-radius":"50%","margin-right":"4px"}},null,-1)),me={class:"flex items-center justify-between"},fe={class:"project__action"},he=d(()=>t("p",null,"Content",-1)),xe=d(()=>t("p",null,"Move to trash",-1)),ke={class:"flex project__form"},ye={class:"w-1/2 mr-3"},je={class:"mb-4"},be=d(()=>t("label",{for:""},[n(" Project name "),t("span",{class:"text-red-600"},"*")],-1)),ge={class:"flex justify-between mb-4"},we={class:"w-1/2 mr-5"},Ie=d(()=>t("label",{for:""}," Project type ",-1)),Ue=n("Jack"),Re={class:"w-1/2"},Se=d(()=>t("label",{for:""},"Priority",-1)),Pe=n("Jack"),Ce={class:"flex justify-between w-full mb-4"},De={class:"w-1/2 mr-5"},Te=d(()=>t("label",{for:""},"Status",-1)),Ne=n("Jack"),Je={class:"w-1/2"},Ee=d(()=>t("label",{for:""},"Progress",-1)),Ae={class:"mb-4"},Be=d(()=>t("label",{for:""},"Note",-1)),Oe={class:"w-1/2 ml-3"},Le={class:"mb-4"},Ve=d(()=>t("label",{for:""},[n(" Project content "),t("span",{class:"text-red-600"},"*")],-1)),ze={class:"mb-4"},We=d(()=>t("label",{for:""},"Customer",-1)),Me={class:"mb-4"},$e=d(()=>t("label",{for:""},[n("Period "),t("span",{class:"text-red-600"},"*")],-1)),qe=d(()=>t("img",{src:N,alt:"",class:"calender__icon"},null,-1)),He=d(()=>t("span",{class:"mx-3"},"~",-1)),Fe=d(()=>t("img",{src:N,alt:"",class:"calender__icon"},null,-1)),Ge={class:"mb-4"},Ke=d(()=>t("label",{for:""},[n(" Original Estimate "),t("span",{class:"text-red-600"},"*")],-1)),Xe=d(()=>t("p",{class:"project__des"},[n(" An estimate of how much work remains until this issue will be resolved. "),t("br"),n(" The format of this is ' *w *d *h *m ' (representing weeks, days, hours and minutes - where * can be any number). "),t("br"),n(" Examples: 4d, 5h 30m, 60m and 3w. ")],-1)),Qe={class:"project__user"},Ye=n("Jack"),Ze=n("Jack"),et=n("Jack"),tt=n("Jack"),at={class:"project__user"},st=n("Jack"),ot=n("Jack"),lt=n("Jack"),nt=n("Jack"),dt=M({name:"index",setup(m){const f=P({loading:!1,noDataText:"No data",pagination:{totalPage:0,page:1},data:[],columns:[{dataIndex:"name",key:"name",slots:{title:"customTitle",customRender:"name"}},{title:"Key",dataIndex:"key",key:"key"},{title:"Type",dataIndex:"type",key:"type"},{title:"Lead",key:"lead",dataIndex:"lead",slots:{customRender:"lead"}},{title:"Status",key:"status",slots:{customRender:"status"}}]}),x=_([{value:"jack",label:"Jack"},{value:"lucy",label:"Lucy"},{value:"disabled",label:"Disabled",disabled:!0}]),g=_(""),k=_(!1),w=_("Type"),I=_("Priority"),U=_("Status"),r=_({project_name:"",project_content:"",project_type:"Company",priority:"Medium",customer:"",status:"New",progress:"",project_effort:"",estimated_effort:"",actual_effort:"",period:"",note:""}),J=[{dataIndex:"add",slots:{title:"customAdd",customRender:"add"},width:"5%"},{title:"User",dataIndex:"user",slots:{title:"customUser",customRender:"user"}},{title:"Department",dataIndex:"department",slots:{title:"customDepartment",customRender:"department"}},{title:"Effort",dataIndex:"effort",slots:{title:"customEffort",customRender:"effort"}},{title:"Role",dataIndex:"role",slots:{title:"customRole",customRender:"role"}},{dataIndex:"delete",slots:{title:"customDelete",customRender:"delete"},width:"5%"}],E=[{dataIndex:"add",slots:{title:"customAdd",customRender:"add"},width:100},{title:"Register day",dataIndex:"register",slots:{title:"customRegister",customRender:"register"}},{title:"Work CD",dataIndex:"work",slots:{title:"customWork",customRender:"work"}},{title:"Work Name",dataIndex:"workName",slots:{title:"customWorkname",customRender:"workName"}},{title:"Branch",dataIndex:"branch",slots:{title:"customBranch",customRender:"branch"}},{title:"Status",dataIndex:"status",slots:{title:"customStatus",customRender:"status"}},{title:"Project effort",dataIndex:"effort",slots:{title:"customEffort",customRender:"effort"}},{title:"Period",dataIndex:"period",slots:{title:"customPeriod",customRender:"period"}},{title:"Project effort",dataIndex:"effort",slots:{title:"customEffort",customRender:"effort"}},{dataIndex:"delete",slots:{title:"customDelete",customRender:"delete"},width:"5%"}],p=_([{index:1,user:"Nguyen Thanh A",department:"HR",effort:"25%",role:"Admin"},{index:2,user:"Nguyen Thanh B",department:"Developer",effort:"50%",role:"Leader"}]),A=$(()=>p.value.length+1),R=v=>{p.value=p.value.filter(l=>l.index!==v)},S=()=>{const v={index:A.value,user:"",department:"",effort:"",role:""};p.value.push(v)};q(()=>{L()});function B(){k.value=!0}const O=P({pageIndex:1,pageSize:20,keyword:""});async function L(){const v=await se.getListProject(O);v.status==="SUCCESS"&&(f.data=v.data.data)}return(v,l)=>(H(),F("div",oe,[t("div",le,[t("div",ne,[s(o(G),{value:g.value,"onUpdate:value":l[0]||(l[0]=e=>g.value=e),style:{width:"300px"},placeholder:"Search by name, ID..."},null,8,["value"]),s(o(i),{value:w.value,"onUpdate:value":l[1]||(l[1]=e=>w.value=e),options:x.value,class:"ml-5"},{suffixIcon:a(()=>[s(o(b),{style:{color:"#172b4d"}})]),_:1},8,["value","options"]),s(o(i),{value:I.value,"onUpdate:value":l[2]||(l[2]=e=>I.value=e),options:x.value,class:"ml-5"},{suffixIcon:a(()=>[s(o(b),{style:{color:"#172b4d"}})]),_:1},8,["value","options"]),s(o(i),{value:U.value,"onUpdate:value":l[3]||(l[3]=e=>U.value=e),options:x.value,class:"ml-5"},{suffixIcon:a(()=>[s(o(b),{style:{color:"#172b4d"}})]),_:1},8,["value","options"])]),s(o(K),{class:"project__create",onClick:l[4]||(l[4]=e=>B())},{default:a(()=>[de]),_:1})]),t("div",re,[t("div",ue,[s(o(j),{columns:f.columns,"data-source":f.data,pagination:!1},{customTitle:a(()=>[ie]),name:a(({text:e})=>[ce,n(" "+y(e),1)]),key:a(({})=>[_e]),type:a(({record:e})=>[ve]),lead:a(({record:e})=>[t("span",null,[pe,n(" "+y(e.lead),1)])]),status:a(({record:e})=>[t("div",me,[t("span",null,y(e.projectStatus),1),t("span",fe,[s(o(X),{trigger:"click",placement:"bottomRight"},{content:a(()=>[he,xe]),default:a(()=>[s(o(te),{style:{"font-size":"2.5rem"}})]),_:1})])])]),_:1},8,["columns","data-source"])])]),s(o(ee),{title:"Create Project",placement:"right",closable:!1,width:"70%",visible:k.value,"onUpdate:visible":l[14]||(l[14]=e=>k.value=e)},{default:a(()=>[t("div",ke,[t("div",ye,[t("div",je,[be,s(o(h),{value:r.value.project_name,"onUpdate:value":l[5]||(l[5]=e=>r.value.project_name=e)},null,8,["value"])]),t("div",ge,[t("div",we,[Ie,s(o(i),{ref:"select",value:r.value.project_type,"onUpdate:value":l[6]||(l[6]=e=>r.value.project_type=e)},{default:a(()=>[s(o(c),{value:"jack"},{default:a(()=>[Ue]),_:1})]),_:1},8,["value"])]),t("div",Re,[Se,s(o(i),{ref:"select",value:r.value.priority,"onUpdate:value":l[7]||(l[7]=e=>r.value.priority=e)},{default:a(()=>[s(o(c),{value:"jack"},{default:a(()=>[Pe]),_:1})]),_:1},8,["value"])])]),t("div",Ce,[t("div",De,[Te,s(o(i),{ref:"select",value:r.value.status,"onUpdate:value":l[8]||(l[8]=e=>r.value.status=e)},{default:a(()=>[s(o(c),{value:"jack"},{default:a(()=>[Ne]),_:1})]),_:1},8,["value"])]),t("div",Je,[Ee,s(o(h),{value:r.value.progress,"onUpdate:value":l[9]||(l[9]=e=>r.value.progress=e)},null,8,["value"])])]),t("div",Ae,[Be,s(o(Q),{value:r.value.note,"onUpdate:value":l[10]||(l[10]=e=>r.value.note=e),rows:5},null,8,["value"])])]),t("div",Oe,[t("div",Le,[Ve,s(o(h),{value:r.value.project_name,"onUpdate:value":l[11]||(l[11]=e=>r.value.project_name=e)},null,8,["value"])]),t("div",ze,[We,s(o(h),{value:r.value.customer,"onUpdate:value":l[12]||(l[12]=e=>r.value.customer=e)},null,8,["value"])]),t("div",Me,[$e,s(o(C),null,{suffixIcon:a(()=>[qe]),_:1}),He,s(o(C),null,{suffixIcon:a(()=>[Fe]),_:1})]),t("div",Ge,[Ke,s(o(h),{value:r.value.estimated_effort,"onUpdate:value":l[13]||(l[13]=e=>r.value.estimated_effort=e)},null,8,["value"]),Xe])])]),t("div",Qe,[s(o(j),{"data-source":p.value,columns:J,pagination:!1},{customAdd:a(()=>[t("div",{class:"cursor-pointer",onClick:S},[s(o(D))])]),key:a(({record:e})=>[]),user:a(({record:e})=>[s(o(i),{ref:"select",value:e.user,"onUpdate:value":u=>e.user=u},{default:a(()=>[s(o(c),{value:"jack"},{default:a(()=>[Ye]),_:1})]),_:2},1032,["value","onUpdate:value"])]),department:a(({record:e})=>[s(o(i),{ref:"select",value:e.department,"onUpdate:value":u=>e.department=u},{default:a(()=>[s(o(c),{value:"jack"},{default:a(()=>[Ze]),_:1})]),_:2},1032,["value","onUpdate:value"])]),effort:a(({record:e})=>[s(o(i),{ref:"select",value:e.effort,"onUpdate:value":u=>e.effort=u},{default:a(()=>[s(o(c),{value:"jack"},{default:a(()=>[et]),_:1})]),_:2},1032,["value","onUpdate:value"])]),role:a(({record:e})=>[s(o(i),{ref:"select",value:e.role,"onUpdate:value":u=>e.role=u},{default:a(()=>[s(o(c),{value:"jack"},{default:a(()=>[tt]),_:1})]),_:2},1032,["value","onUpdate:value"])]),delete:a(({record:e})=>[s(o(T),{onClick:u=>R(e.index)},null,8,["onClick"])]),_:1},8,["data-source"])]),t("div",at,[s(o(j),{"data-source":p.value,columns:E,pagination:!1,scroll:{x:1500,y:300}},{customAdd:a(()=>[t("div",{class:"cursor-pointer",onClick:S},[s(o(D))])]),key:a(({record:e})=>[]),user:a(({record:e})=>[s(o(i),{ref:"select",value:e.user,"onUpdate:value":u=>e.user=u},{default:a(()=>[s(o(c),{value:"jack"},{default:a(()=>[st]),_:1})]),_:2},1032,["value","onUpdate:value"])]),department:a(({record:e})=>[s(o(i),{ref:"select",value:e.department,"onUpdate:value":u=>e.department=u},{default:a(()=>[s(o(c),{value:"jack"},{default:a(()=>[ot]),_:1})]),_:2},1032,["value","onUpdate:value"])]),effort:a(({record:e})=>[s(o(i),{ref:"select",value:e.effort,"onUpdate:value":u=>e.effort=u},{default:a(()=>[s(o(c),{value:"jack"},{default:a(()=>[lt]),_:1})]),_:2},1032,["value","onUpdate:value"])]),role:a(({record:e})=>[s(o(i),{ref:"select",value:e.role,"onUpdate:value":u=>e.role=u},{default:a(()=>[s(o(c),{value:"jack"},{default:a(()=>[nt]),_:1})]),_:2},1032,["value","onUpdate:value"])]),delete:a(({record:e})=>[s(o(T),{onClick:u=>R(e.index)},null,8,["onClick"])]),_:1},8,["data-source"])])]),_:1},8,["visible"])]))}});var ft=W(dt,[["__scopeId","data-v-2ee95856"]]);export{ft as default};