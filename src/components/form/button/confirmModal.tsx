import React from 'react';
import { Modal } from 'antd';
const { confirm } = Modal;

export default function TestModal({ text, onClick, confirmInfo }: props) {
  const style = {
    color: '#1785ec',
    cursor: 'pointer',
  };

  const showConfirm = () => {
    confirm({
      ...confirmInfo, 
      onOk() {
        onClick();
      },
      onCancel() {},
    });
  };

  return (
    <span style={style} onClick={showConfirm}>
      {text}
    </span>
  );
}
