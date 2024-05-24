<template>
  <div style="height:45vh">
    <el-row>
      <div style="float: left; margin: 15px;  font-weight: bold;"> Count 1: 2024/04/-- --:--:-- Power On </div>
    </el-row>
    <el-row>
      <div v-if="selectedData.length === 0"
           class="content-alert"> NO DATA AVAILABLE </div>
      <div v-else>
        <table class="transparent-table">
          <thead>
            <tr>
              <th v-for="(value, key) in dataArrayHeader[0]"
                  :key="key">{{ key }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataArray"
                :key="index">
              <td>{{ item.FDECode }}</td>
              <td>{{ item.FDEText }}</td>
              <td>{{ item.FDEStatus }}</td>
              <td>{{ item.FDEClass }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-row>
  </div>
</template>
<script>
import { fdeStatusEnum, fdeClassEnum } from '@/globals/enums.js'

export default {
  name: "FlightDeckEffects",
  data() {
    return {
      selectedData: [],
      FDEtable: [],
      dataArrayHeader: [
        { "FDE Code": "", "FDE Test": "", "FDE Status": '', "FDE Class": "" }
      ],
      dataArray: []
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
        JSON.stringify(this.$store.state.failureList.resFailureData.find(obj => obj.index === this.$store.state.failureList.selectedFailureId))
      );

      this.selectedData.push(objSelectedData);
      console.log("this.selectedData:", this.selectedData);

      this.dataArray = [this.selectedData[0].fde]

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
<style scoped></style>
