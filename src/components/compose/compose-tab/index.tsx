/* eslint-disable no-useless-escape */
/* eslint-disable no-warning-comments */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/prefer-regexp-exec */
import React, { useEffect, useState, useContext, useMemo } from 'react';
import { get, omit } from 'lodash';
import { message } from 'antd';
import classNames from 'classnames';
import {
  withRouter,
  RouteComponentProps,
  Switch,
  Route,
  generatePath,
} from 'react-router-dom';
import { ComposeTreeContext } from '@/components/compose-tree';
import net from '@/services/index';
import { Spin, Empty } from '@/components/blank';
import useUnmounted from '@/common/use-unmounted';
// import NotFound from '@/pages/not-found';
import Tab from './tab';
import { PropTypes } from './interface';
import './index.less';

const TabContainer = withRouter(function ComposeTab({
  request,
  onChange,
  children,
  defaultActiveKey,
  onActiveChange,
  routerConfig,
  history,
  dataSource: propsDataSource,
  match,
  staticContext,
  className,
  noTab = true,
  hideWhenOnlyOne,
  addParams = false,
  // templateMap: propsTemplateMap = {},
  ...others
}: PropTypes &
  RouteComponentProps<{
    0?: string;
  }>) {
  // 获取 ComposeTreeContext 里面的属性为 activeKey 的值
  const treeActiveKey = get(useContext(ComposeTreeContext), 'activeKey');
  const { path, url } = match;
  const {
    location: { search },
  } = history;
  const [unmounted] = useUnmounted();
  // Tab 的数据
  const [dataSource, setDataSource] = useState(propsDataSource || []);
  const [tabActiveKey, setTabActiveKey] = useState(null);
  const [loading, setLoading] = useState(true);
  // 获取 request 里的 getTabDataSource 属性
  const getTabDataSource = get(request, 'getTabDataSource');
  // 命中这一级的路由 path，要去掉星号
  // eslint-disable-next-line no-useless-escape
  const pathPrefix = path.replace(/[\/\*]+$/, '');

  // 获取 url 中的 activeKey
  // 因为要向后取一级，因此 url 中取不到，要用 history.location.pathname
  const urlActiveKey = history.location.pathname.match(
    new RegExp(`^${generatePath(pathPrefix, omit(match.params, 0))}/([^/]+)`),
  );
  console.log(urlActiveKey, 'urlActiveKey', dataSource);
  // debugger;
  // 通过 key 判断去哪个模块
  function goToModuleByKey(key: string, isReplace = false) {
    // debugger;
    if (!routerConfig || unmounted.current) return;

    const matchedModuleConfig = routerConfig.find((_) => _.path === key);
    if (!matchedModuleConfig) {
      console.error(`ComposeTab：没有找到 key 为(${key}) 对应的 module`);
      return;
    }
    // const { isTree } = matchedModuleConfig;

    setTabActiveKey(key);
    // 转义url中的英文括号
    const matchedParams = match.params[0]
      ?.replace(/\(/g, '\\(')
      ?.replace(/\)/g, '\\)');
    let newUrl = `${url
      .replace(new RegExp(`${matchedParams}$`), '')
      .replace(/[\/]+$/, '')}/${key}/${search}`;
    // 当且进度addParams为true时转化路由后会带上之前的参数
    if (addParams) {
      newUrl = `${newUrl}${newUrl.match('/$') ? '' : '/'}${match.params[0]}`;
    }
    // debugger;
    history[isReplace ? 'replace' : 'push'](newUrl);
  }

  // 计算初始化路由
  // 如果没有指定默认 module，则默认选中第一个 tab 节点
  useEffect(() => {
    // 等拿到 dataSource 再处理
    if (!dataSource || dataSource.length <= 0) {
      return;
    }
    if (urlActiveKey) {
      if (dataSource.some(({ value }) => value === urlActiveKey[1])) {
        setTabActiveKey(urlActiveKey[1]);
        return;
      } else if (!addParams) {
        // 当addParams为true时，表示url携带了参数，该情况一定会触发提示，该判断用来过滤不触发提示
        message.info('没有找到指定选项卡，为您跳转到第一个选项卡。');
      }
    }
    // url 中没有指定 activeKey、或者指定的 activeKey 在 dataSource 中不存在，则重定向到第一个 tab
    const defaultKey =
      defaultActiveKey === undefined
        ? get(dataSource, [0, 'value'])
        : defaultActiveKey;
    // goToModuleByKey(defaultKey, true);
    // setTabActiveKey(defaultKey);
    setTimeout(() => {
      goToModuleByKey(defaultKey, true);
      setTabActiveKey(defaultKey);
    }, 1000);
  }, [dataSource.length, urlActiveKey, treeActiveKey]);

  // 初始化获取 tab 列表
  useEffect(() => {
    if (!getTabDataSource) {
      return;
    }
    const { url, method, params = {} } = getTabDataSource;
    // tslint:disable-next-line: no-floating-promises
    net
      .request(url, {
        method,
        data: {
          ...params,
          // activeKey
        },
      })
      .then(({ data }) => {
        setDataSource(data.dataSource);
        setLoading(false);
        // setTabActiveKey(data.dataSource[0].key);
        // setTemplateMap({...templateMap, ...data.templateMap});
      })
      .catch((err) => {
        // err?.stopPropagation();
        console.log(err);
        setLoading(false);
      });
  }, [
    /* getTabDataSource,  */
    treeActiveKey,
  ]);
  // 组件 Tab 的 change 事件
  const handleChange = (nextTabActiveKey: any) => {
    // debugger;
    setTabActiveKey(nextTabActiveKey);
    onChange && onChange(nextTabActiveKey);
    goToModuleByKey(nextTabActiveKey);
    // history.push(`${pathPrefix}/${nextTabActiveKey}`);
    // setActiveId(templateMap[activeKey]);
  };

  const $routes = useMemo(() => {
    return (routerConfig || []).reduce(
      (result, { isTree, path: modulePath, Com }) => {
        // todo: path 可能要拼接
        const purePath = modulePath?.replace(/^\//, '').replace(/\/\*$/, '');
        // 如果是树节点，需要额外拼接 param
        // debugger;
        if (isTree) {
          return [
            ...result,
            <Route
              key={purePath}
              path={`${pathPrefix}/${purePath}`}
              exact
              render={(props) => (
                <React.Suspense fallback={<Spin />}>
                  <Com {...props} />
                </React.Suspense>
              )}
            />,
            <Route
              key={purePath}
              path={`${pathPrefix}/${purePath}/:treePath/*`}
              exact
              render={(props) => (
                <React.Suspense fallback={<Spin />}>
                  <Com {...props} />
                </React.Suspense>
              )}
            />,
          ];
        }
        return [
          ...result,
          <Route
            key={purePath}
            path={`${pathPrefix}/${purePath}/*`}
            exact
            render={(props) => (
              <React.Suspense fallback={<Spin />}>
                <Com {...props} />
              </React.Suspense>
            )}
          />,
          <Route
            key={purePath}
            path={`${pathPrefix}/${purePath}`}
            exact
            render={(props) => (
              <React.Suspense fallback={<Spin />}>
                <Com {...props} />
              </React.Suspense>
            )}
          />,
        ];
      },
      [],
    );
  }, [routerConfig]);

  return (
    <div
      className={classNames(className, 'cf-compose-tab', {
        // 'no-margin': !(hideWhenOnlyOne && dataSource.length === 1)
      })}
    >
      {dataSource?.length > 1 && noTab && (
        <div className="tab-row">
          <Tab
            {...others}
            hideWhenOnlyOne={hideWhenOnlyOne}
            value={tabActiveKey}
            onChange={handleChange}
            dataSource={dataSource}
          />
        </div>
      )}

      <div
        className={`content-row tab-length-${
          dataSource.length > 1 ? 'more' : 'less'
        }`}
      >
        <Switch>
          {$routes}
          {loading && <Route render={Spin} />}
        </Switch>
        {!loading && dataSource.length === 0 ? <Empty /> : null}
        {/* <Template activeId={tabActiveKey} onActiveChange={onActiveChange}>
          {childrenWithProps}
        </Template> */}
      </div>
    </div>
  );
});

export default React.memo(TabContainer);
export { PropTypes };
