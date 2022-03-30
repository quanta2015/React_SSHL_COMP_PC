import React from 'react';

export default {
  '/resource-center': {
    name: '资源点管理',
    children: {
      '/group-manage': {
        name: '资源分组管理',
        component: React.lazy(() =>
          import('../../pages/resource-center/group-manage'))
      },
      '/group-manage/*': {
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/resource-center/group-manage'))
      },
      '/resource-point-manage': {
        name: '资源点管理',
        component: React.lazy(() =>
          import('../../pages/resource-center/resource-point-manage'))
      },
      '/edit-form': {
        name: '新建资源点',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/resource-center/edit-form'))
      },
      '/edit-form/:id': {
        name: '编辑资源点',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/resource-center/edit-form'))
      },
    },
  }
};