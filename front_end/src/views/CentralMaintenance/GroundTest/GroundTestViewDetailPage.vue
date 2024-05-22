<template>
  <div>
    <el-header style="height: 14vh;">
      <el-row style="width: 100%; margin-top: 1vh;">
        <el-col :span="7">
          <div class="el-header-subcontainer">
            <span class="el-header-dot"></span> ATA: {{ $store.state.groundTestList.currentGroundTest.ATA }}
          </div>
          <div class="el-header-subcontainer">
            <span class="el-header-dot"></span> Equipment Name:
            {{ $store.state.groundTestList.currentGroundTest.MemberSystemName }}
          </div>
          <div class="el-header-subcontainer">
            <span class="el-header-dot"></span> Test Name:
            {{ $store.state.groundTestList.currentGroundTest.InitiatedTestName }}
          </div>
        </el-col>
        <el-col :span="7">
          <div class="el-header-subcontainer">
            <span class="el-header-dot"></span> Expected Duration(mins):
            {{ $store.state.groundTestList.currentGroundTest.TestDurationTime }}
          </div>
          <div class="el-header-subcontainer">
            <span class="el-header-dot"></span> Test Type: {{ $store.state.groundTestList.currentGroundTest.TestType }}
          </div>
          <div class="el-header-subcontainer">
            <span class="el-header-dot"></span> Test Status:
            {{ testStatusDict[$store.state.groundTestList.currentGroundTest.InitiatedTest_Status] }}
          </div>
        </el-col>
        <el-col :span="7">
          <div class="el-header-subcontainer">
            <span class="el-header-dot"></span> Start Time:
            {{ new Date($store.state.groundTestList.currentGroundTest.StartTime).toLocaleString() }}
          </div>
          <div class="el-header-subcontainer">
            <span class="el-header-dot"></span> End Time:
            {{ new Date($store.state.groundTestList.currentGroundTest.EndTime).toLocaleString() }}
          </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <el-main style="padding:2vh">
      <el-row>
        <div>
          <div class="custom-card"
               shadow="hover"
               style="height: 60vh"
               v-if="isSuccess"
               v-loading="loading"
               element-loading-text="Data Loading..."
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.5)">
            <div class="custom-header">DETAILS</div>
            <div class="custom-content">
              <el-row style="width: 100%;"> Test is successful. <el-col :span="8">
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="custom-card"
               shadow="hover"
               style="height: 60vh"
               v-if="isError"
               v-loading="loading"
               element-loading-text="Data Loading..."
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.5)">
            <div class="custom-header"> ERROR DETAILS</div>
            <div class="custom-content">
              <el-row style="width: 100%;">
                <div v-if="$store.state.groundTestList.currentGroundTest.Error_text == ''"
                     class="content-alert"> No Alive Data </div>
                <div v-else> {{ $store.state.groundTestList.currentGroundTest.Error_text }} </div>
              </el-row>
            </div>
          </div>
          <div class="custom-card"
               shadow="hover"
               style="height: 60vh"
               v-if="isInhibit"
               v-loading="loading"
               element-loading-text="Data Loading..."
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.5)">
            <div class="custom-header">TEST INHIBIT CONDITIONS</div>
            <div class="custom-content">
              <el-row style="width: 100%;">
                <div v-if="$store.state.groundTestList.currentGroundTest.InhibitConditions_Trigger_Index === ''"
                     class="content-alert"> No Alive Data </div>
                <div v-else
                     class="content-item">
                  <li>{{ $store.state.groundTestList.currentGroundTest.InhibitConditions_Trigger_Index }}</li>
                </div>
              </el-row>
            </div>
          </div>
          <div class="custom-card"
               shadow="hover"
               style="height: 60vh"
               v-if="isFault"
               v-loading="loading"
               element-loading-text="Data Loading..."
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.5)">
            <div class="custom-header">FAULT DETAILS</div>
            <div class="custom-content">
              <el-row style="width: 100%;">
                <div v-if="$store.state.groundTestList.currentGroundTest.FailingFault_Trigger_Index === ''"
                     class="content-alert"> No Alive Data </div>
                <div v-else
                     class="content-item">
                  <li>{{ $store.state.groundTestList.currentGroundTest.FailingFault_Trigger_Index }}</li>
                </div>
              </el-row>
            </div>
            <!-- <el-table
            highlight-current-row
            height="65vh"
            style=" background-color: rgb(46, 45, 45)"

            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
            v-loading="loading"
            element-loading-text="Data Loading..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.5)"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>
            <el-table-column prop="ATA" label="ATA" sortable :width="null" :min-width="50"></el-table-column>
            <el-table-column prop="Fault Name" label="Fault Name" sortable :width="null" :min-width="150"></el-table-column>
            <el-table-column prop="Fault Status" label="Fault Status" sortable :width="null" :min-width="120"></el-table-column>
            <el-table-column prop="Failure Name" label="Failure Name" sortable :width="null" :min-width="150"></el-table-column>
            <el-table-column prop="Failure Status" label="Failure Status" sortable :width="null" :min-width="120"></el-table-column>
            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table> -->
            <div class="table-inner-number"> Number of Fault: {{ }} </div>
          </div>
        </div>
      </el-row>
    </el-main>
    <el-footer>
      <div>
        <button class="footer-btn"
                @click="printPage">PRINT</button>
      </div>
      <div>
        <button class="footer-btn"
                @click="goTestListPage()">BACK</button>
      </div>
    </el-footer>
  </div>
</template>
<script>
import { printPage, customSortMethodForProgressColumn } from '@/utils/utils.js'
import { testTypeEnum, testStatusEnum } from '@/globals/enums.js'

import Clock from '@/components/Clock'

export default {
  data() {
    return {
      isSuccess: this.$store.state.groundTestList.currentGroundTest.InitiatedTest_Status == "2",
      isInhibit: this.$store.state.groundTestList.currentGroundTest.InitiatedTest_Status == "6",
      isFault: this.$store.state.groundTestList.currentGroundTest.InitiatedTest_Status == "5",
      isError: this.$store.state.groundTestList.currentGroundTest.InitiatedTest_Status == "7",

      selectedTestId: "",
      testDict: testTypeEnum,
      testStatusDict: testStatusEnum,
      loading: false
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
      this.$router.push({ name: "TestList", params: {} });
    },

    printPage,
    customSortMethodForProgressColumn
  },
  mounted() {
    console.log("$store.state.groundTestList.currentGroundTest", this.$store.state.groundTestList.currentGroundTest)
    // setTimeout(() => {
    //   this.loading = false;
    // }, 100);
  }
}

</script>
<style scoped></style>
