// loading module
// @author Pluto <huarse@gmail.com>
// @create 2018/05/22

import React from 'react';
import classNames from 'classnames';
import './index.less';

export default function LoadingMod({
  horizontal = false,
  imgSrc = 'https://img.alicdn.com/tps/i3/TB1VG6aHXXXXXXZXpXX2GPaIVXX-80-80.gif',
  showImg = true,
  height = '200px',
  className,
  noborder,
  children,
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
      {children ? <div className="desc">{children}</div> : null}
    </div>
  );
}
