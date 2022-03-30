import React from 'react';
import { Tabs } from 'antd';
import { PropTypes, TabTypes } from './interface';
import './index.less';

// tab类型对应的中文名
const TAB_MAPS = {
  'dept': '所属部门',
  'group': '下属组织',
  'innerContacts': '内部通讯录',
  'schoolContacts': '家校通讯录',
  'tags': '标签'
};

const SelectUserTab: React.FunctionComponent<PropTypes> = (props: PropTypes) => {

  const { onTabChange, showTabList, activeKey } = props;
  const { TabPane } = Tabs;

  let renderTabs: TabTypes[] = [];

  if (showTabList) {
    renderTabs = showTabList;
  } else {
    renderTabs = Object.keys(TAB_MAPS) as TabTypes[];
  }

  return (
    <div>
      {
        showTabList && showTabList.length <= 1
          ? ''
          : <Tabs
            activeKey={activeKey}
            onChange={onTabChange}
            className="select-user-tab-tabs"
          >
            {
              renderTabs.map((tabs: TabTypes) => {
                return (
                  <TabPane tab={TAB_MAPS[tabs]} key={tabs} />
                );
              })
            }
          </Tabs>
      }
    </div>
  );
};

export default SelectUserTab;
export { TabTypes };
