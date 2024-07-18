// Vuex模块化
// FailureReport下的data
import {
  getFailureList,
  getFDEList,
} from "../../../services/centralMaintenance/failureReport";

import { getFlightLeg } from "@/services/util/index";

export default {
  // 开启命名空间
  namespaced: true,
  // state
  state: {
    selectedFailureId: -1,
    selectedFailure: {},

    resFailureData: {},
    resFDEData: {},
    flightLegData: {},
    maxflightLeg: 0,

    acReg: "C-WXWB",
    currentTime: new Date().toLocaleTimeString(),
    currentDate: new Date().toLocaleDateString(),
  },
  // mutations
  mutations: {
    failurePhp(state) {
      state.resFailureData = {};

      getFlightLeg().then((response) => {
        state.maxflightLeg = Math.max(...response.map((leg) => leg.flightLeg));
        console.log("state.maxflightLeg ", state.maxflightLeg);
      });

      getFailureList()
        .then((response) => {
          const failureReportOri = response;

          let resExistingFailureData = [];
          let idx = 1;

          failureReportOri.forEach((failure) => {
            if (Array.isArray(failure.fde) && failure.fde.length > 0) {
              failure.fde.forEach((fde) => {
                // 创建新的对象，将fde对象与父failure对象的其他属性保存
                let modifiedFailure = { ...failure, fde, index: idx };
                resExistingFailureData.push(modifiedFailure);
                idx = idx + 1;
              });
            } else {
              // 如果fde属性中不包含对象，直接将父failure对象保存
              let modifiedFailure = { ...failure, fde: {}, index: idx };
              resExistingFailureData.push(modifiedFailure);
              idx = idx + 1;
            }

            failure.flightLeg = failure.flightLeg - state.maxflightLeg;
          });
          state.resFailureData = resExistingFailureData;
        })
        .catch((error) => {
          console.error("Error in getting failure list:", error);
        });
    },

    fdePhp(state) {
      state.resFDEData = {};

      getFDEList()
        .then((response) => {
          state.resFDEData = response;

          // console.log("resFDEData is:", response);
        })
        .catch((error) => {
          console.error("Error in getting fde list:", error);
        });
    },

    // flightLegDataPhp(state) {
    //   getFlightLeg().then((response) => {
    //     state.flightLegData = response.reverse();
    //     // state.maxflightLeg = ;
    //     state.maxflightLeg = Math.max(
    //       ...state.flightLegData.map((leg) => leg.flightLegData)
    //     );
    //   });
    //   console.log(" state.flightLegData", state.flightLegData);
    //   console.log(" state.maxflightLeg", state.maxflightLeg);
    // },

    updateCurrentTime(state, time) {
      state.currentTime = time.toLocaleTimeString();
      state.currentDate = time.toLocaleDateString();
    },
  },
};
