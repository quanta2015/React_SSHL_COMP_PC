import { useEffect, useState } from 'react';
import SelectUser from 'select-ss-user';
import { Value as SelectUserValueProps } from 'select-ss-user/lib/components/select-user/interface';
import { mapProps } from 'recompose';
import RequestButton from './request';
import { SelectUserButtonProps } from './interface';
import net from '@/services/index';

export const selectUserBeforeRequestHoc = mapProps(
  ({
    selectUserProps,
    request,
    isFamilyOrSchool,
    selectBureauProps,
    selectSchoolProps,
    ...ownerProps
  }: SelectUserButtonProps) => {
    console.log(selectUserProps, 'selectUserProps');
    const [familyProps, setFamilyProps] = useState<any>(null);
    useEffect(() => {
      if (!isFamilyOrSchool) return;
      // 获取用户登录信息
      // tslint:disable-next-line: no-floating-promises
      net
        .request('/backend/loginUser/getLoginUserInfo', {
          method: 'GET',
        })
        .then((result: any) => {
          const orgType = result?.data?.orgType;
          // 是否区分校和监管组织（SCHOOL 校端/REGULATORY 监管组织）
          setFamilyProps(
            orgType === 'SCHOOL' ? selectSchoolProps : selectBureauProps,
          );
        });
    }, []);
    // 拦截 request 的 formatter，组装选人组件的结果
    const formatter = async (params: any) =>
      // eslint-disable-next-line
      new Promise(async (resolve, reject) => {
        SelectUser.show({
          dialogProps: {
            title: '选择对象',
          },
          isSaveSelectSignature: false,
          ...(!isFamilyOrSchool ? selectUserProps : familyProps),
          onOk: async (selectUserValue: SelectUserValueProps) => {
            let nextParams = {
              ...params,
              selectUser: selectUserValue,
            };
            if (request.formatter) {
              nextParams = await request.formatter(nextParams);
            }
            resolve(nextParams);
          },
          onCancel() {
            reject(new Error('用户取消选人'));
          },
        });
      });
    return {
      request: {
        ...request,
        formatter,
      },
      ...ownerProps,
    };
  },
);

export default selectUserBeforeRequestHoc(RequestButton);
