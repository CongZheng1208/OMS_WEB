<template>
  <div class="container-fluid">
    <div class="segment-top">
      <div class="select-item">
        <select v-model="currentScreen" class="button-bar-btn">
          <option v-for="x in testData1" :value="x.value" style="background-color:grey">{{x.name}}</option>
        </select><br>
      </div>
      <div class="select-item" v-if="currentScreen == 'full'">
        <select v-model="leftAtaSelected" class="button-bar-btn">
          <option v-for="x in testData" :value="x.value" style="background-color:grey">{{x.name}}</option>
        </select><br>
      </div>
      <div class="select-item" v-if="currentScreen == 'half'">
        <select v-model="leftAtaSelected" class="button-bar-btn">
          <option v-for="x in testDataHalf" :value="x.value" style="background-color:grey">{{x.name}}</option>
        </select><br>
      </div>
      <div class="select-item" v-if="currentScreen == 'half'">
        <select v-model="rightAtaSelected" class="button-bar-btn">
          <option v-for="x in testDataHalf" :value="x.value" style="background-color:grey">{{x.name}}</option>
        </select><br>
      </div>

    </div>
    <div>
      <div v-if="currentScreen == 'full'">
        <div class="row segment-bottom">
          <div class="col-12">
            <ATA29 v-if="leftAtaSelected == '29'"></ATA29>
            <ATA32_LG v-if="leftAtaSelected == '321'"></ATA32_LG>
            <ATA32_BRAKE v-if="leftAtaSelected == '322'"></ATA32_BRAKE>
          </div>
        </div>
      </div>

      <div v-if="currentScreen == 'half'">
        <div class="row segment-bottom" >

          <div class="col-6">
            <ATA29 v-if="leftAtaSelected == '29'"></ATA29>
            <ATA32_LG v-if="leftAtaSelected == '321'"></ATA32_LG>

          </div>
          <div class="col-6">

            <ATA29 v-if="rightAtaSelected == '29'"></ATA29>
            <ATA32_LG v-if="rightAtaSelected == '321'"></ATA32_LG>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ATA29 from './components/ATA29.vue'
  import ATA32_LG from './components/ATA32_LG.vue'
  import ATA32_BRAKE from './components/ATA32_BRAKE.vue'

  export default {
    name: "ParamFlightShow",
    components: {
      ATA29,
      ATA32_LG,
      ATA32_BRAKE
    },
    data() {
      return {
        currentScreen : 'full',
        leftAtaSelected: "322",
        rightAtaSelected: "8",
        testData: [
          {
            id: 1,
            name: 'ATA 29',
            value: 29
          },
          {
            id: 2,
            name: 'ATA 32-LG',
            value: 321
          },
          {
            id: 3,
            name: 'ATA 32-BRAKE',
            value: 322
          },
        ],
        testDataHalf: [
          {
            id: 1,
            name: 'ATA 29',
            value: 29
          },
          {
            id: 2,
            name: 'ATA 32-LG',
            value: 321
          },
        ],
        testData1: [
          {
            id: 0,
            name: 'Full Screen',
            value: "full"
          },
          {
            id: 1,
            name: 'Half Screen',
            value: "half"
          }
        ],
      };
    },
    methods: {
      changeScreen(value) {
        this.currentScreen = value
      }
    },
  }
</script>


<style scoped>
  .segment-top {
    display: flex;
    flex-direction: row;

    margin-top: -6.5%;
    margin-left: 30%;
    position: absolute;
    width: 60%;
  }

  .select-item {
    padding-right: 3vh;
  }

  .segment-bottom {
    height: 62vh;
  }

  .button-bar-btn {
    background-image: linear-gradient(rgb(33, 33, 33), rgb(128, 127, 127));
    color: white;
    width: 16vh;
    height: 5vh;
  }

  th,
  td {
    padding: 8px; /* 单元格内边距 */
    text-align: center; /* 表格数据居中对齐 */
  }

  td:first-child,
  th:first-child {
    background-color: transparent; /* 第一列透明背景 */
    border: none; /* 第一列无边框 */
  }
</style>
