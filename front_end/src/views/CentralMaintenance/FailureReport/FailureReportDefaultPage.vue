<template>
  <div>
    <el-header style=" height: 13vh; ">
      <el-row style="width: 100%;">
        <el-col :span="3">
          <div>Select Option:</div>
        </el-col>
        <el-col :span="4">
          <div>

            <div class="radio" @click="changeRadio('legFDEsSelected'); $store.state.failureList.selectedFailureId = -1">
              <input
                name="failure-rep-radio"
                type="radio"
                :checked="displaySelected == 'legFDEsSelected'"
              />
              <label class="form-check-label">Post Flight Report</label>
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

        </el-col>
        <el-col :span="14">
          <div>
            <div class="radio" @click="changeRadio('existingFailureSelected'); $store.state.failureList.selectedFailureId = -1">
              <input
                name="failure-rep-radio"
                type="radio"
                :checked="displaySelected == 'existingFailureSelected'"
              />
              <label class="form-check-label">Existing Failures</label>
            </div>


            <div class="radio" @click="changeRadio('failuresHistorySelected'); $store.state.failureList.selectedFailureId = -1">
              <input
                name="failure-rep-radio"
                type="radio"
                :checked="displaySelected == 'failuresHistorySelected'"
              />
              <label class="form-check-label">Failures History</label>
            </div>
          </div>
        </el-col>

        <el-col :span="3">
          <Clock/>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <div style="height: 65vh">
        <in-bound-leg-fde v-if="displaySelected == 'legFDEsSelected'" />
        <existing-fde v-if="displaySelected == 'existingFDEsSelected'" />
        <existing-failure v-if="displaySelected == 'existingFailureSelected'" />
        <failure-history v-if="displaySelected == 'failuresHistorySelected'" />
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

      <el-dialog
        style="font-size: 15px; color: white;"
        :visible.sync="isFlightLegsSelected"
        width="70%"
      >
        <el-row style=" margin-left: 15px; margin-right: 15px;" >
          <el-table
            style="
              width: 100%;
              background-color: rgb(52, 52, 52);
              margin-top: 1vh;
              margin-bottom: 1vh;
            "
            :header-cell-style="{
              background:  'rgb(52, 52, 52)',
              color: '#FFFFFF',
              font: '14px',
              'text-align': 'center',
            }"
            :cell-style="{ 'text-align': 'center' }"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="10"></el-table-column>
            <el-table-column
              prop=""
              label="Flight Leg"
              :width="null"
              :min-width="30"
            ></el-table-column>
            <el-table-column
              prop=""
              label="Flight Number Leg"
              :width="null"
              :min-width="55"
            ></el-table-column>
            <el-table-column
              prop=""
              label="Start Time"
              :width="null"
              :min-width="55"
            ></el-table-column>
            <el-table-column
              prop=""
              label="Origin"
              :width="null"
              :min-width="55"
            ></el-table-column>
            <el-table-column
              prop=""
              label="Destination"
              :width="null"
              :min-width="55"
            ></el-table-column>
            <el-table-column :width="null" :min-width="10"></el-table-column>
          </el-table>
        </el-row>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="isFlightLegsSelected = false">Back</el-button>
        </span>
      </el-dialog>

    </el-main>
    <el-footer>
      <div>
        <button class="footer-btn" @click="printPage">PRINT</button>
      </div>
      <div>
        <button class="footer-btn" @click="isFlightLegsSelected = true">FLIGHT LEGS</button>
        <button class="footer-btn" @click="goSelectPage()">SELECT</button>
      </div>
    </el-footer>
  </div>

</template>

<script>
import InBoundLegFde from "./FailureReportRadios/InBoundLegFDE";
import ExistingFde from "./FailureReportRadios/ExistingFde";
import ExistingFailure from "./FailureReportRadios/ExistingFailure";
import FailureHistory from "./FailureReportRadios/FailureHistory";
import Clock from '@/components/Clock'

import {printPage, changeRadio} from '@/utils/utils.js'

export default {
  components: {
    InBoundLegFde,
    ExistingFde,
    ExistingFailure,
    FailureHistory,
    Clock

  },
  name: "FailureRep",
  data() {
    return {
      legFailureAll: true,
      isParameterSelected: false,
      isFlightLegsSelected: false,
      displaySelected: 'legFDEsSelected',
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
