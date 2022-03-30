/**
 * 选择班级按钮
 * 由于自定义校区可以多选，基础校区只能单选，因此需要预置一个选择框
 * 硬编码的，除选人组件外基本没复用基础能力
 */
import React, { useState } from 'react';
import { message } from 'antd';
import { SelectClassButtonProps } from './interface';
import SelectClassModal from '@/components/select-class-modal';
import Button from './index';
import net from '@/services';

export default ({
  selectDialogTitle = '批量调整班级',
  request,
  loadingText,
  onSuccess,
  onError,
  selectUserProps,
  ...others
}: SelectClassButtonProps) => {
  const [dlgVis, setDlgVis] = useState(false);
  const handleOk = async value => {
    setDlgVis(false);
    const { baseSchoolDepts, customSchoolDepts } = value || {};
    let params = {
      ...(request.params || {}),
      selectUser: {
        deptInfoList: [
          ...(baseSchoolDepts || []),
          ...(customSchoolDepts || [])
        ]
      }
    };

    if (request.formatter) {
      try {
        params = await request.formatter(params);
      } catch (err) {
        console.warn(`请求中断：${  err.message}`);
        return;
      }
    }
    message.loading({
      content: loadingText || '请求中',
      duration: 0,
      hasMask: true
    });
    return net
      .request(request.url, {
        method: request.method || 'POST',
        data: params,
        showError: true
      })
      .then(result => {
        message.destroy();
        onSuccess && onSuccess(result);
      })
      .catch(error => {
        message.destroy();
        onError && onError(error);
      });
  };

  const handleCancel = () => {
    setDlgVis(false);
  };

  const showConfirm = () => {
    setDlgVis(true);
  };

  return (
    <>
      <Button {...others} onClick={showConfirm} />
      <SelectClassModal
        onOk={handleOk}
        onCancel={handleCancel}
        visible={dlgVis}
        selectDialogTitle={selectDialogTitle}
      />
    </>
  );
};
