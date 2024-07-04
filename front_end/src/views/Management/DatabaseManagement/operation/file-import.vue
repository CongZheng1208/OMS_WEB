<template>
  <div>
    <el-main>
      <el-row style="width: 100%; border:  0.5px solid rgb(111, 111, 111);">
        <el-col :span="12">
          <div class="flex justify-between"
               style="height:10vh">
            <div class="w-1/3 pt-5 flex pl-5">
              <div class="font-bold text-lg"> Section Option </div>
            </div>
            <div class="w-1/3">
              <div class="radio">
                <input name="file-import-radio"
                       type="radio"
                       :checked="displaySelected == 'fileImport'" />
                <label class="font-bold ">Field Loadable Software</label>
              </div>
              <div class="radio">
                <input name="file-import-radio"
                       type="radio"
                       :checked="displaySelected == 'avaliableFLS'" />
                <label class="font-bold ">Config File</label>
              </div>
            </div>
          </div>
          <div class="pl5 pt1 fontbold text-lg"> Selection File Location </div>
          <div class="pl5 pt10 flex items-center text-lg font-bold">
            <div class="pr3">Location:</div>
            <div class="flex-1 flex">
              <input type="text "
                     class="p2 rounded border-2 border-white bg-black flex-1"
                     placeholder="Location" />
            </div>
            <button class="ml5 rounded px2 py1 mr3 text-lg border jianbian">Select File</button>
          </div>
          <div style="padding-left:1vh;padding-right:1vh;">
            <el-row style="margin-top: 1vh; border:  0.5px solid rgb(111, 111, 111);">
              <el-table height="43vh"
                        style="background-color: rgb(45, 45, 45);"
                        :sort-method="customSortMethodForProgressColumn"
                        :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                        :empty-text="'NO DATA DISPLAY'">
                <el-table-column :width="null"
                                 :min-width="5"></el-table-column>
                <el-table-column label="Upload File"
                                 :width="null"
                                 :min-width="30"></el-table-column>
                <el-table-column label="Part Number"
                                 :width="null"
                                 :min-width="30"></el-table-column>
                <el-table-column label="Upload Duration"
                                 :width="null"
                                 :min-width="35"></el-table-column>
                <el-table-column :width="null"
                                 :min-width="5"></el-table-column>
              </el-table>
              <div class="
                table-lower-bar">
                <span class="table-lower-bar-left-note"> </span> <span class="table-lower-bar-right-text"> <el-button
                             circle
                             slot="reference"
                             class="table-outer-button"
                             icon="el-icon-refresh"></el-button></span>
              </div>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <el-row style=" border:  0.5px solid rgb(111, 111, 111);">
              <el-table height="65vh"
                        style="background-color: rgb(45, 45, 45);"
                        :sort-method="customSortMethodForProgressColumn"
                        :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                        :empty-text="'NO DATA DISPLAY'">
                <el-table-column :width="null"
                                 :min-width="5"></el-table-column>
                <el-table-column label="Upload File"
                                 :width="null"
                                 :min-width="30"></el-table-column>
                <el-table-column label="Upload Status"
                                 :width="null"
                                 :min-width="30"></el-table-column>
                <el-table-column label="Upload Start"
                                 :width="null"
                                 :min-width="35"></el-table-column>
                <el-table-column label="Part Number"
                                 :width="null"
                                 :min-width="30"></el-table-column>
                <el-table-column :width="null"
                                 :min-width="5"></el-table-column>
              </el-table>
              <div class="
                table-lower-bar">
                <span class="table-lower-bar-left-note"> </span> <span class="table-lower-bar-right-text"> <el-button
                             circle
                             slot="reference"
                             class="table-outer-button"
                             icon="el-icon-refresh"></el-button> Number of Records: {{ }}</span>
              </div>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <div>
        <button @click="printPage()"
                class="footer-btn">PRINT</button>
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">
import { printPage, customSortMethodForProgressColumn, changeRadio } from '@/utils/utils'
export default {
  name: "fileImport",
  components: {
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
    printPage,
    customSortMethodForProgressColumn,
    changeRadio

  },
  created() {
  },
}
</script>
