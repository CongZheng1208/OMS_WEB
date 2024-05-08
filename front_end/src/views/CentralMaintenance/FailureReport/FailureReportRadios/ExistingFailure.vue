<template>
  <div style="height: 60vh">
    <el-table
      highlight-current-row
      style="width: 100%;background-color: rgb(46, 45, 45)"
      :data="existingFailureArray"
      :sort-method="customSortMethodForProgressColumn"
      :header-cell-style="{
        background: '#404040',
        color: '#FFFFFF',
        font: '14px',
        'text-align': 'center',
      }"
      height="65vh"
      :cell-style="{ 'text-align': 'center' }"
      :empty-text="'No Data Display'"
      row-key="index"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @current-change="tableRowClicked"
    >
      <el-table-column :width="null" :min-width="10"></el-table-column>
      <el-table-column
        prop="fimcodeInfo"
        label="FIM Code"
        :width="null"
        sortable
        :min-width="30"
      > </el-table-column>
      <el-table-column
        prop="failureNameInfo"
        label="Failure Text"
        :width="null"
        :min-width="85"
      ></el-table-column>
      <el-table-column
        prop="failureState"
        label="Failure Status"
        :width="null"
        :min-width="45"
      ></el-table-column>
      <el-table-column
        prop="flightPhase"
        label="Flight Phase"
        sortable
        :width="null"
        :min-width="35"
      ></el-table-column>
      <el-table-column
        prop="failureTime"
        label="Date/Time"
        sortable
        :width="null"
        :min-width="55"
      ></el-table-column>
      <el-table-column
        prop="fde.FDECode"
        label="FDE Code"
        :width="null"
        :min-width="35"
      ></el-table-column>
      <el-table-column
        prop="fde.FDEText"
        label="FDE Text"
        sortable
        :width="null"
        :min-width="60"
      ></el-table-column>
      <el-table-column
        prop="flightLeg"
        label="Flight Leg"
        sortable
        :width="null"
        :min-width="35"
      ></el-table-column>
      <el-table-column :width="null" :min-width="5"></el-table-column>
    </el-table>
    <div class="table-outer-number">
      Number of Failures: {{ existingFailureArray.length }}
    </div>
  </div>
</template>

<script>
import {customSortMethodForProgressColumn} from '@/utils/utils.js'
import {flightPhaseEnum, failureStateEnum} from '@/globals/enums.js'
export default {
  components: {},
  name: "ExistingFailures",
  data() {
    return {
      existingFailureArray: [],
    };
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
      this.existingFailureArray = existingFailureOri.filter(item => item.failureState === 'ACTV');



      // //处理原始数据，筛选出parentFailure，将其他子成员挂在其名下
      // let existingFailureParent = existingFailureOri.filter(
      //   (existingFailureOri) => existingFailureOri.is_parent == true
      // );

      // let existingFailureChild = existingFailureOri.filter(
      //   (existingFailureOri) => existingFailureOri.is_parent == false
      // );

      // //针对每个Parent，找到child，放到children属性中
      // for (let item of existingFailureParent) {
      //   let tempFailureName = item.failure_name_info;
      //   let childFailureName = existingFailureChild.filter(
      //     (existingFailureChild) =>
      //       existingFailureChild.failure_name_info == tempFailureName
      //   );

      //   let childrenFailure = [];
      //   if (childFailureName.length >= 1) {
      //     for (let childItem of childFailureName) {
      //       //将childItem的failure_name_info和fimcode_info设置为''
      //       childItem.failure_name_info = "";
      //       childItem.fimcode_info = "";
      //       childrenFailure.push(childItem);
      //     }
      //   }
      //   item.children = childrenFailure;
      // }

      // for (let item of existingFailureOri) {
      //   //更新failure_name_info
      //   item.failureNameInfo = item.failureNameInfo + " [ " + String(item.count) + " ]";
      // }

      // this.existingFailureArray = existingFailureOri;
    },
    customSortMethodForProgressColumn
  },
  mounted() {
    this.getfailureArray();
    console.log("existingFailureArray:", this.existingFailureArray);
  },
};
</script>

<style scoped>
</style>
