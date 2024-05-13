<template>
  <div style="background-color: rgb(45, 45, 45);">
    <el-header height="13vh">
      <el-row style="width: 100%;">
        <el-col :span="4">
          <div class="el-header-title"> Select Option </div>
        </el-col>
        <el-col :span="5">
          <div class="radio" @click="changeRadioAndPush('TimeCycles')">
            <input type="radio"
              name="reset-radio"
              :checked="displaySelected == 'TimeCycles'"
            />
            <span>Time Cycle Function</span>
          </div>
          <div class="radio" @click="changeRadioAndPush('FlightLegAndPhase')">
            <input type="radio"
              name="reset-radio"
              :checked="displaySelected == 'FlightLegAndPhase'"
            />
            <span>Flight Leg/Phase operation</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="radio" @click="changeRadioAndPush('EngineBalance')">
            <input type="radio"
              name="retrieval-radio"
              :checked="displaySelected == 'EngineBalance'"
            />
            <span>Engine Trim Balance Function</span>
          </div>
          <div class="radio" @click="changeRadioAndPush('OtherFunctions')">
            <input type="radio"
              name="reset-radio"
              :checked="displaySelected == 'OtherFunctions'"
            />
            <span>Other Function</span>
          </div>
        </el-col>

        <el-col :span="10">

        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="1">
        <router-view></router-view>
      </el-row>
    </el-main>
  </div>
</template>
<script>

import { printPage, customSortMethodForProgressColumn, changeRadio } from '@/utils/utils'
import TimeCycles from './modules/TimeCycles/TimeCyclesDefaultPage.vue'
import LegPhaseOperation from './modules/LegPhaseOperation.vue'

export default {
  name: "DefaultResetPage",
  components: { TimeCycles, LegPhaseOperation },
  data() {
    return {
      displaySelected: 'TimeCycles',
    };
  },
  methods: {
    changeRadio,
    printPage,
    customSortMethodForProgressColumn,
    changeRadioAndPush(value) {
      this.displaySelected = value
      this.$router.push({
        name: value
      })
    },
  }
}

</script>
<style scoped></style>
