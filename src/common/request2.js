import axios from 'axios';
import { message } from 'antd';

export default async function request(url, options = {}) {
  const { showRejectErr = false, headers } = options;

  const token = headers ? headers['Access-Token'] : '';
  return new Promise((resolve, reject) => {
    return axios({
      url,
      ...options,
      // withCredentials: true,
      headers: {
        Authorization: window.token,
        'Access-Token': token, // token
      },
    })
      .then((response) => {
        const { data } = response;

        if (data.code === 200 || data.code === 0 || data.code === '200') {
          return resolve(data.data || data.result);
        }

        // 导出文件data返回''，传入showRejectErr为false，不弹出错误
        if (showRejectErr) {
          message.error(
            `${
              (data &&
                (data.message || data.msg || data.error || data.errMsg)) ||
              '网络错误，请重试'
            }`,
          );
        }
        return reject(data || {});
      })
      .catch((error) => {
        const { response } = error || {};
        const { data } = response || {};
        return reject(data || {});
      });
  });
}
