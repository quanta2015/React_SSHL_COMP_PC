import React, { useState, useCallback, useRef } from 'react';
import { setWith, clone } from 'lodash';
import net from '@/services/index';
import {
  NodeType,
  ItreeItem,
  PropTypes,
  SelectUserCountRequestItem,
  IsaveResultParams,
  IlistItem,
  IdefaultValue,
} from '../interface';
import treeNodeIconMap from '@/components/tree-node-icon';
import useDefaultValue from './use-default-value';
import '../index.less';

let timeStamp = Date.now();
export function getUid(): string {
  return `${(timeStamp += 1)}`;
}

// 持久化的属性，设置一次之后就不会修改
type StaticProps = Pick<
  PropTypes,
  | 'selectType'
  | 'basePath'
  | 'requestParams'
  | 'multiple'
  | 'onlyLeafCheckable'
  | 'unCheckableNodeType'
  | 'selectSignature'
  | 'defaultValue'
  | 'onOk'
  | 'isSaveSelectSignature'
>;
type ItreeState = StaticProps & {
  treeData: ItreeItem[];
  searchResult: any[];
  checkedKeys: string[];
  orgInfoList: ItreeItem[];
  deptInfoList: ItreeItem[];
  userInfoList: ItreeItem[];
  tagInfoList: ItreeItem[];
  groupInfoList: ItreeItem[];
  userCount: IuserCount;
};

interface IResult {
  code: number;
  data: {
    dataSource: (ItreeItem & { label: string })[];
  };
  errorMsg: string | null;
  success: boolean;
}

interface IuserCount {
  orgCount: number;
  deptCount: number;
  tagCount: number;
  groupCount: number;
}

export interface ItreeContext {
  // 存储树及选中数据的state
  treeState: ItreeState;
  // 设置当前树的data方法
  // setTreeData: (treeData: ItreeItem[]) => void;
  // 设置当前选中数据的方法
  setSelectedData: (selectData: any) => void;
  // 更新树节点选中状态的方法, 返回该节点当前的选中状态
  updateCheckedNode: (node: ItreeItem, key: string) => boolean;
  // 清空当前选中数据的方法
  clear: () => void;
  // 取消指定keys选中状态的方法
  delKeys: (keys: string[], type?: NodeType) => void;
  // 设置分组人员信息
  setUserCount: (userCount: IuserCount) => void;
  // 请求重新计算用户人数
  resetUserCount: (
    item: ItreeItem,
    checked: boolean,
    isRequest?: boolean,
  ) => void;
  getTreeRoot: (type: string) => void;
  getSearchResult: (params: any) => void;
  // 是否在加载
  loading: boolean;
  loadData: (item: ItreeItem, type: string) => Promise<void>;
  getUserCount: (selectCountRequestList: SelectUserCountRequestItem[]) => void;
  handleOk: (
    result: IdefaultValue & {
      selectSignature?: string;
    },
  ) => void;
}

const INIT_STATE: ItreeState = {
  // 存储树data
  treeData: [],
  // 存储树的搜索结果
  searchResult: [],
  // 存储当前所有选中的keys
  checkedKeys: [],
  // 选中的组织类型节点
  orgInfoList: [],
  // 选中的部门类型节点
  deptInfoList: [],
  // 选中的用户类型节点
  userInfoList: [],
  // 选中的标签类型节点
  tagInfoList: [],
  // 选中的分组类型节点
  groupInfoList: [],
  // 不同类型选中的人员数量统计
  userCount: { orgCount: 0, deptCount: 0, tagCount: 0, groupCount: 0 },
  // 请求基本路径
  basePath: 'pc',
  // 请求附加参数
  requestParams: { campusType: 'base_school_type' },
  isSaveSelectSignature: false,
  onOk() {},
};

// 树节点控制逻辑
const useTree = (staticProps: StaticProps): ItreeContext => {
  // dataSource 中间态，稳定后 set 到 dataSource 中，以解决递归、异步、setState 协同的问题。
  const cachedDataSource = useRef([]);
  // 树的数据
  const [treeState, setTreeState] = useState<ItreeState>({
    ...INIT_STATE,
    ...staticProps,
  });
  const [loading, setLoading] = useState(false);
  // 根据类型获取选中列表
  const getListByType = (type: NodeType, treeStateToFind = treeState) => {
    const typeToKeyMap = {
      DEPT: 'deptInfoList',
      GROUP_DEPT: 'deptInfoList',
      ORG: 'orgInfoList',
      TAG: 'tagInfoList',
      USER: 'userInfoList',
      GROUP: 'groupInfoList',
    };
    const key: string = typeToKeyMap[type];
    // @ts-ignore
    return [treeStateToFind[key], key];
  };

  // 设置treeData
  const setTreeData = (treeData: ItreeItem[]) => {
    setTreeState((treeState) => {
      return {
        ...treeState,
        treeData,
      };
    });
  };

  // 设置treeData
  const setSearchResult = (searchResult: any[]) => {
    setTreeState((treeState) => {
      return {
        ...treeState,
        searchResult,
      };
    });
  };

  // // 根据dfs查找树节点，因为觉得用户操作习惯更倾向于一个节点不停的展开，所以dfs能更快的找到节点
  // const findNode = (key: string, root = treeState.treeData) => {
  //   const stack = [...root];

  //   while (stack.length) {
  //     const node = stack.pop();

  //     if (node.key === key) {
  //       return node;
  //     } else {
  //       if (node.children) {
  //         for (const child of node.children) {
  //           stack.push(child);
  //         }
  //       }
  //     }
  //   }
  //   return null;
  // };

  const formatData = useCallback(
    (
      // 结合业务需求格式化树节点数据
      list: ItreeItem[], // 待格式化的树节点列表
      type: string, // 当前的树所属的类型
      isRoot?: boolean, // 是否是根节点
    ) => {
      const { onlyLeafCheckable, unCheckableNodeType, selectType } = treeState;

      for (const item of list) {
        item.id = item.key;
        item.key = getUid();
        item.name = item.label;

        // console.log(
        //   onlyLeafCheckable,
        //   'onlyLeafCheckable',
        //   item.type,
        //   selectType
        // );
        let NodeIcon = treeNodeIconMap[item.type];
        let label = item.name;
        if (item.type === 'TAG') {
          // 标签需要展示标签下的人数
          label = `${item.name} ${
            item.isLeaf ? `(${  item.count || 0  })` : ''
          }`;
        }

        // 特殊处理内部通讯录根节点
        if (isRoot && type === 'innerContacts') {
          // 内部通讯录的跟节点不允许被选择
          item.checkable = false;
          // 强制使用部门的 icon
          NodeIcon = treeNodeIconMap.dept;
        }

        item.title = (
          <div className="treeNode" title={item.name}>
            <NodeIcon />
            <div className="nodeContent">
              <div className="titleWrapper">
                <div className="title">{label}</div>
              </div>
            </div>
          </div>
        );

        // 家校通迅录和内部通迅录的特殊逻辑
        if (['innerContacts', 'schoolContacts'].includes(type)) {
          if (
            item.type === 'DEPT' && // 如果节点类型为DEPT
            selectType === 'user' // 且当前组件 selectType 为 user
          ) {
            item.isLeaf = false; // 则 DEPT 节点一律视为非叶子结点 (实际场景中DEPT 节点下一定有子节点)
          } else if (
            selectType === 'dept' &&
            onlyLeafCheckable &&
            item.isLeaf === false
          ) {
            // 如果当前组件 selectType 为 dept
            // 设置仅叶子节点可选
            item.checkable = false;
          }
        }

        // 如果配置了不可选节点类型，且当前节点类型在不可选类型中，则节点不可选
        if (unCheckableNodeType.indexOf(item.type) !== -1) {
          item.checkable = false;
        }

        // 标签的非叶子节点不可选
        if (item.type === 'TAG' && item.isLeaf === false) {
          item.checkable = false;
        }

        if (
          onlyLeafCheckable &&
          item.type === 'GROUP' &&
          item.isLeaf === false
        ) {
          item.checkable = false;
        }

        // 如果只有叶子节点可选，且当前 selectType 为 user，则非 USER 节点一律不可选
        if (
          onlyLeafCheckable &&
          selectType === 'user' &&
          item.type !== 'USER'
        ) {
          item.checkable = false;
        }

        if (item.children) {
          formatData(item.children, type);
        }
      }
    },
    [treeState],
  );

  const loadData = async (item: ItreeItem, type: string) => {
    if (item.children) return;
    await fetchTreeNodes(item, type);
    setTreeData(cachedDataSource.current);
  };

  // 动态获取子节点列表
  const fetchTreeNodes = useCallback(
    (
      item: Pick<
        ItreeItem,
        'nodeType' | 'orgId' | 'key' | 'type' | 'id' | 'pos'
      >,
      type: string,
    ): Promise<any> => {
      return new Promise<any>((resolve) => {
        const { basePath, requestParams, selectType } = treeState;
        const { key, id, type: itemType, pos, nodeType, orgId } = item;
        const isRoot = pos === '0';

        // tslint:disable-next-line: no-floating-promises
        net
          .request(`/${basePath}/selectCompents/${type}`, {
            method: 'POST',
            data: {
              nodeType,
              orgId,
              parentId: id,
              ...requestParams,
              // 只有根节点或者GROUP_DEPT / DEPT类型的节点下才有人的信息
              selectUser:
                !!(selectType === 'user' &&
                (isRoot || itemType === 'GROUP_DEPT' || itemType === 'DEPT')),
            },
          })
          .then((result: IResult) => {
            const _dataSource = result.data.dataSource;
            formatData(_dataSource, type, isRoot);
            if (isRoot) {
              cachedDataSource.current = _dataSource;
              resolve();
              return;
            }
            // 获取当前节点的序号路径
            const position = pos
              ? pos
                  .split('-')
                  // 去掉第一级的 0（antd 的 tree 组件的 pos 前面额外多了个 0）
                  .slice(1)
                  .reduce((setterPath: (number | string)[], index: string) => {
                    return setterPath.concat([+index, 'children']);
                  }, [])
              : [];
            cachedDataSource.current = setWith(
              clone(cachedDataSource.current),
              position,
              _dataSource,
              clone,
            );

            resolve();
          });
      });
    },
    [treeState, formatData, setTreeData, timeStamp],
  );

  // 根据当前 type 获取树的根节点
  const getTreeRoot = useCallback(
    (type: string) => {
      setLoading(true);
      // 清空之前的树内容
      setTreeData([]);
      fetchTreeNodes(
        { nodeType: null, orgId: null, key: null, id: null, pos: '0' },
        type,
      )
        .then(() => {
          // 如果只有一个根节点，则默认获取其子节点
          if (
            cachedDataSource.current.length === 1 &&
            cachedDataSource.current[0].isLeaf !== true
          ) {
            // tslint:disable-next-line: no-floating-promises
            fetchTreeNodes(
              {
                ...cachedDataSource.current[0],
                pos: '0-0',
              },
              type,
            ).then(() => {
              setLoading(false);
              setTreeData(cachedDataSource.current);
            });
          } else {
            setLoading(false);
            setTreeData(cachedDataSource.current);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    },
    [treeState, setLoading, formatData, fetchTreeNodes, setTreeData],
  );

  // 获取用户人数
  const getUserCount = (selectCountRequestList: any) => {
    const { basePath, requestParams } = treeState;
    // tslint:disable-next-line: no-floating-promises
    net
      .request(`/${basePath}/selectCompents/getUserCount`, {
        method: 'POST',
        data: {
          corpId: requestParams.corpId,
          selectCountRequestList,
        },
      })
      .then((res) => {
        const data = res.data.dataSource;
        const count = {
          orgCount: 0,
          deptCount: 0,
          tagCount: 0,
          groupCount: 0,
        };

        for (const item of data) {
          switch (item.type) {
            case 'DEPT':
              count.deptCount = item.userCount;
              break;
            case 'ORG':
              count.orgCount = item.userCount;
              break;
            case 'GROUP':
              count.groupCount = item.userCount;
              break;
            case 'TAG':
              count.tagCount = item.userCount;
              break;
          }
        }
        setUserCount(count);
      });
  };

  // 用于设置各个infoList中的数据
  const setSelectedData = (selectData: any) => {
    setTreeState((treeState) => {
      return {
        ...treeState,
        ...selectData,
      };
    });
  };

  // 请求获取搜索结果
  const getSearchResult = (params: any) => {
    const { basePath } = treeState;
    setLoading(true);
    // tslint:disable-next-line: no-floating-promises
    net
      .request(`/${basePath}/selectCompents/search`, {
        method: 'POST',
        data: params,
      })
      .then((res) => {
        setLoading(false);
        const data = res.data.dataSource;
        setSearchResult(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // 更新选中节点
  const updateCheckedNode = (node: ItreeItem, key: string) => {
    const { checkedKeys } = treeState;
    const keyIndex = checkedKeys.indexOf(key);
    const nextTreeState = { ...treeState };
    // 更新node节点选中状态
    const updateNode = (node: ItreeItem): boolean => {
      const [list, listKey] = getListByType(node.type);
      let nextList = [];
      const nodeIndex = list.findIndex((item: ItreeItem) => {
        return item.id === node.id;
      });

      // 如果节点未选中则选中
      if (nodeIndex === -1) {
        nextList = list.concat({ ...node });
      } else {
        // 否则取消选中
        nextList = list.slice(0, nodeIndex).concat(list.slice(nodeIndex + 1));
      }
      // @ts-ignore
      nextTreeState[listKey] = nextList;
      return nextList.length > list.length;
    };

    let result = false;

    // 如果key不在被选中的数组中，则添加
    const _nextCheckedKeys =
      keyIndex === -1
        ? [...checkedKeys, key]
        : [
            ...checkedKeys.slice(0, keyIndex),
            ...checkedKeys.slice(keyIndex + 1),
          ];
    result = updateNode(node);

    setTreeState({ ...nextTreeState, checkedKeys: _nextCheckedKeys });
    return result;
  };

  /**
   * 取消传入的keys的选中状态
   * @param keys 要取消选中的keys
   * @param type 根据type直接从对应的list中删除，未传则去部门，组织，人员，标签，分组列表中遍历删除
   */
  const delKeys = (keys: string[], type?: NodeType) => {
    let {checkedKeys} = treeState;

    let nextTreeState = { ...treeState };

    for (const key of keys) {
      const keyIndex = checkedKeys.indexOf(key);
      if (keyIndex !== -1) {
        checkedKeys = checkedKeys
          .slice(0, keyIndex)
          .concat(checkedKeys.slice(keyIndex + 1));
      }
      // 如果传入了type，则直接从type对应的list中删除
      if (type) {
        const [list, listKey] = getListByType(type, nextTreeState);
        const keyIndex = list.findIndex((item: ItreeItem) => {
          return item.id === key;
        });

        nextTreeState = {
          ...nextTreeState,
          [listKey]: list.slice(0, keyIndex).concat(list.slice(keyIndex + 1)),
        };
      } else {
        // 没传type就只能一个一个找着删了
        [
          'deptInfoList',
          'orgInfoList',
          'userInfoList',
          'tagInfoList',
          'groupInfoList',
        ].some((listKey) => {
          // @ts-ignore
          const infoList: ItreeItem[] = nextTreeState[listKey];
          const nextInfoList = infoList.filter(({ id }) => id !== key);
          if (nextInfoList.length !== infoList.length) {
            // @ts-ignore
            nextTreeState[listKey] = nextInfoList;
          }
        });
      }
    }
    setTreeState({ ...nextTreeState, checkedKeys });
  };

  // 清除所有所选项
  const clear = () => {
    treeState.checkedKeys = [];
    // treeState.checkedKeys.length = 0;
    treeState.deptInfoList = [];
    treeState.orgInfoList = [];
    treeState.userInfoList = [];
    treeState.tagInfoList = [];
    treeState.groupInfoList = [];
    treeState.userCount = {
      orgCount: 0,
      deptCount: 0,
      tagCount: 0,
      groupCount: 0,
    };

    setTreeState({
      ...treeState,
    });
  };

  // 设置人员数量
  const setUserCount = (userCount: any) => {
    setTreeState((treeState) => {
      return {
        ...treeState,
        userCount,
      };
    });
  };

  /**
   * 请求后重新计算用户人数
   * @param item 操作的节点
   * @param checked 节点被选中还是删除判断
   * @param isRequest 是否需要请求获取人数
   */
  const resetUserCount = (
    item: ItreeItem,
    checked: boolean,
    isRequest = true,
  ) => {
    const { userCount, basePath, requestParams } = treeState;

    const selectCountRequestList: any = [];

    const selectNodeList = [{ contactType: item.contactType, id: item.id }];

    selectCountRequestList.push({ selectNodeList, type: item.type });

    // 如果需要请求获取人数，则请求
    if (isRequest) {
      // tslint:disable-next-line: no-floating-promises
      net
        .request(`/${basePath}/selectCompents/getUserCount`, {
          method: 'POST',
          data: {
            corpId: requestParams.corpId,
            selectCountRequestList,
          },
        })
        .then((res) => {
          const data = res.data.dataSource;

          for (const item of data) {
            switch (item.type) {
              case 'DEPT':
                userCount.deptCount = checked
                  ? userCount.deptCount + item.userCount
                  : userCount.deptCount - item.userCount;
                break;
              case 'ORG':
                userCount.orgCount = checked
                  ? userCount.orgCount + item.userCount
                  : userCount.orgCount - item.userCount;
                break;
              case 'TAG':
                userCount.tagCount = checked
                  ? userCount.tagCount + item.userCount
                  : userCount.tagCount - item.userCount;
                break;
              case 'GROUP':
                userCount.groupCount = checked
                  ? userCount.groupCount + item.userCount
                  : userCount.groupCount - item.userCount;
                break;
            }
          }
          setUserCount(userCount);
        });
    } else {
      switch (item.type) {
        case 'DEPT':
          userCount.deptCount = checked
            ? userCount.deptCount + 1
            : userCount.deptCount - 1;
          break;
        case 'ORG':
          userCount.orgCount = checked
            ? userCount.orgCount + 1
            : userCount.orgCount - 1;
          break;
        case 'TAG':
          userCount.tagCount = checked
            ? userCount.tagCount + 1
            : userCount.tagCount - 1;
          break;
        case 'GROUP':
          userCount.groupCount = checked
            ? userCount.groupCount + 1
            : userCount.groupCount - 1;
          break;
        default:
          break;
      }

      setUserCount(userCount);
    }
  };

  useDefaultValue(staticProps, {
    setUserCount,
    getUserCount,
    setSelectedData,
  });

  const handleOk = useCallback(() => {
    let {
      deptInfoList,
      orgInfoList,
      userInfoList,
      groupInfoList,
      tagInfoList,
      isSaveSelectSignature,
      selectSignature,
      basePath,
      onOk,
    } = treeState;
    /**
     * 保存快照参数格式化，主要是为了把之前组装的key还原
     * @param list 存储在treeState中的各种list
     */
    const formatParam = (list: IlistItem[]) => {
      const finalList: any[] = [];
      for (const item of list) {
        const obj: any = {};

        obj.id = item.id;
        obj.name = item.name;

        if (item.orgId) {
          obj.orgId = item.orgId;
        }

        if (item.orgName) {
          obj.orgName = item.orgName;
        }

        if (item.contactType) {
          obj.contactType = item.contactType;
        }

        finalList.push(obj);
      }
      return finalList;
    };

    // 如果是 strictUser，则需要将用户 id 从 userId&deptId 中拆出来
    if (treeState.requestParams?.strictUser) {
      userInfoList = userInfoList.map((userInfo) => ({
        ...userInfo,
        id: userInfo.id.split('&')[0],
      }));
    }
    // 保存参数
    const params: IsaveResultParams = {
      deptInfoList: formatParam(deptInfoList),
      orgInfoList: formatParam(orgInfoList),
      userInfoList: formatParam(userInfoList),
      groupInfoList: formatParam(groupInfoList),
      tagInfoList: formatParam(tagInfoList),
      id: null,
    };

    // 如果不需要保存快照，则直接返回结果
    if (!isSaveSelectSignature) {
      onOk({
        deptInfoList: params.deptInfoList,
        userInfoList: params.userInfoList,
        tagInfoList: params.tagInfoList,
        orgInfoList: params.orgInfoList,
        groupInfoList: params.groupInfoList,
      });
      return;
    }

    // 如果有selectSignature字端，则是更新，把原来的selectSignature作为id传回服务端
    if (selectSignature) {
      params.id = selectSignature;
    }

    // tslint:disable-next-line: no-floating-promises
    net
      .request(`/${basePath}/selectCompents/saveResult`, {
        method: 'POST',
        data: params,
      })
      .then((result) => {
        onOk({
          selectSignature: result.data,
          deptInfoList: params.deptInfoList,
          userInfoList: params.userInfoList,
          tagInfoList: params.tagInfoList,
          orgInfoList: params.orgInfoList,
          groupInfoList: params.groupInfoList,
        });
      });
  }, [treeState]);

  return {
    loading,
    treeState,
    setSelectedData,
    updateCheckedNode,
    delKeys,
    clear,
    setUserCount,
    resetUserCount,
    getTreeRoot,
    getSearchResult,
    loadData,
    getUserCount,
    handleOk,
  };
};

export default useTree;
