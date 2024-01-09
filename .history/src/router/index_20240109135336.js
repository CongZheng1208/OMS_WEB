import Vue from 'vue';
import VueRouter from 'vue-router';

// import CentralMaintenance from '../components/views/CentralMaintenance.vue';
// import ConditionMonitoring from '../components/views/ConditionMonitoring.vue';
// import DataLoad from '../components/views/DataLoad.vue';
// import Utility from '../components/views/Utility.vue';




import FailureRep from '../components/subViews/centralMain/FailureRep.vue';
import GroundTest from '../components/subViews/centralMain/GroundTest.vue';
import GroundTestPage from '../components/subViews/centralMain/GroundTestPage.vue';


import Config from '../components/subViews/centralMain/Config.vue';
import NVMData from '../components/subViews/centralMain/NVMData.vue';
import ExtendedFunctions from '../components/subViews/centralMain/ExtendedFunctions.vue';

import EventLog from '../components/subViews/conditionMon/EventLog.vue';
import ParamDisplay from '../components/subViews/conditionMon/ParamDisplay.vue';
import ParamGrapDisplay from '../components/subViews/conditionMon/ParamGrapDisplay.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/CentralMaintenance/FailureReport',
    name: 'failureRep',
    component: FailureRep
  },

  {
    path: '/CentralMaintenance/GroundTest',
    name: 'groundTest',
    component: GroundTest
  },
  {
    path: '/CentralMaintenance/GroundTestPage',
    name: 'groundTestPage',
    component: GroundTestPage
  },
  {
    path: '/CentralMaintenance/Config',
    name: 'config',
    component: Config
  },
  {
    path: '/CentralMaintenance/NVMData',
    name: 'nvmData',
    component: NVMData
  },
  {
    path: '/CentralMaintenance/ExtendedFunctions',
    name: 'extendedFunctions',
    component: ExtendedFunctions
  },
  {
    path: '/ConditionMonitoringitoring/ParamDisplay',
    name: 'paramDisplay',
    component: ParamDisplay
  },
  {
    path: '/ConditionMonitoringitoring/ParamGrapDisplay',
    name: 'paramGrapDisplay',
    component: ParamGrapDisplay
  },
  {
    path: '/ConditionMonitoringitoring/EventMonitoring',
    name: 'eventMonitoring',
    component: EventLog
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
