<template>
  <el-container>
    <el-header style="height: 15vh;">
      <el-row style="width: 100%;">
        <el-col :span="2">
          <div class="el-header-title">
            Select Option
          </div>
        </el-col>
        <el-col :span="19">
          <el-col :span="8">
            <div class="radio"  @click="changeRadio('list')">
             <input
                name="param-display-radio1"
                type="radio"
                :checked="displaySelected == 'list'"
              />
              <label class="form-check-label">Parameter List Display</label>
            </div>
            <div class="radio"   @click="changeRadio('graphic')">
              <input
                name="param-display-radio1"
                type="radio"
                :checked="displaySelected == 'graphic'"
              />
              <label class="form-check-label">Parameter Graphics Display</label>
            </div>
            <div class="radio" @click="changeRadio('raw')">
              <input
                name="param-display-radio1"
                type="radio"
                :checked="displaySelected == 'raw'"
              />
              <label class="form-check-label">Raw Data Display</label>
            </div>
          </el-col>
          <el-col :span="16"></el-col>
        </el-col>

        <el-col :span="3">
          <div class="col status-bar">
            A/C Reg: {{ acReg }} <br>
            {{currentDate}} {{ currentTime }}
          </div>
        </el-col>
      </el-row>
    </el-header>

    <ParamListDisplay v-if="displaySelected == 'list'"></ParamListDisplay>
    <ParamGraphicDisplay v-if="displaySelected == 'graphic'"></ParamGraphicDisplay>
    <RawDataDisplay v-if="displaySelected == 'raw'"></RawDataDisplay>

 </el-container>
</template>

<script>
  import ParamListDisplay from './ParamListDisplay/ParamListDisplay.vue'
  import ParamGraphicDisplay from './ParamGraphicDisplay/ParamFlightShow.vue'
  import RawDataDisplay from './RawDataDisplay/RawDataDisplay.vue'
  import {changeRadio} from '@/utils/utils.js'

  export default {
    name: "ParamSelect",
    components: {
      ParamListDisplay,
      ParamGraphicDisplay,
      RawDataDisplay
    },
    data() {
      return {
        displaySelected: 'list',
        acReg: "C-WXWB",
        currentTime: '',
        currentDate: "",
      }
    },
    methods: {
      /**
       * 本函数用于更新实时时间
       */
      updateCurrentTime() {
        const now = new Date();
        this.currentTime = now.toLocaleTimeString();
        this.currentDate = now.toLocaleDateString();
      },
      changeRadio
    },
    created() {
      this.updateCurrentTime()
      setInterval(this.updateCurrentTime, 1000)
    },
  }
</script>


<style scoped>

</style>
