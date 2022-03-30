import React, { useEffect, useState } from 'react';
import { Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import url from '@/common/service-utils';
import request from '@/common/fileRequest';
import request2 from '@/common/request2';

export default function index({
  onUploadImgChange,
  appCode = 'test',
  value = 0,
  maxCount,
  maxSize = 10,
  isMultiple = false,
  tips,
  requestUrl,
  listType = 'picture-card',
  isCrop = false,
  ...otherProps
}) {
  const headers = {
    Authorization: window.token,
  };
  const [groupId, setGroupId] = useState(value);
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (value) {
      console.log(value, 'value');
      request(`${requestUrl || url.file}/web/file/${value}/get`).then(
        (data) => {
          const { medias, groupId: id } = data;
          const list = medias.map((val) => {
            const { url: _url, mediaId: fileId, fileName: name } = val;
            // const base64Url = getBase64Img(_url);
            return {
              status: 'done',
              uid: fileId,
              fileId,
              name,
              url: _url,
            };
          });
          setGroupId(id);
          setFileList(list);
        },
      );
    }
  }, [value]);

  const getBase64Img = (res) => {
    const bufferUrl = btoa(
      new Uint8Array(res.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        '',
      ),
    );
    const base64Url = `data:image/png;base64,${bufferUrl}`;
    return base64Url;
  };

  const onRemove = (file) => {
    // console.log(fileList,'2131')
    const resFiles = fileList
      .filter((val) => val.uid !== file.uid)
      .map((val) => val.fileId || val.response.data.files[0].fileId);
    request2(`${requestUrl || url.file}/web/file/del`, {
      method: 'POST',
      data: {
        fileIds: resFiles,
        groupId,
      },
    }).then((res) => {
      if (res === '0') {
        res *= 1;
      }
      setGroupId(res);
      onUploadImgChange(res);
    });
  };

  const beforeUpload = (file) => {
    // debugger
    const { size, type } = file;
    if (type.includes('image')) {
      if (size > maxSize * 1024 * 1024) {
        message.error(`上传图片不得超过${maxSize}M`);
        return false;
      }
      if (maxCount === 1) {
        setGroupId(0);
      }
    } else {
      message.error('请选择图片格式文件');
      return false;
    }
    return true;
  };

  const onChange = ({ fileList: newFileList, file }) => {
    const { status, response } = file;
    if (status) {
      setFileList(newFileList);
      if (status === 'done') {
        if (response.code === 0) {
          const { data } = response || {};
          const { groupId: id, files } = data || {};
          setGroupId(id);
          onUploadImgChange(id, files);
        } else {
          newFileList.pop();
          setFileList(newFileList);
          message.error(response.msg);
        }
      }
    }
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const uploadProps = {
    action: `${
      requestUrl || url.file
    }/web/file/uploadFileList?appCode=${appCode}&groupId=${groupId}`,
    headers,
    listType,
    maxCount,
    fileList,
    multiple: isMultiple,
    onChange,
    onRemove,
    onPreview,
    beforeUpload,
    ...otherProps,
  };
  return (
    <>
      {isCrop ? (
        <>
          <ImgCrop rotate>
            <Upload {...uploadProps}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>+</span>
                <span>上传</span>
              </div>
            </Upload>
          </ImgCrop>
          {tips && (
            <div style={{ marginTop: '-5px', color: '#8c8c8c' }}>{tips}</div>
          )}
        </>
      ) : (
        <>
          <Upload {...uploadProps}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>+</span>
              <span>上传</span>
            </div>
          </Upload>
          {tips && <div style={{ color: '#8c8c8c' }}>{tips}</div>}
        </>
      )}
    </>
  );
}
