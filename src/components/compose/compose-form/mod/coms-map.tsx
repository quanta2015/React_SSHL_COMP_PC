import { DatePicker, Switch, Button, Checkbox, Input } from 'antd';
import moment from 'dayjs';
import { compose, withProps } from 'recompose';
import Select from '@/components/select';
import TreeSelect from '@/components/tree-select';
import MobilePhone from './mobile-phone';
import SelectUser from './select-user';
import InputPostfix from './input';
import InputNumber from './inputNumber';
import SwitchChecked from './switch-checked';
import CheckboxChecked from './checkbox-checked';
import {
  DatePicker_,
  RangePicker_,
  TimePicker_,
  TimeRangePicker_,
} from './datePick';
import Avatar from './avatar';
import ConfirmSubmit from './confirmSubmit';
import RadioGroup from '../../radio-group';
import CheckboxGroup from '../../checkbox-group';
import Text from './text';
import BooleanToText from './booleanToText';
import CheckboxWithSelect from '@/components/checkbox-with-select';
import TableInput from '@/components/table-input';
import TableRowSpan from '@/components/table';
import RadioWithSelect from '@/components/radio-with-select';
import RadioWithTips from '@/components/radio-with-tips';
import ImagesUpload from '@/components/upload-images';
import Form_ from '@/components/button/form';
import SelectSearch from '@/components/button/select-search';
import UploadIcon from '@/components/button/upload-icon';
import SelectClass from '@/components/button/select-class';
import BusinessCard from '@/components/button/business-card';
import ModalTableSearch from '@/components/button/modal-table-search';
import FileDown from '@/components/file-down';
import MultipleInputSelect from '@/components/multiple-input-with-select';
import RichText from './richText';
import UploadFile from './uploadFile';
import UploadImg from './uploadImg';

import {
  SwitchCheckBoxInput,
  SwitchCheckBoxRangePicker,
  SwitchDate,
  Address,
  SelectCheckbox,
  KqObject,
  SelectUserCom,
  CheckGroupList,
  SpecialTable,
  NocheckDateTable,
  StationSelector,
  codeToText,
  CustomeSwitch,
  CustomContentSetting,
} from '@/components/switch-checkbox-input';
import DeviceFormRule from '@/components/device-form-rule';
import LinkText from '@/components/link-text';

const submitHOC = compose(
  withProps(() => ({
    htmlType: 'submit',
  })),
);
const datePickerHOC = withProps(
  ({ value, placeholder = '请选择日期' }: any) => ({
    value: value ? moment(new Date(value)) : null,
    placeholder,
  }),
);

const dateOnlyHOC = withProps(({ value, placeholder = '请选择日期' }: any) => {
  const year = moment().year();
  const date = typeof value === 'string' ? `${year}-${value}` : value;
  return {
    value: value ? moment(date) : null,
    placeholder,
    format: 'MM-DD',
  };
});

export default {
  input: InputPostfix,
  password: Input.Password,
  textarea: Input.TextArea,
  number: InputNumber,
  'rich-text': RichText,
  'upload-file': UploadFile,
  'upload-img': UploadImg,
  birthdate: null,
  dateOnly: dateOnlyHOC(DatePicker),
  fileDown: FileDown,
  'date-picker': DatePicker_,
  datepicker: DatePicker_,
  'date-range-picker': RangePicker_,
  'time-range-picker': TimeRangePicker_,
  deviceFormRule: DeviceFormRule,
  'time-picker': TimePicker_,
  timepicker: TimePicker_,
  tableRowSpan: TableRowSpan,
  selectCheckboxStatus: SelectCheckbox,
  address: Address,
  specialTable: SpecialTable,
  nocheckDateTable: NocheckDateTable,
  stationSelector: StationSelector,
  checkGroupList: CheckGroupList,
  form: Form_,
  'select-search': SelectSearch,
  'upload-icon': UploadIcon,
  'select-class': SelectClass,
  'business-card': BusinessCard,
  modalTableSearch: ModalTableSearch,
  kqobject: KqObject,
  selectUserCom: SelectUserCom,
  tableInput: TableInput,
  codeToText,
  switch: Switch,
  switchChecked: SwitchChecked,
  checkboxChecked: CheckboxChecked,
  select: Select,
  treeSelect: TreeSelect,
  text: Text,
  booleanToText: BooleanToText,
  button: Button,
  submit: submitHOC(Button),
  confirmSubmit: ConfirmSubmit,
  reset: Button,
  checkbox: Checkbox,
  checkboxGroup: CheckboxGroup,
  'checkbox-group': CheckboxGroup,
  radio: RadioGroup,
  mobilePhone: MobilePhone,
  selectUser: SelectUser,
  avatar: Avatar,
  switchCheckBoxInput: SwitchCheckBoxInput,
  switchCheckBoxRangePicker: SwitchCheckBoxRangePicker,
  checkboxWithSelect: CheckboxWithSelect,
  switchDate: SwitchDate,
  radioWithSelect: RadioWithSelect,
  radioWithTips: RadioWithTips,
  imagesUpload: ImagesUpload,
  multipleInputWithSelect: MultipleInputSelect,
  linkText: LinkText,
  customeSwitch: CustomeSwitch,
  customContentSetting: CustomContentSetting,
};

export { default as UnSupport } from './un-support';
