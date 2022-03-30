import React from 'react';

export default function Button(props) {
  const handleClick = () => {
    props.onEmit('click');
  };

  return (
    <button onClick={handleClick}>{props.text || 'default button'}</button>
  );
}
