<template>
  <div style="background-color: rgb(45, 45, 45);">
    <el-main>
      <div class="controller">
        <el-select v-model="listSelected"
                   placeholder="Select parameter pattern"
                   @change="updateRadio">
          <el-option v-for="x in testData"
                     :key="x.value"
                     :value="x.value"
                     :label="x.name"></el-option>
        </el-select>
      </div>
      <el-row :gutter="2">
        <el-col :span="6"
                style="border:  0.5px solid rgb(111, 111, 111);">
          <div v-if="listSelected == 1">
            <el-table highlight-current-row
                      height="62vh"
                      style=" background-color: rgb(46, 45, 45)"
                      @row-click="showParameters"
                      :data="ataData"
                      :sort-method="customSortMethodForProgressColumn"
                      :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                      :empty-text="'NO DATA DISPLAY'">
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
              <el-table-column prop="ata"
                               label="ATA System Name"
                               sortable
                               :width="null"
                               :formatter="formatATASystemName"
                               :min-width="50"></el-table-column>
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
            </el-table>
            <div class="table-lower-bar">
            </div>
          </div>
          <div v-if="listSelected == 2">
            <el-table highlight-current-row
                      height="62vh"
                      style=" background-color: rgb(46, 45, 45)"
                      @row-click="showListParameters"
                      :data="params"
                      :sort-method="customSortMethodForProgressColumn"
                      :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                      :empty-text="'NO DATA DISPLAY'">
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
              <el-table-column prop="name"
                               label="List Name"
                               sortable
                               :width="null"
                               :min-width="35"></el-table-column>
              <el-table-column prop="createdDate"
                               label="Date Created"
                               sortable
                               :width="null"
                               :min-width="40"></el-table-column>
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
            </el-table>
            <div class="table-lower-bar">
            </div>
          </div>
        </el-col>
        <el-col :span="9"
                style="border:  0.5px solid rgb(111, 111, 111);">
          <el-row>
            <el-table height="62vh"
                      style=" background-color: rgb(46, 45, 45)"
                      :data="currentNewPaArray.filter(data => !searchInput || data.para.toLowerCase().includes(searchInput.toLowerCase()))"
                      :sort-method="customSortMethodForProgressColumn"
                      :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                      :empty-text="'NO DATA DISPLAY'">
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
              <el-table-column prop="para"
                               label="Parameter Selection"
                               sortable
                               :width="null"
                               :min-width="150">
                <template slot="header"
                          slot-scope="scope">Parameter Selection <el-input
                            style="margin-left: 2vh; margin-right: 1vh; width: 15vh;"
                            v-model="searchInput"
                            placeholder="Enter key word here"
                            size="mini"
                            clearable />
                  <i class="el-icon-search"></i>
                </template></el-table-column>
              <el-table-column align="right"
                               :min-width="30">
                <template slot-scope="scope">
                  <span @click="// @ts-ignore
          addParam(scope.row)"
                        v-if="!scope.row.isChecked"
                        :style="{ padding: '1vh', height: '4vh', width: '4vh', backgroundColor: 'rgb(70, 72, 73)', color: 'white' }"
                        style="transition: background-color 0.3s;"
                        @mouseenter="// @ts-ignore
          $event.target.style.backgroundColor = 'rgb(90, 90, 90)'"
                        @mouseleave="// @ts-ignore
          $event.target.style.backgroundColor = 'rgb(70, 72, 73)'"> + </span>
                </template>
              </el-table-column>
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
            </el-table>
            <div class="table-lower-bar">
              <span class="table-lower-bar-right-text"> Total Number: {{ parameterCountTotal }} </span>
            </div>
          </el-row>
        </el-col>
        <el-col :span="9"
                style="border:  0.5px solid rgb(111, 111, 111);">
          <el-table height="62vh"
                    style=" background-color: rgb(46, 45, 45)"
                    :data="addedParams"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'NO DATA DISPLAY'">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="para"
                             label="Parameter to Display"
                             sortable
                             :width="null"
                             :min-width="120"></el-table-column>
            <el-table-column align="right"
                             :min-width="20">
              <template slot-scope="scope">
                <span @click="// @ts-ignore
          removeParam(scope.row)"
                      :style="{ padding: '1vh', height: '4vh', width: '4vh', backgroundColor: 'rgb(70, 72, 73)', color: 'white' }"
                      style="transition: background-color 0.3s;"
                      @mouseenter="// @ts-ignore
          $event.target.style.backgroundColor = 'rgb(90, 90, 90)'"
                      @mouseleave="// @ts-ignore
          $event.target.style.backgroundColor = 'rgb(70, 72, 73)'"> - </span>
              </template>
            </el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
          <div class="table-lower-bar">
            <span class="table-lower-bar-right-text"> <el-button circle
                         v-if="listSelected == 2"
                         slot="reference"
                         class="table-outer-button"
                         icon="el-icon-circle-plus-outline"
                         @click="addParametersToShow"></el-button> Total Number: {{ this.addedParams.length }} </span>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="ERROR MESSAGE"
                 :visible.sync="isParameterSelected"
                 width="30%">
        <p style="color:black">Please select at least one parameter to show!</p>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="isParameterSelected = false">OK</el-button>
        </span>
      </el-dialog>
      <el-dialog :visible.sync="isListOverwriten"
                 width="30%">
        <el-row>
          <el-button type="primary"
                     style="width: 80%; height: 20%;
                     margin: 2vh;"
                     @click="isListSaved = true">CREATE A NEW PARAMETER LIST</el-button>
          <el-button type="primary"
                     style="width: 80%; height: 20%;
                     margin: 2vh;"
                     @click="overwriteSelectedList();">OVERWRITE THE ORIGINAL LIST</el-button>
        </el-row>
      </el-dialog>
      <el-dialog title="CREATE DISPLAY LIST"
                 :visible.sync="isListSaved"
                 @close="inputListName = ''"
                 width="50%"
                 :close-on-click-modal="true">
        <el-row>
          <el-col :span="6">
            <div style="color: #000000;"> Enter List Name: </div>
          </el-col>
          <el-col :span="18">
            <el-input v-model="inputListName"
                      size="mini"
                      clearable
                      placeholder="Please enter List Name:"></el-input>
            <div style="margin-top: 10px;">
              <div style="color: #999; font-size: 12px; text-align: left;">Name Rule: ATA-Description(20 characters)
              </div>
              <div style="color: #999; font-size: 12px; text-align: left;">Example: 26-temperaturecheck</div>
            </div>
          </el-col>
        </el-row>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="isListSaved = false">Cancel</el-button>
          <el-button type="primary"
                     @click="saveSelectedList();">Save</el-button>
        </div>
      </el-dialog>
    </el-main>
    <el-footer>
      <div>
      </div>
      <div>
        <button class="footer-btn"
                @click="openSaveDialog">SAVE</button>
        <button class="footer-btn"
                @click="clearSelectedList()">CLEAR</button>
        <button class="footer-btn"
                @click="startView">START VIEW</button>
      </div>
    </el-footer>
  </div>
</template>
<script>
// @ts-ignore
import { ataNameEnum } from '@/globals/enums.js'
// @ts-ignore
import qs from 'qs'
import { customSortMethodForProgressColumn } from '@/utils/utils.ts'
import { getParaList, getParaSetNew, saveList } from '@/services/conditionMonitoring/parameterDisplay/index.js';

export default {
  name: "ParamListDisplay",
  emits: ["startView"],
  data() {
    return {
      searchInput: "",
      listSelected: 1,
      ataSelected: false,
      isParameterSelected: false,
      isListSaved: false,
      isListOverwriten: false,
      ataData: [],
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
      addedParams: [],
      parameterCountTotal: 0,
      inputListName: '',
      ataParas: [],
      selectedList: {}
    };
  },

  methods: {
    /**
     * 本函数用于切换模式（选择自由参数/选择已保存参数）
     */
    updateRadio() {
      // @ts-ignore
      this.ataParas = new Array();
      // @ts-ignore
      this.addedParams = new Array();
      this.flashListData()

      this.searchInput = ""
      this.selectedList = {}

    },

    /**
     * 本函数用于设置EquiAvailablilty的显示格式
     * @param {*} row table选中行信息
     */
    formatATASystemName(row) {
      return row.ata ? row.ata : "ATA Unknown";
    },

    /**
     * 本函数用于将选择的addedParams传递至下一个页面中
     */
    startView() {
      if (this.addedParams.length > 0) {
        // @ts-ignore
        var tmp = []
        this.addedParams.forEach(ele => {
          tmp.push(ele)
        })
        // @ts-ignore
        this.$router.push({ name: "StartView", params: { selectedParameter: tmp } });
      } else {
        this.isParameterSelected = true
      }
    },

    /**
     * 本函数用于清除选择的addedParams
     */
    clearSelectedList() {
      this.addedParams.forEach(ele => {
        // @ts-ignore
        ele.isChecked = false
      })
      // @ts-ignore
      this.addedParams = undefined;
      // @ts-ignore
      this.addedParams = new Array();
    },


    /**
     * 本函数用于向addedParams中添加参数
     *
     */
    addParam(ele) {
      var isIdInArray = this.addedParams.some(function (element) {
        // @ts-ignore
        return element.id === ele.id;
      });
      if (!isIdInArray) {
        // @ts-ignore
        this.addedParams.push(ele)
        ele.isChecked = true
      } else {
        this.$message('This parameter haa already been added to the display list.')
      }
    },


    // @ts-ignore
    removeParam(ele) {
      ele.isChecked = false
      // @ts-ignore
      const index = this.addedParams.findIndex(item => item.para === ele.para);
      if (index !== -1) {
        this.addedParams.splice(index, 1);
      }
      // @ts-ignore
      const index1 = this.addedParams.findIndex(item => item.para === ele.para);
      if (index1 !== -1) {
        this.addedParams.splice(index1, 1);
      }
    },

    addParametersToShow() {
      this.listSelected = 1
      // @ts-ignore
      this.ataParas = new Array();
      this.isAdd = true
    },


    // @ts-ignore
    showListParameters(param) {
      this.selectedList = param

      this.addedParams = []
      this.searchInput = ""

      // @ts-ignore
      const tmp = []
      // @ts-ignore
      param.paras.forEach(ele => {
        tmp.push({
          para: ele.paraName,
          id: ele.index,
          isChecked: false,
          isStart: false,
        })
      })

      // @ts-ignore
      this.ataParas = JSON.parse(JSON.stringify(tmp));
      // @ts-ignore
      this.addedParams = tmp.slice();
    },


    // @ts-ignore
    showParameters(ata) {
      this.searchInput = ""
      var tmp = []
      for (var i = 0; i < ata.params.length; i++) {
        tmp.push({
          para: ata.params[i].key,
          id: ata.params[i].id,
          unit: ata.params[i].unit,
          isChecked: false,
          isStart: false,
        })
      }
      // @ts-ignore
      this.ataParas = tmp
    },

    /*
     * 本函数用于调用service中封装的api，实现一次对参数集合数据的获取
     */
    flashData() {
      getParaSetNew().then(response => {
        // this.ataData = response
        Object.keys(response).forEach(key => {
          const value = response[key];  // 获取当前key对应的value
          // @ts-ignore
          this.ataData.push({
            ata: key,
            params: value  // 将value存入params中
          });
        });
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
        // @ts-ignore
        response.forEach(ele => {
          // @ts-ignore
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

    openSaveDialog() {
      if (this.selectedList.id) {
        this.isListOverwriten = true
      } else {
        this.isListSaved = true
      }
    },

    /*
     * 本函数用于调用service中封装的api，实现一次对参数列表数据的获取
     */
    saveSelectedList() {
      // 定义格式要求的正则表达式
      const regex = /^\d{2}-[a-zA-Z]+$/;

      // 检查输入是否满足格式要求
      if (regex.test(this.inputListName)) {

        console.log("this.addedParams", this.addedParams)

        if (this.addedParams.length > 0) {

          let tmp = qs.stringify({
            id: "",
            ListName: this.inputListName,
            paras: this.addedParams
          });
          saveList(tmp)

          this.flashListData()
          this.$message({ message: 'Successfully saved', type: 'success' });

        } else {
          this.$message('Please select one parameter to save at least.')
        }
        this.isListSaved = false
        this.isListOverwriten = false
      } else {
        // 输入不符合格式要求
        this.$message('The form of input list name is not allowed.')
      }
    },


    /*
      * 本函数用于调用service中封装的api，实现一次对参数列表数据的获取
      */
    overwriteSelectedList() {

      if (this.addedParams.length > 0) {

        let tmp = qs.stringify({
          id: this.selectedList.id,
          ListName: this.selectedList.name,
          paras: this.addedParams
        });
        saveList(tmp)

        this.flashListData()
        this.$message({ message: 'Successfully saved', type: 'success' });

      } else {
        this.$message('Please select one parameter to save at least.')
      }
      this.isListSaved = false
      this.isListOverwriten = false
    },

    customSortMethodForProgressColumn,
  },
  mounted() {
    this.flashData()
    this.flashListData()
  },
  computed: {
    currentNewPaArray() {
      this.parameterCountTotal = this.ataParas.filter((item) => {
        // @ts-ignore
        return item.para.toLowerCase().includes(this.searchInput.toLowerCase());
      }).length

      return this.ataParas.filter((item) => {
        // @ts-ignore
        return item.para.toLowerCase().includes(this.searchInput.toLowerCase());
      })
    },
    // currentNewAddedArray() {
    //   this.selectedCountTotal = this.addedParams.length
    //   return this.addedParams
    // },
  }
}
</script>
<style scoped></style>
