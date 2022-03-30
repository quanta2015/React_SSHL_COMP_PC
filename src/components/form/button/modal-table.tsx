import React, { useState, useCallback } from 'react';
import { Modal } from 'antd';
import { BatchButtonProps } from './interface';
import './index.less';
// import dayToWeek from '@/pages/attendance/utils/common.ts';

interface itemBase {
  behavior: any;
  endTime: any;
  startTime: any;
}

export default function BatchButton({
  className,
  onOpen,
  onCancel,
  value,
  dialogProps,
  tableProps,
  onSuccess,
  ...others
}: BatchButtonProps & { value: any; tableProps: any }) {
  const { record } = tableProps;
  const { period, unifyRuleList, flexibleRuleList } = record;

  const [dlgVis, setDlgVis] = useState(false);
  const hideDlg = useCallback(() => {
    onCancel && onCancel();
    setDlgVis(false);
    onSuccess && onSuccess();
  }, [onCancel]);

  const showDlg = useCallback(() => {
    onOpen && onOpen();
    setDlgVis(true);
  }, [onOpen]);

  const codeToText = (value: any) => {
    // tslint:disable-next-line: no-duplicate-case
    switch (value) {
      case 0:
        return '准入准出';
        break;
      case 1:
        return '准入';
        break;
      case 2:
        return '准出';
        break;
    }
  };
  if (
    (flexibleRuleList?.length === 0 && period === 2) ||
    (unifyRuleList?.length === 0 && period === 1)
  ) {
    return null;
  }
  // console.log(flexibleRuleList, 'flexibleRuleList');
  // <Option value="1">准入准出</Option>
  // <Option value="2">准入</Option>
  // <Option value="3">准出</Option>
  return (
    <>
      {period === 1
        ? unifyRuleList?.slice(0, 3).map((item: itemBase, index: number) => {
            return (
              <div className="device-rule-item" key={index}>
                <div className="device-rule-type">
                  {codeToText(item.behavior)}
                </div>
                <div className="device-time">
                  <span>{item.startTime}</span>
                  <span>-</span>
                  <span>{item.endTime}</span>
                </div>
              </div>
            );
          })
        : flexibleRuleList
            ?.slice(0, 3)
            ?.sort((a: any, b: any) => Number(a.week) - Number(b.week))
            .map((item: any, index: number) => {
              return (
                <div key={index} className="device-rule-list">
                  <div className="device-week">{item.week}</div>
                  {item?.ruleList?.map(
                    (child: itemBase, childIndex: number) => {
                      return (
                        <div className="device-rule-item" key={childIndex}>
                          <div className="device-rule-type">
                            {codeToText(child.behavior)}
                          </div>
                          <div className="device-time">
                            <span>{child.startTime}</span>
                            <span>-</span>
                            <span>{child.endTime}</span>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              );
            })}

      {period === 1 && unifyRuleList.length > 3 && (
        <span className="device-show-all" onClick={showDlg}>
          查看全部 {'>'}
        </span>
      )}
      {period === 2 && flexibleRuleList.length > 3 && (
        <span className="device-show-all" onClick={showDlg}>
          查看全部 {'>'}
        </span>
      )}
      <Modal
        className="cf-button-modal-dialog-rule"
        {...dialogProps}
        visible={dlgVis}
        onCancel={hideDlg}
        footer={null}
      >
        {period === 1
          ? unifyRuleList.map((item: itemBase, index: number) => {
              return (
                <div className="device-rule-item" key={index}>
                  <div className="device-rule-type">
                    {codeToText(item.behavior)}
                  </div>
                  <div className="device-time">
                    <span>{item.startTime}</span>
                    <span>-</span>
                    <span>{item.endTime}</span>
                  </div>
                </div>
              );
            })
          : flexibleRuleList
              ?.sort((a: any, b: any) => Number(a.week) - Number(b.week))
              .map((item: { week: any; ruleList: any[] }, index: number) => {
                return (
                  <div key={index} className="device-rule-list">
                    <div className="device-week">{item.week}</div>
                    {item?.ruleList?.map(
                      (child: itemBase, childIndex: number) => {
                        return (
                          <div className="device-rule-item" key={childIndex}>
                            <div className="device-rule-type">
                              {codeToText(child.behavior)}
                            </div>
                            <div className="device-time">
                              <span>{child.startTime}</span>
                              <span>-</span>
                              <span>{child.endTime}</span>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                );
              })}
      </Modal>
    </>
  );
}
