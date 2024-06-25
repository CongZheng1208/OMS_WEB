var e=Object.defineProperty,t=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,a=(t,l,i)=>l in t?e(t,l,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[l]=i,r=(e,t,l)=>(a(e,"symbol"!=typeof t?t+"":t,l),l);import{c as o,p as s,a as n}from"./utils-CCWp7rz6.js";import{f as c,a as d,b as u,c as h}from"./enums-DTBVM0QW.js";import{m,p as f,n as g}from"./index-BqV8YcGQ.js";import{q as p}from"./index-CLjfCghb.js";import{C as b}from"./index-B9YNel-W.js";var F={};function w(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var y=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};F.decode=F.parse=function(e,t,l,i){t=t||"&",l=l||"=";var a={};if("string"!=typeof e||0===e.length)return a;var r=/\+/g;e=e.split(t);var o=1e3;i&&"number"==typeof i.maxKeys&&(o=i.maxKeys);var s=e.length;o>0&&s>o&&(s=o);for(var n=0;n<s;++n){var c,d,u,h,m=e[n].replace(r,"%20"),f=m.indexOf(l);f>=0?(c=m.substr(0,f),d=m.substr(f+1)):(c=m,d=""),u=decodeURIComponent(c),h=decodeURIComponent(d),w(a,u)?Array.isArray(a[u])?a[u].push(h):a[u]=[a[u],h]:a[u]=h}return a},F.encode=F.stringify=function(e,t,l,i){return t=t||"&",l=l||"=",null===e&&(e=void 0),"object"==typeof e?Object.keys(e).map((function(i){var a=encodeURIComponent(y(i))+l;return Array.isArray(e[i])?e[i].map((function(e){return a+encodeURIComponent(y(e))})).join(t):a+encodeURIComponent(y(e[i]))})).filter(Boolean).join(t):i?encodeURIComponent(y(i))+l+encodeURIComponent(y(e)):""};const v={components:{},name:"InBoundLegFDE",data:()=>({postFlightReportArray:[],isPdfPageSelected:!1,interval:null,loading:!0}),computed:((e,r)=>{for(var o in r||(r={}))l.call(r,o)&&a(e,o,r[o]);if(t)for(var o of t(r))i.call(r,o)&&a(e,o,r[o]);return e})({},m("websocketVuex",["infoOMD"])),watch:{infoOMD:{deep:!0,handler(e,t){e!==t&&this.$router.push({path:e.path,query:e.query})}}},created(){this.interval=setInterval((()=>{this.getPostFlightReportArray()}),1e3),setTimeout((()=>{this.loading=!1}),500)},beforeDestroy(){clearInterval(this.interval)},methods:{findURL(e){this.isPdfPageSelected=!0;let t=p.stringify({fimCode:e});f(t).then((e=>{const t=F.stringify(e),l=decodeURIComponent(`http://localhost:8081/MainPage?${t}`);document.getElementById("iframe").src=l})).catch((e=>{}))},tableRowClicked(e){this.$store.state.failureList.selectedFailureId=e.index},fdeStatusData(e){let t=e.fde.FDEStatus;return c[t]},fdeClassData(e){let t=e.fde.FDEClass;return d[t]},getPostFlightReportArray(){const e=this.$store.state.failureList.resFailureData;void 0!==e.length?this.postFlightReportArray=e.filter((e=>0===e.flightLeg)):this.postFlightReportArray=[]},customSortMethodForProgressColumn:o}};const C={};var S=g(v,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return e.isPdfPageSelected?l("div",[l("div",{staticClass:"html_page"},[l("el-button",{staticClass:"html_close_btn",attrs:{icon:"el-icon-close",circle:"",size:"mini"},on:{click:function(t){e.isPdfPageSelected=!1}}}),l("iframe",{staticClass:"html_OMD",attrs:{id:"iframe"}})],1)]):l("el-row",{staticStyle:{height:"70vh",border:"0.5px solid rgb(111, 111, 111)"}},[l("el-table",{staticStyle:{width:"100%","background-color":"rgb(46, 45, 45)"},attrs:{"highlight-current-row":"",data:e.postFlightReportArray,"sort-method":e.customSortMethodForProgressColumn,"header-cell-style":{background:"#404040",color:"#FFFFFF",font:"14px","text-align":"center"},height:"70vh","row-key":"index","cell-style":{"text-align":"center"},"empty-text":"NO DATA DISPLAY"},on:{"current-change":e.tableRowClicked}},[l("el-table-column",{attrs:{width:null,"min-width":10}}),l("el-table-column",{attrs:{prop:"fde.FDECode",label:"FDE Code",width:null,"min-width":35}}),l("el-table-column",{attrs:{prop:"fde.FDEText",label:"FDE Test",sortable:"",width:null,"min-width":35}}),l("el-table-column",{attrs:{prop:"fde.FDEStatus",label:"FDE Status",sortable:"",width:null,"min-width":30,formatter:e.fdeStatusData}}),l("el-table-column",{attrs:{prop:"fde.FDEClass",label:"FDE Class",sortable:"",width:null,"min-width":30,formatter:e.fdeClassData}}),l("el-table-column",{attrs:{prop:"fde.FDETime",label:"Date/Time",sortable:"",width:null,"min-width":40}}),l("el-table-column",{attrs:{prop:"fimcodeInfo",label:"FIM Code",width:null,"min-width":35},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{staticStyle:{transition:"color 0.3s"},style:{padding:"1vh",height:"4vh",width:"4vh",color:"white"},on:{click:function(l){return e.findURL(t.row.fimcodeInfo)},mouseenter:function(e){e.target.style.textDecoration="underline",e.target.style.color="rgb(200, 200, 200)"},mouseleave:function(e){e.target.style.textDecoration="none",e.target.style.color="white"}}},[e._v(" "+e._s(t.row.fimcodeInfo)+" ")])]}}],null,!1,763768879)}),l("el-table-column",{attrs:{prop:"\n                failureNameInfo",label:"Failure Name",width:null,"min-width":45}}),l("el-table-column",{attrs:{prop:"failureState",label:"State",width:null,"min-width":35}}),l("el-table-column",{attrs:{prop:"flightPhase",label:"Flight Phase",sortable:"",width:null,"min-width":35}})],1),l("div",{staticClass:"table-outer-number"},[e._v(" Number of Flight Reports: "+e._s(e.postFlightReportArray.length)+" ")])],1)}),[],!1,x,"1dc743aa");function x(e){for(let t in C)this[t]=C[t]}const D=function(){return S.exports}();class E{constructor(e){r(this,"groupNameCode"),r(this,"code"),r(this,"language"),r(this,"model"),r(this,"path"),r(this,"issueNumber"),r(this,"publicationId"),this.groupNameCode=e.groupNameCode,this.code=e.code,this.language=e.language,this.model=e.model,this.path=e.path,this.issueNumber=e.issueNumber,this.publicationId=e.publicationId}}const I={};var A=g({name:"ExistingFDE",data:()=>({existingFDEArray:[],FDECodeStatusDict:{},isPdfPageSelected:!1,interval:null,loading:!0}),computed:{},created(){this.interval=setInterval((()=>{this.getExistingFDEArray()}),1e3),setTimeout((()=>{this.loading=!1}),1e3)},beforeDestroy(){clearInterval(this.interval)},methods:{tableRowClicked(e){"--"!==e.failureNameInfo&&(this.$store.state.failureList.selectedFailureId=e.index)},rowClassName:({row:e})=>"--"==e.failureNameInfo?"disable-row":"",fdeStatusData(e){let t=e.fde.FDECode;return this.FDECodeStatusDict[t].FDEStatus},fdeClassData(e){let t=e.fde.FDECode;return this.FDECodeStatusDict[t].FDEClass},findURL(e){const t=this;this.isPdfPageSelected=!0;let l=p.stringify({fimCode:"27-21033"});f(l).then((e=>{const t=e,l=(new E(t),decodeURIComponent(`http://localhost:81/manual/detail?groupNameCode=${t.groupNameCode}&language=${t.language}&model=${t.model}&path=${t.path}&issueNumber=${t.issueNumber}&publicationId=${t.publicationId}`));document.getElementById("iframe").src=l})).catch((e=>{})),window.addEventListener("message",(function(e){e.data.hasOwnProperty("targetPage")&&"selectTestNew"===e.data.targetPage&&t.$router.push({name:"SelectTestNew"})}),!1)},queryStringToJson(e){const t=e.split("&");let l={};return t.forEach((e=>{const t=e.split("=");l[t[0]]=t[1]})),l},getExistingFDEArray(){const e=this.$store.state.failureList.resFDEData,t=this.$store.state.failureList.resFailureData;if(void 0!==e.length){let l={};e.map((e=>{l[e.FDECode]={FDEStatus:e.FDEStatus,FDEClass:e.FDEClass,FDEText:e.FDEText}})),this.FDECodeStatusDict=l;const i=t.filter((e=>"ACTV"===e.failureState&&e.fde.FDEStatus&&"ACTV_UNINHB"===this.FDECodeStatusDict[e.fde.FDECode].FDEStatus));let a=i.map((e=>e.FDECode));const r=e.reduce(((e,t)=>("ACTV_UNINHB"!==t.FDEStatus||e.some((e=>e.FDECode===t.FDECode))||a.includes(t.FDECode)||e.push(t),e)),[]).map((e=>({ata:"--",failureMessage:"--",failureNameInfo:"--",failureState:"--",failureTime:"--",fault:[],fde:e,fimcodeInfo:"--",flightLeg:"--",flightPhase:"--",id:"--",index:"--",maintenceText:"--",maintenceTime:"--",rp:[]})));this.existingFDEArray=r.concat(i)}else this.existingFDEArray=[]},customSortMethodForProgressColumn:o},mounted(){window.addEventListener("message",(e=>{"http://localhost:8081"===e.origin&&this.$router.push({name:"SelectTestNew",params:{selectedEquipment:this.queryStringToJson(e.data)}})}))}},(function(){var e=this,t=e.$createElement,l=e._self._c||t;return e.isPdfPageSelected?l("div",[l("div",{staticClass:"html_page"},[l("el-button",{staticClass:"html_close_btn",attrs:{icon:"el-icon-close",circle:"",size:"mini"},on:{click:function(t){e.isPdfPageSelected=!1}}}),l("iframe",{staticClass:"html_OMD",attrs:{id:"iframe"}})],1)]):l("el-row",{staticStyle:{height:"70vh",border:"0.5px solid rgb(111, 111, 111)"}},[l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%","background-color":"rgb(46, 45, 45)"},attrs:{"highlight-current-row":"",data:e.existingFDEArray,height:"70vh","sort-method":e.customSortMethodForProgressColumn,"header-cell-style":{background:"#404040",color:"#FFFFFF",font:"14px","text-align":"center"},"cell-style":{"text-align":"center"},"row-key":"FDECode","empty-text":"NO DATA DISPLAY","row-class-name":e.rowClassName,"element-loading-text":"Data Loading...","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.5)"},on:{"current-change":e.tableRowClicked}},[l("el-table-column",{attrs:{width:null,"min-width":10}}),l("el-table-column",{attrs:{prop:"fde.FDECode",label:"FDE Code",width:null,sortable:"","min-width":25}}),l("el-table-column",{attrs:{prop:"fde.FDEText",label:"FDE Test",width:null,"min-width":65}}),l("el-table-column",{attrs:{prop:"fde.FDECode",label:"FDE Status",width:null,"min-width":30,formatter:e.fdeStatusData}}),l("el-table-column",{attrs:{prop:"fde.FDEClass",label:"FDE Class",width:null,"min-width":30,formatter:e.fdeClassData}}),l("el-table-column",{attrs:{prop:"flightPhase",label:"Flight Phase",sortable:"",width:null,"min-width":25}}),l("el-table-column",{attrs:{prop:"failureTime",label:"Date/Time",sortable:"",width:null,"min-width":30}}),l("el-table-column",{attrs:{prop:"fimcodeInfo",label:"FIM Code",width:null,"min-width":35},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",{staticStyle:{transition:"color 0.3s"},style:{padding:"1vh",height:"4vh",width:"4vh",color:"white"},on:{click:function(l){return e.findURL(t.row.fimcodeInfo)},mouseenter:function(e){e.target.style.textDecoration="underline",e.target.style.color="rgb(200, 200, 200)"},mouseleave:function(e){e.target.style.textDecoration="none",e.target.style.color="white"}}},[e._v(" "+e._s(t.row.fimcodeInfo)+" ")])]}}],null,!1,763768879)}),l("el-table-column",{attrs:{prop:"\n                failureNameInfo",label:"Failure Name",width:null,"min-width":45}}),l("el-table-column",{attrs:{prop:"flightLeg",label:"Flight Leg",sortable:"",width:null,"min-width":25}})],1),l("div",{staticClass:"table-outer-number"},[e._v(" Number of FDEs: "+e._s(e.existingFDEArray.length)+" ")])],1)}),[],!1,_,"e140b4b8");function _(e){for(let t in I)this[t]=I[t]}const k=function(){return A.exports}();const P={};var L=g({components:{},name:"ExistingFailures",data:()=>({existingFailureArray:[],interval:null,loading:!0}),created(){this.interval=setInterval((()=>{this.getfailureArray()}),1e3),setTimeout((()=>{this.loading=!1}),500)},beforeDestroy(){clearInterval(this.interval)},methods:{FlightPhaseData(e){let t=e.flightPhase;return u[t]},CurrentStateData(e){let t=e.failure_state;return h[t]},tableRowClicked(e){this.$store.state.failureList.selectedFailureId=e.index},getfailureArray(){const e=this.$store.state.failureList.resFailureData;if(void 0!==e.length){let t=e.filter((e=>"ACTV"===e.failureState)).reduce(((e,t)=>{let l=e.find((e=>e.failureNameInfo===t.failureNameInfo&&e.failureTime===t.failureTime));return l?(l.children||(l.children=[]),l.children.push({ata:"",failureNameInfo:"",failureState:"",failureTime:"",fault:"",fde:t.fde,fimcodeInfo:"",flightLeg:"",flightPhase:"",id:"",index:t.index,maintenceText:t.maintenceText,maintenceTime:t.maintenceTime})):e.push(t),e}),[]);this.existingFailureArray=t}else this.existingFailureArray=[]},customSortMethodForProgressColumn:o},mounted(){this.getfailureArray()}},(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("el-row",{staticStyle:{height:"70vh",border:"0.5px solid rgb(111, 111, 111)"}},[l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%","background-color":"rgb(46, 45, 45)"},attrs:{"highlight-current-row":"",data:e.existingFailureArray,"sort-method":e.customSortMethodForProgressColumn,"header-cell-style":{background:"#404040",color:"#FFFFFF",font:"14px","text-align":"center"},height:"70vh","cell-style":{"text-align":"center"},"empty-text":"NO DATA DISPLAY","row-key":"index","tree-props":{children:"children",hasChildren:"hasChildren"},"element-loading-text":"Data Loading...","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.5)"},on:{"current-change":e.tableRowClicked}},[l("el-table-column",{attrs:{width:null,"min-width":10}}),l("el-table-column",{attrs:{prop:"fimcodeInfo",label:"FIM Code",width:null,sortable:"","min-width":30}}),l("el-table-column",{attrs:{prop:"failureNameInfo",label:"Failure Text",width:null,"min-width":85}}),l("el-table-column",{attrs:{prop:"failureState",label:"Failure Status",width:null,"min-width":45}}),l("el-table-column",{attrs:{prop:"flightPhase",label:"Flight Phase",sortable:"",width:null,"min-width":35}}),l("el-table-column",{attrs:{prop:"failureTime",label:"Date/Time",sortable:"",width:null,"min-width":55}}),l("el-table-column",{attrs:{prop:"fde.FDECode",label:"FDE Code",width:null,"min-width":35}}),l("el-table-column",{attrs:{prop:"fde.FDEText",label:"FDE Text",sortable:"",width:null,"min-width":60}}),l("el-table-column",{attrs:{prop:"flightLeg",label:"Flight Leg",sortable:"",width:null,"min-width":35}}),l("el-table-column",{attrs:{width:null,"min-width":5}})],1),l("div",{staticClass:"table-outer-number"},[e._v("Number of Failures: "+e._s(e.existingFailureArray.length))])],1)}),[],!1,T,"49b8d09e");function T(e){for(let t in P)this[t]=P[t]}const N=function(){return L.exports}();var R=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("el-row",{staticStyle:{height:"70vh",border:"0.5px solid rgb(111, 111, 111)"}},[l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%","background-color":"rgb(46, 45, 45)"},attrs:{"highlight-current-row":"",data:e.filteredFailure,"sort-method":e.customSortMethodForProgressColumn,"header-cell-style":{background:"#404040",color:"#FFFFFF",font:"14px","text-align":"center"},height:"70vh","cell-style":{"text-align":"center"},"empty-text":"NO DATA DISPLAY","row-key":"index","tree-props":{children:"children",hasChildren:"hasChildren"},"element-loading-text":"Data Loading...","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.5)"},on:{"current-change":e.tableRowClicked}},[l("el-table-column",{attrs:{width:null,"min-width":10}}),l("el-table-column",{attrs:{prop:"ata",label:"ATA",sortable:"",width:null,"min-width":30,filters:e.ataFilters,"filter-method":e.filterHandler}}),l("el-table-column",{attrs:{prop:"fimcodeInfo",label:"FIM Code",width:null,"min-width":70},scopedSlots:e._u([{key:"header",fn:function(t){return[e._v(" FIM Code "),l("el-input",{staticStyle:{width:"15vh","margin-left":"2vh","margin-right":"1vh"},attrs:{size:"mini",placeholder:"FIM Code",clearable:""},model:{value:e.searchFimCodeInput,callback:function(t){e.searchFimCodeInput=t},expression:"searchFimCodeInput"}}),l("i",{staticClass:"el-icon-search"})]}}])}),l("el-table-column",{attrs:{prop:"failureNameInfo",label:"Failure Name",width:null,"min-width":75},scopedSlots:e._u([{key:"header",fn:function(t){return[e._v(" Failure Name "),l("el-input",{staticStyle:{width:"15vh","margin-left":"2vh","margin-right":"1vh"},attrs:{size:"mini",placeholder:"Failure Name",clearable:""},model:{value:e.searchFailureNameInput,callback:function(t){e.searchFailureNameInput=t},expression:"searchFailureNameInput"}}),l("i",{staticClass:"el-icon-search"})]}}])}),l("el-table-column",{attrs:{prop:"failureState",label:"Failure Status",sortable:"",width:null,"min-width":35}}),l("el-table-column",{attrs:{prop:"flightPhase",label:"Flight Phase",sortable:"",width:null,"min-width":40,filters:e.phaseFilters,"filter-method":e.filterHandler}}),l("el-table-column",{attrs:{prop:"failureTime",label:"Date/Time",sortable:"",width:null,"min-width":50}}),l("el-table-column",{attrs:{prop:"fde.FDEText",label:"FDE Text",width:null,"min-width":60}}),l("el-table-column",{attrs:{prop:"flightLeg",label:"Flight Leg",sortable:"",width:null,"min-width":35,filters:e.legFilters,"filter-method":e.filterHandler}}),l("el-table-column",{attrs:{width:null,"min-width":5}})],1),l("el-dialog",{staticStyle:{"font-size":"15px",color:"white"},attrs:{visible:e.isFlightLegsSelected,width:"50%"},on:{"update:visible":function(t){e.isFlightLegsSelected=t}}},[l("el-row",{staticStyle:{"margin-left":"15px","margin-right":"15px"}},[l("el-col",{attrs:{span:8}},[l("div",{staticClass:"radio",on:{click:function(t){e.dialogSelected="ATA"}}},[l("input",{attrs:{name:"select-flightLegs-radio",type:"radio"},domProps:{checked:"ATA"==e.dialogSelected}}),l("label",{staticClass:"form-check-label",staticStyle:{color:"black"}},[e._v("ATA")])])]),l("el-col",{attrs:{span:8}},[l("div",{staticClass:"radio",on:{click:function(t){e.dialogSelected="flightPhase"}}},[l("input",{attrs:{name:"select-flightLegs-radio",type:"radio"},domProps:{checked:"flightPhase"==e.dialogSelected}}),l("label",{staticClass:"form-check-label",staticStyle:{color:"black"}},[e._v("Flight Phase")])])]),l("el-col",{attrs:{span:8}},[l("div",{staticClass:"radio",on:{click:function(t){e.dialogSelected="flightLeg"}}},[l("input",{attrs:{name:"select-flightLegs-radio",type:"radio"},domProps:{checked:"flightLeg"==e.dialogSelected}}),l("label",{staticClass:"form-check-label",staticStyle:{color:"black"}},[e._v("Flight Leg")])])])],1),l("el-row",{staticStyle:{"margin-left":"15px","margin-right":"15px"}},["ATA"==e.dialogSelected?l("el-table",{staticStyle:{width:"100%","background-color":"rgb(52, 52, 52)","margin-top":"1vh","margin-bottom":"1vh"},attrs:{data:e.ataFilters,"header-cell-style":{background:"rgb(52, 52, 52)",color:"#FFFFFF",font:"14px","text-align":"center"},"cell-style":{"text-align":"center"},"empty-text":"NO DATA DISPLAY"}},[l("el-table-column",{attrs:{width:null,"min-width":10}}),l("el-table-column",{attrs:{prop:"text",label:"ATA",width:null,"min-width":30}}),l("el-table-column",{attrs:{prop:"count",label:"Count",width:null,"min-width":55}}),l("el-table-column",{attrs:{width:null,"min-width":10}})],1):e._e(),"flightPhase"==e.dialogSelected?l("el-table",{staticStyle:{width:"100%","background-color":"rgb(52, 52, 52)","margin-top":"1vh","margin-bottom":"1vh"},attrs:{data:e.phaseFilters,"header-cell-style":{background:"rgb(52, 52, 52)",color:"#FFFFFF",font:"14px","text-align":"center"},"cell-style":{"text-align":"center"},"empty-text":"NO DATA DISPLAY"}},[l("el-table-column",{attrs:{width:null,"min-width":10}}),l("el-table-column",{attrs:{prop:"text",label:"Phase",width:null,"min-width":30}}),l("el-table-column",{attrs:{prop:"count",label:"Count",width:null,"min-width":55}}),l("el-table-column",{attrs:{width:null,"min-width":10}})],1):e._e(),"flightLeg"==e.dialogSelected?l("el-table",{staticStyle:{width:"100%","background-color":"rgb(52, 52, 52)","margin-top":"1vh","margin-bottom":"1vh"},attrs:{data:e.legFilters,"header-cell-style":{background:"rgb(52, 52, 52)",color:"#FFFFFF",font:"14px","text-align":"center"},"cell-style":{"text-align":"center"},"empty-text":"NO DATA DISPLAY"}},[l("el-table-column",{attrs:{width:null,"min-width":10}}),l("el-table-column",{attrs:{prop:"text",label:"Leg",width:null,"min-width":30}}),l("el-table-column",{attrs:{prop:"count",label:"Count",width:null,"min-width":55}}),l("el-table-column",{attrs:{width:null,"min-width":10}})],1):e._e()],1),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.isFlightLegsSelected=!1}}},[e._v("Back")])],1)],1),l("div",{staticClass:"table-outer-number"},[l("el-button",{staticClass:"table-outer-button",attrs:{slot:"reference",circle:"",icon:"el-icon-s-data"},on:{click:function(t){e.isFlightLegsSelected=!0}},slot:"reference"}),e._v(" Number of Failures: "+e._s(e.failureCountTotal)+" ")],1)],1)},$=[];const O={};var M=g({components:{},name:"ExistingFailures",data:()=>({existingFailureArray:[],ataFilters:[],phaseFilters:[],legFilters:[],failureCountTotal:0,showFimCodeInput:!1,showFailureNameInput:!1,isFlightLegsSelected:!1,dialogSelected:"ATA",searchFimCodeInput:"",searchFailureNameInput:"",interval:null,loading:!0}),created(){this.interval=setInterval((()=>{this.getfailureArray()}),1e3),setTimeout((()=>{this.loading=!1}),500)},beforeDestroy(){clearInterval(this.interval)},methods:{filterHandler:(e,t,l)=>t[l.property]===e,FDETextData:e=>JSON.stringify(e.fde_text),tableRowClicked(e){this.$store.state.failureList.selectedFailureId=e.index},getfailureArray(){if(void 0!==this.$store.state.failureList.resFailureData.length){let e=JSON.parse(JSON.stringify(this.$store.state.failureList.resFailureData)).reduce(((e,t)=>{let l=e.find((e=>e.failureNameInfo===t.failureNameInfo&&e.failureTime===t.failureTime));return l?(l.children||(l.children=[]),l.children.push({ata:"",failureNameInfo:"",failureState:"",failureTime:"",fault:"",fde:t.fde,fimcodeInfo:"",flightLeg:"",flightPhase:"",id:"",index:t.index,maintenceText:t.maintenceText,maintenceTime:t.maintenceTime})):e.push(t),e}),[]);this.existingFailureArray=e,this.ataFilters=Array.from(new Set(this.existingFailureArray.map((e=>e.ata)))).map((e=>{const t=this.existingFailureArray.filter((t=>t.ata===e));return{text:e,value:e,count:t.length}})),this.phaseFilters=Array.from(new Set(this.existingFailureArray.map((e=>e.flightPhase)))).map((e=>{const t=this.existingFailureArray.filter((t=>t.flightPhase===e));return{text:e,value:e,count:t.length}})),this.legFilters=Array.from(new Set(this.existingFailureArray.map((e=>e.flightLeg)))).map((e=>{const t=this.existingFailureArray.filter((t=>t.flightLeg===e));return{text:e,value:e,count:t.length}}))}else this.existingFailureArray=[]},customSortMethodForProgressColumn:o},computed:{filteredFailure(){return this.failureCountTotal=this.existingFailureArray.filter((e=>e.fimcodeInfo.toLowerCase().includes(this.searchFimCodeInput.toLowerCase())&&e.failureNameInfo.toLowerCase().includes(this.searchFailureNameInput.toLowerCase()))).length,this.existingFailureArray.filter((e=>e.fimcodeInfo.toLowerCase().includes(this.searchFimCodeInput.toLowerCase())&&e.failureNameInfo.toLowerCase().includes(this.searchFailureNameInput.toLowerCase())))}},mounted(){this.getfailureArray()}},R,$,!1,j,"448d70e8");function j(e){for(let t in O)this[t]=O[t]}const U=function(){return M.exports}();const H={};var B=g({name:"Dialog",methods:{onClose(){this.$emit("close")}},watch:{}},(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("button",{staticClass:"dialog-overlay",on:{click:e.onClose}}),l("div",{staticClass:"dialog-content bg-[#404040] rounded border p3 z-2"},[e._t("content")],2)])}),[],!1,V,"e7287470");function V(e){for(let t in H)this[t]=H[t]}const z=function(){return B.exports}();const Y={};var q=g({},(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("svg",{staticClass:"w5 h5",attrs:{fill:"white",viewBox:"64 64 896 896","data-icon":"close","aria-hidden":"true",focusable:"false"}},[t("path",{attrs:{d:"M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"}})])])}),[],!1,J,null);function J(e){for(let t in Y)this[t]=Y[t]}const G={};var K=g({components:{CloseButton:function(){return q.exports}()},methods:{onBlur(){this.$emit("close")},onClose(){this.$emit("close")},onConfirm(){this.$emit("ok")}}},(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("div",[l("div",{staticClass:"flex justify-end"},[l("button",{staticClass:"bg-transparent border-none p-0 m-0",on:{click:e.onClose}},[l("CloseButton")],1)]),e._m(0)]),l("div",{staticClass:"flex justify-end"},[l("button",{staticClass:"footer-btn",on:{click:e.onClose}},[e._v("取消")]),l("button",{staticClass:"footer-btn",on:{click:e.onConfirm}},[e._v("确定")])])])}),[function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("table",[l("thead",[l("tr",[l("th",[e._v("Flight Leg")]),l("th",[e._v("Flight Number Leg")]),l("th",[e._v("Start Time")]),l("th",[e._v("Origin")]),l("th",[e._v("Destination")])])]),l("tbody",[l("tr",[l("td",[e._v("12")]),l("td",[e._v("12")]),l("td",[e._v("12")]),l("td",[e._v("12")]),l("td",[e._v("12")])])])])}],!1,Q,"d0ee26f8");function Q(e){for(let t in G)this[t]=G[t]}const W={};var X=g({components:{InBoundLegFde:D,ExistingFde:k,ExistingFailure:N,FailureHistory:U,Clock:b,ToggleDialog:z,ToggleContent:function(){return K.exports}()},name:"FailureRep",data:()=>({isVisiable:!1,legFailureAll:!0,isParameterSelected:!1,displaySelected:"legFDEsSelected"}),methods:{onClose(){this.isVisiable=!1},switchAll(e){this.legFailureAll=e,this.$store.state.failureList.selectedFailureId=-1},goSelectPage(){-1===this.$store.state.failureList.selectedFailureId?this.isParameterSelected=!0:this.$router.push({name:"SelectFailuresDetails"})},printPage:s,changeRadio:n}},(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticStyle:{"background-color":"rgb(45, 45, 45)"}},[l("el-header",{staticStyle:{height:"9vh"}},[l("el-row",{staticStyle:{width:"100%"}},[l("el-col",{attrs:{span:3}},[l("div",{staticClass:"el-header-title"},[e._v("Select Option:")])]),l("el-col",{attrs:{span:4}},[l("div",{staticClass:"el-header-radios"},[l("div",{staticClass:"radio",on:{click:function(t){e.changeRadio("legFDEsSelected"),e.$store.state.failureList.selectedFailureId=-1}}},[l("input",{attrs:{name:"failure-rep-radio",type:"radio"},domProps:{checked:"legFDEsSelected"==e.displaySelected}}),l("label",{staticClass:"form-check-label"},[e._v("Post Flight Report")])]),l("div",{staticClass:"radio",on:{click:function(t){e.changeRadio("existingFDEsSelected"),e.$store.state.failureList.selectedFailureId=-1}}},[l("input",{attrs:{name:"failure-rep-radio",type:"radio"},domProps:{checked:"existingFDEsSelected"==e.displaySelected}}),l("label",{staticClass:"form-check-label"},[e._v("Existing FDEs")])])])]),l("el-col",{attrs:{span:14}},[l("div",{staticClass:"el-header-radios"},[l("div",{staticClass:"radio",on:{click:function(t){e.changeRadio("existingFailureSelected"),e.$store.state.failureList.selectedFailureId=-1}}},[l("input",{attrs:{name:"failure-rep-radio",type:"radio"},domProps:{checked:"existingFailureSelected"==e.displaySelected}}),l("label",{staticClass:"form-check-label"},[e._v("Existing Failures")])]),l("div",{staticClass:"radio",on:{click:function(t){e.changeRadio("failuresHistorySelected"),e.$store.state.failureList.selectedFailureId=-1}}},[l("input",{attrs:{name:"failure-rep-radio",type:"radio"},domProps:{checked:"failuresHistorySelected"==e.displaySelected}}),l("label",{staticClass:"form-check-label"},[e._v("Failures History")])])])]),l("el-col",{attrs:{span:3}},[l("Clock")],1)],1)],1),l("el-main",[l("div",{staticStyle:{height:"70vh"}},["legFDEsSelected"==e.displaySelected?l("in-bound-leg-fde"):e._e(),"existingFDEsSelected"==e.displaySelected?l("existing-fde"):e._e(),"existingFailureSelected"==e.displaySelected?l("existing-failure"):e._e(),"failuresHistorySelected"==e.displaySelected?l("failure-history"):e._e()],1),l("el-dialog",{attrs:{title:"ERROR MESSAGE",visible:e.isParameterSelected,width:"30%"},on:{"update:visible":function(t){e.isParameterSelected=t}}},[l("p",{staticStyle:{color:"black"}},[e._v("Please select a failure item!")]),l("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.isParameterSelected=!1}}},[e._v("OK")])],1)])],1),l("el-footer",[l("div",[l("button",{staticClass:"footer-btn",on:{click:e.printPage}},[e._v("PRINT")])]),l("div",[l("button",{staticClass:"footer-btn",attrs:{slot:"button"},on:{click:function(t){e.isVisiable=!0}},slot:"button"},[e._v("FLIGHT LEGS")]),l("button",{staticClass:"footer-btn",on:{click:function(t){return e.goSelectPage()}}},[e._v("SELECT")])])]),e.isVisiable?l("ToggleDialog",{on:{close:e.onClose}},[l("ToggleContent",{attrs:{slot:"content"},on:{close:e.onClose,ok:function(t){e.isVisiable=!1}},slot:"content"})],1):e._e()],1)}),[],!1,Z,"09d494a1");function Z(e){for(let t in W)this[t]=W[t]}const ee=function(){return X.exports}();export{ee as default};