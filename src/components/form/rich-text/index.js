// import PropTypes from 'prop-types';
import React from 'react';

const CFRichText = function (props) {
  const { dataSource, className } = props;
  const dataType = Object.prototype.toString.call(dataSource);

  if (dataType === '[object Array]') {
    return (
      <div className={`cf-rich-text${className ? ` ${className}` : ''}`}>
        {dataSource.map((item, index) => <div key={index} dangerouslySetInnerHTML={{ __html: item || '' }} />)}
      </div>
    );
  } else if (dataType === '[object String]' || dataType === '[object Number]') {
    return (
      <div className={`cf-rich-text${className ? ` ${className}` : ''}`} dangerouslySetInnerHTML={{ __html: dataSource || '' }} />
    );
  }

  return null;
};

CFRichText.displayName = 'CFRichText';
CFRichText.defaultProps = {
  className: '',
  dataSource: [],
};
// CFRichText.propTypes = {
//   className: PropTypes.string,
//   dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number]),
// };

export default CFRichText;
