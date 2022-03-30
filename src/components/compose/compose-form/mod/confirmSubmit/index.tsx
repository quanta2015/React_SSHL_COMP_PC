import React from 'react';
import { Button, Modal } from 'antd';
import './index.less';

const { confirm } = Modal;

export default ({ btnProps, loading, disabled, onConfirm, ...others }: any) => {
  const onClick = () => {
    confirm({
      ...others
    });
  };

  return (
    <Button
      {...btnProps}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
    />
  );
};
