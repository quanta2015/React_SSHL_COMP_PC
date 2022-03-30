# compose-manage

管理页组件，由表格，分页，筛选和排序组件组成。支持主要功能：

1. 表格数据查看
2. 对表格数据的分页
3. 筛选表格的数据
4. 对表格的 `columns` 进行排序

## 组件目录结构

```tree
├── demo // 示例目录
├── sort // 排序组件
├── filter-item.tsx // 筛选组件
├── index.less // 组件样式文件
├── index.tsx // 组件具体的逻辑
├── interface.ts // 组件的typings
├── notice-section.tsx // 封装Alert组件的一个组件
├── README.md // 组件文档
```

## 快速上手

引入管理页组件，给出 `dataRequest` 和 `tableProps.columns` 两个配置，即可渲染一个管理页组件。 `dataRequest` 用来获取表格数据，`tableProps.columns` 用来指定表格的列头。

### 组件如何渲染使用

通过设置 `dataRequest` 获取数据和设置 `tableProps.columns` 设置表格列，即可渲染出组件。

通过设置 `alertProps.request` 或者 `alertProps.message` ，展示出 `Alert` 的信息。

通过设置 `filterProps` 去生成表格数据过滤项，例子如下：

```javascript
const filterProps = [{
  type: 'select',
  name: 'type',
  dataSource: '/local-mock/mock.list.manage.select',
  label: '类型',
  allowClear: true,
}, {
  type: 'search',
  name: 'keyword',
  label: '姓名',
}]

目前仅支持 'type = search' 和 'type = select' 两种组件形式。（'type = search' 是个 'Input' 组件）

需要注意的是 'type = select' ，'dataSource' 是个数组形式即可渲染，如果是一个 'url' ，会在组件内部请求 'url' ，并且获取到的数据作为 'dataSource'
```

通过设置 `sortProps` 可以排序表格数据，具体配置见下文。

通过设置 `buttonList` 是表格左上部的按钮列表，需要传入数组，具体属性可以看 `Button`

## 列订制

通过 tableProps.comsMap 属性扩展，并在 columns 中通过 uiType 配置。
用法参考 src/pages/contacts/system-tag/modules/system-tag/index.tsx 中 comsMap 和 attrValueList 列的配置。

**那 `comsMap` 是个什么呢？**

`comsMap` 是个 `{key : Component}` ，这个 `key ` 也就是可以通过配置 `columns.uiType` 渲染出对应的组件

## 请求默认参数

buttonList 属性和 uiType 为 "buttonList" 的列的请求，都会自动注入特定的参数。（如果 params 传入了同名参数，则会覆盖掉注入的参数）。

### buttonList 属性

**注入条件：** 满足以下任一条件：

1. 按钮的 uiType 为 "request"
2. 按钮的 isBatch 为 true

**默认传入 request.params 如下：**

| 参数名  | 说明                                                                     | 举例                                       |
| ------- | ------------------------------------------------------------------------ | ------------------------------------------ |
| idList  | 选中的主键字段数组（主键为 primaryKey 对应的值，primaryKey 默认为 'id'） | [1, 2, 3]                                  |
| rowList | 选中的行数据数组                                                         | [{id: 1, name: '1' }, {id: 2, name: '2' }] |

### uiType 为 "buttonList" 的列

**注入条件：** 满足以下任一条件：

1. 按钮的 uiType 为 "batch"（会注入到其中的 uploadProps 和 downloadProps 的 request 字段中）
2. 包含 request 字段
3. formProps 的 initialValuesRequest 字段。

**默认替换 request.url 中的占位符：**

| 占位符          | 说明         | 举例                                       |
| --------------- | ------------ | ------------------------------------------ |
| `${id}`         | 该行的主键值 | url: 'taobao.com?id=\${id}'                |
| `${index}`      | 该行的序列号 | url: 'taobao.com?rowIndex=\${index}'       |
| `${record.xxx}` | 该行的数据   | url: 'taobao.com?username=\${record.name}' |

**默认传入 request.params 如下：**

| 参数名  | 说明                                                               | 举例                |
| ------- | ------------------------------------------------------------------ | ------------------- |
| id      | 该行的主键值（主键为 primaryKey 对应的值，primaryKey 默认为 'id'） | 1                   |
| idList  | 主键值包成数组，满足一些批量和单个操作使用同一接口的场景           | [1]                 |
| rowData | 该行的数据                                                         | {id: 1, name: '1' } |

### 调整顺序 - sortProps

| 参数名        | 说明                 | 类型            | 是否必填 |
| ------------- | -------------------- | --------------- | -------- |
| swapRequest   | 交换顺序接口         | Request         | 是       |
| toTopRequest  | 置顶接口             | Request         | 是       |
| onOrderChange | 顺序调整成功后的回调 | function():void | 否       |
