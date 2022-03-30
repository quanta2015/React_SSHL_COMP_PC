import React, { useState, useCallback } from 'react';
import { Modal } from 'antd';
import { BatchButtonProps } from './interface';
import ImportAndExport from '@/components/import-and-export';
import Button from './default';

// const defaultRequestFunction = (...args: any[]) => net.request(...args);

export default function BatchButton({
  className,
  onOpen,
  onCancel,
  dialogProps,
  batchProps,
  onSuccess,
  ...others
}: BatchButtonProps) {
  const [dlgVis, setDlgVis] = useState(false);
  const hideDlg = useCallback(() => {
    onCancel && onCancel();
    setDlgVis(false);
    onSuccess();
  }, [onCancel]);

  const showDlg = useCallback(() => {
    onOpen && onOpen();
    setDlgVis(true);
  }, [onOpen]);

  return (
    <>
      <Button {...others} onClick={showDlg} />
      <Modal
        className="cf-button-batch-dialog"
        {...dialogProps}
        visible={dlgVis}
        onCancel={hideDlg}
        footer={null}
      >
        <ImportAndExport {...batchProps} onUploadSuccess={hideDlg} />
      </Modal>
    </>
  );
}
