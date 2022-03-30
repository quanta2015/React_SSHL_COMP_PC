import React from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'antd';

export default function Link(props) {
  const { value, tableProps, onClick, innerText, ...others } = props;
  const { link, text } = value;
  const buttonProps = { ...others };
  if (typeof onClick === 'function') {
    buttonProps.onClick = () => {
      onClick(tableProps);
    };
  } else if (link) {
    buttonProps.href = link;
  }
  return (
    <Button {...buttonProps}>
      {text || innerText}
    </Button>
  );
}

Link.displayName = 'Link';
// Link.propTypes = {
//   value: PropTypes.shape({
//     text: PropTypes.string,
//     link: PropTypes.string,
//   }),
//   innerText: PropTypes.string,
//   onClick: PropTypes.func,
//   text: PropTypes.bool,
//   content: PropTypes.string,
//   tableProps: PropTypes.shape({
//     index: PropTypes.number,
//     record: PropTypes.object,
//   }).isRequired,
// };
Link.defaultProps = {
  text: true,
  content: 'link',
  value: {},
};
