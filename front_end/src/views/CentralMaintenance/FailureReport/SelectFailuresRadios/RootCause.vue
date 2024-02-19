<template>
  <div style="float: left">
    <div v-for="item in selectedData" :key="item.id">
      <div v-for="(list, index) in item.fault_name" :key="index">
        <br />
        <div style="text-align: left; margin-left: 15px">
          {{ list }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RootCause",
  data() {
    return {
      selectedData: [],
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
        JSON.stringify(this.$store.state.failureList.resFailureData.find(obj => obj.id === this.$store.state.failureList.selectedFailureId.toString()))
      );
      this.selectedData.push(objSelectedData);
      console.log("this.selectedData:", this.selectedData);
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

<style scoped>
</style>
