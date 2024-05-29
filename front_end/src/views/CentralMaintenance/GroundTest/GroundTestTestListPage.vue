<template>
  <div style="background-color: rgb(45, 45, 45);">
    <el-header style="height: 8vh;">
      <el-row style="width: 100%;">
        <el-col :span="21">
          <div class="el-header-title"> Test Status: {{ curTotalStatus }} </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-table highlight-current-row
                  height="71vh"
                  @row-click="handleRowClick"
                  style=" background-color: rgb(46, 45, 45)"
                  :data="currentGroundTestLists"
                  :sort-method="customSortMethodForProgressColumn"
                  :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                  :empty-text="'NO DATA DISPLAY'"
                  v-loading="loading"
                  element-loading-text="Data Loading..."
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.5)"
                  :row-class-name="rowTestName">
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
          <el-table-column prop="InitiatedTestName"
                           label="Test Name"
                           sortable
                           :width="null"
                           :min-width="180"></el-table-column>
          <el-table-column prop="StartTime"
                           label="Start Time"
                           sortable
                           :width="null"
                           :min-width="60"
                           :formatter="formatStartTime"></el-table-column>
          <el-table-column prop="InitiatedTest_Status"
                           label="Status"
                           :width="null"
                           :min-width="80"
                           :formatter="formatTestStatus"></el-table-column>
          <el-table-column prop="progress"
                           label="Progress"
                           sortable
                           :width="null"
                           :min-width="80">
            <template slot-scope="scope">
              <el-progress :percentage="scope.row.progress"
                           :color="getProgressColor(scope.row.progress)"
                           :format="percent => `${percent}%`"
                           :stroke-width=14
                           text-color=#ffffff
                           define-back-color=#505050
                           stroke-linecap=square>
              </el-progress>
            </template>
          </el-table-column>
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
        </el-table>
        <div class="table-outer-number"> Number of Tests: {{ currentGroundTestLists.length }} </div>
      </el-row>
    </el-main>
    <el-footer>
      <div>
        <button class="footer-btn"
                @click="printPage">PRINT</button>
      </div>
      <div>
        <button class="footer-btn"
                @click="goViewDetailPage"
                :disabled="!['2', '5', '6', '7'].includes(selectedRow.InitiatedTest_Status)">VIEW DETAILS</button>
        <button class="footer-btn"
                @click="goInteractiveTextPage"
                :disabled="!['3', '8'].includes(selectedRow.InitiatedTest_Status)">RESPOND</button>
        <!-- <button class="footer-btn"
                @click="goViewDetailPage">VIEW DETAILS</button>
        <button class="footer-btn"
                @click="goInteractiveTextPage">RESPOND</button> -->
        <button class="footer-btn"
                @click="goNewTestPage">NEW TEST</button>
        <button class="footer-btn"
                @click="sendAbort"
                :disabled="!['0', '3', '4'].includes(selectedRow.InitiatedTest_Status)">ABORT TEST</button>
        <button class="footer-btn"
                @click="sendAbortAll"
                :disabled="currentGroundTestLists.every(item => ![0, 3, 4].includes(item.InitiatedTest_Status))">ABORT
          ALL</button>
      </div>
    </el-footer>
  </div>
</template>
<script>
import { printPage, customSortMethodForProgressColumn, handleTestOrder } from '@/utils/utils.ts'
import Clock from '@/components/Clock/index.vue'
import { testStatusEnum } from '@/globals/enums'
import qs from 'qs'
export default {
  data() {
    return {
      selectedRow: '',
      tableListTimer: '',
      refreshInterval: '',
      currentGroundTestLists: [],
      loading: true,

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
     * 本函数用于更新更新选中行到selectedRow变量
     * @param {string} row - menus数据的name属性
     */
    handleRowClick(row) {
      this.selectedRow = row
      this.$store.state.groundTestList.currentGroundTestID = row.InitiatedTest_Index

      console.log("select test is:", row)
    },

    /**
     * 本函数用于返回进度对应的进度条颜色
     * @param {number} progress - 进度值
     * @returns {number} 该进度值对应的颜色rgb值
     */
    getProgressColor(progress) {
      // if (progress < 100){
      //   return '#51cef1';
      // } else {
      //   return '#66CC99';
      // }
      return '#51cef1';
    },

    /**
     * 本函数用于计算StartTime属性的展示值
     */
    formatStartTime(row) {
      if (row.StartTime) {
        return new Date(row.StartTime).toLocaleString();
      }
      return '-';
    },

    /**
     * 本函数用于设置Flight Phase列中flight_phase的显示格式
     * 即将flight_phase原数据对应为state中flightPhaseEnum枚举值
     * @param {*} row table选中行信息
     */
    formatTestStatus(row) {
      let tsIndex = row.InitiatedTest_Status;
      return testStatusEnum[tsIndex];
    },

    /**
     * 本函数用于确定某行是否可被选中样式
     * @param {*} row table选中行信息
     */
    rowTestName({ row }) {
      return this.selectedRow.InitiatedTest_Index == row.InitiatedTest_Index && this.selectedRow.StartTime == row.StartTime ? 'current-row' : '';
    },

    /**
     * 本函数用于向成员系统发送中止选中的测试的命令
     */
    sendAbort() {
      let tmp = qs.stringify({
        OrderType: "ABORT",

        currentPage: "TestList",
        InitiatedTest_Index: [this.selectedRow.InitiatedTest_Index],
        MemberSystemID: "",

        currentScreenId: "",
        selectedOption: "",
      });

      this.handleTestOrder(tmp)
    },

    /**
     * 本函数用于向成员系统发送全部中止的命令
     */
    sendAbortAll() {
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
     * 本函数用于跳转页面
     */
    goNewTestPage() {
      this.$router.push({ name: "SelectTestNew" });
    },

    /**
     * 本函数用于跳转页面
     */
    goInteractiveTextPage() {
      this.$router.push({ name: "InteractiveTest" });
    },

    /**
     * 本函数用于跳转页面
     */
    goViewDetailPage() {

      if (this.selectedRow !== '') {
        this.$router.push({ name: "ViewDetail" });
      } else {
        this.$message({
          message: 'Please select a test to view details',
          type: 'warning'
        });
      }
    },

    /**
     * 本函数用于更新测试的进度值
     */
    updateCurrentGroundTestLists() {
      //console.log("local is")
      //console.log(this.$store.state.groundTestList.currentActiveGroundTests)

      this.currentGroundTestLists = this.$store.state.groundTestList.currentActiveGroundTests.filter(item => parseInt(item.FlightLeg) == 0).map(test => {


        if (test.InitiatedTest_Status == "2" || test.InitiatedTest_Status == "9") {
          return {
            ...test,
            progress: parseFloat(100)
          };
        } else if (test.InitiatedTest_Status == "0" || test.InitiatedTest_Status == "5" || test.InitiatedTest_Status == "7" || test.InitiatedTest_Status == "6") {
          return {
            ...test,
            progress: parseFloat(0)
          };
        } else {

          const currentTime = new Date().getTime();
          const startTime = new Date(test.StartTime).getTime();

          return {
            ...test,
            progress: parseInt(Math.min((currentTime - startTime) / (600 * test.TestDurationTime), 99))
          };
        }
      });

      //console.log("this.currentGroundTestLists", this.currentGroundTestLists)
    },

    printPage,
    handleTestOrder,
    customSortMethodForProgressColumn
  },
  created() {

    setTimeout(() => {
      this.loading = false;
    }, 1000);

    this.$store.state.groundTestList.currentGroundTestID = ""
    this.$store.state.groundTestList.currentGroundTest = {}


    // let tmp = qs.stringify({
    //   OrderType: "PAGEINIT",

    //   currentPage: "TestList",
    //   InitiatedTest_Index: "",
    //   MemberSystemID: "",

    //   currentScreenId: "",
    //   selectedOption: "",
    // });

    // this.handleTestOrder(tmp)
  },
  computed: {
    curTotalStatus() {
      if (this.currentGroundTestLists.length === 0) {
        return 'No Test Data To Display';
      }
      let has3 = false;
      let has4 = false;
      for (let i = 0; i < this.currentGroundTestLists.length; i++) {
        if (this.currentGroundTestLists[i].InitiatedTest_Status === 3) {
          has3 = true;
        }
        if (this.currentGroundTestLists[i].InitiatedTest_Status === 4) {
          has4 = true;
        }
      }
      if (has3) {
        return 'Input Required';
      } else if (has4) {
        return 'Tests In Progress';
      } else {
        return 'No Test In Progress';
      }
    }
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
  }
}

</script>
<style scoped></style>
