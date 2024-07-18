<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { handleTestOrder } from '@/utils/utils'
import qs from 'qs'
export default {

  methods: {
    getGroundTestPhp() {
      this.$store.commit("groundTestList/getCurrentTestsPhp");
      this.$store.commit("groundTestList/getAllAtaEquiTestsPhp");
      this.$store.commit("groundTestList/getTextById");
    },
    handleTestOrder,
  },

  beforeDestroy() {
    clearInterval(this.currentGroundTestTimer)
    // let tmp = qs.stringify({
    //   OrderType: "LEAVE",

    //   currentPage: "TestList",
    //   InitiatedTest_Index: "",
    //   MemberSystemID: "",

    //   currentScreenId: "",
    //   selectedOption: "",
    // });

    // this.handleTestOrder(tmp)
  },
  mounted() {
    this.$router.push({ name: "TestList" })

    this.currentGroundTestTimer = setInterval(this.getGroundTestPhp, 1000)
  },
}
</script>
