import React from 'react';
import { ButtonProps } from 'antd/lib/button';
import { NsNoticeProps } from '@/components/compose-manage/notice-section';
import { Request } from '@/components/interface';

export interface BatchProps {
  // 顶部主体文案，可以为合法的 ReactNode
  mainText?: React.ReactNode;
  // 中间说明文案，可以为合法的 ReactNode
  descText?: React.ReactNode;
  // 按钮文案
  buttonText: string;
  // 按钮配置
  buttonProps?: ButtonProps;
  // 是否为上传，默认为 false，即下载
  isUpload?: boolean;
  // 是否需要先选择校区，默认为 false，即不需要选择
  needSelectCampus?: boolean;
  // 请求配置
  request: Request & {
    method?: 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';
  };
}

export interface PropTypes {
  /** 警告、提示 属性 */
  alertProps?: NsNoticeProps;
  // 导入导出记录请求，如果不设置，则认为不需要导入导出记录能力。
  recordsRequest?: Request;
  // 左侧导出部分配置
  downloadProps: BatchProps;
  // 右侧导入部分配置
  uploadProps: BatchProps;
  // 上传成功之后的回调
  onUploadSuccess?: () => void;
}
