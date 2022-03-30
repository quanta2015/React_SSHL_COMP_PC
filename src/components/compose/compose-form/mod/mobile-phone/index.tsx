import React, { useState, useCallback, useEffect } from 'react';
import { Input } from 'antd';
import { CFFormCustomComProps } from '../../interface';

const MobilePhone = ({
  value,
  onChange,
  style,
  ...others
}: CFFormCustomComProps & {
  style: any;
}) => {
  const [val, setVal] = useState(value);
  useEffect(() => {
    setVal(value);
  }, [value]);
  const handleInput = useCallback(
    e => {
      const nextVal = (e.target.value || '')
        .replace(/^0+/, '')
        .replace(/[^\d]/g, '');
      setVal(nextVal);
      onChange(nextVal);
    },
    [value, onChange]
  );
  return <Input autoComplete="tel" {...others} value={val} style={style} onChange={handleInput} />;
};

export default MobilePhone;
