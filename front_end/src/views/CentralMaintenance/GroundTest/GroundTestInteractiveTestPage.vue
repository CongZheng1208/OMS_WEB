<template>
   <el-container v-loading.fullscreen.lock="fullscreenLoading">
    <el-header style="height: 12vh;">
      <el-row style="width: 100%;">
        <el-col :span="8">
          <div class="el-header-subcontainer">
            <span class="el-header-dot" ></span>
            ATA: {{ $store.state.groundTestList.currentGroundTest.ATA }}
          </div>
          <div class="el-header-subcontainer">
            <span class="el-header-dot" ></span>
            Equipment Name: {{ $store.state.groundTestList.currentGroundTest.EquipmentName }}
          </div>
          <div class="el-header-subcontainer">
            <span class="el-header-dot" ></span>
            Expected Duration(mins): {{ $store.state.groundTestList.currentGroundTest.TestDurationTime }}
          </div>

        </el-col>
        <el-col :span="13">
          <div class="el-header-subcontainer">
            <span class="el-header-dot" ></span>
            Test Name: {{ $store.state.groundTestList.currentGroundTest.InitiatedTestName }}
          </div>
          <div class="el-header-subcontainer">
            <span class="el-header-dot" ></span>
            Test Type: {{ testDict[$store.state.groundTestList.currentGroundTest.TestType] }}
          </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>

    <el-main style="padding:2vh">
      <el-row :gutter="20">
        <el-col :span="14">
          <div>
            <el-card class="custom-card" shadow="hover">
              <div class="custom-header">Interactive Test</div>
              <div class="custom-content">
                <div
                  v-if="$store.state.groundTestList.currentGroundTest.NumScreens === '0'"
                  class="content-alert">
                  No Alive Data
                </div>
                <div
                  v-else
                  class="content-item">
                  {{ $store.state.groundTestList.currentGroundTest.screenArray.find(item => item.ScreenId === currentStepId).InteractiveScreenText }}
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="10">
          <div style="padding">
            <div class="el-main-subtitle">
              Select an option and press continue
            </div>

            <div
              v-if="$store.state.groundTestList.currentGroundTest.NumScreens === '0'"
              class="content-alert">
              No Alive Data
            </div>
            <div
              v-else
              class="radio"
              v-for="option in $store.state.groundTestList.currentGroundTest.screenArray.find(item => item.ScreenId === currentStepId).ResponseMessage.ResponseBlock"
              :key="option.ResponseId">
              <input
                :name="'failure-rep-radio'"
                type="radio"
                :value="option.ResponseId"
                v-model="selectedOption"
              />
              <label class="form-check-label">{{ option.ResponseText }}</label>
            </div>
          </div>

        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <div>
      </div>
      <div>
        <el-button class="footer-btn" @click="goTestListPage()">RETURN</el-button>
        <el-button class="footer-btn" @click="goThreeTestsPage()">BACK</el-button>
        <el-button class="footer-btn"
          @click="continueTest()"
          :disabled = "selectedOption==-1">
          CONTINUE
        </el-button>
        <!-- <el-button class="footer-btn" @click="abortTest()">ABORT TEST</el-button> -->
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import {customSortMethodForProgressColumn, handleTestOrder} from '@/utils/utils.js'
import Clock from '@/components/Clock'
import qs from 'qs'

import {testTypeEnum} from '@/globals/enums.js'

export default {

  data() {
    return {
      selectedTestId: "",

      fullscreenLoading: false,

      testDict: testTypeEnum,
      testDict: testTypeEnum,
      currentStepId: "",
      selectedOption: -1,
    }
  },
  components: {
    Clock
  },
  computed: {

  },
  methods: {
    /**
     * 本函数用于跳转页面
     */
    goTestListPage() {

      clearInterval(this.$store.state.groundTestList.currentGroundTestTimer)
      this.$router.push({ name: "TestList", params: { } });
    },

    /**
     * 本函数用于跳转页面
     */
    goThreeTestsPage() {
      this.$router.push({ name: "ThreeTests"});
    },

    /**
     * 本函数用于向成员系统发送继续指令
     */
    continueTest() {

      if(this.selectedOption !== -1){
         // 提交post请求给成员系统
        let tmp = qs.stringify({
          OrderType: "CONTINUE",

          currentPage: "InteractiveTest",
          InitiatedTest_Index: this.$store.state.groundTestList.currentGroundTests.InitiatedTest_Index,
          MemberSystemID: "NULL",

          currentScreenId: this.currentStepId,
          selectedOption: this.selectedOption,
        });

        this.handleTestOrder(tmp)

        // 进入递归函数开始不断刷新
        this.checkScreenTriggerIndex(0); // 初始次数为0

      }else{
        // 如果用户尚未选择任何选项，则弹出消息提示
        this.$message({ message: 'No options have been selected yet', type: 'warning'});
      }
    },

    /**
     * 本函数是提交post请求后，用于递归查询下一步展示项目的index
     * 最多查询时间为10s，超时后停止递归查询
     */
    checkScreenTriggerIndex(count) {
      // 若交互测试还没有进行完，则继续定时刷新
      const loading = this.$loading({
        lock: true,
        text: 'Waiting for the next screenID...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      });

      console.log(this.$store.state.groundTestList.currentGroundTest.Screen_Trigger_Index);



      if (this.$store.state.groundTestList.currentGroundTest.Screen_Trigger_Index !== null ) {
        // 当不为null时, 更新页面展示项目并停止刷新

        loading.close();
        // 刷新文本和选项
        this.currentStepId = this.$store.state.groundTestList.currentGroundTest.Screen_Trigger_Index;
        this.selectedOption = -1;

        return;
      } else if(count >= 10) {
        // 如果时间超过10秒，也停止刷新并退出
        loading.close();
        this.$message({ message: 'Exceeded maximum refresh time', type: 'warning'});
        this.$router.push({ name: "TestList", params: { } });
        return;

      }else{
        // 每隔1秒进行一次刷新
        setTimeout(() => {
          this.checkScreenTriggerIndex(count + 1); // 递增次数
        }, 1000);
      }
    },


    /**
     * 本函数用于向成员系统发送终止指令
     */
    abortTest() {
      let tmp = qs.stringify({
        OrderType: "ABORT",

        currentPage: "InteractiveTest",
        InitiatedTest_Index: this.$store.state.groundTestList.currentGroundTests.InitiatedTest_Index,
        MemberSystemID: "NULL",

        currentScreenId: "",
        selectedOption: "",
      });

      this.handleTestOrder(tmp)
    },

    customSortMethodForProgressColumn,
    handleTestOrder
  },
  created(){
    console.log("Damnnnnnn")
    console.log(this.$store.state.groundTestList.currentGroundTest.screenArray)

    if(this.$store.state.groundTestList.currentGroundTest.screenArray.length == 0){
      this.$message('No interactive test available for this project');
      this.currentStepId = -1
    }else{
      this.currentStepId = this.$store.state.groundTestList.currentGroundTest.screenArray[0].ScreenId
    }
  },
  mounted() {

  },
  beforeDestroy() {
    clearInterval(this.$store.state.groundTestList.currentGroundTestTimer)
  }
}

</script>

<style scoped>
</style>

