<template>
  <div id="InBoundLegFailures">
    <all-view v-if="isAll" />
    <summary-view v-else />
  </div>
</template>

<script>
import allView from "./InBoundLegFailures/InBoundLegFailuresAll";
import SummaryView from "./InBoundLegFailures/InBoundLegFailuresSum";
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
