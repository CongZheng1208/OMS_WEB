<template>
  <el-row v-if="!isPdfPageSelected"
          style="height: 65vh; border:  0.5px solid rgb(111, 111, 111);">
    <el-table highlight-current-row
              style="width: 100%; background-color: rgb(46, 45, 45);"
              :data="existingFDEArray"
              height="65vh"
              :sort-method="customSortMethodForProgressColumn"
              :header-cell-style="{
    background: '#404040',
    color: '#FFFFFF',
    font: '14px'
  }"
              row-key="index"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              :empty-text="'NO DATA DISPLAY'"
              @current-change="tableRowClicked"
              :row-class-name="rowClassName"
              v-loading="loading"
              element-loading-text="Data Loading..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.5)">
      <!-- <el-button>test</el-button> -->
      <el-table-column :width="null"
                       :min-width="10"></el-table-column>
      <el-table-column prop="fde.FDECode"
                       label="FDE Code"
                       :width="null"
                       sortable
                       :min-width="25"></el-table-column>
      <el-table-column prop="fde.FDEText"
                       label="FDE Test"
                       :width="null"
                       :min-width="60"></el-table-column>
      <el-table-column prop="fde.FDECode"
                       label="FDE Status"
                       :width="null"
                       :min-width="30"
                       :formatter="fdeStatusData"></el-table-column>
      <el-table-column prop="fde.FDEClass"
                       :min-width="30"
                       label="FDE Class">
        <template slot-scope="scope">
          <span :style="getCellStyle(scope.row.fde.FDEClass)">{{ scope.row.fde.FDEClass }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="fde.FDEClass"
                       label="FDE Class"
                       :width="null"
                       :min-width="30"
                       :formatter="fdeClassData"></el-table-column> -->
      <el-table-column prop="flightPhase"
                       label="Flight Phase"
                       sortable
                       :width="null"
                       :min-width="30"></el-table-column>
      <el-table-column prop="failureTime"
                       label="Date/Time"
                       sortable
                       :width="null"
                       :min-width="40"></el-table-column>
      <el-table-column prop="failureNameInfo"
                       label="Failure Name"
                       :width="null"
                       :min-width="45"></el-table-column>
      <el-table-column prop="flightLeg"
                       label="Flight Leg"
                       sortable
                       :formatter="flightLegFormatter"
                       :width="null"
                       :min-width="30"></el-table-column>
      <el-table-column prop="fimcodeInfo"
                       label="FIM Code"
                       :width="null"
                       :min-width="35">
        <template slot-scope="scope">
          <span @click="findURL(scope.row.fimcodeInfo)"
                :style="{ padding: '1vh', height: '4vh', width: '4vh', color: 'white' }"
                style="transition: color 0.3s;"
                @mouseenter="$event.target.style.textDecoration = 'underline'; $event.target.style.color = 'rgb(200, 200, 200)';"
                @mouseleave="$event.target.style.textDecoration = 'none'; $event.target.style.color = 'white';""
          >
            {{ scope.row.fde.FDECode === '34-00420' ? '27-21033' : scope.row.fimcodeInfo }}
          </span>
        </template>
</el-table-column>
</el-table>
<div class="
                table-lower-bar">
            <span class="table-lower-bar-right-text"> Number of FDEs: {{ existingFDEArray.length }} </span>
            </div>
  </el-row>
  <div v-else>
    <div class="html_page">
      <el-button class="html_close_btn"
                 icon="el-icon-close"
                 circle
                 size="mini"
                 v-on:click='isPdfPageSelected = false'>
      </el-button>
      <iframe id="iframe"
              class="html_OMD">
      </iframe>
    </div>
  </div>
</template>
<script lang="ts">
import { customSortMethodForProgressColumn } from '@/utils/utils'
import qs from 'qs'
import { postFimCodeForURL } from '@/services/centralMaintenance/failureReport';
import { IframeHTMLAttributes } from 'vue';
import { ResData } from './store'

export default {
  name: "ExistingFDE",
  data() {
    return {
      existingFDEArray: [],
      FDECodeStatusDict: {},
      isPdfPageSelected: false,
      interval: null,
      loading: false
    };
  },
  computed: {
    // ...mapState('websocketVuex', ['infoOMD']),
  },
  created() {
    this.getExistingFDEArray();
    // this.interval = setInterval(() => {
    //   this.getExistingFDEArray();
    // }, 1000); // 每秒执行一次
    // setTimeout(() => {
    //   this.loading = false;
    // }, 200);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    /**
     * 更新store的选中行数据
     * @param {*} item 选中行数据
     */
    tableRowClicked(item) {
      if (item.failureNameInfo !== "--") {
        this.$store.state.failureList.selectedFailureId = item.index;
      }
    },

    /**
     * 本函数用于确定某行是否可被选中样式
     * @param {*} row table选中行信息
     */
    rowClassName({ row }) {
      return row.failureNameInfo == "--" ? 'disable-row' : '';
    },

    /**
     * 本函数用于设置Flight Phase列中flight_phase的显示格式
     * 即将flight_phase原数据对应为state中flightPhaseEnum枚举值
     * @param {*} row table选中行信息
     */
    fdeStatusData(row) {
      let fpIndex = row.fde.FDECode;
      if (fpIndex == "") {
        return ""
      } else {
        return this.FDECodeStatusDict[fpIndex].FDEStatus;
      }

    },

    getCellStyle(fdeClass) {
      if (fdeClass === 'caution') {
        return { color: '#EE7700' };
      } else if (fdeClass === 'warning') {
        return { color: '#E63F00' };
      } else {
        return {};
      }
    },

    /**
     * 本函数用于设置Flight Phase列中flight_phase的显示格式
     * 即将flight_phase原数据对应为state中flightPhaseEnum枚举值
     * @param {*} row table选中行信息
     */
    fdeClassData(row) {
      let fpIndex = row.fde.FDECode;
      return this.FDECodeStatusDict[fpIndex].FDEClass;
    },

    flightLegFormatter(row, column) {
      // 找出flightLeg的最大值
      const maxFlightLeg = this.$store.state.failureList.maxflightLeg;
      // 对flightLeg进行格式化处理
      return row.flightLeg - maxFlightLeg;
    },

    /**
     * 本函数用于根据选取行的FIMCode获取对应的手册链接
     * @param {string} fimCode 选中行对应的FIM Code
     */
    findURL(fimCode: string) {
      const that = this
      // fimCode = '27-21033'
      this.isPdfPageSelected = true
      let tmp = qs.stringify({
        fimCode: fimCode
      })

      postFimCodeForURL(tmp).then(response => {

        const queryString = response["file_name"];
        const url = "http://192.168.1.34:81/manual/detail?groupNameCode=CES&language=sx_US&model=C919&path=%2FCES-C919-sx_US-2000300%" + queryString + "&issueNumber=R11&publicationId=CES-C919-sx_US-2000300"
        document.getElementById('iframe').src = url;

      }).catch(error => {
        console.error('Error in Postting pdf url:', error);
      });

      // 在外部页面
      window.addEventListener("message", function (event: MessageEvent<any>) {
        // 检查origin，确定消息发送方的安全性
        // if (event.origin !== "http://example.com") {
        //   return; // 来源不正确时忽略消息
        // }

        console.log("从iframe收到的消息：", event.data);
        if (event.data.hasOwnProperty("targetPage")) {
          if (event.data.targetPage === "selectTestNew") {
            console.log('[ this ] >', this)
            that.$router.push({ name: "SelectTestNew" });
          }
          console.log("[ event.data.targetPage ] >", event.data.targetPage)
          // window.parent.postMessage(event.data, "*");
        }
      }, false);
    },


    queryStringToJson(queryString: string) {
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

      const resFDEDataOri = JSON.parse(
        // @ts-ignore
        JSON.stringify(this.$store.state.failureList.resFDEData));
      const resFailureDataOri = JSON.parse(
        // @ts-ignore
        JSON.stringify(this.$store.state.failureList.resFailureData));


      if (resFDEDataOri.length !== undefined) {
        // 存储映射关系
        let dict = {};
        resFDEDataOri.map(obj => {
          dict[obj.FDECode] = { "FDEStatus": obj.FDEStatus, "FDEClass": obj.FDEClass, "FDEText": obj.FDEText };
        });
        this.FDECodeStatusDict = dict;

        // 筛选出存在failure关联的FDE项目
        const existingResFailureDataOri = resFailureDataOri.filter(item => item.failureState === "ACTV" && item.fde.FDEStatus && this.FDECodeStatusDict[item.fde.FDECode].FDEStatus === "ACTV_UNINHB");

        // 筛选出所有不存在failure关联的项目
        let existingFDECodes = existingResFailureDataOri.map(obj => obj.FDECode);

        let filteredArray = resFDEDataOri.reduce((acc, item) => {
          if (item.FDEStatus === 'ACTV_UNINHB' &&
            !acc.some(obj => obj.FDECode === item.FDECode) &&
            !existingFDECodes.includes(item.FDECode)) {
            acc.push(item);
          }
          return acc;
        }, []);

        let unexistingResFailureDataOri = filteredArray.map(item => {
          return {
            ata: "--",
            failureMessage: "--",
            failureNameInfo: "--",
            failureState: "--",
            failureTime: "--",
            fault: [],
            fde: item,
            fimcodeInfo: "--",
            flightLeg: "--",
            flightPhase: "--",
            id: item.id,
            index: item.FDECode,
            maintenceText: "--",
            maintenceTime: "--",
            rp: []
          };
        });
        let mergedArray = []
        mergedArray = existingResFailureDataOri.reduce((acc, curr) => {
          // 检查当前对象是否与已有对象相匹配
          // @ts-ignore
          let match = acc.find(item => item.FDEText === curr.FDEText && item.FDECode === curr.FDECode);

          // 如果有匹配的对象，将当前对象添加到匹配对象的children数组中
          if (match) {
            if (!match.children) {
              match.children = [];
            }
            unexistingResFailureDataOri = unexistingResFailureDataOri.filter(item => {
              return item.fde.FDECode !== match.fde.FDECode; // 删除id属性匹配得上的对象
            });

            match.children.push({
              ata: curr.ata,
              failureNameInfo: curr.failureNameInfo,
              failureState: curr.failureState,
              failureTime: curr.failureTime,
              fault: curr.fault,
              fault: curr.fde,
              fde: {
                FDEClass: "",
                FDECode: "",
                FDEStatus: "",
                FDEText: ""
              },
              fimcodeInfo: curr.fimcodeInfo,
              flightLeg: curr.flightLeg,
              flightPhase: curr.flightPhase,
              id: curr.id,
              index: curr.index,
              maintenceText: curr.maintenceText,
              maintenceTime: curr.maintenceTime,
              rp: curr.rp
            });
          } else {
            // 如果没有匹配的对象，将当前对象直接添加到结果数组中
            acc.push(curr);
          }
          return acc;
        }, []);
        this.existingFDEArray = mergedArray.concat(unexistingResFailureDataOri);
      } else {
        this.existingFDEArray = []
      }
    },
    customSortMethodForProgressColumn
  },
  mounted() {
    // 在 OMS 项目中监听 message 事件
    window.addEventListener('message', (event) => {
      if (event.origin === 'http://localhost:8081') {  // 修改为正确的 OMD 项目的地址
        this.$router.push({ name: "SelectTestNew", params: { selectedEquipment: this.queryStringToJson(event.data) } });
      }
    });
  }

};
</script>
<style scoped></style>
