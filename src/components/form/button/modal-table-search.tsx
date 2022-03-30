import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Modal } from 'antd';
import { BatchButtonProps } from './interface';
import ComposeManage from '@/components/compose-manage';
import { ButtonList } from '@/components/button';
import './index.less';
// import { API } from '../../pages/access-center/device-plan/api';

export default function ModalTableSearch({
  className,
  onOpen,
  onCancel,
  dialogProps,
  props,
  onSuccess,
  ...others
}: BatchButtonProps & { _key?: any; props?: any }) {
  const [dlgVis, setDlgVis] = useState(false);
  const [idList, setIdLists] = useState([]);
  const hideDlg = useCallback(() => {
    // setfForceUpdate(false);
    onCancel && onCancel();
    setDlgVis(false);
    onSuccess && onSuccess();
  }, [onCancel]);

  const showDlg = useCallback(() => {
    // setfForceUpdate(true);
    onOpen && onOpen(others);
    setDlgVis(true);
  }, [onOpen]);

  const getList = (idList: any, rowList: any) => {
    setIdLists(idList);
  };

  const _props = useMemo(() => {
    return {
      ...props,
      buttonList: props.buttonList.map((item) => {
        return {
          ...item,
          request: {
            ...item.request,
            data: { planId: others?.to, deviceIdList: idList },
          },
        };
      }),
      dataRequest: {
        ...props.dataRequest,
        params: { planId: others?.to },
      },
    };
  }, [dlgVis, idList]);

  const footer = useMemo(() => {
    // 后面条件是为了无管理员权限访问时，弹窗信息中不展示下面三个btn
    // if (!type || history?.location?.pathname?.indexOf('-noper') !== -1) {
    //   return null;
    // }
    return (
      <div>
        <ButtonList
          dataSource={[
            {
              uiType: 'request',
              request: {
                url: `/planManagement/unbindDevice`,
                method: 'POST',
                data: { planId: others?.to, deviceIdList: idList },
              },
              text: '解除绑定',
              // refreshAfterRequest: true,
              onSuccess() {
                // refreshTableData();
                // history.go(0);
                // hideDlg();
              },
              buttonProps: { loading: false, disabled: idList.length === 0 },
            },
            {
              uiType: 'request',
              request: {
                url: `/planManagement/bindDevice`,
                method: 'POST',
                data: { planId: others?.to, deviceIdList: idList },
              },
              text: '绑定设备',
              // refreshAfterRequest: true,
              onSuccess() {
                // refreshTableData();
                // hideDlg();
                // history.go(0);
              },
              buttonProps: { loading: false, disabled: idList.length === 0 },
            },
          ]}
        />
      </div>
    );
  }, [hideDlg, idList]);
  return (
    <>
      {/* <Button {...others} text="xxx" onClick={showDlg} /> */}
      <span onClick={showDlg} className="bind-btn">
        绑定设备
      </span>
      {dlgVis && (
        <Modal
          className="cf-button-modal-dialog-bind"
          {...dialogProps}
          visible={dlgVis}
          onCancel={hideDlg}
          footer={null}
        >
          <ComposeManage {..._props} getList={getList} />
        </Modal>
      )}
    </>
  );
}
