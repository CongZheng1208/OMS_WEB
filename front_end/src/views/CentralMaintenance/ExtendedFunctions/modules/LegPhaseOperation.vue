<template>
  <el-container>
    <el-header height="10vh">
      <h1>
        FLIGHT LEG/PHASE OPERATION
      </h1>
    </el-header>
    <el-main>
      <el-row >
        <div>
          <el-col :span="12">
            <div class="segment-left-border">
              <h3 style="margin-top: 5vh; text-align: center;">
                FLIGHT LEG OPERATION
              </h3>
              <div class="middle-box">
                <div v-if="!isLegAble">
                  <span  class="middle-box-text">
                    Flight Leg Transition is Disabled.
                    If a real flight leg would begin, click LEG ENABLE to manually enable flight leg transition.
                  </span>
                </div>
                <div v-if="isLegAble">
                  <span  class="middle-box-text">
                    Flight Leg Transition is Enabled.
                    If the next engine start, it would be a new flight leg.
                    If you want to manually disable flight leg transition, click LEG DISABLE.
                  </span>
                </div>
              </div>
              <div class="middle-button-bar">
                <div style="float: left">
                  <button class="middle-button-bar-btn" @click="startLeg()" :disabled="isLegAble" :style="{'background-image': isLegAble ? 'linear-gradient(rgb(128, 127, 127), rgb(200, 200, 200))' : 'linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127))' }">
                    LEG ENABLE
                  </button>
                </div>
                <div style="float: right">
                  <button class="middle-button-bar-btn" @click="stopLeg()" :disabled="!isLegAble" :style="{'background-image': !isLegAble ? 'linear-gradient(rgb(128, 127, 127), rgb(200, 200, 200))' : 'linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127))' }">
                    LEG DISABLE
                  </button>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="segment-right-border">
              <h3 style="margin-top: 5vh; text-align: center;">
                FLIGHT PHASE OPERATION
              </h3>
              <div class="middle-box">
                <div v-if="!isPhaseAble">
                  <span  class="middle-box-text">
                    Flight PHASE Transition is Disabled.
                    If you want to manually disable flight leg transition, click PHASE ENABLE.
                  </span>
                </div>
                <div v-if="isPhaseAble">
                  <span  class="middle-box-text">
                    Flight Phase Transition is Enabled.
                    If you want to manually inhibit flight phase transition, click PHASE DISABLE.
                  </span>
                </div>
              </div>
              <div class="middle-button-bar">
                <div style="float: left">
                  <button class="middle-button-bar-btn" @click="startPhase()" :disabled="isPhaseAble" :style="{'background-image': isPhaseAble ? 'linear-gradient(rgb(128, 127, 127), rgb(200, 200, 200))' : 'linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127))' }">
                    PHASE ENABLE
                  </button>
                </div>
                <div style="float: right">
                  <button class="middle-button-bar-btn" @click="stopPhase()" :disabled="!isPhaseAble" :style="{'background-image': !isPhaseAble ? 'linear-gradient(rgb(128, 127, 127), rgb(200, 200, 200))' : 'linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127))' }">
                    PHASE DISABLE
                  </button>
                </div>
              </div>
            </div>
          </el-col>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "LegPhaseOperation",
    data() {
      return {
        isLegAble: false,
        isPhaseAble: false
      };
    },
    mounted() {
      this.refreshInterval = setInterval(this.paramListInit, 1000); // Executes paramListInit function every 1000 milliseconds (1 second)
    },
    methods: {
      printPage() {
        // 调用window.print()来触发打印
        window.print();
      },
      stopLeg(){
        this.isLegAble = false
      },
      startLeg(){
        this.isLegAble = true
      },
      stopPhase(){
        this.isPhaseAble = false
      },
      startPhase(){
        this.isPhaseAble = true
      },
    },
    beforeDestroy() {
    },
  }
</script>

<style scoped>
  .segment-left-border {
    border: 1.5px solid lightgray;
    /* border-top: none; */
    border-bottom: none;
    border-left: none;
  }

  .segment-right-border {
    border: 1.5px solid lightgray;
    /* border-top: none; */
    border-bottom: none;
    border-right: none;
    border-left: none;
  }

  .middle-box{
    padding: 3vh;
    border: 1.5px solid lightgray;
    margin-top: 3vh;
    margin-left: 5vh;
    margin-right: 5vh;
    height: 30vh
  }

  .middle-box-text{
    margin-top: 5vh;
    margin-left: 5vh;
    margin-right: 5vh;
    white-space: pre-line;
  }

  .middle-button-bar {
    margin-top: 5vh;
    margin-left: 5vh;
    margin-right: 5vh;
  }

  .middle-button-bar-btn{
    background-image: linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127));
    color: white;
    width: 22vh;
    height: 5vh;
    transition: background-image 0.3s;
  }
</style>
