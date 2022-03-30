import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import classNames from 'classnames';

export interface PropTypes {
  children: React.ReactNode;
}

export default ({ children }: PropTypes) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [rightFullWidth, setRightFullWidth] = useState<boolean>(false);
  const rightPane = useRef(null);

  const toggleExpanded = () => {
    const nextExpanded = !expanded;
    if (nextExpanded) {
      setRightFullWidth(true);
    }
    setExpanded(nextExpanded);
  };

  const transitionendCallback = useCallback(() => {
    if (!expanded) {
      setRightFullWidth(false);
    }
  }, [expanded, setRightFullWidth]);
  // 在动画结束时变宽，提升用户体验
  useEffect(() => {
    rightPane.current.removeEventListener(
      'transitionend',
      transitionendCallback
    );
    rightPane.current.addEventListener('transitionend', transitionendCallback);
    return () => {
      rightPane.current.removeEventListener(
        'transitionend',
        transitionendCallback
      );
    };
  }, [transitionendCallback]);

  return (
    <div
      className={classNames('right-pane', {
        'right-panel-expanded': expanded,
        'right-pane-full-width': rightFullWidth
      })}
      ref={rightPane}
    >
      <div className="expand-handle-wrapper">
        <div className="expand-handle" onClick={toggleExpanded}>
          <LeftOutlined style={{ fontSize: '8px' }} />
        </div>
      </div>
      <div className="right-pane-wrapper">{children}</div>
    </div>
  );
};
