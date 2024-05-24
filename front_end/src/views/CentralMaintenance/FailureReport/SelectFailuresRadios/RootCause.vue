<template>
  <div style="height:45vh">
    <el-row>
      <div style="float: left; margin: 15px;  font-weight: bold;"> Count 1: 2024/04/-- --:--:-- Power On </div>
    </el-row>
    <el-row>
      <div v-if="selectedData.length === 0"
           class="content-alert"> NO DATA AVAILABLE </div>
      <div v-else>
        <table class="transparent-table"
               show-empty
               empty-text="NO DATA AVAILABLE">
          <thead>
            <tr>
              <th v-for="(value, key) in dataArrayHeader[0]"
                  :key="key">{{ key }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataArray"
                :key="index">
              <td>{{ item.fault_name }}</td>
              <td>{{ item.fault_state }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "RootCause",
  data() {
    return {
      selectedData: [],
      dataArrayHeader: [
        { "Fault Name": "", "Fault Status": '' }
      ],

      dataArray: [
        { "Fault Name": "", "Fault Status": '' }
      ]
    };
  },
  methods: {
    /**
     * 本函数用于mounted中，获取state中所选行的selectedFailureId数据，并生parameterTable
     * 将原始数据转化为前端table所需要的array：parameterTable[]
     */
    getRootCauseData() {

      this.selectedData = [];

      //深度拷贝，不改变state中selectedFailureId的原始数据
      const objSelectedData = JSON.parse(
        JSON.stringify(this.$store.state.failureList.resFailureData.find(obj => obj.index === this.$store.state.failureList.selectedFailureId))
      );
      this.selectedData.push(objSelectedData);
      //console.log("this.selectedData in root:", this.selectedData);

      this.dataArray = this.selectedData[0].fault
    },
  },

  mounted() {
    this.getRootCauseData();


    // 监听selectedFailureId变化，当变化时重新调用getParameterData函数
    this.$watch('$store.state.failureList.selectedFailureId', (newVal, oldVal) => {
      if (newVal !== oldVal) {
        this.getRootCauseData();
      }
    });
  },
};
</script>
<style scoped></style>
