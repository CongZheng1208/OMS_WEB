import FailureRep from '../components/subViews/centralMain/FailureRep.vue';
import GroundTest from '../components/subViews/centralMain/GroundTest.vue';
import GroundTestPage from '../components/subViews/centralMain/GroundTestPage.vue';

import Config from '../components/subViews/centralMain/Config.vue';
import NVMData from '../components/subViews/centralMain/NVMData.vue';
import ExtendedFunctions from '../components/subViews/centralMain/ExtendedFunctions.vue';


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
];

export default routes;
