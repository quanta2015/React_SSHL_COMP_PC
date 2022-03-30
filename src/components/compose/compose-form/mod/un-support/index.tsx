import React from 'react';

export default function UnSupport({ uiType }: { uiType: string }) {
  return <p style={{ color: 'red' }}>不支持的 uiType：{uiType}</p>;
}
