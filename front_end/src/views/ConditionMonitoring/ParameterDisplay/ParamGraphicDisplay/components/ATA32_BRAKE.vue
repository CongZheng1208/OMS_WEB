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
          <span class="data">{{ flattenData3[0] }}</span>
          <div class="line" />
        </div>
        <div class="capsule">
          <div class="line" />
          <span class="data">{{ flattenData3[1] }}</span>
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
          <span class="data">{{ flattenData4[0] }}</span>
          <div class="line" />
          <div class="empty-data" />
          <div class="line" />
          <span class="data">{{ flattenData4[1] }}</span>
          <div class="line" />
          <div class="empty-data" />
          <div class="line" />
          <span class="data">{{ flattenData4[2] }}</span>
          <div class="line" />
        </div>

        <div class="capsule-left">
          <div class="line" />
          <span class="data">{{ flattenData4[3] }}</span>
          <div class="line" />
          <div class="empty-data" />
          <div class="line" />
          <span class="data">{{ flattenData4[4] }}</span>
          <div class="line" />
          <div class="empty-data" />
          <div class="line" />
          <span class="data">{{ flattenData4[5] }}</span>
          <div class="line" />
        </div>

        <div class="capsule-right">
          <div class="line" />
          <span class="data">{{ flattenData5[0] }}</span>
          <div class="line" />
          <div class="empty-data" />
          <div class="line" />
          <span class="data">{{ flattenData5[1] }}</span>
          <div class="line" />
          <div class="empty-data" />
          <div class="line" />
          <span class="data">{{ flattenData5[2] }}</span>
          <div class="line" />
        </div>

        <div class="capsule-1">
          <div class="line" />
          <span class="data">{{ flattenData5[3] }}</span>
          <div class="line" />
          <div class="empty-data" />
          <div class="line" />
          <span class="data">{{ flattenData5[4] }}</span>
          <div class="line" />
          <div class="empty-data" />
          <div class="line" />
          <span class="data">{{ flattenData5[5] }}</span>
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
                  <span>
                    {{ flattenData0[0] }}
                  </span>
                </div>
              </td>
              <td class="table-name">{{ flattenNameData0[1] }}</td>
              <td class="table-item">
                <div class="item-word">
                  <span>
                    {{ flattenData0[1] }}
                  </span>
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
              <td class="table-item" v-for="(cell, cellIndex) in flattenData1" :key="cellIndex">
                <div class="item-word">
                  <span>
                    {{ cell }}
                  </span>
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
              <td class="table-item" v-for="(cell, cellIndex) in flattenData2" :key="cellIndex">
                <div class="item-word">
                  <span>
                    {{ cell }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </el-col>
  </el-row>

</template>

<script>
import qs from 'qs'
import axios from 'axios'
// import {pattern, urlHeads} from '../../../../config/url.js'
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
        // flattenData0: [
        //   'TRUE', 'FALSE',
        // ],
        // flattenData1: [
        //   'TRUE', 'TRUE', 'FALSE', 'FALSE'
        // ],
        // flattenData2: [
        //   'TRUE', 'TRUE', 'FALSE', 'FALSE'
        // ],
        // flattenData3: [
        //   'TRUE', 'FALSE',
        // ],
        // flattenData4: [
        //   'TRUE', 'TRUE', 'FALSE', 'FALSE', 'FALSE', 'FALSE'
        // ],
        // flattenData5: [
        //   'TRUE', 'TRUE', 'FALSE', 'FALSE', 'FALSE', 'FALSE'
        // ],

        flattenData0: [
          'TRUE', '2800',
        ],
        flattenData1: [
          'TRUE', 'TRUE', 'FALSE', 'TRUE'
        ],
        flattenData2: [
          '10.00', '10.01', '7.00', '6.99'
        ],
        flattenData3: [
          '1000', '1000',
        ],
        flattenData4: [
          '200', '1000', '160', '200', '1000', '160'
        ],
        flattenData5: [
          '200', '1000', '160', '200', '1000', '160'
        ],



      };
    },
    mounted() {
      //this.refreshInterval = setInterval(this.paramListInit, 1000);
    },
    methods: {
      paramListInit(){
        console.log("ATA32 start to run")

        let tmp1 = qs.stringify({
          selectedParams: this.selectedParamsIdx
        })

        var urlRoot1 = 'php/conditionMonitoring/paramerLinesDisplay/paramerShowDynamic.php';
        axios.post(urlHeads[pattern]+urlRoot1, tmp1).then(
          response => {
            console.log(response.data)
            // 抓到数据立即赋值
            this.flattenData0 = response.data.slice(2);
            this.flattenData1 = response.data.slice(2, 6);
            this.flattenData2 = response.data.slice(6, 10);
            this.flattenData3 = response.data.slice(10, 12);
            this.flattenData4 = response.data.slice(12, 18);
            this.flattenData5 = response.data.slice(18, response.data.length);
          },
          error => {
            // alert('发送请求失败', error.message)
          }
        )
      }
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
  .title-container{
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
  .title-inner-container{
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
    justify-content: center; /* 水平居中 */
  }
  .capsule-container{
    width: 100%;
    display: flex;
    justify-content: center;
  }

  th,
  td {
    padding: 2vh; /* 单元格内边距 */
    text-align: center; /* 表格数据居中对齐 */
  }

  td:first-child,
  th:first-child {
    background-color: transparent; /* 第一列透明背景 */
    border: none; /* 第一列无边框 */
  }

  .table-name{
    font-weight: bold;
  }
  .table-item{
    padding-left: 2vh;
    padding-right: 2vh;
    width: 20vh;
  }
  .item-word{
    height: 100%;
    width: 15vh;
    border: 1.5px solid lightgray;
  }

  .bottom-table-name{
    font-weight: bold;
    padding: 2vh;
  }

  .bottom-table-name-1{
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
  /* margin-left: 2vh; */
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
  width: 100%;  /* Adjust the width as needed */
  border-top: 0.2vh solid lightgray;
  /* margin: 5px 0; */
}

.empty-data {
  text-align: center;
  height:1vh
  /* font-weight: bold; */
}
.data {
  text-align: center;
  /* font-weight: bold; */
}

</style>
