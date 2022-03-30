## RadioGroup

> 可配置的单选框

## PROPS

```js
{
  // RadioGroup的name标识
  name: PropTypes.string,
  // 与 shape 属性配套使用，shape设为button时有效
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  // radip的形状，可设置成button样式
  shape: PropTypes.oneOf(['button']),
  // radio group选中项的值，受控组件
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.boolean,
  ]),
  // radio group的默认值，非受控组件
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.boolean,
  ]),
  // 设置标签类型
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  // 选中值改变时的事件 Function(value: String/Number, e: Event) => void
  onChange: PropTypes.func,
  // radio是否被禁用
  disabled: PropTypes.boolean,
  // 可选项列表
  dataSource: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
  }), PropTypes.string])),
  // 子项目的排列方式
  itemDirection: PropTypes.oneOf(['hoz', 'ver']),
}
```
