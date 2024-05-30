<template>
  <div>
    <el-header style="height: 9vh;">
      <el-row style="width: 100%;">
        <el-col :span="6">
          <div class="el-header-radios">
            <div class="el-header-subcontainer"> Event: {{ currentEvent.Event }} </div>
            <div class="el-header-subcontainer"> Date/Time: {{ currentEvent.Time }} </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="el-header-radios">
            <div class="el-header-subcontainer"> ATA: {{ currentEvent.ATA }} </div>
            <div class="el-header-subcontainer"> Flight Leg: {{ currentEvent.FlightLeg }} </div>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="el-header-radios">
            <div class="radio"
                 @click="changeRadio('summary')">
              <input name="event-param-display-radio"
                     type="radio"
                     :checked="displaySelected == 'summary'" />
              <label class="form-check-label">Parameter Summary</label>
            </div>
            <div class="radio"
                 @click="changeRadio('snapshot')">
              <input name="event-param-display-radio"
                     type="radio"
                     :checked="displaySelected == 'snapshot'" />
              <label class="form-check-label">Parameter Snapshot</label>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="2">
        <el-row v-if="displaySelected == 'summary'"
                style="border:  0.5px solid rgb(111, 111, 111);">
          <el-table highlight-current-row
                    height="70vh"
                    :data="dataForDisplay"
                    style=" background-color: rgb(46, 45, 45)"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'NO ASSOCIATED PARAMETERS'">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="param"
                             label="Parameter"
                             sortable
                             :width="null"
                             :min-width="50"></el-table-column>
            <el-table-column prop="Time"
                             label="Value"
                             :width="null"
                             :min-width="50"></el-table-column>
            <el-table-column prop="ATA"
                             label="Units"
                             :width="null"
                             :min-width="30"></el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
          <div class="table-inner-number"> Total Number: {{ }} </div>
        </el-row>
        <el-row v-else>
          <el-col :span="8"
                  style="border:  0.5px solid rgb(111, 111, 111);">
            <el-table highlight-current-row
                      height="70vh"
                      :data="dataForDisplay"
                      @row-click="handleParamRowClick"
                      style=" background-color: rgb(46, 45, 45)"
                      :sort-method="customSortMethodForProgressColumn"
                      :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                      :empty-text="'NO ASSOCIATED PARAMETERS'">
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
              <el-table-column prop="param"
                               label="Parameter"
                               sortable
                               :width="null"
                               :min-width="100">
                <template slot="header"
                          slot-scope="scope"> Parameter <el-input
                            style="margin-left:2vh; margin-right:1vh; width: 20vh;"
                            v-model="searchParameterInput"
                            size="mini"
                            placeholder="Parameter"
                            clearable />
                  <i class="el-icon-search"></i>
                </template>
              </el-table-column>
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="16"
                  style="border:  0.5px solid rgb(111, 111, 111);">
            <el-table highlight-current-row
                      height="70vh"
                      :data="combinedRecords"
                      style=" background-color: rgb(46, 45, 45)"
                      :sort-method="customSortMethodForProgressColumn"
                      :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                      :empty-text="'NO PARAMETER DATA FOR EVENT'">
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
              <el-table-column prop="RecordTime"
                               label="Date/Time"
                               sortable
                               :width="null"
                               :min-width="50"></el-table-column>
              <el-table-column prop="RecordValues[0]"
                               label="Temp_degree_6"
                               :width="null"
                               :min-width="30"></el-table-column>
              <el-table-column prop="RecordValues[1]"
                               label="Temp_degree_3"
                               :width="null"
                               :min-width="50"></el-table-column>
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-row>
      <FlightLegs @close=" isFlightLegsSelected = false"
                  v-if="isFlightLegsSelected">
      </FlightLegs>
    </el-main>
    <el-footer>
      <div>
        <button class="footer-btn"
                @click="printPage()">PRINT</button>
      </div>
      <div>
        <button v-if="displaySelected == 'summary'"
                class="
                footer-btn"
                @click="isFlightLegsSelected = true">FLIGHT LEGS</button>
        <button class="footer-btn"
                @click="goEventPage">BACK</button>
        <button v-if="displaySelected == 'snapshot'"
                class="
                footer-btn"
                @click="goPreviousEvent">PREVIOUS</button>
        <button v-if="displaySelected == 'snapshot'"
                class="
                footer-btn"
                @click="goNextEvent">NEXT</button>
      </div>
    </el-footer>
  </div>
</template>
<script>
import Clock from '@/components/Clock/index.vue'
import FlightLegs from '@/components/FlightLegs/index.vue'
import { printPage, changeRadio, customSortMethodForProgressColumn } from '@/utils/utils.ts'
import { postEventPara } from '@/services/conditionMonitoring/eventMonitoring/index.js';
import qs from 'qs'


export default {
  name: "eventSelect",
  data() {
    return {
      displaySelected: "summary",
      isFlightLegsSelected: false,

      searchParameterInput: "",
      currentEvent: {},
      dataForDisplay: [],
      combinedRecords: [],

      selectedParams: []
    };
  },
  components: {
    Clock,
    FlightLegs
  },
  methods: {
    /**
     * @param {any} row
     */
    handleParamRowClick(row) {
      const index = this.selectedParams.findIndex(param => param === row);
      if (index !== -1) {
        this.selectedParams.splice(index, 1); // 如果该行已经存在于 selectedParams 中，则删除它


        console.log(this.selectedParams);
      } else {
        if (this.selectedParams.length === 2) {
          this.$message({
            message: 'Display up to two parameters'
          });

        } else {
          this.selectedParams.push(row);

          console.log(this.selectedParams);


          this.combinedRecords = []
          // 找出selectedParams中采样率最高的参数
          let maxRate = 0;
          for (const param of this.selectedParams) {
            maxRate = Math.max(maxRate, parseInt(param.rate, 10));
          }

          // 生成时间轴
          let timeAxis = [];
          let timeIndex = 1;
          for (const param of this.selectedParams) {
            const rate = parseInt(param.rate, 10);
            const numRecords = param.records.length;
            const timeIncrement = 1 / rate;
            let currentTime = param.records[0].RecordTime;
            for (let i = 0; i < numRecords; i++) {
              for (let j = 1; j <= rate; j++) {
                timeAxis.push({ RecordTime: currentTime, RecordIndex: timeIndex });
                timeIndex++;
                currentTime = new Date(currentTime.getTime() + (timeIncrement * 1000));
              }
            }
          }


          for (const param of this.selectedParams) {
            for (let i = 0; i < timeAxis.length; i++) {
              const recordIndex = Math.floor((timeAxis[i].RecordIndex - 1) * (param.records.length / (maxRate * timeAxis.length))); // 根据采样率计算索引
              let recordValue = '--';
              if (recordIndex >= 0 && recordIndex < param.records.length) {
                recordValue = param.records[recordIndex].RecordValues;
              }
              timeAxis[i][param.param] = recordValue;
            }
          }
          console.log(timeAxis);
        }
      }
    },

    goEventPage() {
      this.$router.push({ name: "EventDisplay" });
    },

    goPreviousEvent() {

    },
    goNextEvent() {

    },

    printPage,
    changeRadio,
    customSortMethodForProgressColumn,
  },
  mounted() {

    this.currentEvent = this.$route.params.selectEvent;
    // @ts-ignore
    let originalTime = new Date(this.currentEvent.Time);

    // 计算起始时间和结束时间
    let startTime = new Date(originalTime);
    startTime.setSeconds(startTime.getSeconds() + this.currentEvent.relativeStart);
    let endTime = new Date(originalTime);
    endTime.setSeconds(endTime.getSeconds() + this.currentEvent.relativeStop);

    // 获取本地时间字符串表示
    let formattedStartTime = startTime.toLocaleString();
    let formattedEndTime = endTime.toLocaleString();

    let tmp = qs.stringify({
      Params: this.currentEvent.associatedParams,
      StartTime: formattedStartTime,
      EndTime: formattedEndTime
    });

    // console.log(tmp);

    postEventPara(tmp).then(response => {

      this.dataForDisplay = response
      // console.log(response)
    }).catch(error => {
      console.error('Error in Postting event params:', error);
    });


  }
}
</script>
<style scoped></style>
