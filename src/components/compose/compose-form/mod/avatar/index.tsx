import React, { useCallback } from 'react';
// @ts-ignore
import ImagesUpload from 'ss-images-upload';
import './index.less';

export interface PropTypes {
  onChange?(value: any): void;
  value?: string;
  edit: number;
}

export default function RadioWithTips({
  value,
  edit = 1,
  onChange,
}: PropTypes) {
  const handleOnChange = useCallback(
    (groupId, fileSize, medias) => {
      // eslint-disable-next-line no-console
      console.log('groupId, fileSize, medias', groupId, fileSize, medias);
      onChange(groupId);
    },
    [onChange],
  );
  const props = {
    callback: handleOnChange,
    type: 'pc',
    isAvatar: true,
    groupId: value,
    edit,
  };

  return <ImagesUpload {...props} />;
}
