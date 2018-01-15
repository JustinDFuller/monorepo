import r from 'ramda';

export default (key, defaultValue) => (state = defaultValue, action) => {
  const uppercaseKey = r.toUpper(key);
    
  switch(action.type) {
    case `REPLACE_${uppercaseKey}`:
      return action[key];
    case `APPEND_${uppercaseKey}`:
      return r.append('', state);
    case `UPDATE_${uppercaseKey}_AT_INDEX`:
      return r.update(action.index, action.soWhat, state);
    default: 
      return state;
  }
}
