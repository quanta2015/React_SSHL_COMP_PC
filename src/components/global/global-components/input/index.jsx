import React from 'react';

export default function Input({ value, onChange, ...others }) {
  return (
    <input
      type="text"
      autoFocus={false}
      value={value}
      onChange={(e) => { onChange(e.target.value); }}
      {...others}
    />
  );
}
