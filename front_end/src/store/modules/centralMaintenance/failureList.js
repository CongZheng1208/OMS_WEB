// Vuex模块化

// FailureReport下的data
import { getFailureList, getFDEList } from '../../../services/centralMaintenance/failureReport';

export default {
  // 开启命名空间
  namespaced: true,
  // state
  state: {
    selectedFailureId: -1,
    selectedFailure: {},

    resFailureData: {},
    resFDEData: {},

    acReg: "C-WXWB",
    currentTime: new Date().toLocaleTimeString(),
    currentDate: new Date().toLocaleDateString(),
  },
  // mutations
  mutations: {
    failurePhp(state) {
      state.resFailureData = {};

      getFailureList().then(response => {

        const failureReportOri = response;

        console.log("before:")
        console.log(failureReportOri)

        let resExistingFailureData = [];

        let idx = 1;

        failureReportOri.forEach(failure => {
          if (Array.isArray(failure.fde) && failure.fde.length > 0) {
            failure.fde.forEach(fde => {
              // 创建新的对象，将fde对象与父failure对象的其他属性保存
              let modifiedFailure = { ...failure, fde, index: idx };
              resExistingFailureData.push(modifiedFailure);
              idx = idx + 1
            });
          } else {
            // 如果fde属性中不包含对象，直接将父failure对象保存
            let modifiedFailure = { ...failure, fde:{}, index: idx };
            resExistingFailureData.push(modifiedFailure);
            idx = idx + 1
          }
        });

        console.log("resExistingFailureData is:")
        console.log(resExistingFailureData)

        state.resFailureData = resExistingFailureData;
      }).catch(error => {
        console.error('Error in getting failure list:', error);
      });
    },


    fdePhp(state) {
      state.resFDEData = {};

      getFDEList().then(response => {
        state.resFDEData = response;
      }).catch(error => {
        console.error('Error in getting fde list:', error);
      });
    },

    updateCurrentTime(state, time) {
      state.currentTime = time.toLocaleTimeString();
      state.currentDate = time.toLocaleDateString();
    }
  }
}
