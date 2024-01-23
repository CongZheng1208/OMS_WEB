<template>
  <div id="InBoundLegFailures">
    <all-view v-if="isAll" />
    <summary-view v-if="!isAll" />
  </div>
</template>

<script>
import allView from "./InBoundLegFailuresAll";
import SummaryView from "./InBoundLegFailuresSum";
export default {
  components: { allView, SummaryView },
  name: "InBoundLegFailures",
  props: {
    isAll: Boolean,
  },
};
</script>

<style scoped>
</style>
