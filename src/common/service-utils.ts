const { content: ENV } = (document.querySelector(
  'meta[name="x-server-env"]',
) || { content: 'sit' }) as { content: string };

const urlCollect: any = {
  // 开发环境
  dev: {
    qrApi: '//aly-test.api-auth.ss.com',
    usercenter: '//gateway.community-dev.easyj.top/user-center',

    workbench: '//gateway.community-dev.easyj.top/workbench',
    file: 'https://gateway.community-dev.easyj.top/file-center',
  },
  // 测试环境
  sit: {
    usercenter: '//gateway.community-sit.easyj.top/user-center',
    file: 'https://gateway.community-sit.easyj.top/file-center',

    workbench: '//gateway.community-dev.easyj.top/workbench',
  },
  //预发环境
  pre: {
    usercenter: '//gateway.pre.suosihulian.com/user-center',
    file: '//gateway.pre.suosihulian.com/file-center',
  },
  // 生产环境
  production: {
    usercenter: '//gateway.suosihulian.com/user-center',
    file: '//gateway.suosihulian.com/file-center',
  },
};

export default urlCollect[ENV];
