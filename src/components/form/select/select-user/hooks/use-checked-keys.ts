import { useState, useEffect, useContext } from 'react';
import { TREE_CONTEXT } from '../select-user';

export default () => {
  const {
    treeState: { treeData, checkedKeys }
  } = useContext(TREE_CONTEXT);
  const [checkedTreeKeys, setCheckedTreeKeys] = useState([]);
  useEffect(() => {
    // 根据 dfs 获取选中的 key
    let stack = [...treeData];
    const _checkedTreeKeys = [];
    while (stack.length) {
      const node = stack.pop();

      if (checkedKeys.includes(node.id)) {
        _checkedTreeKeys.push(node.key);
      }
      if (node.children) {
        stack = stack.concat(node.children);
      }
    }
    setCheckedTreeKeys(_checkedTreeKeys);
  }, [checkedKeys, treeData]);
  return [checkedTreeKeys];
};
