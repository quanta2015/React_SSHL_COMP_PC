import React from 'react';

export type PropTypes = {
  width?: number | string;
  flex: number;
  children: React.ReactNode;
  className?: string;
};

export default function Struct({
  className = '',
  flex,
  children = null,
  width,
  ...others
}: PropTypes) {
  return (
    <div
      className={className}
      style={{
        ...others,
        width,
        flex,
      }}
    >
      {children}
    </div>
  );
};
