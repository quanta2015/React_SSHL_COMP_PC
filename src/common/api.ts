export const ENV = (
  document.querySelector('meta[name="x-server-env"]') || { content: 'test' }
).content;
const urlCollect: any = {
  // 开发环境
  dev: ``,
  // 测试环境
  test: ``,
  // 生产环境
  production: ``,
};

export const API = urlCollect[ENV];
