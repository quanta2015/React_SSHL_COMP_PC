import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { Switch, Checkbox, Button, Tag, Input , Popconfirm } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { debounce , cloneDeep } from 'lodash';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { getComByUiType } from '@/components/compose-form/helper';
import comsMap from '@/components/compose-form/mod/coms-map';
import Table from '@/components/table';
import 'moment/locale/zh-cn';
import './index.less';

const { TextArea } = Input;
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

export interface PropsType {
  index?: number;
  switchdisabled: boolean;
  item: any;
  onChange?: (value: any, others?: any) => void;
}

// 两个inputNumber
function CheckBoxInput({
  switchdisabled,
  item,
  index,
  visible = false,
  onChange,
  onChangeChecked,
}: any) {
  const handleInputChange = (value: any, index: number) => {
    onChange(value, index, item.name);
  };

  const Com = getComByUiType(item.uiType, comsMap);
  return (
    <div className="item">
      <div className="checkbox">
        {!visible ? (
          <Checkbox
            // tslint:disable-next-line: no-extra-boolean-cast
            checked={item.checked || null}
            onChange={(e) =>
              onChangeChecked(e.target.checked, index, item.name)
            }
            disabled={!switchdisabled}
          >
            <span className="check-label">{item.checkboxlabel}</span>
          </Checkbox>
        ) : (
          <span className="check-label">{item.checkboxlabel}</span>
        )}
      </div>
      <div className="value">
        <span className="check-label">{item.beforelabel}</span>
        <span className="margin-left-right">
          <Com
            // value={data ? data[item.name] : null}
            value={item.value || null}
            onChange={handleInputChange}
            index={index}
            // disabled={!item.checked || !switchdisabled}
            disabled={
              !visible ? !item.checked || !switchdisabled : !switchdisabled
            }
            {...item}
          />
        </span>
        <span className="check-label">{item.afterlabel}</span>
      </div>
    </div>
  );
}

interface ValueObj {
  startTime: string;
  endTime: string;
  checked?: boolean;
  name?: string;
  flag?: string;
  uiType?: string;
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

// 两个
function CheckBoxRangePicker({
  switchdisabled,
  onChangeChecked,
  clockLaterSettingChange,
  value,
  handleOk,
  _selectUserProps = null,
  checkLinkFlag,
  selectUserVisible,
  onChange,
  timeProps,
}: any) {
  const [optionList, setOptions] = useState(
    timeProps.map((item: BaseItem) => item.options),
  );
  const optionListRef = useRef<any>(
    timeProps.map((item: BaseItem) => item.options),
  );
  const [_selectSignature, setselectSignature] = useState(
    value?.teacherSelectId,
  );
  useEffect(() => {
    if (value?.teacherSelectId) {
      setselectSignature(value?.teacherSelectId);
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      const list = optionListRef.current.slice();
      list.forEach((parent: any, parentIndex: number) => {
        value[timeProps[parentIndex]?.itemProps.name]?.map(
          (item: ValueObj, index: number) => {
            if (
              value[list[parentIndex][index]?.flag] === undefined &&
              value[list[parentIndex][index]?.name]?.every(
                (item: ValueObj) => item.startTime && item.endTime,
              )
            ) {
              clockLaterSettingChange({
                ...value,
                [list[parentIndex][index]?.flag]: true,
              });
            }
            list[parentIndex][index] = {
              ...timeProps[parentIndex]?.itemProps,
              checked: getChecked(list, parentIndex, index),
              endTime: item.endTime,
              startTime: item.startTime,
            };
          },
        );
      });

      optionListRef.current = list;
      setOptions(list);
    }
  }, [value]);

  const getChecked = useCallback(
    (list: any[], parentIndex: number, index: number) => {
      if (parentIndex === 2 && checkLinkFlag) {
        return value[list[parentIndex - 1][index]?.flag] === undefined
          ? value[list[parentIndex - 1][index]?.name]?.every(
              (item: ValueObj) => item.startTime && item.endTime,
            )
          : value[list[parentIndex - 1][index]?.flag];
      }
      return value[list[parentIndex][index]?.flag] === undefined
        ? value[list[parentIndex][index]?.name]?.every(
            (item: ValueObj) => item.startTime && item.endTime,
          )
        : value[list[parentIndex][index]?.flag];
    },
    [value],
  );

  const handleDateChange = (value: ValueObj[], others: any) => {
    const { index, type, name, parentIndex } = others;
    const list = optionListRef.current[parentIndex].slice();
    list[index] = { ...list[index], [type]: value };
    optionListRef.current[parentIndex] = list;
    // setOptions(list);
    onChange(
      name,
      list.map((item: ValueObj) => {
        return {
          endTime: item.endTime,
          startTime: item.startTime,
        };
      }),
    );
  };

  const addbtn = (name: string, itemProps: ValueObj, parentIndex: number) => {
    const list = optionListRef.current[parentIndex].slice();
    list.push(itemProps);
    optionListRef.current[parentIndex] = list;
    // setOptions(list);
    onChange(
      name,
      list.map((item: ValueObj) => {
        return {
          endTime: item.endTime,
          startTime: item.startTime,
        };
      }),
    );
  };

  const deletebtn = (index: number, name: string, parentIndex: number) => {
    const list = [
      ...optionListRef.current[parentIndex].slice(0, index),
      ...optionListRef.current[parentIndex].slice(index + 1),
    ];
    onChange(
      name,
      list.map((item: ValueObj) => {
        return {
          endTime: item.endTime,
          startTime: item.startTime,
        };
      }),
    );
    optionListRef.current[parentIndex] = list;
    // setOptions(list);
  };

  const getDisable = useCallback(
    (index: number) => {
      return optionListRef.current[index]?.every(
        (item: ValueObj) => item.startTime && item.endTime,
      );
    },
    [optionListRef],
  );
  const getbtnDisabled = useCallback(
    (name) => {
      return value?.[name]?.every(
        (item: ValueObj) => item.startTime && item.endTime,
      );
    },
    [value],
  );

  const getUserbtnDisabled = useCallback(
    (name) => {
      return (
        !!value?.schoolSecurityReportPushTimeListFlag &&
        value?.[name]?.every((item: ValueObj) => item.startTime && item.endTime)
      );
    },
    [value],
  );

  const _props = useMemo(() => {
    return {
      ..._selectUserProps,
      btnText: '选择接收人',
      resultTitle: '接收人',
      selectUserProps: {
        ..._selectUserProps?.selectUserProps,
        selectSignature: _selectSignature,
      },
    };
  }, [_selectUserProps, value]);

  // schoolSecurityReportPushTimeListFlag
  // const flag = useMemo(() => {
  //   return value?.securityReportPushDeptListFlag || false;
  // }, [value]);

  // const checked = optionListRef.current[0]?.checked;
  return (
    <>
      {timeProps.map((parentItem: BaseItem, parentIndex: number) => {
        const {
          name,
          itemProps,
          checkboxlabel,
          addName,
          desc,
          marginTop = 0,
          label,
        } = parentItem;
        const checked = optionListRef.current[parentIndex][0]?.checked;
        return (
          <div className="item" key={parentIndex} style={{ marginTop }}>
            {checkboxlabel && (
              <>
                <div className="checkbox">
                  <Checkbox
                    checked={checked}
                    onChange={(e) =>
                      onChangeChecked(e.target.checked, name, parentIndex)
                    }
                    disabled={
                      checkLinkFlag
                        ? parentIndex === 1
                          ? !getDisable(parentIndex - 1)
                          : !switchdisabled
                        : !switchdisabled
                    }
                  >
                    <span className="check-label">{checkboxlabel}</span>
                  </Checkbox>
                </div>
                <div className="text">{desc}</div>
              </>
            )}

            <div className="value">
              {label && <div className="label">{label}</div>}
              <div className="list">
                {optionListRef.current[parentIndex].map(
                  (item: ValueObj, index: number) => {
                    const Com = getComByUiType(item.uiType, comsMap);
                    const _parent = optionListRef.current[parentIndex];
                    return (
                      <div key={index} className="time-item">
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
                            const timeArr =
                              _parent[index - 1].endTime.split(':');
                            const minutes = [];
                            // tslint:disable-next-line: radix
                            if (selectedHour === parseInt(timeArr[0])) {
                              // tslint:disable-next-line: radix
                              for (
                                let i = 0;
                                i < parseInt(timeArr[1]) + 1;
                                i++
                              ) {
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
                          parentIndex={parentIndex}
                          width={190}
                          type="startTime"
                          onChange={handleDateChange}
                          disabled={
                            parentIndex !== 0
                              ? !checked
                              : !checked || !switchdisabled
                          }
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
                              for (
                                let i = 0;
                                i < parseInt(timeArr[1]) + 1;
                                i++
                              ) {
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
                          parentIndex={parentIndex}
                          type="endTime"
                          onChange={handleDateChange}
                          disabled={
                            parentIndex !== 0
                              ? !item.startTime || !checked
                              : !item.startTime || !checked || !switchdisabled
                          }
                        />

                        {optionList[parentIndex].length > 1 && (
                          <Popconfirm
                            // getPopupContainer={() => document.getElementById(name)}
                            overlayClassName="v4"
                            placement="top"
                            title="确定删除吗"
                            onConfirm={() =>
                              deletebtn(index, item.name, parentIndex)
                            }
                            okText="确认"
                            cancelText="取消"
                          >
                            <div className="timepicker-delete">删除</div>
                          </Popconfirm>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
            <div
              className="add-btn"
              style={{ marginLeft: label ? '108px' : '0' }}
            >
              <Button
                style={{ marginBottom: label ? '16px' : '24px' }}
                disabled={!getbtnDisabled(name)}
                onClick={() => addbtn(addName, itemProps, parentIndex)}
              >
                新增
              </Button>
            </div>
          </div>
        );
      })}
      {
        selectUserVisible && null
        // <UserResult
        //   className="abdd"
        //   {..._props}
        //   btnDisiabled={!getUserbtnDisabled('schoolSecurityReportPushTimeList')}
        //   btnDisabled={!getUserbtnDisabled('schoolSecurityReportPushTimeList')}
        // />
      }
      {selectUserVisible && (
        <div className="check-label-desc">
          说明：被选中的接收人员将接收到汇总安全报告
        </div>
      )}
    </>
  );
}

// 记录推送
export function SwitchCheckBoxRangePicker(props: any) {
  const {
    onChange,
    value,
    timeProps,
    clockLaterSettingChange,
    name,
    _selectUserProps,
    handleOk = () => {},
    desc,
    synchronizationToFromValue = false,
    selectUserVisible = false,
    checkLinkFlag = false,
    switchVisible = true,
    marginTop = 0,
  } = props;

  const handleCheckboxGroupChange = (_name: string, array: ValueObj[]) => {
    if (synchronizationToFromValue) {
      onChange({ ...value, [_name]: array });
    } else {
      clockLaterSettingChange &&
        clockLaterSettingChange({ ...value, [_name]: array });
    }
  };

  const handleSwitchSelectChange = (checkd: boolean) => {
    clockLaterSettingChange &&
      clockLaterSettingChange({ ...value, [name]: checkd });
  };

  const onChangeChecked = (checkd: boolean, name: string) => {
    clockLaterSettingChange &&
      clockLaterSettingChange({
        ...value,
        [`${name}Flag`]: checkd,
      });
  };

  const Com = getComByUiType(props.uiType, comsMap);
  return (
    <div className="switch-checkbox-input" style={{ marginTop }}>
      {switchVisible && (
        <Com
          value={value ? value.clockRecordPush : ''}
          onChange={handleSwitchSelectChange}
        />
      )}
      <div className="data-box">
        <CheckBoxRangePicker
          switchdisabled={value ? value.clockRecordPush : false}
          clockLaterSettingChange={clockLaterSettingChange}
          onChangeChecked={onChangeChecked}
          _selectUserProps={_selectUserProps}
          checkLinkFlag={checkLinkFlag}
          selectUserVisible={selectUserVisible}
          onChange={handleCheckboxGroupChange}
          handleOk={handleOk}
          value={value}
          timeProps={cloneDeep(timeProps)}
        />
      </div>
      {desc && <div className="check-label-desc">{desc}</div>}
    </div>
  );
}

export function SwitchDate(props: any) {
  const { value, clockLaterSettingChange, marginTop = 0 } = props;
  const handleChange = (checked: boolean) => {
    clockLaterSettingChange &&
      clockLaterSettingChange({ ...value, clockReportPush: checked });
  };

  const handleDateChange = (time: any) => {
    clockLaterSettingChange && clockLaterSettingChange({ ...value, time });
  };
  const Com = getComByUiType(props.uiType, comsMap);
  return (
    <div className="switch-checkbox-input" style={{ marginTop }}>
      <Com value={value ? value.clockReportPush : ''} onChange={handleChange} />
      <div className="text">{props.text}</div>
      {props.options.map((item: any, index: number) => {
        const TimePick = getComByUiType(item.uiType, comsMap);
        return (
          <div className="data-box flex-align-center" key={index}>
            <span className="check-label">{item.beforelabel}</span>
            <span className="margin-left-right">
              <div className="item">
                <div className="value">
                  <TimePick
                    value={value ? value.time : null}
                    format="HH:mm"
                    locale={locale}
                    onChange={handleDateChange}
                    disabled={value ? !value.clockReportPush : true}
                  />
                </div>
              </div>
            </span>
            <span className="check-label">{item.afterlabel}</span>
          </div>
        );
      })}
    </div>
  );
}

export function CustomeSwitch() {
  const [switchdisabled, setDisabled] = useState<boolean>(false);
  const onChange = (checked: boolean) => {
    setDisabled(checked);
  };
  return <Switch checked={switchdisabled} onChange={onChange} />;
}

export function SpecialTable(props: any) {
  console.log(props);

  const { tableProps } = props;
  const Com = getComByUiType(props.uiType, comsMap);
  return (
    <div>
      <div>
        {tableProps?.tableSource?.length > 0 && (
          <>
            <Table
              {...tableProps}
              primaryKey={tableProps?.primaryKey}
              hasBorder={tableProps?.hasBorder}
              columns={tableProps?.columns}
              dataSource={tableProps?.tableSource || []}
              scroll={{ x: '1500' }}
            />
            <div className="table-text">
              说明：可以设置非常规上学日，例如节假日前后的调课等
            </div>
          </>
        )}
      </div>
      <div>
        <Com
          {...props}
          text={tableProps?.tableSource?.length > 0 ? '添加' : props.text}
        />
        {!(tableProps?.tableSource?.length > 0) && (
          <div className="table-text">
            说明：可以设置非常规上学日，例如节假日前后的调课等
          </div>
        )}
      </div>
    </div>
  );
}

export function NocheckDateTable(props: any) {
  const { tableProps } = props;
  const Com = getComByUiType(props.uiType, comsMap);
  return (
    <div>
      <div>
        {tableProps?.tableSource?.length > 0 && (
          <>
            <Table
              {...tableProps}
              primaryKey={tableProps?.primaryKey}
              hasBorder={tableProps?.hasBorder}
              columns={tableProps?.columns}
              dataSource={tableProps?.tableSource}
              scroll={{ x: '1500' }}
            />
            <div className="table-text">说明：可以设置节假日与寒暑假等</div>
          </>
        )}
      </div>
      <div>
        <Com
          {...props}
          text={tableProps?.tableSource?.length > 0 ? '添加' : props.text}
        />
        {!(tableProps?.tableSource?.length > 0) && (
          <div className="table-text">说明：可以设置节假日与寒暑假等</div>
        )}
      </div>
    </div>
  );
}

export function StationSelector(props: any) {
  const Com = getComByUiType(props.uiType, comsMap);
  const { settings } = props;
  return (
    <>
      {settings.length === 0 ? (
        <div className="nodept">
          <div className="notext">暂无岗位</div>
          <div style={{ marginBottom: 15 }}>
            <Com {...props} text={props.text} />
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: 20 }}>
          <Com {...props} text={props.text} buttonProps={{ type: 'default' }} />
        </div>
      )}
    </>
  );
}

export function Address(props: any) {
  const { tableProps } = props;
  const Com = getComByUiType(props.uiType, comsMap);
  return (
    <div>
      <div>
        {tableProps.tableSource.length > 0 && (
          <Table
            {...tableProps}
            primaryKey={tableProps?.primaryKey}
            hasBorder={tableProps?.hasBorder}
            columns={tableProps?.columns}
            dataSource={tableProps?.tableSource}
          />
        )}
      </div>
      <div>
        <Com {...props} />
      </div>
    </div>
  );
}

export function SelectCheckbox(props: any) {
  const { checkboxProps, selectProps, onChangeSelect, value } = props;
  const { options, text, onCheckGropuChange } = checkboxProps;
  const [data, setData] = useState(value);
  const Com = getComByUiType(props.uiType, comsMap);
  const plainOptions = options;
  const handleCheckboxGroupChange = (checked: any) => {
    setData((value: any) => {
      onCheckGropuChange({ ...value, dayListInWeek: checked });
      return { ...value, dayListInWeek: checked };
    });
  };

  const handleSelectChange = (checkRuleType: any) => {
    setData((value: any) => {
      onChangeSelect({ ...value, checkRuleType });
      return { ...value, checkRuleType };
    });
  };

  useEffect(() => {
    setData(value);
  }, [value]);

  return (
    <div className="switch-checkbox-input">
      <Com
        {...selectProps}
        value={data ? data.checkRuleType : ''}
        onChange={handleSelectChange}
        width="802px"
      />
      <div className="text">{props.text}</div>
      <div className="marginTb5">
        <Checkbox.Group
          value={data ? data.dayListInWeek : []}
          options={plainOptions}
          onChange={handleCheckboxGroupChange}
        />
      </div>
      <div className="text">{text}</div>
    </div>
  );
}

export function CheckGroupList(props: any) {
  const {
    dataSource,
    onChange,
    className = '',
    value,
    marginTop = 0,
    selectSignature,
    handleOk,
    handleListChange,
    text,
  } = props;
  const [_selectSignature, setselectSignature] = useState(selectSignature);
  const handleCheckboxGroupChange = (checkedValues: any) => {
    handleListChange && handleListChange(checkedValues);
    onChange(checkedValues);
  };
  useEffect(() => {
    if (selectSignature) {
      setselectSignature(selectSignature);
    }
  }, [selectSignature]);

  const flag = useMemo(() => {
    return value?.indexOf('abnormalSchoolTeacher') > -1 || false;
  }, [value]);

  const _props = useMemo(() => {
    return {
      selectUserProps: {
        multiple: true,
        showTabList: ['innerContacts'],
        selectType: 'user',
        unCheckableNodeType: ['ORG'],
        dialogProps: {
          title: '选人员',
        },
        searchPlaceholder: '搜索姓名、手机号码',
        selectSignature: _selectSignature,
        onlyLeafCheckable: true,
        isSaveSelectSignature: true,
        requestParams: {
          // campusType: 'base_school_type',
          // selectTypeList: ['dept'],
          selectTypeList: ['user'],
          // deptTypeList: ['class']
        },
      },
      onChange: (...args: any) => {
        handleOk(...args);
      },
    };
  }, [_selectSignature]);

  return (
    <div className="switch-checkbox-input" style={{ marginTop }}>
      <Checkbox.Group
        className={className}
        value={value}
        options={dataSource}
        onChange={handleCheckboxGroupChange}
      />

      {text && <div className="text">{text}</div>}
    </div>
  );
}
// 两个Input
export function SwitchCheckBoxInput(props: any) {
  const {
    onChange,
    text,
    visible = false,
    desc,
    marginTop = 0,
    label,
    value,
    name,
    options,
    clockLaterSettingChange,
    ...others
  } = props;
  const [optionList, setOptions] = useState(options);
  const optionListRef = useRef<any>(options);

  const onInputChange = (inputValue: number, index: number, name: string) => {
    clockLaterSettingChange &&
      clockLaterSettingChange({
        ...value,
        [name]: inputValue,
      });
  };
  const onChangeChecked = (checked: boolean, index: number, name: string) => {
    clockLaterSettingChange &&
      clockLaterSettingChange({
        ...value,
        [`${name}Flag`]: checked,
      });
  };

  const handleSwitchSelectChange = (checked: any) => {
    if (!checked) {
      const list = optionListRef.current.slice();
      const object = list
        .map((item) => {
          return item.name;
        })
        .reduce((pre, next) => {
          return {
            [pre]: value[pre],
            [`${pre}Flag`]:
              value[`${pre}Flag`] === undefined
                ? !!value[pre]
                : value[`${pre}Flag`],
            [next]: value[next],
            [`${next}Flag`]:
              value[`${next}Flag`] === undefined
                ? !!value[next]
                : value[`${next}Flag`],
          };
        });
      clockLaterSettingChange &&
        clockLaterSettingChange({ ...object, [name]: checked });
    } else {
      clockLaterSettingChange &&
        clockLaterSettingChange({ ...value, [name]: checked });
    }
  };

  useEffect(() => {
    if (value) {
      for (const [k, v] of Object.entries(value)) {
        const index = optionListRef.current.findIndex(
          (item: any) => item.name === k,
        );
        if (index > -1) {
          const list = optionListRef.current.slice();
          if (
            value[list[index]?.flag] === undefined &&
            value[list[index]?.name]
          ) {
            clockLaterSettingChange({
              ...value,
              [list[index]?.flag]: true,
            });
          }
          list[index] = {
            ...list[index],
            checked:
              value[list[index]?.flag] === undefined
                ? !!value[list[index]?.name]
                : value[list[index]?.flag],
            value: value[list[index]?.name],
          };
          optionListRef.current = list;
          setOptions(list);
        }
      }
    }
    onChange(value);
  }, [value]);
  const Com = getComByUiType(props.uiType, comsMap);
  const switchdisabled = !visible ? true : (value && value[name]) || false;
  return (
    <div className="switch-checkbox-input" style={{ marginTop }}>
      {visible && (
        <Com
          value={value ? value[name] : false}
          checked={value ? value[name] : false}
          onChange={handleSwitchSelectChange}
        >
          <span className="check-label">{label}</span>
        </Com>
      )}
      {text && <div className="text">{text}</div>}
      <div className="box">
        {optionList.map((item: any, index: number) => {
          return (
            <CheckBoxInput
              key={index}
              visible={visible}
              index={index}
              switchdisabled={switchdisabled}
              onChange={onInputChange}
              onChangeChecked={onChangeChecked}
              item={item}
              {...others}
            />
          );
        })}
        {desc && (
          <div className="item">
            <span className="check-label-desc">{desc}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function KqObject(props: any) {
  const { text, _selectUserProps, selectSignature } = props;
  const [_selectSignature, setselectSignature] = useState(selectSignature);

  useEffect(() => {
    if (selectSignature) {
      setselectSignature(selectSignature);
    }
    setselectSignature(selectSignature);
  }, [selectSignature]);

  const _props = useMemo(() => {
    return {
      ..._selectUserProps,
      selectUserProps: {
        ..._selectUserProps.selectUserProps,
        selectSignature: _selectSignature,
      },
    };
  }, [_selectSignature]);
  return (
    <div>
      <div>
        <UserResult {..._props} />
        {text && <div className="kqobject">{text}</div>}
      </div>
    </div>
  );
}

export function SelectUserCom(props: any) {
  const { text, _selectUserProps, value, name, _onChange } = props;
  const [_selectSignature, setselectSignature] = useState(null);

  useEffect(() => {
    if (value && value[name]) {
      setselectSignature(value[name]);
    }
  }, [value]);

  const _props = useMemo(() => {
    return {
      ..._selectUserProps,
      selectUserProps: {
        ..._selectUserProps.selectUserProps,
        selectSignature: _selectSignature,
      },
      onChange: (...args: any) => {
        const { deptInfoList } = args[0];
        const selectId = args[0].selectSignature;
        _onChange &&
          _onChange({
            deptInfoList,
            selectId,
          });
        // setStepReleaseData({
        //   ...formData,
        //   deptInfoList: args[0].deptInfoList,
        //   selectId: args[0].selectSignature
        // });
      },
    };
  }, [_selectSignature]);
  if (!value) {
    return null;
  }
  return (
    <div>
      <div>
        <UserResult {..._props} />
        {text && <div className="kqobject">{text}</div>}
      </div>
    </div>
  );
}

export function codeToText(props: any) {
  const { value } = props;
  return <div>{Number(value)}</div>;
}

export function CustomContentSetting(props: any) {
  console.log(props, 'props');
  const { itemProps, value, pushTemplatesChange } = props;
  const RadioCom = getComByUiType('radio', comsMap);
  const handleChange = (name: any, data: any, index: number) => {
    console.log(name, data, index);
    const list = value.slice();
    list[index] = { ...list[index], [name]: data };
    pushTemplatesChange(list);
  };

  const debounced = debounce((name, value, index) => {
    handleChange(name, value, index);
  }, 1000);

  return (
    <div className="content-box">
      {itemProps.map((item: any, index: number) => {
        const SelectCom = getComByUiType(item.timeBox.uiType, comsMap);

        return (
          <div key={item.name} className="content-itembox">
            <Tag color="#E2F1FF">{item.label}</Tag>
            <div className="content-item-bottom-box">
              <div className="content-item-left">
                <div className="item-left-flex">
                  <span className="title-box">{item.timeBox.label}：</span>{' '}
                  <SelectCom
                    {...item.timeBox.props}
                    value={
                      value?.length > 0 ? value[index][item.timeBox.name] : null
                    }
                    onChange={(data: any) =>
                      handleChange(item.timeBox.name, data, index)
                    }
                    width="320px"
                  />
                </div>
                <div className="item-left-flex">
                  <span className="title-box">{item.textBox.label}：</span>
                  <TextArea
                    defaultValue={
                      value?.length > 0 ? value[index][item.textBox.name] : null
                    }
                    onChange={(e) =>
                      debounced(item.textBox.name, e.target.value, index)
                    }
                    maxLength={10}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </div>
                <div className="item-left-flex">
                  <span className="title-box">{item.radioBox.label}：</span>
                  <RadioCom
                    {...item.radioBox.props}
                    value={
                      value?.length > 0
                        ? value[index][item.radioBox.name]
                        : null
                    }
                    // {...itemProps}
                    onChange={(e) =>
                      handleChange(item.radioBox.name, e.target.value, index)
                    }
                  />
                </div>
              </div>
              <div className="content-item-right">
                <span className="title-box">预览：</span>
                <div className="item-right-box">
                  <div className="content-item-right-top">
                    <div>
                      <p
                        style={{
                          width:
                            value.length > 0
                              ? value[index].displayImage === 1
                                ? '91px'
                                : 'auto'
                              : '91px',
                        }}
                      >
                        {value.length > 0
                          ? value[index].timeTemplate === '时分'
                            ? '09点30分'
                            : '09:30'
                          : '09点30分'}{' '}
                        李小明从学校东门
                        {value.length > 0
                          ? value[index].msgTemplate
                          : item.label}
                        打卡
                      </p>
                      <p>考勤信息播报</p>
                    </div>
                  </div>
                  <div className="content-item-right-bottom">
                    <span>详情</span>
                    <RightOutlined style={{ color: '#C7C7CC' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
