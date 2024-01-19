import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import CentralMaintenanceRoutes from './CentralMaintenance/index'
// import ConditionMonitoringRoutes from './ConditionMonitoring/index'
// import DataLoadRoutes from './DataLoad/index'
// import UtilityRoutes from './Utility/index'

import CentralMaintenance from '../views/CentralMaintenance/CentralMaintenance.vue';
import ConditionMonitoring from '../views/ConditionMonitoring/ConditionMonitoring.vue';
import DataLoad from '../views/DataLoad/DataLoad.vue';
import Utility from '../views/Utility/Utility.vue';


import FailureReport from '../views/CentralMaintenance/FailureReport/FailureReport.vue';
import GroundTestDefaultPage from '../views/CentralMaintenance/GroundTest/GroundTestDefaultPage.vue';
import GroundTestSelectATAandEquipmentPage from '../views/CentralMaintenance/GroundTest/GroundTestSelectATAandEquipmentPage.vue';
import GroundTestSelectTestPage from '../views/CentralMaintenance/GroundTest/GroundTestSelectTestPage.vue';
import GroundTestThreeTestsPage from '../views/CentralMaintenance/GroundTest/GroundTestThreeTestsPage.vue';
import GroundTestInteractiveTestPage from '../views/CentralMaintenance/GroundTest/GroundTestInteractiveTestPage.vue';
import GroundTestViewDetailPage from '../views/CentralMaintenance/GroundTest/GroundTestViewDetailPage.vue';
import Configuration from '../views/CentralMaintenance/Configuration/Configuration.vue';
import NVMData from '../views/CentralMaintenance/NVMData/NVMData.vue';
import ExtendedFunctions from '../views/CentralMaintenance/ExtendedFunctions/ExtendedFunctions.vue';

import EventMonitoring from '../views/ConditionMonitoring/EventMonitoring/EventMonitoring.vue';
import ParameterDisplay from '../views/ConditionMonitoring/ParameterDisplay/ParameterDisplay.vue';
import ParameterRecording from '../views/ConditionMonitoring/ParameterRecording/ParameterRecording.vue';


const routes = [
  {
    path: '/',
    redirect: '/CentralMaintenance/FailureReport'
  },
  {
    path: '/CentralMaintenance',
    component: CentralMaintenance,
    children: [
      {
        path: 'FailureReport',
        name: 'FailureReport',
        component: FailureReport
      },

      {
        path: 'GroundTestDefaultPage',
        name:'GroundTestDefaultPage',
        component: GroundTestDefaultPage
      },
      {
        path: 'GroundTestSelectATAandEquipmentPage',
        name:'GroundTestSelectATAandEquipmentPage',
        component: GroundTestSelectATAandEquipmentPage
      },
      {
        path: 'GroundTestSelectTestPage',
        name:'GroundTestSelectTestPage',
        component: GroundTestSelectTestPage
      },
      {
        path: 'GroundTestThreeTestsPage',
        name:'GroundTestThreeTestsPage',
        component: GroundTestThreeTestsPage
      },
      {
        path: 'GroundTestInteractiveTestPage',
        name:'GroundTestInteractiveTestPage',
        component: GroundTestInteractiveTestPage
      },
      {
        path: 'GroundTestViewDetailPage',
        name:'GroundTestViewDetailPage',
        component: GroundTestViewDetailPage
      },

      {
        path: 'Configuration',
        name:'Configuration',
        component: Configuration
      },
      {
        path: 'NVMData',
        name: 'NVMData',
        component: NVMData
      },
      {
        path: 'ExtendedFunctions',
        name: 'ExtendedFunctions',
        component: ExtendedFunctions
      },
    ],
  },
  {
    path: '/ConditionMonitoring',
    component: ConditionMonitoring,
    children: [
      {
        path: 'ParameterDisplay',
        name: 'ParameterDisplay',
        component: ParameterDisplay
      },
      {
        path: 'ParameterRecording',
        name: 'ParameterRecording',
        component: ParameterRecording
      },
      {
        path: 'EventMonitoring',
        name: 'EventMonitoring',
        component: EventMonitoring
      },
    ],
  },
  {
    path: '/DataLoad',
    name: 'DataLoad',
    component: DataLoad,
  },
  {
    path: '/Utility',
    name: 'Utility',
    component: Utility,
  }
  // CentralMaintenanceRoutes,
  // ConditionMonitoringRoutes,
  // DataLoadRoutes,
  // UtilityRoutes,
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
