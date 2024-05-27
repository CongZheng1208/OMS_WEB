<template>
  <div style="background-color: rgb(45, 45, 45);">
    <el-header height="9vh">
      <el-row style="width: 100%;">
        <el-col :span="3">
          <div class="el-header-title"> Select Option </div>
        </el-col>
        <el-col :span="5">
          <div class="el-header-radios">
            <div class="radio"
                 @click="changeRadioAndPush('TimeCycles')">
              <input type="radio"
                     name="reset-radio"
                     :checked="displaySelected == 'TimeCycles'" />
              <span>Time Cycle</span>
            </div>
            <div class="radio"
                 @click="changeRadioAndPush('FlightLegAndPhase')">
              <input type="radio"
                     name="reset-radio"
                     :checked="displaySelected == 'FlightLegAndPhase'" />
              <span>Flight Leg/Phase Operation</span>
            </div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="el-header-radios">
            <div class="radio"
                 @click="changeRadioAndPush('EngineBalance')">
              <input type="radio"
                     name="retrieval-radio"
                     :checked="displaySelected == 'EngineBalance'" />
              <span>Engine Trim Balance</span>
            </div>
            <div class="radio"
                 @click="changeRadioAndPush('OtherFunctions')">
              <input type="radio"
                     name="reset-radio"
                     :checked="displaySelected == 'OtherFunctions'" />
              <span>Other Function</span>
            </div>
          </div>
        </el-col>
        <el-col :span="11">
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="1">
        <router-view></router-view>
      </el-row>
    </el-main>
    <el-footer>
      <div>
        <button class="footer-btn"
                @click="printPage">PRINT</button>
      </div>
      <div>
        <button v-if="displaySelected == 'TimeCycles'"
                class="footer-btn">RETRIEVAL ALL</button>
      </div>
    </el-footer>
  </div>
</template>
<script lang="ts">
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
