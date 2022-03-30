import React from 'react';
import { Input, Select } from 'antd';
import { uuid } from '@irim/saber';
import './index.less';

interface MulProps {
  select: {
    placeholder: string;
    options: { label: string; value: any }[]; // select的options列表
    defaultValue: any; // select默认初始选中值
  };
  input: {
    placeholder: string;
    max: number;
  };
  maxNum: number; // 最大行数限制
  onChange: (data: any) => void;
}

interface MulState {
  data: {
    uuid: string;
    inputValue: string;
    selectValue: string;
  }[];
}

class MultipleInputSelect extends React.Component<MulProps, MulState> {
  constructor(props: MulProps) {
    super(props);
    const { select } = props;
    this.state = {
      data: [
        {
          uuid: uuid(),
          inputValue: '',
          selectValue: select.defaultValue || '',
        },
      ],
    };
  }

  // 修改名称
  handleChangeInput = (e: any, index: number) => {
    const {
      target: { value },
    } = e;
    const { data: newData } = this.state;
    const { onChange } = this.props;
    newData[index].inputValue = value;
    this.setState({
      data: newData,
    });
    onChange(newData);
  };

  // 修改类型
  handleChangeSelect = (value: string, index: number) => {
    const { data: newData } = this.state;
    const { onChange } = this.props;
    newData[index].selectValue = value;
    this.setState({
      data: newData,
    });
    onChange(newData);
  };

  // 添加行
  handleAdd = () => {
    const { data: newData } = this.state;
    const { onChange, select } = this.props;
    newData.push({
      uuid: uuid(),
      inputValue: '',
      selectValue: select.defaultValue || '',
    });
    this.setState(
      {
        data: newData,
      },
      () => {
        const div = document.getElementById('mul_container');
        div.scrollTop = div.scrollHeight;
      },
    );
    onChange(newData);
  };

  // 删除行
  handleDel = (index: number) => () => {
    const { data: newData } = this.state;
    const { onChange } = this.props;
    newData.splice(index, 1);
    this.setState({
      data: newData,
    });
    onChange(newData);
  };

  render() {
    const { select, input, maxNum } = this.props;
    const { data } = this.state;

    return (
      <div id="mul_container" className="mul_container">
        {data.map((item: any, index: number) => (
          <div key={item.uuid} className="mul_container__row">
            <Input
              className="mul_container__row__input"
              placeholder={input.placeholder}
              value={item.inputValue}
              suffix={
                input.max ? (
                  <span style={{ color: '#00000040' }}>
                    {`${item.inputValue?.length || 0}/${input.max}`}
                  </span>
                ) : (
                  ''
                )
              }
              onChange={(e) => this.handleChangeInput(e, index)}
            />
            <Select
              className="mul_container__row__select"
              placeholder={select?.placeholder}
              options={select?.options || []}
              value={item.selectValue || undefined}
              onChange={(value) => this.handleChangeSelect(value, index)}
            />
            {data?.length > 1 ? (
              <div className="mul_container__row__del" onClick={this.handleDel(index)}>
                删除
              </div>
            ) : (
              <div className="mul_container__row__del" />
            )}
          </div>
        ))}
        {(!maxNum || data?.length < maxNum) && (
          <div className="mul_container__add" onClick={this.handleAdd}>
            添加
          </div>
        )}
      </div>
    );
  }
}

export default MultipleInputSelect;
