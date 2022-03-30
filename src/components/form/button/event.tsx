// import React, {useCallback} from 'react';
import { Button } from 'antd';
import { compose, withHandlers } from 'recompose';
import { EventButtonProps } from './interface';
import { withConfirmHOC, spreadButtonPropsHOC } from './mod/hoc';

export default compose(
  withConfirmHOC,
  withHandlers({
    onClick: ({
      onBeforeClick,
      onClick,
      onEmit,
      eventName,
      additions = {}
    }: EventButtonProps) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onBeforeClick().then(() => {
        onEmit(eventName, additions);
        onClick && onClick(e);
      });
    }
  }),
  spreadButtonPropsHOC
)(Button);
