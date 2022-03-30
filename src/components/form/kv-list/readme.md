# KVList

> 键值列表组件，表现为键值对的列表，键对应 Select，值对应相应的组件（目前包括 input 和 select 两种），两栏布局

## PROPS

```js
{
    // 键值列表组件的className
    className: PropTypes.string,
    // 组件值，对应整体组件的数据
   value: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    })
  ),
    // 下拉列表框的数据源
    dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      uiType: PropTypes.string,
      props: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    })
  ),
    // 最大项数
    maxItems: PropTypes.number,
    // 键或值改变后触发的回调
    onChange: PropTypes.func,
    // 点击删除图标后的回调
    onRemove: PropTypes.func,
}
```
