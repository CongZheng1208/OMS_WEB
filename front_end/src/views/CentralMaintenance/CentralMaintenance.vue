<template>
  <div class="container-fluid ">
    <Menus :menus="menus"
           class='text-xl' />
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
      FailureReportTimer: "",
      menus: [
        {
          name: "Failure Report",
          isActive: true,
          routeName: "FailureReport",
        },
        {
          name: "Ground Test",
          isActive: false,
          routeName: "GroundTest",
        },
        {
          name: "Configuration",
          isActive: false,
          routeName: "Configuration",
        },
        {
          name: "NVM Data",
          isActive: false,
          routeName: "NVMData",
        },
        {
          name: "Extended Functions",
          isActive: false,
          routeName: "TimeCycles",
        },
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
    //监视menus的状态
    //当menus.FailureReport.isActive为true时，以100秒间隔调用getfailureReportPhp函数，更新数据
    menus: {
      handler: function (newValue) {
        if (newValue[0].isActive == true) {
          this.FailureReportTimer = setInterval(
            this.getfailureReportPhp,
            100000
          )
        } else {
          clearInterval(this.FailureReportTimer)
        }

        if (newValue[1].isActive == true) {
          this.currentGroundTestTimer = setInterval(
            this.getGroundTestPhp,
            1000
          )
        } else {
          clearInterval(this.currentGroundTestTimer)
        }
      },
      deep: true,
      immediate: true,
    },
  },

  mounted() {
    //调用getfailureReportPhp函数，初始化、更新failure数据
    this.getfailureReportPhp();
    this.getGroundTestPhp();
    this.$router.push({ name: "FailureReport" })
  },
};
</script>
<style scoped></style>
