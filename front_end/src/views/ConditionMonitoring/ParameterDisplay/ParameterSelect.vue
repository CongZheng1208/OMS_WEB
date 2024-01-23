<template>
  <div class="container-fluid">
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
  </div>
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
.radio {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
margin-top: 5px;
}
.radio input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgb(111, 111, 111);
  margin-right: 10px;
  cursor: pointer;
  position: relative;
}
.radio input[type="radio"]:before {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgb(37,37,37);
  transition: background-color 0.2s ease-in;
}
.radio input[type="radio"]:checked:before {
  background-color: rgb(32,255,255);
}

  .segment-top {
    border: 1.5px solid lightgray;
    border-bottom: none;
    padding: 0.5rem;
  }

  .segment-bottom {
    border: 1.5px solid lightgray;
    height: 65vh;
  }

  .status-bar {
    height: 6vh;
    text-align: right;
  }


</style>
