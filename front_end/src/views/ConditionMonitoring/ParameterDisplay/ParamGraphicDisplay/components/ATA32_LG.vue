<template>
  <el-row>
    <div class="table-container">
      <span class="main-title">LANDING GEAR</span>
    </div>
    <div class="table-container">
      <table class="centered-table">
        <tbody>
          <tr>
            <td class="table-name">{{ flattenNameData0[0] }}</td> <!-- 属性名行 -->
            <td class="table-item">
              <div class="item-word">
                <span> {{ flattenData0[0] }} </span>
              </div>
            </td>
            <td class="table-name">{{ flattenNameData0[1] }}</td>
            <td class="table-item">
              <div class="item-word">
                <span> {{ flattenData0[1] }} </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-container">
      <table class="centered-table">
        <thead>
          <tr>
            <th></th> <!-- 第一列空白 -->
            <th>NLG</th>
            <th>MLG</th>
            <th>ALG</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in flattenNameData1"
              :key="index">
            <td class="table-name">{{ row }}</td> <!-- 属性名行 -->
            <td class="table-item"
                v-for="(cell, cellIndex) in flattenData1.slice(index, index + 3)"
                :key="cellIndex">
              <div class="item-word">
                <span> {{ cell }} </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </el-row>
</template>
<script>
import qs from 'qs'
import { postGraphicInTime } from '@/services/conditionMonitoring/parameterDisplay/index.js';
import { LANDING_GEAR_Enum } from '@/globals/enums'

export default {
  name: "ATA32",
  data() {
    return {
      refreshInterval: null,
      selectedParamsIdx: [
        '18335', '5084',
        '52807', '49713', '98761',
        '50092', '9306', '64619',
        '70163', '4007', '85282',
        '4246', '68979', '41052',
        '72882', '79460', '82235',
      ],
      flattenNameData0: [
        'LG RETRACT OMD', 'LG EXTENT OMD'
      ],
      flattenNameData1: [
        'DOOR CLOSED', 'DOOR OPEN', 'UPLOCKED', 'DNLOCKED', 'WOW'
      ],
      // flattenData0: [
      //   'TRUE', 'FALSE',
      // ],

      flattenData0: [
        '--', '--'
      ],
      // flattenData1: [
      //   'TRUE', 'TRUE', 'FALSE',
      //   'TRUE', 'TRUE', 'FALSE',
      //   'TRUE', 'TRUE', 'FALSE',
      //   'TRUE', 'TRUE', 'FALSE',
      //   'TRUE', 'TRUE', 'FALSE'
      // ],

      flattenData1: [
        '--', '--', '--',
        '--', '--', '--',
        '--', '--', '--',
        '--', '--', '--',
        '--', '--', '--',
      ],
    };
  },
  mounted() {
    this.refreshInterval = setInterval(this.paramListInit, 1000);
  },
  methods: {
    paramListInit() {

      let tmp = qs.stringify({
        index: LANDING_GEAR_Enum,
        timeIndex: this.getCurrentDateTime()
      })

      postGraphicInTime(tmp).then(response => {

        if (response.length !== 0) {
          this.flattenData0 = response.slice(2);
          this.flattenData1 = response.slice(2, response.length);
        }



      }).catch(error => {
        console.error('Error in fetching parameter list:', error);
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
.table-container {
  /* border-collapse: collapse; 合并单元格边框 */
  width: 100%;
  display: flex;
  justify-content: center;
  /* 水平居中 */
  margin-bottom: 2vh;
}

.main-title {
  margin-top: 2vh;
  text-align: center;
  font-weight: bold;
}

th,
td {
  padding: 12px;
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
  padding-top: 2vh;
  padding-bottom: 3vh;
  width: 17vh;

  /* border: 1.5px solid lightgray; */
  text-align: center;
}

.item-word {
  height: 100%;
  width: 15vh;
  border: 1.5px solid lightgray;
}


.item-word {
  border: 1.5px solid lightgray;
}
</style>
