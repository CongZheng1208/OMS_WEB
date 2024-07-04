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
          realName: "CentralMaintenance",
          routeName: "FailureList",
        },
        {
          name: "Condition Monitoring",
          isActive: false,
          realName: "ConditionMonitoring",
          routeName: "ParameterSelect",
        },
        {
          name: "Data Load",
          isActive: false,
          realName: "DataLoad",
          routeName: "LoadStatus",
        },
        {
          name: "Management",
          isActive: false,
          realName: "Management",
          routeName: "DatabaseManagement",
        }
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
