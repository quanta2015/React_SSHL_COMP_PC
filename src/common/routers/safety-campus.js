import React from 'react';
import attendance from './attendance';

export default {
  '/safety-campus': {
    name: '平安',
    children: {
      ...attendance,
    },
  },
};
