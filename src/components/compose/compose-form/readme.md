# compose-form

表单组件 `compose-form` 由表单项和表单按钮组成，主要功能如下：

1. 渲染表单，根据 uiType 渲染指定的表单项
2. 设置重置、提交按钮，可以加入扩展逻辑

## 组件目录结构

```tree
├── demo // 示例目录
├── mod // 组件的集合
├── events.ts // 事件中心
├── form-item.tsx
├── form.less // form样式文件
├── form.tsx
├── helper.ts // 相应的组件获取
├── index.less // 样式文件
├── index.tsx
├── interface.ts // 组件的typings
├── README.md // 组件文档
```

## 快速上手

引入表单组件，给出 controls 和 actions 两个配置，即可渲染一个表单组件。其中 controls 用来展示表单项组件；actions 用来渲染表单的按钮组件。

### 组件如何渲染使用

通过设置 `controls` 可以渲染出表单项。

**那如何写一个 `controls` 呢？** 例子如下

```javascript
const controls = [{
  label: 'Username' // 表单项名称
  uiType: 'input', // 表单项展示的组件
  name: 'username', // 表单项的字段，用来在初始化表单项值和提交表单上
  rules: [{ required: true, message: 'Please input your username!' }], // 表单项规则
}]

还有其他属性，如 'valuePropName' 设置子节点的值的属性，'props' 设置组件的属性
```

**那怎么给表单加按钮呢？** 可以通过设置 `actions` 即可。

目前仅支持 `uiType = submit` 和 `uiType = reset` 的两种按钮。

并且可以通过设置 `disableSubmitWhenUnChanged` 去禁用提交按钮。

这个 `disableSubmitWhenUnChanged` 怎么理解呢？通过字面意思就可以知道当改变了表单值会取消禁用。

**那我们如何在开始阶段给表单赋值呢？**

1. 通过传入的 `value` ，即可给表单赋值

2. 通过设置 `initialValuesRequest` ，调用接口获取数据赋值给表单，如果返回的数据不符合需求，可以通过设置 `dataFormatAfterInit` 格式化数据再赋值

**那又如何给提交按钮加请求呢？**

通过设置 `request` 即可，`request.url` 代表请求的地址，`request.method` 代表请求的方法，当然还有其他属性，如 `params` 额外的参数，`formatter` 格式化参数

`request.formatter(value) => value` ：会传入请求接口后的数据，可以在里面二次处理数据，需要返回处理后的值

**那怎么去设置受控表单和非受控表单呢？**

通过设置 `value` 和 `onValuesChange` 就可以了。

`value` 表示传入表单的数据

`onValuesChange` 表示表单项改变了值，会通过此函数的参数传入

非受控并且需要给表单赋值传入 `initialValues` 就好了

## 表单项订制

通过 comsMap 属性扩展，并在 controls 或 actions 中通过 uiType 配置。
comsMap 为一个对象，key 为组件类型，value 为实际的组件。只要在表单组件的 comsMap 属性中定义的组件，都可以在 controls 和 actions 中消费，举个例子：

```js
// custom-input.tsx
export default CustomInput({value, onChange, maxItems}) => {
  return <div>CustomInput {value} {maxItems}</div>
}

// 页面
import CustomInput from 'path/to/custom-input';

<ComposeForm
  ...
  comsMap={{
    custom: CustomInput,
  }}
  controls={[{
    name: 'xx',
    uiType: 'custom',
    maxItems: 123
  }]}
/>
```

### 注意

controls 中不能有名称为 "nodeName" 的属性，否则会引发错误 https://github.com/facebook/react/issues/6284

### 属性说明

#### 操作按钮吸底 showActionInPageFooter

默认为 false，如果设为 true，则将操作栏（对应 actions 属性）吸底。

#### 如果表单值未改变，则禁止提交 dataFormatBeforeSubmit

详见 demo： src/components/compose-form/demo/disable-submit-when-unchanged-demo.tsx

#### 二次处理提交参数 dataFormatBeforeSubmit(formValue: any): Promise<any>

提交前被调用，传入当前的 formValue，返回处理后的 formValue。
支持 async 异步。

#### 二次处理初始化数据 dataFormatAfterInit(formValue: any): Promise<any>

initialValuesRequest 请求成功后被调用，传入获取到的 formValue，返回处理后的 formValue。
支持 async 异步。

#### 提交前的回调 beforeSubmit(formValue: any): boolean

提交前被调用，如果返回 false，则中断提交流程。
支持 async 异步。
