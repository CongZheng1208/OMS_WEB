<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
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
    })
  },
}
</script>
<style scoped></style>
