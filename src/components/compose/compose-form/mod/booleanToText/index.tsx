import React, { useRef } from 'react';
import './index.less';

export interface TextProps {
  value?: string;
}

export default function Index(props: TextProps) {
  const { value, ...otherProps } = props;
  const renderMark = useRef(false);

  if (!renderMark.current) {
    renderMark.current = true;
  }

  return <div {...otherProps}>{value ? '是' : '否'}</div>;
}
