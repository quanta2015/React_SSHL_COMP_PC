import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { RouteComponentProps, generatePath } from 'react-router-dom';
import { message } from 'antd';
import { setWith, set, get, clone } from 'lodash';
import moduleMap from '@/common/module-map';
import net from '@/services/index';
import { Request } from '@/components/interface';
import useUnmounted from '@/common/use-unmounted';
import { getUid } from '../utils';
import {
  IComposeTreeContext,
  ExtendedEventNode,
  TreeDataSource,
  TreeNodeKey,
} from '../interface';

export const SPLITTER = ':';

function generateTreeNodesWithUid(
  dataSource: TreeDataSource,

  cached?: TreeDataSource,
): TreeDataSource {
  if (!dataSource) return dataSource;
  // 后端返回的 key 可能会有重复，如果直接作为树节点的 key 会导致渲染异常，因此将 key 存到 id 字段上
  return dataSource.map(({ key, children, ...others }) => {
    const _nodeId = `${key}`;
    // 如果缓存中有该值，则使用缓存的 cache，以免树组件重新渲染
    const matchedCache = cached ? cached.find((_) => _.id === _nodeId) : null;
    return {
      ...others,
      key: matchedCache ? matchedCache.key : getUid(),
      id: _nodeId,
      children: generateTreeNodesWithUid(children),
    };
  });
}

export default ({
  match,
  history,
  request,
}: RouteComponentProps<{
  treePath: string;
}> & {
  request: {
    getTreeNodes: Request;
  };
}): IComposeTreeContext => {
  const [unmounted] = useUnmounted();
  const { getTreeNodes } = request;
  const { path, params } = match;
  const [dataSource, setDataSource] = useState([]);
  const [code, setDataCode] = useState(0);
  // 命中这一级的路由 path，要去掉星号
  const pathPrefix = path.replace(/[/*]+$/, '');
  const pathPrefixWithParam = /\/:treePath/.test(pathPrefix)
    ? pathPrefix
    : `${pathPrefix}/:treePath`;
  const { treePath } = params;
  const _paths = treePath ? treePath.split(SPLITTER) : [];
  const unMounted = useRef(false);
  // dataSource 中间态，稳定后 set 到 dataSource 中，以解决递归、异步、setState 协同的问题。
  const cachedDataSource = useRef([]);
  const [activeParams, setActiveParams] = useState(null);
  // const [selectedKeys, setSelectedKeys] = useState<TreeNodeKey[]>(
  //   _paths.slice(-1)
  // );
  const [_expandedKeys, _setExpandedKeys] = useState([]);
  const [nowExpandedNode, setNowExpandedNode] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const expandedKeys = useRef([]);
  const setExpandedKeys = (nextExpandedKeys) => {
    const _nextExpandedKeys = Array.from(new Set(nextExpandedKeys));
    expandedKeys.current = _nextExpandedKeys;
    _setExpandedKeys(_nextExpandedKeys);
  };
  const _activeId = _paths.slice(-1)[0];
  useLayoutEffect(() => {
    if (!_activeId) {
      return;
    }
    cachedDataSource.current.length &&
      loadDataByTreePath(_paths, false).then(() => {
        setDataSource(cachedDataSource.current);
        console.log('cachedDataSource.current', cachedDataSource.current);
      });
  }, [_activeId]);

  // 计算路由
  // 如果没有指定下级 module，则默认选中第一个 tree 根节点
  useEffect(() => {
    unMounted.current = false;

    // tslint:disable-next-line: no-floating-promises
    _fetchTreeNodes(null, get(_paths, 0)).then(() => {
      console.log('获取初始 tree 数据完成');
      // 如果没有指定路径，默认选择第一个
      if (!treePath) {
        const firstNode = get(cachedDataSource.current, [0], {});
        goToModule(firstNode, firstNode.id, true);
        return;
      }
      // tslint:disable-next-line: no-floating-promises
      loadTreeByPath(_paths, cachedDataSource.current, '0', true).then(() => {
        setDataSource(cachedDataSource.current);
      });
    });
    return () => {
      unMounted.current = true;
    };
  }, []);

  function generateUrlByTreePaths(
    nextTreePaths: TreeNodeKey[],
    nextPath = path,
  ): string {
    return generatePath(nextPath, {
      treePath: nextTreePaths.join(SPLITTER),
    }).replace(/\$%7B([\w.]+)%7D/g, (_, $1) => `$\{${$1}}`);
  }

  /**
   * 重新加载树节点内容
   */
  function reloadTree() {
    // tslint:disable-next-line: no-floating-promises
    loadTreeByPath(_paths, cachedDataSource.current, '0', true).then(() => {
      setDataSource(cachedDataSource.current);
    });
  }

  /**
   *
   * @param idPaths 剩余的需要获取树内容的 id 列表
   * @param traverser 当前遍历所在层级的节点列表
   * @param pos 当前层级的序号路径
   * @param forceUpdate 是否强制更新，如果为 true，则强制获取子节点
   */
  async function loadTreeByPath(
    idPaths: string[],
    traverser: TreeDataSource,
    pos: string,
    // 是否强制更新
    forceUpdate = false,
  ) {
    if (unMounted.current || !idPaths.length) return;
    const id = idPaths[0];
    const matchedIndex: number = traverser.findIndex((_) => _.id === id);
    if (matchedIndex < 0) {
      console.error('找不到 url 中匹配的树节点', id, traverser);
      // 找不到匹配的节点，就拉倒了
      return;
    }
    const currentNode = traverser[matchedIndex];
    setNowExpandedNode(currentNode);
    // 获取最后一个节点的 params
    if (idPaths.length === 1) {
      // 获取相应的 params
      setActiveParams(currentNode.params || {});
    }
    pos += `-${  matchedIndex}`;

    const nodeList: TreeDataSource = await loadDataWithReturn(
      {
        id,
        pos,
        params: currentNode.params,
        // 传入目标节点的 children，如果有值就不重新发请求获取；如果强制更新，则不传
        children: forceUpdate ? null : currentNode.children,
      },
      idPaths[1],
    );
    await loadTreeByPath(idPaths.slice(1), nodeList, pos, forceUpdate);
    setExpandedKeys([...expandedKeys.current, currentNode.key]);
  }

  async function loadDataWithReturn(
    node: Partial<ExtendedEventNode>,
    idToMatch?: string,
  ): Promise<TreeDataSource> {
    // 已经有子节点了，不再重复获取
    const {children} = node;
    if (children) {
      return children;
    }
    const result = await _fetchTreeNodes(node, idToMatch);
    return result;
  }

  async function loadData(node: Partial<ExtendedEventNode>): Promise<void> {
    await loadDataWithReturn(node);
    setDataSource(cachedDataSource.current);
    setExpandedKeys([...expandedKeys.current, node.key]);
    // console.log("loadData->setDataSource", cachedDataSource.current)
  }

  async function loadDataByTreePath(
    idList: string[] = _paths,
    forceUpdate = true,
  ): Promise<void> {
    // 尝试根据路径获取 pos、key
    let traverser = cachedDataSource.current;
    let indexList: number[] = [];
    const keyList: string[] = [];
    // 除了获取目标路径的内容外，目标路径距离当前路径的所有内容也要重新获取
    let targetPath = _paths;
    try {
      // 找到目标节点的父节点
      indexList = idList.slice(0, -1).map((currentId: string) => {
        const matchedIndex = traverser.findIndex((_) => _.id === currentId);
        if (currentId === targetPath[0]) {
          targetPath = targetPath.slice(1);
        } else {
          targetPath = [];
        }
        // 如果找不到目标路径，则直接刷新页面
        if (matchedIndex < 0) {
          throw new Error('无法找到目标路径，刷新页面');
        }
        const { children, key } = traverser[matchedIndex];
        // const { children, ..._targetNode } = traverser[matchedIndex];
        traverser = children;
        keyList.push(key);
        return matchedIndex;
      });
    } catch (error) {
      console.error(error.message);
      history.go(0);
    }
    indexList.unshift(0);
    // 重新获取目标节点到前高亮路径的所有节点
    await loadTreeByPath(
      targetPath.length ? targetPath : idList.slice(-1),
      traverser,
      indexList.join('-'),
      forceUpdate,
    );
    setDataSource(cachedDataSource.current);
    setExpandedKeys([...expandedKeys.current, ...keyList]);
  }

  function goToModule(
    targetNode: Pick<ExtendedEventNode, 'type' | 'params'>,
    nodePath: string,
    isReplace = false,
  ) {
    if (unmounted.current) return;
    const { type, params } = targetNode;
    if (!moduleMap[type]) {
      console.error(`ComposeTree：没有找到 type(${type}) 对应的 module`);
      return;
    }

    // debugger;
    setActiveParams(params || {});

    history[isReplace ? 'replace' : 'push'](
      `${generatePath(pathPrefixWithParam, {
        treePath: nodePath,
      })}/${moduleMap[type]}`,
    );
  }

  function _updateTreeChildren(position: any[], nextChildren: TreeDataSource) {
    // 合并孙子节点，以保证下级内容不会被覆盖
    const originDataSource: TreeDataSource = (
      (position.length
        ? get(cachedDataSource.current, position)
        : cachedDataSource.current) || []
    ).filter((_: any) => _.children);
    originDataSource.forEach(({ id, children }) => {
      const matchedIndex = nextChildren.findIndex((_: any) => _.id === id);
      if (matchedIndex >= 0) {
        // 找到匹配的节点，合并 children
        set(nextChildren, [matchedIndex, 'children'], children);
      }
    });
    // end - 无序返回合并逻辑
    cachedDataSource.current = cachedDataSource.current.length
      ? setWith(clone(cachedDataSource.current), position, nextChildren, clone)
      : nextChildren;
  }

  /**
   * 异步获取目标节点的子节点数据，优先返回缓存内容
   * @param node 父节点，如果传空对象，说明是根节点
   * @param idToMatch 要命中的 id，如果传了，则用于判断缓存是否过期
   */
  function _fetchTreeNodes(
    node: Partial<ExtendedEventNode>,
    idToMatch?: string,
  ): Promise<TreeDataSource> {
    return new Promise<TreeDataSource>((resolve, reject) => {
      const { id = '', params: nodeParams, pos } = node || {};
      // console.log(typeof id, 'idid', id === 'null');
      // if (id === 'null') {
      //   reject();
      // }
      const {
        url: fetchTreeNodesUrl,
        method,
        params: requestParams = {},
      } = getTreeNodes;
      const storageKey = `${pathPrefix}/tree/${id}`;
      // 如果 node 为空，说明在拉取根节点，根节点不走缓存
      const cache = node ? localStorage.getItem(storageKey) : null;
      const position = pos
        ? pos
            .split('-')
            .slice(1)
            .reduce((setterPath: (number | string)[], index: string) => {
              return setterPath.concat([+index, 'children']);
            }, [])
        : [];
      let cacheMatched = false;
      if (cache) {
        let nextDataSource: TreeDataSource;
        try {
          nextDataSource = JSON.parse(cache);
          // 缓存中没有命中需要匹配的 key，直接发异步请求。
          if (idToMatch && !nextDataSource.some((_) => _.id === idToMatch)) {
            console.log('缓存中没有命中需要匹配的 key，直接发异步请求。');
            throw new Error();
          }
          cacheMatched = true;

          // 仅仅 resolve，下面的步骤还是要走，更新缓存
          _updateTreeChildren(position, nextDataSource);
          resolve(nextDataSource);
        } catch (e) {
          console.log('缓存解析失败，发送异步请求');
        }
      }
      // 自动将节点的 params 透传给 tree 的异步接口
      // tslint:disable-next-line: no-floating-promises
      net
        .request(fetchTreeNodesUrl, {
          method,
          data: {
            ...requestParams,
            parentId: id === 'null' ? '' : id,
            ...(nodeParams || {}),
          },
          showError: true,
        })
        .then(
          ({ data, ...others }: { data: { dataSource: TreeDataSource } }) => {
            const { code } = others;
            // localStorage.setItem('request-code', code);

            const cached = cache ? JSON.parse(cache) : null;
            if (!data) {
              setDataCode(code);
              return;
            }
            const nextChildren = generateTreeNodesWithUid(
              data.dataSource,
              cached,
            );
            _updateTreeChildren(position, nextChildren);

            try {
              // 更新缓存的子节点
              localStorage.setItem(
                storageKey,
                JSON.stringify(
                  // 只缓存直接子节点，再下级的节点会平铺缓存
                  (nextChildren || []).map(({ children, ...others }) => others),
                ),
              );
            } catch (error) {
              // 如果 localStorage 溢出，清空相关缓存
              // 这里会有点边界问题：会把当前流程中的缓存也删掉，可能会导致展示不全，但出现的概率很小，刷新之后就好了
              if (
                [
                  'W3CException_DOM_QUOTA_EXCEEDED_ERR',
                  'QuotaExceededError',
                  'NS_ERROR_DOM_QUOTA_REACHED',
                  'QUOTA_EXCEEDED_ERR',
                ].includes(error.name)
              ) {
                // 遍历 localStorage，找到包含 /:treePath/ 的缓存，并清除
                Object.keys(localStorage).forEach((key) => {
                  if (/\/:treePath(\/|$)/.test(key)) {
                    localStorage.removeItem(key);
                  }
                });
              } else {
                console.error(error);
              }
            }
            cachedDataSource.current = position.length
              ? setWith(
                  clone(cachedDataSource.current),
                  position,
                  nextChildren,
                  clone,
                )
              : nextChildren;
            setDataSource(cachedDataSource.current);
            if (idToMatch && !nextChildren.some((_) => _.id === idToMatch)) {
              console.log(
                `请求结果没有命中需要匹配的 key - ${idToMatch}，重定向到根节点。`,
              );
              message.info('树中没有找到指定路径，为您跳转到根节点。');
              const firstNode = get(cachedDataSource.current, [0], {});
              goToModule(firstNode, firstNode.id, true);
              return;
            }
            if (!cacheMatched) {
              resolve(nextChildren);
            }
          },
        );
    });
  }

  function getRoutePath(modulePath: string): {
    purePath: string;
    path: string;
  } {
    // todo: 没有兼容 tree 套 tree 的场景，用户中心用不到，所以这里不再像 compose-tab 那样特殊梳理
    const purePath =
      moduleMap[modulePath?.replace(/^\//, '').replace(/\/\*$/, '')];
    // console.log(`${pathPrefix}/${purePath}`);
    return { purePath, path: `${pathPrefixWithParam}/${purePath}` };
  }

  return {
    // 变量起始，这些变量除了在页面刷新后需要被赋值外，在 goToModule 中也要赋值一次
    activeKey: get(_paths.slice(-1), [0]),
    activeParams,
    treePaths: _paths,
    // 变量终止
    goToModule,
    dataSource,
    code,
    getRoutePath,
    loadData,
    expandedKeys: _expandedKeys,
    setExpandedKeys,
    loadDataByTreePath,
    reloadTree,
    setIsSearch,
    isSearch,
    nowExpandedNode,
    generateUrlByTreePaths,
  };
};

export const ComposeTreeContext =
  React.createContext<IComposeTreeContext | null>(null);
