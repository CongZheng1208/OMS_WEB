<template>
  <div style="background-color: rgb(45, 45, 45);">
    <el-header height="10vh">
      <el-row style="width: 100%;">
        <el-col :span="10">
          <div class="el-header-title"> ATA and Equipment Selection </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="2">
        <el-col :span="12">
          <el-table highlight-current-row
                    height="70vh"
                    style=" background-color: rgb(46, 45, 45)"
                    @row-click="handleATARowClick"
                    :data="ATAs"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'No Data Display'">
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
            <el-table-column prop="ataNumber"
                             label="ATA"
                             sortable
                             :width="null"
                             :min-width="15"></el-table-column>
            <el-table-column prop="equipmentName"
                             label="System Name"
                             sortable
                             :width="null"
                             :min-width="35">{{ "To be continue" }}</el-table-column>
            <el-table-column :width="null"
                             :min-width="5"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table highlight-current-row
                    height="70vh"
                    style=" background-color: rgb(46, 45, 45)"
                    :data="Equis"
                    @row-click="handleEquipmentRowClick"
                    :sort-method="customSortMethodForProgressColumn"
                    :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                    :empty-text="'No Data Display'">
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
<script>
import { printPage, customSortMethodForProgressColumn, handleTestOrder } from '@/utils/utils.js'
import { getATAandEqui } from '@/services/centralMaintenance/configuration/index.js';


export default {
  name: "ConfigurationDisplay",
  data() {
    return {
      ATAs: [],
      Equis: [],
      selectedEqui: {}

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
      this.$router.push({ name: "ConfigurationDisplay", params: { selectedEqui: this.selectedEqui } });
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
      console.log(JSON.parse(row.hardwareInformation))
    },

    printPage,
    handleTestOrder,
    customSortMethodForProgressColumn
  }
}

</script>
<style scoped></style>
