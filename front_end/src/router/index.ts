import Vue from "vue";
import VueRouter from "vue-router";
// 导入路由
import CentralMaintenanceRoutes from "./modules/CentralMaintenance/index";
import ConditionMonitoringRoutes from "./modules/ConditionMonitoring/index";
import ManagementRoutes from "./modules/Management/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/centralMaintenance/failureReport/failureList",
  },
  CentralMaintenanceRoutes,
  ConditionMonitoringRoutes,
  ManagementRoutes,
];

const router = new VueRouter({
  mode: "hash",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
