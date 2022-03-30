import React, { useCallback, useMemo, Suspense } from 'react';
import { Table, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import Spin from '../loading';
import defaultComsMap, { UnSupport } from './coms-map';
import { TableCellProps, PropTypes, ColumnItemProps } from './interface';
import './index.less';

// import React, { Suspense } from 'react';
// import { PropTypes } from './interface';
// import Button from './default';
// import { Spin, Empty } from '@/components/blank';

const cellRenderer = ({
  comsMap,
  uiType,
  tableDataSource,
  name,
  props = {},
  onEmit,
  otherKey,
  primaryKey = 'id',
}: PropTypes &
  ColumnItemProps & {
    tableDataSource: any[];
    onEmit: (
      eventName: string,
      index?: number,
      record?: any,
      ...args: any[]
    ) => void;
  }) => {
  const Com = comsMap[uiType] || defaultComsMap[uiType] || UnSupport;

  return (value: any, record: any, index: any) => {
    return (
      <Suspense fallback={<div>2</div>}>
        <Com
          className={classNames(`cf-table-col-${uiType}`, props.cellClassName)}
          {...props}
          value={value}
          tableProps={{
            primaryKey,
            otherKey,
            onEmit: (eventName: any, ...args: any) => {
              onEmit(`${name  }.${  eventName}`, index, record, ...args);
            },
            onTableEmit: (eventName: any, ...args: any) => {
              onEmit(eventName, ...args);
            },
            tableDataSource,
            uiType,
            index,
            record,
            name,
          }}
        />
      </Suspense>
    );
  };
};

export default function CFTable({
  columns,
  dataSource,
  cellClassName,
  comsMap,
  checkable,
  selectedRowKeys,
  onSelectChange,
  primaryKey,
  otherKey,
  onPageChange,
  onEmit,
  scroll,
  size = 'small',
  fixFirstColumn = true,
  fixLastColumn = true,
  ...others
}: PropTypes & {
  onPageChange: (current: any, size: any) => void;
  onEmit: () => void;
  onSelectChange: (keys: any[], rows: any[]) => void;
  selectedRowKeys: any[];
}) {
  // console.log(dataSource, 'dataSource');
  const renderColumn = (
    {
      name,
      label,
      width,
      uiType,
      props,
      cell,
      render,
      help,
      fixed,
      ...others
    }: ColumnItemProps,
    colIndex: number,
    primaryKey: any,
  ) => {
    if (typeof cell !== 'function' && typeof render !== 'function') {
      cell = cellRenderer({
        comsMap,
        uiType: uiType || 'text',
        name,
        props,
        onEmit,
        primaryKey,
        otherKey,
        tableDataSource: dataSource,
      });
    }
    let _fixed = fixed;
    // 如果列数大于 2，则根据配置锁定第一列和最后一列
    if (!_fixed && columns.length > 2) {
      if (fixFirstColumn && colIndex === 0) {
        _fixed = 'left';
      }
      if (fixLastColumn && colIndex === columns.length - 1) {
        _fixed = fixed === 'nofixed' ? false : 'right';
      }
    }
    // 如果数据源为空，则取消 fixed，不然 antd 的 table 的「数据为空」的展示会异常
    if (!dataSource || !dataSource.length) {
      _fixed = undefined;
    }

    return (
      <Table.Column
        {...others}
        dataIndex={name}
        key={name}
        title={
          <span>
            {label || name}
            {help ? (
              <Tooltip
                className="cf-table-header-help"
                placement="top"
                title={help}
              >
                <QuestionCircleOutlined />
              </Tooltip>
            ) : null}
          </span>
        }
        fixed={_fixed}
        width={width || ''}
        render={cell || render}
        className={classNames('cf-table-cell', {
          '_padding-right-30': !!others._paddingR30,
        })}
      />
    );
  };

  const renderLoading = useCallback((props: any) => {
    return <Spin delay={500} {...props} />;
  }, []);

  let { rowSelection = {}, pagination = {} } = others;
  if (pagination) {
    pagination.onChange = (pageNo: number, pageSize: number) => {
      onPageChange && onPageChange(pageNo, pageSize);
    };
    pagination.onShowSizeChange = (current: number, size: number) => {
      onPageChange && onPageChange(current, size);
    };
  }
  if (!checkable) {
    rowSelection = null;
  } else {
    rowSelection = {
      ...rowSelection,
      selectedRowKeys: selectedRowKeys || rowSelection.selectedRowKeys,
      onChange(nextSelectedRowKeys: any[], nextSelectedRows: any[]) {
        onSelectChange && onSelectChange(nextSelectedRowKeys, nextSelectedRows);
      },
    };
  }
  const _scroll = useMemo(() => {
    if (columns.length > 5 && columns.length <= 8) {
      return { x: 1000 };
    } else if (columns.length > 8 && columns.length <= 11) {
      return { x: 1300 };
    } else if (columns.length > 11 && columns.length <= 13) {
      return { x: 1600 };
    } else if (columns.length > 13) {
      return { x: 2000 };
    } else if (columns.length <= 5) {
      return { x: 800 };
    }
  }, [columns]);
  return (
    <Table
      scroll={scroll || _scroll}
      dataSource={dataSource}
      loadingComponent={renderLoading}
      rowKey={primaryKey}
      size={size}
      {...others}
      pagination={pagination}
      rowSelection={rowSelection}
    >
      {columns.map(renderColumn)}
    </Table>
  );
}

CFTable.defaultProps = {
  dataSource: [],
  hasBorder: false,
  cellClassName: '',
  comsMap: {},
};

export { TableCellProps, PropTypes, ColumnItemProps };
