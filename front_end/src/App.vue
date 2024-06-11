<template>
  <div id="app">
    <Menus :menus="menus" />
    <router-view />
  </div>
</template>
<script lang="ts">
import Menus from '@/components/Menus/index.vue'

export default {
  name: "App",
  components: { Menus },
  data() {
    return {
      menus: [
        {
          name: "Central Maintenance",
          isActive: true,
          routeName: "CentralMaintenance",
        },
        {
          name: "Condition Monitoring",
          isActive: false,
          routeName: "ConditionMonitoring",
        },
        {
          name: "Data Load",
          isActive: false,
          routeName: "DataLoad",
        },
        {
          name: "Management",
          isActive: false,
          routeName: "Management",
        },
      ],
    };
  },
  created() {
  },

  beforeDestroy() {
  }
};
</script>
<style>
@import "styles/A661Style.css";
</style>
