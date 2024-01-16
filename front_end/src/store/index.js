import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)


export default new Vuex.Store({
  //数据，相当于data
  state: {
    name:"张三",
    age:12,
    count: 0,
    res: {},
    },
    
    mutations: {
        
        addcount(state, num) { 
            state.count = state.count + num;
            
        },
        
      myarray(state) { 
    var urlRoot = "http://localhost:8080/php/centralMaintenance/failureReport/existingFailures.php";

      axios.get( urlRoot).then(
        (response) => {
          console.log("response.data:", response.data);
          //用JS编写filter功能
          let jsFilter = response.data;

          //select按钮，选择某个failure
          let selectIndex = String(2);
          console.log("selectIndex:", selectIndex);
          const indexFiles = jsFilter.filter(
            (jsFilter) => jsFilter.id == selectIndex
          );
          console.log("indexFiles:", indexFiles);
          console.log("=================================");

          //inboundlegall，筛选flight_leg==0的所有
          const inboundFiles = jsFilter.filter(
            (jsFilter) => jsFilter.flight_leg == 0
          );
          console.log("inboundFiles:", inboundFiles);
          console.log("=================================");

          //inboundlegsummary，筛选flight_leg==0,并汇总相同的failurename
          const inboundFilesSummmary = jsFilter.filter(
            (jsFilter) => jsFilter.flight_leg == 0
          );
          console.log("inboundFiles:", inboundFilesSummmary);
          console.log("=================================");
          //for循环，记录每个faliurename和相应的DateTime
          //创建新的数组，用于汇总相同failure_name_info
          let summaryArray = [];

          for (let item of inboundFilesSummmary) {
            let tempFailureName = item.failure_name_info;
            let onlyFailureName = summaryArray.findIndex(
              (value, index, array) => {
                return value.failure_name_info === tempFailureName;
              }
            ); // onlyFailureName找不到的就返回-1

            // 如果找不到，就将该item添加进summaryArray
            if (onlyFailureName == -1) {
              item.FirstDateTime = item.failure_time;
              item.LastDateTime = item.failure_time;
              item.Count = 1;
              summaryArray.push(item);
            }
          }

          //针对summaryArray中的每一个failureName
          for (let item of summaryArray) {
            let tempFailureName = item.failure_name_info;
            const FailureNames = jsFilter.filter(
              (jsFilter) => jsFilter.failure_name_info == tempFailureName
            );
            //设置FirstDateTime和LastDateTime
            let FirstDateTime = FailureNames[0].failure_time;
            let LastDateTime = FailureNames[0].failure_time;
            for (let i = 1; i < FailureNames.length; i++) {
              if (
                Date.parse(FailureNames[i].failure_time) >=
                Date.parse(LastDateTime)
              ) {
                console.log(
                  "FailureNames[i].failure_time:",
                  Date.parse(FailureNames[i].failure_time)
                );
                console.log(
                  "failure_name_info:",
                  FailureNames[i].failure_name_info
                );
                console.log("failure_time:", FailureNames[i].failure_time);
                LastDateTime = FailureNames[i].failure_time;
              }
              if (
                Date.parse(FailureNames[i].failure_time) <
                Date.parse(FirstDateTime)
              ) {
                //console.log("failure_name_info:", failure_name_info);
                //console.log("failure_time:", FailureNames[i].failure_time);
                FirstDateTime = FailureNames[i].failure_time;
              }
            }

            //设置   FirstDateTime      和   LastDateTime
            item.Count = FailureNames.length;
            item.FirstDateTime = FirstDateTime;
            item.LastDateTime = LastDateTime;
          }

          console.log("summaryArray:", summaryArray);
              state.res = summaryArray;
              //state.res =[1,2,3];
          /*          response.data.forEach((ele) => {
            this.originalArray.push({
              fimCode: ele.FIMCode_info,
              name: ele.failure_name_info,
              datetime: ele.failure_time,
              phase: ele.flight_phase,
              state: ele.failure_state,
              leg: ele.flight_leg,
              text: ele.FDEText[0],
              id: ele.id,
              FDE: ele.FDE,
            });
          }); */
        },
        (error) => {
          // alert('发送请求失败！', error.message)
        }
      );
        },

  
    },



    actions: {
       actAddcount(state, num) { 
            state.count = state.count + num*100;
        },

/*        async reqLogin({commit}, datas = {}) {
            let res = await reqLogin(datas)
            if (res.code == 200) {
                commit("Login", res.data.token)
                return Promise.resolve(true)
            } else {
                return Promise.reject(new Error(false))
            }
        }, */
        

                
                
                
    }
})