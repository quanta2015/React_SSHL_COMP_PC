// 复杂组件中的子页面使用此 HOC
// @author Pluto <huarse@gmail.com>
// @create 2020/06/23 14:14

import React from 'react';

export interface ComposeChildProps<T> {
  composeProps?: T;
  /** 用于重新触发组件实例化 */
  renderKey?: string;

  [x: string]: any;
}

/** ComposeTree 组件的子节点内容属性 */
export interface ComposeTreeChildProps extends ComposeChildProps<{
  /** 当前激活的模块(模板) key */
  activeModuleKey: string;
  selectedTreeNode: {
    /** 当前选中的节点 key */
    key: string;
    /** 当前选中的节点 item */
    node: object;
  }
}> {}

/** ComposeTab 组件的子节点内容属性 */
export interface ComposeTabChildProps extends ComposeChildProps<{
  /** 当前激活的 tab key */
  activeKey: string;
  /** 当前组件是否激活 */
  isActive: boolean;
}> {
  /** 当前选中的 tree 节点的 key */
  nodeKey?: string;
}

/**
 * 复杂组件中的子页面使用此 HOC，用于处理重复渲染等问题
 * @param Com
 */
export default function composeHOC(Com: (props: ComposeChildProps<any>) => JSX.Element) {
  return (props: ComposeChildProps<any>) => {
    // if (!props.composeProps) {
    //   // console.log('>>>>>>>>>>> 没有对应的属性，不渲染');
    //   return null;
    // }

    // console.log('>>>>>>>>>> key', props.nodeKey, props.composeProps);

    // 如果有新的 key，则重新触发渲染
    const key = `${props.nodeKey || ''}-${props.renderKey || ''}`;
    return <Com key={key} {...props} />;
  };
}
