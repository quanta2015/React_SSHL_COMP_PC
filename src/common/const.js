// 全局通用的静态变量
// @author Pluto <huarse@gmail.com>
// @create 2020/05/27 17:11

// / 项目环境
const {host} = window.location;

/** 当前环境: daily, pre, prod */
export const ENV = /test|debug|daily|(:\d{4})/.test(host) ? 'daily' : /pre-/.test(host) ? 'pre' : 'prod';

/** 键盘 keycode */
export const KEY_CODE = {
  ENTER: 13,
  ESC: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  PAGEUP: 33,
  PAGEDOWN: 34,
  F1: 112,
};

/** 定义权限等级 */
export const AUTH = {
  /** 隐藏的 */
  HIDDEN: 99999,
  /** 开发模式 */
  DEVELOPER: 9999,
  /** 超级管理员 */
  SUPER_ADMIN: 500,
  /** 管理员 */
  ADMIN: 400,
  /** 普通用户 */
  NORMAL: 300,
  /** 游客 */
  GUEST: 100,
};
