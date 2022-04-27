import { useSelector } from 'react-redux';

export const isCurrentUser = (data: any) => {
  const { currentUser } = useSelector((state) => state.user);
  return data?.record?.userId === currentUser?.userInfo?.userId;
};

export const isIncludeCurrentUser = (data: any) => {
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?.userInfo?.userId;
  const { idList = [] } = data;
  return userId && idList.includes(userId);
};
