import Saber from '@irim/saber';
import { NetOptions } from './interface';
import optionsFilling from './middlewares/option-filling';
import apiPrefix from './middlewares/api-prefix';
import mock from './middlewares/mock';

interface ExternalContext {
  /** 是否显示加载中 */
  showLoading: boolean | string;
  /** 是否显示错误信息 */
  showError: boolean | string;
  /** 是否在出错时仍然正确返回 */
  ignoreError: boolean;
}

const saber = Saber.singleton<ExternalContext>();

saber.use(mock);
saber.use(apiPrefix);
saber.use(optionsFilling);
// saber.use(loadingMessage);

saber.request = saber.request.bind(saber);

export { saber };

export default {
  /** 增加 formatter */
  request: async (api: string, options: Omit<NetOptions, 'api' | 'next'>) => {
    const { formatter, data, ...otherOptions } = options;
    let _data = data || {};
    if (formatter) {
      try {
        _data = await formatter(_data);
      } catch (err) {
        console.warn('请求中断：' + err.message);
        return;
      }
    }
    return saber.request(api, {
      data: _data,
      ...otherOptions,
      headers: {
        Authorization: (window as any).token,
      },
    });
  },
};

// rda service
// @author Pluto <huarse@gmail.com>
// @create 2018/08/09

// import { Core } from '@irim/ds-core';
// import { Net } from '@irim/ds-net';
// import { NetOptions } from './interface';
// import optionsFilling from './middlewares/option-filling';
// // import errorHandler from './middlewares/error-handler';
// // import parsePath from './middlewares/parse-path';

// const ds = Core.singleton();

// !ds.net && ds.register('net', Net, {
//   abilities: [
//     'ajax', // 封装的是 window.fetch 方法
//     'jsonp', // 最基本的 jsonp 接口
//     'upload', // 文件上传的能力
//     'download' // 异步文件下载，可以让 ajax 接口返回的文件流触发下载
//   ],
// });

// ds.net.use(apiPrefix);
// ds.net.use(errorHandler);
// ds.net.use(parsePath);

// export default {
//   /** 请求或发送数据 */
//   request: async (api: string, options: NetOptions) => {
//     const { formatter, data, ...otherOptions } = options;
//     let _data = data || {};
//     if (formatter) {
//       try {
//         _data = await formatter(_data);
//       } catch (err) {
//         console.warn('请求中断：' + err.message);
//         return;
//       }
//     }
//     return ds.net.request(api, {
//       data: _data,
//       ...otherOptions,
//     });
//   }
// };

// export default ds.net;
