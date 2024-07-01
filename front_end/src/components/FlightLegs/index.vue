<template>
  <el-dialog style="font-size: 15px; back"
             :visible.sync="isFlightLegsSelected"
             :show-close=false
             :close-on-click-modal=false
             width="70%">
    <el-row style=" margin-left: 15px; margin-right: 15px;     height: 50vh; background-color: '#f1f1f1'">
      <el-table style="
              width: 100%;

              background-color:  #ffffff;
              margin-top: 1vh;
              margin-bottom: 1vh;
              border:  0.5px solid rgb(111, 111, 111);
            "
                class="el-table—dialog"
                :data="flightLegData"
                height="50vh"
                :header-cell-style="{
              background: 'rgb(200, 200, 200)',
              color: '#010101',
              font: '14px'
            }"
                :sort-method="customSortMethodForProgressColumn"
                :empty-text="'NO DATA DISPLAY'">
        <el-table-column :width="null"
                         :min-width="10"></el-table-column>
        <el-table-column prop="flightLeg"
                         label="Flight Leg"
                         sortable
                         :width="null"
                         :min-width="30"></el-table-column>
        <el-table-column prop="flightNumber"
                         label="Flight Number"
                         :width="null"
                         :min-width="35"></el-table-column>
        <el-table-column prop="startTime"
                         label="Start Time"
                         :width="null"
                         :min-width="65"></el-table-column>
        <el-table-column prop="departure"
                         label="Departure"
                         :width="null"
                         :min-width="45"></el-table-column>
        <el-table-column prop="destination"
                         label="Destination"
                         :width="null"
                         :min-width="45"></el-table-column>
        <el-table-column :width="null"
                         :min-width="10"></el-table-column>
      </el-table>
    </el-row>
    <span slot="footer"
          class="dialog-footer">
      <el-button type="primary"
                 @click="onClose">Back</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">

import { getFlightLeg } from '@/services/util/index.js';
import { customSortMethodForProgressColumn } from '@/utils/utils'

export default {
  data() {
    return {
      isFlightLegsSelected: true,
      flightLegData: []
    }
  },

  created() {
    getFlightLeg().then(response => {
      this.flightLegData = response.reverse();

    });
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    onConfirm() {
      this.$emit('ok')
    },
    customSortMethodForProgressColumn

  }
};
</script>
