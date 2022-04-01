# RichText

### DEMO

```tsx
import React from 'react';
import RichText from '@/components/RichText';

export default class Conf extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = {
      value: '',
      onChange: () => {},
    };

    return <RichText {...props} />;
  }
}
```

### 项目组成

```bash
├── img          # 图片文件
├── index.js     # RichText构件主文件
├── index.less   # RichText构件样式
├── lib.js       # 样式库数据
├── lib.less     # 样式库样式
└── readme.md
```

### 开发规范

#### 1. 样式的命名规则

```bash
# 1. 菜单命名规则(全大写)
_父菜单_子菜单

# 比如标题菜单的基本标题
_TL_BASE


# 2. 样式元素的类命名规则(全小写)
fn-父菜单_子菜单_1

# 比如标题菜单的基本标题的第一个元素
fn-tl_bs_1
```

#### 2. H5 元素使用规范

- 使用的 H5 元素不能超过 5 种，一般建议使用 `div` `em` `i` `img` `code` 即可; 不允许使用 `span` 元素；
- 可编辑的段落对象必须包裹 `div`
- 写完 CSS 脚本后必须自己测试
- 图标不要使用图片尽量使用 CSS3 构建
- 图片使用 `SVG` 、 `WEBP` 、 `PNG` 格式,统一保存在 `img` 文件夹
