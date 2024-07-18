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
        },
        {
          name: "Logout",
          isActive: false,
          realName: "Logout",
          routeName: "Logout",
        }
      ],
    };
  },
  methods: {

  },

  watch: {
    '$route'(to, from) {

      if (to.path === '/dataLoad/targetLoad/loadStatus') {
        window.location.href = 'http://192.168.1.147:8080/date-load/target-load';
      }

      if (to.path === '/management/databaseManagement') {
        window.location.href = 'http://192.168.1.147:8080/management/database-management/file-import';
      }
    }

  },
  created() {
  },

  beforeDestroy() {
  },
  mounted() {
    //调用getfailureReportPhp函数，初始化、更新failure数据
    // this.getfailureReportPhp();
    // this.getGroundTestPhp();
  },
};
</script>
<style>
@import "styles/A661Style.css";
</style>
