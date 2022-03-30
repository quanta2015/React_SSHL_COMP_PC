import { Context } from '@irim/saber/types/interfaces';

export interface NetOptions extends Context {
  /** 当前的接口域，默认是 xxx */
  domain?: string;
}
