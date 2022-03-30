import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Button, message, Modal } from 'antd';
import { compose, withHandlers, withState } from 'recompose';
import { RequestButtonProps } from './interface';
import { withConfirmHOC, spreadButtonPropsHOC } from './mod/hoc';
import { parseParam } from '@/common/util';
import url from '@/common/service-utils';
import net from '@/services';

const withRequest =
  (Comp) =>
  ({
    onBeforeClick,
    onSuccess,
    onError,
    request,
    loadingText,
    buttonProps,
    onClick,
    ...others
  }: RequestButtonProps) => {
    const {
      toggleVisibility,
      isVisible,
      isBatch = false,
      confirmBeforeClick,
      qrBeforeClick = false,
      qrUniqueId,
    } = others;
    const [loading, _setLoading] = useState(false);
    const { requestParams = null } = parseParam(location.search);
    // 同步缓存 loading 的值，用于实时判断
    const loadingRef = useRef(false);
    const setLoading = (nextLoading: boolean) => {
      _setLoading(nextLoading);
      loadingRef.current = nextLoading;
    };

    const { href } = window.location;

    const _requestParams = useMemo(() => {
      if (!request) return null;
      const { params, ...requestOptions } = request;

      // 所有的非form表单传递的参数统一通过otherCommonParams包裹
      return JSON.stringify(
        confirmBeforeClick
          ? { idList: params?.idList, ...(params?.otherCommonParams || {}) }
          : requestOptions,
      );
    }, [request]);

    useEffect(() => {
      if (
        requestParams &&
        isBatch &&
        qrBeforeClick &&
        // 当页面有多个扫码组件时，需要通过qrUniqueId进行区分，避免多次执行
        (!qrUniqueId ||
          (qrUniqueId &&
            JSON.parse(decodeURI(requestParams)).qrUniqueId === qrUniqueId))
      ) {
        if (href?.includes('errorMsg')) {
          // 扫码验证失败后直接提示错误信息，并替换url
          const errorMsg = decodeURIComponent(location.search)
            ?.split('&')[1]
            ?.split('=')[1];
          message.error(errorMsg || '扫码验证失败', 5);
          history.replaceState(null, '', href.split('?')[0]);
        } else {
          handleClick();
        }
      }
    }, [requestParams]);

    const sanc = async () => {
      const { data } = await net.request('/backend/loginUser/scan', {
        method: 'GET',
      });
      return new Promise((resolve) => {
        resolve(data);
      });
    };

    // 只在扫码通过时调用
    const getParams = () => {
      const { params, ...requestOptions } = request;

      if (!confirmBeforeClick) {
        const flag =
          requestOptions &&
          Object.values(requestOptions?.search).filter((item) => !!item)
            .length > 0;

        return !flag
          ? (requestParams && JSON.parse(requestParams)) || {}
          : requestOptions || {};
      }

      const flag = params?.idList?.length > 0;
      // 所有的非form表单传递的参数统一通过otherCommonParams包裹
      return !flag
        ? (requestParams && JSON.parse(requestParams)) ||
            params?.otherCommonParams ||
            {}
        : params;
    };

    const getVisible = () => {
      const { params } = request;
      // debugger;
      if (!confirmBeforeClick) {
        return true;
      }
      return (
        !requestParams ||
        (params?.idList?.length > 0 &&
          JSON.stringify(requestParams?.idList) !==
            JSON.stringify(params?.idList))
      );
    };

    // 手动关闭验证弹框
    const handleCloseVerify = () => {
      setLoading(false);
      toggleVisibility();
    };

    const handleClick = async (
      e?: React.MouseEvent<HTMLElement, MouseEvent>,
    ) => {
      if (loadingRef.current) return;
      try {
        const {
          url,
          params,
          method,
          formatter,
          tableSource,
          ...requestOptions
        } = request;

        // 只有在不需要扫码或者扫码成功后弹出“导出中”弹框
        const exportLoading = async () => {
          if (getVisible()) {
            await onBeforeClick({
              terminate() {
                setLoading(false);
              },
            });
          }
        };

        let _params = {};
        if (formatter && !tableSource) {
          try {
            _params = await formatter(params);
          } catch (err) {
            console.warn(`请求中断：${err.message}`);
            return;
          }
        }
        if (qrBeforeClick) {
          sanc().then(async (data) => {
            if (!data) {
              toggleVisibility();
            } else {
              await exportLoading();
              setLoading(true);
              net
                .request(url, {
                  method: method || 'POST',
                  data: {
                    ...getParams(),
                    ...(_params || {}),
                    batch: true,
                    // ...((requestParams && JSON.parse(requestParams)) || {})
                  },
                  showError: true,
                  ...getParams(),
                })
                .then((result) => {
                  if (!loadingRef.current) return;
                  setLoading(false);
                  // debugger;
                  if (result && result.code === 0) {
                    message.success('操作成功', 1, () => {
                      onSuccess && onSuccess(result);
                      const { href } = window.location;
                      history.replaceState(null, '', href.split('?')[0]);
                    });
                  } else {
                    message.error(result.msg || '网络错误');
                  }
                })
                .catch((error) => {
                  setLoading(false);
                  onError && onError(error);
                });
            }
          });
          return;
        }

        await exportLoading();
        setLoading(true);
        net
          .request(url, {
            method: method || 'POST',
            data: { ...(params || {}), ...(_params || {}) },
            showError: true,
            ...requestOptions,
          })
          .then((result) => {
            if (!loadingRef.current) return;
            setLoading(false);
            // debugger;
            if (result && result.code === 0) {
              message.success('操作成功', 1, () => {
                onSuccess && onSuccess(result);
              });
            } else {
              message.error(result.msg || '网络错误');
            }
          })
          .catch((error) => {
            setLoading(false);
            onError && onError(error);
          });
      } catch (err) {
        setLoading(false);
      }
    };
    return (
      <>
        <Comp
          {...others}
          buttonProps={{
            ...(buttonProps || {}),
            loading,
          }}
          onClick={handleClick}
        />
        {isVisible && (
          <Modal
            className="qr-button-modal-dialog"
            title="验证管理员身份"
            visible={isVisible}
            onCancel={handleCloseVerify}
            onOk={handleCloseVerify}
          >
            <iframe
              title="iframe"
              className="iframe-wrapper"
              src={`${url.qrApi}/xyhauth/autologin?state=pc&sourceUrl=${
                href.split('?')[0]
              }?requestParams=${window.encodeURIComponent(_requestParams)}`}
              style={{
                height: '100%',
                width: '100%',
              }}
              name="mapFrame"
              scrolling="no"
              frameBorder="0"
              // frameBorder="0"
              // scrolling="auto"
            />
          </Modal>
        )}
      </>
    );
  };
export const requestHoc = compose(
  withState('isVisible', 'toggleVis', false),
  withConfirmHOC,
  withRequest,
  spreadButtonPropsHOC,
);
export default requestHoc(Button);
