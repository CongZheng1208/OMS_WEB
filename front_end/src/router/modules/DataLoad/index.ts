const DataLoadRoutes = {
  path: "/dataLoad",
  name: "DataLoad",
  component: () => import("@/views/DataLoad/index.vue"),
  redirect: "/dataload/targetLoad",
  children: [
    {
      path: "targetLoad",
      name: "TargetLoad",
      redirect: "/dataload/targetLoad/ATAandEquipmentSelection",
      component: () => import("@/views/DataLoad/TargetLoad/index.vue"),
      children: [
        {
          path: "ATAandEquipmentSelection",
          name: "ATAandEquipmentSelection",
          component: () =>
            import(
              "@/views/DataLoad/TargetLoad/ATAandEquipmentSelection/index.vue"
            ),
        },
        {
          path: "partNumberSelection",
          name: "PartNumberSelection",
          component: () =>
            import("@/views/DataLoad/TargetLoad/PartNumberSelection/index.vue"),
        },
        {
          path: "batchPartSelection",
          name: "BatchPartSelection",
          component: () =>
            import("@/views/DataLoad/TargetLoad/BatchPartSelection/index.vue"),
        },
        {
          path: "dataUpload",
          name: "DataUpload",
          component: () =>
            import("@/views/DataLoad/TargetLoad/DataUpload/index.vue"),
        },
        {
          path: "loadStatus",
          name: "LoadStatus",
          component: () =>
            import("@/views/DataLoad/TargetLoad/LoadStatus/index.vue"),
        },
        {
          path: "confirmPage",
          name: "ConfirmPage",
          component: () =>
            import("@/views/DataLoad/TargetLoad/ConfirmPage/index.vue"),
        },
      ],
    },
    {
      path: "equipmentConfig",
      name: "EquipmentConfig",
      component: () => import("@/views/DataLoad/EquipmentConfig/index.vue"),
      children: [],
    },
  ],
};

export default DataLoadRoutes;
