import {
  TableProps as AntDTableProps,
  TablePaginationConfig,
} from 'antd/lib/table';

// 单元格组件属性
export interface TableCellProps {
  tableProps: {
    // 抛出单元格事件，会自动加上 column name 前缀，并传入 index、record 参数，如第 5 行的 operation 列调用 onEmit('hello', {'foo':1})，则最终会调用 table 的 onEmit('operation.hello', 4, {...}, {'foo':1})
    onEmit: (
      eventName: string,
      index: number,
      record: any,
      ...args: any[]
    ) => void;
    // 抛出表格事件，如operation 列调用 onEmit('hello', {'foo':1})，则最终会调用 table 的 onEmit('hello', {'foo':1})
    onTableEmit: (eventName: string, ...args: any[]) => void;
    // 对应 column 的 name
    name: string;
    // 对应 column 的 uiType
    uiType: string;
    // 表格的主键
    primaryKey: string;
    // 当前行号
    index: number;
    // 当前行的数据
    record: any;
    cellClassName?: string;
    // 表格的整个数据
    tableDataSource: Array<any>;
    scroll?: any;
    otherKey?: any;
  };
  // 单元格的值
  value: any;
}

// 列配置
export interface ColumnItemProps {
  // 列名，与 dataSource 对应
  name: string;
  // 列头文案
  label?: string;
  // 列组件类型
  uiType?: string;
  // 列组件的额外参数
  props?: any;
  // 提示气泡文案
  help?: string;
  /** 自定义渲染方法 */
  cell?: (value: any, record: any, index: number) => any;
  render?: (text?: number, record?: any, index?: number) => any;
  width?: number;
  fixed?: any;
  _paddingR30?: any;
}

export interface PropTypes
  extends Omit<AntDTableProps<any>, 'columns' | 'pagination'> {
  columns: Array<ColumnItemProps>;
  dataSource?: Array<any>;
  hasBorder?: boolean;
  cellClassName?: string;
  comsMap?: {
    [uiType: string]: React.FC | React.Component;
  };
  // 是否锁定第一列，默认为 true
  fixFirstColumn?: boolean;
  // 是否锁定最后一列，默认为 true
  fixLastColumn?: boolean;
  /** 参考 antd 中 Table 组件的 pagination 属性，如果传 false，表示不分页 */
  pagination?: any | TablePaginationConfig;
  rowSelection?: any;
  checkable?: boolean;
  primaryKey?: string | number | ((records?: any) => string);
  otherKey?: string;
}
