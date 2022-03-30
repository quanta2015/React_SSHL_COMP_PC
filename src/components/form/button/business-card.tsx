import React from 'react';

export default function businessCard({ dataSource }: any) {
  const { label } = dataSource[0];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
        height: '100px',
        fontSize: '13px',
        color: '#666',
        borderRadius: '8px',
        background: 'powderblue',
      }}
    >
      <span>{label}</span>
      <span>标准结构为：{label}</span>
    </div>
  );
}
