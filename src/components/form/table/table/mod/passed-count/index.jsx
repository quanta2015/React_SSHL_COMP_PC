import React from 'react';
// import PropTypes from 'prop-types';
import Passed from '../passed';

export default function PassedCount(props) {
  const { value } = props;
  const { passed, count } = value;
  return (
    <div className="passed-status">
      <span className="status"><Passed value={passed} /></span>
      总数：<span className="count-all">{count.total}</span>
      通过：<span className="count-success">{count.success}</span>
      失败：<span className="count-failed">{count.failed}</span>
    </div>
  );
}

PassedCount.displayName = 'PassedCount';
// PassedCount.propTypes = {
//   value: PropTypes.shape({
//     passed: PropTypes.bool.isRequired,
//     count: PropTypes.shape({
//       total: PropTypes.number,
//       success: PropTypes.number,
//       failed: PropTypes.number,
//     }).isRequired,
//   }).isRequired,
//   tableProps: PropTypes.shape({
//     index: PropTypes.number,
//     record: PropTypes.object,
//   }).isRequired,
// };
