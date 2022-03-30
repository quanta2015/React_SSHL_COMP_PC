import React, { useState, useEffect, useCallback } from 'react';
import { Select, message } from 'antd';
import get from 'lodash/get';
import Upload from '@/components/upload';
import Button from '@/components/button';
import net from '@/services/index';
import { BatchProps } from '../interface';

export default ({
  mainText,
  descText,
  buttonText,
  buttonProps,
  isUpload = false,
  needSelectCampus = false,
  request,
  onUploadSuccess,
  ...others
}: BatchProps & {
  onUploadSuccess?: () => void;
}) => {
  const [campusDataSource, setCampusDataSource] = useState([]);
  const [clickable, setClickable] = useState<boolean>(true);
  const [deptId, setDeptId] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [url, setUrl] = useState<string>(request.url);
  const [uploading, setUploading] = useState(false);
  // const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // 如果是下载，则先获取下载链接
    setClickable(needSelectCampus ? !!deptId || deptId === 0 : true);
  }, [deptId, needSelectCampus]);

  useEffect(() => {
    if (!needSelectCampus) return;
    setLoading(true);

    // tslint:disable-next-line: no-floating-promises
    net
      .request('/backend/org/school/sub/node', {
        method: 'GET',
      })
      .then(({ data }) => {
        const dataSource: { label: string; key: any }[] = get(
          data,
          'dataSource',
          [],
        );
        setCampusDataSource(
          dataSource.map((item) => ({
            label: item.label,
            value: item.key,
          })),
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [needSelectCampus]);

  useEffect(() => {
    // 如果需要先选择校区，则只有选择 deptId 后才能点击
    setClickable(needSelectCampus ? !!deptId || deptId === 0 : true);
  }, [deptId, needSelectCampus]);

  const handleCampusSelect = useCallback(
    (val) => {
      setDeptId(val);
    },
    [setDeptId],
  );

  const handleUploadSuccess = useCallback(() => {
    message.success('正在上传中，请在【最新导入记录】中查看结果');
    setUploading(false);
    onUploadSuccess();
  }, [onUploadSuccess]);

  const handleUploadError = useCallback(
    (errorMsg: string) => {
      message.error(errorMsg || '请求异常，请稍后再试。');
      setUploading(false);
    },
    [onUploadSuccess],
  );
  // const handleDownload = () => {
  //   const { url, method, params = {} } = request;
  //   // const downloadWindow = window.open();
  //   setDownloading(true);
  //   // tslint:disable-next-line: no-floating-promises
  //   net
  //     .request(url, {
  //       method,
  //       data: {
  //         ...(params || {}),
  //       },
  //       search: {
  //         deptId,
  //       }
  //     })
  //     .then(result => {
  //       if (!result || !/\/\//.test(result.data)) {
  //         console.error(
  //           '下载接口返回数据错误，请返回形如 { "success": true, "data": "下载链接" } 的结果'
  //         );
  //         return;
  //       }
  //       // 跳转到下载链接
  //       window.location.href = result.data;
  //       setDownloading(false);
  //       message.success('下载链接获取成功', 2);
  //     });
  // };

  const beforeUpload = () => {
    setUploading(true);
    return true;
  };

  // 如果有选择校区，则将 deptId 拼接到 query 中
  useEffect(() => {
    if (!needSelectCampus) return;
    const { url: _url } = request;
    const connector = _url.indexOf('?') >= 0 ? '&' : '?';
    setUrl(`${_url}${connector}deptId=${deptId}`);
  }, [request, deptId, needSelectCampus]);

  return (
    <div className="cf-batch">
      {mainText && <div className="cf-batch-main-text">{mainText}</div>}
      <div className="cf-batch-icon-wrapper">
        {isUpload ? (
          <img
            className="batch-icon"
            src="//s.ss.com/contacts/group.svg"
            alt="导入图标"
          />
        ) : (
          <img
            className="batch-icon"
            src="//s.ss.com/contacts/import.svg"
            alt="导出图标"
          />
        )}
      </div>
      {descText && <div className="cf-batch-desc-text">{descText}</div>}
      {needSelectCampus && (
        <div className="cf-batch-campus-select-wrapper">
          <span>请选择{isUpload ? '导入' : '导出'}的校区 </span>
          <Select
            className="cf-batch-campus-select"
            options={campusDataSource}
            onSelect={handleCampusSelect}
            showSearch
            value={deptId}
            loading={loading}
          />
        </div>
      )}
      <div className="cf-batch-button-wrapper">
        {isUpload ? (
          <Upload
            request={{
              ...request,
              url,
            }}
            accept=".xls,.xlsx"
            name="file"
            disabled={!clickable || uploading}
            showUploadList={false}
            beforeUpload={beforeUpload}
            onSuccess={handleUploadSuccess}
            onError={handleUploadError}
          >
            <Button
              text={buttonText}
              buttonProps={{
                ...(buttonProps || {}),
                disabled: !clickable,
                loading: uploading,
              }}
            />
          </Upload>
        ) : (
          <Button
            uiType="download"
            text={buttonText}
            request={{
              ...request,
              search: { deptId },
            }}
            {...others}
            buttonProps={{
              ...(buttonProps || {}),
              disabled: !clickable,
            }}
          />
        )}
      </div>
    </div>
  );
};
