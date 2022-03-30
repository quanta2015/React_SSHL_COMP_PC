import React, { useMemo } from 'react';
import { PropType, IgroupItem } from './interface';
import './index.less';
import { ItreeItem } from '../select-user/interface';
import iconMap, { IconType } from '@/components/tree-node-icon';
import { DeleteOutlined } from '@ant-design/icons';
import Tag from 'antd/es/tag';

const SelectedShowPane: React.FunctionComponent<PropType> = (
  props: PropType
) => {
  const { groupList, unit, delGroup, delItem, showUserDeptName } = props;

  const total = useMemo(() => {
    let total = 0; // 已选总数

    for (let group of groupList) {
      const itemList = group.itemList;
      if (group.type === 'USER') {
        total += itemList.length;
      } else {
        total += group.count || 0;
      }
    }
    return total;
  }, [groupList]);

  return (
    <div className="selected-show-pane-wrap">
      <div className="selected-show-pane-total">
        已选对象 {total} {unit}
      </div>
      <div className="selected-show-pane-detail-box">
        {groupList.map((group: IgroupItem) => {
          const { title, itemList, count, type } = group;
          const NodeIcon = iconMap[type as IconType];
          return (
            <div className="selected-show-pane-group" key={title}>
              <div className="selected-show-pane-group-top">
                <NodeIcon />
                <span className="selected-show-pane-group-total">
                  {title} ({type === 'USER' ? itemList.length : count})
                </span>
                <span
                  className="selected-show-pane-group-clear"
                  onClick={() => delGroup(group)}
                >
                  <DeleteOutlined />
                </span>
              </div>
              <div className="selected-show-pane-group-content">
                {itemList.map((item: ItreeItem) => {
                  const { id, name, deptName } = item;
                  return (
                    <Tag
                      className="selected-tag"
                      closable
                      visible
                      key={id}
                      title={name}
                      onClose={() => delItem(item, group)}
                    >
                      {name}
                      {showUserDeptName && deptName ? ` (${deptName})` : ''}
                    </Tag>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectedShowPane;
