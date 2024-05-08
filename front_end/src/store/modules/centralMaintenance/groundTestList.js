// Vuex模块化
// GroundTest下的data
import { getCurrentTests,getAllAtaEquiTests } from '@/services/centralMaintenance/groundTest/index.js';
import qs from 'qs'

export default{
  namespaced: true,
  state: {
    currentGroundTest: {},
    currentGroundTestID: '',


    ataAndEquiArray: [],
    currentActiveGroundTests: [],

    currentGroundTestTimer: '',

    acReg: "C-WXWB",
    currentTime: new Date().toLocaleTimeString(),
    currentDate: new Date().toLocaleDateString(),
  },
  mutations: {

    /**
     * 本函数用于调用service服务中的getCurrentTests，根据选择的testID来获取对应的测试相关所有最新的信息
     */
    getCurrentTestsPhp(state) {
      getCurrentTests().then(response => {
        state.currentActiveGroundTests = [];
        response.forEach(item => {
          if(item !== null) {
            state.currentActiveGroundTests.push(item);
          }
        });
        // console.log("global is:",state.currentActiveGroundTests)
      });
    },


    /**
     * 本函数用于调用service服务中的getAllAtaEquiTests，根据选择的testID来获取对应的测试相关所有最新的信息
     */
    getAllAtaEquiTestsPhp(state) {
      getAllAtaEquiTests().then(response => {
        state.ataAndEquiArray = response
      }).catch(error => {
        console.error('Error in getting groundtest list:', error);
      });
      // console.log("global is:",state.ataAndEquiArray)
    },


    /**
     * 本函数用于根据全局currentGroundTestID选取全局currentGroundTest
     */
    getTextById(state) {
      if(state.currentGroundTestID!==''){
        state.currentGroundTest = state.currentActiveGroundTests.filter(item => item.InitiatedTest_Index === state.currentGroundTestID)[0];
        // console.log("state.currentGroundTest  is:",state.currentGroundTest )
      }
    },

    updateCurrentTime(state, time) {
      state.currentTime = time.toLocaleTimeString();
      state.currentDate = time.toLocaleDateString();
    }
  },

  actions: {


  }
}
