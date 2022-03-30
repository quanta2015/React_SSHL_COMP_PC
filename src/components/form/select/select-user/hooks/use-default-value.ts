import { useEffect } from 'react';
import net from '@/services';
import {
  PropTypes,
  SelectUserCountRequestItem,
  IlistItem,
  IdefaultValue,
} from '../interface';

export type Config = Pick<
  PropTypes,
  'selectSignature' | 'defaultValue' | 'requestParams' | 'basePath'
>;

export interface Foo {
  setUserCount: any;
  getUserCount: any;
  setSelectedData: any;
}

export default (
  { selectSignature, defaultValue, requestParams, basePath }: Config,
  { setUserCount, getUserCount, setSelectedData }: Foo,
) => {
  useEffect(() => {
    /**
     * 对defaultValue或者请求获取的数据源进行处理
     * @param data
     */
    function resolveData(data: IdefaultValue) {
      let {
        deptInfoList = [],
        orgInfoList = [],
        userInfoList = [],
        tagInfoList = [],
        groupInfoList = [],
      } = data;
      const checkedKeys: string[] = [];

      let selectCountRequestList: SelectUserCountRequestItem[] = [];

      // 存储所有部门id
      const deptObject: SelectUserCountRequestItem = {
        selectNodeList: [],
        type: 'DEPT',
      };
      for (const item of deptInfoList) {
        // 如果传入的数据中没有type属性，则在初始化时需要设置item的type
        if (!item.type) item.type = 'DEPT';

        deptObject.selectNodeList.push({
          contactType: item.contactType,
          id: item.id,
        });
      }

      // 存储所有组织id
      const orgObject: SelectUserCountRequestItem = {
        selectNodeList: [],
        type: 'ORG',
      };
      for (const item of orgInfoList) {
        // 如果传入的数据中没有type属性，则在初始化时需要设置item的type
        if (!item.type) item.type = 'ORG';

        orgObject.selectNodeList.push({
          contactType: item.contactType,
          id: item.id,
        });
      }

      // 存储所有标签id
      const tagObject: SelectUserCountRequestItem = {
        selectNodeList: [],
        type: 'TAG',
      };
      for (const item of tagInfoList) {
        // 如果传入的数据中没有type属性，则在初始化时需要设置item的type
        if (!item.type) item.type = 'TAG';

        tagObject.selectNodeList.push({
          contactType: item.contactType,
          id: item.id,
        });
      }

      // 存储所有分组id
      const groupObject: SelectUserCountRequestItem = {
        selectNodeList: [],
        type: 'GROUP',
      };
      for (const item of groupInfoList) {
        // 如果传入的数据中没有type属性，则在初始化时需要设置item的type
        if (!item.type) item.type = 'GROUP';

        groupObject.selectNodeList.push({
          contactType: item.contactType,
          id: item.id,
        });
      }

      selectCountRequestList = [deptObject, orgObject, tagObject, groupObject];

      const { selectTypeList } = requestParams;

      // 获取各个类型下的用户总人数
      // 如果设置了可选节点，则仅计算可选节点的总人数
      if (selectTypeList && selectTypeList.length === 1) {
        const count = {
          orgCount: orgObject.selectNodeList.length,
          deptCount: deptObject.selectNodeList.length,
          tagCount: tagObject.selectNodeList.length,
          groupCount: groupObject.selectNodeList.length,
        };
        setUserCount(count);
      } else {
        // 获取已选用户总人数
        getUserCount(selectCountRequestList);
      }

      /**
       * @param list
       */
      const generateKey = (list: IlistItem[]) => {
        list.forEach((item: IlistItem) => {
          checkedKeys.push(item.id);
        });
      };

      // 如果是 strictUser，则需要将用户 id 和该用户的部门 id 拼接为 id 存放到用户字段下，以区分不同部门下的同一用户
      if (requestParams?.strictUser) {
        userInfoList = userInfoList.map((userInfo) => ({
          ...userInfo,
          id: `${userInfo.id}&${userInfo.deptId}`,
        }));
      }

      generateKey(deptInfoList);
      generateKey(orgInfoList);
      generateKey(userInfoList);
      generateKey(tagInfoList);
      generateKey(groupInfoList);

      // console.log('checkedKeys: ', checkedKeys);

      // 更新选中的节点数据
      setSelectedData({
        deptInfoList,
        orgInfoList,
        userInfoList,
        tagInfoList,
        groupInfoList,
        checkedKeys,
      });
    }

    // 如果传入了默认值
    if (defaultValue) {
      // console.log('defaultValue: ', defaultValue);

      // 处理默认值
      resolveData(defaultValue);
    }

    if (selectSignature) {
      // 拉取数据并更新treeState中的已选数据
      // tslint:disable-next-line: no-floating-promises
      net
        .request(`/${basePath}/selectCompents/getResult`, {
          method: 'POST',
          data: {
            selectSignature,
          },
        })
        .then((result: any) => {
          // 处理响应数据
          resolveData(result.data);
        });
    }
  }, [selectSignature, defaultValue]);
};
