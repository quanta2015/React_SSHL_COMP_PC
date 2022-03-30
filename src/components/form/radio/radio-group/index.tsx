import React, { useCallback, useMemo } from 'react';
import { Radio } from 'antd';

export interface PropTypes {
  onChange?(value: any): void;
  value?: any;
  dataSource: {
    value: any;
    label?: string;
    text?: string;
  }[];
}

export default function RadioGroup({
  dataSource,
  value,
  onChange,
  ...others
}: PropTypes) {

  const handleOnChange = useCallback(
    (changedValue: any) => {
      onChange && onChange(changedValue);
    },
    [onChange]
  );
  const $radios = useMemo(() => {
    return dataSource.map(({ value, label, text }) => (
      <Radio value={value} key={value}>
        {label || text}
      </Radio>
    ));
  }, [dataSource]);
  return (
    <Radio.Group onChange={handleOnChange} {...others} value={value}>
      {$radios}
    </Radio.Group>
  );
}
