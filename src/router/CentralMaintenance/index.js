import FailureReport from '../../views/CentralMaintenance/FailureReport/FailureReport.vue';

import GroundTest from '../../views/CentralMaintenance/GroundTest/GroundTest.vue';
import GroundTestPage from '../../views/CentralMaintenance/GroundTest/GroundTestPage.vue';

import Configuration from '../../views/CentralMaintenance/Configuration/Configuration.vue';

import NVMData from '../../views/CentralMaintenance/NVMData/NVMData.vue';

import ExtendedFunctions from '../../views/CentralMaintenance/ExtendedFunctions/ExtendedFunctions.vue';


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
];

export default routes;
