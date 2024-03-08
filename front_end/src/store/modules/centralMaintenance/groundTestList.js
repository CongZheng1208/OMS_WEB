// Vuex模块化
// GroundTest下的data
import { postIDforTest } from '@/services/centralMaintenance/groundTest/index.js';
import qs from 'qs'

export default{
  namespaced: true,
  state: {
    selectedEquipment: {},

    currentGroundTest: {},
    currentGroundTestID: '',
    currentGroundTestTimer: '',

    currentGroundTests: [],
  },
  mutations: {

    /**
     * 本函数用于调用service服务中的postIDforTest，根据选择的testID来获取对应的测试相关所有最新的信息
     */
    testPhp(state) {

      let tmp = qs.stringify({
        id: state.currentGroundTestID
      });

      postIDforTest(tmp).then(response => {

        state.currentGroundTest = response;
        state.currentGroundTest.EquipmentName =  state.selectedEquipment.equipmentName


        if (!state.currentGroundTest.InitiatedTest_Status) {
          state.currentGroundTest.InitiatedTest_Status = '--';
        }

        // 将Precondition部分由长字符串拆分为数组方便展示
        let precondition = state.currentGroundTest.Preconditions
        state.currentGroundTest.Preconditions = precondition.split(';');
        // 如果数组只有一个元素且该元素为空字符串，则代表原字符串中没有分号，需要特殊处理
        if (state.currentGroundTest.Preconditions.length === 1 && state.currentGroundTest.Preconditions[0] === '') {
          state.currentGroundTest.Preconditions = [precondition];
        }



        if(state.currentGroundTest.InhibitConditions_Trigger_Index == "" ){
          state.currentGroundTest.InhibitConditions = ['']
        }else{
          // 将inhibitCondition部分由长字符串拆分为数组方便展示
          let inhibitIndex = state.currentGroundTest.InhibitConditions_RP_Index.split(';');
          let inhibitText = state.currentGroundTest.InhibitCondition_Text.split(';');
          let inhibitTrigger = state.currentGroundTest.InhibitConditions_Trigger_Index.split(';');

          let inhibitMap = inhibitIndex.reduce((acc, key, index) => {
            acc[key] = inhibitText[index];
            return acc;
          }, {});

          let resultArray = [];
          inhibitTrigger.forEach(triggerIndex => {
            let triggerValue = inhibitMap[triggerIndex];
            if (triggerValue) {
              resultArray.push(triggerValue);
            }
          });

          state.currentGroundTest.InhibitConditions = resultArray
        }


        // 将inhibitCondition部分由长字符串拆分为数组方便展示
        let interferingTest = state.currentGroundTest.InterferingTests_Index
        state.currentGroundTest.InterferingTests_Index = interferingTest.split(';');
        // 如果数组只有一个元素且该元素为空字符串，则代表原字符串中没有分号，需要特殊处理
        if (state.currentGroundTest.InterferingTests_Index.length === 1 && state.currentGroundTest.InterferingTests_Index[0] === '') {
          state.currentGroundTest.InterferingTests_Index = [interferingTest];
        }






        // 将inhibitCondition部分由长字符串拆分为数组方便展示
        let interactiveScreenText = state.currentGroundTest.InteractiveScreenText
        // 如果数组只有一个元素且该元素为空字符串，则代表原字符串中没有分号，需要特殊处理

        let objectArray = [];

        if(state.currentGroundTest.NumScreens == "0"){
          state.currentGroundTest.InteractiveScreenText = [interactiveScreenText];
        }else{
          state.currentGroundTest.ScreenId = state.currentGroundTest.ScreenId.split(';');
          state.currentGroundTest.InteractiveScreenText = interactiveScreenText.split(';');
          // 将ResponseMessage部分由长字符串转为Json方便展示
          state.currentGroundTest.ResponseMessage = JSON.parse(state.currentGroundTest.ResponseMessage);

          // 分别提取三种数据并存入对象数组

          for (let i = 0; i < state.currentGroundTest.ScreenId.length; i++) {
            let obj = {
              ScreenId: state.currentGroundTest.ScreenId[i],
              InteractiveScreenText: state.currentGroundTest.InteractiveScreenText[i],
              ResponseMessage: state.currentGroundTest.ResponseMessage[i]
            };
            objectArray.push(obj);
          }
        }
        // 将对象数组存入state
        state.currentGroundTest.screenArray = objectArray;

      }).catch(error => {
        console.error('Error in getting groundtest list:', error);
      });
    },


    addToTests(state) {
      // 将该项测试添加进总进行中测试列表里
      if (!state.currentGroundTests.some(test => test.InitiatedTest_Index === state.currentGroundTest.InitiatedTest_Index)) {
        state.currentGroundTest.StartTime =  new Date().getTime();








        state.currentGroundTests.push(state.currentGroundTest);
      } else {
        console.log("terrible")
      }
      console.log(state.currentGroundTests)
    }
  },
  actions: {
  }
}
