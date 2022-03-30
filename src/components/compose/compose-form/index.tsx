import React, { useMemo } from 'react';
import { mapProps } from 'recompose';
import { Row, Col, Divider } from 'antd';
import CFForm, { useForm } from './form';
import {
  CFFormItemProps,
  CFFormProps,
  CFFormCustomComProps
} from './interface';

type PropTypes = CFFormProps;

export default mapProps(({ columns = 1, ...others }: PropTypes) => {
  return {
    columns,
    renderItemList(
      controlItems: React.ReactNodeArray,
      actionFormItems?: React.ReactNode
    ) {
      const $divider = useMemo(
        () => <Divider className="cf-compose-form-action-divider" />,
        []
      );
      // 单栏模式，直接垂直渲染
      if (columns - 1 <= 0) {
        return (
          <>
            {controlItems}
            {actionFormItems && $divider}
            {actionFormItems}
          </>
        );
      }
      const colSpan = Math.floor(24 / columns);
      let itemIndex = 0;
      // 向上取整，避免有漏掉的
      const colItemsCount = Math.ceil(controlItems.length / columns);
      return (
        <>
          <Row>
            {new Array(columns).fill(0).map((_, index) => {
              const $col = (
                <Col span={colSpan} key={index}>
                  {controlItems.slice(itemIndex, itemIndex + colItemsCount)}
                </Col>
              );
              itemIndex += colItemsCount;
              return $col;
            })}
            {actionFormItems && $divider}
            {actionFormItems && (
              <Col span={colSpan} offset={24 - colSpan} key="actions">
                {actionFormItems}
              </Col>
            )}
          </Row>
        </>
      );
    },
    ...others
  };
})(CFForm);
export {
  useForm,
  CFFormProps,
  CFFormItemProps,
  CFFormCustomComProps,
  PropTypes
};
