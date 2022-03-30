import React, { useCallback } from 'react';
import { Tabs, Radio } from 'antd';
import { TabsProps } from 'antd/lib/tabs';

export type PropTypes = {
  dataSource?: Array<{
    label: string;
    value: string;
  }>;
  onChange?(activeKey: string): void;
  value?: string;
  type?: TabsProps['type'] | 'capsule';
  // 如果只有一项，是否隐藏 tab 部分
  hideWhenOnlyOne?: boolean;
};

const { TabPane } = Tabs;

export default function Tab({
  dataSource,
  value,
  hideWhenOnlyOne,
  type = 'card',
  onChange,
  ...others
}: PropTypes) {
  // const changeEmitter = useCallback((activeKey) => {
  //   onEmit('tabChange', activeKey);
  // }, []);
  const handleRadioChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange],
  );
  if (hideWhenOnlyOne && dataSource.length === 1) return null;
  if (type === 'capsule') {
    return (
      <Radio.Group
        buttonStyle="solid"
        {...others}
        value={value}
        onChange={handleRadioChange}
      >
        {(dataSource || []).map(({ label, value, ...others }) => (
          <Radio.Button key={value} value={value} {...others}>
            {label}
          </Radio.Button>
        ))}
      </Radio.Group>
    );
  }
  return (
    <Tabs {...others} type={type} activeKey={value} onChange={onChange}>
      {(dataSource || []).map(({ label, value, ...others }) => (
        <TabPane tab={label} key={value} {...others} />
      ))}
    </Tabs>
  );
}
