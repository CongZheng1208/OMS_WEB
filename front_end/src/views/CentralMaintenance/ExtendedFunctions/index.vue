<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ExtendedFunctions',
  components: {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {
    this.$router.push({ "name": 'TimeCycles' });
  },
};
</script>
<style scoped></style>
