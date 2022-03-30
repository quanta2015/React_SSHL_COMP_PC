import { Context as NetContext } from '@irim/saber/types/interfaces';

export type Method = NetContext['method'];
export type Request = NetContext & {
  url: string;
  params?: any;
  /** 请求参数格式化 */
  formatter?: (data: any) => any;
};

type TreeNodeKey = string | number | null;
/* 复杂组件传递给子组件的配置 */
export interface ComposeProps {
  // tree 选中节点的 key
  activeKey: TreeNodeKey;
  // 从根节点到选中节点的 key 路径
  treePaths: TreeNodeKey[];
  // tree 节点额外传入的参数
  params: any;
}

// 复杂组件内的路由配置
export type RouterConfig = {
  // 相对路径
  path: string;
  // 对应的 module 是否是 tree 类型，默认为 false
  isTree?: boolean;
  // 节点组件
  Com: React.ComponentType | React.LazyExoticComponent<React.ComponentType>;
}[];
