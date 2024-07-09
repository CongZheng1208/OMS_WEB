<template>
  <el-row v-if="!isPdfPageSelected"
          style="height: 65vh; border:  0.5px solid rgb(111, 111, 111);">
    <el-table highlight-current-row
              style="width: 100%;background-color: rgb(46, 45, 45)"
              :data="existingFailureArray"
              :sort-method="customSortMethodForProgressColumn"
              :header-cell-style="{
    background: '#404040',
    color: '#FFFFFF',
    font: '14px'
  }"
              height="65vh"
              :empty-text="'NO DATA DISPLAY'"
              row-key="index"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              @current-change="tableRowClicked"
              v-loading="loading"
              element-loading-text="Data Loading..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.5)">
      <el-table-column :width="null"
                       :min-width="10"></el-table-column>
      <el-table-column prop="fimcodeInfo"
                       label="FIM Code"
                       sortable
                       :width="null"
                       :min-width="30">
        <template slot-scope="scope">
          <span @click="findURL(scope.row.fimcodeInfo)"
                :style="{ padding: '1vh', height: '4vh', width: '4vh', color: 'white' }"
                style="transition: color 0.3s;"
                @mouseenter="$event.target.style.textDecoration = 'underline'; $event.target.style.color = 'rgb(200, 200, 200)';"
                @mouseleave="$event.target.style.textDecoration = 'none'; $event.target.style.color = 'white';""
          >
            {{ scope.row.fimcodeInfo }}
          </span>
        </template>
</el-table-column>
<!-- <el-table-column prop="
                fimcodeInfo"
                label="FIM Code"
                :width="null"
                sortable
                :min-width="30"> </el-table-column> --> <el-table-column prop="failureNameInfo"
                       label="Failure Text"
                       :width="null"
                       :min-width="85"></el-table-column>
      <el-table-column prop="failureState"
                       label="Failure Status"
                       :width="null"
                       :min-width="45"></el-table-column>
      <el-table-column prop="flightPhase"
                       label="Flight Phase"
                       sortable
                       :width="null"
                       :min-width="35"></el-table-column>
      <el-table-column prop="failureTime"
                       label="Date/Time"
                       sortable
                       :width="null"
                       :min-width="55"></el-table-column>
      <el-table-column prop="fde.FDECode"
                       label="FDE Code"
                       :width="null"
                       :min-width="35"></el-table-column>
      <el-table-column prop="fde.FDEText"
                       label="FDE Text"
                       sortable
                       :width="null"
                       :min-width="60"></el-table-column>
      <el-table-column prop="flightLeg"
                       label="Flight Leg"
                       sortable
                       :width="null"
                       :min-width="35"></el-table-column>
      <el-table-column :width="null"
                       :min-width="5"></el-table-column>
    </el-table>
    <div class="
                table-lower-bar">
      <span class="table-lower-bar-right-text">Number of Failures: {{ existingFailureArray.length }}</span>
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
import { flightPhaseEnum, failureStateEnum } from '@/globals/enums'
import { postFimCodeForURL } from '@/services/centralMaintenance/failureReport';

import qs from 'qs'
export default {
  components: {},
  name: "ExistingFailures",
  data(): {
    existingFailureArray: Array<unknown>,
    interval: NodeJS.Timeout | null,

    loading: boolean
  } {
    return {
      existingFailureArray: [],
      interval: null,
      isPdfPageSelected: false,
      loading: true
    };
  },
  created() {
    this.interval = setInterval(() => {
      this.getfailureArray();
    }, 1000); // 每秒执行一次
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  beforeDestroy() {
    clearInterval(this.interval!);
  },

  methods: {
    /**
 * 本函数用于根据选取行的FIMCode获取对应的手册链接
 * @param {string} fimCode 选中行对应的FIM Code
 */
    findURL(fimCode) {
      const that = this
      this.isPdfPageSelected = true
      let tmp = qs.stringify({
        fimCode: fimCode
      })

      console.log("tmp:", tmp)
      console.log("targetURL is: http://localhost:81/manual/detail?groupNameCode=CES&language=sx_US&model=C919&path=%2FCES-C919-sx_US-2000300%2FDMC-C919-A-52-20-00-A1A-421A-A.XML&issueNumber=R11&publicationId=CES-C919-sx_US-2000300")

      postFimCodeForURL(tmp).then(response => {

        const queryString = response["file_name"];
        console.log("reponse url is", queryString)
        const urlraw = `http://localhost:81/manual/detail?groupNameCode=CES&language=sx_US&model=C919&path=%2FCES-C919-sx_US-2000300%` + queryString + `&issueNumber=R11&publicationId=CES-C919-sx_US-2000300`
        console.log("url raw:", urlraw)
        // const url = decodeURIComponent(urlraw)
        // console.log("url now:", url);

        document.getElementById('iframe').src = urlraw;

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
    /**
     * 本函数用于设置Flight Phase列中flight_phase的显示格式
     * 即将flight_phase原数据对应为state中flightPhaseEnum枚举值
     * @param {*} row table选中行信息
     */
    FlightPhaseData(row: { flightPhase: any; }) {
      let fpIndex = row.flightPhase;
      return flightPhaseEnum[fpIndex];
    },
    /**
     * 本函数用于设置Current State列中failure_state的显示格式
     * 即将failure_state原数据对应为state中failureStateEnum枚举值
     * @param {*} row table选中行信息
     */
    CurrentStateData(row) {
      let fsIndex = row.failure_state;
      return failureStateEnum[fsIndex];
    },
    /**
     * 更新store的选中行数据
     * @param {*} item 选中行数据
     */
    tableRowClicked(item) {
      this.$store.state.failureList.selectedFailureId = item.index;
    },
    /**
     * 本函数用于mounted中，获取state中resFailureData数据，并处理数据，具体有：
     * 唯一化failureName，将相同的failureName合同至一个object，分为parent和children
     * 并将failure_name_info更新为failure_name_info+[count]格式
     * 更新至this.existingFailureArray，用于前端合并数据的展示
     */
    getfailureArray() {
      //深度拷贝，不改变state中resFailureData的原始数据
      const existingFailureOri = this.$store.state.failureList.resFailureData;
      if (existingFailureOri.length !== undefined) {
        let actvExistingFailureOri = existingFailureOri.filter(item => item.failureState === 'ACTV');
        // 创建一个新数组来存放结果
        let mergedArray = actvExistingFailureOri.reduce((acc, curr) => {
          // 检查当前对象是否与已有对象相匹配
          let match = acc.find(item => item.failureNameInfo === curr.failureNameInfo && item.failureTime === curr.failureTime);

          // 如果有匹配的对象，将当前对象添加到匹配对象的children数组中
          if (match) {
            if (!match.children) {
              match.children = [];
            }

            match.children.push({
              ata: "",
              failureNameInfo: "",
              failureState: "",
              failureTime: "",
              fault: "",
              fde: curr.fde,
              fimcodeInfo: "",
              flightLeg: "",
              flightPhase: "",
              id: "",
              index: curr.index,
              maintenceText: curr.maintenceText,
              maintenceTime: curr.maintenceTime
            });
          } else {
            // 如果没有匹配的对象，将当前对象直接添加到结果数组中
            acc.push(curr);
          }
          return acc;
        }, []);
        this.existingFailureArray = mergedArray
      } else {
        this.existingFailureArray = []
      }
    },
    customSortMethodForProgressColumn
  },
  mounted() {
    this.getfailureArray();
    // console.log("existingFailureArray:", this.existingFailureArray);
  },
};
</script>
<style scoped></style>
