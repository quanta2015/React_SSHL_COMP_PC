// compose manage component
// @author Pluto <huarse@gmail.com>
// @create 2020/06/21 20:58

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Tooltip } from 'antd';
// import { QuestionCircleFilled } from '@ant-design/icons';
import { QueryFilterProps } from '@ant-design/pro-form';
import { QueryFilter } from '@ant-design/pro-form';

import { logger } from '@irim/saber';
import ActionButton from '../button';
import { Request } from '../interface';
import useRequest from '@/common/use-request';
import get from 'lodash/get';
// @ts-ignore
import Table from '@/components/table';
import FilterItem from './filter-item';
import NoticeSection from './notice-section';
import { PropTypes } from './interface';
import { ColumnItemProps } from './interface';
import Sort from './sort';
import moment from 'dayjs';
import './index.less';
import { Store } from 'antd/lib/form/interface';
import { BaseFormProps } from '@ant-design/pro-form/lib/BaseForm';

export default function ComposeManage({
  alertProps,
  dataRequest,
  dataFormatter,
  filterProps,
  filterSpan = null,
  synchValues = null,
  tableProps,
  sortProps = null,
  removeResetButton = false,
  filterClassName = 'ss-query-filter',
  tooltip,
  buttonList = [],
  onSearchChange,
  onRequestSuccess,
  onEmit,
}: PropTypes) {
  // 定义Table的数据源
  const [tableSource, setTableSource] = useState([]);
  const [sortTable, setSortTable] = useState(null);
  // 定义pageSize
  const [pageSize, setPageSize] = useState(
    get(tableProps, 'pagination.pageSize', 20),
  );
  // 当前页码
  const [pageNo, setPageNo] = useState(1);
  // 总数据条数
  const [total, setTotal] = useState(0);
  // 查询条件
  const [search, setSearch] = useState<any>(null);
  // Table组件的checkbox的选择值集合
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [t, setT] = useState(Date.now());
  // const [filterForm] = Form.useForm();
  // Table组件是否需要分页
  const hasPage = tableProps?.pagination !== false;
  // 使用lodash.get从dataRequest读取method属性，如果读不到，默认使用'GET'
  const method = get(dataRequest, ['method'], 'GET');
  // 请求
  const [, loading] = useRequest(
    dataRequest,
    {
      data: {
        // 如果是 get 请求，平铺 search
        ...(method.toUpperCase() === 'GET' ? search || {} : { search }),
        pageNo,
        pageSize,
      },
      showError: true,
      _t: t,
    },
    dataFormatter,
    (data) => {
      // 从 data 中得到 dataSource 数据

      const nextDataSource = get(data, 'dataSource', []);
      // if (!data) return;
      setTableSource(nextDataSource);
      setSelectedRowKeys([]);
      setTotal(data?.pagination?.total || nextDataSource?.length || 0);
      onRequestSuccess && onRequestSuccess(data);
      // 兼容边界条件：如果删除了某一页的唯一一行，则将分页切回上一页
      if (pageNo > 1 && nextDataSource?.length === 0) {
        setPageNo(pageNo - 1);
        setT(Date.now());
      }
    },
  );

  if (sortProps && sortProps?.sortRequest) {
    useRequest(
      sortProps?.sortRequest,
      {
        data: {
          // 如果是 get 请求，平铺 search
          ...(method.toUpperCase() === 'GET' ? search || {} : { search }),
          pageNo,
          pageSize,
        },
        showError: true,
        _t: t,
      },
      dataFormatter,
      (data) => {
        // 从 data 中得到 dataSource 数据

        const nextDataSource = get(data, 'dataSource', []);
        // if (!data) return;
        setSortTable(nextDataSource);
      },
    );
  }

  useEffect(() => {
    onSearchChange && onSearchChange(search);
  }, [onSearchChange, search]);

  // 执行分页的逻辑;
  const handlePageChange = (nextPage: number, pageSize: number) => {
    setPageNo(nextPage);
    setPageSize(pageSize);
  };
  // 执行查询的逻辑
  // const handleSearch = useCallback(() => {
  //   setPageNo(1);
  //   setSearch(filterForm.getFieldsValue());
  // }, []);

  // 执行查询的逻辑;
  const handleSearch = (values: Store = {}) => {
    filterProps?.map((item) => {
      if (item.type === 'datepicker') {
        values[item.name] = values[item.name]
          ? moment(values[item.name]).format(item.props._format)
          : '';
      }
      if (item.type === 'dateTimeRangePicker') {
        console.log(values[item.name], 'xxx');
        if (values[item.name]) {
          values[item.name] = [
            moment(values[item.name][0]).format(item.props.format),
            moment(values[item.name][1]).format(item.props.format),
          ];
        }
        // values[item.name] = values[item.name]
        //   ? [
        //       moment(values[item.name][0]).format(item.props.format),
        //       moment(values[item.name][1]).format(item.props.format),
        //     ]
        //   : '';
      }
    });
    setPageNo(1);
    // 判断是需要同步
    if (synchValues) {
      setSearch({ ...values, ...search });
    } else {
      setSearch(values);
    }

    return Promise.resolve();
  };

  const handleReset = (values: Store = {}) => {
    filterProps?.map((item) => {
      if (item.type === 'datepicker') {
        values[item.name] = values[item.name]
          ? moment(values[item.name]).format(item.props._format)
          : '';
      }
    });
    setPageNo(1);
    setSearch(values);
    return Promise.resolve();
  };

  // 批量操作;
  const handleRequestButtonSuccess = useCallback(() => {
    // message.success('操作成功！');
    setT(Date.now()); // 触发列表更新
  }, []);

  // 表格事件
  const handleTableEmit = useCallback(
    (eventType: string, record: any, response: any) => {
      logger.debug(`handleTableEmit: ${eventType}`, record, response);

      onEmit && onEmit(eventType, record, response);

      if (eventType === 'refreshTableData') {
        setT(Date.now());
      }
    },
    [],
  );
  // Table组件checkbox的props;
  let rowSelectionProps = {};
  const primaryKey = tableProps?.primaryKey || 'id';
  if (tableProps?.checkable || tableProps?.rowSelection) {
    rowSelectionProps = {
      checkable: true,
      rowSelection: tableProps.rowSelection || {},
      selectedRowKeys,
      primaryKey,
      onSelectChange: (keys: any[]) => setSelectedRowKeys(keys),
    };
  }
  // Table组件pagination的props;
  const tablePagination =
    tableProps?.pagination === false
      ? false
      : {
          className: 'cf-compose-manage-pagination',
          ...(tableProps?.pagination as any),
          total,
          size: 'default',
          current: pageNo,
          pageSize,
          pageSizeOptions: ['20', '50', '100', '200'],
          showSizeChanger: total - 20 >= 0,
          showQuickJumper: true,
          showTotal() {
            return `共 ${total} 条记录 第 ${pageNo}/${Math.ceil(
              total / pageSize,
            )} 页`;
          },
        };
  // 使用useMemo缓存选中的table行值;
  const selectedRowList = useMemo(() => {
    // 当primaryKey为函数时，列表勾选的key也要通过该函数转换才能取到正确值
    return selectedRowKeys.map((rowId) =>
      tableSource.find(
        (rowData) =>
          (typeof primaryKey === 'function'
            ? primaryKey(rowData)
            : rowData[primaryKey]) === rowId,
      ),
    );
  }, [selectedRowKeys]);

  const formProps: QueryFilterProps & BaseFormProps = {
    colon: true,
    defaultCollapsed: true,

    // layout: 'vertical',
    dateFormatter: false,
    className: filterClassName,
    onFinish: handleSearch,
    onReset: handleReset,
    // labelWidth: 'auto',
    submitter: {
      resetButtonProps: {
        style: {
          // 隐藏重置按钮
          display: removeResetButton ? 'none' : 'block',
        },
      },
    },
  };

  return (
    <div className="ss-compose-manage-container">
      <NoticeSection
        alertProps={alertProps}
        onRefresh={() => {
          setT(Date.now());
        }}
      />
      {filterProps?.length > 0 && (
        <QueryFilter {...formProps} span={filterSpan}>
          {filterProps?.map((f) => (
            <FilterItem key={f.name} {...f} />
          ))}
        </QueryFilter>
      )}

      <section className="section-caption">
        <div className="caption-left-side">
          {buttonList.map((btnProps, index) => {
            let {
              uiType,
              request,
              isBatch,
              buttonProps,
              onSuccess,
              qrBeforeClick = false,
              confirmBeforeClick,
              ...others
            } = btnProps;

            if (
              // (uiType === 'request' && isBatch !== false) ||
              // isBatch === true
              request
            ) {
              buttonProps = {
                ...(buttonProps || {}),
                disabled: isBatch
                  ? !selectedRowKeys.length
                  : buttonProps?.disabled,
              };
              request = {
                ...(request || {}),
                // tableSource,
                params:
                  uiType === 'download'
                    ? {
                        //uiType为download 接口追加搜索字段值
                        ...(request?.params || {}),
                        search: {
                          ...search,
                        },
                        idList: selectedRowKeys,
                      }
                    : {
                        ...(request?.params || {}),
                        idList: selectedRowKeys,
                        // rowList: selectedRowList || [],
                      },
              } as Request;

              // confirm 的占位
              let nextConfirmBeforeClick = confirmBeforeClick;
              if (confirmBeforeClick) {
                const {
                  renderClassName,
                  renderContent,
                  className,
                  content,
                  ...otherConfirmClick
                } = confirmBeforeClick;

                nextConfirmBeforeClick = {
                  className:
                    typeof renderContent === 'function'
                      ? renderClassName(request?.params)
                      : className,
                  content:
                    typeof renderContent === 'function'
                      ? renderContent(request?.params)
                      : content,
                  ...otherConfirmClick,
                };
              }

              return (
                <ActionButton
                  uiType={uiType}
                  key={index}
                  request={request}
                  onSuccess={(...args: any) => {
                    onSuccess && onSuccess(...args);
                    handleRequestButtonSuccess();
                  }}
                  qrBeforeClick={qrBeforeClick}
                  isBatch={isBatch}
                  buttonProps={buttonProps}
                  confirmBeforeClick={nextConfirmBeforeClick}
                  {...others}
                />
              );
            }
            return (
              <ActionButton
                key={index}
                {...btnProps}
                qrBeforeClick={qrBeforeClick}
                isBatch={isBatch}
                onSuccess={(...args: any) => {
                  onSuccess && onSuccess(...args);
                  handleRequestButtonSuccess();
                }}
              />
            );
          })}
          {sortProps ? (
            <Sort
              {...sortProps}
              primaryKey={primaryKey}
              dataSource={sortTable || tableSource}
              tableProps={tableProps}
              onRefresh={handleRequestButtonSuccess}
            />
          ) : null}
          {tooltip ? (
            <Tooltip title={tooltip.title}>
              <span className="caption-tooltip">
                {/* <QuestionCircleFilled /> {tooltip.text} */}
              </span>
            </Tooltip>
          ) : null}
        </div>
      </section>

      <Table
        {...tableProps}
        loading={loading}
        pagination={tablePagination}
        onPageChange={handlePageChange}
        onShowSizeChange={handlePageChange}
        {...rowSelectionProps}
        onEmit={handleTableEmit}
        comsMap={tableProps?.comsMap}
        primaryKey={tableProps?.primaryKey}
        hasBorder={tableProps?.hasBorder}
        columns={tableProps?.columns}
        dataSource={tableSource}
      />
    </div>
  );
}

export { ColumnItemProps, PropTypes };
