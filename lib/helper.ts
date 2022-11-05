/* eslint-disable import/prefer-default-export */

const dateStripped = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    if (value !== null) {
      // If array, loop...
      if (Array.isArray(value)) {
        value = value.map((item) => {
          return dateStripped(item);
        });
      }
      // ...if property is date/time, stringify/parse...
      else if (
        typeof value === 'object' &&
        typeof value.getMonth === 'function'
      ) {
        value = JSON.parse(JSON.stringify(value));
      }
      // ...and if a deep object, loop.
      else if (typeof value === 'object') {
        value = dateStripped(value);
      }
    }
    newObj[key] = value;
  });
  return newObj;
};

export { dateStripped };
