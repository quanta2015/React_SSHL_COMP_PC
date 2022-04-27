import React from 'react';

export default {
  '/access-center': {
    name: '接入运维',
    children: {
      '/device-plan-v2': {
        name: '门禁管理',
        component: React.lazy(() =>
          import('../../pages/access-center/device-plan')
        )
      },
      '/device-plan-v2/*': {
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/access-center/device-plan')
        )
      }
    }
  }
};
