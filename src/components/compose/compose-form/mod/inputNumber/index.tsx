import React from 'react';
import { InputNumber } from 'antd';

export default ({ value, index, onChange, tips, ...others }: any) => {
  return (
    <>
      <InputNumber
        value={value}
        onChange={(value) => onChange(value, index)}
        {...others}
      />
      {tips && <div style={{ marginTop: '5px', color: '#8c8c8c' }}>{tips}</div>}
    </>
  );
};
