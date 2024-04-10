<template>
  <el-container>
    <el-header height="10vh">
      <el-row style="width: 100%;">
        <el-col :span="4">
          <div class="el-header-title">
            Select Option
          </div>
        </el-col>
        <el-col :span="5">
          <div class="radio" @click="changeRadioAndPush('EngineBalance')">
            <input type="radio"
              name="retrieval-radio"
              :checked="displaySelected == 'EngineBalance'"
            />
            <span>ENGINE BALANCE</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="radio" @click="changeRadioAndPush('FlightLegAndPhase')">
            <input type="radio"
              name="reset-radio"
              :checked="displaySelected == 'FlightLegAndPhase'"
            />
            <span>LEG/PHASE OPERATIONS</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="radio" @click="changeRadioAndPush('TimeCycles')">
            <input type="radio"
              name="reset-radio"
              :checked="displaySelected == 'TimeCycles'"
            />
            <span>TIME CYCLES</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="radio" @click="changeRadioAndPush('OtherFunctions')">
            <input type="radio"
              name="reset-radio"
              :checked="displaySelected == 'OtherFunctions'"
            />
            <span>OTHER FUNCTIONS</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="2">
        <router-view></router-view>
      </el-row>
    </el-main>
    <el-footer>
      <div>
        <el-button class="footer-btn" @click="printPage">PRINT</el-button>
      </div>
      <div>
        <el-button class="footer-btn" >HELP</el-button>
        <el-button v-if="displaySelected == 'TimeCycles'" class="footer-btn" >SELECT</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<script>

import {printPage, customSortMethodForProgressColumn,changeRadio} from '@/utils/utils.js'
import TimeCycles from './modules/TimeCycles/TimeCyclesDefaultPage.vue'
import LegPhaseOperation from './modules/LegPhaseOperation.vue'

export default {
  name: "DefaultResetPage",
  components: {TimeCycles, LegPhaseOperation},
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
    }
  }
}

</script>

<style scoped>
</style>

