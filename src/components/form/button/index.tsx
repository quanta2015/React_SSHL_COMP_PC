import React from 'react';
import { Dropdown, Menu, Button as AntdButton } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import Button from './button';
import { PropTypes } from './interface';
import './index.less';

export function ButtonList({
  dataSource,
  maxItems,
}: {
  dataSource: PropTypes[];
  // 如果设置这个值，则超过这个数量的内容会被收到“更多”下拉中
  maxItems?: number;
}) {
  const _dataSource = dataSource || [];
  let firstPart = _dataSource;
  let secondPart: PropTypes[] = [];
  if (_dataSource.length - maxItems > 0) {
    firstPart = _dataSource.slice(0, maxItems - 1);
    secondPart = _dataSource.slice(maxItems - 1);
  }
  let result = firstPart.map((item, index) => {
    return (
      <Button
        key={index}
        {...item}
        className={classNames(item.className, 'cfListButton')}
        buttonProps={{
          ...(item.buttonProps || {}),
          className: 'cfListButton',
        }}
      />
    );
  });
  if (secondPart.length) {
    const menu = (
      <Menu>
        {secondPart.map((item, index) => {
          return (
            <Menu.Item key={index}>
              <Button
                key={index}
                {...item}
                buttonProps={{
                  ...(item.buttonProps || {}),
                  type: 'link',
                }}
              />
            </Menu.Item>
          );
        })}
      </Menu>
    );
    result = [
      ...result,
      <Dropdown key="button-list-more-dropdown" overlay={menu}>
        <AntdButton className="cfListButton" type="link">
          更多 <DownOutlined />
        </AntdButton>
      </Dropdown>,
    ];
  }
  return <div className="buttonList">{result}</div>;
}

export default Button;

export { PropTypes };
