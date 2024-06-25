import{g as t,n as e}from"./index-BqV8YcGQ.js";import{d as s}from"./enums-DTBVM0QW.js";import{u as i,c as l}from"./utils-CCWp7rz6.js";import{C as a}from"./index-B9YNel-W.js";const r={};var o=e({data:()=>({ATAs:[],Equipments:[],Tests:[],selectedTests:[],selectedTest:{},selectedTestId:"",isTestNotBeSelected:!1,isAddedMsg:!1,searchInput:"",testCountTotal:0,acReg:"C-WXWB",currentTime:"",currentDate:""}),components:{Clock:a},methods:{handleATARowClick(t){let e=this.$store.state.groundTestList.ataAndEquiArray[t.ataNumber];this.Equipments=[],this.Tests=[],Object.keys(e).forEach((t=>{this.Equipments.push({equipmentName:e[t].MemberSystemName,availability:e[t].Tests[0].TestAvailable,Tests:e[t].Tests})}))},handleEquipmentRowClick(t){if("0"!==t.availability)return this.$message("This equipment is currently unavailable"),!1;this.Tests=t.Tests},handleTestRowClick(t){this.isAddedMsg=!0,this.selectedTest=t},confirmAdd(){this.selectedTests.includes(this.selectedTest)?this.$message({type:"warning",message:"This text is already selected!"}):this.$store.state.groundTestList.InterferingTestIndexs.includes(this.selectedTest.InitiatedTest_Index)?this.$message({type:"warning",message:"This text is interfering!"}):["1","3","4"].includes(this.selectedTest.InitiatedTest_Status)?this.$message({type:"warning",message:"This text is in progress!"}):(this.selectedTests.push(this.selectedTest),this.$store.state.groundTestList.InterferingTestIndexs=[...this.$store.state.groundTestList.InterferingTestIndexs,...this.selectedTest.InterferingTests_Index.split(";").filter(Boolean)],this.$message({message:"Successfully selected",type:"success"})),this.isAddedMsg=!1},cancelAdd(){this.$message({message:"Already canceled"}),this.isAddedMsg=!1},formatATAName:t=>s[t.ataNumber.substring(0,2)],rowEquipmentName:({row:t})=>"0"==t.availability?"":"disable-row",rowTestName({row:t}){return this.$store.state.groundTestList.InterferingTestIndexs.includes(t.InitiatedTest_Index)||["1","3","4"].includes(t.InitiatedTest_Status)?"disable-row":""},formatEquiAvailablilty:t=>"0"==t.availability?"Available":"Unavailable",goThreeTestsPage(){this.selectedTests.length>0?this.$router.push({name:"ThreeTests",params:{selectedTests:this.selectedTests}}):this.isTestNotBeSelected=!0},goDefaultPage(){this.$router.push({name:"TestList"})},updateCurrentTime:i,customSortMethodForProgressColumn:l},computed:{filteredTests(){return this.Tests==[]?(this.testCountTotal=0,[]):(this.testCountTotal=this.Tests.filter((t=>t.InitiatedTestName.toLowerCase().includes(this.searchInput.toLowerCase()))).length,this.Tests.filter((t=>t.InitiatedTestName.toLowerCase().includes(this.searchInput.toLowerCase()))))}},beforeDestroy(){this.$store.state.groundTestList.InterferingTestIndexs=[]},mounted(){t().then((t=>{Object.keys(t).forEach((t=>{this.ATAs.push({ataNumber:t,systemName:"to be done"})}))}))}},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-header",{staticStyle:{height:"8vh"}},[s("el-row",{staticStyle:{width:"100%"}},[s("el-col",{attrs:{span:21}},[s("div",{staticClass:"el-header-title"},[t._v(" Test Selection ")])]),s("el-col",{attrs:{span:3}},[s("Clock")],1)],1)],1),s("el-main",[s("el-row",{attrs:{gutter:2}},[s("el-col",{staticStyle:{height:"70vh",border:"0.5px solid rgb(111, 111, 111)"},attrs:{span:6}},[s("el-table",{staticStyle:{"background-color":"rgb(46, 45, 45)"},attrs:{"highlight-current-row":"",height:"71vh",data:t.ATAs,"sort-method":t.customSortMethodForProgressColumn,"header-cell-style":{background:"#404040",color:"#FFFFFF",font:"14px"},"empty-text":"NO DATA DISPLAY"},on:{"row-click":t.handleATARowClick}},[s("el-table-column",{attrs:{width:null,"min-width":5}}),s("el-table-column",{attrs:{prop:"ataNumber",label:"ATA",sortable:"",width:null,"min-width":20}}),s("el-table-column",{attrs:{prop:"systemName",label:"System Name",sortable:"",width:null,"min-width":50,formatter:t.formatATAName}}),s("el-table-column",{attrs:{width:null,"min-width":5}})],1)],1),s("el-col",{staticStyle:{height:"70vh",border:"0.5px solid rgb(111, 111, 111)"},attrs:{span:6}},[s("el-table",{staticStyle:{"background-color":"rgb(46, 45, 45)"},attrs:{"highlight-current-row":"",height:"71vh",data:t.Equipments,"sort-method":t.customSortMethodForProgressColumn,"header-cell-style":{background:"#404040",color:"#FFFFFF",font:"14px"},"empty-text":"NO DATA DISPLAY","row-class-name":t.rowEquipmentName},on:{"row-click":t.handleEquipmentRowClick}},[s("el-table-column",{attrs:{width:null,"min-width":5}}),s("el-table-column",{attrs:{prop:"equipmentName",label:"Equipment Name",sortable:"",width:null,"min-width":60}}),s("el-table-column",{attrs:{prop:"availability",label:"Availability",sortable:"",width:null,"min-width":40,formatter:t.formatEquiAvailablilty}}),s("el-table-column",{attrs:{width:null,"min-width":5}})],1)],1),s("el-col",{staticStyle:{height:"70vh",border:"0.5px solid rgb(111, 111, 111)"},attrs:{span:12}},[s("el-table",{staticClass:"test-table",staticStyle:{"background-color":"rgb(46, 45, 45)"},attrs:{"highlight-current-row":"",height:"71vh",data:t.filteredTests,"sort-method":t.customSortMethodForProgressColumn,"header-cell-style":{background:"#404040",color:"#FFFFFF",font:"14px"},"empty-text":"NO DATA DISPLAY","row-class-name":t.rowTestName},on:{"row-click":t.handleTestRowClick}},[s("el-table-column",{attrs:{width:null,"min-width":5}}),s("el-table-column",{attrs:{prop:"InitiatedTestName",label:"Test Name",sortable:"",width:null,"min-width":100}}),s("el-table-column",{attrs:{align:"right","min-width":40},scopedSlots:t._u([{key:"header",fn:function(e){return[s("el-input",{attrs:{size:"mini",placeholder:"Enter key word here",clearable:""},model:{value:t.searchInput,callback:function(e){t.searchInput=e},expression:"searchInput"}})]}}])}),s("el-table-column",{attrs:{prop:"TestDurationTime",label:"Duration(mins)",sortable:"",width:null,"min-width":40}}),s("el-table-column",{attrs:{width:null,"min-width":5}})],1),s("div",{staticClass:"table-outer-number"},[t._v(" Number of Tests: "+t._s(t.filteredTests.length)+" ")])],1)],1),s("el-dialog",{attrs:{title:"ERROR MESSAGE",visible:t.isTestNotBeSelected,width:"30%"},on:{"update:visible":function(e){t.isTestNotBeSelected=e}}},[s("p",[t._v("Please select a test!")]),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:function(e){t.isTestNotBeSelected=!1}}},[t._v(" OK ")])],1)]),s("el-dialog",{attrs:{visible:t.isAddedMsg,title:"CONFIRM"},on:{"update:visible":function(e){t.isAddedMsg=e}}},[s("p",[t._v('Are you sure you want to ADD the parameter "'+t._s(t.selectedTest.InitiatedTestName)+'"?')]),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{type:"primary"},on:{click:t.confirmAdd}},[t._v("Confirm")]),s("el-button",{on:{click:t.cancelAdd}},[t._v("Cancel")])],1)])],1),s("el-footer",[s("div"),s("div",[s("button",{staticClass:"footer-btn",on:{click:function(e){return t.goDefaultPage()}}},[t._v("BACK")]),s("button",{staticClass:"footer-btn",on:{click:function(e){return t.goThreeTestsPage()}}},[t._v("NEXT")])])])],1)}),[],!1,n,"358d1d4f");function n(t){for(let e in r)this[e]=r[e]}const d=function(){return o.exports}();export{d as default};