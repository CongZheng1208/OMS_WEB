<template>
  <div>
    <el-header style="height: 9vh;">
      <el-row style="width: 100%">
        <el-col :span="3">
          <div class="el-header-title"> Select Option </div>
        </el-col>
        <el-col :span="5">
          <div class="el-header-radios">
            <div @click="changeRadio('fileImport')"
                 class="radio ">
              <input name="database-management-radio"
                     type="radio"
                     :checked="displaySelected == 'fileImport'" />
              <label class="cursor-pointer">File Import</label>
            </div>
            <div @click="changeRadio('avaliableFls')"
                 class="radio">
              <input name="database-management-radio"
                     type="radio"
                     :checked="displaySelected == 'avaliableFls'" />
              <label class="cursor-pointer">Avaliable FLS</label>
            </div>
          </div>
        </el-col>
        <el-col :span="13">
          <div class="el-header-radios">
            <div @click="changeRadio('maintenanceData')"
                 class="radio">
              <input name="database-management-radio"
                     type="radio"
                     :checked="displaySelected == 'maintenanceData'" />
              <label class="cursor-pointer">Maintenance Data</label>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <FileImport v-if="displaySelected == 'fileImport'"></FileImport>
    <AvaliableFls v-if="displaySelected == 'avaliableFls'"></AvaliableFls>
    <MaintenanceData v-if="displaySelected == 'maintenanceData'"></MaintenanceData>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script lang="ts">
import FileImport from './operation/file-import.vue'
import AvaliableFls from './operation/avaliable-fls.vue'
import MaintenanceData from './operation/maintenance-data.vue'
import Clock from '@/components/Clock/index.vue'
import { printPage, customSortMethodForProgressColumn, changeRadio } from '@/utils/utils'
export default {
  name: "DatabaseManagement",
  components: {
    Clock,
    FileImport,
    AvaliableFls,
    MaintenanceData
  },
  data() {
    return {
      displaySelected: 'fileImport',
      selectionData: [
        "QAR Data",
        "Events",
        "Equipment Configuration",
        "Failure History Files",
        "Data Load Status File",
        "ACARS Report Files"
      ]
    }
  },
  methods: {
    changeRadio,
    printPage,
    customSortMethodForProgressColumn
  },
  created() {
  },
  mounted() {
    this.$router.push({ name: 'fileImport' })
  },
}
</script>
