import EventMonitoring from '../../views/ConditionMonitoring/EventMonitoring/EventMonitoring.vue';

import ParameterDisplay from '../../views/ConditionMonitoring/ParameterDisplay/ParameterDisplay.vue';

import ParameterRecording from '../../views/ConditionMonitoring/ParameterRecording/ParameterRecording.vue';


const routes = [
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

export default routes;
