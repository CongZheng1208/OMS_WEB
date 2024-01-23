<template>
  <el-container>
    <el-header>
      <div class="el-header-title">
        ATA and Equipment Selection
      </div>
    </el-header>
    <el-main>

      <el-button type="text" @click="isEquiSelected = true">点击打开 Dialog</el-button>

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
        :visible.sync="isEquiSelected"
        width="30%">
        <span>Please select a equipment!</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="isEquiSelected = false"> OK </el-button>
        </span>
      </el-dialog>

    </el-main>
    <el-footer>
      <div>
      </div>
      <div>
          <el-button class="footer-btn" @click="goDefaultPage()">BACK</el-button>
          <el-button class="footer-btn" @click="goSelectTestPage()">SELECT</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>

  import CentralMaintenceHttp from '../../../api/CentralMaintenceHttp.js'

  export default {
    data() {
      return {
        ataNameDict : {
          '21': 'Air Conditioning',
          '22': 'Auto Flight',
          '23': 'Communications',
          '24': 'Electrical Power',
          '25': 'Equipment/Furnishings',
          '26': 'Fire Protection',
          '27': 'Flight Controls',
          '28': 'Fuel',
          '73': 'Engine Fuel and Control',
          '32': 'Landing Gear',
          '45': 'Central Maintenance System',
          '42': 'Integranted Module Avionics',
          '34': 'Navigation',
          '49': 'Airborne Auxiliary Power',
          '29': 'Hydraulic Power',
          '71': 'Power Plant',
          '30': 'Ice and Rain Protection',
          '31': 'Indications/Recording',
          '38': 'WWS',
          '47': 'Inert Gas System',
          '52': 'Doors'
        },
        rawData: [],
        selectedATANum: "",
        selectedEquipment: {},
        selectedEquipments: [],

        isEquiSelected: false
      }
    },
    methods: {


      /**
       * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
       * @param {string} row - rawData数据的ataNumber属性
       */
      handleRowClick(row) {
        this.selectedATANum = row.ataNumber;

        var selectedData = this.getSelectedData(this.selectedATANum)
        console.log(selectedData)


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
        console.log(this.selectedEquipments)
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
       * 本函数用于根据排序对象确定排序逻辑
       * @param {number/string} a - 排序对象1
       * @param {number/string} b - 排序对象2
       * @returns {number/string} 排序逻辑
       */
      customSortMethodForProgressColumn(a, b) {
        // 判断a和b的类型
        if (typeof a === 'string' && typeof b === 'string') {
          // 字符串类型，使用localeCompare进行字典序排序
          return a.localeCompare(b);
        } else {
          // 数字类型，根据数值大小排序
          return a - b;
        }
      },

      /**
       * 本函数用于跳转页面
       */
       goSelectTestPage() {
        console.log("test")
        console.log(this.selectedEquipment)
        console.log(this.selectedEquipment == {})

        if(this.selectedEquipment){
          this.$router.push({ name: "SelectTest", params: { selectedEquipment: this.selectedEquipment } });
        }else{
          this.isEquiSelected = true
        }
      },

      /**
       * 本函数用于跳转页面
       */
       goDefaultPage() {
        this.$router.push({ name: "TestList" });
      }
    },

    mounted() {
      CentralMaintenceHttp.get('centralMaintenance/groundTest/gt_ata_equi.php')
        .then(response => {
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
              systemName: this.ataNameDict[element.ata],
              equipmentName: equipments,
              availability: element.avai,
              testDetails: details,
            })
          });
        })
        .catch(error => {
          console.error(error); // 处理请求错误
        }
      );

      console.log(this.rawData)
    },
  }

</script>


<style scoped>

</style>

