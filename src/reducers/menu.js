import { memoize } from 'lodash';
/* eslint-disable no-case-declarations */
export default (
  state = {
    menuData: [
      {
        path: '/contacts-v1/internal',
        name: '内部通讯录',
      },
      {
        path: '/contacts-v1/family-school',
        name: '家校通讯录',
      },
      {
        path: '/contacts-v1/personnel',
        name: '人员管理',
      },
      {
        path: '/contacts-v1/department',
        name: '部门岗位',
      },
      {
        path: '/contacts-v1/subordinate',
        name: '下属组织管理',
      },
      {
        name: '标签',
        children: [
          {
            path: '/contacts-v1/person-tag',
            name: '个人标签',
          },
          {
            path: '/contacts-v1/currency-tag',
            name: '通用标签',
          },
          {
            path: '/contacts-v1/system-tag',
            name: '系统标签',
          },
        ],
        path: '/contacts-v1/tag',
      },
    ],
    overallMenuData: [
      {
        url: '/contacts-v1',
        menuName: '新-通讯录',
        subMenus: [
          {
            url: '/contacts-v1/internal',
            menuName: '内部通讯录',
          },
          {
            url: '/contacts-v1/family-school',
            menuName: '家校通讯录',
          },
          {
            url: '/contacts-v1/personnel',
            menuName: '人员管理',
          },
          {
            url: '/contacts-v1/department',
            menuName: '部门岗位',
          },
          {
            url: '/contacts-v1/subordinate',
            menuName: '下属组织管理',
          },
          {
            menuName: '标签',
            subMenus: [
              {
                url: '/contacts-v1/person-tag',
                menuName: '个人标签',
              },
              {
                url: '/contacts-v1/currency-tag',
                menuName: '通用标签',
              },
              {
                url: '/contacts-v1/system-tag',
                menuName: '系统标签',
              },
            ],
            url: '/contacts-v1/tag',
          },
        ],
      },
      {
        url: '/settings-v1',
        menuName: '新-系统设置',
        subMenus: [
          {
            url: '/settings-v1/authority',
            menuName: '权限系统',
          },
        ],
      },
    ],
  },
  action,
) => {
  switch (action.type) {
    case 'menu/save':
      return { ...state, ...action.payload };
    case 'menu/setMenuData':
      const { menus, activeMenuIndex } = action.payload;

      if (!menus || menus.length === 0) {
        return state;
      }
      // 根据全局传进来的菜单和高亮位置确定当前的菜单项
      const originMenuData = menus[activeMenuIndex]
        ? menus[activeMenuIndex].subMenus
        : [];
      // const menuData = state.menuData;
      const menuData = generateMenu(originMenuData);

      // const newRoutes = filterRoutes(menus, routes);
      // const originalMenuData = memoizeOneFormatter(newRoutes);
      // const allMenuData = filterMenuData(originalMenuData);
      // let menuData = [];
      // const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);

      // if (query.parentUri) {
      //   menuData = [currentMenuData(allMenuData)];
      // } else {
      //   menuData = allMenuData;
      // }
      // debugger;
      return {
        ...state,
        overallMenuData: menus,
        menuData /*  breadcrumbNameMap, routerData: newRoutes, */,
      };
    default:
      return state;
  }
};

const generateMenu = memoize(function generateMenu(menus) {
  return (menus || []).map(({ url, menuName, icon, subMenus }) => ({
    path: url,
    name: menuName,
    icon,
    children: generateMenu(subMenus),
  }));
});
