import{_ as N}from"./avatar.630cbb23.js";import{_ as w}from"./calender.04ec6997.js";import{v as S,d as k,r as _,x as D,y as C,z as B,c as e,B as t,E as a,C as n,bB as f,bC as o,L as r,S as v,O as i,bD as M,U as P,V as A,N as m}from"./index.0ccb42f8.js";import"./index.31b2c84f.js";import{a as G,T as y}from"./TabPane.bdad3601.js";import{D as x}from"./dayjs.a273e5c4.js";import{T as g}from"./index.b876bf07.js";import"./index.db1014b5.js";import"./shallowequal.b882844e.js";import"./useRefs.fcffdf33.js";import"./PlusOutlined.00e4fc8b.js";import"./index.e3338342.js";const b=p=>(P("data-v-20fe244f"),p=p(),A(),p),E={class:"tabs"},O={class:"h-full"},V={class:"box__wrap mb-10"},j={class:"box box__top"},H=b(()=>n("h3",{class:"box__title"},"Account Info",-1)),F={class:"box__top--wrap"},K=b(()=>n("div",{class:"flex items-center justify-center w-[15rem]"},[n("div",null,[n("div",{class:"box__img"},[n("img",{src:N,alt:""})])])],-1)),Z={class:"w-full pl-10 account__field"},R=m("Member"),L=m("Zone two"),z=m("Member"),Q=m("Zone two"),Y={class:"box box__top"},q=b(()=>n("h3",{class:"box__title"},"Main Info",-1)),J={class:"flex"},W=m("Member"),X=m("Zone two"),$=b(()=>n("img",{src:w,alt:"",class:"calender__icon"},null,-1)),ee=m("Member"),ae=m("Zone two"),le={class:"flex"},se=m("Member"),te=m("Zone two"),de=b(()=>n("img",{src:w,alt:"",class:"calender__icon"},null,-1)),oe={class:"box mb-10"},ne=b(()=>n("h3",{class:"box__title"},"Other Info",-1)),ue={class:"flex account__field"},re={class:"w-[60%]"},ie={class:"mb-5"},me=b(()=>n("h1",{class:"box__name"},"Banking",-1)),be=b(()=>n("h1",{class:"box__name"},"University",-1)),ve={class:"contract"},pe={class:"contract__wrap"},_e=b(()=>n("h3",null,"Sign Day - 2022/03/01",-1)),fe=k({name:"index",setup(p){_("account006");const c=_("1"),u=D({conName:"SHHSG00392/33884",conType:"Thu viec",salaryBasic:"10.000.000 vnd",branch:"Nam Tu Liem",staffType:"Partime",endDay:"2023/05/05",note:"OK",conNumber:"ASIS2023",salaryGross:"12.000.000 vnd",salaryCap:"0",department:"Developer",payment:"Bank Transfer"}),U=[{banking:"Vietcombank",name:"Vu Van Dat",number:"1013876779",status:"On",note:""}],h=[{schools:"FPT",degree:"Cu nhan",mode:"4",year:"2023",des:""}],I=[{title:"Address Banking",dataIndex:"banking",key:"banking"},{title:"Account Name",dataIndex:"name",key:"name"},{title:"Account Number",dataIndex:"number",key:"number"},{title:"Status",dataIndex:"status",key:"status",width:"10%"},{title:"Note",dataIndex:"note",key:"note",width:"10%"}],T=[{title:"Schools",dataIndex:"schools",key:"schools"},{title:"Degree",dataIndex:"degree",key:"degree"},{title:"Mode of study",dataIndex:"mode",key:"mode",width:"20%"},{title:"Graduation Year",dataIndex:"year",key:"year",width:"20%"},{title:"Description",dataIndex:"des",key:"des",width:"15%"}],d=_({employid:"acc2",password:"acc2",role:"Member",permission:"Member",email_company:"nta@911.com",id_card:"0993377473",tax_number:"HHN88837NH",id_co:"0966337464",married:"no",children:0,fullname:"Nguyen Thanh A",shortname:"ant",gender:"Male",birthday:"09/04/2000",email_per:"abc@911.com",address:"Ha Noi",signday:"02/02/2022"});return _(),(ce,l)=>(C(),B("div",E,[e(a(G),{activeKey:c.value,"onUpdate:activeKey":l[28]||(l[28]=s=>c.value=s)},{default:t(()=>[e(a(y),{key:"1",tab:"PROFILE"},{default:t(()=>[n("div",O,[n("div",V,[n("div",j,[H,n("div",F,[K,n("div",Z,[e(a(f),{model:d.value,"label-col":{span:10},"wrapper-col":{span:16}},{default:t(()=>[e(a(o),{label:"Employee ID",class:"mb-4"},{default:t(()=>[e(a(r),{value:d.value.employid,"onUpdate:value":l[0]||(l[0]=s=>d.value.employid=s),bordered:!1,disabled:""},null,8,["value"])]),_:1}),e(a(o),{label:"Password",class:"mb-4"},{default:t(()=>[e(a(r),{value:d.value.password,"onUpdate:value":l[1]||(l[1]=s=>d.value.password=s),bordered:!1,disabled:""},null,8,["value"])]),_:1}),e(a(o),{label:"Roles",class:"mb-4"},{default:t(()=>[e(a(v),{value:d.value.role,"onUpdate:value":l[2]||(l[2]=s=>d.value.role=s),placeholder:"please select your role",disabled:"",bordered:!1},{default:t(()=>[e(a(i),{value:"shanghai"},{default:t(()=>[R]),_:1}),e(a(i),{value:"beijing"},{default:t(()=>[L]),_:1})]),_:1},8,["value"])]),_:1}),e(a(o),{label:"Permission Template",class:"mb-4"},{default:t(()=>[e(a(v),{value:d.value.permission,"onUpdate:value":l[3]||(l[3]=s=>d.value.permission=s),placeholder:"please select your permission",bordered:!1,disabled:""},{default:t(()=>[e(a(i),{value:"shanghai"},{default:t(()=>[z]),_:1}),e(a(i),{value:"beijing"},{default:t(()=>[Q]),_:1})]),_:1},8,["value"])]),_:1}),e(a(o),{label:"Email Company",class:"mb-4"},{default:t(()=>[e(a(r),{value:d.value.email_company,"onUpdate:value":l[4]||(l[4]=s=>d.value.email_company=s),bordered:!1,disabled:""},null,8,["value"])]),_:1})]),_:1},8,["model"])])])]),n("div",Y,[q,e(a(f),{model:d.value,"label-col":{span:7},"wrapper-col":{span:16}},{default:t(()=>[e(a(o),{label:"Fullname",class:"mb-3"},{default:t(()=>[e(a(r),{value:d.value.fullname,"onUpdate:value":l[5]||(l[5]=s=>d.value.fullname=s)},null,8,["value"])]),_:1}),e(a(o),{label:"Shortname",class:"mb-3"},{default:t(()=>[e(a(r),{value:d.value.password,"onUpdate:value":l[6]||(l[6]=s=>d.value.password=s)},null,8,["value"])]),_:1}),n("div",J,[e(a(o),{label:"Gender",class:"mb-3 w-1/2"},{default:t(()=>[e(a(v),{value:d.value.gender,"onUpdate:value":l[7]||(l[7]=s=>d.value.gender=s),placeholder:"please select your role"},{default:t(()=>[e(a(i),{value:"shanghai"},{default:t(()=>[W]),_:1}),e(a(i),{value:"beijing"},{default:t(()=>[X]),_:1})]),_:1},8,["value"])]),_:1}),e(a(o),{label:"Birthday",class:"mb-3 w-1/2 select__status"},{default:t(()=>[e(a(x),null,{suffixIcon:t(()=>[$]),_:1})]),_:1})]),e(a(o),{label:"Email Personal",class:"mb-3"},{default:t(()=>[e(a(v),{value:d.value.email_per,"onUpdate:value":l[8]||(l[8]=s=>d.value.email_per=s),placeholder:"please select your permission"},{default:t(()=>[e(a(i),{value:"shanghai"},{default:t(()=>[ee]),_:1}),e(a(i),{value:"beijing"},{default:t(()=>[ae]),_:1})]),_:1},8,["value"])]),_:1}),e(a(o),{label:"Address",class:"mb-3"},{default:t(()=>[e(a(r),{value:d.value.address,"onUpdate:value":l[9]||(l[9]=s=>d.value.address=s)},null,8,["value"])]),_:1}),n("div",le,[e(a(o),{label:"Sign Day",class:"mb-3 w-1/2"},{default:t(()=>[e(a(v),{value:d.value.signday,"onUpdate:value":l[10]||(l[10]=s=>d.value.signday=s),placeholder:"please select your role"},{default:t(()=>[e(a(i),{value:"shanghai"},{default:t(()=>[se]),_:1}),e(a(i),{value:"beijing"},{default:t(()=>[te]),_:1})]),_:1},8,["value"])]),_:1}),e(a(o),{label:"Quit Day",class:"mb-3 w-1/2 select__status"},{default:t(()=>[e(a(x),null,{suffixIcon:t(()=>[de]),_:1})]),_:1})])]),_:1},8,["model"])])]),n("div",oe,[ne,n("div",ue,[e(a(f),{model:d.value,name:"normal_login",class:"login-form w-[40%] mr-4","label-col":{span:9},"wrapper-col":{span:16}},{default:t(()=>[e(a(o),{label:"ID Card",class:"mb-4"},{default:t(()=>[e(a(r),{value:d.value.id_card,"onUpdate:value":l[11]||(l[11]=s=>d.value.id_card=s),bordered:!1,disabled:""},null,8,["value"])]),_:1}),e(a(o),{label:"Tax Number",class:"mb-4"},{default:t(()=>[e(a(r),{value:d.value.tax_number,"onUpdate:value":l[12]||(l[12]=s=>d.value.tax_number=s),bordered:!1,disabled:""},null,8,["value"])]),_:1}),e(a(o),{label:"ID Social Insurance",class:"mb-4"},{default:t(()=>[e(a(r),{value:d.value.id_co,"onUpdate:value":l[13]||(l[13]=s=>d.value.id_co=s),bordered:!1,disabled:""},null,8,["value"])]),_:1}),e(a(o),{label:"Married",class:"mb-4"},{default:t(()=>[e(a(r),{value:d.value.married,"onUpdate:value":l[14]||(l[14]=s=>d.value.married=s),bordered:!1,disabled:""},null,8,["value"])]),_:1}),e(a(o),{label:"Children Description",class:"mb-4"},{default:t(()=>[e(a(r),{value:d.value.children,"onUpdate:value":l[15]||(l[15]=s=>d.value.children=s),bordered:!1,disabled:""},null,8,["value"])]),_:1})]),_:1},8,["model"]),n("div",re,[n("div",ie,[me,e(a(g),{dataSource:U,columns:I,pagination:!1})]),n("div",null,[be,e(a(g),{dataSource:h,columns:T,pagination:!1})])])])])])]),_:1}),e(a(y),{key:"2",tab:"CONTRACT"},{default:t(()=>[n("div",ve,[n("div",pe,[_e,e(a(f),{ref:"formRef",name:"custom-validation",model:u,class:"grid grid-cols-2","label-col":{span:7},"wrapper-col":{span:16}},{default:t(()=>[e(a(o),{label:"Contract Name",name:"conName",class:"mb-4"},{default:t(()=>[e(a(r),{value:u.conName,"onUpdate:value":l[16]||(l[16]=s=>u.conName=s),disabled:"",bordered:!1},null,8,["value"])]),_:1}),e(a(o),{label:"Contract Type",name:"conType",class:"mb-4"},{default:t(()=>[e(a(r),{value:u.conType,"onUpdate:value":l[17]||(l[17]=s=>u.conType=s),disabled:"",bordered:!1},null,8,["value"])]),_:1}),e(a(o),{label:"Salary Basic",name:"salaryBasic",class:"mb-4"},{default:t(()=>[e(a(r),{value:u.salaryBasic,"onUpdate:value":l[18]||(l[18]=s=>u.salaryBasic=s),disabled:"",bordered:!1},null,8,["value"])]),_:1}),e(a(o),{label:"Branch",name:"branch",class:"mb-4"},{default:t(()=>[e(a(r),{value:u.branch,"onUpdate:value":l[19]||(l[19]=s=>u.branch=s),disabled:"",bordered:!1},null,8,["value"])]),_:1}),e(a(o),{label:"Staff Type",name:"staffType",class:"mb-4"},{default:t(()=>[e(a(r),{value:u.staffType,"onUpdate:value":l[20]||(l[20]=s=>u.staffType=s),disabled:"",bordered:!1},null,8,["value"])]),_:1}),e(a(o),{label:"End Day",name:"endDay",class:"mb-4"},{default:t(()=>[e(a(r),{value:u.endDay,"onUpdate:value":l[21]||(l[21]=s=>u.endDay=s),disabled:"",bordered:!1},null,8,["value"])]),_:1}),e(a(o),{label:"Contract Number",name:"conNumber",class:"mb-4"},{default:t(()=>[e(a(r),{value:u.conNumber,"onUpdate:value":l[22]||(l[22]=s=>u.conNumber=s),disabled:"",bordered:!1},null,8,["value"])]),_:1}),e(a(o),{label:"Salary Gross",name:"salaryGross",class:"mb-4"},{default:t(()=>[e(a(r),{value:u.salaryGross,"onUpdate:value":l[23]||(l[23]=s=>u.salaryGross=s),disabled:"",bordered:!1},null,8,["value"])]),_:1}),e(a(o),{label:"Salary Capacity",name:"salaryCap",class:"mb-4"},{default:t(()=>[e(a(r),{value:u.salaryCap,"onUpdate:value":l[24]||(l[24]=s=>u.salaryCap=s),disabled:"",bordered:!1},null,8,["value"])]),_:1}),e(a(o),{label:"Department",name:"department",class:"mb-4"},{default:t(()=>[e(a(r),{value:u.department,"onUpdate:value":l[25]||(l[25]=s=>u.department=s),disabled:"",bordered:!1},null,8,["value"])]),_:1}),e(a(o),{label:"Payment Method",name:"payment",class:"mb-4"},{default:t(()=>[e(a(r),{value:u.payment,"onUpdate:value":l[26]||(l[26]=s=>u.payment=s),disabled:"",bordered:!1},null,8,["value"])]),_:1}),e(a(o),{label:"Note",name:"note",class:"mb-4"},{default:t(()=>[e(a(M),{value:u.note,"onUpdate:value":l[27]||(l[27]=s=>u.note=s),disabled:"",bordered:!1},null,8,["value"])]),_:1})]),_:1},8,["model"])])])]),_:1})]),_:1},8,["activeKey"])]))}});var Ce=S(fe,[["__scopeId","data-v-20fe244f"]]);export{Ce as default};
