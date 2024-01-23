<template>
  <div>
    <el-table
      highlight-current-row
      style="width: 100%; background-color: rgb(46, 45, 45)"
      :data="InBoundLegFailuresSumArray"
      :sort-method="customSortMethodForProgressColumn"
      :header-cell-style="{
        background: '#404040',
        color: '#FFFFFF',
        font: '14px',
        'text-align': 'center',
      }"
      :cell-style="{ 'text-align': 'center' }"
      :empty-text="'No Data Display'"
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
        prop="first_time"
        label="First Date/Time"
        sortable
        :width="null"
        :min-width="55"
      ></el-table-column>
      <el-table-column
        prop="last_time"
        label="Last Date/Time"
        sortable
        :width="null"
        :min-width="35"
      ></el-table-column>
      <el-table-column
        prop="count"
        label="count"
        :width="null"
        :min-width="35"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  components: {},
  name: "InBoundLegFailuresSum",
  data() {
    return {
      InBoundLegFailuresSumArray: [],
    };
  },

  methods: {
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
     * 本函数用于根据排序对象确定排序逻辑
     * @param {number/string} a - 排序对象1
     * @param {number/string} b - 排序对象2
     * @returns {number/string} 排序逻辑
     */
    customSortMethodForProgressColumn(a, b) {
      // 判断a和b的类型
      if (typeof a === "string" && typeof b === "string") {
        // 字符串类型，使用localeCompare进行字典序排序
        return a.localeCompare(b);
      } else {
        // 数字类型，根据数值大小排序
        return a - b;
      }
    },

    /**
     * 本函数用于mounted中，获取state中resFailureData数据，并处理数据，具体有：
     * 筛选原数据中flight_leg为0的数据，
     * 更新至this.InBoundLegFailuresSumArray，用于前端数据的展示
     */
    getInboundLegFailureSumArray() {
      //深度拷贝，不改变state中resFailureData的原始数据
      const existingFailureOri = JSON.parse(
        JSON.stringify(this.$store.state.resFailureData)
      );
      let existingFailurefl_0 = existingFailureOri.filter(
        (existingFailureOri) => existingFailureOri.flight_leg == 0
      );
      //处理原始数据，筛选出parentFailure
      this.InBoundLegFailuresSumArray = existingFailurefl_0.filter(
        (existingFailurefl_0) => existingFailurefl_0.is_parent == true
      );
      console.log(
        "this.InBoundLegFailuresSumArray:",
        this.InBoundLegFailuresSumArray
      );
    },
  },
  mounted() {
    this.getInboundLegFailureSumArray();
  },
};
</script>

<style scoped>
</style>
