<template>
  <el-container style="display: flex; flex-direction: column">
    <el-header
      style="
        text-align: left;
        font-weight: bold;
        color: white;
        padding-top: 3vh;
        padding-left: 4vh;
        font-size: 16px;
        height: 13vh;
      "
    >
      <div style="float: left">Select Option:</div>
      <div style="margin-left: 5%; float: left">

        <div class="radio" @click="changeRadio('legFDEsSelected'); $store.state.failureList.selectedFailureId = -1">
          <input
            name="failure-rep-radio"
            type="radio"
            :checked="displaySelected == 'legFDEsSelected'"
          />
          <label class="form-check-label">Inbound Leg FDEs</label>
        </div>

        <div class="radio" @click="changeRadio('existingFDEsSelected'); $store.state.failureList.selectedFailureId = -1">
          <input
            name="failure-rep-radio"
            type="radio"
            :checked="displaySelected == 'existingFDEsSelected'"
          />
          <label class="form-check-label">Existing FDEs</label>
        </div>
      </div>

      <div style="margin-left: 5%; float: left">
        <div class="radio" @click="changeRadio('legFailuresSelected'); $store.state.failureList.selectedFailureId = -1">
          <input
            name="failure-rep-radio"
            type="radio"
            :checked="displaySelected == 'legFailuresSelected'"
          />
          <label class="form-check-label">Inbound Leg Failures</label>
        </div>

        <div class="radio" @click="changeRadio('existingFailureSelected'); $store.state.failureList.selectedFailureId = -1">
          <input
            name="failure-rep-radio"
            type="radio"
            :checked="displaySelected == 'existingFailureSelected'"
          />
          <label class="form-check-label">Existing Failures</label>
        </div>
      </div>
      <div style="margin-left: 5%; float: left" v-if="displaySelected == 'legFailuresSelected'">
        <div class="radio" @click="switchAll(true)">
          <input
            name="inbound-leg-fail-radio"
            type="radio"
            :checked="legFailureAll"
          />
          <label class="form-check-label">All</label>
        </div>

        <div class="radio" @click="switchAll(false)">
          <input
            name="inbound-leg-fail-radio"
            type="radio"
            :checked="!legFailureAll"
          />
          <label class="form-check-label">Summary</label>
        </div>
      </div>
    </el-header>
    <el-main style="flex: 1; padding: 0">
      <div>
        <in-bound-leg-fde v-if="displaySelected == 'legFDEsSelected'" />
        <existing-fde v-if="displaySelected == 'existingFDEsSelected'" />
        <in-bound-leg-failure
          v-if="displaySelected == 'legFailuresSelected'"
          :isAll="legFailureAll"
        />
        <existing-failure v-if="displaySelected == 'existingFailureSelected'" />
      </div>


      <el-dialog
        title="Error Message"
        style="font-size: 15px; color: white;"
        :visible.sync="isParameterSelected"
        width="30%"
      >
        <span style="font-size: 15px; color: white;">Please select a failure item!</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="isParameterSelected = false">OK</el-button>
        </span>
      </el-dialog>
    </el-main>
    <el-footer>
      <div>
        <el-button class="footer-btn" @click="printPage">PRINT</el-button>
      </div>
      <div>
        <el-button class="footer-btn" @click="goFailureHistoryPage()">HISTORY</el-button>
        <el-button class="footer-btn" @click="goSelectPage()">SELECT</el-button>
      </div>
    </el-footer>
  </el-container>




</template>

<script>
import InBoundLegFde from "./FailureReportRadios/InBoundLegFDE";
import ExistingFde from "./FailureReportRadios/ExistingFde";
import ExistingFailure from "./FailureReportRadios/ExistingFailure";
import InBoundLegFailure from "./FailureReportRadios/InBoundLegFailure";

import {printPage, changeRadio} from '@/utils/utils.js'

export default {
  components: {
    InBoundLegFde,
    ExistingFde,
    ExistingFailure,
    InBoundLegFailure,
  },
  name: "FailureRep",
  data() {
    return {
      legFailureAll: true,
      isParameterSelected: false,
      displaySelected: 'legFDEsSelected'
    };
  },
  methods: {
    /**
     * 本函数用于Inbound Leg Failures单选按钮在All和Summary
     * @param {*} bool All选中：true;Summary选中：false
     */
    switchAll(bool) {
      this.legFailureAll = bool;
      this.$store.state.failureList.selectedFailureId = -1;
    },
    /**
     * 本函数用于跳转页面至Failure History页面
     *
     */
    goFailureHistoryPage() {
      this.$router.push({ name: "FailureHistory" });
    },
    /**
     * 本函数用于跳转页面至选定的failure页面
     *
     */
    goSelectPage() {
      //判断是否选择表格某一行数据，若否则提示选择，若是则跳转至SelectFailuresDetails页面
      if (this.$store.state.failureList.selectedFailureId === -1) {
        this.isParameterSelected = true
      } else {
        this.$router.push({ name: "SelectFailuresDetails" });
      }
    },
    printPage,
    changeRadio
  },
};
</script>

<style scoped>
</style>
