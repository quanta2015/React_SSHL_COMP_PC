# compose-tab

标签页组件提供展示多个标签，标签页的激活与页面的 url 关联，支持以下功能

1. 展示标签页，支持异步调用接口去展示标签页
2. 设置 `routerConfig` 后，通过页面 url 可激活具体的标签和相对应的 `routerConfig`

## 组件目录结构

```tree
├── demo // 示例目录
├── index.less // 组件样式文件
├── index.tsx // 组件具体的逻辑
├── interface.ts // 组件的typings
├── README.md // 组件文档
├── tab.tsx // Tab组件
```

## 快速上手

引入标签页组件，给出 request 和 routerConfig 两个配置，即可渲染一个标签页组件。其中 request 用于定义标签页获取数据的异步请求；routerConfig 是标签页内部组件的路由配置。

### 组件如何渲染使用

通过设置 `dataSource` 或者通过 `request.getTabDataSource` 调用接口，获取 `Tab` 的 `dataSource` 。

刚进来时，如果 `url` 中没有指定默认 `activeKey` ， 则默认选中第一个 `Tab` 节点。_（`activeKey` 代表激活中的 `Tab` 节点）_

**那如何在 `url` 中指定 `activeKey` 呢？** 例子如下：

```javascript
// 需要在 router.config.js 配置以下内容
const config = {
  '/internal': {
    name: '内部通讯录',
    component: React.lazy(() =>
      import('../pages/contacts/internal')),
  },
  '/internal/*': {
    hidden: true,
    component: React.lazy(() =>
      import('../pages/contacts/internal')),
  }
}

如果当前 url 是 'localhost:8009/contacts-v1/intrernal'
那么没有匹配到的 'activeKey' , 会取第一个 'Tab' 节点，并且这个节点的 'key' 作为 'activeKey' 。

如果当前 url 是 'localhost:8009/contacts-v1/intrernal/internal'
那么匹配到 'internal' ，渲染对应的 'routerConfig' ，但是没有找到对应的 'routerConfig' ，也会跳到第一个 'Tab' 节点。

（具体逻辑请看代码）
```

点击 `Tab` 节点 ，会通过函数 `goToModuleByKey` 判断 `routerConfig` 中是否有对应的 `activeKey` 。如果有则渲染对应的组件，并且改变 `history`。

`routerConfig` 中存在 `isTree = true` , 需要额外拼接 `param` 。

## 如何设置 Tab 数据的请求

设置 `request.getTabDataSource` ，组件内部会调用设置过的接口，得到数据后渲染 `Tab`

参数：

```typescript
interface Params {
  // 上层传入的 key，比如当前 composeTab 的上层是 composeTree，则传入 tree 中选中节点的 key。
  activeKey: any;
}
```

返回：

```typescript
interface Data {
  // 子树数据源
  dataSource: Array<{
    // 文案
    label: string;
    // 节点 id
    key: string;
  }>;
}
```

## 如何让 Tab 隐藏

设置 `hideWhenOnlyOne = true` ，并且通过 `request.getTabDataSource` 获取到的数据为一个的时候，才会隐藏组件

## 如何设置点击 Tab 的回调

通过设置 `onActiveChange`

默认选择哪个 `Tab` 可设置 `defaultActiveKey`
