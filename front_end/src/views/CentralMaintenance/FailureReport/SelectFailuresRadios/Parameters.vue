<template>
  <div style="height:45vh">
    <el-row>
      <div style="float: left; margin: 15px;  font-weight: bold;"> Count 1: 2024/04/-- --:--:-- Power On </div>
    </el-row>
    <el-row>
      <div v-if="dataArray.length === 0"
           class="content-alert"> NO DATA AVAILABLE </div>
      <div v-else>
        <table class="transparent-table">
          <thead>
            <tr>
              <th v-for="(value, key) in dataArray[0]"
                  :key="key">{{ key }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataArray"
                :key="index">
              <td v-for="(value, key) in item"
                  :key="key">{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-row>
    <div class="table-outer-note"> Parameter Recorded at the time of Occurency </div>
  </div>
</template>
<script>
export default {
  name: "Parameters",
  data() {
    return {
      selectedData: [],
      dataArrayHeader: [
        { "Parameter": "", "Value": '', "Units": "" }
      ],
      dataArray: [
      ]
    };
  },
  methods: {
    /**
     * 本函数用于mounted中，获取state中所选行的selectedFailureId数据，并生dataArray
     */
    getParameterData() {

      this.selectedData = [];
      this.parameterTable = [];

      //深度拷贝，不改变state中selectedFailureId的原始数据
      const objSelectedData = JSON.parse(
        JSON.stringify(this.$store.state.failureList.resFailureData.find(obj => obj.index === this.$store.state.failureList.selectedFailureId))
      );

      this.selectedData.push(objSelectedData);

      // if (this.selectedData.length == 0) {
      //   this.dataArray = []
      // } else {
      //   this.dataArray = this.selectedData[0].rp
      // }

      this.dataArray = []
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
<style scoped></style>
