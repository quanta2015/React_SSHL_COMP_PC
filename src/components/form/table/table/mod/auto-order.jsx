import React from 'react';
import Text from './text';

function AutoOrder(props) {
  const { startString = 'A', tableProps } = props;
  const order = String.fromCharCode(startString.charCodeAt() + tableProps.index);
  return (
    <Text
      {...props}
      value={order}
    />
  );
}

export default AutoOrder;
