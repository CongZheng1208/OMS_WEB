<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
import { handleTestOrder } from '@/utils/utils'
import qs from 'qs'
export default {

  methods: {
    handleTestOrder,
  },

  beforeDestroy() {
    let tmp = qs.stringify({
      OrderType: "LEAVE",

      currentPage: "TestList",
      InitiatedTest_Index: "",
      MemberSystemID: "",

      currentScreenId: "",
      selectedOption: "",
    });

    this.handleTestOrder(tmp)
  }

}
</script>
