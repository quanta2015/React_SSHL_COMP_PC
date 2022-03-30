import React, { Component } from 'react';
import { Select } from 'antd';
// import PropTypes from 'prop-types';
import { get } from 'lodash';

export default class CFSelect extends Component {
  // static propTypes = {
  //   dataSource: PropTypes.arrayOf(PropTypes.object),
  //   showSearch: PropTypes.bool,
  //   canInput: PropTypes.bool,
  //   multiple: PropTypes.bool,
  //   onChange: PropTypes.func,
  //   onSearch: PropTypes.func,
  //   width: PropTypes.string,
  // }

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
      // // 如果选项数量超过 100，默认打开虚拟滚动
      // useVirtual: this.props.dataSource.length > 100,
      options: dataSource,
      onSearch: this.handleSearch,
      onChange: this.handleChange,
      style: { width, ...(style || {}) }
    };
    let SelectCom = Select;
    // onSearch 只能跟着 showSearch 一起用
    if (!props.showSearch) {
      delete props.onSearch;
    }
    if (multiple) {
      const { searchContent } = this;
      // 可输入时，需要显式地将当前值添加到 dataSource 最前面。
      if (canInput && searchContent) {
        if (get(dataSource, [0, 'label']) !== searchContent) {
          props.options = [{
            label: searchContent, value: Date.now(),
          }, ...dataSource];
        }
      }
    } else if (canInput) {
      // 单选，且可输入，使用 AutoComplete
      SelectCom = Select.AutoComplete;
      // AutoComplete 没有 onSearch，只有 onChange，因此需要在 onChange 时同时触发 onSearch
      props.onChange = this.handleAutoCompleteChange;
      delete props.onSearch;
      delete others.showSearch;
      // AutoComplete 默认使用 value，则选择下拉菜单时
      props.fillProps = 'label';
    }
    return (
      <SelectCom
        {...others}
        {...props}
        allowClear={allowClear}
      />
    );
  }
}
