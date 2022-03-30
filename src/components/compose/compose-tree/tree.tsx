import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useContext,
} from 'react';
import { Spin, Input, Tree } from 'antd';
import { debounce } from 'lodash';
import net from '@/services/index';
import { ComposeTreeContext } from './hooks/use-compose-tree';
import UserTree from './user-tree';
import useTreeData from './hooks/use-tree-data';
import {
  TreeProps as PropTypes,
  SelectedDataNode,
  TreeNodeKey,
} from './interface';
import { getUid } from './utils';

import './index.less';

export const nameMap = {
  org: '组织',
  dept: '部门',
  group: '分组',
  tag: '标签',
  permission: '权限',
  village: '权限',
  building: '部门',
  cell: '部门',
  user: '人员',
  house: '房屋',
};

const { Search } = Input;

function CFTree({
  request: { searchTreeNodes },
  onSelect,
  onUserSelect,
  permissionCode,
  searchProps,
  userType = 'employee',
  rootIconType,
  selfNameMap,
  ...others
}: PropTypes) {
  const {
    expandedKeys,
    dataSource,
    treePaths,
    setIsSearch,
    setExpandedKeys,
    loadData,
  } = useContext(ComposeTreeContext);
  const [selectedKeys, setSelectedKeys] = useState([]);
  // 渲染树的数据
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const requestIds = useRef({ search: 0 });
  const partialDataSource = useMemo(
    () => (searchText ? searchResult : dataSource),
    [searchText, searchResult, dataSource],
  );
  const treeWrapper = useRef<HTMLDivElement>();
  const [treeData] = useTreeData(partialDataSource, searchText, rootIconType);
  // const [height, setHeight] = useState(0);
  const [minWidth, setMinWidth] = useState(0);

  useEffect(() => {
    if (searchText) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  }, [searchText]);
  // useEffect(() => {
  //   updateHeight();
  // }, [treeWrapper.current?.offsetHeight]);
  // const updateHeight = useCallback(() => {
  //   if (treeWrapper.current?.offsetHeight !== height) {
  //     setHeight(treeWrapper.current?.offsetHeight);
  //   }
  // }, [height, treeWrapper, setHeight]);

  useEffect(() => {
    updateMinWidth();
  }, [
    treeWrapper.current?.scrollWidth,
    searchText,
    userList.length,
    treeData.length,
  ]);

  const updateMinWidth = useCallback(() => {
    if (searchText && userList.length + treeData.length === 0) {
      setMinWidth(259);
    } else if (treeWrapper.current?.scrollWidth !== minWidth) {
      setMinWidth(treeWrapper.current?.scrollWidth);
    }
  }, [
    minWidth,
    treeWrapper,
    setMinWidth,
    searchText,
    userList.length,
    treeData.length,
  ]);

  // useEffect(() => {
  //   window.addEventListener('resize', updateHeight);
  //   return () => {
  //     window.removeEventListener('resize', updateHeight);
  //   };
  // }, [updateHeight, window]);

  // 搜索
  const search = useCallback(
    (value: string, requestId: number) => {
      // 丢掉旧的请求
      // 如果输入的内容为纯空格，则不发送请求
      if (requestIds.current.search !== requestId || !value.trim()) {
        return;
      }
      const { url, method, params = {} } = searchTreeNodes;
      setLoading(true);
      // 增量获取子树
      // tslint:disable-next-line: no-floating-promises
      net
        .request(url, {
          method,
          data: {
            ...params,
            keyword: value,
          },
          showError: true,
        })
        .then(({ data, ...others }) => {
          // 丢掉旧请求
          const { code } = others;
          // localStorage.setItem('request-code', code);
          if (requestIds.current.search !== requestId) {
            return;
          }

          setSearchResult(
            (data?.dataSource || []).map((item: any) => ({
              ...item,
              key: getUid(),
              id: item.key,
              label: item.labelPath || item.label,
              isLeaf: true,
            })),
          );
          setUserList(
            (data?.peopleList || []).map((item: any) => ({
              ...item,
              key: getUid(),
              id: item.key,
              iconType: item.iconType || 'user',
            })),
          );
          setSearchText(value);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    },
    [searchTreeNodes],
  );

  const debounced = useRef(debounce(search, 300, { leading: false }));

  const handleSearch = (e: any) => {
    // e.persist();
    const {
      target: { value },
    } = e;
    const requestId = requestIds.current.search + 1;
    requestIds.current.search = requestId;

    // 如果是清空搜索框，则恢复原来的树
    if (!value) {
      setSearchText(value);
      setSearchResult([]);
      setLoading(false);
      // setUseList([]);
      return;
    }
    debounced.current(value, requestId);
  };
  const handleSelect = (
    nextSelectedKeys: TreeNodeKey[],
    event: SelectedDataNode,
  ) => {
    // 点击展开收起
    const { key } = event.node;
    const matchedExpandIndex = expandedKeys.indexOf(key);
    // 禁止反选
    // if (event.selected) {
    //   setSelectedKeys(nextSelectedKeys);
    // }
    // setTimeout(() => {
    // 点击同一个项目
    if (nextSelectedKeys[0] === selectedKeys[0] && matchedExpandIndex >= 0) {
      setExpandedKeys([
        ...expandedKeys.slice(0, matchedExpandIndex),
        ...expandedKeys.slice(matchedExpandIndex + 1),
      ]);
    } else {
      setExpandedKeys(Array.from(new Set([...expandedKeys, key])));
    }
    // 禁止反选
    if (!event.selected) {
      return;
    }
    onSelect(nextSelectedKeys, event, partialDataSource);
    // }, 0);
  };

  const handleExpand = (nextExpandedKeys, event) => {
    if (event.expanded) {
      loadData(event.node);
    } else {
      setExpandedKeys(nextExpandedKeys);
    }
  };

  // 根据 selectedKeys 寻找选中的节点 key
  useEffect(() => {
    // 如果有搜索内容，则不更新高亮项
    if (searchText) return;
    if (!dataSource) {
      setSelectedKeys([]);
      return;
    }
    let traverser = dataSource;
    let activeKey;
    const max = treePaths.length;
    treePaths.every((id, index) => {
      if (!traverser) return false;
      const matchedItem = traverser.find((item) => item.id === id);
      // 没有找到目标节点，跳过
      if (!matchedItem) {
        return false;
      }
      if (index === max - 1) {
        activeKey = matchedItem.key;
      }
      traverser = matchedItem.children;
      return true;
    });
    setSelectedKeys(activeKey ? [activeKey] : []);
  }, [treePaths, dataSource, searchText]);

  const searchWrap = useMemo(() => {
    if (permissionCode === 30512) {
      return <p className="emptyText">权限不足</p>;
    }
    // 如果没有搜索结果，则提示文案
    if (searchText && userList.length + treeData.length === 0) {
      return <p className="emptyText">搜索结果为空，请调整搜索内容</p>;
    }

    if (searchText && userList.length > 0) {
      return (
        <UserTree
          dataSource={userList}
          searchText={searchText}
          userType={userType}
          selfNameMap={nameMap}
          onUserSelect={onUserSelect}
        />
      );
    }
    return (
      <Tree
        className={searchText ? 'removeIndent' : ''}
        onExpand={handleExpand}
        expandedKeys={expandedKeys}
        onSelect={handleSelect}
        blockNode
        // height={height}
        // loadData={loadData}
        treeData={treeData}
        selectedKeys={selectedKeys}
        {...others}
        checkable={false}
      />
    );
  }, [permissionCode, searchText, userList, treeData]);
  return (
    <div className="ss-biz-tree">
      <div className="biz-search-main">
        <Search
          // className="biz-tree-search"
          // shape="simple"
          allowClear
          {...searchProps}
          onChange={handleSearch}
        />
      </div>
      <div className="biz-tree-main" ref={treeWrapper}>
        <div style={{ width: minWidth }}>
          <Spin
            delay={500}
            // wrapperClassName="biz-tree-main"
            spinning={loading}
          >
            {permissionCode === 30512 && <p className="emptyText">权限不足</p>}
            {
              // 如果没有搜索结果，则提示文案
              permissionCode !== 30512 &&
              searchText &&
              userList.length + treeData.length === 0 ? (
                <p className="emptyText">搜索结果为空，请调整搜索内容</p>
              ) : null
            }
            {permissionCode !== 30512 && searchText && userList.length > 0 ? (
              <UserTree
                dataSource={userList}
                searchText={searchText}
                userType={userType}
                selfNameMap={nameMap}
                onUserSelect={onUserSelect}
              />
            ) : null}

            {/* {searchText && userList.length > 0 ? (
              <UserTree
                dataSource={userList}
                searchText={searchText}
                userType={userType}
                selfNameMap={selfNameMap}
              />
            ) : null} */}

            {permissionCode !== 30512 &&
            searchText &&
            treeData.length > 0 &&
            ((selfNameMap && selfNameMap[treeData[0]?.iconType]) ||
              nameMap[treeData[0]?.iconType]) ? (
                <div className="treeTitle">
                  {(selfNameMap && selfNameMap[treeData[0]?.iconType]) ||
                  nameMap[treeData[0].iconType]}
                </div>
            ) : null}
            {permissionCode !== 30512 && (
              <Tree
                className={searchText ? 'removeIndent' : ''}
                onExpand={handleExpand}
                expandedKeys={expandedKeys}
                onSelect={handleSelect}
                blockNode
                // height={height}
                // loadData={loadData}
                treeData={treeData}
                selectedKeys={selectedKeys}
                {...others}
                checkable={false}
              />
            )}

            {/* {searchText &&
            treeData.length > 0 &&
            ((selfNameMap && selfNameMap[treeData[0]?.iconType]) ||
              nameMap[treeData[0]?.iconType]) ? (
              <div className="treeTitle" style={{ border: '1px solid red' }}>
                {(selfNameMap && selfNameMap[treeData[0]?.iconType]) ||
                  nameMap[treeData[0].iconType]}
              </div>
            ) : null} */}

            {/* {searchWrap} */}

            {/* {searchText && treeData.length > 10 ? (
              <div className={styles.treeFooter}>
                仅展示前 10 个搜索结果，请输入更精确的搜索内容
              </div>
            ) : null} */}
          </Spin>
        </div>
      </div>
    </div>
  );
}

export default CFTree;

export { PropTypes, ComposeTreeContext };
