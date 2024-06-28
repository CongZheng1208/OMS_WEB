<template>
  <el-row>
    <el-col :span="12">
      <div class="first-table-container">
        <span class="main-title">LANDING GEAR BRAKES</span>
      </div>
      <div class="table-container">
        <div class="border-table-container-1">
          <span class="title-1">NOSE GEAR TIRE PRESS(PSI)</span>
        </div>
      </div>
      <div class="capsule-container">
        <div class="capsule">
          <div class="line" />
          <span class="data">{{ NoseGearTirePress[0] }}</span>
          <div class="line" />
        </div>
        <div class="capsule">
          <div class="line" />
          <span class="data">{{ NoseGearTirePress[1] }}</span>
          <div class="line" />
        </div>
      </div>
      <div class="table-container">
        <div class="border-table-container">
          <div class="title-container">
            <div class="title-inner-container">
              <span class="title-2">MAIN GEAR</span>
              <span class="title-2">BRAKE TEMP(%)</span>
              <span class="title-2">TIRE PRESS(PSI)</span>
              <span class="title-2">BRAKE PRESS(PSI)</span>
            </div>
          </div>
        </div>
      </div>
      <div class="capsule-container">
        <div class="capsule-1">
          <div class="line" />
          <span class="data">{{ MainGearLeft[0] }}</span>
          <div class="line" />
          <div class="empty-data" />
          <div class="line" />
          <span class="data">{{ MainGearLeft[1] }}</span>
          <div class="line" />
          <div class="empty-data" />
          <div class="line" />
          <span class="data">{{ MainGearLeft[2] }}</span>
          <div class="line" />
        </div>
        <div class="capsule-left">
          <div class="line" />
          <span class="data">{{ MainGearLeft[3] }}</span>
          <div class="line" />
          <div class="empty-data" />
          <div class="line" />
          <span class="data">{{ MainGearLeft[4] }}</span>
          <div class="line" />
          <div class="empty-data" />
          <div class="line" />
          <span class="data">{{ MainGearLeft[5] }}</span>
          <div class="line" />
        </div>
        <div class="capsule-right">
          <div class="line" />
          <span class="data">{{ MainGearRight[0] }}</span>
          <div class="line" />
          <div class="empty-data" />
          <div class="line" />
          <span class="data">{{ MainGearRight[1] }}</span>
          <div class="line" />
          <div class="empty-data" />
          <div class="line" />
          <span class="data">{{ MainGearRight[2] }}</span>
          <div class="line" />
        </div>
        <div class="capsule-1">
          <div class="line" />
          <span class="data">{{ MainGearRight[3] }}</span>
          <div class="line" />
          <div class="empty-data" />
          <div class="line" />
          <span class="data">{{ MainGearRight[4] }}</span>
          <div class="line" />
          <div class="empty-data" />
          <div class="line" />
          <span class="data">{{ MainGearRight[5] }}</span>
          <div class="line" />
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="first-table-container">
        <span class="main-title">LANDING GEAR BRAKES</span>
      </div>
      <div class="table-container">
        <table class="centered-table">
          <tbody>
            <tr>
              <td class="table-name">{{ flattenNameData0[0] }}</td> <!-- 属性名行 -->
              <td class="table-item">
                <div class="item-word">
                  <span> {{ LandingGearBrakes[0] }} </span>
                </div>
              </td>
              <td class="table-name">{{ flattenNameData0[1] }}</td>
              <td class="table-item">
                <div class="item-word">
                  <span> {{ LandingGearBrakes[1] }} </span>
                  <!-- <span class="item-unit">
                    {{ "PSI" }}
                  </span> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-container">
        <div class="border-table-container">
          <span class="title">BRAKE PRESS CMD</span>
          <div class="bottom-title">
            <span class="bottom-table-name">LEFT OUTBD</span>
            <span class="bottom-table-name">LEFT INBD</span>
            <span class="bottom-table-name">RIGHT OUTBD</span>
            <span class="bottom-table-name">RIGHT INBD</span>
          </div>
        </div>
      </div>
      <div class="data-table-container">
        <table class="centered-table">
          <tbody>
            <tr>
              <td class="table-item"
                  v-for="(cell, cellIndex) in BrakePressCmd"
                  :key="cellIndex">
                <div class="item-word">
                  <span> {{ cell }} </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-container">
        <div class="border-table-container">
          <span class="title">BRAKE PEDAL POSITION(%)</span>
          <div class="bottom-title">
            <span class="bottom-table-name-1">L -PILOT- R</span>
            <span class="bottom-table-name-1">L -COPILOT- R</span>
          </div>
        </div>
      </div>
      <div class="data-table-container">
        <table class="centered-table">
          <tbody>
            <tr>
              <td class="table-item"
                  v-for="(cell, cellIndex) in BrakePedalPosition"
                  :key="cellIndex">
                <div class="item-word">
                  <span> {{ cell }} </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import qs from 'qs'
import { postGraphicInTime } from '@/services/conditionMonitoring/parameterDisplay/index';
import { LANDING_GEAR_BRAKES_Enum } from '/@/globals/enums'

export default {
  name: "ATA32",
  data() {
    return {
      refreshInterval: null,
      selectedParamsIdx: [
        '18335', '5084',
        '52807', '49713', '98761', '50092',
        '9306', '64619', '70163', '4007',

        '18335', '5084',
        '52807', '49713', '98761', '50092', '18335', '5084',
        '52807', '49713', '98761', '50092', '18335', '5084',
      ],
      flattenNameData0: [
        'PARK BRAKE', 'ACC PRESS(PSI)'
      ],
      flattenNameData1: [
        'DOOR CLOSED', 'DOOR OPEN', 'UPLOCKED', 'DNLOCKED', 'WOW'
      ],
      // LandingGearBrakes: [
      //   'TRUE', 'FALSE',
      // ],
      // BrakePressCmd: [
      //   'TRUE', 'TRUE', 'FALSE', 'FALSE'
      // ],
      // BrakePedalPosition: [
      //   'TRUE', 'TRUE', 'FALSE', 'FALSE'
      // ],
      // NoseGearTirePress: [
      //   'TRUE', 'FALSE',
      // ],
      // MainGearLeft: [
      //   'TRUE', 'TRUE', 'FALSE', 'FALSE', 'FALSE', 'FALSE'
      // ],
      // MainGearRight: [
      //   'TRUE', 'TRUE', 'FALSE', 'FALSE', 'FALSE', 'FALSE'
      // ],

      LandingGearBrakes: [
        'TRUE', '2800',
      ],
      BrakePressCmd: [
        'TRUE', 'TRUE', 'FALSE', 'TRUE'
      ],
      BrakePedalPosition: [
        '10.00', '10.01', '7.00', '6.99'
      ],
      NoseGearTirePress: [
        '1000', '1000',
      ],
      MainGearLeft: [
        '200', '1000', '160', '200', '1000', '160'
      ],
      MainGearRight: [
        '200', '1000', '160', '200', '1000', '160'
      ],



    };
  },
  mounted() {
    this.refreshInterval = setInterval(this.paramListInit, 1000);
  },
  methods: {
    paramListInit() {
      let tmp = qs.stringify({
        index: LANDING_GEAR_BRAKES_Enum,
        timeIndex: this.getCurrentDateTime()
      })

      postGraphicInTime(tmp).then(response => {

        if (response.length !== 0) {
          this.LandingGearBrakes = response.slice(2);
          this.BrakePressCmd = response.slice(2, 6);
          this.BrakePedalPosition = response.slice(6, 10);
          this.NoseGearTirePress = response.slice(10, 12);
          this.MainGearLeft = response.slice(12, 18);
          this.MainGearRight = response.slice(18, response.length);
        }



      }).catch(error => {
        console.error('Error in fetching parameter display data:', error);
      });
    },
    getCurrentDateTime() {
      var now = new Date();
      var year = now.getFullYear();
      var month = (now.getMonth() + 1).toString().padStart(2, '0');
      var day = now.getDate().toString().padStart(2, '0');
      var hours = now.getHours().toString().padStart(2, '0');
      var minutes = now.getMinutes().toString().padStart(2, '0');
      var seconds = now.getSeconds().toString().padStart(2, '0');

      var formattedDateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
      return formattedDateTime;
    },
  },
  beforeDestroy() {
    clearInterval(this.refreshInterval)
  },
}
</script>
<style scoped>
.title {
  width: 60%;
  text-align: center;
  font-weight: bold;

  margin-top: -2vh;
  border: none;
  background-color: rgb(45, 45, 45);
}

.title-1 {
  width: 60%;
  text-align: center;
  font-weight: bold;

  margin-top: -2vh;
  border: none;
  background-color: rgb(45, 45, 45);
}

.title-2 {
  width: 29.5vh;
  text-align: center;
  font-weight: bold;
  margin-top: 0.2vh;
  background-color: rgb(45, 45, 45);
}

.main-title {
  margin-top: 1vh;
  text-align: center;
  font-weight: bold;
}

.bottom-title {
  margin: 0;
  padding-bottom: -2vh;
}

.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  height: 8vh;
  border: 0.2vh solid lightgray;
  border-bottom: none;
  border-top: none;
}

.title-inner-container {
  margin-top: -2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  width: 30vh;
  height: 50vh;
  border: 1px solid lightgray;
  /* border-bottom: none;
    border-top: none; */
}

.table-container {
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  margin-top: 5vh;
}

.first-table-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.border-table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  height: 8vh;
  border: 0.2vh solid lightgray;
  border-bottom: none;
}

.border-table-container-1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  height: 8vh;
  border: 0.2vh solid lightgray;
  border-bottom: none;
}

.data-table-container {
  width: 100%;
  display: flex;
  justify-content: center;
  /* 水平居中 */
}

.capsule-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

th,
td {
  padding: 2vh;
  /* 单元格内边距 */
  text-align: center;
  /* 表格数据居中对齐 */
}

td:first-child,
th:first-child {
  background-color: transparent;
  /* 第一列透明背景 */
  border: none;
  /* 第一列无边框 */
}

.table-name {
  text-align: left;
  font-weight: bold;
}

.table-item {
  padding-left: 2vh;
  padding-right: 2vh;
  width: 20vh;
}

.item-word {
  height: 100%;
  width: 15vh;
  border: 1.5px solid lightgray;
}

.bottom-table-name {
  font-weight: bold;
  padding: 2vh;
}

.bottom-table-name-1 {
  font-weight: bold;
  padding: 10vh;
}

.capsule {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 7vh;
  height: 12vh;
  border: 0.2vh solid lightgray;
  border-radius: 5vh;
  margin-left: 1vh;
  margin-right: 1vh;
  margin-top: -4vh;
}

.capsule-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 8vh;
  height: 22vh;
  border: 0.2vh solid lightgray;
  border-radius: 5vh;
  margin-left: 5vh;
  margin-right: 5vh;
}

.capsule-left {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 8vh;
  height: 22vh;
  border: 0.2vh solid lightgray;
  border-radius: 5vh;
  margin-right: 22vh;
}

.capsule-right {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 8vh;
  height: 22vh;
  border: 0.2vh solid lightgray;
  border-radius: 5vh;
  margin-left: 22vh;
  /* margin-right: 2vh; */
}

.line {
  width: 100%;
  /* Adjust the width as needed */
  border-top: 0.2vh solid lightgray;
  /* margin: 5px 0; */
}

.empty-data {
  text-align: center;
  height: 1vh
    /* font-weight: bold; */
}

.data {
  text-align: center;
  /* font-weight: bold; */
}
</style>
