import React, { useContext, useMemo } from 'react';
import { Tabs, Checkbox, Typography, Space } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import { get } from 'lodash';
import { TREE_CONTEXT } from '../../../select-user';
import {
  TagIcon,
  UserIcon,
  DeptIcon,
  OrgIcon,
  GroupIcon,
} from '@/components/tree-node-icon';
import styles from './index.less';

const { Text } = Typography;
const { TabPane } = Tabs;

interface PropType {
  search: string; // 搜索的字段
  searchResult: any[]; // 搜索结果
  onSearchTabChange: (tab: string) => void;
  showTabList: any[];
  multiple: boolean;
  selectType: 'user' | 'dept';
  selectTypeList: any; // 可选节点列表
}

const SHOW_TAB_LIST_ITEM_MAP: any = {
  dept: '所属部门',
  group: '下属组织',
  innerContacts: '内部通迅录',
  schoolContacts: '家校通迅录',
  tags: '标签',
};

// 搜索结果展示
const SearchResult: React.FunctionComponent<PropType> = (props: PropType) => {
  const {
    search,
    searchResult,
    onSearchTabChange,
    multiple,
    showTabList,
    selectTypeList,
    selectType,
  } = props;

  // 获取treeContext
  const treeContext = useContext(TREE_CONTEXT);
  const { treeState, updateCheckedNode, resetUserCount, clear } = treeContext;
  const {
    userInfoList,
    deptInfoList,
    orgInfoList,
    tagInfoList,
    groupInfoList,
  } = treeState;

  // 判断搜索字段是否为纯数字
  const allNumber = /^([0-9])+$/.test(search);

  console.log('搜索结果: ', searchResult);

  const renderSearchHint = (list: Array<any>) => {
    if (list && list.length === 10) {
      return (
        <div className={styles.treeFooter}>
          仅展示前 10 个搜索结果，请输入更精确的搜索内容
        </div>
      );
    }
  };

  // checkbox状态改变事件
  const onCheckBoxChange = (item: any, type: string) => {
    let node: any = {};
    switch (type) {
      case 'USER':
        node = {
          id: item.userId,
          key: item.userId,
          name: item.userName,
          type: item.type,
          orgId: item.orgId,
          contactType: item.contactType,
          deptName: get(item.userDeptList, [0, 'deptName']),
        };
        break;
      case 'ORG':
        node = {
          id: item.orgId,
          key: item.orgId,
          name: item.orgName,
          type: item.type,
          contactType: item.contactType,
        };
        break;
      case 'GROUP':
        node = {
          id: item.groupId,
          key: item.groupId,
          name: item.groupName,
          orgId: item.orgId,
          type: item.type,
          contactType: item.contactType,
        };
        break;
      case 'DEPT':
        node = {
          id: item.deptId,
          key: item.deptId,
          name: item.deptName,
          orgId: item.orgId,
          type: item.type,
          contactType: item.contactType,
        };
        break;
      case 'TAG':
        node = {
          id: item.tagCode,
          key: item.tagCode,
          name: item.tagName,
          orgId: item.orgId,
          type: item.type,
          contactType: item.contactType,
        };
        break;
    }

    let checked = false;

    // 如果是多选
    if (multiple) {
      // 节点是否选中
      checked = updateCheckedNode(node, node.id);
    } else {
      // 如果是单选的情况
      const {checkedKeys} = treeState;
      if (checkedKeys[0] === node.id) {
        // 更新选中节点
        checked = updateCheckedNode(node, node.id);
      } else {
        // 先清空所选
        clear();

        // 更新选中节点
        checked = updateCheckedNode(node, node.id);
      }
    }

    if (selectTypeList && selectTypeList.length === 1 && type !== 'USER') {
      resetUserCount(node, checked, false);
    } else {
      resetUserCount(node, checked);
    }
  };

  const renderSearchDept = (info: any, type: string, index: number) => {
    return (
      <div className={index < 3 ? 'search-result-item-des' : ''} key={index}>
        <div
          className={index < 3 ? 'overflow-ellipsis' : 'overflow-auto'}
          title={type === '3' ? info.deptName || '' : info.deptPath || ''}
        >
          {type === '3'
              ? `类别: ${info.deptName || ''}`
              : `部门: ${info.deptPath || ''}`}
        </div>
      </div>
    );
  };

  // 渲染tab内容
  const renderTabContent = () => {
    const userList: any[] = [];
    const deptList: any[] = [];
    const orgList: any[] = [];
    const tagList: any[] = [];
    const groupList: any[] = [];

    for (const resultItem of searchResult) {
      switch (resultItem.type) {
        case 'USER':
          userList.push(resultItem);
          break;
        case 'DEPT':
          deptList.push(resultItem);
          break;
        case 'ORG':
          orgList.push(resultItem);
          break;
        case 'GROUP':
          groupList.push(resultItem);
          break;
        case 'TAG':
          tagList.push(resultItem);
          break;
      }
    }

    return (
      <div className="search-result-box">
        {userList.length > 0 ? (
          <React.Fragment>
            <div className="search-result-group-title">
              相关人员({userList.length})
            </div>
            {userList.map((user, index) => {
              let checked = false;

              for (const item of userInfoList) {
                if (user.userId === item.id) {
                  checked = true;
                }
              }
              return (
                <div
                  className="search-result-group-item"
                  key={`${user.userId}-${index}`}
                >
                  <UserIcon />
                  <div className="search-result-item-detail">
                    <div
                      className="search-result-item-title overflow-ellipsis"
                      title={user.userName}
                    >
                      {user.userName}
                    </div>
                    {user.userDeptList?.map((deptItem: any, index: number) => {
                      if (index < 3) {
                        return renderSearchDept(
                          deptItem,
                          user.contactType,
                          index,
                        );
                      }
                    })}
                    {user.userDeptList?.length >= 3 && (
                      <div className="more-info-container">
                        <span className="more-info-number">
                          等共<i>{user.userDeptList?.length}</i>个部门
                        </span>
                        <div className="more-info-content">
                          {user.userDeptList?.map(
                            (deptItem: any, index: number) => {
                              if (index >= 3) {
                                return renderSearchDept(
                                  deptItem,
                                  user.contactType,
                                  index,
                                );
                              }
                            },
                          )}
                        </div>
                      </div>
                    )}
                    {user.contactType === '3' ? (
                      <div className="search-result-item-des">
                        <div
                          className="overflow-ellipsis"
                          title={user.orgName}
                        >
                          学校: {user.orgName}
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="checkbox-wrap">
                    <Checkbox
                      checked={checked}
                      onChange={() => onCheckBoxChange(user, user.type)}
                    />
                  </div>
                </div>
              );
            })}
            {/* {renderSearchHint(userList)} */}
          </React.Fragment>
        ) : (
          ''
        )}
        {deptList.length > 0 ? (
          <React.Fragment>
            <div className="search-result-group-title">
              相关部门({deptList.length})
            </div>
            {deptList.map((dept: any, index: number) => {
              let checked = false;

              for (const item of deptInfoList) {
                if (dept.deptId === item.id) {
                  checked = true;
                }
              }
              return (
                <div
                  className="search-result-group-item"
                  key={`${dept.deptId}-${index}`}
                >
                  <DeptIcon />
                  <div className="search-result-item-detail">
                    <div className="search-result-item-title">
                      <div className="overflow-ellipsis" title={dept.deptName}>
                        {dept.deptName}
                      </div>
                    </div>
                    <div className="search-result-item-des">
                      <div
                        className="overflow-ellipsis"
                        title={`${dept.orgName} - ${dept.deptNamePath}`}
                      >
                        位置:{`${dept.orgName} - ${dept.deptNamePath}`}
                      </div>
                    </div>
                  </div>
                  <div className="checkbox-wrap">
                    <Checkbox
                      checked={checked}
                      onChange={() => onCheckBoxChange(dept, dept.type)}
                    />
                  </div>
                </div>
              );
            })}
            {/* {renderSearchHint(deptList)} */}
          </React.Fragment>
        ) : (
          ''
        )}
        {orgList.length > 0 ? (
          <React.Fragment>
            <div className="search-result-group-title">
              相关组织({orgList.length})
            </div>
            {orgList.map((org: any, index: number) => {
              let checked = false;
              for (const item of orgInfoList) {
                // org也显示在相关组织下
                if (org.orgId === item.id) {
                  checked = true;
                }
              }

              return (
                <div
                  className="search-result-group-item"
                  key={`${org.orgId}-${index}`}
                >
                  <OrgIcon />
                  <div className="search-result-item-detail">
                    <div className="search-result-item-title">
                      <div className="overflow-ellipsis" title={org.orgName}>
                        {org.orgName}
                      </div>
                    </div>
                  </div>
                  <div className="checkbox-wrap">
                    <Checkbox
                      checked={checked}
                      onChange={() => onCheckBoxChange(org, org.type)}
                    />
                  </div>
                </div>
              );
            })}
            {/* {renderSearchHint(orgList)} */}
          </React.Fragment>
        ) : (
          ''
        )}
        {groupList.length > 0 ? (
          <React.Fragment>
            <div className="search-result-group-title">
              相关分组({groupList.length})
            </div>
            {groupList.map((group: any, index: number) => {
              let checked = false;

              for (const item of groupInfoList) {
                if (group.groupId === item.id) {
                  checked = true;
                }
              }

              return (
                <div
                  className="search-result-group-item"
                  key={`${group.groupId}-${index}`}
                >
                  <GroupIcon />
                  <div className="search-result-item-detail">
                    <div className="search-result-item-title">
                      <div
                        className="overflow-ellipsis"
                        title={group.groupName}
                      >
                        {group.groupName}
                      </div>
                    </div>
                  </div>
                  <div className="checkbox-wrap">
                    <Checkbox
                      checked={checked}
                      onChange={() => onCheckBoxChange(group, group.type)}
                    />
                  </div>
                </div>
              );
            })}
            {/* {renderSearchHint(groupList)} */}
          </React.Fragment>
        ) : (
          ''
        )}
        {tagList.length > 0 ? (
          <React.Fragment>
            <div className="search-result-group-title">
              相关标签({tagList.length})
            </div>
            {tagList.map((tag: any, index: number) => {
              let checked = false;

              for (const item of tagInfoList) {
                if (tag.tagCode === item.id) {
                  checked = true;
                }
              }
              return (
                <div
                  className="search-result-group-item"
                  key={`${tag.tagCode}-${index}`}
                >
                  <TagIcon />
                  <div className="search-result-item-detail">
                    <div className="search-result-item-title">
                      <div className="overflow-ellipsis" title={tag.tagName}>
                        {tag.tagName}
                      </div>
                    </div>
                  </div>
                  <div className="checkbox-wrap">
                    <Checkbox
                      checked={checked}
                      onChange={() => onCheckBoxChange(tag, tag.type)}
                    />
                  </div>
                </div>
              );
            })}
            {/* {renderSearchHint(tagList)} */}
          </React.Fragment>
        ) : (
          ''
        )}
      </div>
    );
  };
  const $allNumberAlert = useMemo(() => {
    return allNumber && selectType === 'user' && search.length < 8 ? (
      <Space className="search-result-tips">
        <InfoCircleFilled className="search-result-tips-icon" />
        <Text type="secondary">
          为保证通讯录安全，手机号码输入超过8位后才能展示相关的人员结果
        </Text>
      </Space>
    ) : null;
  }, [allNumber, selectType, search]);
  return (
    <div className="search-result-wrap">
      <Tabs className="search-result-tab" onChange={onSearchTabChange}>
        <TabPane tab="全部" key="all">
          {$allNumberAlert}
          {searchResult.length > 0 ? (
            <React.Fragment>{renderTabContent()}</React.Fragment>
          ) : (
            <div className="cf-tree-result-empty">未搜索到相关内容</div>
          )}
        </TabPane>
        {showTabList.map((item: string) => {
          return (
            <TabPane tab={SHOW_TAB_LIST_ITEM_MAP[item]} key={item}>
              {$allNumberAlert}
              {searchResult.length > 0 ? (
                <React.Fragment>{renderTabContent()}</React.Fragment>
              ) : (
                <div className="cf-tree-result-empty">未搜索到相关内容</div>
              )}
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default SearchResult;
