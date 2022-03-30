import React from 'react';
import { MenuOutlined } from '@ant-design/icons';

export default {
  '/settings-v1': {
    name: '系统设置',
    icon: <MenuOutlined />,
    children: {
      '/authority': {
        name: '权限系统',
        component: React.lazy(() => import('../../pages/settings/authority'))
      },
      '/authority/:treePath/*': {
        hidden: true,
        component: React.lazy(() => import('../../pages/settings/authority'))
      },
      '/manage-tool': {
        name: '异常处理',
        component: React.lazy(() => import('../../pages/settings/manage-tool'))
      }
    }
  }
};
