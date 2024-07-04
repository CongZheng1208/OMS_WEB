<template>
  <el-main>
    <el-row style=" border:  0.5px solid rgb(111, 111, 111);">
      <el-table height="65vh"
                style="background-color: rgb(45, 45, 45);"
                :sort-method="customSortMethodForProgressColumn"
                :header-cell-style="{ background: '#404040', color: '#FFFFFF', font: '14px' }"
                :empty-text="'NO DATA DISPLAY'">
        <el-table-column :width="null"
                         :min-width="5"></el-table-column>
        <el-table-column label="Date Time"
                         :width="null"
                         sortable
                         :min-width="30"></el-table-column>
        <el-table-column label="User Name"
                         :width="null"
                         sortable
                         :min-width="30"></el-table-column>
        <el-table-column label="Requested Form"
                         :width="null"
                         sortable
                         :min-width="30"></el-table-column>
        <el-table-column label="Printed Task Name"
                         :width="null"
                         :min-width="30"></el-table-column>
        <el-table-column label="Print Status"
                         :width="null"
                         sortable
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
</template>
<script lang="ts">
import { customSortMethodForProgressColumn } from '@/utils/utils'
export default {
  name: "printRecord",
  components: {

  },
  data() {
    return {
    }
  },
  methods: {
    customSortMethodForProgressColumn
  },
  created() {
  },
}
</script>
<style scoped></style>
