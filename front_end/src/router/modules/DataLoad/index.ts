const DataLoadRoutes = {
  path: "dataLoad",
  name: "DataLoad",
  component: () => import("@/views/DataLoad/index.vue"),
  children: [
    {
      path: "targetLoad",
      name: "TargetLoad",
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
        // {
        //   path: "partNumberSelection",
        //   name: "PartNumberSelection",
        //   component: () =>
        //     import("@/views/DataLoad/TargetLoad/PartNumberSelection/index.vue"),
        // },
      ],
    },
    // {
    //   path: "equipmentConfig",
    //   name: "EquipmentConfig",
    //   component: () => import("@/views/EquipmentConfig/index.vue"),
    //   children: [],
    // },
  ],
};

export default DataLoadRoutes;
