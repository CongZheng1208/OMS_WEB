import{C as t}from"./index-B9YNel-W.js";import{p as e,a as l,c as a}from"./utils-CCWp7rz6.js";import{n as r}from"./index-BqV8YcGQ.js";var i=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[l("el-header",{staticStyle:{height:"9vh"}},[l("el-row",{staticStyle:{width:"100%"}},[l("el-col",{attrs:{span:6}},[l("div",{staticClass:"el-header-radios"},[l("div",{staticClass:"el-header-subcontainer"},[t._v(" Event: "+t._s(t.currentEvent.Event)+" ")]),l("div",{staticClass:"el-header-subcontainer"},[t._v(" Date/Time: "+t._s(t.currentEvent.Time)+" ")])])]),l("el-col",{attrs:{span:4}},[l("div",{staticClass:"el-header-radios"},[l("div",{staticClass:"el-header-subcontainer"},[t._v(" ATA: "+t._s(t.currentEvent.ATA)+" ")]),l("div",{staticClass:"el-header-subcontainer"},[t._v(" Flight Leg: "+t._s(t.currentEvent.FlightLeg)+" ")])])]),l("el-col",{attrs:{span:11}},[l("div",{staticClass:"el-header-radios"},[l("div",{staticClass:"radio",on:{click:function(e){return t.changeRadio("summary")}}},[l("input",{attrs:{name:"event-param-display-radio",type:"radio"},domProps:{checked:"summary"==t.displaySelected}}),l("label",{staticClass:"form-check-label"},[t._v("Parameter Summary")])]),l("div",{staticClass:"radio",on:{click:function(e){return t.changeRadio("snapshot")}}},[l("input",{attrs:{name:"event-param-display-radio",type:"radio"},domProps:{checked:"snapshot"==t.displaySelected}}),l("label",{staticClass:"form-check-label"},[t._v("Parameter Snapshot")])])])]),l("el-col",{attrs:{span:3}},[l("Clock")],1)],1)],1),l("el-main",[l("el-row",{attrs:{gutter:2}},["summary"==t.displaySelected?l("el-row",{staticStyle:{border:"0.5px solid rgb(111, 111, 111)"}},[l("el-table",{staticStyle:{"background-color":"rgb(46, 45, 45)"},attrs:{"highlight-current-row":"",height:"70vh","sort-method":t.customSortMethodForProgressColumn,"header-cell-style":{background:"#404040",color:"#FFFFFF",font:"14px"},"empty-text":"NO ASSOCIATED PARAMETERS"}},[l("el-table-column",{attrs:{width:null,"min-width":5}}),l("el-table-column",{attrs:{prop:"Event",label:"Parameter",sortable:"",width:null,"min-width":50}}),l("el-table-column",{attrs:{prop:"Time",label:"Value",width:null,"min-width":50}}),l("el-table-column",{attrs:{prop:"ATA",label:"Units",width:null,"min-width":30}}),l("el-table-column",{attrs:{width:null,"min-width":5}})],1),l("div",{staticClass:"table-inner-number"},[t._v(" Total Number: "+t._s()+" ")])],1):l("el-row",[l("el-col",{staticStyle:{border:"0.5px solid rgb(111, 111, 111)"},attrs:{span:8}},[l("el-table",{staticStyle:{"background-color":"rgb(46, 45, 45)"},attrs:{"highlight-current-row":"",height:"70vh","sort-method":t.customSortMethodForProgressColumn,"header-cell-style":{background:"#404040",color:"#FFFFFF",font:"14px"},"empty-text":"NO ASSOCIATED PARAMETERS"}},[l("el-table-column",{attrs:{width:null,"min-width":5}}),l("el-table-column",{attrs:{prop:"MemberSystemName",label:"Parameter",sortable:"",width:null,"min-width":100},scopedSlots:t._u([{key:"header",fn:function(e){return[t._v(" Parameter "),l("el-input",{staticStyle:{"margin-left":"2vh","margin-right":"1vh",width:"20vh"},attrs:{size:"mini",placeholder:"Parameter",clearable:""},model:{value:t.searchParameterInput,callback:function(e){t.searchParameterInput=e},expression:"searchParameterInput"}}),l("i",{staticClass:"el-icon-search"})]}}])}),l("el-table-column",{attrs:{width:null,"min-width":5}})],1)],1),l("el-col",{staticStyle:{border:"0.5px solid rgb(111, 111, 111)"},attrs:{span:16}},[l("el-table",{staticStyle:{"background-color":"rgb(46, 45, 45)"},attrs:{"highlight-current-row":"",height:"70vh","sort-method":t.customSortMethodForProgressColumn,"header-cell-style":{background:"#404040",color:"#FFFFFF",font:"14px"},"empty-text":"NO PARAMETER DATA FOR EVENT"}},[l("el-table-column",{attrs:{width:null,"min-width":5}}),l("el-table-column",{attrs:{prop:"Time",label:"Date/Time",sortable:"",width:null,"min-width":50}}),l("el-table-column",{attrs:{prop:"ATA",label:"Temp_degree_6",width:null,"min-width":30}}),l("el-table-column",{attrs:{prop:"FlightLeg",label:"Temp_degree_3",width:null,"min-width":50}}),l("el-table-column",{attrs:{width:null,"min-width":5}})],1)],1)],1)],1),l("el-dialog",{staticStyle:{"font-size":"15px",color:"white"},attrs:{visible:t.isFlightLegsSelected,width:"70%"},on:{"update:visible":function(e){t.isFlightLegsSelected=e}}},[l("el-row",{staticStyle:{"margin-left":"15px","margin-right":"15px"}},[l("el-table",{staticStyle:{width:"100%","background-color":"rgb(52, 52, 52)","margin-top":"1vh","margin-bottom":"1vh"},attrs:{"header-cell-style":{background:"rgb(52, 52, 52)",color:"#FFFFFF",font:"14px","text-align":"center"},"cell-style":{"text-align":"center"},"empty-text":"NO DATA DISPLAY"}},[l("el-table-column",{attrs:{width:null,"min-width":10}}),l("el-table-column",{attrs:{prop:"",label:"Flight Leg",width:null,"min-width":30}}),l("el-table-column",{attrs:{prop:"",label:"Flight Number Leg",width:null,"min-width":55}}),l("el-table-column",{attrs:{prop:"",label:"Start Time",width:null,"min-width":55}}),l("el-table-column",{attrs:{prop:"",label:"Origin",width:null,"min-width":55}}),l("el-table-column",{attrs:{prop:"",label:"Destination",width:null,"min-width":55}}),l("el-table-column",{attrs:{width:null,"min-width":10}})],1)],1),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"primary"},on:{click:function(e){t.isFlightLegsSelected=!1}}},[t._v("Back")])],1)],1)],1),l("el-footer",[l("div",[l("button",{staticClass:"footer-btn",on:{click:function(e){return t.printPage()}}},[t._v("PRINT")])]),l("div",["summary"==t.displaySelected?l("button",{staticClass:"footer-btn",on:{click:function(e){t.isFlightLegsSelected=!0}}},[t._v("FLIGHT LEGS")]):t._e(),l("button",{staticClass:"footer-btn",on:{click:t.goEventPage}},[t._v("BACK")]),"snapshot"==t.displaySelected?l("button",{staticClass:"footer-btn",on:{click:t.goPreviousEvent}},[t._v("PREVIOUS")]):t._e(),"snapshot"==t.displaySelected?l("button",{staticClass:"footer-btn",on:{click:t.goNextEvent}},[t._v("NEXT")]):t._e()])])],1)},s=[];const o={};var n=r({name:"eventSelect",data:()=>({displaySelected:"summary",isFlightLegsSelected:!1,searchParameterInput:"",currentEvent:{}}),components:{Clock:t},methods:{goEventPage(){this.$router.push({name:"EventDisplay"})},goPreviousEvent(){},goNextEvent(){},printPage:e,changeRadio:l,customSortMethodForProgressColumn:a},mounted(){this.currentEvent=this.$route.params.selectEvent}},i,s,!1,c,"2a007d90");function c(t){for(let e in o)this[e]=o[e]}const d=function(){return n.exports}();export{d as default};
