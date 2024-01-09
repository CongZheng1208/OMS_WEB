<template>
  <el-container style="display: flex; flex-direction: column;">
    <el-header style="text-align: left; font-weight: bold; color: white; text-shadow: 2px 2px 2px #000;
      padding-top: 3vh; padding-left: 4vh; font-size: 16px;">
      Test Status: {{ selectedRowStatus }}
    </el-header>
    <el-main style=" flex: 1; padding: 0;">
      <div style="height:62vh">
        Test Status: {{ selectedRowStatus }}
      </div>
    </el-main>
    <el-footer height="10vh" style="border: none; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <el-button class="footer-btn" @click="printPage">PRINT</el-button>
      </div>
      <div>
          <el-button class="footer-btn" @click="switchCurve(1)">VIEW DETAIL</el-button>
          <el-button class="footer-btn" @click="turnToInteractive()" :disabled="!IsRespondable" :style="{'background-image': !IsRespondable ? 'linear-gradient(rgb(128, 127, 127), rgb(200, 200, 200))' : 'linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127))' }">RESPOND</el-button>
          <el-button class="footer-btn" @click="switchCurve(11)">NEW TEST</el-button>
          <el-button class="footer-btn" @click="sendAbort()" :disabled="!IsAbortable" :style="{'background-image': !IsAbortable ? 'linear-gradient(rgb(128, 127, 127), rgb(200, 200, 200))' : 'linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127))' }">ABORT TEST</el-button>
          <el-button class="footer-btn" @click="sendAbortAll()">ABORT ALL</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>

</script>

<style scoped>
</style>

