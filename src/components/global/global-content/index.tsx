import React, { useState, useMemo, useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { useSelector } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import classNames from 'classnames';
import './index.less';
import Button from '../button';

export interface PropTypes {
  className?: any;
  children: React.ReactNode;
  footerParams?: any;
}

export interface MenuItem {
  url: string;
  menuName: string;
  subMenus: MenuItem[];
}

/**
 * 找到命中的页面，并生成面包屑路径
 * @param menuList
 * @param pathname
 * @param matchPath
 */
function generateBreadcrumbItems(
  menuList: MenuItem[],
  pathname: string,
  matchPath: string,
): { url: string; name: string }[] {
  let result = [];
  const matchedItem = menuList.find(
    ({ url }) =>
      // 过滤掉首页链接，寻找匹配到的节点
      url &&
      url !== '/' &&
      new RegExp(`^${  url.replace(/\/*$/, '(\\/|$)')}`).test(pathname),
  );

  // 没有找到匹配的菜单项，则去所有下级节点中找
  if (!matchedItem) {
    const menuWithChildren = menuList.filter(
      (_) => _.subMenus && _.subMenus.length,
    );
    let matchedResult = [];
    const matched = menuWithChildren.find((_) => {
      const _subResult = generateBreadcrumbItems(
        _.subMenus,
        pathname,
        matchPath,
      );
      if (_subResult.length) {
        matchedResult = _subResult;
        return true;
      }
      return false;
    });
    if (matched) {
      matchedResult.unshift({
        url: matched.url,
        name: matched.menuName,
      });
    }
    return matchedResult;
  }
  result.push({
    url: matchedItem.url,
    name: matchedItem.menuName,
  });
  // 如果没有子节点，则返回当前节点
  if (matchedItem.subMenus && matchedItem.subMenus.length) {
    result = result.concat(
      generateBreadcrumbItems(matchedItem.subMenus, pathname, matchPath),
    );
  }
  return result;
}

export default withRouter(function GlobalContent({
  history,
  children,
  match,
  className = null,
  footerParams = {},
}: PropTypes & RouteComponentProps) {
  // 参数说明,详情请查看当前目录中的README.md文档
  const { overallMenuData } = useSelector((state) => state.menu);
  const { routerData } = useSelector((state) => state.global);
  const { currentUser } = useSelector((state) => state.user);
  const [$breadcrumbItems, setBreadcrumbItems] = useState([]);
  const [pageTitle, setPageTitle] = useState(currentUser?.orgName || '工作台');
  const [hasGoBack, setHasGoBack] = useState(false);
  const $goBackItem = useMemo(
    () => (
      // <Breadcrumb.Item key="__go_back">
      <Button
        onClick={() => {
          history.go(-1);
        }}
        buttonProps={{
          className: 'breadcrumb-go-back',
          type: 'link',
          style: {
            padding: '0',
          },
        }}
        text="<< 返回"
      />
      // </Breadcrumb.Item>
    ),
    [history],
  );
  useEffect(() => {
    // 更新面包屑列表
    const breadcrumbItems = generateBreadcrumbItems(
      overallMenuData,
      history.location.pathname,
      match.path,
    );

    const getCharCount = (str: any, char: any) => {
      const regex = new RegExp(char, 'g'); // 使用g表示整个字符串都要匹配
      const result = str.match(regex); // match方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
      const count = !result ? 0 : result.length;
      return count;
    };

    let $nextBreadcrumbItems = [];
    // 如果找不到，给一个返回按钮，并且加上当前页的名称
    if (
      breadcrumbItems.length <= 1 ||
      (getCharCount(match.path, '/') >= 4 &&
        breadcrumbItems.length === 2 &&
        match.path.includes('/safety-campus/'))
    ) {
      setHasGoBack(true);
      // $nextBreadcrumbItems.unshift($goBackItem);
      // 取命中的路由的名字
      const matchedRouterItem = routerData.find(
        ({ path }) => path === match.path,
      );
      const nextPageTitle = matchedRouterItem
        ? matchedRouterItem.name
        : currentUser?.orgName;
      setPageTitle(nextPageTitle);
      breadcrumbItems.push({ url: '-', name: nextPageTitle });
    } else {
      // 取命中的菜单项的名字作为页面名称
      setPageTitle(breadcrumbItems.slice(-1)[0].name);
    }
    $nextBreadcrumbItems = $nextBreadcrumbItems.concat(
      breadcrumbItems.map(({ name }, index) => (
        <Breadcrumb.Item key={index}>{name}</Breadcrumb.Item>
      )),
    );
    setBreadcrumbItems($nextBreadcrumbItems);
  }, [overallMenuData, history.location.pathname, routerData, currentUser]);

  const clazz = classNames('content-container-body', {
    [className]: !!className,
  });

  return (
    <div className="content-container">
      <DocumentTitle title={pageTitle || '工作台'} />
      <div className="content-container-head">
        {hasGoBack ? $goBackItem : null}
        <Breadcrumb className="content-container-breadcrumb">
          {$breadcrumbItems}
        </Breadcrumb>
        {/* <a className="breadcrumb-content-help">
          <Icon type="question-circle" /> 帮助
        </a> */}
      </div>
      <div className={clazz}>{children}</div>
      <div
        className="content-container-footer"
        style={{ display: footerParams.states ? 'block' : 'none' }}
      >
        <div className="content-container-footer-info">
          {footerParams.demFooter}
        </div>
      </div>
    </div>
  );
});
