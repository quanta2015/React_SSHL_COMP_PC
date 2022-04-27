import React from 'react';

export default {
  '/contacts-v1': {
    name: '通讯录',
    children: {
      '/internal': {
        name: '内部通讯录',
        component: React.lazy(() => import('../../pages/contacts/internal'))
      },
      '/internal/*': {
        hidden: true,
        component: React.lazy(() => import('../../pages/contacts/internal'))
      },
      '/family-school': {
        name: '家校通讯录',
        component: React.lazy(() =>
          import('../../pages/contacts/family-school')
        )
      },
      '/family-school/:treePath/*': {
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/family-school')
        )
      },
      '/personnel': {
        name: '人员管理',
        component: React.lazy(() => import('../../pages/contacts/personnel'))
      },
      '/personnel/*': {
        hidden: true,
        component: React.lazy(() => import('../../pages/contacts/personnel'))
      },
      '/personnel-student-form': {
        activeMenu: '/contacts-v1/personnel',
        name: '添加学生',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/personnel-student-form')
        )
      },
      '/personnel-student-form/:id': {
        activeMenu: '/contacts-v1/personnel',
        name: '编辑学生',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/personnel-student-form')
        )
      },
      '/personnel-employee-form': {
        activeMenu: '/contacts-v1/personnel',
        name: '添加教职工',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/personnel-employee-form')
        )
      },
      '/personnel-employee-form/:id': {
        activeMenu: '/contacts-v1/personnel',
        hidden: true,
        name: '编辑教职工',
        component: React.lazy(() =>
          import('../../pages/contacts/personnel-employee-form')
        )
      },
      '/batch-personnel-student': {
        activeMenu: '/contacts-v1/personnel',
        name: '批量导入导出学生',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/batch-personnel-student')
        )
      },
      '/batch-personnel-student/*': {
        activeMenu: '/contacts-v1/personnel',
        name: '批量导入导出学生',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/batch-personnel-student')
        )
      },
      '/batch-personnel-employee': {
        activeMenu: '/contacts-v1/personnel',
        name: '批量导入导出教职工',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/batch-personnel-employee')
        )
      },
      '/batch-personnel-employee/*': {
        activeMenu: '/contacts-v1/personnel',
        name: '批量导入导出教职工',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/batch-personnel-employee')
        )
      },
      '/batch-department-teacher': {
        activeMenu: '/contacts-v1/department',
        name: '批量设置',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/batch-department-teacher')
        )
      },
      '/batch-department-teacher/*': {
        activeMenu: '/contacts-v1/department',
        name: '批量设置',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/batch-department-teacher')
        )
      },
      '/personnel-fields/*': {
        activeMenu: '/contacts-v1/personnel',
        name: '设置人员字段',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/personnel-fields')
        )
      },
      '/department': {
        name: '部门岗位',
        component: React.lazy(() => import('../../pages/contacts/department'))
      },
      '/department/*': {
        hidden: true,
        component: React.lazy(() => import('../../pages/contacts/department'))
      },
      '/subordinate': {
        name: '下属组织管理',
        component: React.lazy(() => import('../../pages/contacts/subordinate'))
      },
      '/person-tag': {
        name: '个人标签',
        component: React.lazy(() => import('../../pages/contacts/person-tag'))
      },
      '/batch-person-tag': {
        activeMenu: '/contacts-v1/person-tag',
        name: '批量导入标签人员',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/batch-person-tag')
        )
      },
      '/batch-person-tag/*': {
        activeMenu: '/contacts-v1/person-tag',
        name: '批量导入标签人员',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/batch-person-tag')
        )
      },
      '/person-tag/:treePath/*': {
        hidden: true,
        component: React.lazy(() => import('../../pages/contacts/person-tag'))
      },
      '/currency-tag': {
        name: '通用标签',
        component: React.lazy(() => import('../../pages/contacts/currency-tag'))
      },
      '/batch-currency-tag': {
        activeMenu: '/contacts-v1/currency-tag',
        name: '批量导入标签人员',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/batch-currency-tag')
        )
      },
      '/batch-currency-tag/*': {
        activeMenu: '/contacts-v1/currency-tag',
        name: '批量导入标签人员',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/batch-currency-tag')
        )
      },
      '/currency-tag/:treePath/*': {
        hidden: true,
        component: React.lazy(() => import('../../pages/contacts/currency-tag'))
      },
      '/system-tag': {
        name: '系统标签',
        component: React.lazy(() => import('../../pages/contacts/system-tag'))
      },
      '/system-tag/:treePath/*': {
        hidden: true,
        component: React.lazy(() => import('../../pages/contacts/system-tag'))
      },
      '/analysis': {
        name: '统计分析',
        component: React.lazy(() => import('../../pages/contacts/analysis'))
      },
      '/analysis/*': {
        name: '统计分析',
        component: React.lazy(() => import('../../pages/contacts/analysis'))
      },
      '/analysis-error': {
        activeMenu: '/contacts-v1/analysis',
        name: '异常',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/analysis/error-list')
        )
      },
      '/analysis-detail': {
        activeMenu: '/contacts-v1/analysis',
        name: '查看',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/analysis/detail')
        )
      },
      '/analysis-attention/:type': {
        activeMenu: '/contacts-v1/analysis',
        name: '人员关注状态',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/analysis/attention')
        )
      },
      '/analysis-grade': {
        activeMenu: '/contacts-v1/analysis',
        name: '异常年级',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/analysis/abnormal-grade')
        )
      },
      '/analysis-class': {
        activeMenu: '/contacts-v1/analysis',
        name: '异常班级',
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/contacts/analysis/abnormal-class')
        )
      },
      '/base-report': {
        name: '局端统计报表',
        component: React.lazy(() => import('../../pages/contacts/statistica-report/base-report'))
      },
      '/base-report/*': {
        name: '局端统计报表',
        component: React.lazy(() => import('../../pages/contacts/statistica-report/base-report'))
      },
      '/import-data': {
        name: '导入数据情况',
        component: React.lazy(() => import('../../pages/contacts/statistica-report/import-data'))
      },
      '/import-data/*': {
        name: '导入数据情况',
        component: React.lazy(() => import('../../pages/contacts/statistica-report/import-data'))
      }
    }
  }
};
