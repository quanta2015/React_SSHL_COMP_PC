import React, { useCallback, useEffect, useState } from 'react';
import { Form, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { getComByUiType } from '@/components/compose-form/helper';
import useRequest from '@/common/use-request';
import { CFFormItemInternalProps } from './interface';

export default function CFFormItem(componentProps: CFFormItemInternalProps) {
  const {
    uiType = 'text',
    name,
    index,
    props,
    tooltip,
    label,
    info,
    errors,
    visibleOn,
    source,
    newSourceParams,
    externalComsMap,
    form,
    emitter,
    showableOn,
    ...formItemProps
  } = componentProps;
  const [visible, setVisible] = useState(
    visibleOn ? visibleOn(form.getFieldsValue()) : true,
  );
  // const [showable, setShowable] = useState(true);
  // TODO
  // useEffect(() => {
  //   setShowable(showableOn ? form.getFieldValue(showableOn.name) === showableOn.value : true);
  // }, [showableOn && form.getFieldValue(showableOn.name), form.getFieldValue(showableOn?.name)])

  const [sourceParam, setSourceParams] = useState<any>(source?.params);
  const [remoteSource, loading] = useRequest(
    visible && source ? { ...source, params: sourceParam || {} } : undefined,
    {},
    (data) => data?.dataSource,
  );

  // Fetch the props you want to inject. This could be done with context instead.
  // const themeProps = useTheme();
  // debugger;
  const onComponentChange = useCallback(() => {
    emitter.dispatch('change');
    // console.log('onChange', form.getFieldsValue());
  }, []);

  const selfRefresh = useCallback(() => {
    const formValue = form.getFieldsValue();
    let nextVisible = visible;
    if (visibleOn) {
      nextVisible = visibleOn(formValue);
      setVisible(nextVisible);
    }

    if (nextVisible && newSourceParams) {
      setSourceParams(newSourceParams(formValue));
    }
  }, [form, visibleOn, newSourceParams]);

  useEffect(() => {
    if (!visibleOn && !newSourceParams) {
      return;
    }

    selfRefresh();
    emitter.subscribe('change', selfRefresh);

    // const { visibleOn } = componentProps;

    if (visibleOn) {
      emitter.subscribe('visionchange', selfRefresh);
    }
  }, []);

  // const changeFormValue = useCallback(
  //   (formValue: any) => {
  //     form.setFieldsValue(formValue);
  //   },
  //   [form]
  // );

  // 获取组件类型，并设置相关Props
  const Com = getComByUiType(uiType, externalComsMap);
  const comProps = { ...props };

  // console.log(uiType, 'uiType', comProps)
  if (source) {
    comProps.loading = loading;
    comProps.dataSource = remoteSource;
  }

  return visible ? (
    <Form.Item
      className="cf-form-item"
      name={name}
      key={name || index}
      {...formItemProps}
      label={
        !!label && (
          <>
            {label}
            {!!tooltip && (
              <Tooltip title={tooltip}>
                &nbsp;
                <QuestionCircleOutlined />
              </Tooltip>
            )}
          </>
        )
      }
    >
      <Com {...comProps} onChange={onComponentChange} />
    </Form.Item>
  ) : null;
}
