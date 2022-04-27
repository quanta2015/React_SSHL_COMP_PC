export const omit = (obj: any, paths: string[]) => {
  const newObj: any = {};

  Object.keys(obj).forEach(function (key) {
    if (paths.indexOf(key) === -1) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
};
