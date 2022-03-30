import { AlertProps } from 'antd/lib/alert';
// import { CFFormItemProps } from '@/components/compose-form/form-item';
import EventEmitter from '@/components/compose-form/events';
import { FormProps, FormItemProps, FormInstance } from 'antd/lib/form';
import { Request } from '@/components/interface';

export interface CFFormItemInternalProps
  extends Omit<FormItemProps, 'children'> {
  label?: string;
  name: string;
  uiType: string;
  index: number;
  form: FormInstance;
  emitter: EventEmitter;
  externalComsMap?: any;
  source?: Request;
  props?: any;
  info?: React.ReactNode;
  errors?: React.ReactNode;
  rules?: FormItemProps['rules'];
  tooltip?: string;
  value?: any;
  visibleOn?: (data?: any) => boolean;
  showableOn: any;
  newSourceParams?: (prevParams?: any, data?: any) => any;
}

export type CFFormItemProps = Omit<
  CFFormItemInternalProps,
  'index' | 'externalComsMap' | 'form' | 'emitter'
>;

export interface CFFormProps extends FormProps {
  // 顶部公告栏属性，如果不设置则不显示公告栏
  alertProps?: AlertProps & {
    request?: Request;
  };
  // 初始化获取表单数据的请求
  initialValuesRequest?: Request;

  //
  initialValuesRequestSuccess?: (event: any) => any;
  // 表单提交的请求
  request?: Request;
  // 调整请求传参结构
  formatParams?: (formValue: any) => any;
  // 提交前的回调，如果返回 false，则中断提交流程。
  beforeSubmit?: (formValue: any) => Promise<boolean>;
  // 二次处理提交参数，传入当前的 formValue，返回处理后的 formValue。
  dataFormatBeforeSubmit?: (formValue: any) => Promise<any>;
  // 二次处理初始化数据，传入 initialValuesRequest 返回的 formValue，返回处理后的 formValue。
  dataFormatAfterInit?: (formValue: any) => Promise<any>;
  // 表单项配置列表
  controls: CFFormItemProps[];
  // 操作按钮配置列表
  actions?: CFFormActionProps[];
  // 扩展的元素类型列表
  comsMap?: any;
  // 如果表单值未改变，则禁止提交。默认为 true。
  disableSubmitWhenUnChanged?: boolean;
  // 表单节点的类名
  className?: string;
  // 表单的标题
  title?: string;
  // 点击提交按钮时的回调
  onSubmit?: (value?: any, e?: EventTarget) => void;
  // 提交请求成功后的回调
  onFinish?: (value?: any, e?: EventTarget) => void;
  renderItemList?(
    controlItems: React.ReactNodeArray,
    actionFormItem: React.ReactNode,
  ): React.ReactNode;
  // 是否将 action 显示在页面底部，默认为 false
  showActionInPageFooter?: boolean;
  // 是否将全局错误弹层展示，如果为 false，则展示在表单顶部。
  toastGlobalError?: boolean;
  // 非受控模式的表单默认值
  initialValues?: any;
  // 受控模式的表单值
  value?: any;
  // 分栏数
  columns?: number;
  noContainer?: boolean;
}

export interface CFFormCustomComProps {
  value: any;
  onChange: (value: any) => void;
}

export interface CFFormActionProps {
  uiType: 'submit' | 'reset' | 'cancel' | 'confirmSubmit' | 'button';
  props: any;
}

interface FormValue {
  [formItemKey: string]: any;
}

export interface CFFormComProps {
  onChange(value: any): void;
  setFormValue(formValue: FormValue): void;
}
