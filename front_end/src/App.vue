<template>
  <div id="app" >
    <Menus :menus="menus"/>
    <router-view />
  </div>
</template>

<script>
import Menus from '@/components/Menus'
import { getConnect } from '@/services/centralMaintenance/groundTest/index.js';

export default {
  name: "App",
  components: {Menus},
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
          name: "Utility",
          isActive: false,
          routeName: "Utility",
        },
      ],
    };
  },
  created() {

    // this.$store.commit("failureList/fdePhp");
    // this.$store.commit("failureList/failurePhp");

    // getConnect().then(response => {
    //   console.log(response)
    // }).catch(error => {
    //   console.error('Error in fetching parameter list:', error);
    // });
  },

  beforeDestroy() {
    // this.$store.dispatch('websocketVuex/closeWebSocket'); // 在组件销毁前关闭 WebSocket 连接
  }
};
</script>

<style>
@import "styles/A661Style.css";
</style>
