// Vuex模块化

// FailureReport下的data
import { getFailureList, getFDEList } from '../../../services/centralMaintenance/failureReport';

export default {
  // 开启命名空间
  namespaced: true,
  // state
  state: {
    selectedFailureId: -1,
    resFailureData: {},
    resFDEData: {},
  },
  // mutations
  mutations: {
    failurePhp(state) {
      state.resFailureData = {};

      getFailureList().then(response => {

          const failureReportOri = response;
          //针对每个failureName，初始化count、firstTime、LastTime、parent、children
          //for循环，记录每个faliurename和相应的DateTime
          //创建新的数组，用于汇总相同failure_name_info
          let failureReportNew = response;
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
          // console.log("in store: resFailureData:", failureReportNew);
          state.resFailureData = failureReportNew;


          let ataListBefore = []
          let legListBefore = []
          let legInitBefore = []

          let ataList = []
          let legList = []
          let legInit = []

          //分别初始化ATA、Leg显示模式的数组
          response.forEach(ele=>{
            // 统计所有ATA值
            if(ele.ata != '' && !ataListBefore.includes(ele.ata)) {
              ataListBefore.push(ele.ata);
            };
            // 统计所有leg=0时，ATA的值
            if(ele.flight_leg == 0 && !legListBefore.includes(ele.ata)) {
              legListBefore.push(ele.ata);
            };
            // 统计所有leg值
            if(!legInitBefore.includes(ele.flight_leg)) {
              legInitBefore.push(ele.flight_leg);
            }
          })

          // 生成ataList
          ataListBefore = ataListBefore.map(Number).sort().map(String);
          for(var j = 0; j < ataListBefore.length; j++){
            var ataobj = {};
            ataobj.id = ataListBefore[j];
            ataobj.isChecked = false;
            ataobj.countNumber = 0;
            ataobj.countforSelected = 0;
            ataList.push(ataobj);
          };

          // 生成legList
          legListBefore = legListBefore.sort().map(String);
          for(var j = 0;j < legListBefore.length; j++) {
            var legobj = {};
            legobj.id = legListBefore[j];
            legobj.isChecked = false;
            legobj.countNumber = 0;
            legobj.countforSelected = 0;
            legList.push(legobj);
          };
          // 生成legInit
          legInitBefore = legInitBefore.sort();
          for(var j = 0;j < legInitBefore.length; j++) {
            var legobj = {};
            legobj.id = legInitBefore[j];
            legobj.countforSelected = 0;
            legInit.push(legobj);
          };


          // console.log("failureHistoryDatas is")
          // console.log(failureHistoryDatas)
          // console.log(ataListBefore)
          // console.log(legListBefore)
          // console.log(legInitBefore)

          // console.log(ataList)
          // console.log(legList)
          // console.log(legInit)

        }).catch(error => {
        console.error('Error in getting failure list:', error);
      });
    },

    fdePhp(state) {
      state.resFDEData = {};

      getFDEList().then(response => {


        const fdeReportOri = response;
        //针对每个fdeName，初始化count、firstTime、LastTime、parent、children
        //for循环，记录每个faliurename和相应的DateTime
        //创建新的数组，用于汇总相同fde_name_info
        let fdeReportNew = response;
        fdeReportNew = fdeReportNew.map((item, index) => {
          item.index = index + 1; // 添加一个唯一的序号给每个item
          item.first_time = item.fde_time;
          item.last_time = item.fde_time;
          item.count = 1;
          return item;
        });
        //针对fdeReportNew中的每一个fdeName，更新first_time，last_time，count
        for (let item of fdeReportNew) {
          let tempFDEName = item.FDEText;
          const sameFDEName = fdeReportOri.filter(
            (fdeReportOri) => fdeReportOri.FDEText == tempFDEName
          );
          //设置first_time和last_time
          let first_time = sameFDEName[0].fde_time;
          let last_time = sameFDEName[0].fde_time;
          for (let i = 1; i < sameFDEName.length; i++) {
            if (
              Date.parse(sameFDEName[i].fde_time) >=
              Date.parse(last_time)
            ) {
              last_time = sameFDEName[i].fde_time;
            }
            if (
              Date.parse(sameFDEName[i].fde_time) <
              Date.parse(first_time)
            ) {
              first_time = sameFDEName[i].fde_time;
            }
          }
          //设置   first_time  和   last_time
          item.count = sameFDEName.length;
          item.first_time = first_time;
          item.last_time = last_time;
          //设置is_parent属性,如果fde_time与first_time相等，则为parent
          if (item.first_time == item.fde_time) {
            item.is_parent = true;
          }
          else {
            item.is_parent = false;
          }
        }
        // console.log("in store: resFDEData:", fdeReportNew);
        state.resFDEData = fdeReportNew;

      }).catch(error => {
        console.error('Error in getting fde list:', error);
      });
    }
  }
}
