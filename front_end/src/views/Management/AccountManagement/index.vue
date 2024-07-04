<template>
  <div style="background-color: rgb(45, 45, 45);">
    <el-header height="9vh">
      <el-row style="width: 100%;">
        <el-col :span="21">
          <div class="el-header-title"> Account Management </div>
        </el-col>
        <el-col :span="3">
          <Clock />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row style=" border:  0.5px solid rgb(111, 111, 111);">
        <el-table height="65vh"
                  style="background-color: rgb(45, 45, 45);"
                  :sort-method="customSortMethodForProgressColumn"
                  :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                  :empty-text="'NO DATA DISPLAY'"
                  v-loading="loading"
                  element-loading-text="Data Loading..."
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.5)">
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
          <el-table-column label="User Name"
                           :width="null"
                           :min-width="30"></el-table-column>
          <el-table-column label="Password"
                           :width="null"
                           :min-width="30"></el-table-column>
          <el-table-column label="Connection Type"
                           :width="null"
                           :min-width="30"></el-table-column>
          <el-table-column label="Login Status"
                           :width="null"
                           :min-width="30"></el-table-column>
          <el-table-column label="Last Login Time"
                           :width="null"
                           :min-width="30"></el-table-column>
          <el-table-column :width="null"
                           :min-width="5"></el-table-column>
        </el-table>
        <div class="
                table-lower-bar">
          <span class="table-lower-bar-right-text"> Total Number: {{ }}</span>
        </div>
      </el-row>
    </el-main>
    <el-footer>
      <div>
        <button class="footer-btn"
                @click="printPage">PRINT</button>
      </div>
      <div>
        <button class="footer-btn">CHANGE PASSWORD</button>
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">
import { printPage, customSortMethodForProgressColumn } from '@/utils/utils'
import Clock from '@/components/Clock/index.vue'

export default {
  name: '',
  components: {
    Clock
  },
  mixins: [],
  props: {

  },
  data() {
    return {
      loading: true

    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);

  },
  methods: {
    printPage,
    customSortMethodForProgressColumn
  }
};
</script>
<style lang='scss'
       scoped></style>
