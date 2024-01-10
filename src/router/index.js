// import Vue from 'vue'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)

// import CentralMaintenanceRoutes from './CentralMaintenance/index'
// import ConditionMonitoringRoutes from './ConditionMonitoring/index'
// import DataLoadRoutes from './DataLoad/index'
// import UtilityRoutes from './Utility/index'
// // 可以按需引入其他部分的路由

// const routes = [
//   {
//     path: '/CentralMaintenance',
//     component: CentralMaintenanceRoutes
//   },
//   {
//     path: '/ConditionMonitoring',
//     component: ConditionMonitoringRoutes
//   },
//   {
//     path: '/DataLoad',
//     component: DataLoadRoutes
//   },
//   {
//     path: '/Utility',
//     component: UtilityRoutes
//   },
//   // 可以按需配置其他路由
// ]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router



import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import FailureReport from '../views/CentralMaintenance/FailureReport/FailureReport.vue';

import GroundTest from '../views/CentralMaintenance/GroundTest/GroundTest.vue';
import GroundTestPage from '../views/CentralMaintenance/GroundTest/GroundTestPage.vue';

import Configuration from '../views/CentralMaintenance/Configuration/Configuration.vue';

import NVMData from '../views/CentralMaintenance/NVMData/NVMData.vue';

import ExtendedFunctions from '../views/CentralMaintenance/ExtendedFunctions/ExtendedFunctions.vue';



import EventMonitoring from '../views/ConditionMonitoring/EventMonitoring/EventMonitoring.vue';

import ParameterDisplay from '../views/ConditionMonitoring/ParameterDisplay/ParameterDisplay.vue';

import ParameterRecording from '../views/ConditionMonitoring/ParameterRecording/ParameterRecording.vue';


const routes = [
  {
    path: '/CentralMaintenance/FailureReport',
    name: 'FailureReport',
    component: FailureReport
  },
  {
    path: '/CentralMaintenance/GroundTest',
    name: 'GroundTest',
    component: GroundTest
  },
  {
    path: '/CentralMaintenance/GroundTestPage',
    name: 'GroundTestPage',
    component: GroundTestPage
  },
  {
    path: '/CentralMaintenance/Configuration',
    name: 'Configuration',
    component: Configuration
  },
  {
    path: '/CentralMaintenance/NVMData',
    name: 'NVMData',
    component: NVMData
  },
  {
    path: '/CentralMaintenance/ExtendedFunctions',
    name: 'ExtendedFunctions',
    component: ExtendedFunctions
  },

  {
    path: '/ConditionMonitoring/ParameterDisplay',
    name: 'ParameterDisplay',
    component: ParameterDisplay
  },
  {
    path: '/ConditionMonitoring/ParameterRecording',
    name: 'ParameterRecording',
    component: ParameterRecording
  },
  {
    path: '/ConditionMonitoring/EventMonitoring',
    name: 'EventMonitoring',
    component: EventMonitoring
  },
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
