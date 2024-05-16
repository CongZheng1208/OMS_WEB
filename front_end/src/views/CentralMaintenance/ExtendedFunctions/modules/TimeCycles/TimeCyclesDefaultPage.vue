<template>
  <div style="background-color: rgb(45, 45, 45);">
    <el-row>
      <el-col :span="21">
        <div class="el-subheader"> Time Cycle Status: {{ }} </div>
      </el-col>
      <el-col :span="3">
        <div class="el-subheader"> Total Number: {{ timeCycleData.length }} </div>
      </el-col>
    </el-row>
    <el-row>
      <el-table height="65vh"
                :data="timeCycleData"
                :sort-method="customSortMethodForProgressColumn"
                :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                :empty-text="'No Data Display'"
                v-loading="loading"
                element-loading-text="Data Loading..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.5)">
        <el-table-column :width="null"
                         :min-width="5"></el-table-column>
        <el-table-column prop="ATA"
                         label="ATA"
                         sortable
                         :width="null"
                         :min-width="50"></el-table-column>
        <el-table-column prop="MemberSystemName"
                         label="Equipment Name"
                         sortable
                         :width="null"
                         :min-width="100"></el-table-column>
        <el-table-column prop="status"
                         label="Status"
                         sortable
                         :width="null"
                         :min-width="50"></el-table-column>
        <el-table-column prop="hours"
                         label="Hours"
                         :width="null"
                         :min-width="50"></el-table-column>
        <el-table-column prop="cycles"
                         label="Cycles"
                         :width="null"
                         :min-width="50">
        </el-table-column>
        <el-table-column :width="null"
                         :min-width="5"></el-table-column>
      </el-table>
      <div class="table-outer-note">
        <el-button circle
                   slot="reference"
                   class="table-outer-button"
                   icon="el-icon-refresh"
                   @click="flashData"></el-button> Notes: Data marked with "*" is obtained by calculating When the MS
        compute module fails
      </div>
    </el-row>
    <el-footer>
      <div>
        <button class="footer-btn"
                @click="printPage">PRINT</button>
      </div>
      <div>
        <button class="footer-btn"
                @click="goSelectPage">SELECT</button>
      </div>
    </el-footer>
  </div>
</template>
<script>
import { printPage, customSortMethodForProgressColumn } from '@/utils/utils.js'
import { getTimeCycle } from '@/services/centralMaintenance/extendedFunctions/index.js';

export default {
  data() {
    return {
      timeCycleData: [],
      currenTimeCyclesTimer: {},
      loading: true
    };
  },
  methods: {
    /**
     * 本函数用于跳转页面
     */
    goSelectPage() {
      this.$router.push({ name: "TimeCyclesSelect" });
    },
    flashData() {
      getTimeCycle().then(response => {
        this.timeCycleData = response;
        console.log(response)
      }).catch(error => {
        console.error('Error in getting fde list:', error);
      });

      this.loading = true

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },

    printPage,
    customSortMethodForProgressColumn
  },
  created() {
    this.flashData()

    // this.currenTimeCyclesTimer = setInterval(
    //   this.getTimeCycleInTime,
    //   1000
    // )
  },
  beforeDestroy() {
    clearInterval(this.currenTimeCyclesTimer)
  }
}
</script>
<style></style>
