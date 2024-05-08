<template>
  <el-row v-if="!isPdfPageSelected">
    <el-table
      highlight-current-row
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
      :cell-style="{ 'text-align': 'center' }"
      :empty-text="'No Data Display'"
      @current-change="tableRowClicked"
    >
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
        sortable
        :width="null"
        :min-width="35"
      ></el-table-column>
      <el-table-column
        prop="fde.FDEStatus"
        label="FDE Status"
        sortable
        :width="null"
        :min-width="30"
        :formatter="fdeStatusData"
      ></el-table-column>
      <el-table-column
        prop="fde.FDEClass"
        label="FDE Class"
        sortable
        :width="null"
        :min-width="30"
        :formatter="fdeClassData"
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
        prop="failureState"
        label="State"
        :width="null"
        :min-width="35"
      ></el-table-column>
      <el-table-column
        prop="flightPhase"
        label="Flight Phase"
        sortable
        :width="null"
        :min-width="35"
      ></el-table-column>
    </el-table>
    <div class="table-outer-number">
      Number of Flight Reports: {{ postFlightReportArray.length }}
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

  methods: {
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
      this.postFlightReportArray = postFlightReportOri.filter(item => item.flightLeg === 0);

      console.log("postFlightReportOri is",postFlightReportOri)
      console.log("pfr is:",this.postFlightReportArray)
    },


    customSortMethodForProgressColumn
  },
  created() {
    this.getPostFlightReportArray();
  },
};
</script>

<style scoped>
</style>
