
import React, {useCallback} from 'react';
import { Tabs } from 'antd';

export type PropTypes = {
  dataSource: Array<{
    label: string;
    key: string;
  }>,
  defaultActiveKey: string;
  value: string;
  onEmit(eventName: string, ...args: Array<any>): void;
};

const { TabPane } = Tabs;

export default function Tab (props: PropTypes) {
  const { dataSource, onEmit, value, ...others } = props;
  // const changeEmitter = useCallback((activeKey) => {
  //   onEmit('tabChange', activeKey);
  // }, []);
  return (
    <Tabs {...others} activeKey={value}>
      {
        dataSource.map(({ label, key, ...others }) => (
          <TabPane tab={label} key={key} {...others} />
        ))
      }
    </Tabs>
  );
};
