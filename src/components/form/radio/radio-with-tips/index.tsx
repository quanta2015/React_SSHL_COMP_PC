import React, { useCallback, useMemo } from 'react';
import { Radio } from 'antd';
import classnames from 'classnames';

import './index.less';

export interface PropTypes {
  onChange?(value: any): void;
  dataSource: {
    value: any;
    label?: string;
    text?: string;
    tipsTitle?: string;
    tipDescription?: string;
    iconUR?: string;
  }[];
}

export default function RadioWithTips({
  dataSource,
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
    return dataSource.map(
      ({ value, label, text, tipsTitle, tipDescription, iconUR }) => (
        <div className="radio-group">
          <Radio value={value} key={value}></Radio>
          <div className="detail-wrap">
            <img src={iconUR} className="iconUR" />
            <div>
              <p>{label || text} </p>
              <p className="tipsTitle">{tipsTitle}</p>
              <p className="tipDescription">{tipDescription}</p>
            </div>
          </div>
        </div>
      )
    );
  }, [dataSource]);
  return (
    <Radio.Group
      className={classnames('radio-with-tips')}
      onChange={handleOnChange}
      {...others}
    >
      {$radios}
    </Radio.Group>
  );
}
