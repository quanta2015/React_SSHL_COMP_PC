import React from 'react';
// import PropTypes from 'prop-types';
import { Badge } from 'antd';

export default function Status(props) {
  const { value, successLabel, failedLabel } = props;
  return (
    <Badge
      content={value ? successLabel : failedLabel}
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
    />
  );
}

Status.displayName = 'Status';
// Status.propTypes = {
//   value: PropTypes.bool.isRequired,
//   successLabel: PropTypes.string.isRequired,
//   failedLabel: PropTypes.string.isRequired,
// };
