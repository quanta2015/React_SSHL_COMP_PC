import React, { useContext } from 'react';
import Tree from './tree';
import {
  IComposeTreeContext,
  TreeDataSource,
  PropTypes,
  SelectedDataNode,
} from './interface';
import { Spin, Permission } from '@/components/blank';
import useComposeTree, {
  SPLITTER,
  ComposeTreeContext,
} from './hooks/use-compose-tree';
import './index.less';
import {
  withRouter,
  RouteComponentProps,
  Switch,
  Route,
} from 'react-router-dom';

function ComposeTree({
  onSelect,
  onUserSelect,
  routerConfig,
  treeColWidth = '260px',
  request,
  ...others
}: PropTypes) {
  const { goToModule, code, dataSource, getRoutePath } =
    useContext(ComposeTreeContext);
  // 之所以要传入 dataSource，是因为有可能内部展示的是搜索的结果，与当前页面
  const handleSelect = (
    nextSelectedKeys: string[],
    event: SelectedDataNode,
    currentDataSource: TreeDataSource,
  ) => {
    // onSelect && onSelect(selectedKeys, event);
    // 禁止反选
    if (nextSelectedKeys.length === 0) return;
    onSelect && onSelect(nextSelectedKeys, event);
    const {
      node: { type, pos },
    } = event;
    // setSelectedTreeNode({ key: selectedKeys[0], node: event.node});
    if (!type) {
      console.error('树节点缺乏 type 属性', event.node);
    }
    // 拼接路径
    const position = pos.split('-').slice(1);
    let traverser = currentDataSource;
    // 将下标路径转换为 key 的路径，放入 url
    const treePath = position
      .map((pos: string) => {
        const { id, children } = traverser[+pos];
        traverser = children;
        return id;
      })
      .join(SPLITTER);
    goToModule(event.node, treePath);
  };

  const $routes = (routerConfig || []).reduce(
    (result, { path: modulePath, Com }) => {
      const { path, purePath } = getRoutePath(modulePath);
      // debugger;
      if (!Com) return null;
      return [
        ...result,
        <Route
          key={purePath}
          path={path}
          render={(props) => (
            <React.Suspense fallback={<Spin />}>
              <Com {...props} />
            </React.Suspense>
          )}
        />,
        <Route
          key={purePath}
          path={`${path}/*`}
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

  console.log(dataSource, 'dataSource', code);
  return (
    <div className="cf-compose-tree">
      <div
        className="tree-col"
        style={{
          width: treeColWidth,
        }}
      >
        <Tree
          {...others}
          request={request}
          dataSource={dataSource}
          permissionCode={code}
          onSelect={handleSelect}
          onUserSelect={onUserSelect}
        />
      </div>
      <div className="content-col">
        <Switch>
          {$routes}
          <Route render={code === 30512 ? Permission : Spin} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(
  ({
    history,
    match,
    location,
    request,
    ...others
  }: RouteComponentProps<{
    treePath: string;
  }> &
    PropTypes) => {
    const composeTreeContext: IComposeTreeContext = useComposeTree({
      history,
      match,
      location,
      request: { getTreeNodes: request.getTreeNodes },
    });
    return (
      <ComposeTreeContext.Provider value={composeTreeContext}>
        <ComposeTree {...others} request={request} />
      </ComposeTreeContext.Provider>
    );
  },
);

export { SPLITTER, ComposeTreeContext, PropTypes };
