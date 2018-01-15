import { createStore, compose, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage'
import logger from 'redux-logger';
import reducers from '../reducers';

export default createStore(
  reducers,
  compose(
    applyMiddleware(logger),  
    persistState(window.localstorage, 'writing'),
  ),
);
