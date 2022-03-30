import React, { Component } from 'react';
import { TreeSelect } from 'antd';
import { get } from 'lodash';

export default class ssTreeSelect extends Component {
  static defaultProps = {
    dataSource: [],
    showSearch: false,
    canInput: false,
    multiple: false,
    onChange() { },
    onSearch() { },
    width: '100%'
  }

  handleSearch = (keyword) => {
    this.searchContent = keyword;
    this.props.onSearch(keyword);
  }

  handleAutoCompleteChange = (nextValue, ...others) => {
    this.props.onChange(nextValue, ...others);
    this.props.onSearch(nextValue, ...others);
  }

  handleChange = (nextValue, ...others) => {
    this.searchContent = null;
    this.props.onChange(nextValue, ...others);
    this.props.getId(nextValue);
    
  }

  render() {
    const {
      canInput,
      multiple,
      dataSource,
      onSearch,
      onChange,
      width,
      style,
      allowClear = true,
      ...others
    } = this.props;
    const props = {
      mode: multiple ? 'multiple' : 'single',
      treeData: dataSource,
      onSearch: this.handleSearch,
      onChange: this.handleChange,

      style: { width, ...(style || {}) }
    };
    let TreeSelectCom = TreeSelect;
    // onSearch 只能跟着 showSearch 一起用
    if (!props.showSearch) {
      delete props.onSearch;
    }
    if (multiple) {
      const { searchContent } = this;
      // 可输入时，需要显式地将当前值添加到 dataSource 最前面。
      if (canInput && searchContent) {
        if (get(dataSource, [0, 'label']) !== searchContent) {
          props.treeData = [{
            label: searchContent, value: Date.now(),
          }, ...dataSource];
        }
      }
    } else if (canInput) {
      // 单选，且可输入，使用 AutoComplete
      TreeSelectCom = TreeSelect.AutoComplete;
      // AutoComplete 没有 onSearch，只有 onChange，因此需要在 onChange 时同时触发 onSearch
      props.onChange = this.handleAutoCompleteChange;
      delete props.onSearch;
      delete others.showSearch;
      // AutoComplete 默认使用 value，则选择下拉菜单时
      props.fillProps = 'label';
    }
    return (
      <TreeSelectCom
        {...others}
        {...props}
        allowClear={allowClear}
      />
    );
  }
}
