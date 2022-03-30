import React from 'react';
import './index.less';

interface Props {
  text: string;
  className?: string;
  linkHref?: string;
  onClick?: () => void;
  style?: any;
}

const LinkText = (props: Props) => {
  const { text, className, linkHref, onClick, style } = props;
  const handleClick = () => {
    if (typeof onClick === 'function') {
      onClick();
    } else if (linkHref) {
      history.pushState(null, '', linkHref);
    }
  };

  return (
    <div
      className={`ss_link_text ${className || ''}`}
      onClick={handleClick}
      style={style}
    >
      {text}
      <span className="ss_link_text__arrow">»</span>
    </div>
  );
};

export default LinkText;
