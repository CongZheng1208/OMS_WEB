<template>
  <el-container>
    <el-header style="height: 10vh;">
      <el-row style="width: 100%;">
        <el-col :span="21">
          <div class="el-header-title">
            Test Selection
          </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
        <!-- <el-col :span="4">
          <el-select
            v-model="selectedType"
            placeholder="Select test type"
            @change="handleTypeChange"
            clearable
          >
            <el-option v-for="(label, value) in testDict" :key="value" :value="value" :label="label"></el-option>
          </el-select>
        </el-col> -->
      </el-row>
    </el-header>

    <el-main>
      <el-row :gutter="2">
        <el-col :span="6">
          <el-table
            highlight-current-row
            height="68vh"
            style=" background-color: rgb(46, 45, 45)"
            @row-click="handleATARowClick"
            :data="rawData"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>
            <el-table-column prop="ataNumber" label="ATA" sortable :width="null" :min-width="20"></el-table-column>
            <el-table-column prop="systemName" label="System Name" sortable :width="null" :min-width="50"></el-table-column>
            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="4">
          <el-table
            highlight-current-row
            height="68vh"
            @row-click="handleEquipmentRowClick"
            :data="selectedEquipments"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>
            <el-table-column prop="equipmentName" label="Equipment Name" sortable :width="null" :min-width="80"></el-table-column>
            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>
        </el-col>

        <el-col :span="14">
          <el-table
            highlight-current-row
            height="68vh"
            @row-click="handleTestRowClick"
            :data="filteredTestData"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>
            <el-table-column prop="T_NA" label="Test Name" sortable :width="null" :min-width="100"></el-table-column>
            <!-- <el-table-column align="right" :min-width="30">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="searchInput"
                  size="mini"
                  placeholder="Enter key word here"
                  clearable
                />
              </template>
            </el-table-column> -->
            <el-table-column prop="T_TP" label="Test Type" sortable :width="null" :min-width="80" :formatter="formatTestType"></el-table-column>
            <el-table-column prop="T_ED" label="Duration(mins)" sortable :width="null" :min-width="40"></el-table-column>
            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>
          <!-- <div class="table-outer-number">
            Number of Tests: {{ filteredTestDataLength }}
          </div> -->
        </el-col>
      </el-row>

      <el-dialog
        title="Error Message"
        :visible.sync="isTestNotBeSelected"
        width="30%">
        <span style="  font-size: 15px;">Please select a test!</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="isTestNotBeSelected = false"> OK </el-button>
        </span>
      </el-dialog>



    </el-main>
    <el-footer>
      <div>
      </div>
      <div>
        <el-button class="footer-btn" @click="goDefaultPage()">BACK</el-button>
        <el-button class="footer-btn" @click="goThreeTestsPage()">START TEST</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
  import { getATAandEqui } from '@/services/centralMaintenance/groundTest/index.js';
  import {ataNameEnum, testTypeEnum} from '@/globals/enums.js'
  import {updateCurrentTime, customSortMethodForProgressColumn} from '@/utils/utils.js'
  import Clock from '@/components/Clock'

  export default {
    data() {
      return {
        rawData: [],
        selectedATANum: "",
        selectedEquipment: {},
        selectedEquipments: [],

        testDict: testTypeEnum,
        selectedTestId: "",
        selectedType: '0',
        isTestNotBeSelected: false,

        searchInput: "",

        acReg: "C-WXWB",
        currentTime: '',
        currentDate: "",
      }
    },
    components: {
      Clock
    },
    methods: {
      /**
       * 本函数用于开启用户选中的测试
       * @param {Object} row
       */
      handleATARowClick(row) {
        this.selectedATANum = row.ataNumber;

        var selectedData = this.getSelectedData(this.selectedATANum)
        this.selectedEquipments = []

        for(var i=0; i<selectedData.equipmentName.length; i++){
          var equipObject = {}

          equipObject.ataNumber = selectedData.ataNumber
          equipObject.systemName = selectedData.systemName
          equipObject.equipmentName = selectedData.equipmentName[i]
          equipObject.availability = selectedData.availability[i]
          equipObject.testDetails = selectedData.testDetails[i]

          this.selectedEquipments.push(equipObject)
        }

         // 清除之前选择的Equipment
        this.selectedEquipment = {};
        // 清除之前选择的testId
        this.selectedTestId = "";
      },

      /**
       * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
       * @param {string} row - menus数据的name属性
       */
      handleEquipmentRowClick(row) {
        this.selectedEquipment = this.getSelectedEquipment(row.equipmentName)
        this.$store.state.groundTestList.selectedEquipment.equipmentName = this.selectedEquipment.equipmentName
        // 清除之前选择的testId
        this.selectedTestId = "";
      },

      /**
       * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
       * @param {string} row - rawData数据的ataNumber属性
       */
      handleTestRowClick(row) {
        this.selectedTestId = row.T_ID;
      },

      /**
       * 本函数是测试种类的适配器
       * @param {Object} row - 选中的某行数据
       */
      formatTestType(row) {
        return testTypeEnum[row.T_TP];
      },

      /**
       * 本函数用于更新更新选中到selectedType变量
       * @param {string} value - rawData数据的ataNumber属性
       */
      handleTypeChange(value) {
        this.selectedType = value;
      },

      /**
       * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
       * @param {string} row - menus数据的name属性
       */
      getSelectedData(ataNum) {
        return this.rawData.find(item => item.ataNumber === ataNum);
      },

      /**
       * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
       * @param {string} row - menus数据的name属性
       */
      getSelectedEquipment(selectEequipmentName) {
        return this.selectedEquipments.find(item => item.equipmentName === selectEequipmentName);
      },

      /**
       * 本函数用于跳转页面
       */
      goThreeTestsPage() {
        // 如果选择了要进行的测试
        if(this.selectedTestId){
          this.$store.state.groundTestList.currentGroundTestID = this.selectedTestId
          // 页面跳转之前先进行一次数据查询，防止页面切后数据还未刷新
          this.$store.commit("groundTestList/testPhp");

          this.$router.push({ name: "ThreeTests"});

        }else{
          // 否则弹框提示
          this.isTestNotBeSelected = true
        }
      },

      /**
       * 本函数用于跳转页面
       */
       goDefaultPage() {
        this.$router.push({ name: "TestList" });
      },

      updateCurrentTime,
      customSortMethodForProgressColumn,
    },

    computed: {
      filteredTestData() {
        if (this.selectedType === '0' || this.selectedType === '' ) {
          return this.selectedEquipment.testDetails;
        } else {
          return this.selectedEquipment.testDetails.filter(item => item.T_TP === this.selectedType);
        }
      },
      // filteredTestDataLength() {
      //   return this.filteredTestData.length;
      // }
    },

    mounted() {
      const relatedTests = this.$route.query;
      console.log("relatedTests:", relatedTests);


      getATAandEqui().then(response => {
        response.forEach(element => {
          var equipments = []
          var details = []

          if(Array.isArray(element.equipments)){
            element.equipments.forEach(equipment => {
              equipments.push(equipment.e_na)
              details.push(equipment.TEST_IN)
            })
          }else{
            equipments.push(element.equipments.e_na)
            details.push(element.equipments.TEST_IN)
          }

          this.rawData.push({
            ataNumber: element.ata,
            systemName: ataNameEnum[element.ata],
            equipmentName: equipments,
            availability: element.avai,
            testDetails: details,
          })
        });

        if(Object.keys(this.$route.query).length !== 0){
          this.handleATARowClick(relatedTests)
          this.handleEquipmentRowClick(relatedTests)
          this.handleTestRowClick(relatedTests)
        }


      }).catch(error => {
        console.error('Error in getting ata and equi list:', error);
      });
    },
  }

</script>


<style scoped>

</style>

