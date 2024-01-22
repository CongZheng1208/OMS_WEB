import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由
import CentralMaintenanceRoutes from './modules/CentralMaintenance'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/centralMaintenance/failureReport/failureList'
  },
  CentralMaintenanceRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
