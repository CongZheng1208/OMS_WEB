<template>
  <el-container style="display: flex; flex-direction: column">
    <el-header
      style="
        text-align: left;
        font-weight: bold;
        color: white;
        text-shadow: 2px 2px 2px #000;
        padding-top: 3vh;
        padding-left: 4vh;
        font-size: 16px;
        height: 11vh;
      "
    >
      <el-row>
        <el-col :span="6">
          <el-row>
            <div style="float: left">Select Option:</div>
          </el-row>
          <el-row>
            <div style="float: left">Existing Failure</div>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-row>
            <div style="float: left">Activity Status:</div>
          </el-row>
          <el-row>
            <div style="float: left">In-Progress</div>
          </el-row>
        </el-col>

        <el-col :span="6">
          <div style="float: left">
            <div>
              <input
                name="select-details-radio"
                type="radio"
                :checked="rootCauseSelected"
                v-on:change="changeTabs('rootCause')"
              />
              <span>Root Cause</span>
            </div>
            <div>
              <input
                name="select-details-radio"
                type="radio"
                :checked="flightDeckEffectsSelected"
                v-on:change="changeTabs('flightDeckEffects')"
              />
              <span>Flight Deck Effects</span>
            </div>
            <div>
              <input
                name="select-details-radio"
                type="radio"
                :checked="parametersSelected"
                v-on:change="changeTabs('parameters')"
              />
              <span>Parameters</span>
            </div>
          </div>
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
            prop="fimcode_info"
            label="FIM Code"
            :width="null"
            :min-width="30"
          ></el-table-column>
          <el-table-column
            prop="failure_name_info"
            label="Failure Name"
            :width="null"
            :min-width="75"
          ></el-table-column>
          <el-table-column
            prop="failure_time"
            label="Failure Date/Time"
            :width="null"
            :min-width="55"
          ></el-table-column>
          <el-table-column
            prop="equipment_name"
            label="Equipment Name"
            :width="null"
            :min-width="55"
          ></el-table-column>
          <el-table-column
            prop="flight_phase"
            label="OMS Flight Phase"
            :width="null"
            :min-width="35"
            :formatter="FlightPhaseData"
          ></el-table-column>

          <el-table-column
            prop="flight_leg"
            label="Flight Leg"
            :width="null"
            :min-width="35"
          ></el-table-column>
          <el-table-column :width="null" :min-width="5"></el-table-column>
        </el-table>
      </el-row>

      <!-- 底部信息部分：-->
      <el-row style="margin-bottom: 20px">
        <div style="float: left; margin-left: 15px">
          Failure Message: This is the failure message
        </div>
      </el-row>
      <el-row>
        <el-col :span="12" style="border: 1.5px solid lightgrey; height: 52vh">
          <RootCause v-show="rootCauseSelected" />
          <FlightDeckEffects v-show="flightDeckEffectsSelected" />
          <Parameters v-show="parametersSelected" />
        </el-col>
        <el-col :span="12" style="border: 1.5px solid lightgrey; height: 52vh">
          <el-row style="height: 3vh; margin-top: 15px">
            <div style="float: left; margin-left: 15px">
              Maintenance Time: {{ maintence_time }} minutes
            </div>
          </el-row>
          <el-row style="height: 3vh; margin-top: 10px">
            <div style="float: left; height: 3vh; margin-left: 15px">
              Maintenance Text
            </div>
          </el-row>
          <el-row>
            <div
              style="
                padding: 5px;
                height: 40vh;
                border: 1.5px solid lightgrey;
                margin-left: 10px;
                margin-right: 10px;
                text-align: left;
              "
            >
              {{ maitence_text }}
            </div>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <div>
        <el-button class="footer-btn" @click="printPage">PRINT</el-button>
      </div>
      <div>
        <el-button class="footer-btn" @click="goBackToReportPage()"
          >Back</el-button
        >
        <el-button class="footer-btn" @click="goPreviousPage()"
          >Previous</el-button
        >
        <el-button class="footer-btn" @click="goNextPage()">Next</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import RootCause from "./SelectFailuresRadios/RootCause";
import FlightDeckEffects from "./SelectFailuresRadios/FlightDeckEffects";
import Parameters from "./SelectFailuresRadios/Parameters";
import {flightPhaseEnum} from '@/globals/enums.js'

export default {
  components: { RootCause, FlightDeckEffects, Parameters },
  name: "SelectFailuresDetails",
  data() {
    return {
      selectedData: [],
      rootCauseSelected: true,
      flightDeckEffectsSelected: false,
      parametersSelected: false,
      maintence_time: "",
      maitence_text: "",
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
     * 本函数用于打印页面
     */
    printPage() {
      window.print();
      console.log("null");
    },
    /**
     * 本函数用于select-details-radio单选按钮选择左下角的信息展示：
     * 可选的有rootCause、flightDeckEffects、parameters
     * @param {*} value select-details-radio组checked value
     */
    changeTabs(value) {
      if (value == "rootCause") {
        this.rootCauseSelected = true;
        this.flightDeckEffectsSelected = false;
        this.parametersSelected = false;
      }
      if (value == "flightDeckEffects") {
        this.rootCauseSelected = false;
        this.flightDeckEffectsSelected = true;
        this.parametersSelected = false;
      }
      if (value == "parameters") {
        this.rootCauseSelected = false;
        this.flightDeckEffectsSelected = false;
        this.parametersSelected = true;
      }
    },
    /**
     * 本函数用于返回至FailureReport主界面
     *
     */
    goBackToReportPage() {
      this.$router.push({ name: "FailureList" });
    },
    /**
     * 本函数用于跳转页面至之前浏览页面（暂未实现）
     *
     */
    goPreviousPage() {},
    /**
     * 本函数用于跳转页面至下个页面（暂未实现）
     *
     */
    goNextPage() {},

    /**
     * 本函数用于mounted中，获取state中所选行的selectedFailureInfo数据
     * 为maintence_time和maitence_text赋值，为equipment_name赋值为TBD
     */
    getSelectedData() {
      //深度拷贝，不改变state中selectedFailureInfo的原始数据
      const objSelectedData = JSON.parse(
        JSON.stringify(this.$store.state.selectedFailureInfo)
      );
      this.selectedData.push(objSelectedData);
      //为maintence_time和maitence_text赋值
      this.maintence_time = this.selectedData[0].maintence_time;
      this.maitence_text = this.selectedData[0].maitence_text;
      //设置equipment_name为"TBD"
      for (let item of this.selectedData) {
        item.equipment_name = "TBD";
      }
    },
  },
  mounted() {
    //调用获取getSelectedData的函数
    this.getSelectedData();
  },
};
</script>

<style scoped>
</style>
