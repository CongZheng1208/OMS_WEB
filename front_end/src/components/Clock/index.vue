<template>
  <div class="col status-bar">
    A/C Reg: {{ acReg }} <br>
    {{currentDate}} {{ currentTime }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      acReg: "C-WXWB",
    }
  },
  computed: {
    currentTime() {
      return this.$store.state.groundTestList.currentTime;
    },
    currentDate() {
      return this.$store.state.groundTestList.currentDate;
    },
  },
  created() {
    this.startClock();
  },
  methods: {
    startClock() {
      setInterval(() => {
        this.updateTime();
      }, 1000);
    },
    updateTime() {
      const now = new Date();
      this.$store.commit('groundTestList/updateCurrentTime', now);
    }
  }
};
</script>
