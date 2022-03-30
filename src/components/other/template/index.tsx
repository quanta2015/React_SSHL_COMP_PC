import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

export type PropTypes = {
  activeId: string;
  className?: string;
  onActiveChange?(activeId: string): void;
  children: React.ReactNodeArray;
};

export default ({ activeId, onActiveChange, children, className = '' }) => {
  const [child, setChild] = useState(null);
  useEffect(() => {
    const _activeId = activeId || children[0]?.key;
    if (!_activeId) return;
    onActiveChange && onActiveChange(String(_activeId));
    // console.log(children)
    let child = children.find(
      ({ key }) => key.replace(/^(\.\$)+/, '') === _activeId,
    );
    if (!child) {
      child = <p>没有找到 key 为 {_activeId} 的模块</p>;
    }
    setChild(child);
  }, [onActiveChange, children, activeId]);
  return <div className={classNames('cf-template', className)}>{child}</div>;
};
