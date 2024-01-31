<template>
  <div>
    <el-table
      highlight-current-row
      style="width: 100%; background-color: rgb(46, 45, 45)"
      :data="existingFailureArray"
      :sort-method="customSortMethodForProgressColumn"
      :header-cell-style="{
        background: '#404040',
        color: '#FFFFFF',
        font: '14px',
        'text-align': 'center',
      }"
      :cell-style="{ 'text-align': 'center' }"
      :empty-text="'No Data Display'"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @current-change="tableRowClicked"
    >
      <el-table-column :width="null" :min-width="5"></el-table-column>
      <el-table-column
        prop="fimcode_info"
        label="FIM Code"
        sortable
        :width="null"
        :min-width="30"
      ></el-table-column>
      <el-table-column
        prop="failure_name_info"
        label="Failure Name"
        :width="null"
        :min-width="75"
      ></el-table-column>
      <el-table-column
        prop="failure_time"
        label="Date/Time"
        sortable
        :width="null"
        :min-width="55"
      ></el-table-column>
      <el-table-column
        prop="flight_phase"
        label="Flight Phase"
        :width="null"
        :min-width="35"
        :formatter="FlightPhaseData"
      ></el-table-column>
      <el-table-column
        prop="failure_state"
        label="Current State"
        :width="null"
        :min-width="35"
        :formatter="CurrentStateData"
      ></el-table-column>
      <el-table-column
        prop="flight_leg"
        label="Flight Leg"
        sortable
        :width="null"
        :min-width="35"
      ></el-table-column>
      <el-table-column
        prop="fde_text"
        label="FDE Alert Text"
        :width="null"
        :min-width="50"
        :formatter="FDETextData"
      ></el-table-column>

      <el-table-column :width="null" :min-width="5"></el-table-column>
    </el-table>
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
     * 本函数用于设置FDE Alert Text列中fde_text的显示格式
     * 即将fde_text原数据（array）转为string
     * @param {*} row table选中行信息
     */
    FDETextData(row) {
      return JSON.stringify(row.fde_text);
    },
    /**
     * 本函数用于设置Flight Phase列中flight_phase的显示格式
     * 即将flight_phase原数据对应为state中flightPhaseEnum枚举值
     * @param {*} row table选中行信息
     */
    FlightPhaseData(row) {
      let fpIndex = row.flight_phase;
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
      this.$store.state.selectedFailureInfo = item;
      console.log(
        "selectedFailureInfo：",
        this.$store.state.selectedFailureInfo
      );
    },
    /**
     * 本函数用于mounted中，获取state中resFailureData数据，并处理数据，具体有：
     * 唯一化failureName，将相同的failureName合同至一个object，分为parent和children
     * 并将failure_name_info更新为failure_name_info+[count]格式
     * 更新至this.existingFailureArray，用于前端合并数据的展示
     */
    getfailureArray() {
      //深度拷贝，不改变state中resFailureData的原始数据
      const existingFailureOri = JSON.parse(
        JSON.stringify(this.$store.state.resFailureData)
      );
      //处理原始数据，筛选出parentFailure，将其他子成员挂在其名下
      let existingFailureParent = existingFailureOri.filter(
        (existingFailureOri) => existingFailureOri.is_parent == true
      );
      let existingFailureChild = existingFailureOri.filter(
        (existingFailureOri) => existingFailureOri.is_parent == false
      );
      //针对每个Parent，找到child，放到children属性中
      for (let item of existingFailureParent) {
        let tempFailureName = item.failure_name_info;
        let childFailureName = existingFailureChild.filter(
          (existingFailureChild) =>
            existingFailureChild.failure_name_info == tempFailureName
        );

        let childrenFailure = [];
        if (childFailureName.length >= 1) {
          for (let childItem of childFailureName) {
            //将childItem的failure_name_info和fimcode_info设置为''
            childItem.failure_name_info = "";
            childItem.fimcode_info = "";
            childrenFailure.push(childItem);
          }
        }
        item.children = childrenFailure;
      }

      for (let item of existingFailureParent) {
        //更新failure_name_info
        item.failure_name_info =
          item.failure_name_info + " [ " + String(item.count) + " ]";
      }

      this.existingFailureArray = existingFailureParent;
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
