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
            Equipment Name: {{ $store.state.groundTestList.currentGroundTest.EquipmentName }}
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
        <el-col :span="8">

          <div>
            <el-card class="custom-card" shadow="hover">
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
                  :key="precondition"
                  class="content-item">
                  {{ precondition }}
                </div>
              </div>
            </el-card>
          </div>
        </el-col>

        <el-col :span="8">
          <div>
            <el-card class="custom-card" shadow="hover">
              <div class="custom-header">Inhibit Conditions</div>
              <div class="custom-content">
                <div
                  v-if="$store.state.groundTestList.currentGroundTest.InhibitCondition_Text.length === 1 && $store.state.groundTestList.currentGroundTest.InhibitCondition_Text[0] === ''"
                  class="content-alert">
                  No Alive Data
                </div>
                <div
                  v-else
                  v-for="inhibitCondition in $store.state.groundTestList.currentGroundTest.InhibitCondition_Text"
                  :key="inhibitCondition"
                  class="content-item">
                  {{ inhibitCondition }}
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-card class="custom-card" shadow="hover">
              <div class="custom-header">Interfering Tests</div>
              <div class="custom-content">
                <div v-for="o in 50" :key="o" class="content-item">
                  {{'列表内容 ' + o }}
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>

    </el-main>
    <el-footer>
      <div>
      </div>
      <div>
        <el-button class="footer-btn" @click="goSelectTestPage()">BACK</el-button>
        <el-button class="footer-btn" @click="goInteractiveTestPage()">CONTINUE</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>

import {testTypeEnum} from '@/globals/enums.js'


export default {

  data() {
    return {
      selectedTestId: "",

      testDict: testTypeEnum,


    }
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
      // console.log(this.selectedTestId)
    },


    /**
     * 本函数用于跳转页面
     */
    goInteractiveTestPage() {
      this.$router.push({ name: "InteractiveTest", params: { } });
    },

    /**
     * 本函数用于跳转页面
     */
     goSelectTestPage() {

      clearInterval(this.$store.state.groundTestList.currentGroundTestTimer)
      this.$router.push({ name: "SelectTest" });




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
    // console.log(this.$store.state.groundTestList.currentGroundTest)

    this.$store.state.groundTestList.currentGroundTestTimer = setInterval(
      this.postGroundTestPhp,
      1000
    )
    this.$store.commit("groundTestList/addToTests");
  }
  // 其他组件逻辑
}

</script>

<style scoped>
</style>

