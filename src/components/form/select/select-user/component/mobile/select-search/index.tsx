import React from 'react';
import './index.less';

interface Iprops {
  searchValue: string;
  placeholder: string;
  onSearchChange: (value: string) => void;
}

const SelectSearch: React.FunctionComponent<Iprops> = (props: Iprops) => {
  const { searchValue, onSearchChange } = props;

  const onInputChange = (e: any) => {
    const {value} = e.target;

    onSearchChange(value);
  };

  return (
    <input
      value={searchValue}
      onChange={onInputChange}
      className="select-search-input"
      placeholder={props.placeholder}
    />
  );
};

export default SelectSearch;
