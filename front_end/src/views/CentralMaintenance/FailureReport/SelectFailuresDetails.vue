<template>
  <div>
    <el-header style=" height: 9vh; ">
      <el-row style="width: 100%;">
        <el-col :span="21">
          <el-row>
            <div class="el-header-title">Failure Details:</div>
          </el-row>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <el-main style="flex: 1; padding: 0; color: white; height: 73.5vh;">
      <div style="position: sticky; top: 0; z-index: 100">
        <!-- 选中信息的table -->
        <el-row>
          <el-table class="bg-[rgb(46, 45, 45)] w-full mb-1/100"
                    :data="selectedData"
                    style="  background-color: rgb(46, 45, 45);"
                    :header-cell-style="{
          background: '#404040',
          color: '#FFFFFF',
          font: '14px'
        }"
                    :empty-text="'No Data Display'">
            <el-table-column prop="fimcodeInfo"
                             label="FIM Code"
                             :width="null"
                             :min-width="30"></el-table-column>
            <el-table-column prop="failureNameInfo"
                             label="Failure Name"
                             :width="null"
                             :min-width="85"></el-table-column>
            <el-table-column prop="equipment_name"
                             label="Equipment Name"
                             :width="null"
                             :min-width="55"></el-table-column>
            <el-table-column label="Count"
                             :width="null"
                             :min-width="35">{{ 1 }}</el-table-column>
            <el-table-column prop="maintenceTime"
                             label="Maintenance Time"
                             :width="null"
                             :min-width="55"></el-table-column>
            <el-table-column prop="flightLeg"
                             label="Flight Leg"
                             :formatter="flightLegFormatter"
                             :width="null"
                             :min-width="35"></el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
        </el-row>
        <!-- 底部信息部分：-->
        <el-row style="margin-bottom: 1vh">
          <div style="float: left; margin-left: 15px">
            <span> Failure Message: {{ currfailureMessage }} </span>
          </div>
        </el-row>
        <el-row
                style="margin-bottom: 1vh;  width: 100%; border: 1px solid rgb(111, 111, 111); border-left: none; border-right: none; border-top: none;">
          <div style="float: left; margin-left: 15px; margin-bottom: 15px;">
            <span> Maintenance Text: {{ currMaintenceText }} </span>
          </div>
        </el-row>
        <el-row style=" margin-left: 15px; margin-right: 15px;">
          <el-col :span="4">
            <div class="radio"
                 @click="changeRadio('rootCause')">
              <input name="select-details-radio"
                     type="radio"
                     :checked="displaySelected == 'rootCause'" />
              <label class="form-check-label">Root Cause</label>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="radio"
                 @click="changeRadio('parameters')">
              <input name="select-details-radio"
                     type="radio"
                     :checked="displaySelected == 'parameters'" />
              <label class="form-check-label">Parameters</label>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="radio"
                 @click="changeRadio('flightDeckEffects')">
              <input name="select-details-radio"
                     type="radio"
                     :checked="displaySelected == 'flightDeckEffects'" />
              <label class="form-check-label">Flight Deck Effects</label>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="radio"
                 @click="changeRadio('notes')">
              <input name="select-details-radio"
                     type="radio"
                     :checked="displaySelected == 'notes'" />
              <label class="form-check-label">Notes</label>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="height: 50vh; overflow-y: auto;">
        <RootCause v-show="displaySelected == 'rootCause'" />
        <FlightDeckEffects v-show="displaySelected == 'flightDeckEffects'" />
        <Parameters v-show="displaySelected == 'parameters'" />
        <Notes v-show="displaySelected == 'notes'" />
      </div>
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
        <button class="footer-btn"
                @click="isFlightLegsSelected = true"
                style="width: 26vh">SHOW FLIGHT LEGS</button>
        <button class="footer-btn"
                @click="goPreviousPage()">PREVIOUS</button>
        <button class="footer-btn"
                @click="goNextPage()">NEXT</button>
        <button class="footer-btn"
                @click="goBackToReportPage()">BACK</button>
      </div>
    </el-footer>
  </div>
</template>
<script>
import RootCause from "./SelectFailuresRadios/RootCause.vue";
import FlightDeckEffects from "./SelectFailuresRadios/FlightDeckEffects.vue";
import Parameters from "./SelectFailuresRadios/Parameters.vue";
import Notes from "./SelectFailuresRadios/Notes.vue";
import FlightLegs from '@/components/FlightLegs/index.vue'
import Clock from '@/components/Clock/index.vue'

import { flightPhaseEnum } from '@/globals/enums'
import { printPage, changeRadio } from '@/utils/utils'

export default {
  components: { RootCause, FlightDeckEffects, Parameters, Notes, Clock, FlightLegs },
  name: "SelectFailuresDetails",
  data() {
    return {
      selectedData: [],
      displaySelected: 'rootCause',
      isFlightLegsSelected: false,
      currMaintenceText: "NO TEXT",
      currfailureMessage: "NO MESSAGE"
    };
  },
  methods: {
    /**
     * 本函数用于设置OMS Flight Phase列中flight_phase的显示格式
     * 即将flight_phase原数据对应为state中flightPhaseEnum枚举值
     * @param {*} row table选中行信息
     */
    FlightPhaseData(row) {
      let fpIndex = row.flight_phase;
      return flightPhaseEnum[fpIndex];
    },
    /**
     * 本函数用于返回至FailureReport主界面
     *
     */
    goBackToReportPage() {
      this.$store.state.failureList.selectedFailureId = -1
      this.$router.push({ name: "FailureList" });
    },

    flightLegFormatter(row, column) {
      // 找出flightLeg的最大值
      const maxFlightLeg = this.$store.state.failureList.maxflightLeg;
      // 对flightLeg进行格式化处理
      return row.flightLeg - maxFlightLeg;
    },

    /**
     * 本函数用于切换当前展示数据至其上一条failure数据
     *
     */
    goPreviousPage() {
      //清除当前展示数据
      this.selectedData.pop();

      //计算当前数据和上一条数据在数组内的索引
      const currentIndex = this.$store.state.failureList.resFailureData.findIndex(obj => obj === this.$store.state.failureList.resFailureData.find(obj => obj.index === this.$store.state.failureList.selectedFailureId));
      const nextIndex = (currentIndex - 1 + this.$store.state.failureList.resFailureData.length) % this.$store.state.failureList.resFailureData.length;

      //更新全局变量selectedFailureId
      this.$store.state.failureList.selectedFailureId = this.$store.state.failureList.resFailureData[nextIndex].index;

      //更新selectedData
      this.getSelectedData()
    },


    /**
     * 本函数用于切换当前展示数据至其下一条failure数据
     *
     */
    goNextPage() {
      //清除当前展示数据
      this.selectedData.pop();

      //计算当前数据和下一条数据在数组内的索引
      const currentIndex = this.$store.state.failureList.resFailureData.findIndex(obj => obj === this.$store.state.failureList.resFailureData.find(obj => obj.index === this.$store.state.failureList.selectedFailureId));
      const nextIndex = (currentIndex + 1) % this.$store.state.failureList.resFailureData.length;

      //更新全局变量selectedFailureId
      this.$store.state.failureList.selectedFailureId = this.$store.state.failureList.resFailureData[nextIndex].index;

      //更新selectedData
      this.getSelectedData()
    },

    /**
     * 本函数用于mounted中，获取state中所选行的selectedFailureId数据
     */
    getSelectedData() {
      //深度拷贝，不改变state中selectedFailureId的原始数据
      const objSelectedData = JSON.parse(
        JSON.stringify(this.$store.state.failureList.resFailureData.find(obj => obj.index === this.$store.state.failureList.selectedFailureId))
      );

      this.selectedData.push(objSelectedData);

      this.currFailureMessage = this.selectedData[0].failureMessage
      this.currMaintenceText = this.selectedData[0].maintenceText

      // if (this.selectedData[0].hasOwnProperty('failureMessage')) {
      //   this.currFailureMessage = this.selectedData[0].failureMessage
      // } else {
      //   this.currFailureMessage = "NO MESSAGE"
      // }

      // if (this.selectedData[0].hasOwnProperty('maintenceText')) {
      //   this.currMaintenceText = this.selectedData[0].maintenceText
      // } else {
      //   this.currMaintenceText = "NO TEXT"
      // }


      //设置equipment_name为"FUEL"
      for (let item of this.selectedData) {
        item.equipment_name = "FUEL";
      }
    },
    printPage,
    changeRadio
  },
  mounted() {
    //调用获取getSelectedData的函数
    this.getSelectedData();
  },
};
</script>
<style scoped></style>
