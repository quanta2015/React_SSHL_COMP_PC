import React, { useEffect, useState } from 'react';
import { Button, Upload, message } from 'antd';
import url from '@/common/service-utils';
import request from '@/common/fileRequest';
import request2 from '@/common/request2';

const uploadFIle = ({
  value = 0,
  onChange,
  appCode = 'test',
  maxSize = 100,
  tips,
  accept,
  requestUrl,
  ...otherProps
}) => {
  const headers = {
    Authorization: window.token,
  };

  const typesMap = {
    image: 'image/*',
    doc: '.doc,.docx,.txt,.pdf,.xlsx,.xls',
    video: 'video/*',
    zip: '.rar,.zip',
    audio: 'audio/*',
  };

  const [fileList, setFileList] = useState([]);
  const [_groupId, setGroupId] = useState(value);
  const [_accept, setAccept] = useState(undefined);
  useEffect(() => {
    if (accept) {
      const acceptArr = accept.split(',');
      const acceptTypes = acceptArr
        .map((val) => {
          return typesMap[val] && typesMap[val];
        })
        .filter((val) => {
          return !!val;
        })
        .join(',');
      setAccept(acceptTypes);
    }
  }, [accept]);

  useEffect(() => {
    if (value) {
      console.log(value, 'value');
      request(`${requestUrl || url.file}/web/file/${value}/get`).then(
        (data) => {
          const { medias, groupId: id } = data;
          const list = medias.map((val) => {
            const { url: _url, mediaId: fileId, fileName: name } = val;
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

  const onChangeFile = ({ fileList: newFileList, file }) => {
    const { status } = file;
    if (status) {
      setFileList(newFileList);
      if (status === 'done') {
        const { response } = file;
        if (response.code === 0) {
          const { data } = response || {};
          const { groupId: id } = data || {};
          setGroupId(id);
          onChange(id);
        } else {
          newFileList.pop();
          setFileList(newFileList);
          message.error(response.msg);
        }
      }
    }
  };

  const onRemove = (file) => {
    const resFiles = fileList
      .filter((val) => val.uid !== file.uid)
      .map((val) =>
        val.fileId ? val.fileId : val.response.data.files[0].fileId,
      );
    request2(`${requestUrl || url.file}/web/file/del`, {
      method: 'POST',
      data: {
        fileIds: resFiles,
        groupId: _groupId,
      },
    }).then((res) => {
      if (res === '0') {
        res *= 1;
      }
      setGroupId(res);
      onChange(res);
    });
  };

  const beforeUpload = (file) => {
    const { size } = file;
    if (size > maxSize * 1024 * 1024) {
      message.error(`上传文件不得超过${maxSize}M`);
      return false;
    }
    return true;
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

  return (
    <>
      <Upload
        action={`${
          requestUrl || url.file
        }/web/file/uploadFileList?appCode=${appCode}&groupId=${_groupId}`}
        headers={headers}
        fileList={fileList}
        onChange={onChangeFile}
        onRemove={onRemove}
        onPreview={onPreview}
        beforeUpload={beforeUpload}
        accept={_accept}
        {...otherProps}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Button>上传</Button>
        </div>
      </Upload>
      {tips && <div style={{ marginTop: '5px', color: '#8c8c8c' }}>{tips}</div>}
    </>
  );
};

export default uploadFIle;
