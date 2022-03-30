import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { ExtendedNode, IconType } from '../interface';
import iconMap from '@/components/tree-node-icon';
// import { Tooltip } from 'antd';
import '../index.less';

type TreeDataSourceWithIconType = (ExtendedNode & {
  iconType?: IconType;
  label?: string;
})[];
type IGenerateDataSource = (
  data: TreeDataSourceWithIconType,
  search: string,
  rootIconType?: IconType,
) => ExtendedNode[];
export default (
  dataSource: TreeDataSourceWithIconType,
  searchText: string,
  rootIconType?: IconType,
) => {
  const [treeData, setTreeData] = useState([]);

  const getNodeIcon = useCallback(
    (iconType: IconType) => {
      return iconMap[iconType];
    },
    [iconMap],
  );
  const generateDataSource: IGenerateDataSource = useCallback(
    (data, search, rootIcon) => {
      if (!data) return undefined;
      return data.map(
        ({
          iconType,
          label = '',
          orgName,
          position,
          children,
          deptNames,
          ...itemProps
        }) => {
          let $nodeIcon = null;
          if (iconType) {
            const NodeIcon = getNodeIcon(iconType);
            $nodeIcon = <NodeIcon />;
          }
          let $title: React.ReactNode = label;
          const matchedIndex = search ? label.indexOf(search) : -1;
          if (rootIcon) {
            const NodeIcon = getNodeIcon(rootIcon);
            $nodeIcon = <NodeIcon />;
          }
          if (matchedIndex >= 0) {
            // 命中了搜索文案，显示高亮内容
            $title = (
              <>
                <span key="before">{label.slice(0, matchedIndex)}</span>
                <span key="keyword" className="highlight">
                  {search}
                </span>
                <span key="after">
                  {label.slice(matchedIndex + search.length)}
                </span>
              </>
            );
          }
          return {
            ...itemProps,
            iconType,
            title: (
              // <Tooltip placement="topLeft" title={label}>
              <div className="treeNode" title={label}>
                {$nodeIcon}
                <div className="nodeContent">
                  <div className="titleWrapper">
                    <div
                      className={classNames('title', {
                        // 搜索出来的文案换行，普通节点超长省略
                        noWrap: !searchText,
                        wrap: !!searchText,
                      })}
                    >
                      {$title}
                    </div>
                    {position ? (
                      <div className="position">({position})</div>
                    ) : null}
                  </div>
                  <p className="orgName">
                    {orgName}
                    {(deptNames || []).join(', ')}
                  </p>
                </div>
              </div>
              // </Tooltip>
            ),
            // 渲染子节点，这里不透传 rootIcon，因为该配置只作用于根节点
            children: generateDataSource(children, search),
          };
        },
      );
    },
    [iconMap, searchText],
  );

  useEffect(() => {
    // 非搜索场景下，如果传入 rootIconType，则特殊处理根节点 icon
    setTreeData(
      generateDataSource(
        dataSource,
        searchText,
        searchText ? null : rootIconType,
      ),
    );
  }, [dataSource, searchText, rootIconType]);
  return [treeData];
};
