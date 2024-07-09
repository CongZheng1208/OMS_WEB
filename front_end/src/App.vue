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
      FailureReportTimer: "",
      currentGroundTestTimer: "",
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
  methods: {
    /**
     * 本函数用于mounted和menus中：调用store中mutations的failurePhp\fdePhp函数，初始化、更新failure\FDE数据
     *
     */
    getfailureReportPhp() {
      this.$store.commit("failureList/fdePhp");
      this.$store.commit("failureList/failurePhp");
    },

    /**
     * 本函数用于mounted和menus中：调用store中mutations的getCurrentTestsPhp\getAllAtaEquiTestsPhp函数，初始化、更新ata/equi/test数据
     *
     */
    getGroundTestPhp() {
      this.$store.commit("groundTestList/getCurrentTestsPhp");
      this.$store.commit("groundTestList/getAllAtaEquiTestsPhp");
      this.$store.commit("groundTestList/getTextById");
    }

  },

  watch: {
    '$route'(to, from) {
      if (from.path.startsWith('/centralMaintenance') && !to.path.startsWith('/centralMaintenance')) {
        clearInterval(this.FailureReportTimer)
        clearInterval(this.currentGroundTestTimer)
      }

      console.log("to.path:", to.path)
      if (to.path === '/centralMaintenance/failureReport/failureList') {
        this.FailureReportTimer = setInterval(this.getfailureReportPhp, 1000)
      } else {
        clearInterval(this.FailureReportTimer)
      }

      if (to.path === '/centralMaintenance/groundTest/testList') {
        this.currentGroundTestTimer = setInterval(this.getGroundTestPhp, 1000)
      } else {
        clearInterval(this.currentGroundTestTimer)
      }
    }

  },
  created() {
  },

  beforeDestroy() {
  },
  mounted() {
    //调用getfailureReportPhp函数，初始化、更新failure数据
    this.getfailureReportPhp();
    this.getGroundTestPhp();
  },
};
</script>
<style>
@import "styles/A661Style.css";
</style>
