## SwitchCom

> 带有联动功能的 switch 组件

## PROPS

```js
{
  // switch 的 className
  className: PropTypes.string,
  // 组件值，关闭后为 props.valueOff，开启后为内部组件的值
  value: PropTypes.any,
  // 值改变后的回调函数，触发时机：switch 开 & 关，
  onChange: PropTypes.func,
  // 关闭时的值
  valueOff: PropTypes.any,
  // 内部组件的 props
  props: PropTypes.objectOf(PropTypes.any),
}
```
