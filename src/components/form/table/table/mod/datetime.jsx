import { mapProps } from 'recompose';
import moment from 'dayjs';
import Text from './text';

export default mapProps(({ value, format, ...others }) => {
  return ({
    value: value ? moment(new Date(value)).format(format) : '',
    ...others,
  });})(Text);
