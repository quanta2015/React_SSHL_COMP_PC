// empty module
// @author Pluto <huarse@gmail.com>
// @create 2018/05/22

import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export default function EmptyMod({
  horizontal = false,
  imgSrc = 'https://img.alicdn.com/tps/TB1N2gdPXXXXXaaXVXXXXXXXXXX-100-100.png',
  showImg = true,
  showBtn = false,
  btnText = '刷新一下',
  height = '240px',
  onClick = () => {},
  className = '',
  noborder = false,
  children,
}) {
  const clazz = classNames(styles.container, styles.empty, className, {
    [styles.horizontal]: horizontal,
    [styles.bordered]: !noborder
  });

  return (
    <div className={clazz} style={{ height }}>
      {showImg ? <div className={styles.imgbox}><img src={imgSrc} alt="" /></div> : null}
      <div className={styles.desc}>{children || '还没有数据呢~'}</div>
      {showBtn ? (
        <div className={styles.action}>
          {!horizontal ?
            <button onClick={onClick} type="button">{btnText}</button> :
            <a href="" onClick={onClick} data-prevent>{btnText}</a>
        }
        </div>
) : null}
    </div>
  );
}
