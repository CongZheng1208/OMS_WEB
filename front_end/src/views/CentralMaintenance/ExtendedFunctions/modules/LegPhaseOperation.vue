<template>
  <div style="background-color: rgb(45, 45, 45);">
    <el-main>
      <div>
        <el-row>
          <div class="el-subheader"> FLIGHT LEG/PHASE OPERATION </div>
        </el-row>
        <el-row>
          <el-col :span="12"
                  style="border:1px solid rgb(85, 85, 85); padding: 5vh">
            <h3 style="text-align: center;"> FLIGHT LEG OPERATION </h3>
            <div class="middle-box">
              <div v-if="!isLegAble">
                <span class="middle-box-text"> Flight Leg Transition is Disabled. If a real flight leg would begin,
                  click LEG ENABLE to manually enable flight leg transition. </span>
              </div>
              <div v-if="isLegAble">
                <span class="middle-box-text"> Flight Leg Transition is Enabled. If the next engine start, it would be a
                  new flight leg. If you want to manually disable flight leg transition, click LEG DISABLE. </span>
              </div>
            </div>
            <div class="middle-button-bar">
              <div style="float: left">
                <button class="main-btn"
                        @click="startLeg()"
                        :disabled="isLegAble"> LEG ENABLE </button>
              </div>
              <div style="float: right">
                <button class="main-btn"
                        @click="stopLeg()"
                        :disabled="!isLegAble"> LEG DISABLE </button>
              </div>
            </div>
          </el-col>
          <el-col :span="12"
                  style="border:1px solid rgb(85, 85, 85); padding: 5vh">
            <h3 style="text-align: center;"> FLIGHT PHASE OPERATION </h3>
            <div class="middle-box">
              <div v-if="!isPhaseAble">
                <span class="middle-box-text"> Flight PHASE Transition is Disabled. If you want to manually disable
                  flight leg transition, click PHASE ENABLE. </span>
              </div>
              <div v-if="isPhaseAble">
                <span class="middle-box-text"> Flight Phase Transition is Enabled. If you want to manually inhibit
                  flight phase transition, click PHASE DISABLE. </span>
              </div>
            </div>
            <div class="middle-button-bar">
              <div style="float: left">
                <button class="main-btn"
                        @click="startPhase()"
                        :disabled="isPhaseAble"> PHASE ENABLE </button>
              </div>
              <div style="float: right">
                <button class="main-btn"
                        @click="stopPhase()"
                        :disabled="!isPhaseAble"> PHASE DISABLE </button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <el-footer>
    </el-footer>
  </div>
</template>
<script>
import { printPage, handleTestOrder } from '@/utils/utils'
import qs from 'qs'
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

    stopLeg() {
      this.isLegAble = false

      let tmp = qs.stringify({
        OrderType: "LEGDISABLE",
        currentPage: "flightLegAndPhase",
      });
      this.handleTestOrder(tmp)
    },
    startLeg() {
      this.isLegAble = true

      let tmp = qs.stringify({
        OrderType: "LEGENABLE",
        currentPage: "flightLegAndPhase",
      });

      // setInterval(() => {
      //   this.handleTestOrder(tmp)
      // }, 1000);
      this.handleTestOrder(tmp)

    },
    stopPhase() {
      this.isPhaseAble = false

      let tmp = qs.stringify({
        OrderType: "PHASEDISABLE",
        currentPage: "flightLegAndPhase",
      });
      this.handleTestOrder(tmp)
    },
    startPhase() {
      this.isPhaseAble = true

      let tmp = qs.stringify({
        OrderType: "PHASEENABLE",
        currentPage: "flightLegAndPhase",
      });
      this.handleTestOrder(tmp)
    },
    printPage,
    handleTestOrder
  },
  beforeDestroy() {
  },
}
</script>
<style scoped>
.middle-box {
  padding: 2vh;
  border: 1.5px solid lightgray;
  margin-left: 2vh;
  margin-right: 2vh;
  height: 37vh
}

.middle-box-text {
  margin-top: 5vh;
  margin-left: 5vh;
  margin-right: 5vh;
  white-space: pre-line;
}

.middle-button-bar {
  margin-top: 3vh;
  margin-left: 3vh;
  margin-right: 3vh;
  margin-bottom: 6vh;
}
</style>
