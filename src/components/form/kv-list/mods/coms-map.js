import React from 'react';
import { Input } from 'antd';
import Select from '../../select';

function Text(props) {
  const { value, ...others } = props;
  return (
    <p
      {...others}
    >
      {value}
    </p>
  );
}


export default {
  input: Input,
  select: Select,
  text: Text,

};
