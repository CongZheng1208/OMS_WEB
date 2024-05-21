<template>
  <div>
    <el-header style="height: 12vh;">
      <el-row style="width: 100%;">
        <el-col :span="3">
          <div class="el-header-title"> Select Option </div>
        </el-col>
        <el-col :span="3">
          <div class="radio"
               @click="changeRadio('all')">
            <input name="event-display-radio"
                   type="radio"
                   :checked="displaySelected == 'all'" />
            <label class="form-check-label">All</label>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="radio"
               @click="changeRadio('ata')">
            <input name="event-display-radio"
                   type="radio"
                   :checked="displaySelected == 'ata'" />
            <label class="form-check-label">ATA System</label>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="radio"
               @click="changeRadio('flight')">
            <input name="event-display-radio"
                   type="radio"
                   :checked="displaySelected == 'flight'" />
            <label class="form-check-label">Flight Leg</label>
          </div>
        </el-col>
        <el-col :span="4">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="2">
        <el-row v-if="displaySelected == 'all'">
          <el-table highlight-current-row
                    height="70vh"
                    style=" background-color: rgb(46, 45, 45)"
                    @row-click="showParameters"
                    :data="allEvent"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'No Data Display'">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="Event"
                             label="Event Name"
                             sortable
                             :width="null"
                             :min-width="50"></el-table-column>
            <el-table-column prop="Time"
                             label="Date/Time"
                             sortable
                             :width="null"
                             :min-width="50"></el-table-column>
            <el-table-column prop="ATA"
                             label="Event Name"
                             sortable
                             :width="null"
                             :min-width="30"></el-table-column>
            <el-table-column prop="FlightLeg"
                             label="Flight Leg"
                             sortable
                             :width="null"
                             :min-width="50"></el-table-column>
            <el-table-column prop="FlightPhase"
                             label="Flight Phase"
                             sortable
                             :width="null"
                             :min-width="50"></el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
        </el-row>
        <div v-if="listSelected == 2">
          <el-table highlight-current-row
                    height="62vh"
                    style=" background-color: rgb(46, 45, 45)"
                    @row-click="showListParameters"
                    :data="params"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'No Data Display'">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="name"
                             label="List Name"
                             sortable
                             :width="null"
                             :min-width="35"></el-table-column>
            <el-table-column prop="createdDate"
                             label="Date Created"
                             sortable
                             :width="null"
                             :min-width="40"></el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
        </div>
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
                    :empty-text="'No Data Display'">
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
                @click="saveSele()">PRINT</button>
      </div>
      <div>
        <button class="footer-btn"
                @click="clearSele()">FLIGHT LEGS</button>
        <button class="footer-btn"
                @click="startView">SELECT</button>
      </div>
    </el-footer>
  </div>
</template>
<script>
import Clock from '@/components/Clock'
import { printPage, changeRadio, customSortMethodForProgressColumn } from '@/utils/utils.js'
import { getEvent, getEventPara } from '@/services/conditionMonitoring/eventMonitoring/index.js';

export default {
  name: "eventSelect",
  data() {
    return {
      displaySelected: "all",
      isFlightLegsSelected: false,
      allEvent: []

    };
  },
  components: {
    Clock
  },
  methods: {
    /**
     * 本函数用于跳转页面
     */
    goSelectPage() {
      this.$router.push({ name: "ConfigurationDisplay" });
    },

    customSortMethodForProgressColumn,
  },
  mounted() {

    getEvent().then(response => {
      this.allEvent = response
    }).catch(error => {
      console.error('Error in fetching parameter list:', error);
    });



  },
  computed: {

  }
}
</script>
<style scoped></style>
