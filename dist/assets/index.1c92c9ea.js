import{h as $,d as ne,s as le,ah as _e,b4 as de,r as _,n as be,e as j,a7 as ye,j as ge,c as t,S as L,f as he,av as xe,v as ve,Y as Ce,m as pe,dm as z,y as A,p as me,z as M,B as se,E as n,H as I,F as a,C as o,G as J,N as r,bx as d,dn as Ue,O as h,bw as W,R as X,bz as H,by as Se,bp as K,W as Ie,X as we,bt as q,x as re,aJ as De,b2 as Ne,V as Le,M as ke,dp as Oe}from"./index.c4cb38d7.js";import{_ as Z}from"./calender.04ec6997.js";import{a as Ee,U as Ae}from"./index.72de26d3.js";import{C as Me}from"./index.1c91619c.js";import{T as oe}from"./index.9b67387b.js";import{h as Be}from"./moment.9709ab41.js";import{D as Re}from"./index.680dd0b6.js";import{D as Te}from"./DeleteOutlined.c4fda73e.js";import{P as Ye}from"./PlusOutlined.95922b67.js";import"./index.85d2ea9b.js";import"./useRefs.bf6a2efb.js";import"./index.a795468b.js";var ue=function(){return null};ue.isSelectOption=!0;ue.displayName="AAutoCompleteOption";var V=ue,ie=function(){return null};ie.isSelectOptGroup=!0;ie.displayName="AAutoCompleteOptGroup";var ae=ie;function $e(m){var i,x;return((i=m==null?void 0:m.type)===null||i===void 0?void 0:i.isSelectOption)||((x=m==null?void 0:m.type)===null||x===void 0?void 0:x.isSelectOptGroup)}var Pe=function(){return $($({},le(_e(),["loading","mode","optionLabelProp","labelInValue"])),{dataSource:Array,dropdownMenuStyle:{type:Object,default:void 0},dropdownMatchSelectWidth:{type:[Number,Boolean],default:!0},prefixCls:String,showSearch:{type:Boolean,default:void 0},transitionName:String,choiceTransitionName:{type:String,default:"zoom"},autofocus:{type:Boolean,default:void 0},backfill:{type:Boolean,default:void 0},filterOption:{type:[Boolean,Function],default:!1},defaultActiveFirstOption:{type:Boolean,default:!0}})},te=ne({name:"AAutoComplete",inheritAttrs:!1,props:Pe(),slots:["option"],setup:function(i,x){var c=x.slots,B=x.attrs,k=x.expose;de(!("dataSource"in c),"AutoComplete","`dataSource` slot is deprecated, please use props `options` instead."),de(!("options"in c),"AutoComplete","`options` slot is deprecated, please use props `options` instead.");var C=_(),D=function(){var v,N=xe((v=c.default)===null||v===void 0?void 0:v.call(c)),l=N.length?N[0]:void 0;return l},P=function(){var v;(v=C.value)===null||v===void 0||v.focus()},R=function(){var v;(v=C.value)===null||v===void 0||v.blur()};k({focus:P,blur:R});var F=be("select",i),w=F.prefixCls;return function(){var b,v,N,l,O=i.size,E=i.dataSource,T=i.notFoundContent,g=T===void 0?(v=c.notFoundContent)===null||v===void 0?void 0:v.call(c):T,f,u=B.class,Y=(b={},j(b,u,!!u),j(b,"".concat(w.value,"-lg"),O==="large"),j(b,"".concat(w.value,"-sm"),O==="small"),j(b,"".concat(w.value,"-show-search"),!0),j(b,"".concat(w.value,"-auto-complete"),!0),b);if(i.options===void 0){var G=((N=c.dataSource)===null||N===void 0?void 0:N.call(c))||((l=c.options)===null||l===void 0?void 0:l.call(c))||[];G.length&&$e(G[0])?f=G:f=E?E.map(function(S){if(ye(S))return S;switch(ge(S)){case"string":return t(V,{key:S,value:S},{default:function(){return[S]}});case"object":return t(V,{key:S.value,value:S.value},{default:function(){return[S.text]}});default:throw new Error("AutoComplete[dataSource] only supports type `string[] | Object[]`.")}}):[]}var Q=le($($($({},i),B),{mode:L.SECRET_COMBOBOX_MODE_DO_NOT_USE,getInputElement:D,notFoundContent:g,class:Y,ref:C}),["dataSource","loading"]);return t(L,Q,he({default:function(){return[f]}},le(c,["default","dataSource","options"])))}}}),ce=$(te,{Option:V,OptGroup:ae,install:function(i){return i.component(te.name,te),i.component(V.displayName,V),i.component(ae.displayName,ae),i}});const U=m=>(Ie("data-v-2e34caf3"),m=m(),we(),m),Fe={class:"box__container"},Ge={class:"box__wrap mb-10"},je={class:"box box__top"},qe={class:"box__title"},ze={class:"box__top--wrap"},Ve={class:"flex items-center justify-center w-[15rem]"},Qe={class:"box__img"},We=["src"],Xe=h(" Upload "),He={class:"w-full pl-10"},Je={style:{"font-weight":"bold"}},Ke={class:"box box__top"},Ze=U(()=>n("h3",{class:"box__title"},"Main Info",-1)),ea={class:"flex mb-3 justify-between w-full pr-[2.2rem]"},aa={class:"w-1/2"},ta=U(()=>n("label",{for:"",class:"mr-[10.6rem]"},"Gender",-1)),la=h("Male"),sa=h("Female"),oa={class:""},na=U(()=>n("label",{for:"",class:"mr-10"},"Birthday",-1)),ua=U(()=>n("img",{src:Z,alt:"",class:"calender__icon"},null,-1)),ia={style:{"font-weight":"bold"}},da={class:"flex mb-3 justify-between w-full pr-[2.2rem]"},ra=U(()=>n("label",{for:"",class:"mr-[9.8rem]"},"Sign day",-1)),ca=U(()=>n("img",{src:Z,alt:"",class:"calender__icon"},null,-1)),va=U(()=>n("label",{for:"",class:"mr-4"},"Quit day",-1)),pa=U(()=>n("img",{src:Z,alt:"",class:"calender__icon"},null,-1)),ma={class:"box mb-10"},fa=U(()=>n("h3",{class:"box__title"},"Other Info",-1)),_a={class:"flex"},ba={class:"w-[55%]"},ya={class:"mb-5"},ga=U(()=>n("h1",{class:"box__name"},"Banking",-1)),ha=U(()=>n("h1",{class:"box__name"},"University",-1)),xa={class:"box"},Ca=U(()=>n("h3",{class:"box__title"},"Contract",-1)),Ua={class:"w-1/2"},Sa=U(()=>n("img",{src:Z,alt:"",class:"calender__icon"},null,-1)),Ia={class:"w-1/2"},wa=h("Bank transfer"),Da=h("Receive directly"),Na={class:"box__save"},La=h(" Create account "),ka=h(" Update account "),Oa=ne({name:"index",props:{isLoading:{type:Boolean},isType:null,count:null,idUser:null,idCreate:null},emits:["refreshList"],setup(m,{emit:i}){const x=m,c=_(),B=[],k=[],C=_(B),D=_(k),P=[{title:"Address Banking",dataIndex:"banking",slots:{title:"customBanking",customRender:"banking"}},{title:"Account Name",dataIndex:"name",slots:{title:"customAccname",customRender:"name"}},{title:"Account Number",dataIndex:"number",slots:{title:"customNumber",customRender:"number"}},{title:"Status",dataIndex:"status",slots:{title:"customStatus",customRender:"status"},width:"10%"},{title:"Note",dataIndex:"note",slots:{title:"customNote",customRender:"note"},width:"10%"}],R=[{title:"Schools",dataIndex:"schools",slots:{title:"customSchools",customRender:"schools"}},{title:"Degree",dataIndex:"degree",slots:{title:"customDegree",customRender:"degree"}},{title:"Mode of study",dataIndex:"mode",slots:{title:"customMode",customRender:"mode"},width:"20%"},{title:"Graduation Year",dataIndex:"year",slots:{title:"customYear",customRender:"year"},width:"20%"},{title:"Description",dataIndex:"des",slots:{title:"customDes",customRender:"des"},width:"15%"}],{isLoading:F,isType:w,count:b,idUser:v,idCreate:N}=Ce(x),l=_({id:0,avatar:"https://i.pinimg.com/564x/43/f6/96/43f696508a59aadffaecac0b4aa2de45.jpg",userName:"",password:"",roleId:1,permissionTemplateId:1,companyEmail:"",fullName:"",shortName:"",gender:"MALE",birthday:"",personalEmail:"",phoneNumber:"",address:"",signDay:"",quitDay:"",identityCard:"",taxNumber:"",socialInsuranceId:"",marriedFlag:!0,childrenDescription:"",bankingList:[],universityList:[],contractList:[{contractName:"",contractNumber:"",contractType:0,salaryGross:0,salaryBasic:null,salaryCapacity:0,staffType:"Fulltime",departmentId:0,paymentMethod:"Bank",endDay:"",note:""}]});function O(){l.value={id:16,avatar:"https://i.pinimg.com/564x/43/f6/96/43f696508a59aadffaecac0b4aa2de45.jpg",userName:"",password:"",roleId:1,permissionTemplateId:1,companyEmail:"",fullName:"",shortName:"",gender:"MALE",birthday:"",personalEmail:"",phoneNumber:"",address:"",signDay:"",quitDay:"",identityCard:"",taxNumber:"",socialInsuranceId:"",marriedFlag:!0,childrenDescription:"",bankingList:[],universityList:[],contractList:[{contractName:"",contractNumber:"",contractType:0,salaryGross:0,salaryBasic:null,salaryCapacity:0,staffType:"Fulltime",departmentId:0,paymentMethod:"Bank",endDay:"",note:""}]},C.value=[{addressBanking:"",accountName:"",accountNumber:"",status:"",note:""}],D.value=[{schools:"",degreeLevel:0,modeOfStudy:"",graduationYear:"",description:""}]}const E=_([{value:1,label:"User"},{value:2,label:"Admin"}]),T=_([{value:0,label:"Thu viec"},{value:1,label:"Chinh thuc"}]),g=_([{value:"Parttime",label:"Parttime"},{value:"Fulltime",label:"Fulltime"}]),f=_([{value:0,label:"Developer"},{value:1,label:"QC/QA"},{value:2,label:"Business Analyst"},{value:3,label:"Product Manager"},{value:4,label:"DevOps"},{value:5,label:"Data Engineer"}]),u=_([]),Y=y=>{let s;!y||y.indexOf("@")>=0?s=[]:s=["gmail.com","fpt.edu.vn","qq.com"].map(e=>({value:`${y}@${e}`})),u.value=s},G=y=>{y.file.status!=="uploading"&&console.log(y.file,y.fileList),y.file.status==="done"?q.success(`${y.file.name} file uploaded successfully`):y.file.status==="error"&&q.error(`${y.file.name} file upload failed.`)};pe(b,(y,s)=>{w.value==="create"?O():Q(v.value)});async function Q(y){const s=await z.getDetailUser(y);if(s){const e=A.exports.cloneDeep(s.data);l.value=e;const p=l.value.bankingList,fe=l.value.universityList;C.value=A.exports.cloneDeep(p),C.value=A.exports.cloneDeep(fe)}}async function S(){l.value.bankingList=A.exports.cloneDeep(C.value),l.value.universityList=A.exports.cloneDeep(D.value),(await z.createUser(l.value)).status==="SUCCESS"&&(q.success("Create account successfull"),i("refreshList"))}async function ee(){(await z.updateAccount(l.value)).status==="SUCCESS"&&(q.success("Update account successfull"),i("refreshList"))}return me(()=>{w.value==="create"?O():Q(v.value)}),(y,s)=>(M(),se("div",Fe,[n("div",null,[n("div",Ge,[n("div",je,[n("h3",qe,"Account Info "+I(a(w)),1),n("div",ze,[n("div",Ve,[n("div",null,[n("div",Qe,[n("img",{src:l.value.avatar,alt:""},null,8,We)]),t(a(Ae),{"file-list":c.value,"onUpdate:file-list":s[0]||(s[0]=e=>c.value=e),name:"file",action:"https://www.mocky.io/v2/5cc8019d300000980a055e76",onChange:G},{default:o(()=>[t(a(J),null,{default:o(()=>[t(a(Ee)),Xe]),_:1})]),_:1},8,["file-list"]),t(a(r),{value:l.value.id,"onUpdate:value":s[1]||(s[1]=e=>l.value.id=e)},null,8,["value"])])]),n("div",He,[t(a(W),{model:l.value,"label-col":{span:10},"wrapper-col":{span:16}},{default:o(()=>[t(a(d),{label:"Employee ID",class:"mb-3"},{default:o(()=>[t(a(r),{value:l.value.userName,"onUpdate:value":s[2]||(s[2]=e=>l.value.userName=e)},null,8,["value"])]),_:1}),t(a(d),{label:"Password",class:"mb-3"},{default:o(()=>[t(a(Ue),{value:l.value.password,"onUpdate:value":s[3]||(s[3]=e=>l.value.password=e)},null,8,["value"])]),_:1}),t(a(d),{label:"Phone",class:"mb-3"},{default:o(()=>[t(a(r),{value:l.value.phoneNumber,"onUpdate:value":s[4]||(s[4]=e=>l.value.phoneNumber=e)},null,8,["value"])]),_:1}),t(a(d),{label:"Roles",class:"mb-3"},{default:o(()=>[t(a(L),{value:l.value.roleId,"onUpdate:value":s[5]||(s[5]=e=>l.value.roleId=e),options:E.value,placeholder:"please select your role"},null,8,["value","options"])]),_:1}),t(a(d),{label:"Permission Template",class:"mb-3"},{default:o(()=>[t(a(L),{value:l.value.permissionTemplateId,"onUpdate:value":s[6]||(s[6]=e=>l.value.permissionTemplateId=e),placeholder:"please select your permission",options:E.value},null,8,["value","options"])]),_:1}),t(a(d),{label:"Email Company",class:"mb-3"},{default:o(()=>[t(a(ce),{value:l.value.companyEmail,"onUpdate:value":s[7]||(s[7]=e=>l.value.companyEmail=e),options:u.value,onSearch:Y},{option:o(({value:e})=>[h(I(e.split("@")[0])+" @ ",1),n("span",Je,I(e.split("@")[1]),1)]),_:1},8,["value","options"])]),_:1})]),_:1},8,["model"])])])]),n("div",Ke,[Ze,t(a(W),{model:l.value,"label-col":{span:7},"wrapper-col":{span:16}},{default:o(()=>[t(a(d),{label:"Fullname",class:"mb-3"},{default:o(()=>[t(a(r),{value:l.value.fullName,"onUpdate:value":s[8]||(s[8]=e=>l.value.fullName=e)},null,8,["value"])]),_:1}),t(a(d),{label:"Shortname",class:"mb-3"},{default:o(()=>[t(a(r),{value:l.value.shortName,"onUpdate:value":s[9]||(s[9]=e=>l.value.shortName=e)},null,8,["value"])]),_:1}),n("div",ea,[n("div",aa,[ta,t(a(L),{value:l.value.gender,"onUpdate:value":s[10]||(s[10]=e=>l.value.gender=e),placeholder:"please select your role"},{default:o(()=>[t(a(X),{value:"MALE"},{default:o(()=>[la]),_:1}),t(a(X),{value:"FEMALE"},{default:o(()=>[sa]),_:1})]),_:1},8,["value"])]),n("div",oa,[na,t(a(H),{value:l.value.birthday,"onUpdate:value":s[11]||(s[11]=e=>l.value.birthday=e),"value-format":"YYYY-MM-DD"},{suffixIcon:o(()=>[ua]),_:1},8,["value"])])]),t(a(d),{label:"Email Personal",class:"mb-3"},{default:o(()=>[t(a(ce),{value:l.value.personalEmail,"onUpdate:value":s[12]||(s[12]=e=>l.value.personalEmail=e),options:u.value,onSearch:Y},{option:o(({value:e})=>[h(I(e.split("@")[0])+" @ ",1),n("span",ia,I(e.split("@")[1]),1)]),_:1},8,["value","options"])]),_:1}),t(a(d),{label:"Address",class:"mb-3"},{default:o(()=>[t(a(r),{value:l.value.address,"onUpdate:value":s[13]||(s[13]=e=>l.value.address=e)},null,8,["value"])]),_:1}),n("div",da,[n("div",null,[ra,t(a(H),{value:l.value.signDay,"onUpdate:value":s[14]||(s[14]=e=>l.value.signDay=e),"value-format":"YYYY-MM-DD"},{suffixIcon:o(()=>[ca]),_:1},8,["value"])]),n("div",null,[va,t(a(H),{value:l.value.quitDay,"onUpdate:value":s[15]||(s[15]=e=>l.value.quitDay=e),"value-format":"YYYY-MM-DD"},{suffixIcon:o(()=>[pa]),_:1},8,["value"])])])]),_:1},8,["model"])])]),n("div",ma,[fa,n("div",_a,[t(a(W),{model:l.value,name:"normal_login",class:"login-form w-[45%]","label-col":{span:7},"wrapper-col":{span:16}},{default:o(()=>[t(a(d),{label:"ID Card",class:"mb-3"},{default:o(()=>[t(a(r),{value:l.value.identityCard,"onUpdate:value":s[16]||(s[16]=e=>l.value.identityCard=e)},null,8,["value"])]),_:1}),t(a(d),{label:"Tax Number",class:"mb-3"},{default:o(()=>[t(a(r),{value:l.value.taxNumber,"onUpdate:value":s[17]||(s[17]=e=>l.value.taxNumber=e)},null,8,["value"])]),_:1}),t(a(d),{label:"ID Social Insurance",class:"mb-3"},{default:o(()=>[t(a(r),{value:l.value.socialInsuranceId,"onUpdate:value":s[18]||(s[18]=e=>l.value.socialInsuranceId=e)},null,8,["value"])]),_:1}),t(a(d),{label:"Married",class:"mb-3"},{default:o(()=>[t(a(Me),{checked:l.value.marriedFlag,"onUpdate:checked":s[19]||(s[19]=e=>l.value.marriedFlag=e)},null,8,["checked"])]),_:1}),t(a(d),{label:"Children Description",class:"mb-3"},{default:o(()=>[t(a(Se),{value:l.value.childrenDescription,"onUpdate:value":s[20]||(s[20]=e=>l.value.childrenDescription=e)},null,8,["value"])]),_:1})]),_:1},8,["model"]),n("div",ba,[n("div",ya,[ga,t(a(oe),{dataSource:C.value,columns:P,pagination:!1},{banking:o(({record:e})=>[t(a(r),{value:e.addressBanking,"onUpdate:value":p=>e.addressBanking=p},null,8,["value","onUpdate:value"])]),name:o(({record:e})=>[t(a(r),{value:e.accountName,"onUpdate:value":p=>e.accountName=p},null,8,["value","onUpdate:value"])]),number:o(({record:e})=>[t(a(r),{value:e.accountNumber,"onUpdate:value":p=>e.accountNumber=p},null,8,["value","onUpdate:value"])]),status:o(({record:e})=>[t(a(r),{value:e.status,"onUpdate:value":p=>e.status=p},null,8,["value","onUpdate:value"])]),note:o(({record:e})=>[t(a(r),{value:e.note,"onUpdate:value":p=>e.note=p},null,8,["value","onUpdate:value"])]),_:1},8,["dataSource"])]),n("div",null,[ha,t(a(oe),{dataSource:D.value,columns:R,pagination:!1},{schools:o(({record:e})=>[t(a(r),{value:e.schools,"onUpdate:value":p=>e.schools=p},null,8,["value","onUpdate:value"])]),degree:o(({record:e})=>[t(a(r),{value:e.degreeLevel,"onUpdate:value":p=>e.degreeLevel=p},null,8,["value","onUpdate:value"])]),mode:o(({record:e})=>[t(a(r),{value:e.modeOfStudy,"onUpdate:value":p=>e.modeOfStudy=p},null,8,["value","onUpdate:value"])]),year:o(({record:e})=>[t(a(r),{value:e.graduationYear,"onUpdate:value":p=>e.graduationYear=p},null,8,["value","onUpdate:value"])]),des:o(({record:e})=>[t(a(r),{value:e.description,"onUpdate:value":p=>e.description=p},null,8,["value","onUpdate:value"])]),_:1},8,["dataSource"])])])])]),n("div",xa,[Ca,n("div",null,[t(a(W),{model:l.value,name:"normal_login",class:"login-form flex","label-col":{span:7},"wrapper-col":{span:16}},{default:o(()=>[n("div",Ua,[t(a(d),{label:"Contract Name",class:"mb-3"},{default:o(()=>[t(a(r),{value:l.value.contractList[0].contractName,"onUpdate:value":s[21]||(s[21]=e=>l.value.contractList[0].contractName=e)},null,8,["value"])]),_:1}),t(a(d),{label:"Contract Type",class:"mb-3"},{default:o(()=>[t(a(L),{value:l.value.contractList[0].contractType,"onUpdate:value":s[22]||(s[22]=e=>l.value.contractList[0].contractType=e),style:{width:"100%"},options:T.value},null,8,["value","options"])]),_:1}),t(a(d),{label:"Salary Basic",class:"mb-3"},{default:o(()=>[t(a(r),{value:l.value.contractList[0].salaryBasic,"onUpdate:value":s[23]||(s[23]=e=>l.value.contractList[0].salaryBasic=e),"overlay-class-name":"numeric-input"},null,8,["value"])]),_:1}),t(a(d),{label:"Staff Type",class:"mb-3"},{default:o(()=>[t(a(L),{value:l.value.contractList[0].staffType,"onUpdate:value":s[24]||(s[24]=e=>l.value.contractList[0].staffType=e),style:{width:"100%"},options:g.value},null,8,["value","options"])]),_:1}),t(a(d),{label:"End Day",class:"mb-3"},{default:o(()=>[t(a(H),{value:l.value.contractList[0].endDay,"onUpdate:value":s[25]||(s[25]=e=>l.value.contractList[0].endDay=e),"value-format":"YYYY-MM-DD"},{suffixIcon:o(()=>[Sa]),_:1},8,["value"])]),_:1}),t(a(d),{label:"Note",class:"mb-3"},{default:o(()=>[t(a(r),{value:l.value.contractList[0].note,"onUpdate:value":s[26]||(s[26]=e=>l.value.contractList[0].note=e)},null,8,["value"])]),_:1})]),n("div",Ia,[t(a(d),{label:"Contract Number",class:"mb-3"},{default:o(()=>[t(a(r),{value:l.value.contractList[0].contractNumber,"onUpdate:value":s[27]||(s[27]=e=>l.value.contractList[0].contractNumber=e)},null,8,["value"])]),_:1}),t(a(d),{label:"Salary Gross",class:"mb-3"},{default:o(()=>[t(a(r),{value:l.value.contractList[0].salaryGross,"onUpdate:value":s[28]||(s[28]=e=>l.value.contractList[0].salaryGross=e)},null,8,["value"])]),_:1}),t(a(d),{label:"Salary Capacity",class:"mb-3"},{default:o(()=>[t(a(r),{value:l.value.contractList[0].salaryCapacity,"onUpdate:value":s[29]||(s[29]=e=>l.value.contractList[0].salaryCapacity=e)},null,8,["value"])]),_:1}),t(a(d),{label:"Department",class:"mb-3"},{default:o(()=>[t(a(L),{value:l.value.contractList[0].departmentId,"onUpdate:value":s[30]||(s[30]=e=>l.value.contractList[0].departmentId=e),style:{width:"100%"},options:f.value},null,8,["value","options"])]),_:1}),t(a(d),{label:"Payment Method",class:"mb-3"},{default:o(()=>[t(a(L),{value:l.value.contractList[0].paymentMethod,"onUpdate:value":s[31]||(s[31]=e=>l.value.contractList[0].paymentMethod=e),style:{width:"100%"}},{default:o(()=>[t(a(X),{value:"Bank"},{default:o(()=>[wa]),_:1}),t(a(X),{value:"Receive"},{default:o(()=>[Da]),_:1})]),_:1},8,["value"])]),_:1})])]),_:1},8,["model"])])])]),n("div",Na,[a(w)==="create"?(M(),K(a(J),{key:0,class:"box__btn",size:"small",onClick:s[32]||(s[32]=e=>S())},{default:o(()=>[La]),_:1})):(M(),K(a(J),{key:1,class:"box__btn",size:"small",onClick:s[33]||(s[33]=e=>ee())},{default:o(()=>[ka]),_:1}))])]))}});var Ea=ve(Oa,[["__scopeId","data-v-2e34caf3"]]);const Aa={class:"page h-full"},Ma={class:"user__filter"},Ba={class:"user__search"},Ra={class:"user__icon"},Ta=h(" Create Account "),Ya={class:"content relative"},$a=["onClick"],Pa={key:0},Fa={class:"content__icon"},Ga=ne({name:"index",setup(m){const i=re({loading:!1,noDataText:"No data",pagination:{totalPage:0,page:1},data:[],columns:[{title:"No",width:"5%",dataIndex:"no",slots:{title:"customNo",customRender:"no"}},{title:"ID",dataIndex:"id",slots:{title:"customId",customRender:"id"},width:200},{title:"Fullname",dataIndex:"fullname",slots:{title:"customFullname",customRender:"fullname"}},{title:"Role",dataIndex:"role",slots:{title:"customRole",customRender:"role"},width:150},{title:"Phone",dataIndex:"phone",slots:{title:"customPhone",customRender:"phone"},width:150},{title:"Email",dataIndex:"email",slots:{title:"customEmail",customRender:"email"},width:200},{title:"Signday",dataIndex:"signday",slots:{title:"customSignday",customRender:"signday"},width:150},{dataIndex:"action",slots:{title:"customAction",customRender:"action"},width:"5%"}]}),x=_(!1),c=_(""),B=_(!1),k=_("none"),C=_("Create Account"),D=_(0),P=_(0),R=re({pageIndex:1,pageSize:20,keyword:""}),F=_(0);me(()=>{console.log("redirict list user..."),b()});const w=()=>{x.value=!0,C.value="Create Account",k.value="create",D.value++,console.log(typeof v())};async function b(){i.loading=!0;const g=await z.getLisrUser(R).finally(()=>{i.loading=!1});g&&(i.data=g.data.data)}function v(){const g=`${Math.floor(Math.random()*1e3)}`;if(i.data.find(u=>u.id===g))v();else return g}const N=g=>{ke.confirm({title:"Do you want to delete account?",icon:t(Oe),async onOk(){(await z.deleteUser(g)).status==="SUCCESS"&&(q.success("Delete successful!"),b())},onCancel(){}})},l=async g=>{x.value=!0,F.value=g,k.value="detail",C.value="Detail Account",D.value++},O=g=>Be(g).format("DD-MM-YYYY");pe(c,A.exports.debounce(()=>{R.keyword=c.value,b()},300));function E(){c.value=""}function T(){x.value=!1,b()}return(g,f)=>(M(),se("div",Aa,[n("div",Ma,[n("div",Ba,[t(a(r),{value:c.value,"onUpdate:value":f[0]||(f[0]=u=>c.value=u),style:{width:"300px"},placeholder:"Search by name, ID..."},null,8,["value"]),n("div",Ra,[a(A.exports.isEmpty)(c.value)?(M(),K(a(De),{key:0})):(M(),K(a(Ne),{key:1,onClick:f[1]||(f[1]=u=>E())}))])]),t(a(J),{class:"user__btn",size:"small",onClick:f[2]||(f[2]=u=>w())},{default:o(()=>[t(a(Ye)),Ta]),_:1})]),n("div",Ya,[t(a(oe),{dataSource:i.data,columns:i.columns,pagination:!1,loading:i.loading,scroll:{y:500}},{no:o(({record:u})=>[h(I(u.id),1)]),id:o(({record:u})=>[h(I(u.userName),1)]),fullname:o(({record:u})=>[n("div",{onClick:Y=>l(u.id),class:"cursor-pointer"},I(u.fullName),9,$a)]),role:o(({record:u})=>[u.role?(M(),se("div",Pa)):Le("",!0),h(" "+I(u.role),1)]),phone:o(({record:u})=>[h(I(u.phone),1)]),email:o(({record:u})=>[h(I(u.email),1)]),signday:o(({record:u})=>[h(I(O(u.signDay)),1)]),action:o(({record:u})=>[n("div",Fa,[t(a(Te),{onClick:Y=>N(u.id),style:{color:"white"}},null,8,["onClick"])])]),_:1},8,["dataSource","columns","loading"]),t(a(Re),{visible:x.value,"onUpdate:visible":f[4]||(f[4]=u=>x.value=u),class:"custom-class",title:C.value,placement:"right",width:"calc(100% - 213px)"},{default:o(()=>[t(Ea,{"is-loading":B.value,"is-type":k.value,count:D.value,"id-user":F.value,"id-create":P.value,onRefreshList:f[3]||(f[3]=u=>T())},null,8,["is-loading","is-type","count","id-user","id-create"])]),_:1},8,["visible","title","width"])])]))}});var at=ve(Ga,[["__scopeId","data-v-36ace55e"]]);export{at as default};
