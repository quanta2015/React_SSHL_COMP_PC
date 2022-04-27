const Microsite = '/contacts';
export default {
  breadcrumbName: '通讯录',
  path: Microsite,
  routes: [
    {
      path: `${Microsite}/internal`,
      component: './contacts/internal',
      breadcrumbName: '内部通讯录',
    },
    {
      path: `${Microsite}/internal/:treePath/*`,
      component: './contacts/internal',
      breadcrumbName: '内部通讯录',
    },
    {
      path: `${Microsite}/staffmanage`,
      component: './contacts/staffmanage',
      breadcrumbName: '员工管理',
    },
    {
      path: `${Microsite}/staffmanage/add`,
      component: './contacts/staffmanage/add',
      breadcrumbName: '添加人员',
    },
    {
      path: `${Microsite}/staffmanage/add/:id`,
      component: './contacts/staffmanage/add',
      breadcrumbName: '编辑',
    },
  ],
};
