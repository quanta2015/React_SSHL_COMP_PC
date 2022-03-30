import React from 'react';
import ImageUpload from 'ss-images-upload';
import { ENV } from '@/common/util';

export default function uploadImg({ value, onChange, maxNumber = 1 }) {
  const handleImagesUpload = (filesId) => {
    onChange(filesId);
  };
  return (
    <ImageUpload
      edit={0}
      type="pc"
      APIEnv={ENV}
      maxNumber={maxNumber}
      callback={handleImagesUpload}
      groupId={value}
    />
  );
}
