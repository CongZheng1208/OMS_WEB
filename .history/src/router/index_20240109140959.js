import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import CentralMaintenanceRoutes from './CentralMaintenance'
import ConditionMonitoringRoutes from './ConditionMonitoring'
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
