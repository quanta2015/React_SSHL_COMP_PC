import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MenuOutlined } from '@ant-design/icons';
import { getRouterData, parseParam } from '@/common/util';
import { getAuthority } from '@/common/authority';
import styles from './index.less';

const { Sider } = Layout;
const { SubMenu } = Menu;
// 企微进入时会附带的路径参数parentUri
const parentUri = parseParam()?.parentUri;

function getActiveKey(menuList, pathname, selectedKeys, openKeys, activeMenu) {
  let matchedItem = {};
  if (activeMenu) {
    matchedItem = menuList.find(({ path }) => path === activeMenu);
  } else {
    matchedItem = menuList.find(({ path }) => path && new RegExp(`^${  path.replace(/\/*$/, '(\\/|$)')}`).test(pathname));
  }
  // 没有找到匹配的菜单项，则去所有下级节点中找
  if (!matchedItem) {
    const menuWithChildren = menuList.filter(
      _ => _.children && _.children.length
    );
    const matched = menuWithChildren.find(_ => {
      getActiveKey(_.children, pathname, selectedKeys, openKeys, activeMenu);
      if (selectedKeys.length) {
        return true;
      }
      return false;
    });
    if (matched) {
      selectedKeys.unshift(matched.path);
      openKeys.unshift(matched.path);
    }
    return;
  }
  // 如果没有子节点，则选中当前节点
  if (!matchedItem.children || !matchedItem.children.length) {
    selectedKeys.push(matchedItem.path);
    return;
  }
  // 递归在子节点中找，当前节点默认展开
  openKeys.push(matchedItem.path);
  // 尾调用优化
  getActiveKey(matchedItem.children, pathname, selectedKeys, openKeys);
}

export default withRouter(props => {
  const { location } = props;
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const { menuData, collapsed } = useSelector(state => state.menu);
  const configMenuDataFlatten = getRouterData(props.menuData);

  const currentMenuData = configMenuDataFlatten.find(({ configPath }) => new RegExp(`^${  configPath.replace(/\/*$/, '(\\/|$)')}`).test(location.pathname));
  const activeMenu = currentMenuData?.activeMenu || '';

  useEffect(() => {
    // console.log('^' + url.replace(/\/*$/, '/'));
    const nextSelectedKeys = [];
    const nextOpenKeys = [];
    getActiveKey(menuData, location.pathname, nextSelectedKeys, nextOpenKeys, activeMenu);
    setSelectedKeys(nextSelectedKeys);
    setOpenKeys(Array.from(new Set([...openKeys, ...nextOpenKeys])));
  }, [menuData, location.pathname]);

  const handleCreateMenu = menus => {
    if (!menus) return [];
    const res_menus = menus.filter(item => item.name && !item.hidden)
      .filter(item => handleFilterAuthorityMenu(item))
      .map(item => getSubMenuOrMenuItem(item))
      .filter(item => item);
    
    //  console.log(res_menus, '21111', menus, props.menuData) 
    // 过滤掉非parentUri中配置的路由菜单
    if (parentUri) {
      const parentUriArray = parentUri?.split('/');
      return res_menus.filter(({ key }) => (parentUriArray?.length <= 2 ?
        key.indexOf(`/${  parentUriArray[1]}`) === 0 :
        (`/${  parentUriArray[1]}`).indexOf(key) === 0) || parentUri === key);
    }
    return res_menus;
  };

  const handleFilterAuthorityMenu = item => !item.authority || item.authority === getAuthority();

  const getSubMenuOrMenuItem = item => {

    if (item.children && item.children.length) {
      return (
        <SubMenu
          icon={<MenuOutlined />}
          key={item.path}
          title={(<span>{item.name}</span>)}
        >
          {item.children.map(m => getSubMenuOrMenuItem(m))}
        </SubMenu>
      );
    }

    if (item.hidden) return null;
    const newitemPath = !parentUri ? item.path : item.path?.indexOf('?') === -1 ? `${item.path}?parentUri=${parentUri}` : `${item.path}&parentUri=${parentUri}`;

    return (
      <Menu.Item key={item.path} icon={<MenuOutlined />}>
        <Link
          to={newitemPath}
          replace={item.path === props.location.pathname}
        >
          <span className="menu-name-text">{item.name}</span>
        </Link>
      </Menu.Item>
    );
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className={styles.sider} width={230}>
      <Menu
        className={styles['sider-menu']}
        theme="light"
        mode="inline"
        selectedKeys={selectedKeys}
        onOpenChange={setOpenKeys}
        openKeys={openKeys}
      >
        {handleCreateMenu(menuData)}
      </Menu>
    </Sider>
  );
});
