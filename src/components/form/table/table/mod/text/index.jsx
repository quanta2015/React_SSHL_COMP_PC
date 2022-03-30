import React from 'react';
// import { Typography } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

// const { Text } = Typography;
// import PropTypes from 'prop-types';

export default function TableCellText(props) {
  const { value, tableProps, minWidth = 70, className, ...others } = props;
  const _value = (value === undefined || value === null || value?.length === 0) ? '-' : value;
  return (
    <span className={classNames(styles.text, className)} {...others} style={{ minWidth }} title={_value}>
      {_value}
    </span>
  );
}

Text.displayName = 'Text';
// Text.propTypes = {
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   tableProps: PropTypes.shape({
//     index: PropTypes.number,
//     record: PropTypes.object,
//   }).isRequired,
// };
