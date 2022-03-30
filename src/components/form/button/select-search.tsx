import React, { useState } from 'react';
import { Select } from 'antd';
import { throttle } from 'lodash';
import net from '@/services/index';

export default function selectSearch({
  api,
  onChange,
  value,
  disabled = false,
}) {
  console.log(value, 'value');
  let timeout: any;
  const [selectListValue, setSelectListValue] = useState([]);
  const fetch = (val) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    const request = () => {
      net
        .request(api, {
          method: 'POST',
          data: {
            search: {
              keyword: val,
            },
          },
        })
        .then((data) => {
          const dataSource = data?.data?.dataSource;
          setSelectListValue(dataSource);
        });
    };
    timeout = setTimeout(request, 300);
  };

  const onChangeValue = (e) => {
    onChange(e);
  };
  const handleSearch = throttle(
    (val) => {
      if (val) {
        fetch(val);
      }
    },
    200,
    { trailing: false },
  );

  return (
    <div>
      <Select
        showSearch
        placeholder="请搜索"
        showArrow={false}
        optionFilterProp="children"
        onChange={onChangeValue}
        onSearch={handleSearch}
        options={selectListValue}
        optionFilterProp="label"
        value={value}
        disabled={disabled}
      >
        {/* {
          selectListValue&&selectListValue.map(val => {
            <Option value={val.value}>{val.label}</Option> 
          })
        }
         */}
      </Select>
    </div>
  );
}
