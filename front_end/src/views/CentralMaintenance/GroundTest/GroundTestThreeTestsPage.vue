<template>
   <div>
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
      <el-row>
        <el-col :span="8">

          <div>
            <div class="custom-card" shadow="hover">
              <div class="custom-header">Pre-conditions</div>
              <div class="custom-content">
                <div
                  v-if="$store.state.groundTestList.currentGroundTest.Preconditions.length === 1 && $store.state.groundTestList.currentGroundTest.Preconditions[0] === ''"
                  class="content-alert">
                  No Alive Data
                </div>
                <div
                  v-else
                  v-for="precondition in $store.state.groundTestList.currentGroundTest.Preconditions"
                  :key="precondition.id"
                  class="content-item">
                  <li>{{ precondition }}</li>
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <div class="custom-card" shadow="hover"
              v-loading="loading"
              element-loading-text="Data Loading..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.5)">
              <div class="custom-header">Inhibit Conditions</div>
              <div class="custom-content">
                <div
                  v-if="$store.state.groundTestList.currentGroundTest.InhibitConditions.length === 1 && $store.state.groundTestList.currentGroundTest.InhibitConditions[0] === ''"
                  class="content-alert">
                  No Alive Data
                </div>
                <div
                  v-else
                  v-for="inhibitCondition in $store.state.groundTestList.currentGroundTest.InhibitConditions"
                  :key="inhibitCondition.id"
                  class="content-item">
                  <li>{{ inhibitCondition }}</li>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <div class="custom-card" shadow="hover"
              v-loading="loading"
              element-loading-text="Data Loading..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.5)">
              <div class="custom-header">Interfering Tests</div>
              <div class="custom-content">
                <div
                  v-if="curInterferingTests.length === 0"
                  class="content-alert">
                  No Alive Data
                </div>
                <div
                  v-else
                  v-for="interferingTest in curInterferingTests"
                  :key="interferingTest.id"
                  class="content-item">

                  <li>Name: {{ interferingTest.interferName }}</li>
                  <span>ATA: {{ interferingTest.interferATA }}</span>
                  <span>Index: {{ interferingTest.interferIndex }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

    </el-main>
    <el-footer>
      <div>
      </div>
      <div>
        <button class="footer-btn" @click="goSelectTestPage()">BACK</button>
        <!-- <button class="footer-btn" @click="goInteractiveTestPage()"
          :disabled = "!isInteractiveTestAlive">
          CONTINUE
        </el-button> -->
        <button class="footer-btn" @click="goInteractiveTestPage()">
          CONTINUE
        </button>
      </div>
    </el-footer>
  </div>
</template>

<script>

import {testTypeEnum} from '@/globals/enums.js'
import Clock from '@/components/Clock'


export default {

  data() {
    return {
      selectedTestId: "",
      testDict: testTypeEnum,
      interferingTests: [],
      loading: true
    }
  },
  components: {
    Clock
  },
  computed: {

  },
  methods: {
    /**
     * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
     * @param {string} row - rawData数据的ataNumber属性
     */
    handleRowClick(row) {
      this.selectedTestId = row.T_ID;
    },

    /**
     * 本函数用于跳转页面
     */
    goInteractiveTestPage() {
      // if(this.isInteractiveTestAlive == true){
        this.$router.push({ name: "InteractiveTest", params: { } });
      // }else{
      //   this.$message({
      //     message: 'There are still unfinished inhibit or interfering  testing projects',
      //     type: 'warning'
      //   });
      // }
    },

    /**
     * 本函数用于跳转页面
     */
    goSelectTestPage() {

      clearInterval(this.$store.state.groundTestList.currentGroundTestTimer)
      this.$router.push({ name: "SelectTestNew" });
    },

    /**
     * 本函数用于mounted和menus中：调用store中mutations的failurePhp函数，初始化、更新failure数据
     *
     */
     postGroundTestPhp() {
      this.$store.commit("groundTestList/testPhp");
    }
  },
  mounted() {
    this.$store.state.groundTestList.currentGroundTestTimer = setInterval(
      this.postGroundTestPhp,
      1000
    )

    // console.log("data here", this.$store.state.groundTestList.currentGroundTest.InitiatedTest_Index)
    // this.$store.commit("groundTestList/addToTests", { groundTestToBeAdded: this.$store.state.groundTestList.currentGroundTest});


    console.log("data here", this.$store.state.groundTestList.currentGroundTest.InitiatedTest_Index)
    this.$store.dispatch('groundTestList/addCurrentTests', { groundTestToBeAdded: this.$store.state.groundTestList.currentGroundTest});

    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  created(){



  },
  computed:{

    curInterferingTests(){
      this.interferingTests = [];

      for(var i = 0; i < this.$store.state.groundTestList.currentGroundTest.InterferingTests_Index.length; i++) {
        // 如果当前正在进行中的测试中，包含该项干扰项，则进行显示
        const foundTest = this.$store.state.groundTestList.currentGroundTests.find(test => test.InitiatedTest_Index === this.$store.state.groundTestList.currentGroundTest.InterferingTests_Index[i])
        if( foundTest ){
          this.interferingTests.push({
            interferIndex: foundTest.InitiatedTest_Index,
            interferATA: foundTest.ATA,
            interferName: foundTest.InitiatedTestName,
          })
        }
      }
      return this.interferingTests
    },
    isInteractiveTestAlive(){
      return this.$store.state.groundTestList.currentGroundTest.InhibitConditions.length === 1 && this.$store.state.groundTestList.currentGroundTest.InhibitConditions[0] === '' && this.curInterferingTests.length === 0
    },


    initiatedTestIndex() {
      return this.$store.state.groundTestList.currentGroundTest.InitiatedTest_Index;
    }

  }
}

</script>

<style scoped>
</style>

