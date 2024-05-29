<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Configuration',
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {
    this.$router.push({ "name": "ConfigurationSelection" })
  },
  methods: {}
}
</script>
<style lang="scss" scoped></style>
