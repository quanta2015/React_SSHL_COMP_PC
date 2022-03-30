import React, { useCallback, useMemo } from 'react';
import { Checkbox } from 'antd';

export interface PropTypes {
  onChange?(value: any): void;
  value?: any;
  dataSource: {
    value: any;
    label?: string;
    text?: string;
  }[];
}

export default function CheckboxGroup({
  dataSource,
  value,
  onChange,
  ...others
}: PropTypes) {
  const handleOnChange = useCallback(
    (changedValue: any) => {
      onChange && onChange(changedValue);
    },
    [onChange],
  );
  const $Checkboxs = useMemo(() => {
    return dataSource.map(({ value, label, text }) => (
      <Checkbox value={value} key={value}>
        {label || text}
      </Checkbox>
    ));
  }, [dataSource]);
  return (
    <Checkbox.Group onChange={handleOnChange} {...others} value={value}>
      {$Checkboxs}
    </Checkbox.Group>
  );
}
