import React, { useState, useCallback } from 'react';
import { Modal, Checkbox } from 'antd';
import './index.less';

// const defaultRequestFunction = (...args: any[]) => net.request(...args);

export default function SubjectButton({
  className,
  onOpen,
  onCancel,
  dialogProps,
  dataSource,
  onSuccess,
  checkedValue,
  ...others
}: any) {
  const [dlgVis, setDlgVis] = useState(false);
  const [value, setValve] = useState(checkedValue);

  const hideDlg = useCallback(() => {
    onCancel && onCancel();
    setDlgVis(false);
    onSuccess(checkedValue);
  }, [onCancel, checkedValue]);

  const showDlg = useCallback(() => {
    setValve(checkedValue);
    setDlgVis(true);
  }, [checkedValue]);

  const onOk = useCallback(() => {
    onSuccess(value);
    setDlgVis(false);
  }, [onSuccess, value]);
  return (
    <>
      <span onClick={showDlg} className="setting-sub">
        设置科目
      </span>
      <Modal
        className="sub-button-modal-dialog"
        {...dialogProps}
        visible={dlgVis}
        onCancel={hideDlg}
        onOk={onOk}
      >
        <div>
          <Checkbox.Group
            className={className}
            options={dataSource}
            value={value}
            onChange={setValve}
          />
        </div>
      </Modal>
    </>
  );
}
