<template>
  <div class="container-fluid ">
    <Menus :menus="menus"
           class=”text-l“ />
    <router-view />
  </div>
</template>
<script lang="ts">
import Menus from '@/components/SubMenus/index.vue'
export default {
  name: "CentralMaintenance",
  components: { Menus },
  data() {
    return {
      menus: [
        {
          name: "Failure Report",
          isActive: true,
          realName: "FailureReport",
          routeName: "FailureList",
        },
        {
          name: "Ground Test",
          isActive: false,
          realName: "GroundTest",
          routeName: "TestList",
        },
        {
          name: "Configuration",
          isActive: false,
          realName: "Configuration",
          routeName: "ConfigurationSelection",
        },
        {
          name: "NVM Data",
          isActive: false,
          realName: "NVMData",
          routeName: "NVMDataDefault",
        },
        {
          name: "Extended Functions",
          isActive: false,
          realName: "ExtendedFunctionsDefault",
          routeName: "TimeCycles",
        },
      ],
    };
  },
};
</script>
<style scoped></style>
