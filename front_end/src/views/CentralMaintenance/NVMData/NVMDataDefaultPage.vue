<template>
  <el-container>
    <el-header height="10vh">
      <el-row style="width: 100%;">
        <el-col :span="5">
          <div class="el-header-title">
            Select Option
          </div>
        </el-col>
        <el-col :span="3">
          <div class="radio" @click="changeRadio('NVMDataRetrieval')">
            <input type="radio"
              name="retrieval-radio"
              :checked="displaySelected == 'NVMDataRetrieval'"
            />
            <span>Retrieval</span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="radio" @click="changeRadio('NVMDataReset')">
            <input type="radio"
              name="reset-radio"
              :checked="displaySelected == 'NVMDataReset'"
            />
            <span>Reset</span>
          </div>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-row :gutter="2">
        <el-col :span="14">
          <el-table
            v-if="displaySelected == 'NVMDataRetrieval'"
            highlight-current-row
            height="65vh"
            style=" background-color: rgb(46, 45, 45)"

            :data="dataForRetrieval"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>
            <el-table-column prop="ata" label="ATA" sortable :width="null" :min-width="15"></el-table-column>
            <el-table-column prop="equipmentName" label="Equiment Name" sortable :width="null" :min-width="35"></el-table-column>
            <el-table-column prop="startTime" label="Start Time" sortable :width="null" :min-width="25"></el-table-column>
            <el-table-column prop="status" label="Status" sortable :width="null" :min-width="20"></el-table-column>
            <el-table-column prop="elapsedTime" label="Elapsed Time" sortable :width="null" :min-width="20"></el-table-column>
            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>

          <el-table
            v-else
            highlight-current-row
            height="65vh"
            style=" background-color: rgb(46, 45, 45)"

            :data="dataForReset"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>
            <el-table-column prop="ata" label="ATA" sortable :width="null" :min-width="15"></el-table-column>
            <el-table-column prop="equipmentName" label="Equiment Name" sortable :width="null" :min-width="35"></el-table-column>
            <el-table-column prop="startTime" label="Start Time" sortable :width="null" :min-width="25"></el-table-column>
            <el-table-column prop="status" label="Status" sortable :width="null" :min-width="20"></el-table-column>
            <el-table-column prop="elapsedTime" label="Elapsed Time" sortable :width="null" :min-width="20"></el-table-column>
            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="10" style="padding-right: 2vh;padding-left: 2vh;">
          <el-card class="custom-card" shadow="hover" style="height: 65vh">
            <div class="custom-header">DETAILS</div>
            <div class="custom-content">
              <div v-for="o in 50" :key="o" class="content-item">
                {{'列表内容 ' + o }}
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <div>
        <el-button class="footer-btn" @click="printPage">PRINT</el-button>
      </div>
      <div>
        <el-button class="footer-btn" @click="goManagementPage()">MANAGE NVM</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>

  import {printPage, customSortMethodForProgressColumn,changeRadio} from '@/utils/utils.js'

  export default {
    name: "DefaultResetPage",
    data() {
      return {

        displaySelected : 'NVMDataRetrieval',

        dataForRetrieval: [{"id":"1","ata":"29","equipmentName":"HLRM A on IMC","startTime":"2023-07-10 10:25:33","status":"Queued","elapsedTime":null,"processPercent":null},
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
                    ],
        dataForReset: [
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
       goManagementPage() {
        this.$router.push({ name: "NVMDataManagement" });
      },
      changeRadio,
      printPage,
      customSortMethodForProgressColumn
    }
  }

</script>

<style scoped>
</style>

