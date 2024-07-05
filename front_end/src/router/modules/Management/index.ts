// CMS模块底下的路由表
const ManagementRoutes = {
  path: "/management",
  name: "Management",
  component: () => import("@/views/Management/index.vue"),
  children: [
    {
      path: "databaseManagement",
      name: "DatabaseManagement",
      component: () =>
        import("@/views/Management/DatabaseManagement/index.vue"),
    },
    {
      path: "airGroundDataManagement",
      name: "AirGroundDataManagement",
      component: () =>
        import("@/views/Management/AirGroundDataManagement/index.vue"),
    },
    {
      path: "userOperationLog",
      name: "UserOperationLog",
      component: () => import("@/views/Management/UserOperationLog/index.vue"),
    },
    {
      path: "accountManagement",
      name: "AccountManagement",
      component: () => import("@/views/Management/AccountManagement/index.vue"),
    },
  ],
};

export default ManagementRoutes;
