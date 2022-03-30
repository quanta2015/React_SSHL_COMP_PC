## TreeSelect

> Treeselect下拉列表框的不同状态，带勾选框多选树

## PROPS

```js
{
    // dataSource 传入的数据源，可以动态渲染子项
    dataSource: PropTypes.arrayOf(PropTypes.object),
    // showSearch 展开后是否能搜索
    showSearch: PropTypes.bool,
    canInput: PropTypes.bool,
    // multiple 是否开启多选模式
    multiple: PropTypes.bool,
    // onChange TreeSelect发生改变时触发的回调
    onChange: PropTypes.func,
    // onSearch 当搜索框值变化时回调
    onSearch: PropTypes.func,
}
```

