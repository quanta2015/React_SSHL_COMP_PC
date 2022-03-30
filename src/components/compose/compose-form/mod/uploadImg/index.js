import React from 'react';
import ImageUpload from './UploadImg';

export default function uploadImg(props) {
  const { appCode, onChange, value, maxCount = 9, ...otherProps } = props;
  const onUploadImgChange = (filesId) => {
    // debugger;
    onChange(filesId);
  };
  const imgProps = {
    appCode,
    value,
    maxCount,
    accept: 'image/*',
    onUploadImgChange,
    ...otherProps,
  };
  return <ImageUpload {...imgProps} />;
}
