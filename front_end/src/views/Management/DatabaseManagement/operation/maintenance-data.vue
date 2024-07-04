<template>
  <div>
    <el-main>
      <el-row style="width: 100%; border:  0.5px solid rgb(111, 111, 111);">
        <el-col :span="12">
          <div class="pl10 pt10 fontbold text-lg"> Selection Data </div>
          <div class="flex justify-end">
            <div class="w-1/2">
              <div v-for="(item, index) in selectionData"
                   :key="index"
                   class="flex justify-between mt1">
                <div>
                  <div class="radio ">
                    <input name="file-import-radio"
                           type="radio"
                           :checked="displaySelected == item" />
                    <label class="font-bold ">{{ item }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <el-row style=" border:  0.5px solid rgb(111, 111, 111);">
            <el-table height="65vh"
                      style="background-color: rgb(45, 45, 45);"
                      :sort-method="customSortMethodForProgressColumn"
                      :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                      :empty-text="'NO DATA DISPLAY'">
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
              <el-table-column label="File Name"
                               :width="null"
                               :min-width="30"></el-table-column>
              <el-table-column label="Flight Leg"
                               :width="null"
                               sortable
                               :min-width="30"></el-table-column>
              <el-table-column label="Time"
                               :width="null"
                               :min-width="35"></el-table-column>
              <el-table-column label="Size"
                               :width="null"
                               :min-width="30"></el-table-column>
              <el-table-column :width="null"
                               :min-width="5"></el-table-column>
            </el-table>
            <div class="
                table-lower-bar">
              <span class="table-lower-bar-left-text">
                <el-tooltip class="item"
                            effect="dark"
                            content="Select All"
                            placement="top">
                </el-tooltip>
                <el-button circle
                           slot="reference"
                           class="table-outer-button"
                           icon="el-icon-circle-plus-outline"></el-button>
                <el-button circle
                           slot="reference"
                           class="table-outer-button"
                           icon="el-icon-delete"></el-button></span> <span class="table-lower-bar-right-text">
                <el-button circle
                           slot="reference"
                           class="table-outer-button"
                           icon="el-icon-remove-outline"></el-button></span>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <div>
        <button @click="printPage"
                class="footer-btn">PRINT</button>
      </div>
      <div>
        <button class="footer-btn">DOWNLOAD</button>
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
      displaySelected: "QAR Data",
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
<style lang="scss"
       scoped>
      .table-footer-btn {
        width: 12vh;
        height: 3vh;
        font-size: 16px;
        font-weight: bold;

        border-radius: 3px;
        border: 1px solid rgb(111, 111, 111);
        box-shadow: 5px 5px 5px 0px rgba(42, 42, 42, 0.5);
        background-color: rgb(65, 65, 65);
        transition: box-shadow 0.3s ease background-color 0.3s ease;
      }
    </style>
