import React from 'react';
// import { Popconfirm } from 'antd';
export default function DelConfirm(props: any) {
  console.log(props, 'onClick');
  const { text = '删除xx', onClick } = props;
  const style = {
    color: '#1785ec',
    cursor: 'pointer',
  };
  return (
    <span style={style} onClick={onClick}>
      {text}
    </span>
  );
}
