import { ModalProps } from 'antd/lib/modal';

export type NodeType = 'USER' | 'ORG' | 'DEPT' | 'GROUP_DEPT' | 'GROUP' | 'TAG';

export interface ListItem {
  id: string;
  // 标签类型：系统标签，
  tagType: 'SYS_TAG' | 'COMMON_TAG' | 'PERSONAL_TAG';
  // tagType: '个人标签'|'通用标签'|'系统标签';
  // 名称
  name: string;
  // 用户数
  userCount?: number;
  // 类型（人 or 部门）
  type: 'dept' | 'user';
  isRoot: boolean;
  // 组织名称
  orgName?: string;
  // 所属部门 id（用于区分不同部门下的同一人，对应 strictUser 配置）
  deptId?: string;
  // 所属部门名称（用于区分不同部门下的同一人，对应 strictUser 配置）
  deptName?: string;
}

export interface ValueObj {
  // 快照 id，用于获取已有数据
  selectSignature?: string;
  // 当前所属组织 ID
  orgId?: string | number;
  // 人员列表
  userInfoList: IlistItem[];
  // 部门列表
  deptInfoList: IlistItem[];
  // 标签列表
  tagInfoList: IlistItem[];
  // 组织列表
  orgInfoList: IlistItem[];
  // 分组列表
  groupInfoList: IlistItem[];
}

export type Value = ValueObj;

export interface IdefaultValue {
  deptInfoList?: IlistItem[];
  orgInfoList?: IlistItem[];
  userInfoList?: IlistItem[];
  tagInfoList?: IlistItem[];
  groupInfoList?: IlistItem[];
}

export interface IlistItem {
  id: string;
  name: string;
  type?: string;
  orgId?: string;
  orgName?: string;
  contactType?: string;
  // 所属部门 id（用于区分不同部门下的同一人，对应 strictUser 配置）
  deptId?: string;
  // 所属部门名称（用于区分不同部门下的同一人，对应 strictUser 配置）
  deptName?: string;
}

// 获取用户总数的请求参数
export interface SelectUserCountRequestItem {
  selectNodeList: {
    contactType: string;
    type?: string;
    key?: string;
    id: string;
  }[];
  type: string;
}

export interface ItreeItem extends Omit<ListItem, 'type' | 'isRoot' | 'tagType'> {
  key: string;
  title: any;
  nodeType: string;
  orgId?: string;
  type?: NodeType;
  deptType?: 0  // 基础校区
  | 1;          // 自定义校区
  // 直接子节点
  children?: ItreeItem[];
  // 是否可选中
  checkable?: boolean;
  // 是否叶子节点，默认为 false
  isLeaf?: boolean;
  // 当前节点所在层级的序号路径
  pos?: string;
  label?: string;
  // 图标
  icon?: any;
  contactType?: string;
  count?: number;
}

export interface PropTypes {
  // 显示时的初始数据，优先级低于 selectSignature。
  defaultValue?: IdefaultValue;
  // 快照 id，用于获取已有数据
  selectSignature?: string;
  // 是否需要请求后台保存快照，true(默认): 在onOk的时候请求后台保存快照; false: 在onOk的时候仅返回当前选中的数据
  isSaveSelectSignature?: boolean;
  // 弹层是否显示
  visible: boolean;
  // 需要展示的 tab 选项列表，默认为当前组织类型下的所有 tab
  // 展示的选项卡列表
  showTabList: (
    | 'dept' // 部门
    | 'group' // 下属组织
    | 'innerContacts' // 内部通讯录
    | 'schoolContacts' // 家校通讯录
    | 'tags' // 标签
  )[];
  onCancel?(): void;
  onOk(value: Value): void;
  // 选择模式：人 or 部门，默认 'user'
  selectType?: 'user' | 'dept'; // 对应异步请求传 selectUser: true, false
  // 不可选节点类型, 不传默认全部可选
  unCheckableNodeType?: NodeType[];
  // 仅叶子节点可选, 搭配selectType使用, 默认为false
  // 当selectType为user时，仅可选人
  // 当selectType为dept时，仅可选部门叶子节点
  onlyLeafCheckable?: boolean;
  // 搜索框的提示文案，默认为 “搜索姓名、部门名称、手机号”
  searchPlaceholder?: string;
  // 是否多选，默认 true
  multiple?: boolean;
  // 透传给模态框的属性，如标题等，默认 {}
  dialogProps?: ModalProps;
  // 请求的基础路径，默认 'pc'
  basePath?: 'pc' | 'mobile';
  // 请求需要的额外参数
  requestParams?: {
    // 基础校区还是自定义校区
    campusType?: 'base_school_type' | 'custom_school_type';
    // 仅展示分组
    onlySelectGroup?: boolean;
    // 是否严格区分不同部门下的同一个人，默认为 false，如果为 true，则不同部门下的同一个人会认为是两个人，选择后会带上部门信息。
    strictUser?: boolean;
    // 企业微信 id，移动端鉴权用
    corpId?: string;
    // 部门类型 家校通讯录基础校区下班级class/自定义校区下自定义班级custom_class
    deptTypeList?: any;
    // 选择类型 只可选用户user,部门dept,组织org,分组group,标签tag
    selectTypeList?: any;
  };
  // 透传给右侧已选择组件的属性，如部门文案等，默认 {}
  selectPaneProps?: any; 
}

export type SelectUserFuncArgProps = Omit<PropTypes, 'visible' | 'onOk'> & {
  onOk(value: Value): void | Promise<void>;
};

export type SelectUserFunc = (
  props: SelectUserFuncArgProps
) => {
  destroy: () => void;
};

export interface SelectUserStaticFunctions {
  show: SelectUserFunc;
}

export interface IsaveResultParams {
  deptInfoList: any;
  orgInfoList: any;
  userInfoList: any;
  groupInfoList: any;
  tagInfoList: any;
  id: string | null;
}

interface ISelectNodeListItem {
  contactType: string;
  type?: string;
  key?: string;
  id: string;
}

export interface SelectUserCountRequestItem {
  selectNodeList: ISelectNodeListItem[];
  type: string;
}
