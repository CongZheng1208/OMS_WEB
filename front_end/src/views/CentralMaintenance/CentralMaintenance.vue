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
        {
          name: "Extended Functions",
          isActive: false,
          routeName: "ExtendedFunctionsDefault",
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
      this.$store.commit("failureList/failurePhp");
    }
  },

  watch: {
    //监视menus的状态
    //当menus.FailureReport.isActive为true时，以100秒间隔调用getfailureReportPhp函数，更新数据
    menus: {
      handler: function (newValue, oldValue) {
        if (newValue[0].isActive == true) {
          this.FailureReportTimer = setInterval(
            this.getfailureReportPhp,
            1000
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

