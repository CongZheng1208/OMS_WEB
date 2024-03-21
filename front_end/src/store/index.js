// 引入定义好的模块
import failureList from './modules/centralMaintenance/failureList'
import groundTestList from './modules/centralMaintenance/groundTestList'
import websocketVuex from './modules/centralMaintenance/websocketVuex'

// 引入vue
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({
  // 模块化
  modules: {
    failureList,
    groundTestList,
    websocketVuex
  }
})
