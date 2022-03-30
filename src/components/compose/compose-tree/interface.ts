import { RouterConfig, Request } from '../interface';
import { IconType as _IconType } from '@/components/tree-node-icon';
import {
  EventDataNode,
  DataNode,
  TreeProps as AntDTreeProps,
} from 'antd/lib/tree';

export type IconType = _IconType;
export type TreeNodeKey = string;
export type NodeAttrs = {
  // 节点的 key
  id?: string;
  // 节点需要透传给模块的参数
  params?: any;
  // 节点类型
  type?: string;
  // 组织名称
  orgName?: string;
  // 职位
  position?: string;
  // 学生的班级列表
  deptNames?: string[];
  children?: ExtendedNode[];
};
export type ExtendedNode = DataNode & NodeAttrs;
export type ExtendedEventNode = EventDataNode & NodeAttrs;
export type SelectedDataNode = {
  event: 'select';
  selected: boolean;
  node: ExtendedEventNode;
  selectedNodes: DataNode[];
  nativeEvent: MouseEvent;
};
export type TreeDataSource = ExtendedNode[];

// 自定义的nameMap
export type SelfNameMap = {
  org?: string;
  dept?: string;
  group?: string;
  tag?: string;
  permission?: string;
  user?: string;
};

export interface IComposeTreeContext {
  // tree 节点选中的 id
  activeKey: TreeNodeKey;
  // 从根节点到选中节点的 key 路径
  treePaths: TreeNodeKey[];
  // tree 节点额外传入的参数
  activeParams: any;
  // tree 的数据源
  dataSource: TreeDataSource;
  // tree 的展开节点
  expandedKeys: AntDTreeProps['expandedKeys'];
  // 跳转到指定模块
  goToModule: (
    // 目标节点对象，key
    targetNode: Pick<ExtendedEventNode, 'key' | 'type' | 'params'>,
    nodePath: string,
    isReplace?: boolean,
  ) => void;
  // 异步获取 tree 节点的子节点
  loadData: (node: Partial<ExtendedEventNode>) => Promise<void>;
  // 根据 routerConfig 获取路由的路径
  getRoutePath: (modulePath: string) => { purePath: string; path: string };
  // 设置 tree 的展开节点
  setExpandedKeys: (expandedKeys: AntDTreeProps['expandedKeys']) => void;
  // 获取目标节点的子树列表，参数为从根节点到目标节点的 key 列表。如果不传值，默认为当前高亮的节点。
  loadDataByTreePath: (idList?: string[]) => Promise<void>;
  // 刷新整个树的内容，会比 loadDataByTreePath 的性能差一些
  reloadTree: () => Promise<void>;
  // 生成目标 tree 路径的 url，传入 tree 路径和目标路径（目标路径需要包含 :treePath 参数，不传默认取 match.path）
  generateUrlByTreePaths: (
    nextTreePaths: string[],
    nextPath?: string,
  ) => string;
  isSearch: boolean;
  setIsSearch: any;
  code: any;
}

export type UserType = 'customer' | 'employee';

export interface TreeProps extends Omit<AntDTreeProps, 'onSelect'> {
  // 异步请求
  request: {
    /**
     * 搜索树节点
     * 参数:
     * { keywords: string }
     * 返回：
     * {
     *   dataSource: Array<{
     *     label: string;
     *     key: string;
     *     labelPath: Array<{ label: string; key: string; }>,
     *   }>,
     * }
     */
    searchTreeNodes: Request;
  };
  // 用户节点的类型，用于指导点击用户节点显示的用户信息弹层
  userType?: UserType;
  searchProps?: any;
  onSelect(
    nextSelectedKeys: TreeNodeKey[],
    event: SelectedDataNode,
    currentDataSource: TreeDataSource,
  ): void;
  dataSource: TreeDataSource;
  // 根节点的 icon 类型，如果不设置，则默认使用节点的 iconType 属性。
  rootIconType?: IconType;
  // 搜索树对应的nameMao，如果不设置，则默认使用tree组件里的nameMap。
  selfNameMap?: SelfNameMap;
}

export default interface PropTypes extends Omit<TreeProps, 'dataSource'> {
  treeColWidth?: string;
  routerConfig: RouterConfig;
  request: TreeProps['request'] & {
    /**
     * 请求树节点的子节点列表
     * 参数:
     * { parentId: string }
     * 返回：
     * {
     *   dataSource: Array<{
     *     label: string;
     *     key: string;
     *     children: TreeDataSource
     *   }>,
     * }
     */
    getTreeNodes: Request;
  };
  onSelect?: AntDTreeProps['onSelect'];
  selfNameMap?: SelfNameMap;
}

export { PropTypes };
