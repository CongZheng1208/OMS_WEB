// Vuex模块化

// FailureReport下的data
import { getFailureList } from "../../../services/centralMaintenance/failureReport";
import axios from 'axios'


export default {
  // 开启命名空间
  namespaced: true,
  // state
  state: {
    selectedFailureId: -1,
    resFailureData: {},
  },
  // mutations
  mutations: {
    failurePhp(state) {
      state.resFailureData = {};
      var urlRoot = "http://localhost:8888/oms/php/centralMaintenance/failureReport/failures.php";
      axios.get( urlRoot).then(
        (response) => {
          console.log("response.data:", response.data);
          const failureReportOri = response.data;
          //针对每个failureName，初始化count、firstTime、LastTime、parent、children
          //for循环，记录每个faliurename和相应的DateTime
          //创建新的数组，用于汇总相同failure_name_info
          let failureReportNew = response.data;
          for (let item of failureReportNew) {
              item.first_time = item.failure_time;
              item.last_time = item.failure_time;
              item.count = 1;
          }
          //针对failureReportNew中的每一个failureName，更新first_time，last_time，count
          for (let item of failureReportNew) {
            let tempFailureName = item.failure_name_info;
            const sameFailureName = failureReportOri.filter(
              (failureReportOri) => failureReportOri.failure_name_info == tempFailureName
            );
            //设置first_time和last_time
            let first_time = sameFailureName[0].failure_time;
            let last_time = sameFailureName[0].failure_time;
            for (let i = 1; i < sameFailureName.length; i++) {
              if (
                Date.parse(sameFailureName[i].failure_time) >=
                Date.parse(last_time)
              ) {
                last_time = sameFailureName[i].failure_time;
              }
              if (
                Date.parse(sameFailureName[i].failure_time) <
                Date.parse(first_time)
              ) {
                first_time = sameFailureName[i].failure_time;
              }
            }
            //设置   first_time  和   last_time
            item.count = sameFailureName.length;
            item.first_time = first_time;
            item.last_time = last_time;
            //设置is_parent属性,如果failure_time与first_time相等，则为parent
            if (item.first_time == item.failure_time) {
              item.is_parent = true;
            }
            else {
              item.is_parent = false;
            }
          }
          console.log("in store: resFailureData:", failureReportNew);
          state.resFailureData = failureReportNew;
        },
        (error) => {
          // alert('发送请求失败！', error.message)
        }
      );
    },
    // TBD
    // 获取failureList
    async getFailureList() {
      const res = await getFailureList()
    }
  }
}
