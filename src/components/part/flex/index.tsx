import React from 'react';

export type PropTypes = {
  isInline?: boolean;
  flexDirection?: 'row' | 'column';
  justifyContent?: 'start' | 'end' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
  alignItems?: 'start' | 'end' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flex?: number;
  children: React.ReactNode;
};

export default function Flex({
  isInline = false,
  flexDirection = 'row',
  flex = 1,
  children = null,
  ...others
}: PropTypes) {
  const display = isInline ? 'inline-flex' : 'flex';
  return (
    <div style={{
      ...others,
      display,
      flexDirection,
      flex,
    }}
    >
      {children}
    </div>
  );
};
