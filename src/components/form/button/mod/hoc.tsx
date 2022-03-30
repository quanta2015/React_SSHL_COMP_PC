import { withHandlers, mapProps } from 'recompose';
import { Modal } from 'antd';
import { PropTypes } from '../interface';

export const withConfirmHOC = withHandlers({
  toggleVisibility: ({ toggleVis, isVisible }) => {
    return () => {
      return toggleVis(!isVisible);
    };
  },
  onBeforeClick: ({
    confirmBeforeClick,
    onBeforeClick,
    ...others
  }: PropTypes) => async arg => {
    if (!confirmBeforeClick) {
      if (onBeforeClick) {
        await onBeforeClick(arg);
      }
      return true;
    }

    return new Promise((resolve, reject) => {
      Modal.confirm({
        okText: '确认',
        cancelText: '取消',
        ...confirmBeforeClick,
        onOk() {
          if (onBeforeClick) {
            onBeforeClick().then(() => resolve(true));
          } else {
            resolve(true);
          }
        },
        onCancel() {
          reject(false);
        }
      });
    });
  },
  onClick: ({ onClick, onEmit }: PropTypes) => (...args: any) => {
    onEmit && onEmit('click', ...args);
    onClick && onClick(...args);
  }
});

export const spreadButtonPropsHOC = mapProps(
  ({ buttonProps, text, onClick }: PropTypes) => {
    return {
      ...buttonProps,
      children: text,
      onClick
    };
  }
);
