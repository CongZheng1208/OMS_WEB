<template>
  <div class="container-fluid">
    <Menus :menus="menus"/>
    <router-view />
  </div>
</template>

<script>
import Menus from '@/components/Menus'
export default {
  name: "ConditionMonitoring",
  components: {Menus},
  data() {
    return {
      menus: [
        {
          name: "Parameter Display",
          isActive: true,
          routeName: "ParameterSelect",
        },
        {
          name: "Parameter Recording",
          isActive: false,
          routeName: "ParameterRecording",
        },
        {
          name: "Event Monitoring",
          isActive: false,
          routeName: "EventMonitoring",
        },
      ],
    };
  }
};
</script>

<style scoped>
</style>

