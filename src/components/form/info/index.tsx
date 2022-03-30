import React from 'react';
import { Popover, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import RichText from '../rich-text';

export type InfoContent = Array<string> | string;
export type PropTypes = {
  className: string;
  children: React.ReactNode;
  dataSource: {
    left?: InfoContent,
    top?: InfoContent,
    bottom?: InfoContent,
    right?: InfoContent,
    help?: InfoContent,
  },
  helpAlign: 'topLeft' | 'top' | 'topRight' | 'leftTop' | 'left' | 'leftBottom' | 'rightTop' | 'right' | 'rightBottom' | 'bottomLeft' | 'bottom' | 'bottomRight'
}
function InfoComponent ({
  className = '',
  dataSource = {},
  helpAlign = 'top',
  children,
}: PropTypes) {
  const {left, top, bottom, right, help} = dataSource;
  return (
    <div className={`cf-info ${className}`}>
      {top ? <RichText dataSource={top} className="top" key="top" /> : null}
      <div className={`info-content${help ? ' help-padding' : ''}`}>
        {left ? <RichText dataSource={left} className="left" key="left" /> : null}
        <div className="content-wrapper">{children || null}</div>
        {help ? (
          <Popover
            placement={helpAlign}
            content={<RichText dataSource={help} />}
            trigger="hover"
          >
            <Button type="text" icon={<QuestionCircleOutlined />} className="help-trigger" key="top" />
          </Popover>
        )
          : null
        }
        {right ? <RichText key="right" dataSource={right} className="right" /> : null}
      </div>
      {bottom ? <RichText key="bottom" dataSource={bottom} className="bottom" /> : null}
    </div>
  );
}

export default InfoComponent;
