// CMS模块底下的路由表

const CentralMaintenanceRoutes = {
  path: "/centralMaintenance",
  name: "CentralMaintenance",
  redirect: "/centralMaintenance/failureReport",
  component: () => import("@/views/CentralMaintenance/CentralMaintenance.vue"),
  children: [
    {
      path: "failureReport",
      name: "FailureReport",
      redirect: "/centralMaintenance/failureReport/failureList",
      component: () =>
        import("@/views/CentralMaintenance/FailureReport/index.vue"),
      children: [
        {
          path: "failureList",
          name: "FailureList",
          component: () =>
            import(
              "@/views/CentralMaintenance/FailureReport/FailureReportDefaultPage.vue"
            ),
        },
        {
          path: "selectFailuresDetails",
          name: "SelectFailuresDetails",
          component: () =>
            import(
              "@/views/CentralMaintenance/FailureReport/SelectFailuresDetails.vue"
            ),
        },
      ],
    },
    {
      path: "groundTest",
      name: "GroundTest",
      component: () =>
        import("@/views/CentralMaintenance/GroundTest/index.vue"),
      children: [
        {
          path: "testList",
          name: "TestList",
          component: () =>
            import(
              "@/views/CentralMaintenance/GroundTest/GroundTestTestListPage.vue"
            ),
        },
        {
          path: "selectTestNew",
          name: "SelectTestNew",
          component: () =>
            import(
              "@/views/CentralMaintenance/GroundTest/GroundTestSelectTestNewPage.vue"
            ),
        },
        {
          path: "threeTests",
          name: "ThreeTests",
          component: () =>
            import(
              "@/views/CentralMaintenance/GroundTest/GroundTestThreeTestsPage.vue"
            ),
        },
        {
          path: "interactiveTest",
          name: "InteractiveTest",
          component: () =>
            import(
              "@/views/CentralMaintenance/GroundTest/GroundTestInteractiveTestPage.vue"
            ),
        },
        {
          path: "viewDetail",
          name: "ViewDetail",
          component: () =>
            import(
              "@/views/CentralMaintenance/GroundTest/GroundTestViewDetailPage.vue"
            ),
        },
      ],
    },

    {
      path: "configuration",
      name: "Configuration",
      component: () =>
        import("@/views/CentralMaintenance/Configuration/index.vue"),
      children: [
        {
          path: "configurationSelection",
          name: "ConfigurationSelection",
          component: () =>
            import(
              "@/views/CentralMaintenance/Configuration/ConfigurationSelection.vue"
            ),
        },
        {
          path: "configurationDisplay",
          name: "ConfigurationDisplay",
          component: () =>
            import(
              "@/views/CentralMaintenance/Configuration/ConfigurationDisplay.vue"
            ),
        },
      ],
    },
    {
      path: "nvmData",
      name: "NVMData",
      component: () => import("@/views/CentralMaintenance/NVMData/index.vue"),
      children: [
        {
          path: "nvmDataDefault",
          name: "NVMDataDefault",
          component: () =>
            import("@/views/CentralMaintenance/NVMData/NVMDataDefaultPage.vue"),
        },
        {
          path: "nvmDataManagement",
          name: "NVMDataManagement",
          component: () =>
            import(
              "@/views/CentralMaintenance/NVMData/NVMDataManagementPage.vue"
            ),
        },
      ],
    },
    {
      path: "extendedFunctions",
      name: "ExtendedFunctions",
      component: () =>
        import("@/views/CentralMaintenance/ExtendedFunctions/index.vue"),
      children: [
        {
          path: "extendedFunctionsDefault",
          name: "ExtendedFunctionsDefault",
          component: () =>
            import(
              "@/views/CentralMaintenance/ExtendedFunctions/ExtendedFunctionsDefaultPage.vue"
            ),
          children: [
            {
              path: "engineBalance",
              name: "EngineBalance",
              component: () =>
                import(
                  "@/views/CentralMaintenance/ExtendedFunctions/modules/EngineBalance.vue"
                ),
            },
            {
              path: "flightLegAndPhase",
              name: "FlightLegAndPhase",
              component: () =>
                import(
                  "@/views/CentralMaintenance/ExtendedFunctions/modules/LegPhaseOperation.vue"
                ),
            },
            {
              path: "timeCycles",
              name: "TimeCycles",
              component: () =>
                import(
                  "@/views/CentralMaintenance/ExtendedFunctions/modules/TimeCycles/TimeCyclesDefaultPage.vue"
                ),
            },
            {
              path: "otherFunctions",
              name: "OtherFunctions",
              component: () =>
                import(
                  "@/views/CentralMaintenance/ExtendedFunctions/modules/OtherFunctions.vue"
                ),
            },
          ],
        },
      ],
    },
  ],
};

export default CentralMaintenanceRoutes;
