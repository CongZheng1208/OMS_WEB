<template>
  <el-row v-if="!isPdfPageSelected">
    <el-table
      highlight-current-row
      style="width: 100%; background-color: rgb(46, 45, 45)"
      :data="existingFDEArray"
      :sort-method="customSortMethodForProgressColumn"
      :header-cell-style="{
        background: '#404040',
        color: '#FFFFFF',
        font: '14px',
        'text-align': 'center',
      }"
      :cell-style="{ 'text-align': 'center' }"
      row-key="index"
      :empty-text="'No Data Display'"
      @current-change="tableRowClicked"
    >
      <!-- <el-button>test</el-button> -->
      <el-table-column :width="null" :min-width="10"></el-table-column>
      <el-table-column
        prop="fde.FDECode"
        label="FDE Code"
        :width="null"
        :min-width="35"
      ></el-table-column>
      <el-table-column
        prop="fde.FDEText"
        label="FDE Test"
        :width="null"
        :min-width="35"
      ></el-table-column>
      <el-table-column
        prop="fde.FDEStatus"
        label="FDE Status"
        :width="null"
        :min-width="30"
        :formatter="fdeStatusData"
      ></el-table-column>
      <el-table-column
        prop="fde.FDEClass"
        label="FDE Class"
        :width="null"
        :min-width="30"
        :formatter="fdeClassData"
      ></el-table-column>
      <el-table-column
        prop="flightPhase"
        label="Flight Phase"
        sortable
        :width="null"
        :min-width="35"
        :formatter="flightPhaseData"
      ></el-table-column>
      <el-table-column
        prop="fde.FDETime"
        label="Date/Time"
        sortable
        :width="null"
        :min-width="40"
      ></el-table-column>
      <el-table-column
        prop="fimcodeInfo"
        label="FIM Code"
        :width="null"
        :min-width="35"
      >
        <template slot-scope="scope">
          <span
            @click="findURL(scope.row.fimcodeInfo)"
            :style="{ padding: '1vh', height: '4vh', width: '4vh', color: 'white'}"
            style="transition: color 0.3s;"
            @mouseenter="$event.target.style.textDecoration = 'underline'; $event.target.style.color = 'rgb(200, 200, 200)';"
            @mouseleave="$event.target.style.textDecoration = 'none'; $event.target.style.color = 'white';""
          >
            {{ scope.row.fimcodeInfo }}
          </span>
        </template>

      </el-table-column>
      <el-table-column
        prop="failureNameInfo"
        label="Failure Name"
        :width="null"
        :min-width="45"
      ></el-table-column>
      <el-table-column
        prop="flightLeg"
        label="Flight Leg"
        sortable
        :width="null"
        :min-width="35"
      ></el-table-column>

    </el-table>
    <div class="table-outer-number">
      Number of FDEs: {{  }}
    </div>
  </el-row>


  <div v-else>
    <div class="html_page">
      <el-button
        class="html_close_btn"
        icon="el-icon-close"
        circle
        size="mini"
        v-on:click='isPdfPageSelected=false'>
      </el-button>
      <iframe
        id="iframe"
        class="html_OMD">
      </iframe>
    </div>
  </div>

</template>

<script>
import {customSortMethodForProgressColumn} from '@/utils/utils.js'
import {fdeStatusEnum, fdeClassEnum, failureStateEnum, flightPhaseEnum} from '@/globals/enums.js'
import qs from 'qs'
import { postFimCodeForURL } from '@/services/centralMaintenance/failureReport';
import querystring from 'querystring';

import { mapState } from 'vuex';

export default {
  name: "ExistingFDE",
  data() {
    return {
      existingFDEArray: [],

      isPdfPageSelected: false,
    };
  },
  computed: {
    ...mapState('websocketVuex', ['infoOMD'])
  },
  methods: {

    /**
     * 更新store的选中行数据
     * @param {*} item 选中行数据
     */
    tableRowClicked(item) {
      this.$store.state.failureList.selectedFailureId = item.index;
      console.log(
        "selectedFailureId",
        this.$store.state.failureList.selectedFailureId
      );
    },

    /**
     * 本函数用于设置Flight Phase列中flight_phase的显示格式
     * 即将flight_phase原数据对应为state中flightPhaseEnum枚举值
     * @param {*} row table选中行信息
     */
     fdeStatusData(row) {
      let fpIndex = row.fde.FDEStatus;
      return fdeStatusEnum[fpIndex];
    },

    /**
     * 本函数用于设置Flight Phase列中flight_phase的显示格式
     * 即将flight_phase原数据对应为state中flightPhaseEnum枚举值
     * @param {*} row table选中行信息
     */
     fdeClassData(row) {
      let fpIndex = row.fde.FDEClass;
      return fdeClassEnum[fpIndex];
    },

    /**
     * 本函数用于设置Flight Phase列中flight_phase的显示格式
     * 即将flight_phase原数据对应为state中flightPhaseEnum枚举值
     * @param {*} row table选中行信息
     */
     flightPhaseData(row) {
      let fpIndex = row.flightPhase;
      return flightPhaseEnum[fpIndex];
    },

    /**
     * 本函数用于根据选取行的FIMCode获取对应的手册链接
     * @param {string} fimCode 选中行对应的FIM Code
     */
    findURL(fimCode){
      this.isPdfPageSelected = true
      let tmp = qs.stringify({
        fimCode: fimCode
      })
      postFimCodeForURL(tmp).then(response => {

        const queryString = querystring.stringify(response);
        const url = decodeURIComponent(`http://localhost:8081/MainPage?${queryString}`);
        console.log(url);

        document.getElementById('iframe').src = url;

        }).catch(error => {
        console.error('Error in Postting pdf url:', error);
      });
    },


    queryStringToJson(queryString) {
      // 将字符串按 & 分割成数组
      const paramsArray = queryString.split('&');

      // 创建一个空对象用于存储键值对
      let jsonResult = {};

      // 遍历数组，将每个键值对按 = 分割，转换为键值对存入对象中
      paramsArray.forEach(param => {
        const keyValue = param.split('=');
        jsonResult[keyValue[0]] = keyValue[1];
      });

      return jsonResult; // 返回转换后的 JSON 对象
    },

    /**
     * 筛选原数据中flight_leg为0的数据，
     * 更新至this.ExistingFDEsSumArray，用于前端数据的展示
     */
    getExistingFDEArray() {

      const resFDEDataOri = this.$store.state.failureList.resFDEData;
      const existingFDEArrayOri = this.$store.state.failureList.resFailureData;

      this.existingFDEArray = existingFDEArrayOri.filter(item =>
          item.fde.FDECode &&
          resFDEDataOri.some(obj => obj.FDECode === item.fde.FDECode && obj.FDEStatus === "0")
      );


      this.$store.state.failureList.resFailureData;

      console.log("existingFDEArray is:",this.existingFDEArray)
    },

    customSortMethodForProgressColumn
  },
  mounted() {
    this.getExistingFDEArray();

    // 在 OMS 项目中监听 message 事件
    window.addEventListener('message', (event) => {

      if (event.origin === 'http://localhost:8081') {  // 修改为正确的 OMD 项目的地址
        console.log('Received message from OMD:', event.data);

        this.$router.push({ name: "SelectTestNew", params: { selectedEquipment: this.queryStringToJson(event.data) } });
      }
    });
  }

};
</script>

<style scoped>
</style>
