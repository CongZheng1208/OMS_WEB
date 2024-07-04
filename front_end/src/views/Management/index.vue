<template>
  <div class="container-fluid">
    <Menus :menus="menus" />
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
          name: "Database Management",
          isActive: true,
          realName: "",
          routeName: "DatabaseManagement",
        },
        {
          name: "Air-ground Data Managemant",
          isActive: false,
          routeName: "AirGroundDataManagement",
        },
        {
          name: "User Operation Log",
          isActive: false,
          routeName: "UserOperationLog",
        },
        {
          name: "Account Management",
          isActive: false,
          routeName: "AccountManagement",
        },
      ],
    };
  },

  mounted() {
    this.$router.replace({ name: 'DatabaseManagement' })
  },
};
</script>
