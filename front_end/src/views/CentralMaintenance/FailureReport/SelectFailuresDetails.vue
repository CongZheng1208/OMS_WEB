<template>
  <div>
    <el-header
      style="
        text-align: left;
        font-weight: bold;
        color: white;
        text-shadow: 2px 2px 2px #000;
        padding-top: 3vh;
        padding-left: 4vh;
        font-size: 16px;
        height: 9vh;
      "
    >
      <el-row  style="width: 100%;">
        <el-col :span="21">
          <el-row>
            <div style="float: left">Failure Details:</div>
          </el-row>
        </el-col>
        <el-col  :span="3">
          <Clock/>
        </el-col>
      </el-row>
    </el-header>

    <el-main style="flex: 1; padding: 0; color: white">
      <!-- 选中信息的table -->
      <el-row>
        <el-table
          highlight-current-row
          style="
            width: 100%;
            background-color: rgb(46, 45, 45);
            margin-bottom: 1%;
          "
          :data="selectedData"
          :header-cell-style="{
            background: '#404040',
            color: '#FFFFFF',
            font: '14px',
            'text-align': 'center',
          }"
          :cell-style="{ 'text-align': 'center' }"
          :empty-text="'No Data Display'"
        >
          <el-table-column
            prop="fimcodeInfo"
            label="FIM Code"
            :width="null"
            :min-width="30"
          ></el-table-column>
          <el-table-column
            prop="failureNameInfo"
            label="Failure Name"
            :width="null"
            :min-width="85"
          ></el-table-column>
          <el-table-column
            prop="equipment_name"
            label="Equipment Name"
            :width="null"
            :min-width="55"
          ></el-table-column>
          <el-table-column
            label="Count"
            :width="null"
            :min-width="35"
          >{{ 1 }}</el-table-column>
          <el-table-column
            prop="maintenceTime"
            label="Maintenance Time"
            :width="null"
            :min-width="55"
          ></el-table-column>

          <el-table-column
            prop="flightLeg"
            label="Flight Leg"
            :width="null"
            :min-width="35"
          ></el-table-column>
          <el-table-column :width="null" :min-width="5"></el-table-column>
        </el-table>
      </el-row>

      <!-- 底部信息部分：-->
      <el-row style="margin-bottom: 1vh">
        <div style="float: left; margin-left: 15px">
          Failure Message: {{ selectedData[0].failureMessage }}
        </div>
      </el-row>
      <el-row style="margin-bottom: 1vh;  width: 100%; border: 1px solid rgb(111, 111, 111); border-left: none; border-right: none; border-top: none;">
        <div style="float: left; margin-left: 15px; margin-bottom: 15px;">
          Maintenance Text:     {{ selectedData[0].maintenceText  }}
        </div>
      </el-row>

      <el-row>
        <el-row style=" margin-left: 15px; margin-right: 15px;" >
          <el-col :span="4">
            <div class="radio"  @click="changeRadio('rootCause')">
              <input
                name="select-details-radio"
                type="radio"
                :checked="displaySelected == 'rootCause'"
              />
              <label class="form-check-label">Root Cause</label>
            </div>
          </el-col>
          <el-col  :span="4">
            <div class="radio"  @click="changeRadio('parameters')">
              <input
                name="select-details-radio"
                type="radio"
                :checked="displaySelected == 'parameters'"
              />
              <label class="form-check-label">Parameters</label>
            </div>
          </el-col>
          <el-col  :span="4">
            <div class="radio"  @click="changeRadio('flightDeckEffects')">
              <input
                name="select-details-radio"
                type="radio"
                :checked="displaySelected == 'flightDeckEffects'"
              />
              <label class="form-check-label">Flight Deck Effects</label>
            </div>
          </el-col>
          <el-col  :span="12">
            <div class="radio"  @click="changeRadio('notes')">
              <input
                name="select-details-radio"
                type="radio"
                :checked="displaySelected == 'notes'"
              />
              <label class="form-check-label">Notes</label>
            </div>
          </el-col>
        </el-row>

        <RootCause v-show="displaySelected == 'rootCause'" />
        <FlightDeckEffects v-show="displaySelected == 'flightDeckEffects'" />
        <Parameters v-show="displaySelected == 'parameters'" />
        <Notes v-show="displaySelected == 'notes'" />

      </el-row>
    </el-main>
    <el-footer>
      <div>
        <button class="footer-btn" @click="printPage">PRINT</button>
      </div>
      <div>
        <button class="footer-btn" @click="">FLIGHT LEGS</button>
        <button class="footer-btn" @click="goPreviousPage()">PREVIOUS</button>
        <button class="footer-btn" @click="goNextPage()">NEXT</button>
        <button class="footer-btn" @click="goBackToReportPage()">BACK</button>
      </div>
    </el-footer>
  </div>
</template>

<script>
import RootCause from "./SelectFailuresRadios/RootCause";
import FlightDeckEffects from "./SelectFailuresRadios/FlightDeckEffects";
import Parameters from "./SelectFailuresRadios/Parameters";
import Notes from "./SelectFailuresRadios/Notes";
import Clock from '@/components/Clock'

import {flightPhaseEnum} from '@/globals/enums.js'
import {printPage, changeRadio} from '@/utils/utils.js'

export default {
  components: { RootCause, FlightDeckEffects, Parameters, Notes, Clock },
  name: "SelectFailuresDetails",
  data() {
    return {
      selectedData: [],
      displaySelected: 'rootCause'
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
    /**
     * 本函数用于切换当前展示数据至其上一条failure数据
     *
     */
    goPreviousPage() {
      //清除当前展示数据
      this.selectedData.pop();

      //计算当前数据和上一条数据在数组内的索引
      const currentIndex = this.$store.state.failureList.resFailureData.findIndex(obj => obj === this.$store.state.failureList.resFailureData.find(obj => obj.index === this.$store.state.failureList.selectedFailureId));
      const nextIndex = (currentIndex  - 1 + this.$store.state.failureList.resFailureData.length) % this.$store.state.failureList.resFailureData.length;

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

      console.log("这是目前能利用的数据")
      console.log(this.$store.state.failureList.resFailureData)

      //深度拷贝，不改变state中selectedFailureId的原始数据
      const objSelectedData = JSON.parse(
        JSON.stringify(this.$store.state.failureList.resFailureData.find(obj => obj.index === this.$store.state.failureList.selectedFailureId))
      );


      this.selectedData.push(objSelectedData);

      console.log("这是目前正在展示的数据")
      console.log( this.selectedData)

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

<style scoped>
</style>
