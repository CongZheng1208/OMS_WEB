<template>
  <div>
    <el-header height="12vh">
      <el-row style="width: 100%;">
        <el-col :span="3">
          <div class="el-header-title"> Selection: </div>
        </el-col>
        <el-col :span="10">
          <div class="el-header-subtitle">
            <li>ATA: {{ }} </li>
            <li>Equipment Name: {{ }} </li>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="2">
        <el-col :span="12">
          <div
               style="  height: 32vh; border: 1px solid #ccc; padding: 4vh; border: 1px solid rgb(111, 111, 111); border-radius: 0.5vh; margin-left: 0.5vh; margin-top: 0.5vh;">
            <div class="div-title"> Hardware Information </div>
            <!-- <div class="div-content-item ">
              <li style="padding: 1vh">Part Number: {{ }}</li>
              <li style="padding: 1vh">Part Description: {{ }}</li>
              <li style="padding: 1vh">Serial Number: {{ }}</li>
              <li style="padding: 1vh">Modification Status: {{ }}</li>
            </div> -->
            <template>
              <div>
                <!-- <div v-for="item in stringArray"
                     :key="item.Name"
                     :style="{ background: item.highlight ? 'yellow' : 'none' }">
                  <p>{{ item["Part Number"] }}</p>
                  <p>{{ item["Part Description"] }}</p>
                </div> -->
              </div>
            </template>
          </div>
          <div
               style="  height: 20vh; border: 1px solid #ccc; padding: 4vh; border: 1px solid rgb(111, 111, 111); border-radius: 0.5vh; margin-left: 0.5vh; margin-top: 0.5vh;">
            <div class="div-title"> Additional Information </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div
               style=" height: 61vh; border: 1px solid #ccc; padding: 4vh; border: 1px solid rgb(111, 111, 111); border-radius: 0.5vh;  margin-right: 0.5vh; margin-top: 0.5vh;">
            <div class="div-title"> Software Information </div>
            <div class="div-content-item ">
              <li style="padding: 1vh">Location ID: {{ }}</li>
              <li style="padding: 1vh">Location Description: {{ }}</li>
            </div>
            <div class="div-title"> Software Part Data Item 1: </div>
            <div class="div-content-item ">
              <li style="padding: 1vh">Part Number: {{ }}</li>
              <li style="padding: 1vh">Part Description: {{ }}</li>
            </div>
            <div class="div-title"> Software Part Data Item 2: </div>
            <div class="div-content-item ">
              <li style="padding: 1vh">Part Number: {{ }}</li>
              <li style="padding: 1vh">Part Description: {{ }}</li>
            </div>
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
<script>
import { printPage, customSortMethodForProgressColumn, handleTestOrder } from '@/utils/utils.js'
import { postConfigData } from '@/services/centralMaintenance/configuration/index.js';
import qs from 'qs'

export default {
  name: "ConfigurationDisplay",
  data() {
    return {
      // stringArray: [
      //   {
      //     "Part Number": "111abc",
      //     "Part Description": "general processing module 111",
      //     "Name": "LRU1",
      //     "Serial Number": "COMMAND_661",
      //     "Modification Status": "Modified",
      //     "LIN": "XYZ333"
      //   },
      //   {
      //     "Part Number": "222efg",
      //     "Part Description": "general processing module 222",
      //     "Name": "LRU2",
      //     "Serial Number": "COMMAND_664",
      //     "Modification Status": "Not Modified",
      //     "LIN": "EFG222"
      //   }
      // ]
    };
  },
  mounted() {
    console.log("this.$route.params", this.$route.params.selectedEqui)


    let tmp = qs.stringify({
      ATA: this.$route.params.selectedEqui.ATA,
      equipmentName: this.$route.params.selectedEqui.equipmentName
    })

    setInterval(() => {
      postConfigData(tmp).then(response => {
        console.log(response)
      }).catch(error => {
        console.error('Error in Postting pdf url:', error);
      });
    }, 1000);
  },
  methods: {
    /**
     * 本函数用于跳转页面
     */
    goSelectionPage() {
      this.$router.push({ name: "ConfigurationSelection" });
    },
    printPage,
    handleTestOrder,
    customSortMethodForProgressColumn
  }
}

</script>
<style scoped></style>
