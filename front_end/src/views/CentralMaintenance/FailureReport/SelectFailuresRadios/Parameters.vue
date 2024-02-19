<template>
  <div>
    <el-row>
      <el-table
        highlight-current-row
        style="
          width: 100%;
          background-color: rgb(46, 45, 45);
          margin-bottom: 1%;
        "
        :data="parameterTable"
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
          prop="rp_name"
          label="Parameter"
          :min-width="40"
        ></el-table-column>
        <el-table-column
          prop="rp_value"
          label="Value"
          :min-width="40"
        ></el-table-column>
        <el-table-column
          prop="rp_unit"
          label="Unit"
          :min-width="40"
        ></el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <div
        style="
          float: left;
          margin-left: 15px;
          margin-top: 15px;
          margin-bottom: 15px;
        "
      >
        Parameter Recorded at the time of Occurency
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Parameters",
  data() {
    return {
      selectedData: [],
      parameterTable: [],
    };
  },
  methods: {
    /**
     * 本函数用于mounted中，获取state中所选行的selectedFailureId数据，并生parameterTable
     * 将原始数据转化为前端table所需要的array：parameterTable[]
     */
    getParameterData() {

      this.selectedData = [];
      this.parameterTable = [];

      //深度拷贝，不改变state中selectedFailureId的原始数据
      const objSelectedData = JSON.parse(
        JSON.stringify(this.$store.state.failureList.resFailureData.find(obj => obj.id === this.$store.state.failureList.selectedFailureId.toString()))
      );

      this.selectedData.push(objSelectedData);
      //处理数据，生成parameterTable需要的数据
      for (let item of this.selectedData) {
        for (let i = 0; i < item.rp_name.length; i++) {
          let objParameter = {
            rp_name: item.rp_name[i],
            rp_value: item.rp_value[i],
            rp_unit: item.rp_unit[i],
          };
          this.parameterTable.push(objParameter);
        }
      }
      console.log("parameterTable:", this.parameterTable);
    },
  },
  mounted() {
    //调用获取getParameterData的函数
    this.getParameterData();

    // 监听selectedFailureId变化，当变化时重新调用getParameterData函数
    this.$watch('$store.state.failureList.selectedFailureId', (newVal, oldVal) => {
      if (newVal !== oldVal) {
        this.getParameterData();
      }
    });
  },
};
</script>

<style scoped>
</style>
