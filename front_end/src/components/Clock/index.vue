<template>
  <div class="col status-bar"
       style="margin-top: 2vh; font-weight: bold;"> A/C Reg: {{ acReg }} <br>
  </div>
</template>
<script lang="ts">
export default {
  data() {
    return {
      acReg: "C-WXWB",
    }
  },
  computed: {
    currentTime(): string {
      return this.$store.state.groundTestList.currentTime;
    },
    currentDate(): string {
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
