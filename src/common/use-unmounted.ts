import { useRef, useEffect } from 'react';

export default () => {
  const unmounted = useRef(false);
  useEffect(
    () => () => {
      unmounted.current = true;
    },
    []
  );
  return [unmounted];
};
