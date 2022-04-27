/**
 * 全局的 module 映射列表, key 为 tree 节点的 type 字段，value 为组件上的 key
 * @example
 * <ComposeTree>
 *   <ComponentA key="com-a" />
 *   <ComponentB key="com-b" />
 * </ComposeTree>
 * 需要在此文件中添加: {
 *   'node-type-a': 'com-a',
 *   'node-type-b': 'com-b,
 * }
 */
const moduleMap: { [type: string]: string } = {
  // 测试
  'test-people': 'people',
  'test-department': 'department',
  // 个人标签
  'person-tag-list': 'person-tag-list',
  'person-tag-detail': 'person-tag-detail',
  // 通用标签
  'general-tag-list': 'general-tag-list',
  'general-tag-detail': 'general-tag-detail',

  // 部门岗位
  'contact-department-personnel-setting':
    'contact-department-personnel-setting',
  'contact-department-position-setting': 'contact-department-position-setting',

  // 系统标签
  'contact-system-tag-edit': 'contact-system-tag-edit',
  'contact-system-tag-system-tag': 'contact-system-tag-system-tag',
  'contact-system-tag-personnel-tag': 'contact-system-tag-personnel-tag',

  // 家校通讯录
  'school-root': 'school-root',
  'base-campus': 'base-campus',
  'base-period': 'base-period',
  'base-grade': 'base-grade',
  'base-class': 'base-class',
  'custom-campus': 'custom-campus',
  'custom-dept': 'custom-dept',
  'custom-class': 'custom-class',

  // 资讯管理
  'cms-news': 'cms-news',
  'industry-template': 'industry-template',
  'dept-position': 'dept-position',
  'partner-user': 'partner-user',
  'partner-dept': 'partner-dept',
  'community-dept': 'community-dept',
  'community-user': 'community-user',
  perm: 'perm',
  'org-perm': 'org-perm',
  'disabled-dept': 'disabled-dept',
  'disabled-user': 'disabled-user',

  'internal-dept': 'internal-dept',
  'internal-user': 'internal-user',

  village: 'village',
  region: 'region',
  area: 'area',
  shop: 'shop',
  disabled_home: 'disabled_home',
  partner: 'partner',
  school: 'school',
  province: 'province',
  city: 'city',
  street: 'street',
  community: 'community',
  building: 'building',
  cell: 'cell',
  'mico-node': 'mico-node',
  'mico-leaf': 'mico-leaf',

  // 资产管理
  resource_group: 'resource_group',
  'assets-dept-leaf': 'assets-dept-leaf',
  'assets-dept-branch': 'assets-dept-branch',
  resource: 'resource',
  'assets-dept': 'assets-dept',

  // 无权限
  'no-position-cms-news': 'no-position-cms-news',
  'no-position-industry-template': 'no-position-industry-template',
  'no-position-dept-position': 'no-position-dept-position',
  'no-position-partner-user': 'no-position-partner-user',
  'no-position-partner-dept': 'no-position-partner-dept',
  'no-position-community-dept': 'no-position-community-dept',
  'no-position-community-user': 'no-position-community-user',
  'no-position-perm': 'no-position-perm',
  'no-position-org-perm': 'no-position-org-perm',
  'no-position-disabled-dept': 'no-position-disabled-dept',
  'no-position-disabled-user': 'no-position-disabled-user',

  'no-position-internal-dept': 'no-position-internal-dept',
  'no-position-internal-user': 'no-position-internal-user',

  'no-position-village': 'no-position-village',
  'no-position-region': 'no-position-region',
  'no-position-area': 'no-position-area',
  'no-position-shop': 'no-position-shop',
  'no-position-disabled_home': 'no-position-disabled_home',
  'no-position-partner': 'no-position-partner',
  'no-position-school': 'no-position-school',
  'no-position-province': 'no-position-province',
  'no-position-city': 'no-position-city',
  'no-position-street': 'no-position-street',
  'no-position-community': 'no-position-community',
  'no-position-building': 'no-position-building',
  'no-position-cell': 'no-position-cell',
  'no-position-mico-node': 'no-position-mico-node',
  'no-position-mico-leaf': 'no-position-mico-leaf',
  'no-position-resource_group': 'no-position-resource_group',
  'no-position-assets-dept-leaf': 'no-position-assets-dept-leaf',
  'no-position-assets-dept-branch': 'no-position-assets-dept-branch',
  'no-position-resource': 'no-position-resource',
  'no-position-assets-dept': 'no-position-assets-dept',

  // 内部通讯录
  'contact-internal-root-manage': 'contact-internal-root-manage',
  'contact-internal-branch-manage': 'contact-internal-branch-manage',
  'contact-internal-leaf-manage': 'contact-internal-leaf-manage',
  'contact-sub-org-root-manage': 'contact-sub-org-root-manage',
  'contact-sub-org-branch-manage': 'contact-sub-org-branch-manage',
  'contact-sub-org-leaf-manage': 'contact-sub-org-leaf-manage',
  'contact-virtual-org-root-manage': 'contact-virtual-org-root-manage',
  'contact-virtual-org-branch-manage': 'contact-virtual-org-branch-manage',
  'contact-virtual-org-leaf-manage': 'contact-virtual-org-leaf-manage',

  // 权限管理
  AUTHORITY_ROOT: 'AUTHORITY_ROOT',
  AUTHORITY_DETAIL: 'AUTHORITY_DETAIL',

  // 资源中心
  // 分组
  'resource-center-group-leaf': 'resource-center-group-leaf',
  'resource-center-group-branch': 'resource-center-group-branch',
  // 资源点
  'resource-center-point-manage': 'resource-center-point-manage',
  'resource-center-point-root': 'resource-center-point-root',

  // 家校通讯录
  'school-root-noper': 'school-root-noper',
  'base-campus-noper': 'base-campus-noper',
  'base-period-noper': 'base-period-noper',
  'base-grade-noper': 'base-grade-noper',
  'custom-campus-noper': 'custom-campus-noper',
  'custom-dept-noper': 'custom-dept-noper',

  // 内部通讯录
  'contact-internal-root-manage-noper': 'contact-internal-root-manage-noper',
  'contact-internal-branch-manage-noper':
    'contact-internal-branch-manage-noper',
  'contact-internal-leaf-manage-noper': 'contact-internal-leaf-manage-noper',
  'contact-sub-org-root-manage-noper': 'contact-sub-org-root-manage-noper',
  'contact-sub-org-branch-manage-noper': 'contact-sub-org-branch-manage-noper',
  'contact-sub-org-leaf-manage-noper': 'contact-sub-org-leaf-manage-noper',
  'contact-virtual-org-root-manage-noper':
    'contact-virtual-org-root-manage-noper',
  'contact-virtual-org-branch-manage-noper':
    'contact-virtual-org-branch-manage-noper',
  'contact-virtual-org-leaf-manage-noper':
    'contact-virtual-org-leaf-manage-noper',
};

export default moduleMap;
