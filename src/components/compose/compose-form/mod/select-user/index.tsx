import React, { useCallback, useState, useEffect } from 'react';
import { Input, Select } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { LabeledValue } from 'antd/lib/select';
import SelectUser from 'select-ss-user';
import {
  Value as SelectUserValueProps,
  SelectUserFuncArgProps,
  IlistItem as ValueItem,
} from 'select-ss-user/lib/components/select-user/interface';
import url from '@/common/service-utils';
import request from '@/common/fileRequest';

export interface PropTypes {
  value?: ValueItem | ValueItem[];
  selectUserProps: Omit<SelectUserFuncArgProps, 'onOk' | 'onCancel'>;
  onChange?: (val: any) => void;
  // 获取 info 的 key，如果设置了，则会自动将值回填到选人组件中，否则不回填
  wrapperKey?: string;
}

export default ({
  value,
  onChange,
  wrapperKey,
  selectUserProps,
}: PropTypes) => {
  const { multiple, isSaveSelectSignature } = selectUserProps || {};
  const [options, setOptions] = useState<LabeledValue[]>([]);
  const [arrayValue, setArrayValue] = useState([]);
  useEffect(() => {
    if (Array.isArray(value)) {
      setArrayValue(value.filter(({ id, name }) => id && name));
    } else if (value) {
      request(
        `${url.usercenter}/select/component/result?selectSignature=${value}`,
      ).then((data) => {
        const { userInfoList = [] } = data || [];
        const list = userInfoList;
        setArrayValue(userInfoList);
      });
    }
  }, [value]);
  // 复选场景：根据组件 value 生成 select 的下拉菜单和 value
  useEffect(() => {
    if (!multiple) return;
    setOptions(
      arrayValue.map(({ id, name }) => {
        return { label: name, value: id };
      }),
    );
  }, [arrayValue, multiple]);

  const handleSelectChange = useCallback(
    (nextSelectVal: LabeledValue[]) => {
      onChange(
        (nextSelectVal || []).map(({ label, value }) => ({
          id: value,
          name: label,
        })),
      );
    },
    [onChange],
  );

  const removeInputValue = useCallback(
    (e) => {
      e?.stopPropagation();
      onChange(null);
      setArrayValue([{ name: '' }]);
    },
    [onChange],
  );

  const handleChange = useCallback(
    (val: SelectUserValueProps) => {
      // 整合所有的内容
      const mergedValue = [
        'userInfoList',
        'deptInfoList',
        'tagInfoList',
        'orgInfoList',
        'groupInfoList',
      ]
        .reduce((result, key) => {
          // @ts-ignore
          return result.concat(val[key] || []);
        }, [])
        .filter((_) => _);

      const sign = isSaveSelectSignature
        ? val.selectSignature
        : multiple
        ? mergedValue
        : mergedValue[0];

      onChange(sign);
    },
    [onChange],
  );
  const showSelectUser = useCallback(() => {
    SelectUser.show({
      defaultValue: wrapperKey ? { [wrapperKey]: arrayValue } : null,
      ...selectUserProps,
      onOk(val: SelectUserValueProps) {
        handleChange(val);
      },
    });
  }, [selectUserProps, wrapperKey, arrayValue]);
  return multiple ? (
    <div onClick={showSelectUser}>
      <Select
        mode="multiple"
        options={options}
        value={options}
        onChange={handleSelectChange}
        labelInValue
        disabled={selectUserProps?.disabled}
        showArrow={false}
        dropdownRender={() => null}
      />
    </div>
  ) : (
    <Input
      readOnly
      value={arrayValue[0]?.name}
      onClick={showSelectUser}
      addonAfter={<CloseCircleOutlined onClick={removeInputValue} />}
    />
  );
};
