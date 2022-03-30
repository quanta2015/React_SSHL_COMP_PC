import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Button , Popconfirm, Select } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { getComByUiType } from '@/components/compose-form/helper';
import comsMap from '@/components/compose-form/mod/coms-map';
// import dayToWeek from '@/pages/attendance/utils/common.ts';
import 'moment/locale/zh-cn';
import './index.less';
import { cloneDeep, isEqual } from 'lodash';

const { Option } = Select;
type OptionsProps = {
  checkboxlabel: string;
  label?: string;
  value?: string;
  name?: string;
  uiType: string;
  text?: string;
  beforelabel?: string;
  afterlabel?: string;
};
export interface CheckboxWithSelectProps {
  itemProps?: string;
  text?: string;
  rules?: any;
  props?: any;
  name?: string;
  uiType?: string;
  label?: string;
  options?: OptionsProps[];
  value?: any;
  onChange?: (value: any, others?: any) => void;
}

interface ValueObj {
  startTime: string;
  endTime: string;
  checked?: boolean;
  name?: string;
  flag?: string;
  uiType?: string;
  startEndTime?: any[];
  behavior?: string;
}

interface BaseItem {
  name: string;
  addName: string;
  flag: string;
  checkboxlabel?: string;
  label: string;
  desc: string;
  marginTop?: any;
  itemProps: ValueObj;
  options: ValueObj[];
}

function TimeRule({ value, onChange, item }: any) {
  const { itemProps, options, name, addName, label = null, unifyWeek = null } = item;
  const [optionList, setOptions] = useState(options);
  const optionListRef = useRef<any>(options);

  // useEffect(() => {
  //   optionListRef.current = options;
  //   setOptions(options);
  // }, [options]);
  // console.log('value222Time');

  useEffect(() => {
    if (value && value instanceof Object) {
      const list = options.slice();
      value[itemProps.name]?.map((item: ValueObj, index: number) => {
        list[index] = {
          ...itemProps,
          behavior: item.behavior,
          endTime: item.endTime,
          startTime: item.startTime,
        };
      });

      optionListRef.current = list;
      setOptions(list);
    }
    // if (value === null) {
    //   const list: any[] = [];
    //   list.push({
    //     endTime: '',
    //     startTime: '',
    //     behavior: '0',
    //     name: 'ruleList',
    //     uiType: 'timepicker'
    //   });
    //   optionListRef.current = list;
    //   setOptions(list);
    // }
  }, [value]);

  const handleDateChange = (value: any, others: any) => {
    const { index, type, name } = others;
    const list = optionListRef.current.slice();
    list[index] = { ...list[index], [type]: value };
    optionListRef.current = list;
    onChange(
      name,
      list.map((item: ValueObj) => {
        return {
          endTime: item.endTime,
          startTime: item.startTime,
          behavior: item.behavior,
        };
      }),
    );
  };

  const addBtn = (name: string, itemProps: ValueObj) => {
    const list = optionListRef.current.slice();
    list.push(itemProps);
    optionListRef.current = list;
    onChange(
      name,
      list.map((item: ValueObj) => {
        return {
          endTime: item.endTime,
          startTime: item.startTime,
          behavior: item.behavior,
        };
      }),
    );
  };

  const deleteBtn = (index: number, name: string) => {
    const list = [
      ...optionListRef.current.slice(0, index),
      ...optionListRef.current.slice(index + 1),
    ];
    onChange(
      name,
      list.map((item: ValueObj) => {
        return {
          endTime: item.endTime,
          startTime: item.startTime,
          behavior: item.behavior,
        };
      }),
    );
    optionListRef.current = list;
  };

  const getBtnDisabled = useCallback(
    (name) => {
      if (optionListRef.current.length === 6) {
        return false;
      }
      return value?.[name]?.every((item: ValueObj) => item.endTime && item.startTime);
    },
    [value, optionListRef],
  );

  return (
    <>
      <div className="item">
        <div className="value">
          <div className="list">
            {unifyWeek && <div className="_week">{unifyWeek}</div>}
            {optionListRef.current.map((item: ValueObj, index: number) => {
              const Com = getComByUiType(item.uiType, comsMap);
              const _parent = optionListRef.current;
              return (
                <div key={index + name} className="time-item">
                  <Select
                    style={{ width: 100, marginRight: '8px' }}
                    value={item.behavior.toString()}
                    onChange={(value) => handleDateChange(value, { name, type: 'behavior', index })}
                  >
                    <Option value="0">准入准出</Option>
                    <Option value="1">准入</Option>
                    <Option value="2">准出</Option>
                  </Select>

                  <Com
                    disabledHours={() => {
                      if (index === 0) {
                        return [];
                      }
                      const hours = [];
                      const time = _parent[index - 1].endTime;
                      const timeArr = time.split(':');
                      // tslint:disable-next-line: radix
                      for (let i = 0; i < parseInt(timeArr[0]); i++) {
                        hours.push(i);
                      }
                      return hours;
                    }}
                    disabledMinutes={(selectedHour: any) => {
                      if (index === 0) {
                        return [];
                      }
                      const timeArr = _parent[index - 1].endTime.split(':');
                      const minutes = [];
                      // tslint:disable-next-line: radix
                      if (selectedHour === parseInt(timeArr[0])) {
                        // tslint:disable-next-line: radix
                        for (let i = 0; i < parseInt(timeArr[1]) + 1; i++) {
                          minutes.push(i);
                        }
                      }
                      return minutes;
                    }}
                    format="HH:mm"
                    locale={locale}
                    name={item.name}
                    value={item.startTime}
                    index={index}
                    width={190}
                    type="startTime"
                    onChange={handleDateChange}
                    // disabled={item.behavior ? false : true}
                  />
                  <span>~</span>
                  <Com
                    disabledHours={() => {
                      if (!item.startTime) {
                        return [];
                      }
                      const hours = [];
                      const time = item.startTime;
                      const timeArr = time.split(':');
                      // tslint:disable-next-line: radix
                      for (let i = 0; i < parseInt(timeArr[0]); i++) {
                        hours.push(i);
                      }
                      return hours;
                    }}
                    disabledMinutes={(selectedHour: any) => {
                      if (!item.startTime) {
                        return [];
                      }
                      const timeArr = item.startTime.split(':');
                      const minutes = [];
                      // tslint:disable-next-line: radix
                      if (selectedHour === parseInt(timeArr[0])) {
                        // tslint:disable-next-line: radix
                        for (let i = 0; i < parseInt(timeArr[1]) + 1; i++) {
                          minutes.push(i);
                        }
                      }
                      return minutes;
                    }}
                    format="HH:mm"
                    name={item.name}
                    width={190}
                    locale={locale}
                    value={item.endTime}
                    index={index}
                    type="endTime"
                    onChange={handleDateChange}
                    disabled={!item.startTime}
                  />

                  {optionList.length > 1 && (
                    <Popconfirm
                      overlayClassName="v4"
                      placement="top"
                      title="确定删除吗"
                      onConfirm={() => deleteBtn(index, item.name)}
                      okText="确认"
                      cancelText="取消"
                    >
                      <div className="timepicker-delete">删除</div>
                    </Popconfirm>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="add-btn">
          <Button
            style={{ marginBottom: label ? '16px' : '24px' }}
            disabled={!getBtnDisabled(name)}
            onClick={() => addBtn(addName, itemProps)}
          >
            新增规则
          </Button>
        </div>
      </div>
    </>
  );
}

const DeviceFormRule = (props: any) => {
  const {
    onChange,
    value,
    timeProps,
    clockLaterSettingChange,
    handleOk = () => {},
    synchronizationToFromValue = false,
    selectUserVisible = false,

    marginTop = 0,
  } = props;

  const valueRef = useRef<any>();

  const handleCheckboxGroupChange = (_name: string, array: any) => {
    if (synchronizationToFromValue) {
      onChange({ ...value, [_name]: array });
    } else {
      clockLaterSettingChange && clockLaterSettingChange({ ...value, [_name]: array });
    }
  };

  if (!value) {
    return null;
  }

  return (
    <div className="switch-checkbox-input" style={{ marginTop }}>
      <div className="data-box">
        {timeProps.map((item: BaseItem, index: number) => {
          return (
            <TimeRule
              key={index}
              parentIndex={index}
              selectUserVisible={selectUserVisible}
              onChange={handleCheckboxGroupChange}
              handleOk={handleOk}
              value={value}
              item={cloneDeep(item)}
            />
          );
        })}
      </div>
    </div>
  );
};
export default DeviceFormRule;
