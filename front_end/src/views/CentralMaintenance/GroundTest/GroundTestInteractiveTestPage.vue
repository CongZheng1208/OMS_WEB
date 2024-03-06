<template>
   <el-container>
    <el-header style="height: 12vh;">
      <el-row style="width: 80%;">
        <el-col :span="8">
          <div class="el-header-subcontainer">
            <span class="el-header-dot" ></span>
            ATA: {{ $store.state.groundTestList.currentGroundTest.ATA }}
          </div>
          <div class="el-header-subcontainer">
            <span class="el-header-dot" ></span>
            Equipment Name: {{ $store.state.groundTestList.selectedEquipment.equipmentName }}
          </div>
        </el-col>
        <el-col :span="8">
          <div class="el-header-subcontainer">
            <span class="el-header-dot" ></span>
            Test Name: {{ $store.state.groundTestList.currentGroundTest.InitiatedTestName }}
          </div>
          <div class="el-header-subcontainer">
            <span class="el-header-dot" ></span>
            Test Type: {{ testDict[$store.state.groundTestList.currentGroundTest.TestType] }}
          </div>

        </el-col>
        <el-col :span="8">
          <div class="el-header-subcontainer">
            <span class="el-header-dot" ></span>
            Expected Duration(mins): {{ $store.state.groundTestList.currentGroundTest.TestDurationTime }}
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-main style="padding:2vh">
      <el-row>
        <el-col :span="14">
          <div>
            <el-card class="custom-card" shadow="hover">
              <div class="custom-header">Interactive Test</div>
              <div class="custom-content">
                <div
                  v-if="$store.state.groundTestList.currentGroundTest.ResponseMessage === null"
                  class="content-alert">
                  No Alive Data
                </div>
                <div
                  v-else
                  class="content-item">
                  {{ $store.state.groundTestList.currentGroundTest.InteractiveScreenText[currentStepId] }}
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="10">
          <div>
            <div class="el-main-subtitle">
              Select an option and press continue
            </div>

            <div
              v-if="$store.state.groundTestList.currentGroundTest.ResponseMessage === null"
              class="content-alert">
              No Alive Data
            </div>

            <div
              v-else
              class="radio"
              v-for="option in $store.state.groundTestList.currentGroundTest.ResponseMessage[currentStepId].ResponseBlock"
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
        <el-button class="footer-btn" @click="goTestListPage()">BACK</el-button>
        <el-button class="footer-btn" @click="continueTest()">CONTINUE</el-button>
        <el-button class="footer-btn" @click="abortTest()">ABORT TEST</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import {customSortMethodForProgressColumn} from '@/utils/utils.js'
import { postTestOrder } from '@/services/centralMaintenance/groundTest/index.js';
import qs from 'qs'

import {testTypeEnum} from '@/globals/enums.js'

export default {

  data() {
    return {
      selectedTestId: "",

      testDict: testTypeEnum,
      testDict: testTypeEnum,

      currentStepId: 0,

      selectedOption: 0,
    }
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
     * 本函数用于向成员系统发送继续指令
     */
     continueTest() {

      // 若交互测试还没有进行完
      if(this.currentStepId < this.$store.state.groundTestList.currentGroundTest.ResponseMessage.length){
        // 此处将相关信息发送给成员系统

        console.log(  this.selectedOption)

        let tmp = qs.stringify({
          page: "InteractiveTest",
          message: this.selectedOption
        });

        postTestOrder(tmp).then(response => {
          console.log(response)
          this.$message({ message: 'This item has been received', type: 'success'});
        }).catch(error => {
          console.error('Error in fetching parameter list:', error);
        });

        //刷新文本和选项
        this.currentStepId = this.currentStepId + 1
        //刷新radio的选中状态
        this.selectedOption =  0

        // if(this.currentStepId < this.$store.state.groundTestList.currentGroundTest.ResponseMessage.length){
        //   this.$message('All interaction tests have been completed');
        // }

      }else{
        this.$message('All interaction tests have been completed');
      }
    },

    /**
     * 本函数用于向成员系统发送终止指令
     */
    abortTest() {

    },

    customSortMethodForProgressColumn,
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

