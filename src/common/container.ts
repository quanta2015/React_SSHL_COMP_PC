/* eslint-disable import/prefer-default-export */
// import {authUrl} from "../pages/Home/SurveyStatistics/api";

const ENV = (
  document.querySelector('meta[name="x-server-env"]') || { content: 'dev' }
).content;

const urlCollect: any = {
  // 开发环境
  dev: {
    mock: '/mock',
  },
  // 测试环境
  test: {
    mock: '/mock',
  },
  // 生产环境
  production: {
    mock: '/mock',
  },
};

export const url = urlCollect[ENV];
