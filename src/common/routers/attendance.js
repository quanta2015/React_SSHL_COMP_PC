import React from 'react';

export default {
  '/attendance-v2': {
    name: '教师考勤',
    children: {
      '/manage': {
        activeMenu: '/safety-campus/attendance-v2',
        // hidden: true,
        name: '添加',
        component: React.lazy(() =>
          import('../../pages/attendance/tearch/rule-manage/manage')
        ),
      },
      '/manage/*': {
        activeMenu: '/safety-campus/attendance-v2/list',
        hidden: true,
        name: '添加',
        component: React.lazy(() =>
          import('../../pages/attendance/tearch/rule-manage/manage')
        ),
      },
      '/update-manage/:id/*': {
        activeMenu: '/safety-campus/attendance-v2/list',
        hidden: true,
        name: '编辑',
        component: React.lazy(() =>
          import('../../pages/attendance/tearch/rule-manage/manage')
        ),
      },

      '/list': {
        name: '考勤规则管理',
        component: React.lazy(() =>
          import('../../pages/attendance/tearch/rule-manage/List')
        ),
      },

      '/list/*': {
        name: '考勤规则管理',
        component: React.lazy(() =>
          import('../../pages/attendance/tearch/rule-manage/List')
        ),
      },

      '/statistics': {
        name: '考勤统计',
        component: React.lazy(() =>
          import('../../pages/attendance/tearch/statistics')
        ),
      },
      '/statistics/*': {
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/attendance/tearch/statistics')
        ),
      },
      '/journal-query': {
        name: '当天查询',
        component: React.lazy(() =>
          import('../../pages/attendance/tearch/statistics/journal-query')
        ),
      },
      '/journal-query/*': {
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/attendance/tearch/statistics/journal-query')
        ),
      },
      // '/history-teather-details': {
      //   name: '历史考勤明细',
      //   component: React.lazy(() =>
      //     import('../../pages/attendance/tearch/statistics/historyTeacherDetails')
      //   ),
      // },
      // '/now-teather-details': {
      //   name: '今日考勤明细',
      //   component: React.lazy(() =>
      //     import('../../pages/attendance/tearch/statistics/nowTeacherDetails')
      //   ),
      // },
    },
  },
  '/attendance-student-v2': {
    name: '学生考勤',
    children: {
      '/list': {
        name: '考勤规则管理',
        component: React.lazy(() =>
          import('../../pages/attendance/student/rule-manage/List')
        ),
      },

      '/list/*': {
        name: '考勤规则管理',
        component: React.lazy(() =>
          import('../../pages/attendance/student/rule-manage/List')
        ),
      },
      '/manage': {
        activeMenu: '/safety-campus/attendance-v2',
        // hidden: true,
        name: '添加',
        component: React.lazy(() =>
          import('../../pages/attendance/student/rule-manage/manage')
        ),
      },
      '/manage/*': {
        activeMenu: '/safety-campus/attendance-v2/list',
        hidden: true,
        name: '添加',
        component: React.lazy(() =>
          import('../../pages/attendance/student/rule-manage/manage')
        ),
      },
      '/update-manage/:id/*': {
        activeMenu: '/safety-campus/attendance-v2/list',
        hidden: true,
        name: '编辑',
        component: React.lazy(() =>
          import('../../pages/attendance/student/rule-manage/manage')
        ),
      },

      '/report-list': {
        name: '报告推送管理',
        component: React.lazy(() =>
          import('../../pages/attendance/student/report-manage/List')
        ),
      },

      '/report-list/*': {
        name: '报告推送管理',
        component: React.lazy(() =>
          import('../../pages/attendance/student/report-manage/List')
        ),
      },

      '/report-manage': {
        name: '添加',
        component: React.lazy(() =>
          import('../../pages/attendance/student/report-manage/manage')
        ),
      },

      '/report-manage/*': {
        name: '添加',
        component: React.lazy(() =>
          import('../../pages/attendance/student/report-manage/manage')
        ),
      },
      '/update-report-manage/:id/*': {
        activeMenu: '/safety-campus/attendance-v2/list',
        hidden: true,
        name: '编辑',
        component: React.lazy(() =>
          import('../../pages/attendance/student/report-manage/manage')
        ),
      },

      '/help': {
        name: '放学助手',
        component: React.lazy(() =>
          import('../../pages/attendance/student/help')
        ),
      },
      '/help/*': {
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/attendance/student/help')
        ),
      },

      // '/statistics': {
      //   name: '考勤统计',
      //   component: React.lazy(() =>
      //     import('../../pages/attendance/student/statistics')
      //   )
      // },

      // '/statistics/*': {
      //   hidden: true,
      //   component: React.lazy(() =>
      //     import('../../pages/attendance/student/statistics')
      //   )
      // }
    },
  },
  '/attendance-student-statistics-v2': {
    name: '学生考勤统计',
    children: {
      '/record-query': {
        name: '考勤记录查询',
        component: React.lazy(() =>
          import('../../pages/attendance/student/statistics/record')
        ),
      },
      '/record-query/*': {
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/attendance/student/statistics/record')
        ),
      },
      '/journal-query': {
        name: '当天查询',
        component: React.lazy(() =>
          import('../../pages/attendance/student/statistics/journal-query')
        ),
      },
      '/journal-query/*': {
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/attendance/student/statistics/journal-query')
        ),
      },
      '/reissue-check': {
        name: '补打卡统计',
        component: React.lazy(() =>
          import('../../pages/attendance/student/statistics/reissue-check')
        ),
      },
      '/reissue-check/*': {
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/attendance/student/statistics/reissue-check')
        ),
      },
      '/big-screen': {
        name: '考勤大屏可视化',
        component: React.lazy(() =>
          import('../../pages/attendance/student/statistics/big-screen')
        ),
      },
      '/big-screen/*': {
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/attendance/student/statistics/big-screen')
        ),
      },
      '/big-screen-leave': {
        name: '离校',
        component: React.lazy(() =>
          import('../../pages/attendance/student/statistics/big-screen-leav')
        ),
      },

      '/big-screen-leave/*': {
        hidden: true,
        component: React.lazy(() =>
          import('../../pages/attendance/student/statistics/big-screen-leav')
        ),
      },
      // '/historical-attendance-details': {
      //   name: '历史考勤明细',
      //   component: React.lazy(() =>
      //     import('../../pages/attendance/student/statistics/historicalAttendanceDetails')
      //   ),
      // },
      // '/now-attendance-details': {
      //   name: '今日考勤明细',
      //   component: React.lazy(() =>
      //     import('../../pages/attendance/student/statistics/nowAttendanceDetails')
      //   ),
      // },
    },
  },
  '/check-v2': {
    name: '晨午检',
    children: {
      '/list': {
        name: '填报明细',
        component: React.lazy(() =>
          import('../../pages/attendance/check/list')
        ),
      },
      '/list/:id': {
        name: '填报明细',
        component: React.lazy(() =>
          import('../../pages/attendance/check/list')
        ),
      },
      '/bureau-list': {
        name: '局端填报明细',
        component: React.lazy(() =>
          import('../../pages/attendance/check/list/bureauIndex')
        ),
      },
      '/download/:id': {
        name: '下载',
        component: React.lazy(() =>
          import('../../pages/attendance/check/list/download')
        ),
      },
      '/report': {
        name: '统计报表',
        component: React.lazy(() =>
          import('../../pages/attendance/check/list/report')
        ),
      },
    },
  },
};
