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
  mounted() {
    //深度拷贝，不改变state中selectedFailureInfo的原始数据
    const objSelectedData = JSON.parse(
      JSON.stringify(this.$store.state.selectedFailureInfo)
    );
    this.selectedData.push(objSelectedData);
    console.log("this.selectedData:", this.selectedData);
  },
};
</script>

<style scoped>
</style>
