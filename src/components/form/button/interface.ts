import React, { ReactNode } from 'react';
import { ButtonProps } from 'antd/lib/button';
import { ModalProps } from 'antd/lib/modal';
import { Request } from '@/components/interface';
import { CFFormProps } from '@/components/compose-form';
import { PropTypes as BatchProps } from '@/components/import-and-export/interface';
// import { SelectUserFuncArgProps } from 'ss-select-user-v4.0/lib/components/select-user/interface';
import { PropTypes as SelectClassProps } from '@/components/select-class-modal';
import { PropTypes as UploadPropTypes } from '@/components/upload';

type BeforeClickOption = {
  terminate?: () => void;
};
export type BasePropTypes = {
  className?: string;
  // button 内容
  text: React.ReactNode;
  uiType?:
    | 'default'
    | 'link'
    | 'event'
    | 'request'
    | 'form'
    | 'selectUser'
    | 'selectClass'
    | 'a'
    | 'anchor'
    | 'upload'
    | 'download'
    | 'batch';
  // 是否要在点击前二次确认，如果为空，则表示不需要
  confirmBeforeClick?: {
    // 取消按钮文字
    cancelText?: string;
    // 垂直居中展示
    centered?: boolean;
    // 容器类名生成方法，优先级高于className
    renderClassName?: (data: any) => string;
    // 容器类名
    className?: string;
    // 内容生成方法，优先级高于content
    renderContent?: (data: any) => any;
    // 内容
    content?: React.ReactNode;
    // 点击蒙层是否允许关闭
    maskClosable?: boolean;
    // 确认按钮文字
    okText?: string;
    // 确认按钮类型
    okType?:
      | 'text'
      | 'link'
      | 'ghost'
      | 'danger'
      | 'default'
      | 'primary'
      | 'dashed'
      | undefined;
    // ok 按钮 props
    okButtonProps?: ButtonProps;
    // cancel 按钮 props
    cancelButtonProps?: ButtonProps;
    // 标题
    title?: string;
    // 宽度
    width?: string | number;
    // 设置 Modal 的 z-index
    zIndex?: number;
    icon?: ReactNode;
  };
  onBeforeClick?: (arg0: BeforeClickOption) => Promise<boolean>;
  onEmit?: (eventName: string, onEmit?: any) => void;
  buttonProps?: ButtonProps;
  // 额外的信息
  to?: any;
  additions?: any;
} & Pick<ButtonProps, 'onClick'>;

export type EventButtonProps = BasePropTypes & {
  eventName: string;
};

export type AnchorButtonProps = BasePropTypes & {
  // 针对需要拼接参数的场景，优先级低于 href
  request?: { url: string; params: any };
  // 链接，优先级高于 request
  href?: string;
  target?: '_self' | '_parent' | '_top' | '_blank';
};

export type RequestButtonProps = BasePropTypes & {
  request: Request;
  loadingText?: string;
  onSuccess?: (data: any) => any;
  onError?: (error: Error) => any;
};

export type SelectUserButtonProps = RequestButtonProps & {
  // selectUserProps: Omit<SelectUserFuncArgProps, 'onOk' | 'onCancel'>;
  selectUserProps: any;
  isFamilyOrSchool?: boolean;
  selectBureauProps?: any;
  selectSchoolProps?: any;
};

export type LinkButtonProps = BasePropTypes & {
  to: string;
  replace?: boolean;
  // history: History;
};

export type BatchButtonProps = BasePropTypes & {
  // 导入导出配置
  batchProps: BatchProps;
  // 弹层配置
  dialogProps: ModalProps;
  // 打开弹层回调
  onOpen?: () => any;
  // 关闭弹层回调
  onCancel?: () => any;
  // 上传后自动刷新
  onSuccess?: () => any;
};

export type FormValue = any;
export type FormButtonProps = BasePropTypes & {
  request: Request;
  dialogProps: ModalProps;
  formItemLayout?: any;
  formProps: {
    className?: string;
    value?: FormValue;
    dataSource: {
      uiType: string;
      label: string;
      name?: string;
      props?: any;
      rules?: any;
    }[];
  } & Omit<CFFormProps, 'controls' | 'actions' | 'request'>;
  comsMap?: Record<string, React.Component>;
  noContainer: boolean;
  onSuccess?: (formValue: FormValue) => any;
  onOpen?: () => any;
  onCancel?: () => any;
  onOk?: (formValue: FormValue) => any;
  onChange?: (formValue: FormValue) => any;
  onRequestFailed?: (error: any, formValue: FormValue) => any;
  onValidateFailed?: (error: any) => any;
};

export type SelectClassButtonProps = Omit<
  SelectUserButtonProps,
  'selectUserProps'
> &
  SelectClassProps;

export type UploadButtonProps = RequestButtonProps & {
  uploadProps: Omit<UploadPropTypes, 'request'>;
  request: UploadPropTypes['request'];
};

export type PropTypes =
  | BasePropTypes
  | EventButtonProps
  | RequestButtonProps
  | FormButtonProps
  | LinkButtonProps
  | SelectUserButtonProps
  | SelectClassButtonProps
  | AnchorButtonProps
  | BatchButtonProps
  | UploadButtonProps;
