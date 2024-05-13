<template>
  <div>
    <el-header style="height: 12vh;">
      <el-row style="width: 100%;">
        <el-col :span="21">
          <div class="el-header-subcontainer"> Pre-Conditions of Selected Tests </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <el-main style="padding:2vh">
      <el-row>
        <div class="total-container">
          <div class="sub-container"
               v-for="(item, index) in selectedTests"
               :key="index">
            <el-row style="width: 100%;">
              <el-col :span="20">
                <div class="div-title"> Test Name:{{ item.InitiatedTestName }}, Equipment Name:
                  {{ item.MemberSystemName }} </div>
                <div v-if="item.Preconditions.length === 1 && item.Preconditions[0] === ''"
                     class="content-alert"> No Alive Data </div>
                <div v-for="precondition in item.Preconditions"
                     :key="precondition"
                     class="content-item">
                  <li>{{ precondition }}</li>
                </div>
              </el-col>
              <el-col :span="4">
                <button class="footer-btn"
                        @click="cancelTest(index)">CANCEL</button>
              </el-col>
            </el-row>
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
                @click="goSelectTestPage()">BACK</button>
        <button class="footer-btn"
                @click="goTestListPage()"> START TEST </button>
      </div>
    </el-footer>
  </div>
</template>
<script>
import { printPage, handleTestOrder } from '@/utils/utils'
import Clock from '@/components/Clock'
import qs from 'qs'

export default {

  data() {
    return {
      loading: true,
      selectedTests: [],
      title: 'Control Panel',
      data: ['Item 1', 'Item 2', 'Item 3'],
      buttonText: 'Click Me'
    }
  },
  components: {
    Clock
  },
  methods: {
    /**
     * 本函数用于开启测试
     */
    goTestListPage() {

      if (this.selectedTests.length == 0) {
        this.$message('Please select one test to start at least.');
      } else {
        let initiatedTestIDs = this.selectedTests.map(item => parseInt(item.InitiatedTest_Index));

        let tmp = qs.stringify({
          OrderType: "START",

          currentPage: "ThreeTests",
          InitiatedTest_Index: initiatedTestIDs,
          MemberSystemID: "",

            currentScreenId: "",
            selectedOption: "",
          });
          this.handleTestOrder(tmp)

        this.$router.push({ name: "TestList" });
      }
    },

    /**
     *
     */
    cancelTest(index) {
      this.selectedTests.splice(index, 1);
    },

      /**
       * 本函数用于跳转页面
       */
      goSelectTestPage() {
        clearInterval(this.$store.state.groundTestList.currentGroundTestTimer)
        this.$router.push({ name: "SelectTestNew" });
      },
      printPage,
      handleTestOrder,
    },
    mounted() {
      this.selectedTests =  this.$route.params.selectedTests
      this.selectedTests.forEach(test => {
        if (test.Preconditions && test.Preconditions.includes(';')) {
          test.Preconditions = test.Preconditions.split(';').map(item => item.trim());
          test.Preconditions = test.Preconditions.filter(item => item !== '');
        }
      });

    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
}

</script>
<style scoped></style>
