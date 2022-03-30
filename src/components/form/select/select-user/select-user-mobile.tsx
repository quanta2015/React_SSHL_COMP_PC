import React, { useState, useEffect } from 'react';
import SelectSearch from './component/mobile/select-search';
import SelectTab from './component/mobile/select-tab';
import SelectTree from './component/mobile/select-tree';
import SelectSearchResult from './component/mobile/select-search-result';
import SelectFooter from './component/mobile/select-footer';
import { PropTypes } from './interface';
import './index.less';
import { TabTypes } from './component/pc/select-user-tab/interface';

const SelectUserMobile: React.FunctionComponent<PropTypes> = ({
  dialogProps = {},
  multiple = true,
  onOk,
  onCancel,
  basePath = 'pc',
  selectSignature = '',
  isSaveSelectSignature = false,
  requestParams = { campusType: 'base_school_type' },
  showTabList = ['dept', 'group', 'innerContacts', 'schoolContacts', 'tags'],
  selectType = 'user',
  searchPlaceholder = '搜索姓名、部门名称、手机号',
  unCheckableNodeType = [],
  onlyLeafCheckable = false
}) => {
  // 当前选中的tab
  const [tab, setTab] = useState<TabTypes | ''>('');

  // 当前的搜索字段
  const [searchValue, setSearchValue] = useState<string>('');

  // 当前的搜索结果
  const [searchResult, setSearchResult] = useState<any[]>([]);

  // 当showtabList变更时
  useEffect(() => {
    if (showTabList && showTabList.length > 0) {
      setTab(showTabList[0]);
    } else {
      setTab('dept');
    }
  }, []);

  // 当搜索字段改变
  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  // 选择tab切换
  const onTabChange = (selectTab: TabTypes) => {
    setTab(selectTab);
  };

  return (
    <div className="select-user-mobile">
      <SelectSearch
        placeholder={showTabList.length > 1 ? '搜索' : searchPlaceholder}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
      />
      {searchValue ? (
        <SelectSearchResult
          searchValue={searchValue}
          searchResult={searchResult}
          multiple={multiple}
        />
      ) : (
        <React.Fragment>
          <SelectTab
            activeKey={tab}
            showTabList={showTabList}
            onTabChange={onTabChange}
          />
          <SelectTree multiple={multiple} />
        </React.Fragment>
      )}
      <SelectFooter />
    </div>
  );
};

export default SelectUserMobile;
