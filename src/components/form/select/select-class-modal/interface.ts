// import { SelectUserFuncArgProps, IlistItem } from 'ss-select-user-v4.0/lib/components/select-user/interface';

interface Value {
  // 基础校区，单选（但是做成数组，为了帮后端容错，只取第一条作为结果）
  baseSchoolDepts?: [];
  // 自定义校区，多选
  customSchoolDepts?: [];
}

interface PropTypes {
  // 选择校区类型的弹层标题，默认为 '所属班级'
  selectDialogTitle?: string;
  // 选人组件配置
  // selectUserProps?: Omit<SelectUserFuncArgProps, 'onOk' | 'onCancel'>;
  selectUserProps?: any;
  // 弹层显隐
  visible: boolean;
  // 组件值，如果传入，则同步到组件和选人组件中。
  value?: Value;
  // 弹层确认回调，传入已选的班级列表值
  onOk: (value: Value) => Promise<void>;
  // 弹层隐藏回调
  onCancel: () => void;
}

export { Value, PropTypes };
