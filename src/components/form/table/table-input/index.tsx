import React, { useEffect, useState, useCallback } from 'react';
import moment from 'dayjs';
import { Card, TimePicker, Checkbox, Button, Popconfirm } from 'antd';
import { cloneDeep } from 'lodash';
// @ts-ignore
import './index.less';

let timeStamp = Date.now();
export function getUid(): string {
  return `${(timeStamp += 1)}`;
}

export interface CheckboxWithSelectProps {
  options?: any;
  name?: string;
  value?: any;
  onChange?: (value: any) => void;
}

const _itemProps = {
  key: getUid(),
  markTime: {
    options: [
      {
        three: ''
      },
      {
        three: ''
      }
    ]
  },
  clockTime: {
    options: [
      {
        first: '',
        second: ''
      },
      {
        first: '',
        second: ''
      }
    ]
  },
  clock: {
    options: [
      {
        checked: false,
        disabled: false
      },
      {
        checked: false,
        disabled: false
      }
    ]
  }
};

// function RenderTimePickerFirst(props: any) {
//   const { item, onChange, parentKey, parentIndex, index, options } = props;
//   const { three } = item;
//   const handleChange = (
//     item: any,
//     type: string,
//     value: string,
//     parentKey: string,
//     parentIndex: number,
//     index: number
//   ) => {
//     onChange(item, type, value, parentKey, parentIndex, index);
//   };
//   return (
//     <div>
//       <TimePicker
//         // disabled={first === 'three' || first === 'five'}
//         // getPopupContainer={() => document.getElementById('date-and-time')}

//         disabledHours={() => {
//           const hours = [];
//           if (!options) {
//             return [];
//           }
//           const time = options.three;
//           const timeArr = time.split(':');
//           // tslint:disable-next-line: radix
//           for (let i = 0; i < parseInt(timeArr[0]); i++) {
//             hours.push(i);
//           }
//           return hours;
//         }}
//         disabledMinutes={(selectedHour: any) => {

//           if (!options) {
//             return [];
//           }
//           const timeArr = options.three.split(':');
//           const minutes = [];

//           // tslint:disable-next-line: radix
//           if (selectedHour === parseInt(timeArr[0])) {
//             // tslint:disable-next-line: radix
//             for (let i = 0; i < parseInt(timeArr[1]) + 1; i++) {
//               minutes.push(i);
//             }
//           }
//           return minutes;
//         }}
//         value={three ? moment(three, 'HH:mm') : null}
//         onChange={time =>
//           handleChange(
//             item,
//             'three',
//             moment(time).format('HH:mm'),
//             parentKey,
//             parentIndex,
//             index
//           )
//         }
//         format="HH:mm"
//         style={{ width: 90 }}
//         allowClear={false}
//         placeholder="请选择"
//       />
//     </div>
//   );
// }

function RenderTimePicker(props: any) {
  const {
    item,
    parentIndex,
    parentKey,
    index,
    onChange,
    options,
    data
  } = props;
  const { first, second } = item;

  return (
    <div>
      <TimePicker
        // getPopupContainer={() => document.getElementById('date-and-time')}
        value={first ? moment(first, 'HH:mm') : null}
        // value={
        //   first
        //     ? moment(first, 'HH:mm')
        //     : !!three
        //     ? moment(three, 'HH:mm')
        //     : null
        // }
        disabledHours={() => {
          if (index === 0) {
            return [];
          }
          const hours = [];
          const time = data.options[0].second;
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
          const timeArr = data.options[0].second.split(':');
          const minutes = [];
          // tslint:disable-next-line: radix
          if (selectedHour === parseInt(timeArr[0])) {
            // tslint:disable-next-line: radix
            for (let i = 0; i <= parseInt(timeArr[1]); i++) {
              minutes.push(i);
            }
          }
          return minutes;
        }}
        onChange={time =>
          onChange(
            item,
            'first',
            moment(time).format('HH:mm'),
            parentKey,
            parentIndex,
            index
          )
        }
        format="HH:mm"
        style={{ width: 90 }}
        allowClear={false}
        placeholder="请选择"
      />
      <span className="split">至</span>
      <TimePicker
        // getPopupContainer={() => document.getElementById('date-and-time')}
        disabledHours={() => {
          if (!options) {
            return [];
          }
          const hours = [];
          const time = options.first;
          const timeArr = time.split(':');
          // tslint:disable-next-line: radix
          for (let i = 0; i < parseInt(timeArr[0]); i++) {
            hours.push(i);
          }
          return hours;
        }}
        disabledMinutes={(selectedHour: any) => {
          if (!options) {
            return [];
          }
          const timeArr = options.first.split(':');
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
        value={second ? moment(second, 'HH:mm') : null}
        onChange={time =>
          onChange(
            item,
            'second',
            moment(time).format('HH:mm'),
            parentKey,
            parentIndex,
            index
          )
        }
        format="HH:mm"
        allowClear={false}
        style={{ width: 90 }}
        placeholder="请选择"
      />
    </div>
  );
}

export default (props: any) => {
  const {
    onChange,
    options,
    onChangeCommonRule,
    beforeSubmit = false,
    text = ['上下班时间', '打卡时间范围', '是否打卡', '上班', '下班', '打卡']
  } = props;
  const [data, setDateList] = useState<any>(options);
  useEffect(() => {
    setDateList(options);
  }, [options]);

  useEffect(() => {
    beforeSubmit && onChange(data);
    // onChangeCommonRule && onChangeCommonRule(data);
  }, [data]);

  const renderCardTitle = () => {
    return (
      <div className="list-wrap header">
        <div className="order">{text[0]}</div>
        <div className="into-time">{text[1]}</div>
        <div className="into-opt">{text[2]}</div>
        <div className="into-opt">操作</div>
      </div>
    );
  };

  const addList = () => {
    const nextItemProps = cloneDeep(_itemProps);
    setDateList((item: any) => {
      onChangeCommonRule && onChangeCommonRule([...item, nextItemProps]);
      return [...item, nextItemProps];
    });
  };
  const deleteList = (index: number) => {
    const nextData = [...data.slice(0, index), ...data.slice(index + 1)];
    onChangeCommonRule && onChangeCommonRule(nextData);
    setDateList(nextData);
  };

  const DomNull = useCallback(
    (parentIndex: number) => {
      if (!data) {
        return null;
      }
      if (data.length === 1) {
        return null;
      }
      return (
        <Popconfirm
          overlayClassName="v4"
          placement="topLeft"
          title="你确定删除吗？"
          onConfirm={() => deleteList(parentIndex)}
          okText="确认"
          cancelText="取消"
        >
          <span className="deletebtn">删除</span>
        </Popconfirm>
      );
    },
    [data]
  );

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (
    item: any,
    type: string,
    value: any,
    parentKey: string,
    parentIndex: number,
    index: number
  ) => {
    setDateList((state: any) => {
      state[parentIndex][parentKey].options[index] = {
        ...state[parentIndex][parentKey].options[index],
        ...item,
        [type]: value
      };
      return [...state];
    });

    onChangeCommonRule && onChangeCommonRule(data);
  };

  return (
    <div className="content-wrap">
      <Card title={renderCardTitle()}>
        <div>
          {data &&
            data.map((arr: any, parentIndex: number) => {
              return (
                <div key={parentIndex} className="list-wrap">
                  <div className="order">
                    <div className="xuhao">{`第${parentIndex + 1}次`}</div>
                    <div className="first-col">
                      {arr?.markTime?.options?.map(
                        (item: any, index: number) => {
                          return (
                            <div className="col" key={`first-time-key${index}`}>
                              {/* <span>{index === 0 ? text[3] : text[4]}</span>
                              <RenderTimePickerFirst
                                key={index}
                                item={item}
                                options={
                                  index === 0
                                    ? null
                                    : data[parentIndex].markTime.options[0]
                                }
                                // options={
                                //   parentIndex === 0 && index === 0
                                //     ? null
                                //     : index === 0
                                //     ? data[
                                //         parentIndex === 0
                                //           ? parentIndex
                                //           : parentIndex - 1
                                //       ].markTime.options[1]
                                //     : data[parentIndex].markTime.options[0]
                                // }
                                parentKey="markTime"
                                parentIndex={parentIndex}
                                index={index}
                                onChange={handleChange}
                              /> */}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                  <div className="into-time">
                    {arr?.clockTime?.options?.map(
                      (item: any, index: number) => {
                        return (
                          <div className="col" key={`time-key-${index}`}>
                            <RenderTimePicker
                              three={arr?.markTime?.options[index].three}
                              key={index}
                              item={item}
                              data={data[parentIndex].clockTime}
                              options={
                                index === 0
                                  ? data[parentIndex].clockTime.options[0]
                                  : data[parentIndex].clockTime.options[1]
                              }
                              // options={
                              //   parentIndex === 0 && index === 0
                              //     ? null
                              //     : index === 0
                              //     ? data[
                              //         parentIndex === 0
                              //           ? parentIndex
                              //           : parentIndex - 1
                              //       ].clockTime.options[1]
                              //     : data[parentIndex].clockTime.options[0]
                              // }
                              parentKey="clockTime"
                              parentIndex={parentIndex}
                              index={index}
                              onChange={handleChange}
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                  <div className="into-opt">
                    {arr?.clock?.options?.map((item: any, index: number) => {
                      return (
                        <div key={index} className="col">
                          <Checkbox
                            checked={
                              parentIndex === 0 && index === 0
                                ? true
                                : item.checked
                            }
                            disabled={
                              parentIndex === 0 && index === 0
                                ? true
                                : item.disabled
                            }
                            onChange={(e: any) =>
                              handleChange(
                                item,
                                'checked',
                                e.target.checked,
                                'clock',
                                parentIndex,
                                index
                              )
                            }
                          >
                            {text[5]}
                          </Checkbox>
                        </div>
                      );
                    })}
                  </div>

                  <div className="into-opt">{DomNull(parentIndex)}</div>
                </div>
              );
            })}
          <div className="list-wrap add-list">
            <div onClick={addList}>
              <Button>新增</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
