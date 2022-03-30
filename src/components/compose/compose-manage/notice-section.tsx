// notice module
// @author Pluto <huarse@gmail.com>
// @create 2020/06/22 21:20

import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from 'antd';
import { AlertProps } from 'antd/lib/alert';
import { Request } from '../interface';
import useRequest from '@/common/use-request';

export interface NsNoticeProps extends Partial<AlertProps> {
  /** 通过返回的数据异步渲染，异步数据的返回数据结构为: { type, message, description }，优先级高于外部属性 */
  request?: string | Request;
  // 是否有刷新按钮，默认为 false。点击刷新按钮后，重新请求表格和通知内容
  hasRefresh?: boolean;
  // 刷新按钮文案，默认为“立即更新”
  refreshText?: string;
}

// 提示模块的数据
function useNotice(onRefresh, alertProps?: NsNoticeProps) {
  const [notice, setNotice] = useState<AlertProps>();
  const [remoteData] = useRequest(alertProps?.request || '');

  const handleRefresh = useCallback((e) => {
    e.preventDefault();
    onRefresh();
  }, [onRefresh])
  useEffect(() => {
    const { hasRefresh, refreshText = '立即更新', request, ...others } =
      alertProps || {};
    let nextProps: AlertProps = null;
    if (!alertProps) {
      nextProps = null;
    } else if (request && remoteData) {
      nextProps = {
        type: 'info',
        showIcon: true,
        ...others,
        ...remoteData
      };
    } else {
      nextProps = {
        type: 'info',
        showIcon: true,
        ...(others as any)
      };
    }
    // 如果配置了 hasRefresh，则在 message 后面拼接更新按钮
    if (hasRefresh) {
      nextProps.message = (
        <>
          {nextProps.message}
          <a href="#" className="cf-manage-alert-refresh-btn" onClick={handleRefresh}>
            {refreshText}
          </a>
        </>
      );
    }
    setNotice(nextProps);
  }, [alertProps, remoteData]);

  return [notice];
}

export default function NoticeSection({
  alertProps,
  onRefresh
}: {
  alertProps: NsNoticeProps;
  // 更新按钮的点击回调
  onRefresh?(): void;
}) {
  const [notice] = useNotice(onRefresh, alertProps);

  if (!notice) return null;

  return (
    <section className="section-alert">
      <Alert {...notice} />
    </section>
  );
}
