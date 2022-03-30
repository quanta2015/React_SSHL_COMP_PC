import React from 'react';
import { SelectValue, TreeSelectProps } from 'antd/lib/tree-select';

export interface ssTreeSelectProps<VT> extends TreeSelectProps<VT> {
  dataSource?: Array<object>;
  showSearch?: boolean;
  canInput?: boolean;
  multiple?: boolean;
  width?: string;
}

declare class treeSelect<
  ValueType extends SelectValue = SelectValue,
> extends React.Component<ssTreeSelectProps<ValueType>> {}

export default treeSelect;
