import { Input, InputNumber } from 'antd';
import switchHOC from './switch-hoc';

/**
 * uiType 与组件的映射，形式如下：
 * <uiType>: <Com> // 对应的组件
 */
const comsMap = {
  input: Input,
  number: InputNumber,
};

export default Object.keys(comsMap).reduce((result, uiType) => ({
  ...result,
  [uiType]: switchHOC(comsMap[uiType]),
}), {});

export const defaultUiType = 'input';
