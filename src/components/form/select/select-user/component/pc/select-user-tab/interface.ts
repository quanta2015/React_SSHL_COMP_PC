export interface PropTypes {
  onTabChange: (current: any) => void
  showTabList: TabTypes[]
  activeKey: TabTypes | ''
}

export type TabTypes = 'dept' // 部门
| 'group' // 下属组织
| 'innerContacts' // 内部通讯录
| 'schoolContacts' // 家校通讯录
| 'tags' // 标签
