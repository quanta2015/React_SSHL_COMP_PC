import React, { useEffect, useState } from 'react';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { RangePicker: TimeRangePicker } = TimePicker;
interface Props {
  index?: any;
  value?: any;
  width?: any;
  onChange?: (value: any, others?: any) => void;
}
export function DatePicker_({
  value,
  index,
  disabledDate = false,
  onChange,
  dateFormat = null,
  width = 200,
  ...others
}: Props) {
  const [_value, setValue] = useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);
  const _dateFormat = dateFormat || 'YYYY-MM-DD';
  const handleChange = (value: any, others: any) => {
    // debugger;
    setValue(value);
    onChange(value, others);
  };
  const disabledDateFun = (current: any) => {
    // Can not select days before today and today
    console.log(moment().endOf('day'), '11');
    return current && current < moment().startOf('day');
  };
  return (
    <DatePicker
      {...others}
      style={{ width }}
      allowClear={false}
      disabledDate={disabledDate ? disabledDateFun : () => {}}
      value={_value ? moment(_value, _dateFormat) : null}
      onChange={(value) =>
        handleChange(moment(value).format(_dateFormat), others)
      }
    />
  );
}
// tslint:disable-next-line:class-name
export function RangePicker_({
  value,
  dateFormat = null,
  onChange,
  ...others
}: Props) {
  const [_value, setValue] = useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);
  const _dateFormat = dateFormat || 'YYYYMMDD';
  const handleChange = (value: any, others: any) => {
    setValue(value);
    onChange(value, others);
  };
  return (
    <RangePicker
      {...others}
      allowClear={false}
      value={
        _value && typeof _value === 'object' && _value.length > 0
          ? [moment(_value[0], _dateFormat), moment(_value[1], _dateFormat)]
          : null
      }
      onChange={(e) =>
        handleChange(
          [moment(e[0]).format(_dateFormat), moment(e[1]).format(_dateFormat)],
          others,
        )
      }
    />
  );
}

// tslint:disable-next-line:class-name
export function TimeRangePicker_({ value, onChange, ...others }: Props) {
  console.log('dates111');
  const [_value, setValue] = useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);
  const dateFormat = 'HH:mm';
  const handleChange = (value: any, others: any) => {
    setValue(value);
    onChange(value, others);
  };

  return (
    <TimeRangePicker
      {...others}
      allowClear={false}
      format={dateFormat}
      value={
        _value && typeof _value === 'object' && _value.length > 0
          ? [moment(_value[0], dateFormat), moment(_value[1], dateFormat)]
          : null
      }
      onChange={(e) =>
        handleChange(
          [moment(e[0]).format(dateFormat), moment(e[1]).format(dateFormat)],
          others,
        )
      }
    />
  );
}

export function TimePicker_({
  value = null,
  onChange,
  width = 90,
  ...others
}: Props) {
  const [_value, setValue] = useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);
  const handleChange = (time: any, others: any) => {
    setValue(time);
    onChange(time, others);
  };
  return (
    <TimePicker
      {...others}
      value={_value ? moment(_value, 'HH:mm') : null}
      onChange={(time) => handleChange(moment(time).format('HH:mm'), others)}
      style={{ width }}
      allowClear={false}
      placeholder="请选择"
    />
  );
}
