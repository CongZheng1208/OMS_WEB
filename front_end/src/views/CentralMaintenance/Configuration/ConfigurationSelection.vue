<template>
  <div style="background-color: rgb(45, 45, 45);">
    <el-header height="8vh">
      <el-row style="width: 100%;">
        <el-col :span="10">
          <div class="el-header-title"> ATA and Equipment Selection </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="2">
        <el-col :span="12"
                style="border:  0.5px solid rgb(111, 111, 111);">
          <el-table highlight-current-row
                    height="70vh"
                    style=" background-color: rgb(46, 45, 45)"
                    @row-click="handleATARowClick"
                    :data="ATAs"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'NO DATA DISPLAY'">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="ataNumber"
                             label="ATA"
                             sortable
                             :width="null"
                             :min-width="15"></el-table-column>
            <el-table-column prop="equipmentName"
                             label="System Name"
                             :width="null"
                             :min-width="35"
                             :formatter="formatATAName"></el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12"
                style="border:  0.5px solid rgb(111, 111, 111);">
          <el-table highlight-current-row
                    height="70vh"
                    style=" background-color: rgb(46, 45, 45)"
                    :data="Equis"
                    @row-click="handleEquipmentRowClick"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'NO DATA DISPLAY'">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="equipmentName"
                             label="Equiment Name"
                             sortable
                             :width="null"
                             :min-width="35"></el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-dialog title="ERROR MESSAGE"
                 :visible.sync="isEquiSelected"
                 width="30%">
        <p style="color:black">Please select a configuration item!</p>
        <span slot="footer"
              class="dialog-footer">
          <el-button type="primary"
                     @click="isEquiSelected = false">OK</el-button>
        </span>
      </el-dialog>
    </el-main>
    <el-footer>
      <div>
        <button class="footer-btn"
                @click="printPage">PRINT</button>
      </div>
      <div>
        <button class="footer-btn"
                @click="goDisplayPage()">SELECT</button>
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">
import { printPage, customSortMethodForProgressColumn, handleTestOrder } from '@/utils/utils'
import { getATAandEqui } from '@/services/centralMaintenance/configuration/index.js';
import { ataNameEnum } from '@/globals/enums'

export default {
  name: "ConfigurationDisplay",
  data() {
    return {
      ATAs: [],
      Equis: [],
      selectedEqui: {},
      isEquiSelected: false

    };
  },
  created() {
    getATAandEqui().then(response => {
      this.ataEquiData = response
      Object.keys(response).forEach(key => {
        this.ATAs.push({
          ataNumber: key,
          systemName: "to be done",
        });
      });
    });
  },
  methods: {
    /**
     * 本函数用于跳转页面
     */
    goDisplayPage() {
      //判断是否选择表格某一行数据，若否则提示选择，若是则跳转至SelectFailuresDetails页面
      if (Object.keys(this.selectedEqui).length === 0) {
        this.isEquiSelected = true
      } else {
        this.$router.push({ name: "ConfigurationDisplay", params: { selectedEqui: this.selectedEqui } });
      }
    },


    /**
     * 本函数用于选中某个ATA
     * @param {Object} row
     */
    handleATARowClick(row) {
      this.Equis = this.ataEquiData[row.ataNumber]
    },

    /**
     * 本函数用于选中要进行的装备
     * @param {Object} row
     */
    handleEquipmentRowClick(row) {
      this.selectedEqui = row
    },



    /**
     * 本函数用于
     * 即将flight_phase原数据对应为state中flightPhaseEnum枚举值
     * @param {*} row table选中行信息
     */
    formatATAName(row) {
      return ataNameEnum[row.ataNumber.substring(0, 2)];
    },
    printPage,
    handleTestOrder,
    customSortMethodForProgressColumn
  }
}

</script>
<style scoped></style>
