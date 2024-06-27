<template>
  <div class="container-fluid">
    <Menus :menus="menus"
           class='text-l' />
    <router-view />
  </div>
</template>
<script lang="ts">
import Menus from '@/components/SubMenus/index.vue'
export default {
  name: "ConditionMonitoring",
  components: { Menus },
  data() {
    return {
      menus: [
        {
          name: "Parameter Display",
          isActive: true,
          routeName: "ParameterSelect",
        },
        // {
        //   name: "Parameter Recording",
        //   isActive: false,
        //   routeName: "ParameterRecording",
        // },
        {
          name: "Event Monitoring",
          isActive: false,
          routeName: "EventDisplay",
        },
      ],
    };
  },
  mounted() {
    this.$router.push({ name: "ParameterSelect" });
  },
  methods: {},
};
</script>
<style scoped></style>
