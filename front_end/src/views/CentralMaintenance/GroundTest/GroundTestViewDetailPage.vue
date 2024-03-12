<template>
  <el-container>
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
          Test Name: {{ $store.state.groundTestList.currentGroundTest.InitiatedTestName }}
        </div>
      </el-col>
      <el-col :span="8">
        <div class="el-header-subcontainer">
          <span class="el-header-dot" ></span>
           Expected Duration(mins): {{ $store.state.groundTestList.currentGroundTest.TestDurationTime }}
        </div>
        <div class="el-header-subcontainer">
          <span class="el-header-dot" ></span>
          Test Type: {{ testDict[$store.state.groundTestList.currentGroundTest.TestType] }}
        </div>
        <div class="el-header-subcontainer">
          <span class="el-header-dot" ></span>
           Test Status: {{  }}
        </div>
      </el-col>
      <el-col :span="8">
        <div class="el-header-subcontainer">
          <span class="el-header-dot" ></span>
           Start Time: {{ new Date($store.state.groundTestList.currentGroundTest.StartTime).toLocaleTimeString() }}
        </div>
        <div class="el-header-subcontainer">
          <span class="el-header-dot" ></span>
          End Time: {{  }}
        </div>
      </el-col>
    </el-row>
   </el-header>

   <el-main style="padding:2vh">
     <el-row>
      <div>
        <el-card class="custom-card" shadow="hover" style="height: 60vh"
          v-loading="loading"
          element-loading-text="Data Loading..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.5)">
          <div class="custom-header">DETAILS</div>
          <div class="custom-content">
            <el-row style="width: 100%;">
              <el-col :span="8">
                <span class="custom-subtitle">
                  Pre-Condition
                </span>
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
              </el-col>

              <el-col :span="8">
                <span class="custom-subtitle">
                  Inhibit Condition
                </span>
                <div
                  v-if="$store.state.groundTestList.currentGroundTest.InhibitCondition_Text.length === 1 && $store.state.groundTestList.currentGroundTest.InhibitCondition_Text[0] === ''"
                  class="content-alert">
                  No Alive Data
                </div>
                <div
                  v-else
                  v-for="inhibitCondition in $store.state.groundTestList.currentGroundTest.InhibitCondition_Text"
                  :key="inhibitCondition.id"
                  class="content-item">
                  <li>{{ inhibitCondition }}</li>
                </div>
              </el-col>

              <el-col :span="8">
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
     </el-row>

   </el-main>
   <el-footer>
     <div>
     </div>
     <div>
       <el-button class="footer-btn" @click="goTestListPage()">BACK</el-button>
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
      loading: true
    }
  },
  computed: {

  },
  methods: {
    /**
      * 本函数用于跳转页面
      */
    goTestListPage() {
      this.$router.push({ name: "TestList", params: { } });
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
}

</script>

<style scoped>
</style>

