// import React, {useCallback} from 'react';
import { Button } from 'antd';
import { compose, withHandlers } from 'recompose';
import { PropTypes } from './interface';
import { withConfirmHOC, spreadButtonPropsHOC } from './mod/hoc';

export default compose(
  withConfirmHOC,
  withHandlers({
    onClick: ({
      onBeforeClick,
      onClick,
    }: PropTypes) => (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      onBeforeClick().then(() => {
        onClick && onClick(e);
      });
    }
  }),
  spreadButtonPropsHOC,
)(Button);
