import{a1 as t}from"./index.675d893b.js";class e{async getDayoff(a){return(await t.get("api/v1/dayoff",{params:a})).data}async postDayoff(a){return(await t.post("api/v1/dayoff",a)).data}async putDayoff(a){return(await t.put("api/v1/dayoff/update-approved-status",a)).data}}const f=new e;export{f as d};