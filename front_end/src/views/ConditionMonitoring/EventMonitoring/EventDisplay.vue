<template>
  <div style=" background-color:rgb(45, 45, 45);">
    <el-header style="height: 9vh;">
      <el-row style="width: 100%;">
        <el-col :span="21">
          <div class="el-header-title"> Select Option </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="2">
        <el-row style="border:  0.5px solid rgb(111, 111, 111);">
          <el-table highlight-current-row
                    height="65vh"
                    style=" background-color: rgb(46, 45, 45)"
                    @row-click="handleEventRowClick"
                    :data="allEvent"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'NO DATA DISPLAY'">
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
                             label="ATA"
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
          <div class="
                table-lower-bar">
            <span class="table-lower-bar-right-text"> Number of Events: {{ allEvent.length }}</span>
          </div>
        </el-row>
      </el-row>
      <FlightLegs @close=" isFlightLegsSelected = false"
                  v-if="isFlightLegsSelected">
      </FlightLegs>
      <el-dialog center
                 title="ERROR MESSAGE"
                 :visible.sync="isEventSelected"
                 width="30%">
        <p>Please select a event item!</p>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="isEventSelected = false">OK</el-button>
        </span>
      </el-dialog>
    </el-main>
    <el-footer>
      <div>
        <button class="footer-btn"
                @click="printPage()">PRINT</button>
      </div>
      <div>
        <button class="footer-btn"
                @click="isFlightLegsSelected = true">SHOW FLIGHT LEGS</button>
        <button class="footer-btn"
                @click="goParamPage">SELECT</button>
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">
import Clock from '@/components/Clock/index.vue'
import FlightLegs from '@/components/FlightLegs/index.vue'
import { printPage, customSortMethodForProgressColumn } from '@/utils/utils'
import { getEvent } from '@/services/conditionMonitoring/eventMonitoring/index';

export default {
  name: "eventSelect",
  data() {
    return {
      isFlightLegsSelected: false,
      isEventSelected: false,
      allEvent: [],
      selectEvent: {}

    };
  },
  components: {
    Clock,
    FlightLegs
  },
  methods: {
    handleEventRowClick(row) {
      this.selectEvent = row
    },
    /**
     * 本函数用于跳转页面
     */
    goParamPage() {
      if (Object.keys(this.selectEvent).length === 0) {
        this.isEventSelected = true
      } else {
        this.$router.push({ name: "ParamDisplay", params: { selectEvent: this.selectEvent } });
      }
    },
    printPage,
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
