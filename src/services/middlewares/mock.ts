// error handler middleware
// @author Pluto <huarse@gmail.com>
// @create 2019/12/18 20:07

import { message } from 'antd';
import { logger } from '@irim/saber';
import { NetOptions } from '../interface';

/**
 * 统一错误处理
 * @param {boolean|string} [ctx.showError=true] 显示错误信息
 * @param {boolean} [ctx.ignoreError] 忽略错误，并返回
 */
export default async function errorHandler(ctx: NetOptions) {
  // if (!window._IS_LOCAL) return ctx.next();
  // 如果是本地环境，并且请求以 /local-mock/ 开头，则截断后续中间件，直接请求 mock 数据
  if (!ctx.api.startsWith('/local-mock/')) return ctx.next();

  let mockData = (await import('data/' + ctx.api.slice('/local-mock/'.length)))
    .default;
  if (typeof mockData === 'function') {
    mockData = mockData({
      ...ctx.search,
      ...(ctx.data as Object),
    });
  }
  ctx.response = mockData;
}
