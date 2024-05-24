// CMS模块底下的路由表

const ConditionMonitoringRoutes = {
  path: "/conditionMonitoring",
  name: "ConditionMonitoring",
  component: () =>
    import("@/views/ConditionMonitoring/ConditionMonitoring.vue"),
  children: [
    {
      path: "parameterDisplay",
      name: "ParameterDisplay",
      component: () =>
        import("@/views/ConditionMonitoring/ParameterDisplay/index.vue"),
      children: [
        {
          path: "parameterSelect",
          name: "ParameterSelect",
          component: () =>
            import(
              "@/views/ConditionMonitoring/ParameterDisplay/ParameterSelect.vue"
            ),
        },
        {
          path: "startView",
          name: "StartView",
          component: () =>
            import(
              "@/views/ConditionMonitoring/ParameterDisplay/StartView.vue"
            ),
        },
      ],
    },
    {
      path: "parameterRecording",
      name: "ParameterRecording",
      component: () =>
        import(
          "@/views/ConditionMonitoring/ParameterRecording/ParameterRecording.vue"
        ),
    },
    {
      path: "eventMonitoring",
      name: "EventMonitoring",
      component: () =>
        import("@/views/ConditionMonitoring/EventMonitoring/index.vue"),
      children: [
        {
          path: "eventDisplay",
          name: "EventDisplay",
          component: () =>
            import(
              "@/views/ConditionMonitoring/EventMonitoring/EventDisplay.vue"
            ),
        },
        {
          path: "paramDisplay",
          name: "ParamDisplay",
          component: () =>
            import(
              "@/views/ConditionMonitoring/EventMonitoring/ParamDisplay.vue"
            ),
        },
      ],
    },
  ],
};

export default ConditionMonitoringRoutes;
