<template>
  <div>
    <el-main>
      <div class="controller" >
        <el-select
          v-model="listSelected"
          placeholder="Select parameter pattern"
          @change="updateRadio"
        >
          <el-option v-for="x in testData" :key="x.value" :value="x.value" :label="x.name"></el-option>
        </el-select>
      </div>

      <el-row :gutter="2">
        <el-col :span="6">
          <div v-if="listSelected==1" >
            <el-table
              highlight-current-row
              height="62vh"
              style=" background-color: rgb(46, 45, 45)"
              @row-click="showParameters"
              :data="sortCurrentArray"
              :sort-method="customSortMethodForProgressColumn"
              :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
              :empty-text="'No Data Display'"
            >
              <el-table-column :width="null" :min-width="5"></el-table-column>
              <el-table-column prop="ATA" label="ATA" sortable :width="null" :min-width="20"></el-table-column>
              <el-table-column prop="name" label="System Name" sortable :width="null" :min-width="50"></el-table-column>
              <el-table-column :width="null" :min-width="5"></el-table-column>
            </el-table>
          </div>

          <div v-if="listSelected==2">
            <el-table
              highlight-current-row
              height="62vh"
              style=" background-color: rgb(46, 45, 45)"
              @row-click="showListParameters"
              :data="params"
              :sort-method="customSortMethodForProgressColumn"
              :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
              :empty-text="'No Data Display'"
            >
              <el-table-column :width="null" :min-width="5"></el-table-column>
              <el-table-column prop="name" label="List Name" sortable :width="null" :min-width="35"></el-table-column>
              <el-table-column prop="createdDate" label="Date Created" sortable :width="null" :min-width="40"></el-table-column>
              <el-table-column :width="null" :min-width="5"></el-table-column>
            </el-table>
          </div>
        </el-col>

        <el-col :span="9">
          <el-row>
            <el-table
              height="62vh"
              style=" background-color: rgb(46, 45, 45)"
              :data="currentNewPaArray.filter(data => !searchInput || data.para.toLowerCase().includes(searchInput.toLowerCase()))"

              :sort-method="customSortMethodForProgressColumn"
              :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
              :empty-text="'No Data Display'"
            >
              <el-table-column :width="null" :min-width="5"></el-table-column>
              <el-table-column prop="para" label="Parameter Selection" sortable :width="null" :min-width="120"></el-table-column>

              <el-table-column align="right" :min-width="30">
                <template slot="header" slot-scope="scope">
                  <el-input
                    v-model="searchInput"
                    size="mini"
                    placeholder="Enter key word here"
                    clearable
                  />
                </template>
                <template slot-scope="scope">
                  <span
                    @click="addParam(scope.row)"
                    v-if="!scope.row.isChecked"
                    :style="{ padding: '1vh', height: '4vh', width: '4vh', backgroundColor: 'rgb(70, 72, 73)', color: 'white'}"
                    style="transition: background-color 0.3s;"
                    @mouseenter="$event.target.style.backgroundColor = 'rgb(90, 90, 90)'"
                    @mouseleave="$event.target.style.backgroundColor = 'rgb(70, 72, 73)'"
                  >
                    +
                  </span>
                </template>
              </el-table-column>
              <el-table-column :width="null" :min-width="5"></el-table-column>
            </el-table>
            <div class="table-inner-number">
              Total Number: {{ parameterCountTotal }}
            </div>
          </el-row>
        </el-col>

        <el-col :span="9">
          <el-table
            height="62vh"
            style=" background-color: rgb(46, 45, 45)"
            :data="currentNewAddedArray"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>
            <el-table-column prop="para" label="Parameter to Display" sortable :width="null" :min-width="120"></el-table-column>

            <el-table-column align="right" :min-width="20">

              <template slot-scope="scope">
                <span
                  @click="removeParam(scope.row)"
                  :style="{ padding: '1vh', height: '4vh', width: '4vh', backgroundColor: 'rgb(70, 72, 73)', color: 'white'}"
                  style="transition: background-color 0.3s;"
                  @mouseenter="$event.target.style.backgroundColor = 'rgb(90, 90, 90)'"
                  @mouseleave="$event.target.style.backgroundColor = 'rgb(70, 72, 73)'"
                >
                  -
                </span>
              </template>
            </el-table-column>
            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>


          <div class="table-inner-number">
            <el-button
              v-if="listSelected==2"
              :style="{
                backgroundColor: 'rgb(70, 72, 73)',
                color: 'white'
              }"
              @click="addParametersToShow">ADD</el-button>
            Total Number: {{ this.addedParams.length }}
          </div>

        </el-col>
      </el-row>


      <el-dialog
        title="Error Message"
        style="font-size: 15px; color: white;"
        :visible.sync="isParameterSelected"
        width="30%"
      >
        <span style="font-size: 15px; color: white;">Please select at least one parameter to show!</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="isParameterSelected = false">OK</el-button>
        </span>
      </el-dialog>


    </el-main>
    <el-footer>
      <div>
      </div>
      <div>
        <el-button class="footer-btn" @click="saveSele()">SAVE</el-button>
        <el-button class="footer-btn" @click="clearSele()">CLEAR</el-button>
        <el-button class="footer-btn" @click="startView">START VIEW</el-button>
      </div>
    </el-footer>
  </div>
</template>

<script>
  import {ataNameEnum} from '@/globals/enums.js'
  import {customSortMethodForProgressColumn} from '@/utils/utils.js'
  import { getParaSet,getParaList } from '@/services/conditionMonitoring/parameterDisplay/index.js';

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
        isParameterSelected: false,
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

    methods: {
      /**
       * 本函数用于记录跳转后的
       */
      updateRadio() {
        this.ataParas =  new Array();
        this.addedParams = new Array();
        this.flashListData()

        if(this.isAdd){
          this.isAdd = false
        }else{
          this.isLoad = !this.isLoad
        }
      },

      /**
       * 本函数用于跳转参数展示的三种不同模块
       * @param {string} value 代表三种模块的不同字符值
       */
      startView() {
        if(this.addedParams.length > 0){
          var tmp = []
          this.addedParams.forEach(ele => {
            tmp.push(ele)
          })
          this.$router.push({ name: "StartView", params: { selectedParameter: tmp }});
        }else{
          this.isParameterSelected = true
        }
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

      addParam(ele) {

        var isIdInArray = this.addedParams.some(function(element) {
          return element.id === ele.id;
        });
        if (!isIdInArray){
          this.addedParams.push(ele)
          ele.isChecked = true
        }else{
          this.$message('This parameter haa already been added to the display list.')
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

      /*
       * 本函数用于调用service中封装的api，实现一次对参数集合数据的获取
       */
      flashData() {
        getParaSet().then(response => {
          response.forEach(ele => {
            // var boolArray = new Array(ele.RPName.length).fill(false)
            this.ataSys.push({
              ATA: ele.ATA,
              name: ataNameEnum[ele.ATA],
              paras: ele.RPName,
              index: ele.RP_index,
              isChecked: ele.isChecked
            })
          })
        }).catch(error => {
          console.error('Error in fetching parameter list:', error);
        });
      },

      /*
       * 本函数用于调用service中封装的api，实现一次对参数列表数据的获取
       */
      flashListData() {
        this.params = [];
        getParaList().then(response => {
          response.forEach(ele => {
            this.params.push({
              name: ele.listName,
              id: ele.id,
              createdDate: ele.time,
              paras: ele.paras,
              isChecked: ele.isChecked
            })
          })
        }).catch(error => {
          console.error('Error in fetching parameter list:', error);
        });
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
      },
      customSortMethodForProgressColumn,
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
</style>
