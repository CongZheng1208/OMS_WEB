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
                    style=" background-color: rgb(46, 45, 45)"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'NO ASSOCIATED PARAMETERS'">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="Event"
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
                      style=" background-color: rgb(46, 45, 45)"
                      :sort-method="customSortMethodForProgressColumn"
                      :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                      :empty-text="'NO ASSOCIATED PARAMETERS'">
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
              <el-table-column prop="MemberSystemName"
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
                      style=" background-color: rgb(46, 45, 45)"
                      :sort-method="customSortMethodForProgressColumn"
                      :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                      :empty-text="'NO PARAMETER DATA FOR EVENT'">
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
              <el-table-column prop="Time"
                               label="Date/Time"
                               sortable
                               :width="null"
                               :min-width="50"></el-table-column>
              <el-table-column prop="ATA"
                               label="Temp_degree_6"
                               :width="null"
                               :min-width="30"></el-table-column>
              <el-table-column prop="FlightLeg"
                               label="Temp_degree_3"
                               :width="null"
                               :min-width="50"></el-table-column>
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-row>
      <el-dialog style="font-size: 15px; color: white;"
                 :visible.sync="isFlightLegsSelected"
                 width="70%">
        <el-row style=" margin-left: 15px; margin-right: 15px;">
          <el-table style="
              width: 100%;
              background-color: rgb(52, 52, 52);
              margin-top: 1vh;
              margin-bottom: 1vh;
            "
                    :header-cell-style="{
          background: 'rgb(52, 52, 52)',
          color: '#FFFFFF',
          font: '14px',
          'text-align': 'center',
        }"
                    :cell-style="{ 'text-align': 'center' }"
                    :empty-text="'NO DATA DISPLAY'">
            <el-table-column :width="null"
                             :min-width="10"></el-table-column>
            <el-table-column prop=""
                             label="Flight Leg"
                             :width="null"
                             :min-width="30"></el-table-column>
            <el-table-column prop=""
                             label="Flight Number Leg"
                             :width="null"
                             :min-width="55"></el-table-column>
            <el-table-column prop=""
                             label="Start Time"
                             :width="null"
                             :min-width="55"></el-table-column>
            <el-table-column prop=""
                             label="Origin"
                             :width="null"
                             :min-width="55"></el-table-column>
            <el-table-column prop=""
                             label="Destination"
                             :width="null"
                             :min-width="55"></el-table-column>
            <el-table-column :width="null"
                             :min-width="10"></el-table-column>
          </el-table>
        </el-row>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="isFlightLegsSelected = false">Back</el-button>
        </span>
      </el-dialog>
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
import { printPage, changeRadio, customSortMethodForProgressColumn } from '@/utils/utils.ts'
import { getEvent, getEventPara } from '@/services/conditionMonitoring/eventMonitoring/index.js';

export default {
  name: "eventSelect",
  data() {
    return {
      displaySelected: "summary",
      isFlightLegsSelected: false,

      searchParameterInput: "",
      currentEvent: {}
    };
  },
  components: {
    Clock
  },
  methods: {
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
    this.currentEvent = this.$route.params.selectEvent
    console.log(this.currentEvent)


  }
}
</script>
<style scoped></style>
