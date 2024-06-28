<template>
  <div style=" background-color:rgb(45, 45, 45);">
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
                    height="65vh"
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
          <div class="
                table-lower-bar">
            <span class="table-lower-bar-right-text"> Total Number: {{ }}</span>
          </div>
        </el-row>
        <el-row v-else>
          <el-col :span="8"
                  style="border:  0.5px solid rgb(111, 111, 111);">
            <el-table height="70vh"
                      :data="filteredData"
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
            <el-table height="70vh"
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
              <el-table-column prop="RecordValuesLeft"
                               :label="param1Label"
                               :width="null"
                               :min-width="30"></el-table-column>
              <el-table-column prop="RecordValuesRight"
                               :label="param2Label"
                               :width="null"
                               :min-width="30"></el-table-column>
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
                @click="isFlightLegsSelected = true">SHOW FLIGHT LEGS</button>
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
import { printPage, changeRadio, customSortMethodForProgressColumn, updateCurrentTime } from '@/utils/utils'
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

      timeStampArray: [],
      combinedRecords: [],

      param1Label: '',
      param2Label: '',

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
      if (row.records.length == 0) {
        this.$message({
          message: 'The parameter is missing data and cannot be added'
        });
      } else if (index !== -1) {
        this.selectedParams.splice(index, 1); // 如果该行已经存在于 selectedParams 中，则删除它
        this.updateCurrentRecords()
      } else {
        if (this.selectedParams.length === 2) {
          this.$message({
            message: 'Display up to two parameters'
          });
        } else {
          this.selectedParams.push(row);
          this.updateCurrentRecords()
        }
      }
    },

    updateCurrentRecords() {

      this.combinedRecords = [];
      this.timeStampArray = [];
      this.param1Label = ""
      this.param2Label = ""

      // 找出selectedParams中采样率最高的参数
      let maxRate = 0;
      for (const param of this.selectedParams) {
        maxRate = Math.max(maxRate, parseInt(param.rate, 10));
      }

      // 获取采样率最高的参数的记录
      for (const param of this.selectedParams) {
        if (parseInt(param.rate, 10) === maxRate) {
          const records = param.records;
          for (const record of records) {
            const timestamp = new Date(record.RecordTime);
            for (let i = 0; i < maxRate; i++) {
              this.timeStampArray.push(this.getFormattedRecordTime(timestamp, i, maxRate))
            }
          }
          break; // 找到最高采样率的参数后结束循环
        }
      }
      this.combinedRecords = [];

      // 若只有一个数据需要展示
      if (this.selectedParams.length === 1) {
        // 当只有一个参数需要展示时
        const rate = parseInt(this.selectedParams[0].rate, 10);
        let recordName = this.selectedParams[0].param;

        for (let i = 0; i < this.timeStampArray.length; i++) {
          const timestamp = this.timeStampArray[i];
          const record = this.selectedParams[0].records[Math.floor(i / maxRate)];
          const recordIndex = Math.min(Math.floor(i * (rate / maxRate)), record.RecordValues.length - 1);
          this.combinedRecords.push({
            RecordTime: timestamp,
            RecordNameLeft: recordName,
            RecordNameRight: "",
            RecordValuesLeft: record.RecordValues[recordIndex],
            RecordValuesRight: "",
          });
        }
        this.param1Label = recordName
      } else if (this.selectedParams.length === 2) {
        // 当有两个参数需要展示时
        const rate1 = parseInt(this.selectedParams[0].rate, 10);
        const rate2 = parseInt(this.selectedParams[1].rate, 10);
        const records1 = this.selectedParams[0].records;
        const records2 = this.selectedParams[1].records;

        for (let i = 0; i < this.timeStampArray.length; i++) {
          const timestamp = this.timeStampArray[i];
          const recordIndex1 = Math.min(Math.floor(i * (rate1 / maxRate)), records1[0].RecordValues.length - 1);
          const recordIndex2 = Math.min(Math.floor(i * (rate2 / maxRate)), records2[0].RecordValues.length - 1);

          if (rate1 >= rate2) {
            // 如果参数1的采样率更高或相等
            this.combinedRecords.push({
              RecordTime: timestamp,
              RecordNameLeft: this.selectedParams[0].param,
              RecordNameRight: this.selectedParams[1].param,
              RecordValuesLeft: records1[0].RecordValues[recordIndex1],
              RecordValuesRight: (i % (rate1 / rate2) === 0) ? records2[0].RecordValues[recordIndex2] : "--",
            });
            for (let j = 1; j < records2.length; j++) {
              const index2 = Math.min(Math.floor(i * (rate2 / maxRate)), records2[j].RecordValues.length - 1);
              this.combinedRecords[this.combinedRecords.length - 1]["RecordValuesRight_" + j] = (i % (rate1 / rate2) === 0) ? records2[j].RecordValues[index2] : "--";
            }
          } else {
            // 如果参数2的采样率更高
            this.combinedRecords.push({
              RecordTime: timestamp,
              RecordNameLeft: this.selectedParams[0].param,
              RecordNameRight: this.selectedParams[1].param,
              RecordValuesLeft: (i % (rate2 / rate1) === 0) ? records1[0].RecordValues[recordIndex1] : "--",
              RecordValuesRight: records2[0].RecordValues[recordIndex2],
            });
            for (let j = 1; j < records1.length; j++) {
              const index1 = Math.min(Math.floor(i * (rate1 / maxRate)), records1[j].RecordValues.length - 1);
              this.combinedRecords[this.combinedRecords.length - 1]["RecordValuesLeft_" + j] = (i % (rate2 / rate1) === 0) ? records1[j].RecordValues[index1] : "--";
            }
          }
        }
        this.param1Label = this.selectedParams[0].param
        this.param2Label = this.selectedParams[1].param
      }
    },

    // 辅助函数，用于格式化时间戳
    getFormattedRecordTime(timestamp, index, maxRate) {
      const newTimestamp = new Date(timestamp.getTime() + (index * (1000 / maxRate)));
      // return newTimestamp.toLocaleString() + ' ' + index;
      return newTimestamp.toLocaleString();
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
  computed: {
    filteredData() {
      return this.dataForDisplay.filter((item) => {
        return item.param.toLowerCase().includes(this.searchParameterInput.toLowerCase());
      });
    },
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

    postEventPara(tmp).then(response => {
      this.dataForDisplay = response
      console.log(response)
    }).catch(error => {
      console.error('Error in Postting event params:', error);
    });


  }
}
</script>
<style scoped></style>
