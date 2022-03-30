# compose-tree

树形路由容器组件，一般作为页面的根节点渲染，组件为左右布局，左侧是树，右侧是子页面容器。支持以下主要功能：
1. 树展示：支持异步加载树节点、树节点 icon；
2. 点击树节点后，加载对应的子页面，并且树节点的高亮路径会同步到 url 中；
3. 页面加载时，组件会读取 url 中的 :treePath 参数并同步高亮树节点、加载相应页面（如果没有找到匹配的节点，则重定向到根节点）；
4. 树支持搜索。

## 组件目录结构

```tree
├── demo // 示例目录
├── hooks // react hooks 目录
├── index.less // 组件样式文件
├── index.tsx // 组件入口文件
├── interface.ts // 组件的 typings
├── README.md // 组件文档
├── tree.tsx // Tree 组件
├── user-tree.tsx // 用户树组件，用于展示搜索结果中的用户部分
├── utils.ts // 工具文件∫
```

## 快速上手

引入树组件，给出 request 和 routerConfig 两个配置，即可渲染一个树组件。其中 request 用于定义树组件获取节点和搜索的异步请求；routerConfig 是子页面的路由配置（详见 「routerConfig 配置项说明」一节）。

### request 属性说明

详细请求说明见[语雀](https://www.yuque.com/ozd909/bxp610/xfrbcv#compose-tree)。

```typescript
request: {
  /**
     * 请求树节点的子节点列表
     * 参数:
     * { parentId: string }
     * 返回：
     * {
     *   dataSource: Array<{
     *     label: string;
     *     key: string;
     *     children: TreeDataSource
     *   }>,
     * }
     */
  getTreeNodes: Request;
  /**
   * 搜索树节点
   * 参数:
   * { keywords: string }
   * 返回：
   * {
   *   dataSource: Array<{
   *     label: string;
   *     key: string;
   *     labelPath: Array<{ label: string; key: string; }>,
   *   }>,
   * }
   */
  searchTreeNodes: Request;
};
```

## 如何注册树节点所属的页面

### 一级页面

如果页面属于根路径下，需要在 `router.config.ts` 中配置两条相应的路由规则，以保证能正确加载到子页面。

以「家校通讯录」为例，该页面是用本组件包裹的页面，因此在 `router.config.ts` 中配置以下两条规则
```js
'/contacts-v1': {
  name: '通讯录',
  children: {
    ...
    '/family-school': {
      name: '家校通讯录',
      component: React.lazy(() =>
        import('../pages/contacts/family-school')),
    },
    '/family-school/:treePath/*': {
      component: React.lazy(() =>
        import('../pages/contacts/family-school')),
    },
    ...
  }
}
```
访问以下 url 会命中该页面：
- `/contacts-v1/family-school`：高亮根节点
- `/contacts-v1/family-school/a:b:c`：高亮 a:b:c 路径，并加载对应的子页面
- `/contacts-v1/family-school/a:b:c/campus/settings`：高亮 a:b:c 节点，并加载对应的子页面，后面的 `/campus/settings` 路径由子页面接管并进一步渲染

说明：`:treePath` 是 url 中的 params 的占位符，如果访问 `/contacts-v1/family-school/a:b:c`，那么组件内就能获取到 a:b:c 这个内容，并且高亮这条路径。冒号（:）是分隔符，每一项表示节点的 key，a:b:c 表示 a 节点 -> b 节点 -> c 节点。

### 子页面

如果页面是嵌套在 ComposeTab 组件下的子页面，需要在 ComposeTab 组件的 routerConfig 中配置本页面，并声明 isTree 为 true。

以「内部通讯录 - 虚拟组织通讯录」为例，内部通讯录是一个 tab 页，其中 “虚拟组织通讯录” 对应的子页面是个树页面，因此在内部通讯录的 ComposeTab 的 routerConfig 属性中这么配置该页面：
```js
routerConfig: [
  ...
  {
    path: 'virtualOrganization',
    isTree: true,
    Com: React.lazy(() => import('./modules/virtual-organization'))
  },
  ...
]
```

访问以下 url 会命中该页面：
- `/contacts-v1/internal/bureauAndSchool`：高亮根节点
- `/contacts-v1/internal/bureauAndSchool/a:b:c`：高亮 a:b:c 路径，并加载对应的子页面
- `/contacts-v1/internal/bureauAndSchool/a:b:c/campus/settings`：高亮 a:b:c 节点，并加载对应的子页面，后面的 `/campus/settings` 路径由子页面接管并进一步渲染

## routerConfig 配置项说明

树组件的子页面的是根据点击的节点的 type 属性决定的，路由规则有一点点绕：`树节点 type 属性 -> common/module-map.ts 配置映射 -> routerConfig 属性`。
举个例子：假设当前页面是 `/contacts-v1/internal/virtualOrganization`，树的节点和 moduleMap 配置如下：
```js
// 树节点
[{
  key: 'a',
  label: '节点 a',
  type: 'school'
}]
// module-map.ts
{
  school: 'campus-page',
  campus: 'campus-page',
}
```
在点击 a 节点时，会去 `common/module-map.ts` 下找到 school 对应的 module 名称是 campus-page，子页面就会加载 routerConfig 中的 path 为 campus-page 的节点，页面 url 变为 `/contacts-v1/internal/virtualOrganization/campus`

为什么要多一层 module-map 配置？因为节点的 type 跟前端的子页面有可能不是一一对应的，比如不同的 type 对应同一套子页面，因此中间加了一层配置项。


## context 用法

如需在子页面中获取树的节点列表、当前节点信息、高亮路径等属性，以及调用刷新树的节点、跳转到指定节点的页面等方法，我们提供了 ComposeTreeContext 供子页面消费。消费方式如下：

```js
import { useContext } from 'react';
import { ComposeTreeContext } from '@/components/compose-tree';

...
  const context = useContext(ComposeTreeContext);

```

下面介绍几个常用的属性和方法，其他详情见 `compose-tree/interface.ts` 中的 IComposeTreeContext:

### activeKey - 当前高亮树节点的 key

最常用的属性，常见的场景是右侧列表或表单需要请求当前节点的数据，需要获取 activeKey 并传入异步请求。

举例：点击学校节点之后，右侧要获取该学校的下属年级列表，就需要学校的 id 作为参数获取列表内容，这个 id 就是树节点的 key，通过 activeKey 获取。

### activeParams - 当前高亮树节点的 params

第二常用的属性，存放高亮节点的额外信息，对应[树节点请求结果](https://www.yuque.com/ozd909/bxp610/xfrbcv#ccb51f4c) 中的 params 字段。一般用于右侧页面异步请求时需要的参数。

举例：除了节点的 key 之外，子页面的异步请求还需要节点的组织信息，那么后端会在 request.getTreeNodes 请求返回的节点中，额外传入 params 属性：`params: { orgId: 'xxx' }`，那么子页面中可以取到 activeParams，并且把其中的内容传入异步请求参数。

### treePaths - 当前高亮节点的路径

可以获取从根节点到当前高亮节点的整个路径。
举例：
```js
// 树节点
{
  key: 'a',
  label: '节点 a',
  type: 'xxx',
  children: {
    key: 'b',
    label: '节点 b',
  }
}
```
那么点击节点 b 后，页面路径会变为 `/<当前页路径>/a:b`，treePaths 为 `['a', 'b']`

### reloadTree(): 重新获取当前树的节点列表

```js
import { ComposeTreeContext } from '@/components/compose-tree';
...
  const { reloadTree } = useContext(ComposeTreeContext);
  ...
  reloadTree();
```

举两个场景：

1. 常见的列表页中，新增节点、删除节点后，想同步更新左侧树中的子节点，则在操作成功的回调中调用本方法
2. 常见的设置页中，编辑节点后，想同步更新左侧树中的当前节点内容（一般为名称变更），则在操作成功的回调中调用本方法

### loadDataByTreePath(idList?: string[]): 重新获取给定节点的子节点列表

idList 表示需要刷新的节点的路径，如果不传，默认是当前高亮的节点。本方法的作用与 reloadTree 差不多，但是刷新的内容范围更小，因此可以减轻接口压力。

```js
import { ComposeTreeContext } from '@/components/compose-tree';
...
  const { loadDataByTreePath } = useContext(ComposeTreeContext);
  ...
  loadDataByTreePath();
```

### generateUrlByTreePaths(nextTreePaths: string[], nextPath?: string) - 生成目标路径 url

生成目标 tree 路径的 url，传入 tree 路径和目标路径（nextPath 需要包含 :treePath 参数，不传默认取 react-router-dom 传入的 match.path）

常见场景：从列表跳转到某一项的设置页

```js
import { withRouter, RouteComponentProps } from 'react-router-dom';

export default withRouter(function ListModule({
  match
}: RouteComponentProps<{
  treePath: string;
}>) {
  const {
    generateUrlByTreePaths,
  } = useContext(ComposeTreeContext);
  const { path } = match;
  ...
  {
    label: '操作',
    uiType: 'buttonList',
    props: {
      dataSource: [{
        text: '设置',
        uiType: 'link',
        to: generateUrlByTreePaths(
          [...treePaths, '${record.key}'], // 跳转到该行对应的设置页
          path.replace(
            /\/:treePath(\/.*)$/,
            '/:treePath/custom-class/setting', // 目标 url 为自定义班级的设置页
          )
        )
      }]
    }
  }
  ...
}

```
