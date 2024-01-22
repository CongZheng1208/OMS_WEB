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
          component: () => import('@/views/CentralMaintenance/GroundTest/GroundTestDefaultPage.vue')
        },
        {
          path: 'newTest',
          name: 'NewTest',
          component: () => import('@/views/CentralMaintenance/GroundTest/GroundTestNewTestPage.vue')
        }
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
