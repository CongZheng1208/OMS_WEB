import Vue from "vue";
import VueRouter from "vue-router";
// 导入路由
import CentralMaintenanceRoutes from "./modules/CentralMaintenance/index";
import ConditionMonitoringRoutes from "./modules/ConditionMonitoring/index";
import ManagementRoutes from "./modules/Management/index";
import DataLoadRoutes from './modules/DataLoad/index'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/centralMaintenance/failureReport/failureList",
  },
  CentralMaintenanceRoutes,
  ConditionMonitoringRoutes,
  ManagementRoutes,
  DataLoadRoutes
];

const router = new VueRouter({
  mode: "hash",
  // base: process.env.BASE_URL,
  routes,
});

let isFirstNavigation = true; // 添加一个标志位，用于判断是否为初始导航

// router.beforeEach((to, from, next) => {
//   // 判断是否为刷新页面的操作
//   if (isFirstNavigation && from.name === null) {
//     isFirstNavigation = false; // 设置为false，表示已经进行了初始导航
//     next("/centralMaintenance/failureReport/failureList"); // 重定向至指定页面
//   } else {
//     isFirstNavigation = false; // 设置为false，以防止重定向后再次进入这个逻辑
//     next(); // 继续路由跳转
//   }
// });

export default router;
