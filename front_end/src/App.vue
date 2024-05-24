<template>
  <div id="app">
    <Menus :menus="menus" />
    <router-view />
  </div>
</template>
<script lang="ts">
import Menus from '@/components/Menus/index.vue'
import { getConnect } from '@/services/centralMaintenance/groundTest/index.js';

export default {
  name: "App",
  components: { Menus },
  data() {
    return {
      menus: [
        {
          name: "Central Maintenance",
          isActive: true,
          routeName: "FailureList",
        },
        {
          name: "Condition Monitoring",
          isActive: false,
          routeName: "ParameterSelect",
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
