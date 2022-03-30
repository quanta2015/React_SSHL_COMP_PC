import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Table, Button, Tooltip } from 'antd';
import update from 'immutability-helper';
import { Request } from '@/components/interface';
import net from '@/services/index';
import { NsTableProps } from '../interface';
// import { render } from 'react-dom';

export interface NsSortProps {
  // 交换接口
  // 参数：firstId，secondId，顺序不重要，后端自己判断
  swapRequest: Request;
  // 置顶接口
  // 参数：id，置顶后刷新页面
  toTopRequest: Request;
  /** 排序的字段 key， 默认是 'sortNum' */
  orderKey?: string;
  primaryKey: string;
  onRefresh: () => void;
  // 排序结束后的回调
  onOrderChange?: () => void;
}

// function strlen(str: string) {
//   if (!str) return 0;
//   let len = 0;
//   for (let i = 0; i < str.length; i++) {
//     (str.charCodeAt(i) > 255 || str.charCodeAt(i <= 0)) ? len += 2 : len ++;
//   }
//   return len;
// }

export interface PropTypes extends NsSortProps {
  dataSource: any[];
  primaryKey: any;
  tableProps: NsTableProps;
}

export default function Sort({
  dataSource,
  tableProps,
  primaryKey,
  swapRequest,
  toTopRequest,
  onRefresh,
  onOrderChange,
  orderKey = 'sortNum',
}: PropTypes) {
  const { columns } = tableProps;
  const [sortedDataSource, setSortedDataSource] = useState([]);
  const [requesting, setRequesting] = useState(false);
  const [simpleCols, setSimpleCols] = useState([]);
  const [vis, setVis] = useState(false);
  const callRefresh = () => {
    onRefresh();
    onOrderChange && onOrderChange();
  };
  useEffect(() => {
    // 只展示纯文本类型的 column
    setSimpleCols(
      columns
        .filter(
          ({ uiType }) => !uiType || uiType === 'text' || uiType === 'userText',
        )
        .map((data: any) => {
          const { label, name, width } = data;
          return {
            title: label,
            dataIndex: name,
            textWrap: 'word-break',
            ellipsis: true,
            width:
              name === 'nodeName' || name === 'label' || name === 'depts'
                ? 210
                : width || 90,
            render: (text: string) => {
              if (name === 'nodeName' || name === 'label' || name === 'depts') {
                return (
                  <Tooltip placement="top" title={text}>
                    <span>
                      {text.length <= 12 ? text : `${text.substring(0, 12)}...`}
                    </span>
                  </Tooltip>
                );
              }
              return text || '-';
            },
          };
        })
        .concat([
          {
            title: '调整顺序',
            fixed: 'right',
            width: 160,
            render(text: string, record: any, index: number) {
              return (
                <>
                  <Button
                    style={{ paddingLeft: 0 }}
                    type="link"
                    disabled={index === 0}
                    onClick={() => {
                      swapRow(index, index - 1);
                    }}
                  >
                    上移
                  </Button>
                  <Button
                    style={{ paddingLeft: 0 }}
                    type="link"
                    disabled={index === sortedDataSource.length - 1}
                    onClick={() => {
                      swapRow(index, index + 1);
                    }}
                  >
                    下移
                  </Button>
                  <Button
                    style={{ paddingLeft: 0 }}
                    disabled={index === 0}
                    type="link"
                    onClick={() => {
                      toTop(index);
                    }}
                  >
                    置顶
                  </Button>
                </>
              );
            },
          },
        ]),
    );
  }, [columns, sortedDataSource]);
  useEffect(() => {
    setSortedDataSource(dataSource);
  }, [dataSource]);

  const swapRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = sortedDataSource[dragIndex];
      // 顺序随便搞的，后端自己交换
      const [firstId, secondId] = [
        sortedDataSource[hoverIndex],
        sortedDataSource[dragIndex],
      ].map((_) => _[primaryKey]);
      setSortedDataSource(
        update(sortedDataSource, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
      setRequesting(true);
      const { url, params, ...options } = swapRequest;
      // tslint:disable-next-line: no-floating-promises
      net
        .request(url, {
          ...options,
          data: {
            ...(params || {}),
            firstId,
            secondId,
          },
        })
        .then((_result) => {
          callRefresh();
        })
        .catch(() => {
          // 回滚
          setSortedDataSource(sortedDataSource);
        })
        .finally(() => {
          setRequesting(false);
        });
    },
    [sortedDataSource],
  );

  const toTop = useCallback(
    (index) => {
      setRequesting(true);
      const { url, params, ...options } = toTopRequest;
      // tslint:disable-next-line: no-floating-promises
      net
        .request(url, {
          ...options,
          data: {
            ...(params || {}),
            id: sortedDataSource[index][primaryKey],
          },
        })
        .then((_result) => {
          // 置顶后需要刷新表格内容
          callRefresh();
        })
        .finally(() => {
          setRequesting(false);
        });
    },
    [sortedDataSource],
  );

  const showModal = useCallback(() => {
    setVis(true);
  }, [dataSource]);
  // const handleOk = () => {
  //   setRequesting(true);
  //   const { url, ...options } = request;
  //   // tslint:disable-next-line: no-floating-promises
  //   net
  //     .request(url, {
  //       ...options,
  //       data: {
  //         ...(request.params || {}),
  //         sortList: sortedDataSource.map((item, index) => ({
  //           id: item[primaryKey],
  //           [orderKey]: index
  //         }))
  //       }
  //     })
  //     .then(_result => {
  //       onOk(sortedDataSource);
  //       setVis(false);
  //     })
  //     .finally(() => {
  //       setRequesting(false);
  //     });
  // };
  const hideDlg = useCallback(async () => {
    setVis(false);
  }, [dataSource]);
  return (
    <>
      <Button onClick={showModal}>调整顺序</Button>
      <Modal
        title="调整顺序"
        visible={vis}
        footer={null}
        // onOk={handleOk}
        onCancel={hideDlg}
        width="640px"
      >
        <Table
          className="sortable-table"
          columns={simpleCols}
          loading={requesting}
          pagination={false}
          dataSource={sortedDataSource}
          size="small"
          scroll={{ x: 'max-content', y: 440 }}
        />
      </Modal>
    </>
  );
}
