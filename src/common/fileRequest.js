import axios from 'axios';
import { message } from 'antd';

axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
export default async function request(url, options = {}) {
  const { showRejectErr = false, headers } = options;
  return new Promise((resolve, reject) => {
    return axios({
      url,
      ...options,
      headers: {
        Authorization: window.token,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        const { data } = response;

        if (data.code === 200 || data.code === 0 || data.code === '200') {
          return resolve(data.data || data.result);
        }

        if (data.code === 302 || data.code === 11000) {
          return reject(data || {});
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
