// CMS模块底下的路由表

const CentralMaintenanceRoutes = {
  path: '/centralMaintenance',
  name: 'CentralMaintenance',
  component: () => import('@/views/CentralMaintenance/CentralMaintenance.vue'),
  children: [
    {
      path: 'failureReport',
      name: 'FailureReport',
      component: () => import('@/views/CentralMaintenance/FailureReport/index.vue'),
      children: [
        {
          path: 'failureList',
          name: 'FailureList',
          component: () => import('@/views/CentralMaintenance/FailureReport/FailureReportDefaultPage.vue')
        },
          {
          path: 'selectFailuresDetails',
          name: 'SelectFailuresDetails',
          component: () => import('@/views/CentralMaintenance/FailureReport/SelectFailuresDetails.vue')
        }
      ]
    },
    {
      path: 'groundTest',
      name: 'GroundTest',
      component: () => import('@/views/CentralMaintenance/GroundTest/index.vue'),
      children: [
        {
          path: 'testList',
          name: 'TestList',
          component: () => import('@/views/CentralMaintenance/GroundTest/GroundTestTestListPage.vue')
        },
        {
          path: 'newTest',
          name: 'NewTest',
          component: () => import('@/views/CentralMaintenance/GroundTest/GroundTestNewTestPage.vue')
        },
        {
          path: 'selectTest',
          name: 'SelectTest',
          component: () => import('@/views/CentralMaintenance/GroundTest/GroundTestSelectTestPage.vue')
        },
        {
          path: 'threeTests',
          name: 'ThreeTests',
          component: () => import('@/views/CentralMaintenance/GroundTest/GroundTestThreeTestsPage.vue')
        },
        {
          path: 'interactiveTest',
          name: 'InteractiveTest',
          component: () => import('@/views/CentralMaintenance/GroundTest/GroundTestInteractiveTestPage.vue')
        },
        {
          path: 'viewDetail',
          name: 'ViewDetail',
          component: () => import('@/views/CentralMaintenance/GroundTest/GroundTestViewDetailPage.vue')
        },
      ]
    },
    {
      path: 'configuration',
      name: 'Configuration',
      component: () => import('@/views/CentralMaintenance/Configuration/Configuration.vue')
    },
    {
      path: 'nvmData',
      name: 'NVMData',
      component: () => import('@/views/CentralMaintenance/NVMData/NVMData.vue')
    },
    {
      path: 'extendedFunctions',
      name: 'ExtendedFunctions',
      component: () => import('@/views/CentralMaintenance/ExtendedFunctions/ExtendedFunctions.vue')
    }
  ]
}

export default CentralMaintenanceRoutes