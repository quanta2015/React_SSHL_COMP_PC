import React from 'react';
// import PropTypes from 'prop-types';
import comsMap, { defaultUiType } from './mod/coms-map';

export default function SwitchCom(props) {
  const { uiType, ...others } = props;
  const Com = comsMap[uiType];
  return (<Com {...others} />);
}

SwitchCom.displayName = 'CFSwitchCom';

// SwitchCom.propTypes = {
//   uiType: PropTypes.oneOf(Object.keys(comsMap)),
// };

SwitchCom.defaultProps = {
  uiType: defaultUiType,
};
