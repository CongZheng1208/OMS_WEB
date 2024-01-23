<template>

  <div class="container-fluid">
    <div class="controller" >
      <select class="top-bar-btn" v-model="listSelected" @change="changeRadio()">
        <option v-for="x in testData" :value="x.value" style="background-color:grey">{{x.name}}</option>
      </select>
    </div>

    <div class="row segment-bottom param-tables">
      <div class="col-3"  style="padding-top: 4px;">
        <div v-if="listSelected==1" >
          <div class="row" style="height: 6vh">
            <table class="table-sm text-white text-left">
              <thead class="segment-title">
                <tr>
                  <th scope="col" style="width: 5%"></th>
                  <th class="click" style="width: 20%"  @click="changeType('ATA')">
                    ATA
                    <span class="icon"
                      :class="{
                        'inverse': isReverse && sortType === 'ATA',
                        'gray': sortType !== 'ATA'
                      }"
                    >
                      <span v-if="sortType === 'ATA' && !isReverse">▼</span>
                      <span v-else-if="sortType === 'ATA' && isReverse">▲</span>
                      <span v-else>&#9650;</span>
                    </span>
                  </th>
                  <th scope="col" style="width: 75%">System Name</th>
                </tr>
              </thead>
            </table>
          </div>

          <vue-custom-scrollbar class="left-table-area"  :settings="settings">
            <div class="param-wrapper" v-for="(ata, index) in sortCurrentArray" :key="index"
              @click="showParameters(ata)" :class="{ 'selected': selectedATA==ata.ATA }">
              <label class="form-check-label" style="width: 10%">{{ ata.ATA }}</label>
              <label class="form-check-label" style="width: 80%">{{ ata.name }}</label>
            </div>
          </vue-custom-scrollbar>
        </div>

        <div v-if="listSelected==2">
          <div class="row" style="height: 6vh">
            <table class="table-sm text-white">
              <thead class="segment-title">
                <tr>
                  <th scope="col" style="width: 5%"></th>
                  <th class="click" style="width: 50%">Display List Name</th>
                  <th scope="col" style="width: 45%">Date Created</th>
                </tr>
              </thead>
            </table>
          </div>

          <vue-custom-scrollbar class="left-table-area"  :settings="settings">
            <div class="param-wrapper" v-for="(param, index) in params" :key="index"
              @click="showListParameters(param)" :class="{ 'selected': selectedList==param.id }">
              <label class="form-check-label" style="width: 30%"> {{ param.name }}</label>
              <label class="form-check-label" style="width: 60%">{{ param.createdDate }}</label>
            </div>
          </vue-custom-scrollbar>
        </div>
      </div>

      <div class="col-9" style="padding-top: 4px;">
        <div class="row">
          <div class="col-6 segment-middle">
            <table class="table-sm text-white">
              <thead class="segment-title">
                <tr>
                  <th scope="col"  v-if="listSelected==1" style="width: 45%">Parameter Selection</th>
                  <th scope="col"  v-if="listSelected==2" style="width: 100%">Parameter Selection</th>
                  <th scope="col" style="width: 35%">
                    <input v-if="listSelected==1" class="search-input" placeholder="Enter here" v-model="searchInput"/>
                  </th>
                  <th scope="col" style="width: 20%">
                    <button v-if="listSelected==1" class="button-bar-btn1" @click="clearAll">Clear</button>
                  </th>
                </tr>
              </thead>
            </table>

            <div style="margin-top: 0.5rem; text-align: left" id="checkParamContainer">
              <vue-custom-scrollbar class="mid-table-area"  :settings="settings">
                <div class="param-wrapper" v-for="(param, index) in currentNewPaArray" :key="index"
                  v-on:click="updateCheckedParams(param, $event)">
                  <label class="form-check-label">{{ param.para }}</label>
                  <span v-if="!param.isChecked" class="add-button" @click="addParam(param)">+</span>
                </div>
              </vue-custom-scrollbar>
            </div>
            <div class="mid-btn-group">
              Total Number: {{ parameterCountTotal }}
            </div>
          </div>

          <div class="col-6" >
            <div class="row" style="height: 6vh">
              <div class="segment-title-right">
                <table class="table-sm text-white text-left">
                  <thead >
                    <tr>
                      <th scope="col">Parameter to Display</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>

            <div style="margin-top: 0.5rem; text-align: left">
              <vue-custom-scrollbar class="mid-table-area"  :settings="settings">
                <div class="param-wrapper" v-for="(ele, index) in currentNewAddedArray" :key="index">
                  <label class="check-button">{{ ele.para }}</label>
                  <span class="add-button" @click="removeParam(ele)">-</span>
                </div>
              </vue-custom-scrollbar>
            </div>

            <div class="add-btn-group" v-if="listSelected==2">
              <button class="page-btn" @click="addParametersToShow">ADD</button>
            </div>
            <div class="mid-btn-group">
              Total Number: {{ this.addedParams.length }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="button-bar">
          <div style="float: right">
            <button class="button-bar-btn" @click="saveSele">Save Selection</button>
            <button class="button-bar-btn" @click="clearSele">Clear Selection</button>
            <button class="button-bar-btn" @click="startView">
              Start View
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  // import {pattern, urlHeads} from '../../../config/url.js'
  // import vueCustomScrollbar from 'vue-custom-scrollbar'
  // import "vue-custom-scrollbar/dist/vueScrollbar.css"

  export default {
    name: "ParamListDisplay",
    emits: ["startView"],
    data() {
      return {
        searchInput: "",
        sortType: "",
        isReverse: false,
        isViewStarted: false,
        isLoad: false,
        isAdd: false,
        listSelected: 1,
        ataSelected: false,
        selectedATA: "",
        ataSys: [],
        testData: [
          {
            id: 0,
            name: 'Create List',
            value: 1
          },
          {
            id: 1,
            name: 'Load List',
            value: 2
          }
        ],
        params: [
        ],
        checkedParams: [],
        addedParams: [],
        selectedCountTotal: 0,
        parameterCountTotal: 0,
        ATAName: {
          21: 'Air Conditioning',
          22: 'Auto Flight',
          23: 'Communications',
          24: 'Electrical',
          25: 'Equipment/Furnishings',
          26: 'Fire Protection',
          27: 'Flight Control',
          28: 'Fuel',
          31: 'Indications/Recording',
          33: 'Lighting',
          73: 'Engine Fuel and Control',
          32: 'Landing Gear',
          45: 'Central Maintenance System',
          42: 'Integranted Module Avionics',
          34: 'Navigation',
          49: 'Airborne Auxiliary Power',
          29: 'Hydraulic Power',
          71: 'Power Plant',
          30: 'Ice and Rain Protection',
          52: 'Doors'
        },
        curListId: '',
        curListName: '',
        ataParas: [],
        selectedList: '',
        selectedListState: [],
        settings: {
          suppressScrollY: false,
          wheelPropagation: false,
        },
      };
    },
    components: {
      vueCustomScrollbar
    },
    methods: {
      changeRadio() {
        this.ataParas =  new Array();
        this.addedParams = new Array();
        this.flashListData()

        if(this.isAdd){
          this.isAdd = false
        }else{
          this.isLoad = !this.isLoad
        }
      },
      startView() {

        if( this.addedParams.length > 0){
          this.$bus.$emit("selectPtoShow", false);
          var tmp = []
          this.addedParams.forEach(ele => {
            tmp.push(ele)
          })
          this.$bus.$emit('sendIndexArray1', tmp)
        }else{
          alert("Please select at least one parameter to show!");
        }

      },
      changeType(type) {
        this.isReverse = !this.isReverse;
        this.sortType = type;
      },

      clearSele() {

        this.addedParams.forEach(ele => {
          ele.isChecked = false
        })

        this.addedParams = undefined;
        this.addedParams = new Array();
        this.checkedParams = undefined;
        this.checkedParams = new Array();

      },
      updateCheckedParams(param, event) {

        var idMatched = false
        if (event.target.checked) {
          this.checkedParams.forEach(ele => {
            if (ele.para === param.para) {
              idMatched = true
              return
            }
          })
          if (idMatched) return
          const tmpObj = {
            para: param.para,
            isSelected: false,
            id: param.id
          }
          this.checkedParams.push(tmpObj)
        } else {
          this.checkedParams = this.checkedParams.filter(
            (obj) => {
              return obj.para !== param.para
            }
          )
        }
      },
      addParam(ele) {
        var isIdInArray = this.addedParams.some(function(element) {
          return element.id === ele.id;
        });
        if (!isIdInArray){
          this.addedParams.push(ele)
          ele.isChecked = true
        }else{
          alert('This parameter haa already been added to the display list.')
        }
      },
      removeParam(ele) {
        ele.isChecked = false
        const index = this.currentNewAddedArray.findIndex(item => item.para === ele.para);
        if (index !== -1) {
          this.currentNewAddedArray.splice(index, 1);
        }
        const index1 = this.addedParams.findIndex(item => item.para === ele.para);
        if (index1 !== -1) {
          this.addedParams.splice(index1, 1);
        }
      },
      addParametersToShow(){
        this.listSelected = 1
        this.ataParas =  new Array();
        // this.isLoad = !this
        this.isAdd = true
      },
      showListParameters(param) {

        this.selectedList = param.id

        this.checkedParams = []
        this.addedParams = []

        const tmp = []
        param.paras.forEach(ele => {
          tmp.push({
            para: ele.paraName,
            id: ele.index,
            isChecked: false,
            isStart: false,
          })
        })
        this.curListId = param.id
        this.curListName = param.name

        this.ataParas = JSON.parse(JSON.stringify(tmp));
        this.addedParams = tmp.slice();
      },
      showParameters(ata) {
        this.selectedATA = ata.ATA
        var tmp = []
        for (var i = 0; i < ata.paras.length; i++) {
          tmp.push({
            para: ata.paras[i],
            id: ata.index[i],
            isChecked: false,
            isStart: false,
          })
        }
        this.ataParas = tmp

        // 清空之前已勾选的参数
        this.checkedParams = []
      },
      clearAll() {
        this.searchInput = ""
      },

      flashData(){
        var urlRoot1 = 'php/conditionMonitoring/paramerDisplay/paramerList.php';
        axios.get(urlHeads[pattern]+urlRoot1).then(
          response => {
            response.data.forEach(ele => {
              var boolArray = new Array(ele.RPName.length).fill(false)
              this.ataSys.push({
                ATA: ele.ATA,
                name: this.ATAName[ele.ATA],
                paras: ele.RPName,
                index: ele.RP_index,
                isChecked: ele.isChecked
              })
            })
          },
          error => {
            // alert('发送请求失败！', error.message)
          }
        )
      },

      flashListData(){
        this.params = []
        var urlRoot2 = 'php/conditionMonitoring/paramerDisplay/getParaList.php';
        axios.get(urlHeads[pattern]+urlRoot2).then(
          response => {
            response.data.forEach(ele => {
              this.params.push({
                name: ele.listName,
                id: ele.id,
                createdDate: ele.time,
                paras: ele.paras,
                isChecked: ele.isChecked
              })
            })
          },
          error => {
            // alert('发送请求失败！', error.message)
          }
        )
      },

      saveSele() {
        var isCreate = !this.isLoad

        const indexs = []
        if (this.addedParams.length > 0){
          this.addedParams.forEach(ele => {
            indexs.push(ele.id)
          })
        }

        var listId = this.curListId
        var listName = this.curListName

        this.$MessageBox({
          title: 'CREATE DISPLAY LIST',
          content: 'Enter List Name: ',
          indexArray: indexs,
          isCreate: isCreate,
          listId: listId,
          listName: listName
        }).then(() => {
          console.log('Save')
          this.flashListData()
        }).catch(() => {
          console.log('Cancel')
        })
      }
    },
    mounted() {
      this.flashData()
      this.flashListData()
    },
    computed: {
      sortCurrentArray() {
        var vm = this;
        var type = vm.sortType;
        return vm.ataSys.sort(function (a, b) {
          if (vm.isReverse) {
            if (typeof a[type] == "string"){
              return a[type].localeCompare(b[type]);
            }else{
              return b[type] - a[type];
            }
          }else{
            if (typeof a[type] == "string"){
              return b[type].localeCompare(a[type]);
            }else{
              return a[type] - b[type];
            }
          }
        });
      },
      currentNewPaArray() {
        this.parameterCountTotal =  this.ataParas.filter((item) => {
          return item.para.toLowerCase().includes(this.searchInput.toLowerCase());
        }).length

        return this.ataParas.filter((item) => {
          return item.para.toLowerCase().includes(this.searchInput.toLowerCase());
        })
      },
      currentNewAddedArray() {
        this.selectedCountTotal = this.addedParams.length
        return this.addedParams
      },
    }
  }
</script>


<style scoped>
  .mid-btn-group {
    position: absolute;
    bottom: 0;
    display: inline-block;
    margin-bottom: 0.5rem;
    margin-left: 3.5rem;
  }

  .add-btn-group {
    position: absolute;
    bottom: 0;
    display: inline-block;
    margin-bottom: 0.5rem;
    margin-left: -10.5rem;
  }

  .controller{
    margin-top: -6.5%;
    margin-left: 30%;
    position: absolute;
    width: 60%;
  }

  .top-bar-btn{
    background-image: linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127));
    color: white;
    width: 20%;
    height: 5vh;
  }

  .page-btn {
    color: white;
    background-image: linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127));
  }

  .param-tables {
    position: relative;
    text-align: left;
  }

  .left-table-area {
    position: relative;
    margin: auto;
    width: auto;
    height: 52vh;
    margin-top: 1vh;
  }
  .mid-table-area{
    position: relative;
    margin: auto;
    width: auto;
    height: 52vh;
  }
  .segment-title {
    width: 100%;
    border: 1.5px solid lightgray;
    border-left: none;
    border-right: none;
    height: 6vh;

  }

  .segment-title-right{
    width: 100%;
    border: 1.5px solid lightgray;
    height: 6vh;
    border-left: none;
    border-right: none;
    display: flex;
  }

  .button-bar-btn{
    background-image: linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127));
    color: white;
    width: 22vh;
    height: 5vh;
  }
  .param-wrapper {
    position: relative;
    margin-left: 1vh;
    margin-bottom: 2vh;
    margin-top: 2vh;
    margin-right: 1.5vh;
    transition: background-color 0.3s;
  }
  .param-wrapper:hover {
    /* 添加悬浮样式 */
    border: 1px solid #006EAA;
  }
  .add-button{
    position: absolute; /* 设置按钮的定位为 absolute */
    right: 3vh; /* 将按钮定位到父元素的最右边 */
    /* top: 50%; */
    width: 5%;
  }
  .check-button{
    width: 91%;
  }

  .selected {
    background-color: rgb(70, 72, 73);
  }

  .button-bar-btn1{
    background-image: linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127));
    color: white;
    width: 8vh;
  }
  .segment-bottom {
    height: 65vh;
  }

  .segment-middle {
    border: 1.5px solid lightgray;
    border-top: none;
    border-bottom: none;
    height: 64vh;
  }

  .search-input {
    border: 1.5px solid lightgray;
    background-color: black;
    margin-left: 0.5vh;
    color: white;
    height: auto;
  }

  .button-bar {
    margin-top: 0.5rem;
  }

  .icon {
    display: inline-block;
    color:white
  }
</style>
