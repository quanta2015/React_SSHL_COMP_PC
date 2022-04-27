export default {
  cjs: 'babel',
  // cjs: 'rollup',
  // esm: {
  //   type: 'rollup',
  //   importLibToEs: true,
  // },
  // cjs: { type: 'rollup' },
  // lessInBabelMode: true,

  disableTypeCheck: true,
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
  ],
};
