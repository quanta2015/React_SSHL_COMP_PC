import React, { useCallback, useState, useEffect, useContext } from 'react';
import { Modal, Input, Spin } from 'antd';
import SelectUserTab, { TabTypes } from './component/pc/select-user-tab';
import SearchResult from './component/pc/search-result';
import RightPane from './component/pc/right-pane';
import SelectArea from './component/pc/select-area';
import { PropTypes } from './interface';
import SelectedPane from './component/pc/selected-pane';
import { TREE_CONTEXT } from './select-user';

const SelectUserPc: React.FunctionComponent<PropTypes> = ({
  dialogProps = {},
  selectPaneProps = {},
  visible = false,
  multiple = true,
  onCancel,
  requestParams = { campusType: 'base_school_type' },
  showTabList = ['dept', 'group', 'innerContacts', 'schoolContacts', 'tags'],
  selectType = 'user',
  searchPlaceholder = '搜索姓名、部门名称、手机号',
}) => {
  const { Search } = Input;
  const [tab, setTab] = useState<TabTypes | ''>('');
  // 获取treeContext
  const treeContext = useContext(TREE_CONTEXT);
  const { treeState, loading, clear, getTreeRoot, getSearchResult, handleOk } =
    treeContext;

  const { searchResult } = treeState;
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchTab, setSearchTab] = useState<string>('all');

  // 搜索的回调
  const handleSearch = useCallback(
    (nextSearchValue: string) => {
      // 搜索图标点击事件
      const params = {
        search: nextSearchValue,
        types: searchTab === 'all' ? showTabList : [searchTab],
        ...requestParams,
      };
      getSearchResult(params);
      setSearchValue(nextSearchValue);
    },
    [searchTab, showTabList, getSearchResult, setSearchValue],
  );

  // 当tab切换时重新获取树
  useEffect(() => {
    if (tab) {
      getTreeRoot(tab);
    }
  }, [tab]);

  useEffect(() => {
    if (!searchValue) {
      // 如果搜索字段被清空，tab默认恢复选择到all
      setSearchTab('all');
    }
  }, [searchValue]);

  // 当 showTabList 变更时，重置高亮的 tab
  useEffect(() => {
    if (showTabList && showTabList.length > 0) {
      setTab(showTabList[0]);
    } else {
      setTab('dept');
    }
  }, []);

  useEffect(() => {
    clear();
  }, [visible]);

  // 处理关闭
  const handleCancel = () => {
    onCancel();
  };

  // 选择tab切换
  const onTabChange = (selectTab: TabTypes) => {
    setTab(selectTab);
  };

  // 当搜索的tab改变
  const onSearchTabChange = (nextTab: string) => {
    setSearchTab(nextTab);

    const params = {
      search: searchValue,
      types: nextTab === 'all' ? showTabList : [nextTab],
      ...requestParams,
    };
    getSearchResult(params);
  };

  return (
    <Modal
      {...dialogProps}
      wrapClassName="select-user-pc-modal"
      destroyOnClose
      // closable={false}
      maskClosable={false}
      bodyStyle={{ padding: 0 }}
      visible={visible}
      onOk={handleOk}
      width="640px"
      onCancel={handleCancel}
    >
      <div className="select-user-pc-content">
        <div className="left-pane">
          <div className="select-user-pc-search-wrapper">
            <Search
              // allowClear
              className="select-user-pc-search"
              onSearch={handleSearch}
              // onChange={onSearchChange}    // 这里暂时取消onChange时搜索,以后有机会再用上吧
              placeholder={showTabList.length > 1 ? '搜索' : searchPlaceholder}
            />
          </div>
          {searchValue ? (
            <SearchResult
              selectTypeList={requestParams.selectTypeList}
              search={searchValue}
              searchResult={searchResult}
              selectType={selectType}
              onSearchTabChange={onSearchTabChange}
              showTabList={showTabList}
              multiple={multiple}
            />
          ) : (
            <React.Fragment>
              <SelectUserTab
                activeKey={tab}
                onTabChange={onTabChange}
                showTabList={showTabList}
              />
              <SelectArea
                selectTypeList={requestParams.selectTypeList}
                currentTab={tab}
                multiple={multiple}
              />
            </React.Fragment>
          )}
          <Spin
            spinning={loading}
            tip="正在加载"
            delay={200}
            className="cf-select-user-spin"
          />
        </div>
        <RightPane>
          <SelectedPane
            selectTypeList={requestParams.selectTypeList}
            showUserDeptName={requestParams.strictUser}
            selectPaneProps={selectPaneProps}
          />
        </RightPane>
      </div>
    </Modal>
  );
};

export default SelectUserPc;
