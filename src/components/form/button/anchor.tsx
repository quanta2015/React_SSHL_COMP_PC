// import React, {useCallback} from 'react';
import { Button } from 'antd';
import { compose, mapProps } from 'recompose';
import { AnchorButtonProps } from './interface';
import { withConfirmHOC, spreadButtonPropsHOC } from './mod/hoc';

export const mapAButtonProps = mapProps((ownerProps: AnchorButtonProps) => {
  const { href, request, target, buttonProps, ...others } = ownerProps;
  let _href = href;
  if (!_href) {
    const { url, params } = request || {};
    if (!url) {
      throw new Error(
        `uiType 为 'a' 的 button 必须配置 href 或 request: { url: string; params?: any; } 属性。${JSON.stringify(
          ownerProps
        )}`
      );
    }
    const _search = Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');
    _href = ~url.indexOf('?') ? `${url}&${_search}` : `${url}?${_search}`;
  }
  return {
    ...others,
    buttonProps: {
      ...(buttonProps || {}),
      href: _href,
      target
    }
  };
});

export default compose(
  withConfirmHOC,
  mapAButtonProps,
  spreadButtonPropsHOC
)(Button);
