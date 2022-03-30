// TODO: 消费容器传入的环境
export const env = (
  document.querySelector('meta[name="x-server-env"]') || { content: 'test' }
).content;
// export const env = 'test';

// 域名配置
export const domainMap: Record<string, string> = {
  dev: '//',

  sit: '//',
  // 测试环境通过nginx配置/ss-api/portal拦截，转发到服务端对应的地址端口中，故去掉域名
  production: '//portal.api.ss.com',
};
// 任务中心
const secondaryMap: Record<string, string> = {
  dev: '//47.98.239.184:8080/external',

  test: '//47.98.239.184:8080/external',

  production: '//sync-task.api.ss.com/external',
};

/** 是否是相对路径 */
export function isAbsolutePath(url: string) {
  return /^(https?:)?\/\//.test(url);
}

/**
 * 为相对路径请求地址加上 host 前缀
 * @param api 请求地址
 */
export function apiPrefix(api: string) {
  // 如果是绝对路径，则跳过
  if (isAbsolutePath(api)) {
    return api;
  }

  if (api.startsWith('/sync-task-test')) {
    const _api = api.slice('/sync-task-test'.length);
    const _urlPrefix = secondaryMap[env];
    if (!_urlPrefix) {
      return _api;
    }

    return `${_urlPrefix}${_api}`;
  }

  // const domain = domain || 'xxx';
  const urlPrefix = domainMap[env];

  if (!urlPrefix) {
    return api;
  }

  return `${urlPrefix}${api}`;
}

// export function apiPrefix(api: string) {
//   // 如果是绝对路径，则跳过
//   if (isAbsolutePath(api)) {
//     return api;
//   }

//   // const domain = domain || 'xxx';
//   const urlPrefix = domainMap[env];

//   if (!urlPrefix) {
//     return api;
//   }

//   return `${urlPrefix}${api}`;
// }
