import React from 'react';
// import PropTypes from 'prop-types';
import { Badge } from 'antd';

export default function Covered(props) {
  const { value, tableProps, ...others } = props;
  return (
    <Badge
      content={value ? '已覆盖' : '未覆盖'}
      style={
        value ? {
          color: '#74CD4C',
          border: '1px solid #6ECB49',
          backgroundColor: '#F6FFEE',
        } : {
          color: '#F8673F',
          border: '1px solid #FDBF9E',
          backgroundColor: '#FFF2E9',
        }
      }
      {...others}
    />
  );
}

Covered.displayName = 'Covered';
// Covered.propTypes = {
//   value: PropTypes.bool.isRequired,
//   tableProps: PropTypes.shape({
//     index: PropTypes.number,
//     record: PropTypes.object,
//   }).isRequired,
// };
