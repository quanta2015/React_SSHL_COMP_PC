import React, { useEffect, useMemo, useState, useRef } from 'react';
import classnames from 'classnames';
import { Radio, Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { CheckboxOptionType } from 'antd/lib/checkbox';
import { RadioGroupProps } from 'antd/lib/radio';

import './index.less';

export interface RadioWithSelectOptionType<SVT> extends CheckboxOptionType {
  selectProps: SelectProps<SVT>;
}

export interface RadioWithSelectProps<SVT = SelectValue>
  extends Omit<RadioGroupProps, 'onChange'> {
  options: RadioWithSelectOptionType<SVT>[];
  value?: [SVT?, SVT?];
  defaultValue?: [SVT?, SVT?];
  onChange?: (value: [SVT?, SVT?]) => void;
}

export default function RadioWithSelect<
  SelectValueType extends SelectValue = SelectValue
>(props: RadioWithSelectProps<SelectValueType>) {
  const {
    options,
    className,
    onChange,
    value,
    defaultValue,
    ...restRadioGroupProps
  } = props;

  const didMount = useRef<boolean>(false);

  const [radioValue, setRadioValue] = useState<SelectValueType | undefined>(
    value ? value[0] : undefined
  );
  const [selectValue, setSelectValue] = useState<SelectValueType | undefined>(
    value ? value[1] : undefined
  );

  useEffect(() => {
    const receivedRadioValue = value ? value[0] : undefined;
    const receivedSelectValue = value ? value[1] : undefined;

    if (receivedRadioValue !== radioValue) {
      setRadioValue(receivedRadioValue);
    }
    if (receivedSelectValue !== selectValue) {
      setSelectValue(receivedSelectValue);
    }
  }, [value]);

  useEffect(() => {
    if (didMount.current && onChange) {
      onChange([radioValue, selectValue]);
    }

    didMount.current = true;
  }, [radioValue, selectValue]);

  const renderRadioOptions = useMemo(() => {
    const curRadioVal = radioValue;
    return options.map((option, index) => {
      const { label, selectProps, ...restProps } = option;
      return (
        <div
          className="cf-radio-with-select-item-wrapper"
          key={`${restProps.value}` || `${index}`}
        >
          <Radio {...restProps}>{label}</Radio>
          <Select
            {...selectProps}
            disabled={curRadioVal !== restProps.value}
            value={curRadioVal === restProps.value ? selectValue : undefined}
            onChange={(selectedValue) => setSelectValue(selectedValue)}
          />
        </div>
      );
    });
  }, [options, radioValue, selectValue]);

  return (
    <Radio.Group
      className={classnames('cf-radio-with-select', className)}
      value={radioValue}
      onChange={(e) => {
        setRadioValue(e.target.value);
        setSelectValue(undefined);
      }}
      {...restRadioGroupProps}
    >
      {renderRadioOptions}
    </Radio.Group>
  );
}
