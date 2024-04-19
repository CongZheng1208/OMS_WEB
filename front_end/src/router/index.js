import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由
import CentralMaintenanceRoutes from './modules/CentralMaintenance'
import ConditionMonitoringRoutes from './modules/ConditionMonitoring'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/centralMaintenance/failureReport/failureList'
  },
  CentralMaintenanceRoutes,
  ConditionMonitoringRoutes
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
