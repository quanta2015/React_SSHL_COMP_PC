import React, { useRef } from 'react';
import './index.less';

export interface TextProps {
  value?: string;
}

export default function Text(props: TextProps) {
  const { value, ...otherProps } = props;
  const renderMark = useRef(false);

  if (!renderMark.current) {
    console.log('render Text component');
    renderMark.current = true;
  }

  return <p className="cf-form-text-item" {...otherProps}>{value || '-'}</p>;
}
