import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from 'antd';
import { TableCellProps } from '@/components/table/interface';
import { Type } from '@/components/personnel-modal';

const { Link } = Typography;
export default ({
  tableProps: { record },
  userType,
  value,
}: TableCellProps & {
  userType: Type;
}) => {
  const dispatch = useDispatch();
  const showModal = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: 'personnel/show',
        payload: {
          userId: record.userId,
          type: userType,
        },
      });
    },
    [record.userId, userType],
  );
  return (
    <Link
      href="#"
      ellipsis
      style={{ maxWidth: '25em' }}
      onClick={showModal}
      title={value}
    >
      {value.length >= 8 ? `${value.substring(0, 8)}...` : value}
    </Link>
  );
};
