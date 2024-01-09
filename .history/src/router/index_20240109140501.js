// import Vue from 'vue';
// import VueRouter from 'vue-router';

// import FailureRep from '../components/subViews/centralMain/FailureRep.vue';
// import GroundTest from '../components/subViews/centralMain/GroundTest.vue';
// import GroundTestPage from '../components/subViews/centralMain/GroundTestPage.vue';

// import Config from '../components/subViews/centralMain/Config.vue';
// import NVMData from '../components/subViews/centralMain/NVMData.vue';
// import ExtendedFunctions from '../components/subViews/centralMain/ExtendedFunctions.vue';

// import EventLog from '../components/subViews/conditionMon/EventLog.vue';
// import ParamDisplay from '../components/subViews/conditionMon/ParamDisplay.vue';
// import ParamGrapDisplay from '../components/subViews/conditionMon/ParamGrapDisplay.vue';


// Vue.use(VueRouter);

// const routes = [
//   {
//     path: '/CentralMaintenance/FailureReport',
//     name: 'failureRep',
//     component: FailureRep
//   },

//   {
//     path: '/CentralMaintenance/GroundTest',
//     name: 'groundTest',
//     component: GroundTest
//   },
//   {
//     path: '/CentralMaintenance/GroundTestPage',
//     name: 'groundTestPage',
//     component: GroundTestPage
//   },
//   {
//     path: '/CentralMaintenance/Config',
//     name: 'config',
//     component: Config
//   },
//   {
//     path: '/CentralMaintenance/NVMData',
//     name: 'nvmData',
//     component: NVMData
//   },
//   {
//     path: '/CentralMaintenance/ExtendedFunctions',
//     name: 'extendedFunctions',
//     component: ExtendedFunctions
//   },
//   {
//     path: '/ConditionMonitoring/ParamDisplay',
//     name: 'paramDisplay',
//     component: ParamDisplay
//   },
//   {
//     path: '/ConditionMonitoring/ParamGrapDisplay',
//     name: 'paramGrapDisplay',
//     component: ParamGrapDisplay
//   },
//   {
//     path: '/ConditionMonitoring/EventMonitoring',
//     name: 'eventMonitoring',
//     component: EventLog
//   },
// ];

// const router = new VueRouter({
//   mode: 'history',
//   routes
// });

// export default router;


import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import CentralMaintenanceRoutes from './CentralMaintenance'
import ConditionMonRoutes from './ConditionMon'
import DataLoadRoutes from './DataLoad'
import UtilityRoutes from './Utility'
// 可以按需引入其他部分的路由

const routes = [
  {
    path: '/CentralMaintenance',
    component: CentralMaintenanceRoutes
  },
  {
    path: '/ConditionMonitoring',
    component: ConditionMonitoringRoutes
  },
  {
    path: '/DataLoad',
    component: DataLoadRoutes
  },
  {
    path: '/Utility',
    component: UtilityRoutes
  },
  // 可以按需配置其他路由
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
