import React, { useRef } from 'react';
import { Badge } from 'antd';
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

  return (
    <div {...otherProps}>
      <span>
        {value ? (
          <Badge color="#52C41A" text="已开启" />
        ) : (
          <Badge color="#FAAD14" text="未开启" />
        )}
      </span>
    </div>
  );
}
