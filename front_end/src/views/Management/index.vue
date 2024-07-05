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
          realName: "DatabaseManagement",
          routeName: "DatabaseManagement",
        },
        {
          name: "Air-ground Data Managemant",
          isActive: false,
          realName: "AirGroundDataManagement",
          routeName: "AirGroundDataManagement",
        },
        {
          name: "User Operation Log",
          isActive: false,
          realName: "UserOperationLog",
          routeName: "UserOperationLog",
        },
        {
          name: "Account Management",
          isActive: false,
          realName: "AccountManagement",
          routeName: "AccountManagement",
        },
      ],
    };
  },

  mounted() {
    this.$router.push({ name: 'DatabaseManagement' })
  },
};
</script>
