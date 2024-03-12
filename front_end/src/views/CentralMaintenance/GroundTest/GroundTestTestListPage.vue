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
        :data="currentGroundTestLists"
        :sort-method="customSortMethodForProgressColumn"
        :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
        :empty-text="'No Data Display'"
        v-loading="loading"
        element-loading-text="Data Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
      >
        <el-table-column :width="null" :min-width="5"></el-table-column>
        <el-table-column prop="ATA" label="ATA"  :width="null" :min-width="50"></el-table-column>
        <el-table-column prop="EquipmentName" label="Equipment Name" :width="null" :min-width="100"></el-table-column>
        <el-table-column prop="InitiatedTestName" label="Test Name" sortable :width="null" :min-width="180"></el-table-column>
        <el-table-column prop="StartTime" label="Start Time" sortable :width="null" :min-width="60" :formatter="formatStartTime"></el-table-column>
        <el-table-column prop="InitiatedTest_Status" label="Status" sortable :width="null" :min-width="80"></el-table-column>
        <el-table-column prop="progress" label="Progress" sortable :width="null" :min-width="80">
          <template slot-scope="scope">
            <el-progress
              :percentage="scope.row.progress"
              :color="getProgressColor(scope.row.progress)"
              :format="percent => `${percent}%`"
              :text-inside=true
              :stroke-width=16
            >
            </el-progress>

          </template>
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
  import {printPage, customSortMethodForProgressColumn, handleTestOrder} from '@/utils/utils.js'

  import qs from 'qs'

  export default {
    data() {
      return {
        selectedRow: '',
        tableListTimer: '',
        refreshInterval: '',
        currentGroundTestLists: [],
        loading: true


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
          return '#FF6666';
        } else if (progress >= 20 && progress < 40) {
          return '#ffd700';
        } else if (progress >= 40 && progress < 80) {
          return '#00ced1';
        } else if (progress >= 80 && progress < 100){
          return '#51cef1';
        } else {
          return '#66CC99';
        }
      },

      /**
       * 本函数用于计算StartTime属性的展示值
       */
      formatStartTime(row) {
        if (row.StartTime) {
          return new Date(row.StartTime).toLocaleTimeString();
        }
        return '-';
      },



      /**
       * 本函数用于向成员系统发送中止选中的测试的命令
       */
      sendAbort(){
        let tmp = qs.stringify({
          OrderType: "ABORT",

          currentPage: "TestList",
          InitiatedTest_Index: this.$store.state.groundTestList.currentGroundTests.InitiatedTest_Index,
          MemberSystemID: "NULL",

          currentScreenId: "",
          selectedOption: "",
        });

        this.handleTestOrder(tmp)
      },


      /**
       * 本函数用于向成员系统发送全部中止的命令
       */
      sendAbortAll(){
        let tmp = qs.stringify({
          OrderType: "ABORTALL",

          currentPage: "TestList",
          InitiatedTest_Index: "",
          MemberSystemID: "",

          currentScreenId: "",
          selectedOption: "",
        });

        this.handleTestOrder(tmp)
      },

      /**
       * 本函数用于更新测试的进度值
       */
      updateCurrentGroundTestLists() {
        this.currentGroundTestLists = this.$store.state.groundTestList.currentGroundTests.map(test => {

          if(test.InitiatedTest_Status == "GROUND_TEST_COMPLETE" || test.InitiatedTest_Status == "GROUND_TEST_PASS"){
            return {
              ...test,
              progress: parseFloat(100)
            };
          }else if(test.InitiatedTest_Status == "GROUND_TEST_NOT_STARTED" || test.InitiatedTest_Status == "GROUND_TEST_FAIL"|| test.InitiatedTest_Status == "GROUND_TEST_ERROR"|| test.InitiatedTest_Status == "GROUND_TEST_INHIBITED"){
            return {
              ...test,
              progress: parseFloat(0)
            };
          }else{
            const currentTime = new Date().getTime();
            const startTime = new Date(test.StartTime).getTime();
            return {
              ...test,
              progress: parseFloat(Math.min((currentTime - startTime)/(600*test.TestDurationTime ), 99).toFixed(2))
            };
          }
        });
      },

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
      handleTestOrder,
      customSortMethodForProgressColumn
    },
    created() {

      this.$store.state.groundTestList.currentGroundTestTimer = setInterval(
        this.postGroundTestPhp,
        1000
      );

    },
    computed: {

    },
    beforeDestroy() {
      clearInterval(this.$store.state.groundTestList.currentGroundTestTimer)
      clearInterval(this.refreshInterval);
    },
    mounted() {
      this.updateCurrentGroundTestLists();

      this.refreshInterval = setInterval(() => {
        this.updateCurrentGroundTestLists();
      }, 1000);

      setTimeout(() => {
        this.loading = false;
      }, 100);
    }

  }

</script>

<style scoped>

</style>

