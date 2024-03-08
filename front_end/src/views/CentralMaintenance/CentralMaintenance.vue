<template>
  <div class="container-fluid">
    <Menus :menus="menus"/>
    <router-view />
  </div>
</template>

<script>
import Menus from '@/components/Menus'
export default {
  name: "CentralMaintenance",
  components: {Menus},
  data() {
    return {
      FailureReportTimer: "",
      menus: [
        {
          name: "Failure Report",
          isActive: true,
          routeName: "FailureList",
        },
        {
          name: "Ground Test",
          isActive: false,
          routeName: "TestList",
        },
        {
          name: "Configuration",
          isActive: false,
          routeName: "Configuration",
        },
        {
          name: "NVM Data",
          isActive: false,
          routeName: "NVMDataDefault",
        },
        // Extended Functions现在默认选中Time Cycles
        // 后续根据需求再调整
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
     * 本函数用于mounted和menus中：调用store中mutations的failurePhp函数，初始化、更新failure数据
     *
     */
    getfailureReportPhp() {
      this.$store.commit("failureList/fdePhp");
      this.$store.commit("failureList/failurePhp");
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
      },
      deep: true,
      immediate: true,
    },
  },

  mounted () {
    //调用getfailureReportPhp函数，初始化、更新failure数据
    this.getfailureReportPhp()
  },
};
</script>

<style scoped>
</style>

