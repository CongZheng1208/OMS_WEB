<template>
  <div class="bg-[rgb(45, 45, 45)]">
    <el-main>
      <el-col :span="10"
              style="border:  0.5px solid rgb(111, 111, 111);">
        <el-table highlight-current-row
                  style="width: 100%;background-color: rgb(46, 45, 45)"
                  :sort-method="customSortMethodForProgressColumn"
                  :header-cell-style="{
        background: '#404040',
        color: '#FFFFFF',
        font: '14px'
      }"
                  height="70vh"
                  :empty-text="'NO DATA DISPLAY'">
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
          <el-table-column label="Batch Part Number"
                           :width="null"
                           sortable
                           :min-width="50">
          </el-table-column>
          <el-table-column label="Description"
                           :width="null"
                           :min-width="50">
          </el-table-column>
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="7"
              style="border:0.5px solid rgb(111, 111, 111);">
        <el-table highlight-current-row
                  style="width: 100%;background-color: rgb(46, 45, 45)"
                  :sort-method="customSortMethodForProgressColumn"
                  :header-cell-style="{
        background: '#404040',
        color: '#FFFFFF',
        font: '14px'
      }"
                  height="70vh"
                  :empty-text="'NO DATA DISPLAY'">
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
          <el-table-column label="ATA"
                           :width="null"
                           sortable
                           :min-width="10"> </el-table-column>
          <el-table-column label="Equipment Name"
                           :width="null"
                           :min-width="40"> </el-table-column>
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="7"
              style="border:0.5px solid rgb(111, 111, 111);">
        <el-table highlight-current-row
                  style="width: 100%;background-color: rgb(46, 45, 45)"
                  :sort-method="customSortMethodForProgressColumn"
                  :header-cell-style="{
        background: '#404040',
        color: '#FFFFFF',
        font: '14px'
      }"
                  height="70vh"
                  :empty-text="'NO DATA DISPLAY'">
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
          <el-table-column label="Part Number"
                           :width="null"
                           sortable
                           :min-width="20"> </el-table-column>
          <el-table-column label="Description"
                           :width="null"
                           :min-width="30"> </el-table-column>
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
        </el-table>
      </el-col>
    </el-main>
    <el-footer>
      <div>
        <button @click="printPage()"
                class="footer-btn">PRINT</button>
      </div>
      <div class="flex gap3">
        <button @click="gotoDataUpload()"
                class="footer-btn">SELECT</button>
      </div>
    </el-footer>
  </div>
  <!-- <div>
    <div class="px-6 flex ">
      <div class="w-1/3 ">
        <table>
          <thead>
            <tr>
              <th>Batch Part Number</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in 10"
                class="h14 "
                :class="item === 1 ? 'folder-color' : ''">
              <td>User {{ item }}</td>
              <td>XXXXXXXXXXXXX</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-1/3">
        <table>
          <thead>
            <tr>
              <th>ATA</th>
              <th>Equipment Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in 10"
                class="h14 "
                :class="item === 1 ? 'folder-color' : ''">
              <td>32</td>
              <td>IDU_CENTER</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex-1">
        <table>
          <thead>
            <tr>
              <th>Part Number</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in 10"
                class="h14 "
                :class="item === 1 ? 'folder-color' : ''">
              <td>User {{ item }}</td>
              <td>Description</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <el-footer>
      <div>
        <button class="footer-btn">PRINT</button>
      </div>
      <div class="flex gap3">
        <button @click="gotoDataUpload()" class="footer-btn">SELECT</button>
      </div>
    </el-footer>
  </div> -->
</template>
<script lang="ts">
import { customSortMethodForProgressColumn, printPage } from '@/utils/utils'

export default {
  name: 'BatchPartSelection',
  components: {
  },
  mixins: [],
  props: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  methods: {
    gotoDataUpload() {
      this.$router.push({
        name: "DataUpload"
      })
    },
    printPage,
    customSortMethodForProgressColumn,
  }
};
</script>
