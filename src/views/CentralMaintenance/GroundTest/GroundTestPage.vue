<template>
  <el-container style="display: flex; flex-direction: column;">
    <el-header style="text-align: left; font-weight: bold; color: white; text-shadow: 2px 2px 2px #000;
      padding-top: 3vh; padding-left: 4vh; font-size: 16px;">
      Test Status: {{ selectedRowStatus }}
    </el-header>
    <el-main style="height:62vh; flex: 1; padding: 0;">
      <el-table
        height="62vh"
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
    <el-footer height="10vh" style="border: none; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <el-button class="footer-btn" @click="printPage">PRINT</el-button>
      </div>
      <div>
          <el-button class="footer-btn" @click="switchCurve(1)">VIEW DETAIL</el-button>
          <el-button class="footer-btn" @click="turnToInteractive()" :disabled="!IsRespondable" :style="{'background-image': !IsRespondable ? 'linear-gradient(rgb(128, 127, 127), rgb(200, 200, 200))' : 'linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127))' }">RESPOND</el-button>
          <el-button class="footer-btn" @click="switchCurve(11)">NEW TEST</el-button>
          <el-button class="footer-btn" @click="sendAbort()" :disabled="!IsAbortable" :style="{'background-image': !IsAbortable ? 'linear-gradient(rgb(128, 127, 127), rgb(200, 200, 200))' : 'linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127))' }">ABORT TEST</el-button>
          <el-button class="footer-btn" @click="sendAbortAll()">ABORT ALL</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        tableData : [
        ],
        selectedRowStatus: ''
      }
    },
    methods: {
    }
  }

</script>

<style scoped>

</style>

