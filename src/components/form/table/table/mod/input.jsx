import { mapProps } from 'recompose';
import { Input } from 'antd';

export default mapProps(({ tableProps, onChange, ...others }) => ({
  tableProps,
  ...others,
  onChange: (e) => { onChange(e.target.value, tableProps); },
}))(Input);
