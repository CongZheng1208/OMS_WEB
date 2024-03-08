<template>
  <el-container>
    <el-header>
      <div>
        <div class="el-header-title">
          Test Status: {{ selectedRow.InitiatedTest_Status }}
        </div>
      </div>

    </el-header>
    <el-main>
      <el-table
        highlight-current-row
        height="70vh"
        @row-click="handleRowClick"
        :data="currentGroundTests"
        :sort-method="customSortMethodForProgressColumn"
        :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
        :empty-text="'No Data Display'"
      >
        <el-table-column :width="null" :min-width="5"></el-table-column>
        <el-table-column prop="ATA" label="ATA"  :width="null" :min-width="50"></el-table-column>
        <el-table-column prop="EquipmentName" label="Equipment Name" :width="null" :min-width="100"></el-table-column>
        <el-table-column prop="InitiatedTestName" label="Test Name" sortable :width="null" :min-width="200"></el-table-column>
        <el-table-column prop="StartTime" label="Start Time" sortable :width="null" :min-width="90" :formatter="formatStartTime"></el-table-column>
        <el-table-column prop="InitiatedTest_Status" label="Status" sortable :width="null" :min-width="50"></el-table-column>
        <el-table-column prop="progress" label="Progress" sortable :width="null" :min-width="100">
          <!-- <template slot-scope="scope">
            <el-progress
              :percentage="scope.row.progress"
              :color="getProgressColor(scope.row.progress)"
              :format="percent => `${percent}%`"
            >
            </el-progress>
          </template> -->
        </el-table-column>
        <el-table-column :width="null" :min-width="5"></el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <div>
        <el-button class="footer-btn" @click="printPage">PRINT</el-button>
      </div>
      <div>
        <el-button class="footer-btn" @click="goViewDetailPage">VIEW DETAIL</el-button>
        <el-button class="footer-btn" :disabled="true">RESPOND</el-button>
        <el-button class="footer-btn" @click="goNewTestPage">NEW TEST</el-button>
        <el-button class="footer-btn" @click="sendAbort" :disabled="true">ABORT TEST</el-button>
        <el-button class="footer-btn" @click="sendAbortAll">ABORT ALL</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
  import {printPage, customSortMethodForProgressColumn} from '@/utils/utils.js'
  import { postTestOrder } from '@/services/centralMaintenance/groundTest/index.js';
  import qs from 'qs'

  export default {
    data() {
      return {
        selectedRow: '',
        tableListTimer: '',

        currentGroundTests: this.$store.state.groundTestList.currentGroundTests
      }
    },
    methods: {

      /**
       * 本函数用于更新更新选中行到selectedRow变量
       * @param {string} row - menus数据的name属性
       */
      handleRowClick(row) {
        this.selectedRow = row
        this.$store.state.groundTestList.currentGroundTest = row
      },

      /**
       * 本函数用于返回进度对应的进度条颜色
       * @param {number} progress - 进度值
       * @returns {number} 该进度值对应的颜色rgb值
       */
      getProgressColor(progress) {
        if (progress < 20) {
          return '#ff4500';
        } else if (progress >= 20 && progress < 40) {
          return '#ffd700';
        } else if (progress >= 40 && progress < 100) {
          return '#00ced1';
        } else {
          return '#51cef1';
        }
      },

      formatStartTime(row) {
        if (row.StartTime) {
          return new Date(row.StartTime).toLocaleTimeString();
        }
        return '-';
      },

      formatProgress(row) {
        if (row.StartTime) {

          let timeDifference = new Date().getTime() - row.StartTime;
          // let timeDifference = row.EndTime - row.StartTime;
          // 计算进度值
          let progress = timeDifference / (row.TestDurationTime*60000);

          console.log(timeDifference)
          console.log(row.TestDurationTime)

          return Math.min(progress, 100);
        }
        return '-';
      },

      sendAbort(){
        let tmp = qs.stringify({
          page: "TestList",
          testID: this.$store.state.groundTestList.currentGroundTests.InitiatedTest_Index,
          message: "OrderSuccess"
        });

        postTestOrder(tmp).then(response => {
          console.log(response)
        }).catch(error => {
          console.error('Error in fetching parameter list:', error);
        });
      },

      sendAbortAll(){
        let tmp = qs.stringify({
          page: "TestList",
          // testID: this.$store.state.groundTestList.currentGroundTests.InitiatedTest_Index,
          message: "OrderSuccess"
        });

        postTestOrder(tmp).then(response => {
          console.log(response)
        }).catch(error => {
          console.error('Error in fetching parameter list:', error);
        });
      },


      // updateProgress() {
      //   console.log("is updating")
      //   const currentGroundTest = this.$store.state.groundTestList.currentGroundTest;
      //   if (currentGroundTest.StartTime) {
      //     let timeDifference = new Date().getTime() - currentGroundTest.StartTime;
      //     let progress = timeDifference / (currentGroundTest.TestDurationTime * 60000);

      //     // 更新进度值
      //     this.currentGroundTest.progress = Math.min(progress, 100);
      //   }
      // },

      /**
       * 本函数用于跳转页面
       */
      goNewTestPage() {
        this.$router.push({ name: "NewTest" });
      },

      /**
       * 本函数用于跳转页面
       */
      goViewDetailPage() {
        console.log(this.selectedRow)

        if(this.selectedRow !== ''){
          this.$router.push({ name: "ViewDetail" });
        }else{
          this.$message({
            message: 'Please select a test to view details',
            type: 'warning'
          });
        }
      },
      printPage,
      customSortMethodForProgressColumn
    },
    created() {

      // let tmp = qs.stringify({
      //   page: "groundTestDefault",
      //   message: "OrderSuccess"
      // });

      // postTestOrder(tmp).then(response => {
      //   console.log("success post to socket")
      //   console.log(response)

      // }).catch(error => {
      //   console.error('Error in fetching parameter list:', error);
      // });

      this.$store.state.groundTestList.currentGroundTestTimer = setInterval(
        this.postGroundTestPhp,
        1000
      );

    },
    beforeDestroy() {
      clearInterval(this.$store.state.groundTestList.currentGroundTestTimer)
    },
    mounted() {
      // this.tableListTimer = setInterval(() => {
      //   this.updateProgress()}, 1000
      // )
    }

  }

</script>

<style scoped>

</style>

