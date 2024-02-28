<template>
  <div>
    <el-table
      highlight-current-row
      style="width: 100%; background-color: rgb(46, 45, 45)"
      :data="inboundLegFDEArray"
      :sort-method="customSortMethodForProgressColumn"
      :header-cell-style="{
        background: '#404040',
        color: '#FFFFFF',
        font: '14px',
        'text-align': 'center',
      }"
      row-key="index"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :cell-style="{ 'text-align': 'center' }"
      :empty-text="'No Data Display'"
      @current-change="tableRowClicked"
    >
      <el-table-column :width="null" :min-width="10"></el-table-column>
      <el-table-column
        prop="FDECode"
        label="FDE Code"
        sortable
        :width="null"
        :min-width="35"
      ></el-table-column>
      <el-table-column
        prop="FDEText"
        label="FDE Test"
        :width="null"
        :min-width="35"
      ></el-table-column>
      <el-table-column
        prop="FDEStatus"
        label="First Status"
        :width="null"
        :min-width="30"
        :formatter="fdeStatusData"
      ></el-table-column>
      <el-table-column
        prop="FDEClass"
        label="FDE Class"
        :width="null"
        :min-width="30"
        :formatter="fdeClassData"
      ></el-table-column>
      <el-table-column
        prop="fde_time"
        label="Date/Time"
        sortable
        :width="null"
        :min-width="40"
      ></el-table-column>
      <el-table-column
        prop="FIMCode_info"
        label="FIM Code"
        sortable
        :width="null"
        :min-width="35"
      >
        <template slot-scope="scope">
          <span
            @click="findURL(scope.row.FIMCode_info[0])"
            :style="{ padding: '1vh', height: '4vh', width: '4vh', color: 'white'}"
            style="transition: color 0.3s;"
            @mouseenter="$event.target.style.textDecoration = 'underline'; $event.target.style.color = 'rgb(200, 200, 200)';"
            @mouseleave="$event.target.style.textDecoration = 'none'; $event.target.style.color = 'white';"
            v-on:click="findURL(scope.row.FIMCode_info[0])"
          >
            {{ scope.row.FIMCode_info[0] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="failure_name_info"
        label="Failure Name"
        :width="null"
        :min-width="40"
      ></el-table-column>
      <el-table-column
        prop="failure_state"
        label="State"
        :width="null"
        :min-width="35"
        :formatter="failureStateData"
      ></el-table-column>
      <el-table-column
        prop="flight_phase"
        label="Flight Phase"
        :width="null"
        :min-width="35"
        :formatter="flightPhaseData"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {customSortMethodForProgressColumn} from '@/utils/utils.js'
import {fdeStatusEnum, fdeClassEnum, failureStateEnum, flightPhaseEnum} from '@/globals/enums.js'

export default {
  components: {},
  name: "InBoundLegFDE",
  data() {
    return {
      inboundLegFDEArray: [],
    };
  },

  methods: {
    /**
     * 更新store的选中行数据
     * @param {*} item 选中行数据
     */
    tableRowClicked(item) {
      this.$store.state.failureList.selectedFailureId = item.id[0];
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
      let fpIndex = row.FDEStatus;
      return fdeStatusEnum[fpIndex];
    },

    /**
     * 本函数用于将FDEClass原数据对应为state中fdeClassEnum枚举值
     * @param {*} row table选中行信息
     */
     fdeClassData(row) {
      let fpIndex = row.FDEClass;
      return fdeClassEnum[fpIndex];
    },

    /**
     * 本函数用于将failure_state原数据对应为state中failureStateEnum枚举值
     * @param {*} row table选中行信息
     */
     failureStateData(row) {
      let fpIndex = row.failure_state[0];
      return failureStateEnum[fpIndex];
    },

    /**
     * 本函数用于将flight_phase原数据对应为state中flightPhaseEnum枚举值
     * @param {*} row table选中行信息
     */
     flightPhaseData(row) {
      let fpIndex = row.flight_phase[0];
      return flightPhaseEnum[fpIndex];
    },

    /**
     * 本函数用于mounted中，获取state中resFDEData数据, 更新至this.InBoundLegFDEsSumArray, 用于前端数据的展示
     */
     getInboundLegFDEArray() {
      //深度拷贝，不改变state中resFailureData的原始数据
      let inboundLegFDEOri = JSON.parse(
        JSON.stringify(this.$store.state.failureList.resFDEData)
      );
      //处理原始数据，筛选出parentFailure，将其他子成员挂在其名下
      let inboundLegFDEParent = inboundLegFDEOri.filter(
        (inboundLegFDEOri) => inboundLegFDEOri.is_parent == true
      );
      let inboundLegFDEChild = inboundLegFDEOri.filter(
        (inboundLegFDEOri) => inboundLegFDEOri.is_parent == false
      );
      //针对每个Parent，找到child，放到children属性中
      for (let item of inboundLegFDEParent) {
        let tempFDEText = item.FDEText;
        let childFailureName = inboundLegFDEChild.filter(
          (inboundLegFDEChild) =>
          inboundLegFDEChild.FDEText == tempFDEText
        );

        let childrenFDE = [];
        if (childFailureName.length >= 1) {
          for (let childItem of childFailureName) {
            //将childItem的自身属性设置为''
            childItem.FDEClass = "";
            childItem.FDECode = "";
            childItem.FDEStatus = "";
            childItem.FDEText = "";
            childrenFDE.push(childItem);
          }
        }
        item.children = childrenFDE;
      }

      for (let item of inboundLegFDEParent) {
        //更新failure_name_info
        item.FDEText =
          item.FDEText + " [ " + String(item.count) + " ]";
      }

      this.inboundLegFDEArray = inboundLegFDEParent;
      console.log("check it", this.inboundLegFDEArray)
    },


    customSortMethodForProgressColumn
  },
  created() {
    this.getInboundLegFDEArray();
  },
};
</script>

<style scoped>
</style>
