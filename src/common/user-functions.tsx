import React from 'react';
import { Modal } from 'antd';
import net from '@/services/';
import { Value } from '@/components/select-class-modal';

export interface FormValue {
  userId: any;
  userName: string;
  depts: Value;
}
export const checkUserName = async (
  formValue: FormValue,
  isEdit: boolean,
  typeName?: string
) => {
  const { userId, userName, depts } = formValue;
  let deptList = [];

  if (Array.isArray(depts)) { // 员工部门
    deptList = depts;
  } else { // 客户部门
    const { baseSchoolDepts, customSchoolDepts } = depts || {};
    deptList = [...(baseSchoolDepts || []), ...(customSchoolDepts || [])];
  }
  const {
    data
  }: {
    data: {
      deptId: string;
      deptName: string;
      mobile: string;
      userId: string;
      userName: string;
    }[];
  } = await net.request('/user/global/doubleNameJudgment', {
    method: 'POST',
    data: {
      userId,
      deptIds: deptList.map(_ => _.id),
      userName
    }
  });
  if (data && data.length > 0) {
    // 弹层确认是否要继续
    return new Promise(resolve => {
      Modal.confirm({
        title: `${typeName || '部门'}存在同名人员`,
        content: (
          <div>
            <p>{typeName || '部门'}内存在同名人员，请检查并确认是否新增</p>
            {data.map(({ userId: id, userName: name, mobile }) => (
              <p key={id}>
                {name} —— 手机号码：{mobile}
              </p>
            ))}
          </div>
        ),
        okText: `确定${isEdit ? '修改' : '新增'}`,
        cancelText: '取消',
        onOk() {
          resolve(true);
        },
        onCancel() {
          resolve(false);
        }
      });
    });
  }
  return true;
};
