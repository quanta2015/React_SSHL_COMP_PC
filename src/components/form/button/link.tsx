import React from 'react';

// import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { compose, withHandlers } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withConfirmHOC, spreadButtonPropsHOC } from './mod/hoc';
import { LinkButtonProps } from './interface';

export default compose(
  withConfirmHOC,
  withRouter,
  // withPropTypes:
  withHandlers({
    onClick:
      ({
        onBeforeClick,
        onClick,
        history,
        to,
        replace,
      }: LinkButtonProps & RouteComponentProps) =>
      (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onBeforeClick(to)
          .then(() => {
            history[replace ? 'replace' : 'push'](to);
            onClick && onClick(e);
          })
          .catch((err) => {
            console.log(err);
            // err?.stopPropagation();
          });
      },
  }),
  spreadButtonPropsHOC,
)(Button);
