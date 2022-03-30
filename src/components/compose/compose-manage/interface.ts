import { PropTypes as NsTableProps, ColumnItemProps } from '@/components/table';
import { NsFilterProps } from './filter-item';
import { NsNoticeProps } from './notice-section';
import { NsSortProps } from './sort';

// export interface NsTableProps {
//   /** 列属性 */
//   columns: ColumnItemProps[];
//   // 是否锁定第一列，默认为 true
//   fixFirstColumn: boolean;
//   // 是否锁定最后一列，默认为 true
//   fixLastColumn: boolean;
//   dataSource?: any[];
//   hasBorder?: boolean;
//   cellClassName?: string;
//   comsMap?: any;
//   /** 参考 antd 中 Table 组件的 pagination 属性，如果传 false，表示不分页 */
//   pagination?: boolean | TablePaginationConfig;
//   rowSelection?: any;
//   checkable?: boolean;
//   primaryKey?: string;
// }

export interface NsTooltipProps {
  text: React.ReactNode;
  title: React.ReactNode;
}

export interface PropTypes {
  /** 警告、提示 属性 */
  alertProps?: NsNoticeProps;
  /** 过滤条件 */
  filterProps?: NsFilterProps[];
  /** 表格数据请求，返回数据结构为 { dataSource: object[], pagination: { total: number } } */
  dataRequest:
    | string
    | Request
    | { url?: string; method?: string; params?: any };
  dataFormatter?: (data: any, params?: any) => any;
  /** 操作按钮 */
  buttonList?: (ButtonProps & {
    isBatch?: boolean;
  })[];
  /** 表格相关的属性 */
  tableProps?: NsTableProps;
  /** 排序属性 */
  sortProps?: Omit<NsSortProps, 'onRefresh' | 'primaryKey'>;
  /** 提示信息 */
  tooltip?: NsTooltipProps;
  /** 事件透出 */
  onEmit?: (eventType: string, ...args: any[]) => any;
  // 组件加载完成的回调
  // onRef?: (ctx: { reload: () => any }) => any;
  className?: string;
  // 搜索项变更的回调
  onSearchChange?(search: any): void;
  // 请求成功的回调
  onRequestSuccess?(data: any): void;
  // 同步到search
  synchValues?: any;
  // 样式
  filterClassName?: string;
  // 去掉重置按钮
  removeResetButton?: boolean;
}

export { ColumnItemProps };
