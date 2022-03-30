// loading module
// @author Pluto <huarse@gmail.com>
// @create 2018/05/22

import React from 'react';
import classNames from 'classnames';
import './index.less';

export default function PermissionMod({
  horizontal = false,
  imgSrc = 'https://static.suosihulian.com/file/permission.svg',
  showImg = true,
  height = '200px',
  className,
  noborder,
  children = '权限不足',
}) {
  const clazz = classNames('container', 'loading', 'className', {
    'horizontal': horizontal,
    'bordered': !noborder,
  });

  return (
    <div className={clazz} style={{ height }}>
      {showImg ? (
        <div className="imgbox">
          <img src={imgSrc} alt="" />
        </div>
      ) : null}
      {children ? <div className="per-desc">{children}</div> : null}
    </div>
  );
}
