<template>
  <el-container style="display: flex; flex-direction: column;">


    <el-header style="text-align: left; font-weight: bold; color: white; text-shadow: 2px 2px 2px #000;
      padding-top: 3vh; padding-left: 4vh; font-size: 16px;">
      Test Status: {{ selectedRowStatus }}
    </el-header>
    <el-main style=" flex: 1; padding: 0;">
      <el-table
        highlight-current-row
        style="width: 100%; background-color: rgb(46, 45, 45)"
        @row-click="handleRowClick"
        :data="tableData"
        :sort-method="customSortMethodForProgressColumn"
        :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
        :empty-text="'No Data Display'"
      >
        <el-table-column :width="null" :min-width="5"></el-table-column>
        <el-table-column prop="ATA" label="ATA" sortable :width="null" :min-width="50"></el-table-column>
        <el-table-column prop="equiName" label="Equipment Name" sortable :width="null" :min-width="100"></el-table-column>
        <el-table-column prop="testName" label="Test Name" sortable :width="null" :min-width="200"></el-table-column>
        <el-table-column prop="startTime" label="Start Time" sortable :width="null" :min-width="90"></el-table-column>
        <el-table-column prop="status" label="Status" sortable :width="null" :min-width="50"></el-table-column>
        <el-table-column prop="progress" label="Progress" sortable :width="null" :min-width="100" >
          <template slot-scope="scope">
            <el-progress
              :percentage="scope.row.progress"
              :color="getProgressColor(scope.row.progress)"
              :format="percent => `${percent}%`"
            >
            </el-progress>
          </template>
        </el-table-column>
        <el-table-column :width="null" :min-width="5"></el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <div>
        <el-button class="footer-btn" @click="printPage">PRINT</el-button>
      </div>
      <div>
          <!-- <el-button class="footer-btn" @click="switchCurve(1)">VIEW DETAIL</el-button>
          <el-button class="footer-btn" @click="turnToInteractive()" :disabled="!IsRespondable" :style="{'background-image': !IsRespondable ? 'linear-gradient(rgb(128, 127, 127), rgb(200, 200, 200))' : 'linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127))' }">RESPOND</el-button>
          <el-button class="footer-btn" @click="goPage()">NEW TEST</el-button>
          <el-button class="footer-btn" @click="sendAbort()" :disabled="!IsAbortable" :style="{'background-image': !IsAbortable ? 'linear-gradient(rgb(128, 127, 127), rgb(200, 200, 200))' : 'linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127))' }">ABORT TEST</el-button>
          <el-button class="footer-btn" @click="sendAbortAll()">ABORT ALL</el-button> -->
          <el-button class="footer-btn" >VIEW DETAIL</el-button>
          <el-button class="footer-btn" :disabled="true">RESPOND</el-button>
          <el-button class="footer-btn" @click="goSelectATAandEquipmentPage()">NEW TEST</el-button>
          <el-button class="footer-btn" :disabled="true">ABORT TEST</el-button>
          <el-button class="footer-btn" >ABORT ALL</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
  // 在需要使用公用函数的组件中
  // import { printPage, customSortMethodForProgressColumn } from '../../../utils/utils.js';
  export default {
    data() {
      return {
        tableData : [
          {
            ATA: '29',
            equiName: 'HLRM A on IMC',
            testName: 'Replace Hyd Pump 1B Case Drain Filter',
            startTime: '2024-01-04 13:37:21',
            status: 'In Process',
            progress: 69
          },
          {
            ATA: '45',
            equiName: 'Landing Gear',
            testName: 'Check Landing Gear Alignment',
            startTime: '2024-01-04 14:18:36',
            status: 'Completed',
            progress: 100
          },
          {
            ATA: '56',
            equiName: 'Engine A',
            testName: 'Check Fuel Injection System',
            startTime: '2024-01-05 09:45:12',
            status: 'In Process',
            progress: 50
          },
          {
            ATA: '72',
            equiName: 'APU',
            testName: 'Inspect APU Bleed Air System',
            startTime: '2024-01-06 11:20:00',
            status: 'Pending',
            progress: 20
          },
          {
            ATA: '33',
            equiName: 'Avionics Bay',
            testName: 'Calibrate Flight Management System',
            startTime: '2024-01-07 15:30:45',
            status: 'In Process',
            progress: 75
          },
          {
            ATA: '76',
            equiName: 'Aircraft Exterior',
            testName: 'Inspect Wing Flaps',
            startTime: '2024-01-08 08:40:00',
            status: 'Scheduled',
            progress: 10
          },
          {
            ATA: '72',
            equiName: 'APU',
            testName: 'Inspect APU Bleed Air System',
            startTime: '2024-01-06 11:20:00',
            status: 'Pending',
            progress: 20
          },
          {
            ATA: '33',
            equiName: 'Avionics Bay',
            testName: 'Calibrate Flight Management System',
            startTime: '2024-01-07 15:30:45',
            status: 'In Process',
            progress: 75
          },
          {
            ATA: '76',
            equiName: 'Aircraft Exterior',
            testName: 'Inspect Wing Flaps',
            startTime: '2024-01-08 08:40:00',
            status: 'Scheduled',
            progress: 10
          },
          {
            ATA: '21',
            equiName: 'Cockpit',
            testName: 'Test Autopilot System',
            startTime: '2024-01-09 10:20:00',
            status: 'In Process',
            progress: 40
          },
          {
            ATA: '35',
            equiName: 'Hydraulic System',
            testName: 'Replace Hydraulic Hose 4B',
            startTime: '2024-01-10 13:10:00',
            status: 'Scheduled',
            progress: 5
          },
          {
            ATA: '51',
            equiName: 'Engine B',
            testName: 'Check Engine Oil Level',
            startTime: '2024-01-11 14:55:00',
            status: 'In Process',
            progress: 60
          },
                    {
            ATA: '21',
            equiName: 'Cockpit',
            testName: 'Test Autopilot System',
            startTime: '2024-01-09 10:20:00',
            status: 'In Process',
            progress: 40
          },
          {
            ATA: '35',
            equiName: 'Hydraulic System',
            testName: 'Replace Hydraulic Hose 4B',
            startTime: '2024-01-10 13:10:00',
            status: 'Scheduled',
            progress: 5
          },
          {
            ATA: '51',
            equiName: 'Engine B',
            testName: 'Check Engine Oil Level',
            startTime: '2024-01-11 14:55:00',
            status: 'In Process',
            progress: 60
          },
          {
            ATA: '67',
            equiName: 'Wheels and Brakes',
            testName: 'Inspect Brake Pads and Discs',
            startTime: '2024-01-12 16:30:00',
            status: 'Pending',
            progress: 30
          }
        ],
        selectedRowStatus: ''
      }
    },
    methods: {

      /**
       * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
       * @param {string} row - menus数据的name属性
       */
      handleRowClick(row) {
        this.selectedRowStatus = row.status;
      },

      /**
       * 本函数用于返回进度对应的进度条颜色
       * @param {number} progress - 进度值
       * @returns {number} 该进度值对应的颜色rgb值
       */
      getProgressColor(progress) {
        if (progress < 20) {
          return '#ff4500';
        } else if (progress >= 20 && progress < 40) {
          return '#ffd700';
        } else if (progress >= 40 && progress < 100) {
          return '#00ced1';
        } else {
          return '#51cef1';
        }
      },


      /**
       * 本函数用于打印页面
       */
      printPage() {
        window.print();
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
      goSelectATAandEquipmentPage() {
        this.$router.push({ name: "GroundTestSelectATAandEquipmentPage" });
      }
    }
  }

</script>

<style scoped>

</style>

