import { PropTypes as TabPropTypes } from './tab';
import React from 'react';
import { Request, RouterConfig } from '../interface';
export interface PropTypes extends TabPropTypes {
  request?: {
    getTabDataSource?: Request;
  };
  defaultActiveKey?: string;
  // templateMap?: { [activeKey: string]: string };
  children?: React.ReactNodeArray;
  onActiveChange?(activeId: string): void;
  // 当前节点下的路由配置
  routerConfig: RouterConfig;
  // 将className设置为“tab-setp-number”时，tab的title中可配置步骤编号
  className?: string;
  noTab?: boolean;
  // 该参数默认为false，为true时会在转换路由后带上url剩余部分参数
  addParams?: boolean;
}
