import React, { useContext } from 'react';
import { TREE_CONTEXT } from '../../../select-user';

interface Iprops {
  multiple: boolean         // 是否可以多选
}

const SelectTree: React.FunctionComponent<Iprops> = (props: Iprops) => {

  const { multiple } = props;

  // 获取treeContext
  const treeContext = useContext(TREE_CONTEXT);

  const {
    treeState,          // 树state，里面存有树节点信息，被选中节点信息
    updateCheckedNode,  // 更新树节点选中状态的方法, 返回该节点当前的选中状态
    clear,              // 清空当前选中数据的方法
    delKeys             // 取消指定keys选中状态的方法
  } = treeContext;

  // 从treeState中获取当前树节点以及被选中的keys
  const {
    treeData,     // 当前树的数据信息
    checkedKeys   // 当前被选中的keys
  } = treeState;

  return (
    <div className="select-area-tree">
      整个树
    </div>
  );
};

export default SelectTree;
