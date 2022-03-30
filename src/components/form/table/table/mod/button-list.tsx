import { mapProps } from 'recompose';
import get from 'lodash/get';
import { ButtonList, PropTypes as ButtonProps } from '@/components/button';
import { TableCellProps } from '../interface';

export interface TableButtonListPropTypes {
  dataSource: Array<
    {
      refreshAfterRequest?: boolean;
      disabled: boolean | { (tableCellProps: TableCellProps): boolean };
    } & ButtonProps
  >;
}

export type PropTypes = TableButtonListPropTypes & TableCellProps;

// 装配单元格
const withTableButtonFeatures = mapProps(
  ({
    dataSource,
    tableProps,
    value,
    // onError,
    ...others
  }: PropTypes) => {
    // eslint-disable-next-line @typescript-eslint/unbound-method

    const { primaryKey, onTableEmit, index, record, otherKey } = tableProps;

    const primaryValue = record[primaryKey];
    const otherValue = record[otherKey];

    // 替换文案中的占位符
    const replacePlaceholder = (originText = '') => {
      if (typeof originText === 'function') {
        return originText(tableProps);
      }

      return originText.replace(/\$\{([\w.]+)\}/g, (matched, $1) => {
        switch ($1) {
          case otherKey:
            return otherValue;
          // ${id} 替换为主键值
          case 'id':
            return primaryValue;
          // ${value} 替换为单元格的值
          case 'value':
            return value;
          // ${value} 替换为单元格的值
          case 'index':
            return index;
          // case otherKey:
          //   return otherValue;
          default:
            return get(tableProps, $1, matched);
        }
      });
    };
    const nextDataSource = dataSource.map(
      ({
        refreshAfterRequest,
        to,
        confirmBeforeClick,
        request,
        formProps,
        onSuccess,
        uiType,
        batchProps,
        buttonProps,
        disabledKey,
        disabledValue,
        disabledExpress,
        ...btnProps
      }) => {
        // 抛出事件，触发 manage 页面刷新
        let nextOnSuccess = onSuccess;
        if (refreshAfterRequest) {
          nextOnSuccess = (result: any) => {
            onTableEmit('refreshTableData', result);
            onSuccess && onSuccess(result);
          };
        }
        // confirm 的占位
        let nextConfirmBeforeClick = confirmBeforeClick;
        if (confirmBeforeClick) {
          const {
            renderClassName,
            renderContent,
            className,
            title,
            content,
            ...others
          } = confirmBeforeClick;

          nextConfirmBeforeClick = {
            className:
              typeof renderContent === 'function'
                ? renderClassName(tableProps)
                : className,
            title: replacePlaceholder(title),
            content:
              typeof renderContent === 'function'
                ? renderContent(tableProps)
                : typeof content === 'string'
                ? replacePlaceholder(content)
                : content,
            ...others,
          };
        }

        // 装配请求参数，替换 url 中的 ${id}，在 params 中装配 id 和 idList
        function produceRequest(reqConfig) {
          if (!reqConfig) return reqConfig;
          const { url, params, idName = 'id', ...otherReqConfig } = reqConfig;

          // 注入的请求参数
          const data = {
            // 主键
            [idName]: otherValue || primaryValue,
            // [otherKey]: otherValue,
            // 行内容
            rowData: record,
            // ceshi: 'xx',
            // 兼容单个操作和批量操作走同一接口的场景
            idList: [otherValue || primaryValue],
            ...(params || {}),
          };
          return {
            ...otherReqConfig,
            url: replacePlaceholder(url),
            params: data,
            // formatter: () => reqConfig.formatter && reqConfig.formatter(record)
          };
        }

        function disabled() {
          if (typeof disabledValue === 'object') {
            return disabledValue.indexOf(record[disabledKey]) > -1;
          }

          // if (disabledExpress) {
          //   // record[disabledKey];
          //   // console.log(disabledKey, record[disabledKey]);
          //   var orgId = record[disabledKey];
          //   console.log(
          //     orgId,
          //     disabledKey,
          //     record[disabledKey],
          //     disabledExpress.disabledExpress,
          //   );
          //   return eval(disabledExpress);
          //   // return true;
          // }

          return record[disabledKey] === disabledValue;
        }

        const nextButtonProps = {
          type: 'link',
          ...(buttonProps || {}),
          disabled: disabledKey ? disabled() : false,
        };

        // 导入导出封装，后续考虑换成洋葱模型
        let nextBatchProps = batchProps;
        if (uiType === 'batch') {
          const { uploadProps, downloadProps, ...otherBatchProps } = batchProps;
          nextBatchProps = {
            uploadProps: {
              ...uploadProps,
              request: produceRequest(uploadProps.request),
            },
            downloadProps: {
              ...downloadProps,
              request: produceRequest(downloadProps.request),
            },
            ...otherBatchProps,
          };
        }
        return {
          ...btnProps,
          uiType,
          buttonProps: nextButtonProps,
          to: replacePlaceholder(to),
          confirmBeforeClick: nextConfirmBeforeClick,
          onSuccess: nextOnSuccess,
          request: request && produceRequest(request),
          batchProps: nextBatchProps,
          formProps: formProps && {
            ...formProps,
            request: formProps.request && produceRequest(formProps.request),
            initialValuesRequest:
              formProps.initialValuesRequest &&
              produceRequest(formProps.initialValuesRequest),
          },
        };
      },
    );
    return {
      maxItems: 2,
      ...others,
      noMargin: true,
      dataSource: nextDataSource,
    };
  },
);

export default withTableButtonFeatures(ButtonList);
