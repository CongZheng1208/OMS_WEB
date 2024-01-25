<template>
  <el-container>
    <el-header style="height: 15vh;">
      <el-row style="width: 100%;">
        <el-col :span="2">
          <div class="el-header-title">
            Select Option
          </div>
        </el-col>
        <el-col :span="5">
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
        <el-col :span="14">
          <div>
            .
          </div>

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


  <!-- <div class="container-fluid">
    <div class="row segment-top">
      <div class="col-1">Select Option</div>
      <div class="col-3">
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

      </div>
      <div class="col-6">

      </div>
      <div class="col status-bar">
        A/C Reg: {{ acReg }} <br>
        {{currentDate}} {{ currentTime }}
      </div>
    </div>
    <div class="row segment-bottom">

        <ParamListDisplay v-if="displaySelected == 'list'"></ParamListDisplay>
        <ParamGraphicDisplay v-if="displaySelected == 'graphic'"></ParamGraphicDisplay>
        <RawDataDisplay v-if="displaySelected == 'raw'"></RawDataDisplay>
      </div>
  </div> -->
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
      updateCurrentTime() {
        const now = new Date();
        this.currentTime = now.toLocaleTimeString();
        this.currentDate = now.toLocaleDateString();
      },
      startView() {
        this.$emit("startView", true);
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
