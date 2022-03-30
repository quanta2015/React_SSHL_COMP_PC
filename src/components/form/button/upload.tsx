import React from 'react';
import { Button, message } from 'antd';
import Upload, { PropTypes } from '@/components/upload';
import { UploadButtonProps } from './interface';
import './index.less';

function BaseUpload({ text, buttonProps, request, onSuccess, onError }: UploadButtonProps) {
  const props: PropTypes = {
    request,
    onError(errorMsg) {
      const msg = errorMsg || '导入数据失败！';
      message.warn(msg);
      onError && onError(new Error(msg));
    },
    onSuccess() {
      // 导入输入成功有两个提示文案，故将此注释掉--谢小平 不确定是否有影响其他业务
      // message.success('导入数据成功！');
      onSuccess && onSuccess(null);
    }
  };

  return (
    <Upload className="upload-container" {...props}>
      <Button {...buttonProps}>{text}</Button>
    </Upload>
  );
}

export default BaseUpload;
