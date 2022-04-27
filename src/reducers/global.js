export default (state = { routerData: false }, action) => {
  switch (action.type) {
    case 'global/save':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
