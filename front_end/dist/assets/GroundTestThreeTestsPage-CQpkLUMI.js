import{p as t,h as e}from"./utils-CCWp7rz6.js";import{C as s}from"./index-B9YNel-W.js";import{q as i}from"./index-CLjfCghb.js";import{n}from"./index-BqV8YcGQ.js";var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-header",{staticStyle:{height:"8vh"}},[s("el-row",{staticStyle:{width:"100%"}},[s("el-col",{attrs:{span:21}},[s("div",{staticClass:"el-header-title"},[t._v(" Pre-Conditions of Selected Tests ")])]),s("el-col",{attrs:{span:3}},[s("Clock")],1)],1)],1),s("el-main",{staticStyle:{padding:"2vh"}},[s("el-row",[s("div",{staticClass:"total-container"},t._l(t.selectedTests,(function(e,i){return s("div",{key:i,staticClass:"sub-container"},[s("el-row",{staticStyle:{width:"100%"}},[s("el-col",{attrs:{span:20}},[s("div",{staticClass:"div-title"},[t._v(" Test Name:"+t._s(e.InitiatedTestName)+", Equipment Name: "+t._s(e.MemberSystemName)+" ")]),1===e.Preconditions.length&&""===e.Preconditions[0]?s("div",{staticClass:"content-alert"},[t._v(" No Alive Data ")]):t._e(),t._l(e.Preconditions,(function(e){return s("div",{key:e,staticClass:"content-item"},[t._v(" "+t._s(e)+" ")])}))],2),s("el-col",{attrs:{span:4}},[s("button",{staticClass:"footer-btn",on:{click:function(e){return t.cancelTest(i)}}},[t._v("CANCEL")])])],1)],1)})),0)])],1),s("el-footer",[s("div",[s("button",{staticClass:"footer-btn",on:{click:t.printPage}},[t._v("PRINT")])]),s("div",[s("button",{staticClass:"footer-btn",on:{click:function(e){return t.goSelectTestPage()}}},[t._v("BACK")]),s("button",{staticClass:"footer-btn",on:{click:function(e){return t.goTestListPage()}}},[t._v(" START TEST ")])])])],1)},a=[];const r={};var l=n({data:()=>({loading:!0,selectedTests:[],title:"Control Panel",data:["Item 1","Item 2","Item 3"],buttonText:"Click Me"}),components:{Clock:s},methods:{goTestListPage(){if(0==this.selectedTests.length)this.$message("Please select one test to start at least.");else{let t=this.selectedTests.map((t=>parseInt(t.InitiatedTest_Index))),e=i.stringify({OrderType:"START",currentPage:"ThreeTests",InitiatedTest_Index:t,MemberSystemID:"",currentScreenId:"",selectedOption:""});this.handleTestOrder(e),this.$router.push({name:"TestList"})}},cancelTest(t){this.selectedTests.splice(t,1)},goSelectTestPage(){clearInterval(this.$store.state.groundTestList.currentGroundTestTimer),this.$router.push({name:"SelectTestNew"})},printPage:t,handleTestOrder:e},mounted(){this.selectedTests=this.$route.params.selectedTests,this.selectedTests.forEach((t=>{t.Preconditions&&t.Preconditions.includes(";")&&(t.Preconditions=t.Preconditions.split(";").map((t=>t.trim())),t.Preconditions=t.Preconditions.filter((t=>""!==t)))})),setTimeout((()=>{this.loading=!1}),500)}},o,a,!1,c,"3ae9d1c8");function c(t){for(let e in r)this[e]=r[e]}const d=function(){return l.exports}();export{d as default};