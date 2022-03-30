import React, { useContext } from 'react';
import { TREE_CONTEXT } from '../../../select-user';
import './index.less';

const SelectFooter = () => {

  // 获取treeContext
  const treeContext = useContext(TREE_CONTEXT);

  const { treeState } = treeContext;
  const { checkedKeys } = treeState;

  return (
    <div className="select-footer">
      <span>取消</span>
      <span>已选: { checkedKeys.length }</span>
      <span>确定</span>
    </div>
  );
};

export default SelectFooter;
