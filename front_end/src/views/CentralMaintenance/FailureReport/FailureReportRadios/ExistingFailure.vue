<template>
  <el-row style="height: 70vh; border:  0.5px solid rgb(111, 111, 111);">
    <el-table highlight-current-row
              style="width: 100%;background-color: rgb(46, 45, 45)"
              :data="existingFailureArray"
              :sort-method="customSortMethodForProgressColumn"
              :header-cell-style="{
                background: '#404040',
                color: '#FFFFFF',
                font: '14px',
                'text-align': 'center',
              }"
              height="70vh"
              :cell-style="{ 'text-align': 'center' }"
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
                       :width="null"
                       sortable
                       :min-width="30"> </el-table-column>
      <el-table-column prop="failureNameInfo"
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
    <div class="table-outer-number">Number of Failures: {{ existingFailureArray.length }}</div>
  </el-row>
</template>
<script>
import { customSortMethodForProgressColumn } from '@/utils/utils.ts'
import { flightPhaseEnum, failureStateEnum } from '@/globals/enums.js'
export default {
  components: {},
  name: "ExistingFailures",
  data() {
    return {
      existingFailureArray: [],
      interval: null,
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
    clearInterval(this.interval);
  },

  methods: {
    /**
     * 本函数用于设置Flight Phase列中flight_phase的显示格式
     * 即将flight_phase原数据对应为state中flightPhaseEnum枚举值
     * @param {*} row table选中行信息
     */
    FlightPhaseData(row) {

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
    console.log("existingFailureArray:", this.existingFailureArray);
  },
};
</script>
<style scoped></style>
