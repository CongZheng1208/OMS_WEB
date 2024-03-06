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


        // 将Precondition部分由长字符串拆分为数组方便展示
        let precondition = state.currentGroundTest.Preconditions
        state.currentGroundTest.Preconditions = precondition.split(';');
        // 如果数组只有一个元素且该元素为空字符串，则代表原字符串中没有分号，需要特殊处理
        if (state.currentGroundTest.Preconditions.length === 1 && state.currentGroundTest.Preconditions[0] === '') {
          state.currentGroundTest.Preconditions = [precondition];
        }


        // 将inhibitCondition部分由长字符串拆分为数组方便展示
        let inhibitCondition = state.currentGroundTest.InhibitCondition_Text
        state.currentGroundTest.InhibitCondition_Text = inhibitCondition.split(';');
        // 如果数组只有一个元素且该元素为空字符串，则代表原字符串中没有分号，需要特殊处理
        if (state.currentGroundTest.InhibitCondition_Text.length === 1 && state.currentGroundTest.InhibitCondition_Text[0] === '') {
          state.currentGroundTest.InhibitCondition_Text = [inhibitCondition];
        }


        // 将inhibitCondition部分由长字符串拆分为数组方便展示
        let interactiveScreenText = state.currentGroundTest.InteractiveScreenText
        console.log(interactiveScreenText)
        // 如果数组只有一个元素且该元素为空字符串，则代表原字符串中没有分号，需要特殊处理
        if(interactiveScreenText == null){
          state.currentGroundTest.InteractiveScreenText = [interactiveScreenText];
        }else{
          state.currentGroundTest.InteractiveScreenText = interactiveScreenText.split(';');
        }

        // 将ResponseMessage部分由长字符串转为Json方便展示
        state.currentGroundTest.ResponseMessage = JSON.parse(state.currentGroundTest.ResponseMessage);

        // // 如果该测试没有StartTime这个属性，则记录此刻时间并设置为该测试的StartTime
        // if (!state.currentGroundTest.hasOwnProperty('StartTime')) {
        //   state.currentGroundTest.StartTime =  new Date().toLocaleTimeString();
        // }else{
        //   console.log("yes")
        // }

        console.log(state.currentGroundTest)

        if ('StartTime' in state.currentGroundTest) {
          console.log('包含StartTime属性');
        } else {
          console.log('state.currentGroundTest对象不包含StartTime属性');
          state.currentGroundTest.StartTime =  new Date().toLocaleTimeString();
        }





        if (!state.currentGroundTest.StartTime) {
          console.warn('Warning: StartTime property does not exist in currentGroundTest');
        } else {

          // 计算时间差
          let timeDifference = new Date().getTime() - new Date(state.currentGroundTest.StartTime).getTime();
          // 计算进度值
          let progress = (timeDifference / state.currentGroundTest.TestDurationTime) * 100;

          // 更新Progress属性
          state.currentGroundTest.Progress = Math.min(progress, 100);
        }

        console.log(new Date().getTime() )
        console.log(state.currentGroundTest.StartTime)
        console.log(new Date(state.currentGroundTest.StartTime).getTime())




      }).catch(error => {
        console.error('Error in getting groundtest list:', error);
      });
    },

    addToTests(state) {
      // 将该项测试添加进总进行中测试列表里
      if (!state.currentGroundTests.some(test => test.InitiatedTest_Index === state.currentGroundTest.InitiatedTest_Index)) {
        state.currentGroundTests.push(state.currentGroundTest);
      }
      else {
        // 如果已经在进行的测试中包含该项测试，则不继续添加
        console.warn('Warning: Object already exists in the currentGroundTests array');
      }
      console.log(state.currentGroundTests)
    }


  },
  actions: {

  }
}
