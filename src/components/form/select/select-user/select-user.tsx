/**
 * 选人组件
 */
import React from 'react';
import { ConfigProvider } from 'antd';
import locale from '@/common/locale';
import useTree, { ItreeContext } from './hooks/use-tree';
import SelectUserPc from './select-user-pc';
import SelectUserMobile from './select-user-mobile';
import { PropTypes } from './interface';
import './index.less';

export const TREE_CONTEXT = React.createContext<ItreeContext | null>(null);

export default function SelectUser({
  defaultValue,
  visible = false,
  showTabList = ['dept', 'group', 'innerContacts', 'schoolContacts', 'tags'],
  onOk,
  onCancel,
  basePath = 'pc',
  selectType = 'user',
  multiple = true,
  // selectSignature = "5f0ffd880c57dd47648f0e08",
  selectSignature = '',
  isSaveSelectSignature = false,
  searchPlaceholder,
  dialogProps = {
    title: '选择对象'
  },
  selectPaneProps = {},
  unCheckableNodeType = [],
  onlyLeafCheckable = false,
  requestParams = { campusType: 'base_school_type' }
}: PropTypes) {
  // 获取treeContext
  const treeContext = useTree({
    basePath,
    requestParams,
    selectType,
    multiple,
    onlyLeafCheckable,
    unCheckableNodeType,
    selectSignature,
    defaultValue,
    isSaveSelectSignature,
    onOk
  });

  const Com = basePath === 'pc' ? SelectUserPc : SelectUserMobile;
  return (
    <ConfigProvider locale={locale}>
      <TREE_CONTEXT.Provider value={treeContext}>
        <Com
          defaultValue={defaultValue}
          visible={visible}
          showTabList={showTabList}
          onOk={onOk}
          onCancel={onCancel}
          basePath={basePath}
          selectType={selectType}
          multiple={multiple}
          searchPlaceholder={searchPlaceholder}
          selectSignature={selectSignature}
          isSaveSelectSignature={isSaveSelectSignature}
          dialogProps={dialogProps}
          selectPaneProps={selectPaneProps}
          unCheckableNodeType={unCheckableNodeType}
          onlyLeafCheckable={onlyLeafCheckable}
          requestParams={requestParams}
        />
      </TREE_CONTEXT.Provider>
    </ConfigProvider>
  );
}
