import React, { useState, useEffect, useRef } from 'react';

import { Steps, Card, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import NoticeSection from '@/components/compose-manage/notice-section';
import { PropTypes } from './interface';
import net from '@/services';
import Batch from './mods/batch';
import './index.less';

const { Step } = Steps;
export default ({
  alertProps,
  recordsRequest,
  downloadProps,
  uploadProps,
  onUploadSuccess = () => {},
}: PropTypes) => {
  const [records, setRecords] = useState([]);
  const ticker = useRef(null);
  useEffect(() => {
    requestRecords();
    return () => {
      ticker.current && clearTimeout(ticker.current);
    };
  }, []);
  const requestRecords = () => {
    if (!recordsRequest) return;
    ticker.current && clearTimeout(ticker.current);
    const { url, method, params } = recordsRequest;
    net
      .request(url, {
        method,
        data: params,
      })
      .then(({ data: records }) => {
        setRecords(records);
        // 如果存在未结束的记录，则记录轮询
        if (records.some((record: any) => !record.status)) {
          console.log(ticker.current);
          ticker.current && clearTimeout(ticker.current);
          ticker.current = setTimeout(() => {
            requestRecords();
          }, 3000);
        }
      })
      .catch(() => {});
  };

  const handleUploadSuccess = () => {
    requestRecords();
    onUploadSuccess();
  };

  return (
    <div className="cf-import-and-export">
      <NoticeSection alertProps={alertProps} />
      <div className="cf-batch-card">
        <div className="cf-batch-left-part">
          <Batch {...downloadProps} />
        </div>
        <div className="cf-batch-right-part">
          <Batch
            {...uploadProps}
            isUpload
            onUploadSuccess={handleUploadSuccess}
          />
        </div>
      </div>

      {recordsRequest && (
        <Card title="最近导入记录" size="default">
          {records.length ? (
            <Steps className="records-step" progressDot direction="vertical">
              {records.map(({ downloadUrl, info, time, user, id }, index) => (
                <Step
                  key={id}
                  title={<div className="record-time">{time}</div>}
                  status="finish"
                  description={
                    <div className="record-info-wrapper">
                      <span className="record-user">{user}</span>
                      <span className="record-info">{info}</span>
                      {downloadUrl && (
                        <Button
                          className="record-download"
                          type="link"
                          href={downloadUrl}
                        >
                          <DownloadOutlined /> 下载导入失败的记录
                        </Button>
                      )}
                    </div>
                  }
                />
              ))}
            </Steps>
          ) : (
            <p className="records-empty">暂无记录</p>
          )}
        </Card>
      )}
    </div>
  );
};

export { PropTypes };
