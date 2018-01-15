import r from 'ramda';

export const getValue = r.compose(
  r.prop('value'),
  r.prop('target'),
);

export const mapIndexed = r.addIndex(r.map);

export const getKey = r.prop('key');

export const getLength = r.prop('length');

export const pickPresent = props => r.compose(
  r.map(r.prop('present')),
  r.pick(props),
);

export const handleEnter = (callback) => (event) => {
  if (getKey(event) === 'Enter') {
    return callback(event);
  }
  
  return event;
};

export const mapFunctionsToDispatch = functions => dispatch => r.map(
  fn => r.compose(dispatch, fn),
  functions,
);
