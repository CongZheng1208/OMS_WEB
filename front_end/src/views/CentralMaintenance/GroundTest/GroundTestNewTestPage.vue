<template>
  <div>
    <el-header>
      <div class="el-header-title">
        ATA and Equipment Selection
      </div>
    </el-header>
    <el-main>
      <el-row :gutter="2">
        <el-col :span="8">
          <el-table
            highlight-current-row
            height="70vh"
            style=" background-color: rgb(46, 45, 45)"
            @row-click="handleRowClick"
            :data="rawData"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>
            <el-table-column prop="ataNumber" label="ATA" sortable :width="null" :min-width="25"></el-table-column>
            <el-table-column prop="systemName" label="System Name" sortable :width="null" :min-width="50"></el-table-column>
            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="16">
          <el-table
            highlight-current-row
            height="70vh"
            @row-click="handleEquipmentRowClick"
            :data="selectedEquipments"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>
            <el-table-column prop="equipmentName" label="Equipment Name" sortable :width="null" :min-width="80"></el-table-column>
            <el-table-column prop="availability" label="Availability" sortable :width="null" :min-width="40"></el-table-column>
            <el-table-column prop="Note" label="Note" :width="null" :min-width="50"></el-table-column>

            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-dialog
        title="Error Message"
        style="font-size: 15px; color: white;"
        :visible.sync="isEquiNotBeSelected"
        width="30%"
      >
        <span style="font-size: 15px; color: white;">Please select a equipment!</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="isEquiNotBeSelected = false">OK</el-button>
        </span>
      </el-dialog>

    </el-main>
    <el-footer>
      <div>
      </div>
      <div>
        <button class="footer-btn" @click="goDefaultPage()">BACK</button>
        <button class="footer-btn" @click="goSelectTestPage()">SELECT</button>
      </div>
    </el-footer>
  </div>
</template>

<script>
  import { getATAandEqui } from '@/services/centralMaintenance/groundTest/index.js';

  import {ataNameEnum} from '@/globals/enums.js'
  import {customSortMethodForProgressColumn} from '@/utils/utils.js'

  export default {
    data() {
      return {
        rawData: [],
        selectedATANum: "",
        selectedEquipment: {},
        selectedEquipments: [],
        isEquiNotBeSelected: false
      }
    },
    methods: {
      /**
       * 本函数用于开启用户选中的测试
       * @param {Object} row
       */
      handleRowClick(row) {
        this.selectedATANum = row.ataNumber;

        var selectedData = this.getSelectedData(this.selectedATANum)

        this.selectedEquipments = []

        for(var i=0; i<selectedData.equipmentName.length; i++){
          var equipObject = {}

          equipObject.ataNumber = selectedData.ataNumber
          equipObject.systemName = selectedData.systemName
          equipObject.equipmentName = selectedData.equipmentName[i]
          equipObject.availability = selectedData.availability[i]
          equipObject.testDetails = selectedData.testDetails[i]

          this.selectedEquipments.push(equipObject)
        }
      },

      /**
       * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
       * @param {string} row - menus数据的name属性
       */
      handleEquipmentRowClick(row) {
        this.selectedEquipment = this.getSelectedEquipment(row.equipmentName)
      },

      /**
       * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
       * @param {string} row - menus数据的name属性
       */
      getSelectedData(ataNum) {
        return this.rawData.find(item => item.ataNumber === ataNum);
      },

      /**
       * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
       * @param {string} row - menus数据的name属性
       */
      getSelectedEquipment(selectEequipmentName) {
        return this.selectedEquipments.find(item => item.equipmentName === selectEequipmentName);
      },

      /**
       * 本函数用于跳转页面
       */
      goSelectTestPage() {

        console.log(this.selectedEquipment)

        this.$store.state.groundTestList.selectedEquipment = this.selectedEquipment

        if(Object.keys(this.selectedEquipment ).length !== 0){
          this.$router.push({ name: "SelectTest", params: { selectedEquipment: this.selectedEquipment } });
        }else{
          this.isEquiNotBeSelected = true
        }
      },

      /**
       * 本函数用于跳转页面
       */
       goDefaultPage() {
        this.$router.push({ name: "TestList" });
      },

      customSortMethodForProgressColumn,
    },

    mounted() {

      getATAandEqui().then(response => {
        response.forEach(element => {
          var equipments = []
          var details = []

          if(Array.isArray(element.equipments)){
            element.equipments.forEach(equipment => {
              equipments.push(equipment.e_na)
              details.push(equipment.TEST_IN)
            })
          }else{
            equipments.push(element.equipments.e_na)
            details.push(element.equipments.TEST_IN)
          }

          this.rawData.push({
            ataNumber: element.ata,
            systemName: ataNameEnum[element.ata],
            equipmentName: equipments,
            availability: element.avai,
            testDetails: details,
          })
        });

      }).catch(error => {
        console.error('Error in getting ata and equi list:', error);
      });
    },
  }

</script>


<style scoped>

</style>

