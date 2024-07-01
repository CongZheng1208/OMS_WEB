<template>
  <div v-loading="loading"
       element-loading-text="Data Loading..."
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.5)">
    <el-header height="8vh">
      <el-row style="width: 100%;">
        <el-col :span="3">
          <div class="el-header-title"> Selection: </div>
        </el-col>
        <el-col :span="10">
          <div class="el-header-subtitle">
            <div> ATA: {{ currentATA }} </div>
            <div> Equipment Name: {{ currentEquipmentName }} </div>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="2">
        <el-col :span="12">
          <div
               style=" overflow: auto; height: 32vh; max-height: 32vh; border: 1px solid #ccc; padding: 4vh; border: 1px solid rgb(111, 111, 111); border-radius: 0.5vh; margin-left: 0.5vh; margin-top: 0.5vh;">
            <div class="div-title"
                 style=" position: sticky;top: 0;"> Hardware Information</div>
            <div v-if="currentHardwareInformation.length === 0"
                 class="content-alert"> No Alive Data </div>
            <div v-else
                 class="div-content-item"
                 v-for="(item, index) in currentHardwareInformation"
                 :key="item.Part">
              <p :style="{ backgroundColor: item['PN_changed'] == 1 ? '#666666' : 'transparent' }">Part Number:
                {{ item['Part Number'] }}<span v-if="isStared == 1"> *</span> </p>
              <p :style="{ backgroundColor: item['PD_changed'] == 1 ? '#666666' : 'transparent' }">Part Description:
                {{ item['Part Description'] }}</p>
              <p :style="{ backgroundColor: item['SN_changed'] == 1 ? '#666666' : 'transparent' }">Serial Number:
                {{ item['Serial Number'] }}</p>
              <p :style="{ backgroundColor: item['MS_changed'] == 1 ? '#666666' : 'transparent' }">Modification Status:
                {{ item['Modification Status'] }}</p>
              <p :style="{ backgroundColor: item['LIN_changed'] == 1 ? '#666666' : 'transparent' }"> LIN:
                {{ item['LIN'] }}</p>
            </div>
          </div>
          <div
               style="  height: 20vh; border: 1px solid #ccc; padding: 4vh; border: 1px solid rgb(111, 111, 111); border-radius: 0.5vh; margin-left: 0.5vh; margin-top: 0.5vh;">
            <div class="div-title"> Additional Information </div>
            <div v-if="currentAdditionalInformation.length === 0"
                 class="content-alert"> No Alive Data </div>
            <div v-else
                 class="div-content-item"
                 v-for="(item, index) in currentAdditionalInformation"> {{ item }} </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div
               style=" overflow: scroll; height: 61vh; max-height: 61vh; border: 1px solid #ccc; padding: 4vh; border: 1px solid rgb(111, 111, 111); border-radius: 0.5vh; margin-top: 0.5vh;">
            <div class="div-title"
                 style=" position: sticky;top: 0;"> Software Information </div>
            <div v-if="currentSoftwareInformation.length === 0"
                 class="content-alert"> No Alive Data </div>
            <div v-else
                 class="div-content-item"
                 v-for="entry in currentSoftwareInformation"
                 :key="entry.LocationID">
              <p :style="{ backgroundColor: entry['LIN_changed'] == 1 ? '#666666' : 'transparent' }">Location ID:
                {{ entry['Location ID'] }}</p>
              <p :style="{ backgroundColor: entry['LD_changed'] == 1 ? '#666666' : 'transparent' }">Location
                Description: {{ entry['Location Description'] }}</p>
              <ul>
                <div v-for="softwarePart in entry['Software Part Data']"
                     :key="softwarePart.Part">
                  <p style="padding-top: 1vh; font-weight: bold;"> Software Part Data Item: </p>
                  <p :style="{ backgroundColor: softwarePart['PN_changed'] == 1 ? '#666666' : 'transparent' }"> Part
                    Number: {{ softwarePart['Part Number'] }}<span v-if="isStared == 1"> *</span> </p>
                  <p :style="{ backgroundColor: softwarePart['PD_changed'] == 1 ? '#666666' : 'transparent' }"> Part
                    Description: {{ softwarePart['Part Description'] }}</p>
                  <p :style="{ backgroundColor: softwarePart['LIN_changed'] == 1 ? '#666666' : 'transparent' }"> LIN:
                    {{ softwarePart['LIN'] }}</p>
                </div>
              </ul>
            </div>
            <span v-if="isStared == 1"
                  class="config-note"> *: The information displayed is not up-to-date since the latest power-up.</span>
          </div>
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
                @click="goSelectionPage()">BACK</button>
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">
import { printPage, customSortMethodForProgressColumn, handleTestOrder } from '@/utils/utils'
import { postConfigData } from '@/services/centralMaintenance/configuration/index.js';
import qs from 'qs'

export default {
  name: "ConfigurationDisplay",
  data() {
    return {
      currentATA: "",
      currentEquipmentName: "",
      currentHardwareInformation: {},
      currentSoftwareInformation: {},
      currentAdditionalInformation: "",

      refreshInterval: null,

      isStared: 0,
      fullscreenLoading: false,
      loading: true,
    };
  },
  mounted() {
    let tmp = qs.stringify({
      ATA: this.$route.params.selectedEqui.ATA,
      equipmentName: this.$route.params.selectedEqui.equipmentName
    })

    this.currentATA = this.$route.params.selectedEqui.ata
    this.currentEquipmentName = this.$route.params.selectedEqui.equipmentName


    this.refreshInterval = setInterval(() => {


      postConfigData(tmp).then(response => {
        if (response.hardwareInformation.trim().length === 0) {
          this.currentHardwareInformation = []
        } else {
          this.currentHardwareInformation = JSON.parse(response.hardwareInformation)
        }

        if (response.softwareInformation.trim().length === 0) {
          this.currentSoftwareInformation = []
        } else {
          this.currentSoftwareInformation = JSON.parse(response.softwareInformation)
        }

        if (response.additionalInformation.trim().length === 0 || response.additionalInformation === "[]") {
          this.currentAdditionalInformation = ""
        } else {
          this.currentAdditionalInformation = JSON.parse(response.additionalInformation)
        }
        this.isStared = response.isStarShowed
        console.log("isStared", this.isStared)

      }).catch(error => {
        console.error('Error in Postting pdf url:', error);
      });




    }, 1000)






    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    /* *
      * 本函数用于跳转页面
      */
    goSelectionPage() {
      this.$router.push({ name: "ConfigurationSelection" });
    },
    printPage,
    handleTestOrder,
    customSortMethodForProgressColumn
  },
  beforeDestroy() {
    clearInterval(this.refreshInterval)
  },
}

</script>
<style scoped></style>
