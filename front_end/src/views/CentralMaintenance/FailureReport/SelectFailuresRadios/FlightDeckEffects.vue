<template>
  <el-table
    highlight-current-row
    style="width: 100%; background-color: rgb(46, 45, 45); margin-bottom: 1%"
    :data="FDEtable"
    :header-cell-style="{
      background: '#404040',
      color: '#FFFFFF',
      font: '14px',
      'text-align': 'center',
    }"
    :cell-style="{ 'text-align': 'center' }"
    :empty-text="'No Data Display'"
  >
    <el-table-column
      prop="fde"
      label="Alert Code"
      :width="null"
      :min-width="40"
    ></el-table-column>
    <el-table-column
      prop="fde_text"
      label="Text"
      :width="null"
      :min-width="40"
    ></el-table-column>
    <el-table-column
      prop="fde_state"
      label="Status"
      :width="null"
      :min-width="40"
      :formatter="FDEStateData"
    ></el-table-column>
    <el-table-column
      prop="fde_class"
      label="Class"
      :width="null"
      :min-width="40"
      :formatter="FDEClassData"
    ></el-table-column>
    <el-table-column
      prop="fde_time"
      label="Alert Date/Time"
      :width="null"
    ></el-table-column>
  </el-table>
</template>

<script>
import {fdeStatusEnum, fdeClassEnum} from '@/globals/enums.js'

export default {
  name: "FlightDeckEffects",
  data() {
    return {
      selectedData: [],
      FDEtable: [],
    };
  },
  methods: {
    /**
     * 本函数用于设置Class列中fde_class的显示格式
     * 即将fde_class原数据对应为state中fdeClassEnum枚举值
     * @param {*} row table选中行信息
     */
    FDEClassData(row) {
      let fdeCIndex = row.fde_class;
      return fdeClassEnum[fdeCIndex];
    },
    /**
     * 本函数用于设置Status列中fde_state的显示格式
     * 即将fde_state原数据对应为state中fdeStatusEnum枚举值
     * @param {*} row table选中行信息
     */
    FDEStateData(row) {
      let fdeSIndex = row.fde_state;
      return fdeStatusEnum[fdeSIndex];
    },

    /**
     * 本函数用于mounted中，获取state中所选行的selectedFailureId数据，并生FDEtable
     * 将原始数据转化为前端table所需要的array：FDEtable[]
     */
    getFDEData() {

      this.selectedData = [];
      this.FDEtable = [];

      //深度拷贝，不改变state中selectedFailureId的原始数据
      const objSelectedData = JSON.parse(
        JSON.stringify(this.$store.state.failureList.resFailureData.find(obj => obj.id === this.$store.state.failureList.selectedFailureId.toString()))
      );

      this.selectedData.push(objSelectedData);
      console.log("this.selectedData:", this.selectedData);
      //处理数据，生成FDEtable需要的数据
      for (let item of this.selectedData) {
        for (let i = 0; i < item.fde.length; i++) {
          let objFDE = {
            fde: item.fde[i],
            fde_text: item.fde_text[i],
            fde_state: item.fde_state[i],
            fde_class: item.fde_class[i],
            fde_time: item.fde_time[i],
          };
          this.FDEtable.push(objFDE);
        }
      }
      console.log("FDEtable:", this.FDEtable);
    },
  },
  mounted() {
    //调用获取getFDEData的函数
    this.getFDEData();

    // 监听selectedFailureId变化，当变化时重新调用getParameterData函数
    this.$watch('$store.state.failureList.selectedFailureId', (newVal, oldVal) => {
      if (newVal !== oldVal) {
        this.getFDEData();
      }
    });
  },
};
</script>

<style scoped>
</style>
