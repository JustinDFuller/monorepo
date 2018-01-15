import r from 'ramda';
import { combineReducers } from 'redux'
import undoable from 'redux-undo';
import generic from './generic';

const mainReducer = reducers => (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }

  return reducers(state, action);
};

const createReducers = r.compose(
  mainReducer,
  combineReducers,
  r.map(undoable),
);

const genericReducers = {
  topic: generic('topic', ''),
  format: generic('format', ''),
  soWhats: generic('soWhat', []),
  reflect: generic('reflect', ''),
};

export default createReducers(genericReducers);
