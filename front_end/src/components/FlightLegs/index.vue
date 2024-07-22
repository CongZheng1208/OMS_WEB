<template>
  <el-dialog center
             style="font-size: 15px;"
             :visible.sync="isFlightLegsSelected"
             :show-close=false
             :close-on-click-modal=false
             width="70%">
    <el-row style=" margin-left: 15px; margin-right: 15px; height: 50vh;">
      <el-table style="
              width: 100%;
              margin-top: 1vh;
              margin-bottom: 1vh;
              background-color: rgb(46, 45, 45);
              border:  0.5px solid rgb(111, 111, 111);
            "
                :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                :data="flightLegData"
                height="50vh"
                :sort-method="customSortMethodForProgressColumn"
                :empty-text="'NO DATA DISPLAY'">
        <el-table-column :width="null"
                         :min-width="10"></el-table-column>
        <el-table-column prop="flightLeg"
                         label="Flight Leg"
                         sortable
                         :formatter="flightLegFormatter"
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

import { getFlightLeg } from '@/services/util/index';
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
    flightLegFormatter(row, column) {
      // 找出flightLeg的最大值
      const maxFlightLeg = Math.max(...this.flightLegData.map(item => item.flightLeg));

      // 对flightLeg进行格式化处理
      return row.flightLeg - maxFlightLeg;
    },
    customSortMethodForProgressColumn

  }
};
</script>
