import React, { useContext } from 'react';
import { Tree } from 'antd';
import { TREE_CONTEXT } from '../../../select-user';
import { ItreeItem } from '../../../interface';
import useSelectExpand from '../../../hooks/use-select-expand';
import useCheckedKeys from '../../../hooks/use-checked-keys';

interface PropType {
  currentTab: string; // 用当前选中的tab作为Tree组件的key，当切换tab时使Tree组件重新生成
  multiple: boolean;
  selectTypeList: any; // 可选节点列表
}

const SelectCommonTree: React.FunctionComponent<PropType> = (
  props: PropType
) => {
  // 获取props
  const { currentTab, multiple, selectTypeList } = props;
  // 获取treeContext
  const treeContext = useContext(TREE_CONTEXT);
  const { treeState, updateCheckedNode, clear, resetUserCount } = treeContext;
  const { treeData } = treeState;
  const {
    expandedKeys,
    setExpandedKeys,
    handleSelect,
    loadTreeData: loadData
  } = useSelectExpand(currentTab);

  const [checkedKeys] = useCheckedKeys();

  // 树节点选中事件
  const onCheck = (_: any, event: any) => {
    const node = event.node.props;

    const item: ItreeItem = {
      ...node.data,
      title: node.label
    };
    const { id } = item;

    let checked = null;

    // 如果是多选
    if (multiple) {
      // 节点是否选中
      checked = updateCheckedNode(item, id);
    } else {
      // 如果是单选的情况
      if (treeState.checkedKeys[0] === id) {
        // 更新选中节点
        checked = updateCheckedNode(item, id);
      } else {
        // 先清空所选
        clear();

        // 更新选中节点
        checked = updateCheckedNode(item, id);
      }
    }

    // 如果只可选某一个，则不需要统计分组人数
    if (selectTypeList && selectTypeList.length === 1) {
      resetUserCount(item, checked, false);
    } else {
      resetUserCount(item, checked);
    }
  };
  console.error(checkedKeys, 'checkedKeys');

  return treeData && treeData.length > 0 ? (
    <Tree
      className="cf-select-user-tree"
      selectedKeys={[]}
      // key={currentTab}
      checkedKeys={checkedKeys}
      onCheck={onCheck}
      checkable
      multiple={multiple}
      // selectable={false}
      blockNode
      expandedKeys={expandedKeys}
      onExpand={setExpandedKeys}
      onSelect={handleSelect}
      checkStrictly
      loadData={loadData}
      // height={340}
      // isLabelBlock
      // isNodeBlock
      treeData={treeData}
    />
  ) : (
    <div className="cf-tree-result-empty">暂无内容</div>
  );
};

export default SelectCommonTree;
