import { mapProps } from 'recompose';
import Select from '../../select';

export default mapProps(({ tableProps, onChange, ...others }) => ({
  tableProps,
  ...others,
  onChange: (value) => { onChange(value, tableProps); },
}))(Select);
