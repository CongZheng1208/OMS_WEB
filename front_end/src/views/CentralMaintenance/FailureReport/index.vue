<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
export default {
  name: 'FailureReport',
  data() {
    return {
      FailureReportTimer: "",
    }
  },
  methods: {
    getfailureReportPhp() {
      this.$store.commit("failureList/fdePhp");
      this.$store.commit("failureList/failurePhp");
    },
  },
  mounted() {
    this.$router.push({
      name: 'FailureList',
      replace: true
    })
    // this.getfailureReportPhp()
    this.FailureReportTimer = setInterval(this.getfailureReportPhp, 1000)
  },

  beforeDestroy() {
    clearInterval(this.FailureReportTimer)
  },
}
</script>
<style scoped></style>
