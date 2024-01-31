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
                :checked="isAll"
              />
              <label class="form-check-label">Parameter List Display</label>
            </div>
            <div class="radio"   @click="changeRadio('graphic')">
              <input
                name="param-display-radio1"
                type="radio"
                :checked="isATA"
              />
              <label class="form-check-label">Parameter Graphics Display</label>
            </div>
            <div class="radio" @click="changeRadio('raw')">
              <input
                name="param-display-radio1"
                type="radio"
                :checked="isFlight"
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
        isList: true,
        displayType: 'list',
        isAll: true,
        isATA: false,
        isFlight: false,
      }
    },
    methods: {
      /**
       * 本函数用于跳转参数展示的三种不同模块
       * @param {string} value 代表三种模块的不同字符值
       */
      changeRadio(value) {
        this.displaySelected = value
        if(value == 'list'){
          this.isAll =  true
          this.isATA =  false
          this.isFlight =  false
        }else if(value == 'graphic'){
          this.isAll =  false
          this.isATA =  true
          this.isFlight =  false
        }else{
          this.isAll =  false
          this.isATA =  false
          this.isFlight =  true
        }
      },

      /**
       * 本函数用于更新实时时间
       */
      updateCurrentTime() {
        const now = new Date();
        this.currentTime = now.toLocaleTimeString();
        this.currentDate = now.toLocaleDateString();
      },
    },
    created() {
      this.updateCurrentTime()
      setInterval(this.updateCurrentTime, 1000)
    },
  }
</script>


<style scoped>


</style>
