import React from 'react';
import { defaultProps } from 'recompose';
import defaultComsMap, {
  UnSupport,
} from '@/components/compose-form/mod/coms-map';
// @ts-ignore
import loadingStatusHOC from '../hoc/loading-status-hoc';

type ComponentMap = { [type: string]: React.ComponentType };

// 得到相对应的组件
export const getComByUiType = (uiType: string, externalComsMap: any = {}) => {
  const Com =
    externalComsMap[uiType] ||
    (defaultComsMap as ComponentMap)[uiType] ||
    defaultProps({ uiType })(UnSupport);
  return Com;
};
