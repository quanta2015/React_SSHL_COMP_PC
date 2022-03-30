import React, { useState } from 'react';
import { Checkbox } from 'antd';

interface Props {
  children?: React.ReactNode;
  index?: any;
  value?: any;
  onChange?: (value: boolean, index?: any) => void;
}
export default ({
  value,
  index,
  children = null,
  onChange,
  ...others
}: Props) => {
  const [checked, setChecked] = useState<boolean>(false);
  const handleChange = (e: any) => {
    setChecked(e.target.checked);
    onChange(e.target.checked);
  };
  return (
    <Checkbox checked={checked} onChange={handleChange} {...others}>
      {children}
    </Checkbox>
  );
};
