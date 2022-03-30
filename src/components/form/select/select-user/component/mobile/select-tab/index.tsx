import React from 'react';
import { Tabs } from 'antd';
import './index.less';

// tab类型对应的中文名
const TAB_MAPS = {
  'dept': '所属部门',
  'group': '下属组织',
  'innerContacts': '内部通讯录',
  'schoolContacts': '家校通讯录',
  'tags': '标签'
}

export type TabTypes = 'dept' // 部门
| 'group' // 下属组织
| 'innerContacts' // 内部通讯录
| 'schoolContacts' // 家校通讯录
| 'tags' // 标签

interface Iprops {
  onTabChange: (current: any) => void
  showTabList: TabTypes[]
  activeKey: TabTypes | ''
}

const SelectTab: React.FunctionComponent<Iprops> = (props: Iprops) => {

  const { showTabList, onTabChange, activeKey } = props;

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
          onChange={onTabChange}>
          {
            renderTabs.map((tabs: TabTypes) => {
              return (
                <Tabs.TabPane tab={TAB_MAPS[tabs]} key={tabs} />
              )
            })
          }
        </Tabs>
      }
    </div>
  )
}

export default SelectTab;
