<template>
  <el-container style="display: flex; flex-direction: column;">
    <el-header style="text-align: left; font-weight: bold; color: white; text-shadow: 2px 2px 2px #000;
      padding-top: 3vh; padding-left: 4vh; font-size: 16px;">
      ATA and Equipment Selection
    </el-header>
    <el-main style="flex: 1; padding: 0;">
      <el-row :gutter="2">
        <el-col :span="9">
          <el-table
            highlight-current-row
            style="width: 100%; background-color: rgb(46, 45, 45)"
            @row-click="handleRowClick"
            :data="tableData"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>
            <el-table-column prop="ATA" label="ATA" sortable :width="null" :min-width="50"></el-table-column>


            <el-table-column :width="null" :min-width="5"></el-table-column>
            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>



        </el-col>
        <el-col :span="15">
          <el-table
            highlight-current-row
            style="width: 100%; background-color: rgb(46, 45, 45)"
            @row-click="handleRowClick"
            :data="tableData"
            :sort-method="customSortMethodForProgressColumn"
            :header-cell-style="{background:'#404040',color:'#FFFFFF', font:'14px'}"
            :empty-text="'No Data Display'"
          >
            <el-table-column :width="null" :min-width="5"></el-table-column>
            <el-table-column prop="Equipment Name" label="Equipment Name" sortable :width="null" :min-width="50"></el-table-column>
            <el-table-column prop="Availability" label="Availability" sortable :width="null" :min-width="50"></el-table-column>
            <el-table-column prop="Note" label="Note" :width="null" :min-width="50"></el-table-column>

            <el-table-column :width="null" :min-width="5"></el-table-column>
          </el-table>
        </el-col>
      </el-row>




    </el-main>
    <el-footer>
      <div>
      </div>
      <div>
          <el-button class="footer-btn">BACK</el-button>
          <el-button class="footer-btn">SELECT</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
    }
  }

</script>


<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 85vh;
  }

</style>

