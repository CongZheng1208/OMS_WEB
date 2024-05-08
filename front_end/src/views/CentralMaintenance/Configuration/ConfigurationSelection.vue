<template>
  <div style="background-color: rgb(45, 45, 45);">
    <el-header height="10vh">
      <el-row style="width: 100%;">
        <el-col :span="10">
          <div class="el-header-title">
            ATA and Equipment Selection
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-row :gutter="2">
        <el-col :span="12">
          <el-table
            highlight-current-row
            height="70vh"
            style=" background-color: rgb(46, 45, 45)"

            :data="dataForRetrieval"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>
            <el-table-column prop="ata" label="ATA" sortable :width="null" :min-width="15"></el-table-column>
            <el-table-column prop="equipmentName" label="System Name" sortable :width="null" :min-width="35"></el-table-column>
            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table
            highlight-current-row
            height="70vh"
            style=" background-color: rgb(46, 45, 45)"

            :data="dataForReset"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>
            <el-table-column prop="equipmentName" label="Equiment Name" sortable :width="null" :min-width="35"></el-table-column>
            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <div>
        <button class="footer-btn" @click="printPage">PRINT</button>
      </div>
      <div>
        <button class="footer-btn" @click="goDisplayPage()">SELECT</button>
      </div>
    </el-footer>
  </div>
</template>

<script>
  import {printPage, customSortMethodForProgressColumn, handleTestOrder} from '@/utils/utils.js'

  export default {
    name: "ConfigurationDisplay",
    data() {
      return {



        dataForRetrieval: [
                      {"id":"6","ata":"27","equipmentName":"HF_FCM_2","startTime":"2023-07-11 10:25:33","status":"Queued","elapsedTime":null,"processPercent":null},
                      {"id":"7","ata":"27","equipmentName":"HLRM B on IMC","startTime":"2023-07-13 10:17:29","status":"In Progress","elapsedTime":"00:05:51","processPercent":"87"},
                      {"id":"8","ata":"38","equipmentName":"WWS","startTime":"2023-07-15 09:55:11","status":"Error","elapsedTime":"00:03:25","processPercent":null},
                      {"id":"9","ata":"42","equipmentName":"GPM L1","startTime":"2023-07-09 09:52:06","status":"Completed","elapsedTime":"00:06:12","processPercent":null},
                      {"id":"10","ata":"42","equipmentName":"GPM R1","startTime":"2023-04-20 09:43:10","status":"Completed","elapsedTime":"00:03:07","processPercent":null},
                      {"id":"11","ata":"47","equipmentName":"FTIS LRM on IMC","startTime":"2023-05-13 10:25:33","status":"Queued","elapsedTime":null,"processPercent":null},
                    ],
        dataForReset: [{"id":"1","ata":"29","equipmentName":"HLRM A on IMC","startTime":"2023-07-10 10:25:33","status":"Queued","elapsedTime":null,"processPercent":null},
                      {"id":"2","ata":"29","equipmentName":"HLRM B on IMC","startTime":"2023-07-10 10:17:29","status":"In Progress","elapsedTime":"00:05:51","processPercent":"87"},
                      {"id":"3","ata":"31","equipmentName":"HF_FWDEAFR","startTime":"2023-07-10 09:55:11","status":"Error","elapsedTime":"00:03:25","processPercent":null},
                      {"id":"4","ata":"27","equipmentName":"HF_FSECU_1","startTime":"2023-07-10 09:52:06","status":"Completed","elapsedTime":"00:06:12","processPercent":null},
                      {"id":"5","ata":"27","equipmentName":"HF-FCM-1","startTime":"2023-07-10 09:43:10","status":"Completed","elapsedTime":"00:03:07","processPercent":null},
                      {"id":"6","ata":"27","equipmentName":"HF_FCM_2","startTime":"2023-07-11 10:25:33","status":"Queued","elapsedTime":null,"processPercent":null},
                      {"id":"7","ata":"27","equipmentName":"HLRM B on IMC","startTime":"2023-07-13 10:17:29","status":"In Progress","elapsedTime":"00:05:51","processPercent":"87"},
                      {"id":"8","ata":"38","equipmentName":"WWS","startTime":"2023-07-15 09:55:11","status":"Error","elapsedTime":"00:03:25","processPercent":null},
                      {"id":"9","ata":"42","equipmentName":"GPM L1","startTime":"2023-07-09 09:52:06","status":"Completed","elapsedTime":"00:06:12","processPercent":null},
                      {"id":"10","ata":"42","equipmentName":"GPM R1","startTime":"2023-04-20 09:43:10","status":"Completed","elapsedTime":"00:03:07","processPercent":null},
                      {"id":"11","ata":"47","equipmentName":"FTIS LRM on IMC","startTime":"2023-05-13 10:25:33","status":"Queued","elapsedTime":null,"processPercent":null},
                      {"id":"12","ata":"38","equipmentName":"WWS","startTime":"2023-07-15 09:55:11","status":"Error","elapsedTime":"00:03:25","processPercent":null},
                      {"id":"13","ata":"42","equipmentName":"GPM L1","startTime":"2023-07-09 09:52:06","status":"Completed","elapsedTime":"00:06:12","processPercent":null},
                      {"id":"14","ata":"42","equipmentName":"GPM R1","startTime":"2023-04-20 09:43:10","status":"Completed","elapsedTime":"00:03:07","processPercent":null},
                      {"id":"15","ata":"47","equipmentName":"FTIS LRM on IMC","startTime":"2023-05-13 10:25:33","status":"Queued","elapsedTime":null,"processPercent":null},
                    ],
      };
    },
    methods: {
      /**
       * 本函数用于跳转页面
       */
       goDisplayPage() {
        this.$router.push({ name: "ConfigurationDisplay" });
      },
      printPage,
      handleTestOrder,
      customSortMethodForProgressColumn
    }
  }

</script>

<style scoped>
</style>

