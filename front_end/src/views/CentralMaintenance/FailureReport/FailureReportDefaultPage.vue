<template>
  <div style="background-color: rgb(45, 45, 45);">
    <el-header style="height: 9vh;">
      <el-row style="width: 100%;">
        <el-col :span="3">
          <div class="el-header-title">Select Option:</div>
        </el-col>
        <el-col :span="4">
          <div class="el-header-radios">
            <div class="radio"
                 @click="changeRadio('legFDEsSelected'); $store.state.failureList.selectedFailureId = -1">
              <input name="failure-rep-radio"
                     type="radio"
                     :checked="displaySelected == 'legFDEsSelected'" />
              <label class="form-check-label">Post Flight Report</label>
            </div>
            <div class="radio"
                 @click="changeRadio('existingFDEsSelected'); $store.state.failureList.selectedFailureId = -1">
              <input name="failure-rep-radio"
                     type="radio"
                     :checked="displaySelected == 'existingFDEsSelected'" />
              <label class="form-check-label">Existing FDEs</label>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="el-header-radios">
            <div class="radio"
                 @click="changeRadio('existingFailureSelected'); $store.state.failureList.selectedFailureId = -1">
              <input name="failure-rep-radio"
                     type="radio"
                     :checked="displaySelected == 'existingFailureSelected'" />
              <label class="form-check-label">Existing Failures</label>
            </div>
            <div class="radio"
                 @click="changeRadio('failuresHistorySelected'); $store.state.failureList.selectedFailureId = -1">
              <input name="failure-rep-radio"
                     type="radio"
                     :checked="displaySelected == 'failuresHistorySelected'" />
              <label class="form-check-label">Failures History</label>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div style="height: 70vh">
        <in-bound-leg-fde v-if="displaySelected == 'legFDEsSelected'" />
        <existing-fde v-if="displaySelected == 'existingFDEsSelected'" />
        <existing-failure v-if="displaySelected == 'existingFailureSelected'" />
        <failure-history v-if="displaySelected == 'failuresHistorySelected'" />
      </div>
      <el-dialog title="ERROR MESSAGE"
                 :visible.sync="isParameterSelected"
                 width="30%">
        <p style="color:black">Please select a failure item!</p>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="isParameterSelected = false">OK</el-button>
        </span>
      </el-dialog>
      <FlightLegs @close=" isFlightLegsSelected = false"
                  v-if="isFlightLegsSelected">
      </FlightLegs>
    </el-main>
    <el-footer>
      <div>
        <button class="footer-btn"
                @click="printPage">PRINT</button>
      </div>
      <div>
        <button slot="button"
                class="footer-btn"
                @click="isFlightLegsSelected = true">FLIGHT LEGS</button>
        <button class="footer-btn"
                @click="goSelectPage()">SELECT</button>
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">
import InBoundLegFde from "./FailureReportRadios/InBoundLegFDE.vue";
import ExistingFde from "./FailureReportRadios/ExistingFDE.vue";
import ExistingFailure from "./FailureReportRadios/ExistingFailure.vue";
import FailureHistory from "./FailureReportRadios/FailureHistory.vue";
import Clock from '@/components/Clock/index.vue'
import FlightLegs from '@/components/FlightLegs/index.vue'
import { printPage, changeRadio } from '@/utils/utils'

export default {
  components: {
    InBoundLegFde,
    ExistingFde,
    ExistingFailure,
    FailureHistory,
    Clock,
    FlightLegs
  },
  name: "FailureRep",
  data() {
    return {
      isFlightLegsSelected: false,
      legFailureAll: true,
      isParameterSelected: false,
      displaySelected: 'legFDEsSelected',
    };
  },
  methods: {

    /**
     * 本函数用于Inbound Leg Failures单选按钮在All和Summary
     * @param {*} bool All选中：true;Summary选中：false
     */
    switchAll(bool: boolean) {
      this.legFailureAll = bool;
      this.$store.state.failureList.selectedFailureId = -1;
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
<style scoped></style>
