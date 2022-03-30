import React, { useCallback } from 'react';
// import ImagesUpload from 'ss-images-upload';

import './index.less';

export interface PropTypes {
  onChange?: (value: any) => void;
  value?: string;
}

export default function Upload({ value, onChange }: PropTypes) {
  const handleOnChange = useCallback(
    (groupId, fileSize, medias) => {
      console.log('groupId, fileSize, medias', groupId, fileSize, medias);
      onChange(groupId);
    },
    [onChange],
  );

  const props = {
    callback: handleOnChange,
    type: 'pc',
    edit: 0,
    groupId: value,
  };

  // return <ImagesUpload {...props} />;
  return null;
}
