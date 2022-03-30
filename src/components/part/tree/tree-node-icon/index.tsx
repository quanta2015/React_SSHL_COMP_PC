import React from 'react';
import './index.less';

// 标签
export const TagIcon: React.FunctionComponent = () => {
  return <span className="user-center-tree-node-icon select-user-icon-tag" />;
};

// 用户
export const UserIcon: React.FunctionComponent = () => {
  return <span className="user-center-tree-node-icon select-user-icon-user" />;
};

// 分组
export const GroupIcon: React.FunctionComponent = () => {
  return <span className="user-center-tree-node-icon select-user-icon-group" />;
};

// 组织
export const OrgIcon: React.FunctionComponent = () => {
  return <span className="user-center-tree-node-icon select-user-icon-org" />;
};

// 组织根节点
export const OrgRootIcon: React.FunctionComponent = () => {
  return (
    <span className="user-center-tree-node-icon select-user-icon-org-root" />
  );
};

// 部门
export const DeptIcon: React.FunctionComponent = () => {
  return <span className="user-center-tree-node-icon select-user-icon-dept" />;
};

// 权限
export const PermissionIcon: React.FunctionComponent = () => {
  return (
    <span className="user-center-tree-node-icon select-user-icon-permission" />
  );
};

// 权限根节点
export const PermissionRootIcon: React.FunctionComponent = () => {
  return (
    <span className="user-center-tree-node-icon select-user-icon-permission-root" />
  );
};

export type IconType =
  | 'root'
  | 'province'
  | 'area'
  | 'city'
  | 'street'
  | 'community'
  | 'village'
  | 'shop'
  | 'building'
  | 'cell'
  | 'house'
  | 'org'
  | 'administrative'
  | 'dept'
  | 'group'
  | 'tag'
  | 'permission'
  | 'user'
  | 'permissionRoot'
  | 'orgRoot'
  | 'USER'
  | 'ORG'
  | 'DEPT'
  | 'GROUP_DEPT'
  | 'GROUP'
  | 'TAG';

const iconMap: {
  [iconType in IconType]: React.ComponentType;
} = {
  org: OrgIcon,
  dept: DeptIcon,
  root: DeptIcon,
  administrative: DeptIcon,
  province: DeptIcon,
  city: DeptIcon,
  area: DeptIcon,
  street: DeptIcon,
  community: DeptIcon,
  shop: DeptIcon,
  building: DeptIcon,
  cell: DeptIcon,
  village: DeptIcon,
  group: GroupIcon,
  tag: TagIcon,
  permission: PermissionIcon,
  user: UserIcon,
  house: UserIcon,
  permissionRoot: PermissionRootIcon,
  orgRoot: OrgRootIcon,
  USER: UserIcon,
  ORG: OrgIcon,
  DEPT: DeptIcon,
  GROUP_DEPT: DeptIcon,
  GROUP: GroupIcon,
  TAG: TagIcon,
};

export default iconMap;
