// option filling middleware
// @author Pluto <huarse@gmail.com>
// @create 2019/12/18 20:27

import { NetOptions } from '../interface';

/** add csrf token add fetch options */
export default async function optionsSupplement(ctx: NetOptions) {
  ctx.method = ctx.method || 'GET';
  ctx.type = ctx.type || 'ajax';
  ctx.data = ctx.data || ctx.params || ctx.payload;
  ctx.holdEmptyParam = true;
  if (!['localhost', '127.0.0.1'].includes(window.location.hostname)) {
    // 如果域名不是本地的，则跨域请求时带上 cookie
    ctx.credentials = ctx.credentials || 'include';
  }
  await ctx.next();
}
