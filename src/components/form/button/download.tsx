import React, { useRef } from 'react';
import { Modal, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import RequestButton from './request';
import { RequestButtonProps } from './interface';

export const downloadButtonHOC = Comp => ({
  onSuccess,
  onError,
  onBeforeClick,
  loadingText,
  ...others
}: RequestButtonProps) => {
  const modal = useRef(null);
  const requesting = useRef(false);
  const handleBeforeClick = async (arg = {}) => {
    if (onBeforeClick) {
      await onBeforeClick(arg);
    }
    const { terminate } = arg;
    requesting.current = true;
    modal.current = Modal.info({
      content: '正在导出中，请稍候…',
      icon: <LoadingOutlined />,
      onOk(close) {
        Modal.confirm({
          okText: '确认',
          cancelText: '取消',
          content: '您确定要取消下载吗？',
          onOk() {
            close();
            terminate();
          }
        });
        requesting.current = false;
      },
      okText: '取消下载'
    });
  };
  const handleSuccess = (result: any) => {
    if (!requesting.current) return;
    requesting.current = false;
    modal.current.destroy();
    if (!result || !/\/\//.test(result.data)) {
      console.error(
        '下载接口返回数据错误，请返回形如 { "success": true, "data": "下载链接" } 的结果'
      );
      onError && onError(new Error('下载接口错误，请联系管理员'));
      return;
    }
    // 跳转到下载链接
    window.location.href = result.data;
    message.success('下载链接获取成功，即将下载', 2);
    onSuccess && onSuccess(result.data);
  };
  const handleError = (e: any) => {
    requesting.current = false;
    modal.current.destroy();
    onError && onError(e);
  };
  return (
    <Comp
      {...others}
      onSuccess={handleSuccess}
      onError={handleError}
      onBeforeClick={handleBeforeClick}
    />
  );
};

export default downloadButtonHOC(RequestButton);
