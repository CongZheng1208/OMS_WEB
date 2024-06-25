import{a as e,p as t,c as a}from"./utils-CCWp7rz6.js";import i from"./TimeCyclesDefaultPage-Ca0DJ2TQ.js";import s from"./LegPhaseOperation-H4N68VMB.js";import{n}from"./index-BqV8YcGQ.js";import"./index-CLjfCghb.js";import"./index-D8OW3JgT.js";const r={};var o=n({name:"DefaultResetPage",components:{TimeCycles:i,LegPhaseOperation:s},data:()=>({displaySelected:"TimeCycles"}),methods:{changeRadio:e,printPage:t,customSortMethodForProgressColumn:a,changeRadioAndPush(e){this.displaySelected=e,this.$router.push({name:e})}}},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{"background-color":"rgb(45, 45, 45)"}},[a("el-header",{attrs:{height:"9vh"}},[a("el-row",{staticStyle:{width:"100%"}},[a("el-col",{attrs:{span:3}},[a("div",{staticClass:"el-header-title"},[e._v(" Select Option ")])]),a("el-col",{attrs:{span:5}},[a("div",{staticClass:"el-header-radios"},[a("div",{staticClass:"radio",on:{click:function(t){return e.changeRadioAndPush("TimeCycles")}}},[a("input",{attrs:{type:"radio",name:"reset-radio"},domProps:{checked:"TimeCycles"==e.displaySelected}}),a("span",[e._v("Time Cycle")])]),a("div",{staticClass:"radio",on:{click:function(t){return e.changeRadioAndPush("FlightLegAndPhase")}}},[a("input",{attrs:{type:"radio",name:"reset-radio"},domProps:{checked:"FlightLegAndPhase"==e.displaySelected}}),a("span",[e._v("Flight Leg/Phase Operation")])])])]),a("el-col",{attrs:{span:5}},[a("div",{staticClass:"el-header-radios"},[a("div",{staticClass:"radio",on:{click:function(t){return e.changeRadioAndPush("EngineBalance")}}},[a("input",{attrs:{type:"radio",name:"retrieval-radio"},domProps:{checked:"EngineBalance"==e.displaySelected}}),a("span",[e._v("Engine Trim Balance")])]),a("div",{staticClass:"radio",on:{click:function(t){return e.changeRadioAndPush("OtherFunctions")}}},[a("input",{attrs:{type:"radio",name:"reset-radio"},domProps:{checked:"OtherFunctions"==e.displaySelected}}),a("span",[e._v("Other Function")])])])]),a("el-col",{attrs:{span:11}})],1)],1),a("el-main",[a("el-row",{attrs:{gutter:1}},[a("router-view")],1)],1),a("el-footer",[a("div",[a("button",{staticClass:"footer-btn",on:{click:e.printPage}},[e._v("PRINT")])]),a("div",["TimeCycles"==e.displaySelected?a("button",{staticClass:"footer-btn"},[e._v("RETRIEVAL ALL")]):e._e()])])],1)}),[],!1,c,"35d71bda");function c(e){for(let t in r)this[t]=r[t]}const d=function(){return o.exports}();export{d as default};