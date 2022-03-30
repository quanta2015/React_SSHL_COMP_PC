import { useState, useCallback, useEffect, useContext } from 'react';
import { ItreeItem } from '../interface';
import { TREE_CONTEXT } from '../select-user';

export default (currentTab: string) => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const {
    loadData,
    treeState: { treeData }
  } = useContext(TREE_CONTEXT);

  // fusion tree 的异步获取子节点回调
  const loadTreeData = useCallback(
    (node: any) => {
      // 异步获取子树节点列表，需要传入当前的 tab 作为参数
      const {
        id,
        label,
        name,
        key,
        children,
        type,
        nodeType,
        orgId,
        contactType,
        pos
      } = node;
      const item: ItreeItem = {
        id,
        title: label,
        name,
        key,
        children,
        type,
        nodeType,
        orgId,
        contactType,
        pos
      };
      return loadData(item, currentTab);
    },
    [loadData, currentTab]
  );

  // 解决切换 tab 后，展开状态仍保持原样的问题
  const rootKeys = treeData.map(_ => _.key);
  useEffect(() => {
    // 如果只有一个根节点，则默认展开
    if (rootKeys.length === 1) {
      loadTreeData(treeData[0]).then(() => {
        setExpandedKeys(rootKeys);
      });
      // tslint:disable-next-line: no-floating-promises
      // loadData(treeData[0], currentTab);
    } else {
      setExpandedKeys([]);
    }
  }, [rootKeys.join(',')]);

  // 点击树节点时，控制展开 & 收起，获取子节点
  const handleSelect = useCallback(
    (selectedKeys, event) => {
      if (event.node.props.isLeaf) {
        return;
      }
      const [key] = selectedKeys;
      const matchedExpandIndex = expandedKeys.indexOf(key);
      if (matchedExpandIndex >= 0) {
        setExpandedKeys([
          ...expandedKeys.slice(0, matchedExpandIndex),
          ...expandedKeys.slice(matchedExpandIndex + 1)
        ]);
      } else {
        // tslint:disable-next-line: no-floating-promises
        loadTreeData(event.node).then(() => {
          setExpandedKeys(Array.from(new Set([...expandedKeys, key])));
        });
      }
    },
    [loadTreeData, expandedKeys, setExpandedKeys]
  );
  return {
    expandedKeys,
    // TODO: 数据渲染滞后问题待解决
    setExpandedKeys,
    handleSelect,
    loadTreeData
  };
};
