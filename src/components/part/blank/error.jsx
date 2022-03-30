// error module
// @author Pluto <huarse@gmail.com>
// @create 2018/05/22

import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export default function ErrorMod({
  horizontal = false,
  imgSrc = 'https://img.alicdn.com/tps/TB1UmrVPXXXXXXFapXXXXXXXXXX-75-76.png',
  showImg = true,
  showBtn = true,
  btnText = '刷新一下',
  height = '240px',
  onClick = () => {},
  className,
  noborder,
  children,
}) {
  const clazz = classNames(styles.container, styles.error, className, {
    [styles.horizontal]: horizontal,
    [styles.bordered]: !noborder
  });

  return (
    <div className={clazz} style={{ height }}>
      {showImg ? <div className={styles.imgbox}><img src={imgSrc} alt="" /></div> : null}
      <div className={styles.desc}>{children || '抱歉，程序开小差了~'}</div>
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
