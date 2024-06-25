<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">

export default {
  name: 'NVMData',
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
  },
  created() {
  },
  mounted() {
    this.$router.push({ name: "NVMDataDefault" })
  }
}
</script>
