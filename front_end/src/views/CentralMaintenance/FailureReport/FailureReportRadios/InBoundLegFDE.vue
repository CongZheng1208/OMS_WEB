<template>
  <el-row v-if="!isPdfPageSelected"
          style="height: 65vh; border:  0.5px solid rgb(111, 111, 111);">
    <el-table highlight-current-row
              style="width: 100%; background-color: rgb(46, 45, 45);"
              :data="postFlightReportArray"
              :sort-method="customSortMethodForProgressColumn"
              :header-cell-style="{
    background: '#404040',
    color: '#FFFFFF',
    font: '14px',
    'text-align': 'center',
  }"
              height="65vh"
              row-key="index"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              :cell-style="{ 'text-align': 'center' }"
              :empty-text="'NO DATA DISPLAY'"
              @current-change="tableRowClicked"
              v-loading="loading"
              element-loading-text="Data Loading..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.5)">
      <el-table-column :width="null"
                       :min-width="10"></el-table-column>
      <el-table-column prop="FDECode"
                       label="FDE Code"
                       :width="null"
                       :min-width="35"></el-table-column>
      <el-table-column prop="FDEText"
                       label="FDE Test"
                       sortable
                       :width="null"
                       :min-width="35"></el-table-column>
      <el-table-column prop="FDEStatus"
                       label="FDE Status"
                       sortable
                       :width="null"
                       :min-width="30"></el-table-column>
      <el-table-column prop="FDEClass"
                       label="FDE Class"
                       sortable
                       :width="null"
                       :min-width="30"></el-table-column>
      <el-table-column prop="FDETime"
                       label="Date/Time"
                       sortable
                       :width="null"
                       :min-width="40"></el-table-column>
      <el-table-column prop="failureNameInfo"
                       label="Failure Name"
                       :width="null"
                       :min-width="45"></el-table-column>
      <el-table-column prop="failureState"
                       label="State"
                       :width="null"
                       :min-width="35"></el-table-column>
      <el-table-column prop="flightPhase"
                       label="Flight Phase"
                       sortable
                       :width="null"
                       :min-width="35"></el-table-column>
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
            {{ scope.row.fimcodeInfo }}
          </span>
        </template>
</el-table-column>
</el-table>
<div class="
                table-lower-bar">
            <span class="table-lower-bar-right-text"> Number of Flight Reports:
              {{ postFlightReportArray.length }}</span>
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
import { fdeStatusEnum, fdeClassEnum, failureStateEnum, flightPhaseEnum } from '@/globals/enums.js'
import { postFimCodeForURL } from '@/services/centralMaintenance/failureReport';
import { mapState } from 'vuex';
import querystring from 'querystring';
import qs from 'qs'

export default {
  components: {},
  name: "InBoundLegFDE",
  data() {
    return {
      postFlightReportArray: [],
      isPdfPageSelected: false,
      interval: null,
      loading: true
    };
  },
  computed: {
    ...mapState('websocketVuex', ['infoOMD'])
  },
  watch: {
    infoOMD: {
      deep: true,
      handler(newVal, oldVal) {
        // Check if infoOMD has changed
        if (newVal !== oldVal) {
          this.$router.push({ path: newVal.path, query: newVal.query });
        }
      }
    }
  },
  created() {
    this.interval = setInterval(() => {
      this.getPostFlightReportArray();
    }, 1000);
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },

  methods: {
    /**
     * 本函数用于根据选取行的FIMCode获取对应的手册链接
     * @param {string} fimCode 选中行对应的FIM Code
     */
    findURL(fimCode) {
      this.isPdfPageSelected = true
      let tmp = qs.stringify({
        fimCode: fimCode
      })
      postFimCodeForURL(tmp).then(response => {

        const queryString = querystring.stringify(response);
        const url = decodeURIComponent(`http://localhost:8081/MainPage?${queryString}`);
        // console.log(url);

        document.getElementById('iframe').src = url;

      }).catch(error => {
        console.error('Error in Postting pdf url:', error);
      });
    },


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
     * 本函数用于将FDEStatus原数据对应为fdeStatusEnum枚举值
     * @param {*} row table选中行信息
     */
    fdeStatusData(row) {
      let fpIndex = row.fde.FDEStatus;
      return fdeStatusEnum[fpIndex];
    },

    /**
     * 本函数用于将FDEClass原数据对应为state中fdeClassEnum枚举值
     * @param {*} row table选中行信息
     */
    fdeClassData(row) {
      let fpIndex = row.fde.FDEClass;
      return fdeClassEnum[fpIndex];
    },

    /**
     * 本函数用于mounted中，获取state中resFDEData数据, 更新至this.InBoundLegFDEsSumArray, 用于前端数据的展示
     */
    getPostFlightReportArray() {
      //深度拷贝，不改变state中resFailureData的原始数据

      const postFlightReportOri = this.$store.state.failureList.resFailureData;
      const resFDEDataOri = this.$store.state.failureList.resFDEData;

      postFlightReportOri.forEach(item => {
        // 检查对象是否包含fde属性
        if (item.fde && item.fde.FDEClass) {
          // 将fde属性的FDEClass值保存为新属性“FDEClass”
          item.FDEClass = item.fde.FDEClass;
          item.FDECode = item.fde.FDECode;
          item.FDEText = item.fde.FDEText;
          item.FDETime = item.fde.FDETime;

          // 查找resFDEDataOri中属性FDECode等于item.fde.FDECode的对象
          let matchingFDE = resFDEDataOri.find(fdeItem => fdeItem.FDECode === item.fde.FDECode);
          if (matchingFDE) {
            // 设置FDEStatus属性为相应的值
            item.FDEStatus = matchingFDE.FDEStatus;
          } else {
            // 如果找不到匹配的对象，将FDEStatus属性设为空字符串
            item.FDEStatus = "";
          }
        } else {
          item.FDEClass = "";
          item.FDECode = "";
          item.FDEStatus = "";
          item.FDEText = "";
          item.FDETime = "";
        }
      });

      if (postFlightReportOri.length !== undefined) {
        this.postFlightReportArray = postFlightReportOri.filter(item => item.flightLeg === "0" && item.fde.hasOwnProperty('FDEClass'));
      } else {
        this.postFlightReportArray = []
      }

      console.log("未合并之前数据", this.postFlightReportArray)


      this.postFlightReportArray.forEach(item => {
        item.children = [];  // 清空children数据
      })


      // 创建一个新数组来存放结果
      this.postFlightReportArray = this.postFlightReportArray.reduce((acc, curr) => {
        // 检查当前对象是否与已有对象相匹配
        let match = acc.find(item => item.fde.FDECode === curr.fde.FDECode);
        // 如果有匹配的对象，将当前对象添加到匹配对象的children数组中
        if (match) {
          if (!match.children) {
            match.children = [];
          }
          match.children.push({
            FDEClass: "",
            FDECode: "",
            FDEStatus: "",
            FDEText: "",
            FDETime: "",
            ata: "",
            failureNameInfo: curr.failureNameInfo,
            failureState: curr.failureState,
            failureTime: "",
            fault: "",
            fde: "",
            fimcodeInfo: curr.fimcodeInfo,
            flightLeg: "",
            flightPhase: curr.flightPhase,
            id: curr.id,
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

      this.postFlightReportArray = mergedArray

    },
    customSortMethodForProgressColumn
  },
};
</script>
<style scoped></style>
