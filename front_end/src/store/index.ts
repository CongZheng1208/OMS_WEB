// 引入定义好的模块
import failureList from "./modules/centralMaintenance/failureList.js";
import groundTestList from "./modules/centralMaintenance/groundTestList.js";
import websocketVuex from "./modules/centralMaintenance/websocketVuex.js";

// 引入vue
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  // 模块化
  modules: {
    failureList,
    groundTestList,
    websocketVuex,
  },
});
