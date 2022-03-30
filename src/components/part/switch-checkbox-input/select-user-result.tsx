import React, { useEffect, useState } from 'react';
import './result.less';
import iconMap, { IconType } from '@/components/tree-node-icon';
import Tag from 'antd/es/tag';

const SelectedUserResult: React.FunctionComponent<any> = (props: any) => {
  // const { groupList, delAll, showSelectUser } = props;
  const { value, showSelectUser, delAll } = props;
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    const {
      userInfoList = [],
      deptList = [],
      orgInfoList = [],
      groupInfoList = [],
      tagInfoList = [],
    } = value || {};

    const groupList = [];

    if (userInfoList.length) {
      const groupItem = {
        title: '人员',
        type: 'USER',
        itemList: userInfoList,
      };
      groupList.push(groupItem);
    }
    if (deptList.length) {
      const groupItem = {
        title: '部门',
        type: 'DEPT',
        itemList: deptList,
      };
      groupList.push(groupItem);
    }

    if (orgInfoList.length) {
      const orgItem = {
        title: '组织',
        type: 'ORG',
        itemList: orgInfoList,
      };
      groupList.push(orgItem);
    }

    if (groupInfoList.length) {
      const groupItem = {
        title: '分组',
        type: 'GROUP',
        itemList: groupInfoList,
      };
      groupList.push(groupItem);
    }

    if (tagInfoList.length) {
      const groupItem = {
        title: '标签',
        type: 'TAG',
        itemList: tagInfoList,
      };
      groupList.push(groupItem);
    }
    // console.log(groupList, 'groupList', value);

    setGroupList(groupList);
  }, [value]);

  const NodeIcon = iconMap['dept' as IconType];

  return (
    <div className="select-user-result-wrap" style={{ marginBottom: 10 }}>
      <div className="select-user-result-total">
        <div className="title">已选对象</div>
      </div>
      <div className="select-user-result-detail-box">
        {
          <div className="select-user-result-group">
            <div className="select-user-result-group-top">
              <NodeIcon />
              <span className="select-user-result-group-total">部门</span>
            </div>
            <div className="select-user-result-group-content">
              {value.map((item: any, index: number) => {
                const { id, name, deptName } = item;
                return (
                  <Tag
                    key={index}
                    className="selected-tag"
                    // closable
                    visible
                    title={name || deptName}
                  >
                    {name || deptName}
                  </Tag>
                );
              })}
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default SelectedUserResult;
