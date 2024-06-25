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
    }
  },
  methods: {
  },
  mounted() {
    this.$router.push({
      name: 'FailureList',
      replace: true
    })
  },
}
</script>
<style scoped></style>
