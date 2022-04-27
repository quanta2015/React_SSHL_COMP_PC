const Microsite = '/wisdom';
export default {
  path: Microsite,
  routes: [
    {
      path: `${Microsite}/internal`,
      component: '../src/tree',
    },
    {
      path: `${Microsite}/internal/:treePath/*`,
      component: '../src/tree',
    },
  ],
};
