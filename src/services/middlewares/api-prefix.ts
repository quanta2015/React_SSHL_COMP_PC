// api prefix
// @author Pluto <huarse@gmail.com>
// @create 2020/07/01 11:11

import { NetOptions } from '../interface';
import { apiPrefix } from '@/common/request';

export default async function apiPrefixMiddleware(ctx: NetOptions) {
  ctx.api = apiPrefix(ctx.api);
  return ctx.next();
}
