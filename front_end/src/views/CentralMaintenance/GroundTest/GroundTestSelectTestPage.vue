<template>
  <el-container>
    <el-header style="height: 10vh;">
      <el-row style="width: 100%;">
        <el-col :span="4">
          <div class="el-header-title">
            Test Selection
          </div>
        </el-col>
        <el-col :span="16">
          <div class="el-header-subtitle">
            <div class="el-header-subcontainer">
              <span class="el-header-dot" ></span>
              ATA: {{ this.$store.state.groundTestList.selectedEquipment.ataNumber }} {{ this.$store.state.groundTestList.selectedEquipment.systemName }}
            </div>
            <div class="el-header-subcontainer">
              <span class="el-header-dot" ></span>
              Equipment Name: {{ this.$store.state.groundTestList.selectedEquipment.equipmentName }}
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="selectedType"
            placeholder="Select test type"
            @change="handleTypeChange"
            clearable
          >
            <el-option v-for="(label, value) in testDict" :key="value" :value="value" :label="label"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-table
        highlight-current-row
        height="68vh"
        @row-click="handleRowClick"
        :data="filteredTestData"
        :sort-method="customSortMethodForProgressColumn"
        :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
        :empty-text="'No Data Display'"
      >
        <el-table-column :width="null" :min-width="5"></el-table-column>
        <el-table-column prop="T_NA" label="Test Name" sortable :width="null" :min-width="120"></el-table-column>
        <el-table-column prop="T_TP" label="Test Type" sortable :width="null" :min-width="80" :formatter="formatTestType"></el-table-column>
        <el-table-column prop="T_ED" label="Expected Duration (mins)" sortable :width="null" :min-width="60"></el-table-column>
        <el-table-column label="Availability" :width="null" :min-width="30"></el-table-column>
        <el-table-column label="Note" :width="null" :min-width="30"></el-table-column>
        <el-table-column :width="null" :min-width="5"></el-table-column>
      </el-table>
      <div class="table-outer-number">
        Number of Tests: {{ filteredTestDataLength }}
      </div>

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
        <el-button class="footer-btn" @click="goSelectATAandEquipmentPage()">BACK</el-button>
        <el-button class="footer-btn" @click="goThreeTestsPage()">START TEST</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>

import {customSortMethodForProgressColumn} from '@/utils/utils.js'
import {testTypeEnum} from '@/globals/enums.js'


export default {
  data() {
    return {
      testDict: testTypeEnum,
      testDetails: [],
      selectedTestId: "",
      selectedType: '0',
      isTestNotBeSelected: false

    }
  },
  computed: {
    filteredTestData() {
      if (this.selectedType === '0' || this.selectedType === '' ) {
        return this.testDetails;
      } else {
        return this.testDetails.filter(item => item.T_TP === this.selectedType);
      }
    },
    filteredTestDataLength() {
      return this.filteredTestData.length;
    }
  },
  methods: {
    /**
     * 本函数用于更新更新选中到selectedType变量
     * @param {string} value - rawData数据的ataNumber属性
     */
    handleTypeChange(value) {
      this.selectedType = value;
    },

    /**
     * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
     * @param {string} row - rawData数据的ataNumber属性
     */
    handleRowClick(row) {
      this.selectedTestId = row.T_ID;
    },

    formatTestType(row) {
      return testTypeEnum[row.T_TP];
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
    goSelectATAandEquipmentPage() {
      this.$router.push({ name: "NewTest" });
    },

    customSortMethodForProgressColumn
  },

  mounted() {
    this.testDetails = this.$store.state.groundTestList.selectedEquipment.testDetails
  }
}

</script>

<style scoped>
</style>

