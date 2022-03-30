import React from 'react';

function ArrayToText({ value }) {
  return (
    <div>
      {value
        ?.sort()
        .map(item => dayToWeek(item))
        .join(',')}
    </div>
  );
}

export default ArrayToText;

function dayToWeek(value: any) {
  // tslint:disable-next-line: no-duplicate-case
  switch (value) {
    case 1:
      return '星期一';
      break;
    case 2:
      return '星期二';
      break;
    case 3:
      return '星期三';
      break;
    case 4:
      return '星期四';
      break;
    case 5:
      return '星期五';
      break;
    case 6:
      return '星期六';
      break;
    case 7:
      return '星期日';
      break;
  }
}
