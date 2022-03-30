import React from 'react';
import { Input } from 'antd';
import './index.less';
// interface Props {
//   value?: any;
//   onChange?: (value: any, index: any) => void;
// }
export default ({
  value,
  onChange,
  maxLength,
  noShowSuffix,
  tips,
  ...others
}: any) => {
  return (
    <>
      <Input
        value={value}
        onChange={(value) => onChange(value)}
        {...others}
        suffix={
          maxLength && !noShowSuffix ? `${value?.length || 0}/${maxLength}` : ''
        }
        className={maxLength ? 'input-withMaxLength' : ''}
      />
      {tips && <div style={{ marginTop: '5px', color: '#8c8c8c' }}>{tips}</div>}
    </>
  );
};
