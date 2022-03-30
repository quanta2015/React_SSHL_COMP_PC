import { ItreeItem } from "../select-user/interface";

// 已选展示组件props
export interface PropType {
  showUserDeptName?: boolean; // 是否展示用户的 deptName
  groupList: IgroupItem[]
  unit: string            // 计量单位
  delGroup: (group: IgroupItem) => void   // 删除分组，参数为被删除的分组
  delItem: (item: ItreeItem, group: IgroupItem) => void    // 删除items，参数为被删除的item，以及item所属的group
}

// 展示分组
export interface IgroupItem {
  title: string
  unit: string
  type: string
  count?: number
  itemList: ItreeItem[]
}
