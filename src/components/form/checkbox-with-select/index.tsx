import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback
} from 'react';
import classnames from 'classnames';
import _pick from 'lodash/pick';
import { Checkbox, Select } from 'antd';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { CheckboxOptionType, CheckboxGroupProps } from 'antd/lib/checkbox';

import './index.less';

type CheckboxValueType = string | number | boolean;

export interface CheckboxWithSelectOptionType<SVT> extends CheckboxOptionType {
  selectProps: SelectProps<SVT>;
}

export interface CheckboxWithSelectProps<SVT = SelectValue>
  extends Omit<CheckboxGroupProps, 'onChange' | 'value'> {
  options: CheckboxWithSelectOptionType<SVT>[];
  value?: Array<[CheckboxValueType?, SVT?]>;
  onChange?: (value: Array<[CheckboxValueType?, SVT?]>) => void;
}

interface SelectValueMap<SVT> {
  [key: string]: SVT;
}

export default function CheckboxWithSelect<
  SelectValueType extends SelectValue = SelectValue
>(props: CheckboxWithSelectProps<SelectValueType>) {
  const {
    options,
    className,
    onChange,
    value,
    onChangSchoolNatureEnum = null,
    initialValues = [],
    ...restRadioGroupProps
  } = props;
  const didMount = useRef<boolean>(false);
  const initialValuesRef = useRef<any>(initialValues);

  const buildSelectValueMap = useCallback(
    (
      args: Array<[CheckboxValueType?, SelectValueType?]>
    ): SelectValueMap<SelectValueType> => {
      if (!args || args.length === 0) {
        return {};
      }

      const result: SelectValueMap<SelectValueType> = {};

      args.forEach(item => {
        result[`${item[0]}`] = item[1];
      });

      return result;
    },
    []
  );

  const [internalCheckedValue, setInternalCheckedValue] = useState<
    CheckboxValueType[]
  >(value ? value.map(val => val[0]) : []);

  const [
    internalSelectValueByCheckboxValue,
    setInternalSelectValueByCheckboxValue
  ] = useState<SelectValueMap<SelectValueType>>(buildSelectValueMap(value));

  useEffect(() => {
    if (initialValues.length > 0) {
      setInternalCheckedValue(initialValues.map(val => val[0]));
    }
  }, [initialValues]);

  useEffect(() => {
    if (!onChange) {
      return;
    }

    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    const data: Array<[
      CheckboxValueType?,
      SelectValueType?
    ]> = internalCheckedValue.map(checkedVal => {
      const theSelectValue =
        internalSelectValueByCheckboxValue[`${checkedVal}`];
      return theSelectValue !== undefined
        ? [checkedVal, theSelectValue]
        : [checkedVal];
    });

    onChange(data);
  }, [internalCheckedValue, internalSelectValueByCheckboxValue]);

  const checkboxOptions = useMemo(() => {
    return options.map((option, index) => {
      const { label, selectProps, ...restProps } = option;

      return (
        <div
          className="cf-checkbox-with-select-item-wrapper"
          key={`${restProps.value}` || `${index}`}
        >
          <Checkbox {...restProps}>{label}</Checkbox>
          <Select
            {...selectProps}
            disabled={internalCheckedValue.indexOf(restProps.value) < 0}
            value={internalSelectValueByCheckboxValue[`${restProps.value}`]}
            onChange={selectedValue => {
              onChangSchoolNatureEnum &&
                onChangSchoolNatureEnum(selectedValue, index);
              if (
                restProps.value === 'schoolNatureEnum' &&
                internalSelectValueByCheckboxValue?.subjectEnum
              ) {
                setInternalSelectValueByCheckboxValue({
                  ...internalSelectValueByCheckboxValue,
                  subjectEnum: undefined
                });
              } else {
                setInternalSelectValueByCheckboxValue({
                  ...internalSelectValueByCheckboxValue,
                  [`${restProps.value}`]: selectedValue
                });
              }
            }}
          />
        </div>
      );
    });
  }, [
    JSON.stringify(options),
    internalCheckedValue,
    internalSelectValueByCheckboxValue
  ]);
  console.log(internalCheckedValue, 'internalCheckedValue111');

  return (
    <Checkbox.Group
      className={classnames('cf-checkbox-with-select', className)}
      onChange={checkedValue => {
        initialValuesRef.current = checkedValue;
        setInternalCheckedValue(checkedValue);

        const nextInternalSelectValueByCheckboxValue = _pick(
          internalSelectValueByCheckboxValue,
          checkedValue.map(val => `${val}`)
        );
        setInternalSelectValueByCheckboxValue(
          nextInternalSelectValueByCheckboxValue
        );
      }}
      value={internalCheckedValue}
      {...restRadioGroupProps}
    >
      {checkboxOptions}
    </Checkbox.Group>
  );
}
