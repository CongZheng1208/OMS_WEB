// Vuex模块化
// GroundTest下的data
import {
  getCurrentTests,
  getAllAtaEquiTests,
} from "@/services/centralMaintenance/groundTest/index";
import qs from "qs";

export default {
  namespaced: true,
  state: {
    currentGroundTest: {},
    currentGroundTestID: "",

    ataAndEquiArray: [],
    currentActiveGroundTests: [],

    currentGroundTestTimer: "",

    InterferingTestIndexs: [],

    acReg: "C-WXWB",
    currentTime: new Date().toLocaleTimeString(),
    currentDate: new Date().toLocaleDateString(),
  },
  mutations: {
    /**
     * 本函数用于调用service服务中的getCurrentTests，根据选择的testID来获取对应的测试相关所有最新的信息
     */
    getCurrentTestsPhp(state) {
      getCurrentTests().then((response) => {
        state.currentActiveGroundTests = [];
        response.forEach((item) => {
          if (item !== null) {
            state.currentActiveGroundTests.push(item);
          }
        });
      });
    },

    /**
     * 本函数用于调用service服务中的getAllAtaEquiTests，根据选择的testID来获取对应的测试相关所有最新的信息
     */
    getAllAtaEquiTestsPhp(state) {
      getAllAtaEquiTests()
        .then((response) => {
          state.ataAndEquiArray = response;
        })
        .catch((error) => {
          console.error("Error in getting groundtest list:", error);
        });
    },

    /**
     * 本函数用于根据全局currentGroundTestID选取全局currentGroundTest
     */
    getTextById(state) {
      if (state.currentGroundTestID !== "") {
        state.currentGroundTest = state.currentActiveGroundTests
          .filter(
            (item) => item.InitiatedTest_Index === state.currentGroundTestID
          )
          .pop();
      }
    },

    updateCurrentTime(state, time) {
      state.currentTime = time.toLocaleTimeString();
      state.currentDate = time.toLocaleDateString();
    },
  },

  actions: {},
};
