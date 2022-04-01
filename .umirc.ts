import { defineConfig, utils } from 'dumi';
import path from 'path';
const { BUILD_ENV, NODE_ENV } = process.env;
// import pageRoutes from './router.config';
console.log(BUILD_ENV, 'BUILD_ENV', NODE_ENV);
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const { winPath } = utils;

export default defineConfig({
  // plugins: [new AntdDayjsWebpackPlugin()],
  title: '用户中心组件',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  publicPath: '/',
  locale: {},
  // mode: 'site',
  menus: {
    '/compose': [],
    '/global': [{ title: '菜单项', path: 'components/form/kv-list/readme.md' }],
  },
  // locales: {
  //   default: 'zh-CN',
  //   antd: true,
  //   // title: false,
  //   // baseNavigator: true,
  //   // baseSeparator: '-',
  // },
  // cssLoader: {
  //   modules: {
  //     //     // mode: 'local',
  //     getLocalIdent: (context, _, localName) => {
  //       if (
  //         context.resourcePath.includes('node_modules') ||
  //         context.resourcePath.includes('ant.design.pro.less') ||
  //         context.resourcePath.includes('global.less')
  //       ) {
  //         return localName;
  //       }
  //     },
  //     localIdentName: 'tets-[local]-[hash:base64:5]',
  //   },
  // },
  // hash: true,
  // copy: [
  //   {
  //     from: '/data',
  //     to: '/data',
  //   },
  // ],
  // routes: pageRoutes,

  targets: {
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
    chrome: 80,
  },
  devtool: NODE_ENV === 'production' ? 'nosources-source-map' : 'source-map',

  // title: false,
  ignoreMomentLocale: true,
  // proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  alias: {
    '@': path.resolve(__dirname, 'src'),
    data: path.resolve(__dirname, 'data'),
  },
  links:
    process.env.NODE_ENV === 'development'
      ? ['https://gw.alipayobjects.com/os/lib/antd/4.6.6/dist/antd.css']
      : [],
  // Fast Refresh 热更新
  fastRefresh: {},
  nodeModulesTransform: { type: 'none' },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
    // [
    //   'babel-plugin-import',
    //   {
    //     libraryName: '@ant-design/icons',
    //     libraryDirectory: 'lib/icons',
    //     camel2DashComponentName: false,
    //   },
    //   '@ant-design/icons',
    // ],
    // [
    //   'import',
    //   {
    //     libraryName: '@ant-design/pro-form',
    //     libraryDirectory: 'lib/pro-form',
    //     camel2DashComponentName: false,
    //   },
    //   '@ant-design/pro-form',
    // ],
  ],
});
