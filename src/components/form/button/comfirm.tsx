import React from 'react';
import { Popconfirm } from 'antd';

export default function DelConfirm(props: any) {
  const {
    onConfirm,
    title = '确定删除吗',
    placement = 'top',
    text = '删除'
  } = props.props;

  const style = {
    color: '#1785ec',
    cursor: 'pointer'
  };

  return (
    <Popconfirm
      placement={placement}
      title={title}
      onConfirm={() => onConfirm(props.to)}
      okText="确认"
      cancelText="取消"
    >
      <span style={style}>{text}</span>
    </Popconfirm>
  );
}
