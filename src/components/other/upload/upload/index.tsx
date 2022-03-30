import React, { useCallback, useMemo } from 'react';
import { Request } from '@/components/interface';
import { Upload } from 'antd';
import { UploadProps, UploadChangeParam } from 'antd/lib/upload';
import { apiPrefix } from '@/common/request';

export interface PropTypes extends UploadProps {
  // 请求配置，如果配置了，则会覆盖默认的 action 等属性
  request?: Omit<Request, 'method'> & {
    method?: 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';
  };
  // 上传成功回调
  onSuccess?(): void;
  // 上传失败回调
  onError?(errMsg: string): void;
  children?: React.ReactNode;
}

export default ({
  action,
  method,
  request,
  onSuccess,
  onError,
  onChange,
  ...others
}: PropTypes) => {
  const handleUploadChange = useCallback(
    (res: UploadChangeParam) => {
      const {
        file: { status, response }
      } = res;
      if (status === 'done') {
        if (response.success) {
          onSuccess && onSuccess();
        } else {
          onError && onError(response.errorMsg);
        }
      }
      if (status === 'error') {
        onError && onError(response.errorMsg);
      }
      onChange && onChange(res);
    },
    [onChange, onError, onSuccess]
  );
  const url = useMemo(() => apiPrefix(request.url), [request]);
  return (
    <Upload
      {...others}
      withCredentials
      action={url}
      method={request.method}
      data={request.params}
      onChange={handleUploadChange}
    />
  );
};
