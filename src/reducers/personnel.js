export default (
  state = { visible: false, userId: null, type: null, params: null },
  action,
) => {
  switch (action.type) {
    case 'personnel/hide':
      return { ...StaticRange, visible: false };
    case 'personnel/show':
      if (!action.payload.userId || !action.payload.type)
        throw new Error('[personnel/show] userId, type 必须提供');
      return {
        ...state,
        userId: action.payload.userId,
        type: action.payload.type,
        params: action.payload.params,
        visible: true,
      };
    default:
      return state;
  }
};
