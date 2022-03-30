import React from 'react';
import { SelectProps, SelectValue } from 'antd/lib/select';

export interface CFSelectProps<VT> extends SelectProps<VT> {
  dataSource?: Array<object>;
  showSearch?: boolean;
  canInput?: boolean;
  multiple?: boolean;
  width?: string;
}

declare class CFSelect<
  ValueType extends SelectValue = SelectValue
> extends React.Component<CFSelectProps<ValueType>> {}

export default CFSelect;
