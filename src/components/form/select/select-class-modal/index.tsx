/**
 * 选择班级弹层，受控显隐
 */
import React, { useEffect, useCallback } from 'react';
import { PropTypes, Value } from './interface';
import { Modal, Form, ConfigProvider } from 'antd';
import { get } from 'lodash';
import SelectUser from '@/components/compose-form/mod/select-user';
import locale from '@/common/locale';

export default ({
  selectDialogTitle = '批量调整班级',
  selectUserProps,
  onOk,
  onCancel,
  visible,
  value = {},
}: PropTypes) => {
  const [form] = Form.useForm();
  const handleOk = useCallback(async () => {
    // 校验表单
    try {
      await form.validateFields();
      const { baseSchoolDepts, ...others } = form.getFieldsValue();
      let _nextBaseSchoolDepts = baseSchoolDepts;
      if (baseSchoolDepts && !Array.isArray(baseSchoolDepts)) {
        _nextBaseSchoolDepts = [baseSchoolDepts];
      }
      await onOk({
        baseSchoolDepts: _nextBaseSchoolDepts,
        ...others,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('form valid error', e);
    }
  }, [form, onOk]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    onCancel();
  }, [form, onCancel]);

  useEffect(() => {
    if (!visible) return;
    const { baseSchoolDepts, customSchoolDepts } = value || {};
    form.setFieldsValue({ baseSchoolDepts, customSchoolDepts });
  }, [value, visible]);

  const formItemLayout = {
    labelCol: {
      xs: { span: 17 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 17 },
      sm: { span: 17 },
    },
  };

  const getSelectUserProps = useCallback(
    (campusType) => {
      return {
        ...(selectUserProps || {}),
        dialogProps: {
          title:
            campusType === 'custom_school_type'
              ? '自定义教育校区班级'
              : '基础教育校区班级',
          ...get(selectUserProps, 'dialogProps', {}),
        },
        selectPaneProps: {
          dept: {
            title: '班级',
          },
        },
        // 自定义校区可以多选，基础校区只能单选
        multiple: campusType === 'custom_school_type',
        selectType: 'dept',
        showTabList: ['schoolContacts'],
        isSaveSelectSignature: false,
        onlyLeafCheckable: true,
        searchPlaceholder: '请搜索班级名称',
        requestParams: {
          ...(selectUserProps?.requestParams || {}),
          campusType,
          selectTypeList: ['dept'],
          deptTypeList: [
            campusType === 'custom_school_type' ? 'custom_class' : 'class',
          ],
        },
      } as any;
    },
    [selectUserProps],
  );
  return (
    <ConfigProvider locale={locale}>
      <Modal
        onOk={handleOk}
        onCancel={handleCancel}
        visible={visible}
        title={selectDialogTitle}
      >
        <Form {...formItemLayout} form={form}>
          <Form.Item
            {...{
              name: 'baseSchoolDepts',
              label: '基础教育校区',
              help: '说明：面向 K12 学校，学段为幼儿园、小学、初中、高中的行政班级',
            }}
          >
            <SelectUser
              selectUserProps={getSelectUserProps('base_school_type')}
              wrapperKey="deptInfoList"
            />
          </Form.Item>
          <Form.Item
            {...{
              name: 'customSchoolDepts',
              label: '自定义教育校区',
              help: '说明：面向兴趣班、中高职、大学、培训机构、校友会等自定义班级',
            }}
          >
            <SelectUser
              selectUserProps={getSelectUserProps('custom_school_type')}
              wrapperKey="deptInfoList"
            />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export { PropTypes, Value };
