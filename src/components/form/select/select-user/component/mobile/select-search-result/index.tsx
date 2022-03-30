import React from 'react';
import './index.less';

interface Iprops {
  searchValue: string       // 搜索的字段
  searchResult: any[]       // 搜索的结果
  multiple: boolean         // 是否可以多选
}

const SelectSearchResult: React.FunctionComponent<Iprops> = (props: Iprops) => {

  const { searchValue, searchResult, multiple } = props;

  // 判断搜索字段是否为纯数字
  const allNumber = /^([0-9])+$/.test(searchValue);

  return (
    <div className="select-search-result">
      {
        allNumber && searchValue.length < 8
        ? <div className="search-result-tips">
            <span className="search-result-tips-icon" />
            为保证通讯录安全，手机号码输入超过8位后才能展示相关的人员结果
        </div>
        : ''
      }
      {
        searchResult.length > 0
        ? <span>这里是搜索结果</span>
        : <span>搜索结果为空</span>
      }
    </div>
  )
}

export default SelectSearchResult;
