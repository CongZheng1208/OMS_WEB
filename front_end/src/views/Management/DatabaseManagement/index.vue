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
              <input name="dataload-select-radio"
                     type="radio"
                     :checked="selectedOption == 'fileImport'" />
              <label class="cursor-pointer">File Import</label>
            </div>
            <div @click="changeRadio('avaliableFLS')"
                 class="radio">
              <input name="dataload-select-radio"
                     type="radio"
                     :checked="selectedOption == 'avaliableFLS'" />
              <label class="cursor-pointer">Avaliable FLS</label>
            </div>
          </div>
        </el-col>
        <el-col :span="13">
          <div class="el-header-radios">
            <div @click="changeRadio('BatchPartSelection')"
                 class="radio">
              <input name="dataload-select-radio"
                     type="radio"
                     :checked="selectedOption == 'BatchPartSelection'" />
              <label class="cursor-pointer">Maintenance Data</label>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <router-view></router-view>
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

import Clock from '@/components/Clock/index.vue'
import { printPage, customSortMethodForProgressColumn } from '@/utils/utils'
export default {
  name: "DatabaseManagement",
  components: {
    Clock
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
    customSortMethodForProgressColumn
  },
  created() {
  },
  mounted() {
    this.$router.push({ name: 'fileImport' })
  },
}
</script>
<style lang="scss"
       scoped>
      .min-max {
        background-color: black;
        /* 设置背景颜色为黑色 */
        border: 2px solid white;
        /* 设置边框为2像素的白色实线 */
        color: white;
        /* 设置输入文字颜色为白色 */
      }

      .jianbian {
        font-weight: bold;
        background-image: linear-gradient(white, black);
        color: white;
        /* 设置按钮文字颜色为白色以确保可读性 */
        padding: 10px;
        /* p2 类可能意味着 padding，这里确保样式的一致性 */
        font-size: large;
        /* text-lg 类可能意味着大号文字，这里使用 CSS 的 large 值 */
        border-radius: 10px;
        /* rounded-xl 类可能意味着较大的圆角，这里假设为 10px */
        border: 1px solid black;
        /* border 类可能意味着有边框，这里添加一个黑色边框 */
      }
    </style>
