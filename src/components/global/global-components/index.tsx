import { withProps } from 'recompose';
import Struct from '@/components/struct';
import Table from '@/components/table';
// // import Form from '@/components/form';
import Flex from '@/components/flex';
import Tree from '@/components/tree';
import Template from '@/components/template';
import Button from '@/components/button';
import Input from './input';
import Text from './text';
import Tab from './tab';
import { withEvent } from './utils';
import request from '@/services/request';

export default {
  button: withProps(() => ({
    requestFunction: request
  }))(Button),
  struct: Struct,
  input: Input,
  // form: withEvent({
  //   onFinish: 'submit',
  // })(Form),
  table: withEvent({
    onSelectChange: 'selectChange',
    onPageChange: 'pageChange',
  })(Table),
  tree: withEvent({
    onSelect: 'select'
  })(Tree),
  tab: withEvent({
    onSelect: 'select'
  })(Tab),
  flex: Flex,
  text: Text,
  template: withEvent({
    onActiveChange: 'activeChange',
  })(Template),
};
