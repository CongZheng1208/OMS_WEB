<template>
  <el-row>
    <div class="table-container">
      <span class="main-title">HYDRAULIC</span>
    </div>
    <div class="table-container">
      <table class="centered-table">
        <thead>
          <tr>
            <th></th> <!-- 第一列空白 -->
            <th>L</th>
            <th>C</th>
            <th>R</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in flattenNameData"
              :key="index">
            <td class="table-name">{{ row }}</td> <!-- 属性名行 -->
            <td class="table-item"
                v-for="(cell, cellIndex) in flattenData.slice(index, index + 3)"
                :key="cellIndex">
              <div class="item-word">
                <span> {{ cell || '--' }} </span> <!-- 使用三元运算符判断数据是否为空 -->
                <span class="item-unit"> {{ flattenUnitData[index * 3 + cellIndex] }} </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </el-row>
</template>
<script lang="ts">
import qs from 'qs'
import { postGraphicInTime } from '@/services/conditionMonitoring/parameterDisplay/index';
import { HYDRAULIC_Enum } from '@/globals/enums'

export default {
  name: "ATA29",
  data() {
    return {
      refreshInterval: null,
      // selectedParamsIdx: [
      //   '18335', '5084', '70739',
      //   '52807', '49713', '98761',
      //   '50092', '9306', '64619',
      //   '70163', '4007', '85282',
      //   '4246', '68979', '41052',
      //   '72882', '79460', '82235',
      //   '41150', '5651', '18119',
      // ],
      flattenNameData: [
        'PUMP FAULT', 'SYSTEM PRESS', 'SYSTEM TEMP', 'SYSTEM QTY', 'LOW PRESS', 'OVER HEAT', 'LOW QTY'
      ],
      // flattenData: [
      //   'TRUE', 'TRUE', 'FALSE',
      //   'TRUE', 'TRUE', 'FALSE',
      //   'TRUE', 'TRUE', 'FALSE',
      //   'TRUE', 'TRUE', 'FALSE',
      //   'TRUE', 'TRUE', 'FALSE',
      //   'TRUE', 'TRUE', 'FALSE',
      //   'TRUE', 'TRUE', 'FALSE'
      // ],
      flattenData: [
        '--', '--', '--',
        '--', '--', '--',
        '--', '--', '--',
        '--', '--', '--',
        '--', '--', '--',
        '--', '--', '--',
        '--', '--', '--',
      ],
      flattenUnitData: [
        '', '', '',
        '', '', '',
        '', '', '',
        '', '', '',
        'PSIA', 'PSIA', 'PSIA',
        '℃', '℃', '℃',
        '%', '%', '%',
        '', '', '',
        '', '', '',
        '', '', '',
      ]
    };
  },
  mounted() {
    this.refreshInterval = setInterval(this.paramListInit, 1000);
  },
  methods: {
    paramListInit() {
      let selectedParams = qs.stringify({
        index: HYDRAULIC_Enum,
        timeIndex: this.getCurrentDateTime()
      });

      postGraphicInTime(selectedParams).then(response => {
        if (response.length !== 0) {
          this.flattenData = response;
        }
      }).catch(error => {
        console.error('Error in fetching parameter display data:', error);
      });
    },
    /**
 * 本函数用于获取当前时间
 */
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

.item-unit {
  margin-left: 1vh;
  width: 4vh;
}

.table-container {
  /* border-collapse: collapse; 合并单元格边框 */
  width: 100%;
  display: flex;
  justify-content: center;
  /* 水平居中 */
  /* margin-bottom: 1vh; */
}

.main-title {
  margin-top: 2vh;
  text-align: center;
  font-weight: bold;
}

th,
td {
  padding: 12px;
  /* text-align: center;  */
}

td:first-child,
th:first-child {
  background-color: transparent;
  /* 第一列透明背景 */
  border: none;
  /* 第一列无边框 */
}
</style>
