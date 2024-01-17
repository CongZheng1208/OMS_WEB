<template>
  <el-container style="display: flex; flex-direction: column;">
    <el-header style="text-align: left; font-weight: bold; color: white; text-shadow: 2px 2px 2px #000;
      padding-top: 3vh; padding-left: 4vh; font-size: 16px;">
      Test Status:
    </el-header>
    <el-main style=" flex: 1; padding: 0;">
      <div style="height:62vh">
        Test Status:
      </div>
    </el-main>
    <el-footer height="10vh" style="border: none; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <el-button class="footer-btn">PRINT</el-button>
      </div>
      <div>
          <el-button class="footer-btn" >VIEW DETAIL</el-button>
          <el-button class="footer-btn" :disabled="true">RESPOND</el-button>
          <el-button class="footer-btn" >NEW TEST</el-button>
          <el-button class="footer-btn" :disabled="true">ABORT TEST</el-button>
          <el-button class="footer-btn" >ABORT ALL</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>

</script>

<style scoped>
</style>

