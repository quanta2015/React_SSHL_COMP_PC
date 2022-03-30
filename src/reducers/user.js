export default (state = { currentUser: {} }, action) => {
  switch (action.type) {
    case 'user/save':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
