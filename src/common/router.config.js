import React from 'react';
import { BugOutlined } from '@ant-design/icons';

import contacts from './routers/contacts';
import settings from './routers/settings';
import resource_content from './routers/resource-content';
import safety_campus from './routers/safety-campus';
import access_center from './routers/access-center';

const routerMap = {
  '/': {
    exact: true,
    component: React.lazy(() => import('../layouts/basic-layout')),
    children: {
      ...contacts,
      ...settings,
      ...resource_content,
      ...safety_campus,
      ...access_center
    }
  }
};

// 开发状态才有的路由
if (window._IS_LOCAL) {
  routerMap['/'].children['/example'] = {
    name: 'Examples',
    icon: <BugOutlined />,
    children: {
      '/form-page': {
        name: 'Form Demo',
        component: React.lazy(() => import('../pages/examples/form-page'))
      }
    }
  };
}

export default routerMap;
