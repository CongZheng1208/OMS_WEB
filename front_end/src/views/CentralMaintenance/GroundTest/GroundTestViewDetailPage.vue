<template>
  <el-container>
   <el-header style="height: 12vh;">
    <el-row style="width: 80%;">
      <el-col :span="8">
        <div class="el-header-subcontainer">
          <span class="el-header-dot" ></span>
          ATA: {{  }}
        </div>
        <div class="el-header-subcontainer">
          <span class="el-header-dot" ></span>
          Equipment Name: {{  }}
        </div>
        <div class="el-header-subcontainer">
          <span class="el-header-dot" ></span>
          Test Name: {{  }}
        </div>
      </el-col>
      <el-col :span="8">
        <div class="el-header-subcontainer">
          <span class="el-header-dot" ></span>
           Expected Duration(mins): {{  }}
        </div>
        <div class="el-header-subcontainer">
          <span class="el-header-dot" ></span>
          Test Type: {{  }}
        </div>
        <div class="el-header-subcontainer">
          <span class="el-header-dot" ></span>
           Test Status: {{  }}
        </div>
      </el-col>
      <el-col :span="8">
        <div class="el-header-subcontainer">
          <span class="el-header-dot" ></span>
           Start Time: {{  }}
        </div>
        <div class="el-header-subcontainer">
          <span class="el-header-dot" ></span>
          End Time: {{  }}
        </div>
      </el-col>
    </el-row>
   </el-header>

   <el-main style="padding:2vh">
     <el-row>
      <div>
        <el-card class="custom-card" shadow="hover" style="height: 60vh">
          <div class="custom-header">DETAILS</div>
          <div class="custom-content">
            <div v-for="o in 50" :key="o" class="content-item">
              {{'列表内容 ' + o }}
            </div>
          </div>
        </el-card>
      </div>
     </el-row>

   </el-main>
   <el-footer>
     <div>
     </div>
     <div>
       <el-button class="footer-btn" @click="goTestListPage()">BACK</el-button>
     </div>
   </el-footer>
 </el-container>
</template>

<script>
export default {
 data() {
   return {
     selectedTestId: "",
   }
 },
 computed: {

 },
 methods: {
   /**
    * 本函数用于更新更新选中行的status属性到selectedRowStatus变量
    * @param {string} row - rawData数据的ataNumber属性
    */
   handleRowClick(row) {
     this.selectedTestId = row.T_ID;
   },

   /**
    * 本函数用于跳转页面
    */
    goTestListPage() {
     this.$router.push({ name: "TestList", params: { } });
   },
 },

 mounted() {
 }
}

</script>

<style scoped>
</style>

