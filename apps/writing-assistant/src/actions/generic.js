import r from 'ramda';
import { upperFirst } from 'lodash';

export default key => {
  const upperFirstKey = upperFirst(key);
  const upperCaseKey = r.toUpper(key);
  
  return {
    [`replace${upperFirstKey}`]: val => ({
      type: `REPLACE_${upperCaseKey}`,
      [key]: val,
    }),
    [`append${upperFirstKey}`]: val => ({
      type: `APPEND_${upperCaseKey}`,
      [key]: val,
    }),
    [`update${upperFirstKey}AtIndex`]: (index, val) => ({
      type: `UPDATE_${upperCaseKey}_AT_INDEX`,
      [key]: val,
      index,
    }),
  };
};
