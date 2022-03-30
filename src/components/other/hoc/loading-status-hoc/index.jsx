// import PropTypes from 'prop-types';
import React from 'react';
import { Button, Icon } from 'antd';

export default (Ele) => {
  function WithLoadingStatus(props) {
    const { loadingStatus, onReload, loadingText, errorText, ...others } = props;
    if (loadingStatus === 'loading') {
      return (
        <p className="cf-loading-status-hoc loading">
          <Icon className="loading-icon" type="loading" size="small" />
          {loadingText}
        </p>
      );
    } else if (loadingStatus === 'success') {
      return (
        <Ele {...others} />
      );
    } else if (loadingStatus === 'error') {
      // eslint-disable-next-line max-len
      return (
        <p className="cf-loading-status-hoc error">
          {errorText}
          {
            onReload ? (
              <Button
                onClick={onReload}
                text
                className="btn-retry"
              >
                <Icon type="refresh" size="small" />
              </Button>
            ) : null
          }
        </p>
);
    }
    return <Ele {...others} />;
  }
  WithLoadingStatus.displayName = 'WithLoadingStatus';
  // WithLoadingStatus.propTypes = {
  //   loadingStatus: PropTypes.oneOf(['success', 'error', 'loading']),
  //   onReload: PropTypes.func,
  //   loadingText: PropTypes.string,
  //   errorText: PropTypes.string,
  // };
  WithLoadingStatus.defaultProps = {
    onReload: null,
    loadingText: '数据加载中',
    errorText: '加载失败',
    loadingStatus: null,
  };
  return WithLoadingStatus;
};
