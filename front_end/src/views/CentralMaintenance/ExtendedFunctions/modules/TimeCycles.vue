<template>
  <div>
    <el-row>
      <div class="el-subheader">
        Time Cycle Status: Time Cycle Process in Progress
      </div>
    </el-row>

    <el-table
      highlight-current-row
      height="62vh"
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

      </el-table-column>
      <el-table-column :width="null" :min-width="5"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { customSortMethodForProgressColumn } from '@/utils/utils.js'
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
        ]
      };
    },
    methods: {
      customSortMethodForProgressColumn
    }
}
</script>
<style lang="">

</style>
